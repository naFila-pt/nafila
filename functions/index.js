const functionsMain = require('firebase-functions');
const config = functionsMain.config();
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore()

const runtimeOpts = {
    timeoutSeconds: 15,
    memory: '128MB' //lowest cost possible
}

//low cost / high perf settings
const functions = functionsMain.region('europe-west1').runWith(runtimeOpts);


//create queue
exports.createQueue = functions.https.onCall(async (data, context) => {
    //generates queueId
    const queueId = fiveRandomChars()
    //assigns userId as owner_id
    if(!context.auth || !context.auth.uid) {
        throw "You need to be logged in to create a queue"
    }

    //inserts queue
    const queue = {owner_id:context.auth.uid, name:data.name, remainingTicketsInQueue:0, ticketTopNumber:0}
    const queueRef = firestore.collection("queues").doc(queueId)

    //updates user
    const userRef = firestore.collection("users").doc(queue.owner_id)
    const userDoc = await userRef.get()

    const userData = userDoc.data()
    if(!userData.queues) userData.queues = []
    userData.queues.push(queueRef.id);
    userData.defaultQueueName = queue.name;
    
    //batch commit
    const batch = firestore.batch()
    batch.set(queueRef, queue)
    batch.update(userRef, userData)
    batch.commit()

    //{{queuePosterUrl}} {{queueName}} {{queueId}}
    await sendMail([ticketData.email], "d-6ac28f40006c4d178be4e00adae2bcb4", {
        queueId:queueRef.id,
        queueName: result.queueName,
        queuePosterUrl: "https://nafila.pt/cartaz-fila/"+queueRef.id
    })

    //returns queue object
    return {queueId, queue};

});

//Delete queue
exports.deleteQueue = functions.https.onCall(async (data, context) => {
    //receives queueId
    let queueRef = firestore.collection("queues").doc(data.queueId)
    
    //transaction is cheaper
    let tickets = await firestore.runTransaction(async function(transaction) {
        let queueDoc = await transaction.get(queueRef)

        //get queue
        let queueData = queueDoc.data()

        //needs to validate userId ownership of queue
        if(queueData.owner_id !== context.auth.uid){
            throw "Only queue owner can delete the queue"
        }
        
        //get all remaining tickets
        let queryRef = await transaction.get(queueRef.collection('tickets'))

        //delete queue entirely
        transaction.delete(queueRef)

        return queryRef.docs
    })

    //notify every remaining person in queue of queue deletion
    let emailsToNotify = []
    let phonesToNotify = []
    tickets.forEach((t)=>{
        let ticketData = t.data()
        if(!!ticketData.email){
            emailToNotify.push(ticketData.email)
        } else if(!!ticketData.phone) {
            phonesToNotify.push(ticketData.email)
        }
    });

    //notify remaining email users
    if(emailsToNotify.length){
        //{{queueName}} {{queueId}}
        await sendMail(emailsToNotify, "d-b28224dd3dac48388f8e469ed82448a8", {
            queueId:queueRef.id,
            queueName: result.queueName
        })
    }

    //notify remaining phone users
    if(phonesToNotify.length){
        await sendSMS(phonesToNotify, "A fila '"+result.queue.name+"' ("+queueRef.id+") foi fechada pelo administrador da fila. A sua senha foi removida.")
    }


    return {deletedCount:tickets.length}
});

//Call next person in queue
exports.callNextOnQueue = functions.https.onCall(async (data, context) => {
    //receives queueId
    let queueRef = firestore.collection("queues").doc(data.queueId)

    //transaction is cheaper
    let result = await firestore.runTransaction(async function(transaction) {
        let queueDoc = await transaction.get(queueRef)

        //get queue
        let queueData = queueDoc.data()

        //needs to validate userId ownership of queue
        if(queueData.owner_id !== context.auth.uid){
            throw "Only queue owner can call the next person on the queue"
        }
        
        //get next ticket
        let querySnap = await transaction.get(queueRef.collection('tickets').orderBy("number").limit(1))

        //in case there is no ticket left
        if(querySnap.empty){
            throw "There are no active tickets in the queue"
        }

        let ticketDoc = querySnap.docs[0]
        return {
            ticket: await removeTicket(transaction, ticketDoc.ref, queueRef, queueData),
            queue: queueData
        }
        
    })

    if(!!result.ticket.email){
        //send notification email
        
        //{{queueName}} {{queueId}} {{ticketNumber}}
        await sendMail([result.ticket.email], "d-d5c90252570f4486a89e155762824850", {
            ticketNumber: result.ticket.number,
            queueId: queueRef.id,
            queueName: result.queue.name
        })
    } else if(!!result.ticket.phone) {
        //send notification SMS
        await sendSMS([result.ticket.phone], "A sua vez chegou para ser atendido na fila '"+result.queue.name+"' ("+queueRef.id+").")
    }
    
    return result.ticket
});

