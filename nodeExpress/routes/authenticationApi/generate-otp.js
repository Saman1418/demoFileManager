const express = require('express')
const router = express.Router()
const firebase = require("../../firebase/FirebaseConfig")

const firestore = firebase.firestore()
const auth = firebase.auth()


router.post("/generate", async(request,response)=>{


    // response.status(200).send("Otp send to me");
    const userNumber = request.body;
    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    

    try {

        await auth.signInWithPhoneNumber(userNumber.mynumber,verify)

        response.status(200).send("Otp send");
    } catch (error) {
        response.status(400).send(error.message)
        
    }
});

module.exports = router;