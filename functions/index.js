/* eslint no-throw-literal: 0 */

const functionsMain = require("firebase-functions");
const config = functionsMain.config();
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(require("../serviceAccountKey.json"))
});
const firestore = admin.firestore();
const urlSMSPro = "https://smspro.nos.pt/smspro/smsprows.asmx?WSDL";
const urlSMSProService = "https://smspro.nos.pt/SmsPro/smsprows.asmx";
const functionsRegion = "europe-west1";

const runtimeOpts = {
  timeoutSeconds: 15,
  memory: "256MB" //lowest cost possible
};

//low cost / high perf settings
const functions = functionsMain.region(functionsRegion).runWith(runtimeOpts);

//---- APP API ----

//create queue
exports.createQueue = functions.https.onCall(async (data, context) => {
  //generates queueId
  const queueId = fiveRandomChars();
  //assigns userId as owner_id
  if (!context.auth || !context.auth.uid) {
    throw new functionsMain.https.HttpsError(
      "unauthenticated",
      "Precisa de efetuar login antes de criar uma fila"
    );
  }

  //validate queue name
  if (!data.name) {
    throw new functionsMain.https.HttpsError(
      "invalid-argument",
      "Tem de inserir um nome público para a fila"
    );
  }

  if (isNaN(data.maxCapacity)) {
    throw new functionsMain.https.HttpsError(
      "invalid-argument",
      "Tem de inserir uma lotação máxima válida para a fila"
    );
  }

  const countersRef = firestore.collection("counters").doc();

  //inserts queue
  const queue = {
    owner_id: context.auth.uid,
    name: data.name,
    remainingTicketsInQueue: 0,
    ticketTopNumber: 0,
    currentTicketNumber: 0,
    currentTicketName: null,
    counterId: countersRef.id
  };

  // inserts counter with store max capacity
  const counter = {
    maxCapacity: data.maxCapacity,
    current: 0
  };

  const queueRef = firestore.collection("queues").doc(queueId);

  //updates user
  const userRef = firestore.collection("users").doc(queue.owner_id);
  const userDoc = await userRef.get();

  const userData = userDoc.data();
  if (!userData.queues) userData.queues = [];
  userData.queues.push(queueRef.id);
  userData.defaultQueueName = queue.name;

  //batch commit
  const batch = firestore.batch();
  batch.set(queueRef, queue);
  batch.set(countersRef, counter);
  batch.update(userRef, userData);
  batch.commit();

  //{{queuePosterUrl}} {{queueName}} {{queueId}}
  /* await sendMail([data.email], "d-6ac28f40006c4d178be4e00adae2bcb4", {
    queueId: queueRef.id,
    queueName: queue.name,
    queuePosterUrl: `https://nafila.pt/loja/cartaz-fila/${queueRef.id}`
  }); */

  //returns queue object
  return { queueId, queue };
});

//Delete queue
exports.deleteQueue = functions.https.onCall(async (data, context) => {
  //receives queueId
  let queueRef = firestore.collection("queues").doc(data.queueId);

  //transaction is cheaper
  let result = await firestore.runTransaction(async function (transaction) {
    let queueDoc = await transaction.get(queueRef);

    //get queue
    let queueData = queueDoc.data();

    //needs to validate userId ownership of queue
    if (queueData.owner_id !== context.auth.uid) {
      throw new functionsMain.https.HttpsError(
        "unauthenticated",
        "Apenas o dono da fila pode eliminar a mesma"
      );
    }

    //get all remaining tickets
    let queryRef = await transaction.get(queueRef.collection("tickets"));

    //remove queue from user collection
    let userRef = firestore.collection("users").doc(queueData.owner_id);
    let userDoc = await transaction.get(userRef);

    //get user
    let userData = userDoc.data();

    //get counter ref
    const counterRef = firestore
      .collection("counters")
      .doc(queueData.counterId);

    //remove queueId from queues
    userData.queues.splice(userData.queues.indexOf(queueRef.id), 1);
    transaction.update(userRef, userData);

    //delete queue entirely
    transaction.delete(queueRef);
    transaction.delete(counterRef);

    return { tickets: queryRef.docs, queue: queueData };
  });

  //notify every remaining person in queue of queue deletion
  let emailsToNotify = [];
  let phonesToNotify = [];
  result.tickets.forEach(t => {
    let ticketData = t.data();
    if (!!ticketData.email) {
      emailsToNotify.push(ticketData.email);
    } else if (!!ticketData.phone) {
      phonesToNotify.push(ticketData.phone);
    }
  });

  //notify remaining email users
  if (emailsToNotify.length) {
    //{{queueName}} {{queueId}}
    await sendMail(emailsToNotify, "d-b28224dd3dac48388f8e469ed82448a8", {
      queueId: queueRef.id,
      queueName: result.queue.name
    });
  }

  //notify remaining phone users
  if (phonesToNotify.length) {
    await sendSMS(
      phonesToNotify,
      `\nA fila ${result.queue.name} (${queueRef.id}) foi encerrada. Para mais informaçōes pedimos que se dirija à entrada do estabelecimento.`
    );
  }

  return {
    deletedCount: result.tickets.length,
    totalTickets: result.queue.ticketTopNumber
  };
});

