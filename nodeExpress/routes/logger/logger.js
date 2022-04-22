const express = require('express')
const router = express.Router()
const firebase = require("../../firebase/FirebaseConfig")

const firestore = firebase.firestore()
const auth = firebase.auth()


router.post("/logger", async(req,res)=>{
    
    const newLogger = {
        logMessage: req.body.logMessage,
        userId:req.body.userId,
        userName:req.body.userName,
        userType:req.body.userType,
        
        
    }

    try {
        const firestoreResponse = await firestore.collection("/HealthWallet2.0/logger/data").add(newLogger);

        const loggerId = firestoreResponse.id;
        res.status(201).send({id : loggerId});
    } catch (error) {
        res.status(400).send(error.message)
        
    }
});







module.exports = router;





