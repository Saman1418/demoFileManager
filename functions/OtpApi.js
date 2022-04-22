const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const FirebaseConfig = require("./FirebaseConfig");
const Utilities = require("./Utilities.js");


const firestore = FirebaseConfig.firestore;
const auth = FirebaseConfig.auth;

const app = express();

app.use(cors({origin:true}));

app.use(bodyParser.json());



app.post("/generate", async(request,response)=>{


    response.status(200).send("Otp send");
    // const userNumber = request.body;
    

    // try {

    //     await auth.signInWithPhoneNumber(userNumber.mynumber,{})

    //     response.status(200).send("Otp send");
    // } catch (error) {
    //     response.status(400).send(error.message)
        
    // }
});

app.post("/verify", async(request,response)=>{

    const userOtp = request.body;
    

    try {
        await auth.ConfirmationResult.confirm(userOtp.otp)

        response.status(200).send("Otp verify successfully");
    } catch (error) {
        response.status(400).send(error.message)
        
    }
});

functions.logger.log(auth);



// app.listen(5000,()=>{
//     console.log("Server Started")
// })

module.exports = app;