//Call next person in queue
exports.callNextOnQueue = functions.https.onCall(async (data, context) => {
  //receives queueId
  let queueRef = firestore.collection("queues").doc(data.queueId);

  //transaction is cheaper
  let { result, notifyTicketData } = await firestore.runTransaction(
    async function (transaction) {
      let queueDoc = await transaction.get(queueRef);

      //get queue
      let queueData = queueDoc.data();

      //needs to validate userId ownership of queue
      if (queueData.owner_id !== context.auth.uid) {
        throw new functionsMain.https.HttpsError(
          "unauthenticated",
          "Apenas o dono da fila pode chamar a próxima senha"
        );
      }

      //get next ticket
      let querySnap = await transaction.get(
        queueRef.collection("tickets").orderBy("number").limit(4)
      );

      //in case there is no ticket left
      if (querySnap.empty) {
        throw new functionsMain.https.HttpsError(
          "out-of-range",
          "Não existem senhas ativas na fila"
        );
      }

      let ticketDoc = querySnap.docs[0];

      return {
        result: await removeTicket(
          transaction,
          ticketDoc.ref,
          queueRef,
          queueData,
          true
        ),
        notifyTicketData: querySnap.size > 3 ? querySnap.docs[3].data() : null
      };
    }
  );

  //Ticket called
  if (!!result.ticket.email) {
    //send notification email

    //{{queueName}} {{queueId}} {{ticketNumber}}
    await sendMail(
      [result.ticket.email],
      "d-d5c90252570f4486a89e155762824850",
      {
        ticketNumber: result.ticket.number,
        queueId: queueRef.id,
        queueName: result.queue.name
      }
    );
  } else if (!!result.ticket.phone) {
    //send notification SMS
    await sendSMS(
      [result.ticket.phone],
      `\nChegou a sua vez! Por favor dirija-se a ${result.queue.name} (${queueRef.id}). A sua senha é a ${result.ticket.number}. Obrigado por aguardar naFila!`
    );
  }

  //notification ahead of time (nearly your time)
  //may or may not exist
  if (!!notifyTicketData) {
    if (!!notifyTicketData.email) {
      //send notification email

      //{{queueName}} {{queueId}} {{ticketNumber}}
      await sendMail(
        [notifyTicketData.email],
        "d-c1d1634d885448649c39f60d9fd5bd18",
        {
          ticketNumber: notifyTicketData.number,
          queueId: queueRef.id,
          queueName: result.queue.name,
          remainingTicketsInQueue: 3
        }
      );
    } else if (!!notifyTicketData.phone) {
      //send notification SMS
      await sendSMS(
        [notifyTicketData.phone],
        `\nFaltam 3 senhas para a sua vez naFila ${result.queue.name} (${queueRef.id}). Dirija-se à entrada da loja. Receberá outra mensagem quando for a sua vez.`
      );
    }
  }

  return result;
});

//Manually add person to queue
exports.manuallyAddToQueue = functions.https.onCall(async (data, context) => {
  return await createTicketInQueue(
    {
      queueId: data.queueId,
      email: data.email,
      phone: data.phone,
      name: data.name
    },
    context
  );
});

