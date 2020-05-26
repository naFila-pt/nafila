# Serverless BE

## Firestore collections

There are 3 collections in the app:

### Main users collection: `/users/<userId>`

A user is identified by `userId` (same as `firebase.auth.currentUser.uid`) and contains:

- a `.queues` - a list of `<queueId>` entries
- a `.defaultQueueName` - default store/queue name

A user entry is create directly from the client-side per logged-in user, and the user object looks like

```javascript
{
  queues:[], //list of users queueIds (Note: only 1 queue pert user for current app flows)
  defaultQueueName:null //store name - used as default for queue.name input
}
```

### Main queues collection: `/queues/<queueId>`

A queue is identified by `queueId` (generated in backend) and contains:

- a `.owner_id` - the owner's `<userId>`
- a `.name` - store name
- a `.remainingTicketsInQueue` - remaining active people in queue
- a `.ticketTopNumber` - number of the last ticket
- a `.currentTicketNumber` - number of the current ticket being attended
- a `.currentTicketName` - name of the current ticket being attended (if `.name` based ticket - `null` otherwise)

A queue is created by a user from the admin view and

```javascript
{
  owner_id,
  name,
  remainingTicketsInQueue:0,
  ticketTopNumber:0,
  currentTicketNumber:0,
  currentTicketName:null
}
```

### Ticket collections per queue: `/queues/<queueId>/tickets/`

A queue is identified by `ticketId` (auto-generated) and contains:

- a `.number` - number in the queue (1,2,3,4...)
- one of:
  - an `.email` - user email in queue
  - a `.phone` - user phone number in queue
  - a `.name` - persons name in queue

A ticket can be created by:

- a logged in user from the admin view
- an anonymous user in the app (via email)
- an anonymous user via phone SMS (backend loop)

---

## Firestore operations from client

```javascript
var firestore = firebase.firestore();
```

### create new user

```javascript
var userDoc = firestore.collection("users").doc(uid);
userDoc
  .set({ queues: [] })
  .then(ok)
  .catch(error);
```

---

## Function operations from client

Note: all functions for nafila.pt are stored in `'europe-west1'` region

```javascript
var functions = firebase.app().functions("europe-west1");
```

### create new queue

Note: `email` parameter is the store manager (user) email - in order for him to receive poster email

```javascript
var createQueue = functions.httpsCallable("createQueue");
createQueue({ name, email })
  .then(function(result) {
    //result: {queueId, queue}
    //.queue: {owner_id, name, remainingTicketsInQueue, ticketTopNumber, currentTicketNumber, currentTicketName}
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
```

### add me (anonymous user) to queue

```javascript
var addMeToQueue = functions.httpsCallable("addMeToQueue");
addMeToQueue({ queueId, email: "carlos.mr.ouro@gmail.com" })
  .then(function(result) {
    //result: {ticket, queue}
    //.ticket: {number, email}
    //.queue: {owner_id, name, remainingTicketsInQueue, ticketTopNumber, currentTicketNumber, currentTicketName}
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
```

### remove me (anonymous user) from queue

call next person in queue
Note: fires email/SMS if necessary and updates queue `.currentTicketIndex`

```javascript
var removeMeFromQueue = functions.httpsCallable("removeMeFromQueue");
removeMeFromQueue({ queueId, ticketId })
  .then(function(result) {
    //result: {ticket, queue}
    //.ticket: {number, email}
    //.queue: {owner_id, name, remainingTicketsInQueue, ticketTopNumber, currentTicketNumber, currentTicketName}
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
```

### manually add a user to queue (via authenticated admin)

can be called with `{queueId, email: "carlos.mr.ouro@gmail.com"}`, or `{queueId, phone: "+351910196551"}`, or `{queueId, name:"Maria Silva"}`
Note: in case multiple are provided, function prefers email --> phone --> name

```javascript
var manuallyAddToQueue = functions.httpsCallable("manuallyAddToQueue");
manuallyAddToQueue({ queueId, phone: "+351910196551" })
  .then(function(result) {
    //result: {ticket, queue}
    //.ticket: {number, email/phone/name}
    //.queue: {owner_id, name, remainingTicketsInQueue, ticketTopNumber, currentTicketNumber, currentTicketName}
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
```

### call next queue

call next person in queue
Note: fires email/SMS if necessary, removes ticket from queue and updates queue's state: `.remainingTicketsInQueue`, `.currentTicketNumber` and `.currentTicketName`

```javascript
var callNextOnQueue = functions.httpsCallable("callNextOnQueue");
callNextOnQueue({ queueId })
  .then(function(result) {
    //result: {queue, ticket}
    //.ticket: {number, email/phone/name}
    //.queue: {owner_id, name, remainingTicketsInQueue, ticketTopNumber, currentTicketNumber, currentTicketName}
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
```

### delete queue

deletes this queue
Note: fires emails/SMS if necessary warning remaining people on queue and removes queueId item from DB entirely

```javascript
var deleteQueue = functions.httpsCallable("deleteQueue");
deleteQueue({ queueId })
  .then(function(result) {
    //result: {deletedCount}
    //.deletedCount -- number of deleted tickets that were still active in queue
    console.log(result);
  })
  .catch(e => {
    console.log(e);
  });
```
