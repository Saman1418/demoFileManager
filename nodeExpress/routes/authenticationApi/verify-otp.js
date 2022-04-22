const express = require('express')
const router = express.Router()
const firebase = require("../../firebase/FirebaseConfig")

const firestore = firebase.firestore()
const auth = firebase.auth()


router.post("/verify", async(request,response)=>{

    
    const userOtp = request.body;
    // const confirmationResult = JSON.stringify({verificationId: 'AJOnW4Q0RTez5C7FdxXABYjVNARnaQ-d6PgRgpc8A1MPEtPJ4Z…tgGTYyuJCAtq_PeKbP-cjq0q7NlmV0NSL3Wi0eyfZyjXRxCKQ', a: ƒ});
    

    try {
        await auth.confirmationResult.confirm("12345")

        response.status(200).send("Otp verify successfully");
    } catch (error) {
        response.status(400).send(error.message)
        
    }
});

module.exports = router;