//Add me to queue
exports.addMeToQueue = functions.https.onCall(async (data, context) => {
  return await createTicketInQueue(
    { queueId: data.queueId, email: data.email, phone: data.phone },
    context
  );
});

//Remove me from queue
exports.removeMeFromQueue = functions.https.onCall(async (data, context) => {
  //get the queue
  let queueRef = firestore.collection("queues").doc(data.queueId);
  //get the ticket
  let ticketRef = queueRef.collection("tickets").doc(data.ticketId);

  //transaction is cheaper
  let result = await firestore.runTransaction(async function (transaction) {
    let queueDoc = await transaction.get(queueRef);
    let queueData = queueDoc.data();
    return await removeTicket(
      transaction,
      ticketRef,
      queueRef,
      queueData,
      false
    );
  });

  return result;
});

//---- REGULAR SCHEDULED JOB ----
//ATTENTION - PROD ONLY!!
if (config.smspro.getmessagesenabled === "true") {
  exports.scheduledFunction = functions.pubsub
    .schedule("every " + config.smspro.getmessagesinterval)
    .onRun(async () => {
      //schedule running next in 10s
      let turns = parseInt(config.smspro.getmessagessubintervalturns);
      if (!isNaN(turns) && turns > 0) {
        await scheduleNextSMSRoutine(
          config.smspro.getmessagessubintervalsecs,
          1
        );
      }

      //run now
      return await getNewSMSRoutine();
    });
}

exports.smsRoutine = functions.https.onRequest(async (req, res) => {
  let runTurn = req.body.runTurn;

  if (typeof runTurn !== "number") {
    throw new functionsMain.https.HttpsError(
      "invalid-argument",
      "Invalid argument"
    );
  }

  let nextRunTurn = req.body.runTurn + 1;

  //if needed, schedule running next in 10s
  let turns = parseInt(config.smspro.getmessagessubintervalturns);

  console.log("Execution " + req.body.runTurn + " of " + turns);
  if (!isNaN(turns) && turns >= nextRunTurn) {
    await scheduleNextSMSRoutine(
      config.smspro.getmessagessubintervalsecs,
      nextRunTurn
    );
  }

  //run now
  await getNewSMSRoutine();
  res.send("ok");
});

//---- HELPERS ----
async function scheduleNextSMSRoutine(secs, runTurn) {
  const intSecs = parseInt(secs);
  if (isNaN(intSecs)) {
    throw new functionsMain.https.HttpsError(
      "invalid-argument",
      "Invalid configuration"
    );
  }
  const { CloudTasksClient } = require("@google-cloud/tasks");

  const project = JSON.parse(process.env.FIREBASE_CONFIG).projectId;
  const queue = "subscheduler";

  const tasksClient = new CloudTasksClient();
  const queuePath = tasksClient.queuePath(project, functionsRegion, queue);

  const url = `https://${functionsRegion}-${project}.cloudfunctions.net/smsRoutine`;

  const task = {
    httpRequest: {
      httpMethod: "POST",
      url,
      body: Buffer.from(JSON.stringify({ runTurn })).toString("base64"),
      headers: {
        "Content-Type": "application/json"
      }
    },
    scheduleTime: {
      seconds: Date.now() / 1000 + intSecs
    }
  };

  try {
    return await tasksClient.createTask({ parent: queuePath, task });
  } catch (e) {
    console.error("sub-scheduler error ", e);
  }
}