//Manually add person to queue
exports.manuallyAddToQueue = functions.https.onCall(async (data, context) => {
    //receives queueId
    let queueRef = firestore.collection("queues").doc(data.queueId)
    var ticketRef = queueRef.collection('tickets').doc();

    //create ticket object
    let ticketData = {}
    if(!!data.email){
        ticketData.email = data.email
    } else if (!!data.phone){
        ticketData.phone = data.phone
    } else if (!!data.name){
        ticketData.name = data.name
    } else {
        throw "Unknown ticket type"
    }

    //transaction is cheaper
    let result = await firestore.runTransaction(async function(transaction) {
        let queueDoc = await transaction.get(queueRef)

        //get queue
        let queueData = queueDoc.data()

        //needs to validate userId ownership of queue
        if(queueData.owner_id !== context.auth.uid){
            throw "Only queue owner can manually add people to the queue"
        }
        
        return {
            ticket: await addTicket(transaction, ticketRef, ticketData, queueRef, queueData),
            queueName: queueData.name
        }
        
    })
    
    if(!!ticketData.email){
        //{{exitQueueUrl}} {{queueName}} {{queueId}} {{ticketNumber}}
        await sendMail([ticketData.email], "d-e1953f198a92449f8fb3a833532cdc21", {
            ticketNumber: result.ticket.ticketNumber,
            queueId:queueRef.id,
            queueName: result.queueName,
            exitQueueUrl: "https://nafila.pt/sair/"+queueRef.id+'/'+ticketRef.id
        })
    }
    else if(!!ticketData.phone) {
        //send notification SMS
        await sendSMS([result.ticket.phone], "Encontra-se em espera na fila '"+result.queueName+"' ("+queueRef.id+"). O numero do seu ticket: "+result.ticket.ticketNumber)
    }

    return result.ticket
    
});

//Add me to queue
exports.addMeToQueue = functions.https.onCall(async (data, context) => {
    //get the queue
    let queueRef = firestore.collection("queues").doc(data.queueId)
    let ticketData = {}
    if(!data.email){
        throw "Missing email"
    }
    ticketData.email = data.email

    var ticketRef = queueRef.collection('tickets').doc();

    //transaction is cheaper
    let result = await firestore.runTransaction(async function(transaction) {
        let queueDoc = await transaction.get(queueRef)
        let queueData = queueDoc.data()
        return {
            ticket: await addTicket(transaction, ticketRef, ticketData, queueRef, queueData),
            queueName: queueData.name
        }
    })
    
    //send confirmation email

    //{{exitQueueUrl}} {{queueName}} {{queueId}} {{ticketNumber}}
    await sendMail([ticketData.email], "d-e1953f198a92449f8fb3a833532cdc21", {
        ticketNumber: result.ticket.ticketNumber,
        queueId:data.queueId,
        queueName: result.queueName,
        exitQueueUrl: "https://nafila.pt/sair/"+data.queueId+'/'+ticketRef.id
    })

    return result.ticket
});

//Remove me from queue
exports.removeMeFromQueue = functions.https.onCall(async (data, context)=>{
    //get the queue
    let queueRef = firestore.collection("queues").doc(data.queueId)
    //get the ticket
    let ticketRef = queueRef.collection("tickets").doc(data.ticketId)

    //transaction is cheaper
    let result = await firestore.runTransaction(async function(transaction) {
        let queueDoc = await transaction.get(queueRef)
        let queueData = queueDoc.data()
        return await removeTicket(transaction, ticketRef, queueRef, queueData)
    })

    return result
});

async function addTicket(transaction, ticketRef, ticketData, queueRef, queueData){

    
    let ticketTopNumber = queueData.ticketTopNumber+1
    let remainingTicketsInQueue = queueData.remainingTicketsInQueue+1
    ticketData.number = ticketTopNumber

    //set ticket 
    await transaction.set(ticketRef, ticketData);

    //add ticket to count
    await transaction.update(queueRef, {ticketTopNumber, remainingTicketsInQueue});

    return {ticketId:ticketRef.id, ticketNumber:ticketTopNumber, remainingTicketsInQueue:remainingTicketsInQueue}
}

async function removeTicket(transaction, ticketRef, queueRef, queueData){
    let ticketData = (await transaction.get(ticketRef)).data()

    //remove ticket from DB
    await transaction.delete(ticketRef)
    //decrease counter
    let remainingTicketsInQueue = queueData.remainingTicketsInQueue>0 ? queueData.remainingTicketsInQueue-1 : 0;
    await transaction.update(queueRef, {remainingTicketsInQueue});

    return ticketData
}

function fiveRandomChars(){
    return Math.random().toString(36).replace(/[^0-9a-z]/, '').substring(0,5).toUpperCase()
}

async function sendMail(to, templateId, dynamic_template_data){
    let sendGridKey = config.sendgrid.key
    const sgMail = require('@sendgrid/mail');

    sgMail.setApiKey(sendGridKey);

    const msg = {
        to,
        from: 'no-reply@nafila.pt',
        templateId,
        dynamic_template_data
    };


    sgMail.sendMultiple(msg);
}

async function sendSMS(MsisdnList, strMessage){
    var soap = require('soap');
    var url = 'https://smspro.nos.pt/smspro/smsprows.asmx?WSDL';

    var args = {
        TenantName: config.smspro.tenant,
        strUsername: config.smspro.username,
        strPassword: config.smspro.password,
        MsisdnList,
        strMessage
    }
    return soap.createClientAsync(url).then((client) => {
        return client.SendSMS(args);
    });
}