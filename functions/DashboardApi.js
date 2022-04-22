const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const FirebaseConfig = require("./FirebaseConfig");
const Utilities = require("./Utilities.js");

// const functions = FirebaseConfig.functions;
// const storageBucket = FirebaseConfig.storageBucket;
// const admin = FirebaseConfig.admin;


const firestore = FirebaseConfig.firestore;
const auth = FirebaseConfig.auth;

const app = express();

app.use(cors({origin:true}));

app.use(bodyParser.json());


// ~~ RESTFUL CRUD WEB API ENDPOINTS ~~

// newRecipe

// ------------------------POST patients API ---------------------------------

app.post("/patients", async(request,response)=>{
    const autherizationHeader = request.headers["authorization"];

    if(!autherizationHeader){
        response.status(401).send("Missing Authorization Header");
        return;
    }

    try {
        await Utilities.autherizeUser(autherizationHeader,auth)
    } catch (error) {
        response.status(401).send(error.message);
        return;
        
    }

    const newpatient = request.body;
    const missingFields = Utilities.validateRecipePostPut(newpatient);

    if(missingFields){
        response.status(400).send(`patient is not valid. Missing/invalid fields: ${missingFields}`)
        return;
    }

    const patient = Utilities.sanitizeRecipePostPut(newpatient);

    try {
        const firestoreResponse = await firestore.collection("patients").add(patient);

        const patientId = firestoreResponse.id;
        response.status(201).send({id : patientId});
    } catch (error) {
        response.status(400).send(error.message)
        
    }
});



//------------------------ GET patients API ---------------------------------

app.get("/patients", async (request,response)=>{
    const autherizationHeader = request.headers["authorization"];

    if(!autherizationHeader){
        response.status(401).send("Missing Authorization Header");
        return;
    }

    try {
        await Utilities.autherizeUser(autherizationHeader,auth)

        // isAuth = true;
    } catch (error) {
        response.status(401).send(error.message);
        return;
        
    }

    const queryObject = request.query;
    const PhoneNumber = queryObject["PhoneNumber"] ? queryObject["PhoneNumber"] : "";
    const orderByField = queryObject["orderByField"] ? queryObject["orderByField"] : "";
    const pageNumber = queryObject["pageNumber"] ? queryObject["pageNumber"] : "";
    const perPage = queryObject["perPage"] ? queryObject["perPage"] : "";

    // let isAuth = false;
    let collectionRef = firestore.collection("patients");


    if(PhoneNumber){
        collectionRef = collectionRef.where("PhoneNumber", "==", PhoneNumber);
    }

    if(perPage){
        collectionRef = collectionRef.limit(Number(perPage));
    }

    if(pageNumber > 0 && perPage){
        const pegeNumberMultiplier = pageNumber - 1;
        const offset = pegeNumberMultiplier * perPage;
        collectionRef = collectionRef.offset(offset);
    }


    try {
        const firestoreResponse = await collectionRef.get();
        const fetchedRecipes = firestoreResponse.docs.map((patient)=>{
            const id = patient.id;
            const data = patient.data();

            return {...data,id};

        });

        const payload = {
            document: fetchedRecipes
        }

        response.status(200).send(payload);
    } catch (error) {
        response.status(400).send(error.message);
        
    }

})


// ------------------------PUT patients API ---------------------------------

app.put('/patients/:id',async(request,response)=>{
    const autherizationHeader = request.headers["authorization"];

    if(!autherizationHeader){
        response.status(401).send("Missing Authorization Header");
        return;
    }

    try {
        await Utilities.autherizeUser(autherizationHeader,auth)

    } catch (error) {
        response.status(401).send(error.message);
        return;
        
    }

    const id = request.params.id;
    const newpatient = request.body;
    const missingFields = Utilities.validateRecipePostPut(newpatient);

    if(missingFields){
        response.status(400).send(`patients is not valid. Missing/invalid field ${missingFields}`);
        return
    }

    const patient = Utilities.sanitizeRecipePostPut(newpatient);

    try {
        await firestore.collection("patients").doc(id).set(patient);

        response.status(200).send({id});
    } catch (error) {
        response.status(400).send(error.message);
        
    }

})

//------------------------  Delete patients id API ------------------------

app.delete('/patients/:id', async (request,response)=>{
    const autherizationHeader = request.headers["authorization"];

    if(!autherizationHeader){
        response.status(401).send("Missing Authorization Header");
        return;
    }

    try {
        await Utilities.autherizeUser(autherizationHeader,auth)

    } catch (error) {
        response.status(401).send(error.message);
        return;
        
    }

    const id = request.params.id;

    try {
        await firestore.collection("patients").doc(id).delete()

        response.status(200).send()
    } catch (error) {
        response.status(401).send(error.message);
    }



})













app.post("/login", async(request,response)=>{
    const phoneNumber = request.body["username"];
    const password = request.body["password"];

    const newpatient = request.body;
    const missingFields = Utilities.validateRecipePostPut(newpatient);

    if(missingFields){
        response.status(400).send(`patient is not valid. Missing/invalid fields: ${missingFields}`)
        return;
    }

    const patient = Utilities.sanitizeRecipePostPut(newpatient);

    try {
        const firestoreResponse = await firestore.collection("patients").add(patient);

        const patientId = firestoreResponse.id;
        response.status(201).send({id : patientId});
    } catch (error) {
        response.status(400).send(error.message)
        
    }
});



app.get("/",(req,res)=>{
    res.send("Hello Firebase API")

})


app.listen(5000,()=>{
    console.log("Server Started")
})

module.exports = app;
