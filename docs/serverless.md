# Serverless

## Firestore operations from client:

```javascript
var firestore = firebase.firestore();
```

### create new user

A user is identified by `uid` (from auth) and contains a list of `.queues` 
it is stored in firestore as `/users/<userId>/{queues:[], defaultQueueName:null}`

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
A queue is identified by `queueId` (generated in backend) and contains:
- a `.owner_id` - the owner's `<userId>`
- a `.name` - store name
- a `.remainingTicketsInQueue` - remaining active people in queue
- a `.ticketTopNumber` - number of the last ticket
- a `.currentTicketNumber` - number of the current ticket being attended
- a `.currentTicketName` - name of the current ticket being attended (if `.name` based ticket - `null` otherwise)
A queue is stored in firestore as `/queues/<queueId>/{owner_id, name, remainingTicketsInQueue, ticketTopNumber, currentTicketNumber, currentTicketName}`

Note: email is the store manager (user) email - in order for him to receive poster email

```javascript
var createQueue = functions.httpsCallable('createQueue');
createQueue({name, email}).then(function(result) {
  //result: {queueId, queue}
  //.queue: {owner_id, name, remainingTicketsInQueue, ticketTopNumber, currentTicketNumber, currentTicketName}
  console.log(result)
}).catch((e)=>{
  console.log(e)
});
```

### add me (anonymous user) to queue

```javascript
var addMeToQueue = functions.httpsCallable('addMeToQueue');
addMeToQueue({queueId, email: "carlos.mr.ouro@gmail.com"}).then(function(result) {
  //result: {ticket, queue}
  //.ticket: {number, email}
  //.queue: {owner_id, name, remainingTicketsInQueue, ticketTopNumber, currentTicketNumber, currentTicketName}
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
  //result: {ticket, queue}
  //.ticket: {number, email}
  //.queue: {owner_id, name, remainingTicketsInQueue, ticketTopNumber, currentTicketNumber, currentTicketName}
  console.log(result)
}).catch((e)=>{
  console.log(e)
});
```

### manually add a user to queue (via authenticated admin)
can be called with `{queueId, email: "carlos.mr.ouro@gmail.com"}`, or `{queueId, phone: "+351910196551"}`, or `{queueId, name:"Maria Silva"}`
Note: in case multiple are provided, function prefers email --> phone --> name

```javascript
var manuallyAddToQueue = functions.httpsCallable('manuallyAddToQueue');
manuallyAddToQueue({queueId, phone: "+351910196551"}).then(function(result) {
  //result: {ticket, queue}
  //.ticket: {number, email/phone/name}
  //.queue: {owner_id, name, remainingTicketsInQueue, ticketTopNumber, currentTicketNumber, currentTicketName}
  console.log(result)
}).catch((e)=>{
  console.log(e)
});
```

### call next queue
call next person in queue
Note: fires email/SMS if necessary, removes ticket from queue and updates queue's state: `.remainingTicketsInQueue`, `.currentTicketNumber` and `.currentTicketName`

```javascript
var callNextOnQueue = functions.httpsCallable('callNextOnQueue');
callNextOnQueue({queueId}).then(function(result) {
  //result: {queue, ticket}
  //.ticket: {number, email/phone/name}
  //.queue: {owner_id, name, remainingTicketsInQueue, ticketTopNumber, currentTicketNumber, currentTicketName}
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
  //.deletedCount -- number of deleted tickets that were still active in queue
  console.log(result)
}).catch((e)=>{
  console.log(e)
});
```