const express = require('express');

const fetch = require('node-fetch');

const router = express.Router();

router.post('/sendToAll',(req,res)=>{
    var notification = {
        'title':'Title of notification',
        'text': 'Subtitle'
    }

    var fcm_tokens = ['efbRVS7pXQ36gHCPCMNf5s:APA91bE-rENyYS7QIy0dOZmoNuZOfhw57KIEo4-PU653XgvPUTRiSTzOfSQw2SU3TTWCi23uTmFP9UQSJnHQys8SNFcbEulPgBy1-G2w5WID4VmKeu87XPJaD9jfNKnaH2nTn9s4cLIG'];

    var notification_body = {
        'notification':notification,
        'registration_ids':fcm_tokens
    }

    fetch('https://fcm.googleapis.com/fcm/send',{
        'method':'POST',
        'headers':{
            'Authorization':'key='+'AAAAQ2bQXcs:APA91bEfJx7DJMIDuBn6B-98bA0q-6Uqw6gYZbSbeyvgW6tlabCb0DrWIhCaK2snJvw35bNs2pTg2GZC_DpcB0PKDQOM6CKVyv3Lz0FTFB53lw7if6dDaIRgBuSU6YAZxyFtkBNgGAtr',
            'Content-Type':'application/json',
        },
        'body':JSON.stringify(notification_body)

    }).then(()=>{
        res.status(200).send('Notification send successfully')
    }).catch((err)=>{
        res.status(400).send('Something went wrong')
        console.log(err)
    })
});

module.exports = router