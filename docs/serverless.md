# Serverless

## Firestore operations from client:

```javascript
var firestore = firebase.firestore();
```

### create new user

A user is identified by `uid` (from auth) and contains a list of `.queues` 
it is stored in firestore as `/userser/<userId>/{queues:[]}`

```javascript
var userDoc = firestore.collection("users").doc(uid)
userDoc.set({queues: []}).then(ok).catch(error)
```

---

## Function operations from client: 
Note: all functions for nafila.pt are stored in `'europe-west1'` region
```javascript
var functions = firebase.app().functions('europe-west1')
```

### create new queue
A queue is identified by `queueId` (generated) and contains a `.name`, a `.currentTicketIndex` and a list of `.tickets`
it is stored in firestore as `/userser/<queueId>/{name:"", currentTicketIndex:0, tickets:[]}`

```javascript
var createQueue = functions.httpsCallable('createQueue');
createQueue({name}).then(function(result) {
  //result: {queueId, queueObj}
  //queueObj: {owner_id:context.auth.uid, name:data.name, remainingTicketsInQueue:0, ticketTopNumber:0}
  console.log(result)
}).catch((e)=>{
  console.log(e)
});
```

### add me (anonymous user) to queue

```javascript
var addMeToQueue = functions.httpsCallable('addMeToQueue');
addMeToQueue({queueId, email: "carlos.mr.ouro@gmail.com"}).then(function(result) {
  //result: {ticketId, ticketNumber, remainingTicketsInQueue}
  console.log(result)
}).catch((e)=>{
  console.log(e)
});
```

### remove me (anonymous user) from queue
call next person in queue
Note: fires email/SMS if necessary and updates queue `.currentTicketIndex`

```javascript
var removeMeFromQueue = functions.httpsCallable('removeMeFromQueue');
removeMeFromQueue({queueId,ticketId}).then(function(result) {
  //result(ticket): {number, email}
  console.log(result)
}).catch((e)=>{
  console.log(e)
});
```

### manually add a user to queue (via authenticated admin)
can be done via `{queueId, email: "carlos.mr.ouro@gmail.com"}`, or `{queueId, phone: "+351910196551"}`, or `{queueId, name:"Maria Silva"}`
Note: function prefers email --> phone --> name

```javascript
var manuallyAddToQueue = functions.httpsCallable('manuallyAddToQueue');
manuallyAddToQueue({queueId, phone: "+351910196551"}).then(function(result) {
  //result: {ticketId, ticketNumber, remainingTicketsInQueue}
  console.log(result)
}).catch((e)=>{
  console.log(e)
});
```

### call next queue
call next person in queue
Note: fires email/SMS if necessary and updates queue `.currentTicketIndex`

```javascript
var callNextOnQueue = functions.httpsCallable('callNextOnQueue');
callNextOnQueue({queueId}).then(function(result) {
  //result(ticket): {number, email/phone/name}
  console.log(result)
}).catch((e)=>{
  console.log(e)
});
```

### delete queue
deletes this queue
Note: fires emails/SMS if necessary warning remaining people on queue and removes queueId item from DB entirely

```javascript
var deleteQueue = functions.httpsCallable('deleteQueue');
deleteQueue({queueId}).then(function(result) {
  //result: {deletedCount}
  console.log(result)
}).catch((e)=>{
  console.log(e)
});
```