/* global firebase */

var functions = firebase.app().functions("europe-west1");

functions.useFunctionsEmulator("http://localhost:5001");

//in: {name}
var createQueue = functions.httpsCallable("createQueue"); //out: {queueId, queue}
//in: {queueId}
var deleteQueue = functions.httpsCallable("deleteQueue"); //out: {deletedCount}
//in: {queueId, email}
var addMeToQueue = functions.httpsCallable("addMeToQueue"); //out: {id, number, remaining}
//in: {queueId,ticketId}
var removeMeFromQueue = functions.httpsCallable("removeMeFromQueue"); //out: {number, email}
//in: {queueId}
var callNextOnQueue = functions.httpsCallable("callNextOnQueue"); //out: {number, email/phone/name}
//in: {queueId, email/phone/name}
var manuallyAddToQueue = functions.httpsCallable("manuallyAddToQueue"); //out: {id, number, remaining}

createQueue({ name: "My queue" }).then(async function (res) {
  console.log("queue created", res);
  let queueId = res.data.queueId;

  console.log(
    "addMeToQueue",
    await addMeToQueue({ queueId, email: "email1@mail.com" })
  );
  console.log("callNextOnQueue", await callNextOnQueue({ queueId }));

  let added = await addMeToQueue({ queueId, email: "email2@mail.com" });
  console.log("addMeToQueue", added);
  console.log(
    "removeMeFromQueue",
    await removeMeFromQueue({ queueId, ticketId: added.data.id })
  );

  console.log(
    "manuallyAddToQueue",
    await manuallyAddToQueue({ queueId, phone: "9191919191-3" })
  );
  added = await addMeToQueue({ queueId, email: "email4@mail.com" });
  console.log("addMeToQueue", added);
  console.log(
    "manuallyAddToQueue",
    await manuallyAddToQueue({ queueId, name: "Maria 5" })
  );
  console.log(
    "removeMeFromQueue",
    await removeMeFromQueue({ queueId, ticketId: added.data.id })
  );
  console.log(
    "addMeToQueue",
    await addMeToQueue({ queueId, email: "email6@mail.com" })
  );

  console.log("callNextOnQueue", await callNextOnQueue({ queueId }));
  console.log("callNextOnQueue", await callNextOnQueue({ queueId }));
  console.log("callNextOnQueue", await callNextOnQueue({ queueId }));

  callNextOnQueue({ queueId }).catch(e => {
    //expected to fail
    console.log(e);
  });

  console.log(
    "addMeToQueue",
    await addMeToQueue({ queueId, email: "email7@mail.com" })
  );
  console.log(
    "manuallyAddToQueue",
    await manuallyAddToQueue({ queueId, phone: "9191919191-8" })
  );

  console.log("deleteQueue", await deleteQueue({ queueId }));
});
