const functions = require('firebase-functions').region('europe-west1');
const admin = require('firebase-admin');
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

//enable CORS
let onRequest = (cb) => {
    return functions.https.onRequest((req, res)=>{
        // Set CORS headers for preflight requests
        // Allows GETs from origin https://nafila.pt with Authorization header
    
        res.set('Access-Control-Allow-Origin', 'https://nafila.pt');
        res.set('Access-Control-Allow-Credentials', 'true');
        
        if (req.method === 'OPTIONS') {
            // Send response to OPTIONS requests
            res.set('Access-Control-Allow-Methods', 'GET');
            res.set('Access-Control-Allow-Headers', '*');
            res.set('Access-Control-Max-Age', '3600');
            res.status(204).send('');
        } else {
            return cb(req, res)
        }
    })
}

//Delete queue
exports.deleteQueue = onRequest((request, response) => {
    //receives queueId
    //needs to validate userId ownership of queue

    //notify every remaining person in queue of queue deletion
    //deletes queue from collection
});

//Call next person in queue
exports.callNextOnQueue = onRequest((request, response) => {
    //receives queueId
    //needs to validate userId ownership of queue

    //move queue to next person

    //if email-based
        //notify email
    //if SMS-based
        //notify via SMS
});

//Manually add person to queue
exports.manuallyAddToQueue = onRequest((request, response) => {
    //receives queueId
    //needs to validate userId ownership of queue

    //add person to queue (name, SMS or email based)
    //if name or SMS based
        //simply add to queue
    //if email
        //addEmailToQueue(email)
    
});

//Add me to queue
exports.addMeToQueue = onRequest(async (req, res) => {
    // [END addMessageTrigger]
    // Grab the text parameter.

    //context.auth - auth details
    const original = req.body.data.text;
    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('messages').add({original: original});
    // Send back a message that we've succesfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added.`});
    // [END adminSdkAdd]
});