const express = require("express");
const router = express.Router();
const firebase = require("../../firebase/FirebaseConfig");
var admin = require("firebase-admin");

const firestore = admin.firestore();
const auth = firebase.auth();

//------------------------ create healthCamp-----------------------------------------

router.post("/healthCamp", async (req, res) => {
  const newhealthCamp = {
    coverImage: req.body.coverImage,
    description: req.body.description,
    endDate: req.body.endDate,
    isActive: req.body.isActive,
    name: req.body.name,
    orgId: req.body.orgId,
    orgToken: req.body.orgToken,
    // startDate: firebase.firestore.FieldValue.serverTimestamp(),
    startDate: req.body.startDate,
    location: req.body.location,
  };

  try {
    const firestoreResponse = await firestore
      .collection("/HealthWallet2.0/HealthCamps/data")
      .add(newhealthCamp);

    const healthCampId = firestoreResponse.id;
    res.status(201).send({ id: healthCampId });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//--------------------------update healthCamp ------------------------------------------

router.put("/healthCamp/:id", async (req, res) => {
  const id = req.params.id;
  const newhealthCamp = req.body;

  try {
    await firestore
      .collection("/HealthWallet2.0/HealthCamps/data")
      .doc(id)
      .set(newhealthCamp);

    res.status(200).send({ id });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//-------------------------- get healthCamp---------------------------------------

router.get("/healthCamp", async (request, response) => {
  
    const queryObject = request.query;
    const location = queryObject["location"] ? queryObject["location"] : "";
    const pageNumber = queryObject["pageNumber"] ? queryObject["pageNumber"] : "";
    const perPage = queryObject["perPage"] ? queryObject["perPage"] : "";
    // const gender = queryObject["gender"] ? queryObject["gender"] : "";
   
    // const location = ['delhi','uk'];
  
  let collectionRef = firestore.collection("/HealthWallet2.0/HealthCamps/data");


  if(location){
    collectionRef = collectionRef.where("location", "in", location);
    
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
    const fetchedHealthCamp = firestoreResponse.docs.map((healthCamp) => {
      const id = healthCamp.id;
      const data = healthCamp.data();

      return { ...data, id };
    });

    const payload = {
      document: fetchedHealthCamp,
    };

    response.status(200).send(payload);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

//------------------------delete healthCamp---------------------------------------

router.delete("/healthCamp/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await firestore
      .collection("/HealthWallet2.0/HealthCamps/data")
      .doc(id)
      .delete();

    res.status(200).send("deleted");
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