async function getNewSMSRoutine() {
  var args = {
    TenantName: config.smspro.tenant,
    strUsername: config.smspro.username,
    strPassword: config.smspro.password,
    intCampaignId: parseInt(config.smspro.campaignid)
  };
  let serviceReply = await callSMSPro("GetCampaignUnreadReplies", args);
  let replies =
    (serviceReply.Replies && serviceReply.Replies.Reply_Record) || [];
  console.log("Found " + replies.length + " new messages");
  //sort our SMS according to when they were received
  try {
    replies = replies.sort((e1, e2) => {
      return Date.parse(e1["Moment"]) - Date.parse(e2["Moment"]);
    });
  } catch (e) {
    console.log("sorting error", e);
  }
  replies.forEach(async m => {
    try {
      //validate queueId
      let [queueId, leave] = m["Message"].trim().toUpperCase().split(" ");
      //add to queue
      if (typeof leave === "undefined") {
        await createTicketInQueue({ queueId, phone: m["MSISDN"] }, false);
        //remove from queue
      } else if (leave === "SAIR") {
        //get the queue
        let queueRef = firestore.collection("queues").doc(queueId);
        //get the ticket
        //transaction is cheaper
        await firestore.runTransaction(async function (transaction) {
          let queueDoc = await transaction.get(queueRef);
          //get next ticket
          let querySnap = await transaction.get(
            queueRef
              .collection("tickets")
              .where("phone", "==", m["MSISDN"])
              .limit(1)
          );
          //in case there is no ticket left
          if (querySnap.empty) {
            throw new functionsMain.https.HttpsError(
              "not-found",
              "Não existe senha nesta fila associada a este número de telefone"
            );
          }
          let ticketRef = querySnap.docs[0].ref;
          let queueData = queueDoc.data();

          //log event in analytics
          queueData.analyticsServerEvents =
            queueData.analyticsServerEvents || [];

          queueData.analyticsServerEvents.push(
            "ticket_cancelled",
            "ticket_cancelled_by_sms"
          );

          return await removeTicket(
            transaction,
            ticketRef,
            queueRef,
            queueData,
            false
          );
        });
        await sendSMS(
          [m["MSISDN"]],
          "\nFoi removido da fila com sucesso. Obrigado por aguardar naFila."
        );
      } else {
        throw new functionsMain.https.HttpsError(
          "invalid-argument",
          "Comando não reconhecido. Por favor verifique que escreveu a mensagem e o código de fila corretos."
        );
      }
    } catch (e) {
      await sendSMS([m["MSISDN"]], `\n${e.message}`);
      console.error(m, e);
    }
  });
}

async function createTicketInQueue(
  { queueId, email = null, phone = null, name = null },
  context
) {
  var validator = require("validator");

  //receives queueId
  let queueRef = firestore.collection("queues").doc(queueId);
  var ticketRef = queueRef.collection("tickets").doc();

  //create ticket object
  let ticketData = {};
  if (!!email) {
    if (!validator.isEmail(email)) {
      throw new functionsMain.https.HttpsError(
        "invalid-argument",
        "Formato de endereço de email inválido"
      );
    }
    ticketData.email = email;
  } else if (!!phone) {
    if (
      !validator.isMobilePhone(phone) || //generic phone number validation
      (phone[0] !== "+" && //international phones
        phone.length !== 9) //portuguese plain numbers
    ) {
      throw new functionsMain.https.HttpsError(
        "invalid-argument",
        "Formato de número de telefone inválido"
      );
    }
    ticketData.phone = phone;
  } else if (!!name) {
    ticketData.name = name;
  } else {
    throw new functionsMain.https.HttpsError(
      "invalid-argument",
      "Informação insuficiente para registar uma senha"
    );
  }

  //transaction is cheaper
  let result = await firestore.runTransaction(async function (transaction) {
    let queueDoc = await transaction.get(queueRef);

    if (!queueDoc.exists) {
      throw new functionsMain.https.HttpsError(
        "not-found",
        `Fila ${queueId} não encontrada.`
      );
    }

    //get queue
    let queueData = queueDoc.data();

    //only queue owner can add people by name
    if (!!ticketData.name && queueData.owner_id !== context.auth.uid) {
      throw new functionsMain.https.HttpsError(
        "unauthenticated",
        "Apenas o dono da fila pode criar senhas por nome"
      );
    }

    //needs to validate userId ownership of queue
    if (!context && !!ticketData.phone) {
      //SMS mode - log event in analytics
      queueData.analyticsServerEvents = queueData.analyticsServerEvents || [];
      queueData.analyticsServerEvents.push("ticket", "ticket_by_sms");
    }

    return await addTicket(
      transaction,
      ticketRef,
      ticketData,
      queueRef,
      queueData
    );
  });

  if (!!ticketData.email) {
    //{{exitQueueUrl}} {{queueName}} {{queueId}} {{ticketNumber}}
    await sendMail([ticketData.email], "d-e1953f198a92449f8fb3a833532cdc21", {
      ticketNumber: result.ticket.number,
      queueId: queueRef.id,
      queueName: result.queue.name,
      exitQueueUrl: `https://nafila.pt/sair/${queueRef.id}/${ticketRef.id}`
    });
  } else if (!!ticketData.phone) {
    //send notification SMS
    await sendSMS(
      [result.ticket.phone],
      `\nJá está naFila para ${result.queue.name}! A sua senha é ${
        result.ticket.number
      } e tem ${
        result.queue.remainingTicketsInQueue - 1
      } pessoas à sua frente. Para sair da fila, envie "nafila ${
        queueRef.id
      } sair" para 4902.`
    );
  }

  return result;
}

