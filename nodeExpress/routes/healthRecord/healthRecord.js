const express = require('express')
const router = express.Router()
const firebase = require("../../firebase/FirebaseConfig")

const firestore = firebase.firestore()
const auth = firebase.auth()


router.post("/healthRecord", async(req,res)=>{
    
    const newHealthRecord = {
        userId:req.body.userId,
        userName:req.body.userName,
        userType:req.body.userType, 
        fileURL: req.body.fileURL,
        recordType: req.body.recordType,
        createdDate:req.body.createdDate,
        uploadedByOrganisation:req.body.uploadedByOrganisation,
        uploadedByVolunter:req.body.uploadedByVolunter,
        isSelfUploaded:req.body.isSelfUploaded,
        patientId:req.body.patientId,
        
    }

    try {
        const firestoreResponse = await firestore.collection("/HealthWallet2.0/HealthRecord/data").add(newHealthRecord);

        const healthRecordId = firestoreResponse.id;
        res.status(201).send({id : healthRecordId});
    } catch (error) {
        res.status(400).send(error.message)
        
    }
});



//---------------get healthRecords-------------------------

router.get("/healthRecord", async (request, response) => {
    const queryObject = request.query;
    const patientId = queryObject["patientId"] ? queryObject["patientId"] : "";
    const uploadedByOrganisation = queryObject["uploadedByOrganisation"] ? queryObject["uploadedByOrganisation"] : "";
    const orderByField = queryObject["orderByField"]
      ? queryObject["orderByField"]
      : "";
    const pageNumber = queryObject["pageNumber"] ? queryObject["pageNumber"] : "";
    const perPage = queryObject["perPage"] ? queryObject["perPage"] : "";
  
    let collectionRef = firestore.collection("/HealthWallet2.0/HealthRecord/data");
  
  
  
    if(patientId){
      collectionRef = collectionRef.where("patientId", "==", patientId)
    }

    if(patientId && uploadedByOrganisation){
      collectionRef = collectionRef.where("patientId", "==", patientId).where("uploadedByOrganisation", "==",uploadedByOrganisation)
    }


    if(uploadedByOrganisation){
      collectionRef = collectionRef.where("uploadedByOrganisation", "==",uploadedByOrganisation)
    }
  
    try {
      const firestoreResponse = await collectionRef.get();
      const fetchedHealthRecord = firestoreResponse.docs.map((healthRecord) => {
        const id = healthRecord.id;
        const data = healthRecord.data();
  
        return { ...data, id };
      });
  
      const payload = {
        document: fetchedHealthRecord,
      };
  
      response.status(200).send(payload);
    } catch (error) {
      response.status(400).send(error.message);
    }
  });




//-------------------update healthRecord----------------

router.put("/healthRecord/:id", async (req, res) => {
    const id = req.params.id;
    const newHealthRecord = req.body;
  
    try {
      await firestore
        .collection("/HealthWallet2.0/HealthRecord/data")
        .doc(id)
        .set(newHealthRecord);
  
      res.status(200).send({ id });
    } catch (error) {
      res.status(400).send(error.message);
    }
  });



  //----------------delete healthRecord-----------------------------

router.delete("/healthRecord/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      await firestore
        .collection("/HealthWallet2.0/HealthRecord/data")
        .doc(id)
        .delete();
  
      res.status(200).send();
    } catch (error) {
      res.status(401).send(error.message);
    }
  });
  

module.exports = router;