async function addTicket(
  transaction,
  ticketRef,
  ticketData,
  queueRef,
  queueData
) {
  //do not allow repeated tickets!
  if (!ticketData.name) {
    //phone or email based
    let what, compareTo;
    if (!!ticketData.phone) {
      what = "phone";
      compareTo = ticketData.phone;
    } else {
      what = "email";
      compareTo = ticketData.email;
    }

    let querySnap = await transaction.get(
      queueRef.collection("tickets").where(what, "==", compareTo)
    );

    //there is one already in the list!!
    if (!querySnap.empty) {
      throw new functionsMain.https.HttpsError(
        "out-of-range",
        `Já tem uma senha prévia em espera naFila ${queueRef.id}`
      );
    }
  }

  queueData.ticketTopNumber++;
  queueData.remainingTicketsInQueue++;
  ticketData.number = queueData.ticketTopNumber;

  //set ticket
  await transaction.set(ticketRef, ticketData);

  //add ticket to count
  await transaction.update(queueRef, queueData);

  return { queue: queueData, ticket: ticketData, ticketId: ticketRef.id };
}

async function removeTicket(
  transaction,
  ticketRef,
  queueRef,
  queueData,
  replaceCurrentTicket
) {
  let ticketData = (await transaction.get(ticketRef)).data();

  //remove ticket from DB
  await transaction.delete(ticketRef);
  //decrease counter
  queueData.remainingTicketsInQueue =
    queueData.remainingTicketsInQueue > 0
      ? queueData.remainingTicketsInQueue - 1
      : 0;

  //replace current ticket info
  if (replaceCurrentTicket) {
    queueData.currentTicketNumber = ticketData.number;
    if (!!ticketData.name) {
      queueData.currentTicketName = ticketData.name;
    } else {
      queueData.currentTicketName = null;
    }
  }

  await transaction.update(queueRef, queueData);

  return { queue: queueData, ticket: ticketData };
}

function fiveRandomChars() {
  return (Math.random().toString(36) + Math.random().toString(36))
    .replace(/[^1-9a-hj-np-z]/g, "") //no 0 , o or i -- to avoid confusion of codes
    .substring(0, 5)
    .toUpperCase();
}

async function sendMail(to, templateId, dynamic_template_data) {
  let sendGridKey = config.sendgrid.key;
  const sgMail = require("@sendgrid/mail");

  sgMail.setApiKey(sendGridKey);

  const msg = {
    to,
    from: "no-reply@nafila.pt",
    templateId,
    dynamic_template_data
  };

  sgMail.sendMultiple(msg);
}

async function sendSMS(MsisdnList, strMessage) {
  var args = {
    TenantName: config.smspro.tenant,
    strUsername: config.smspro.username,
    strPassword: config.smspro.password,
    MsisdnList,
    strMessage
  };

  return await callSMSPro("SendSMS", args);
}

var cacheSMSProClient;
async function callSMSPro(method, args) {
  return await new Promise((resolve, reject) => {
    try {
      var makeCall = function () {
        cacheSMSProClient[method](args, function (err, result) {
          if (!!err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      };

      var soap;
      if (!cacheSMSProClient) {
        soap = require("soap");

        soap.createClient(urlSMSPro, function (err, client) {
          if (!!err) {
            reject(err);
          } else {
            client.setEndpoint(urlSMSProService);
            cacheSMSProClient = client; //keep in memory for later
            makeCall();
          }
        });
      } else {
        makeCall();
      }
    } catch (e) {
      reject(e);
    }
  });
}
