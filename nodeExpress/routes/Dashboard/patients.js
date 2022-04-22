const express = require("express");
const router = express.Router();
const firebase = require("../../firebase/FirebaseConfig");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const firestore = firebase.firestore();
const auth = firebase.auth();
var admin = require("firebase-admin");
//-----------------------------------create patients------------------------------------
// router.post("/patients", async(req,res)=>{

//     const newpatient = {
//         aadhaarNo: req.body.aadhaarNo,
//         email:req.body.email,
//         age:req.body.age,
//         gender:req.body.gender,
//         firstName:req.body.firstName,
//         lastName:req.body.lastName,
//         phone:req.body.phone,
//         dateOfBirth:req.body.dateOfBirth,
//         state:req.body.state,
//         userId:req.body.userId,
//         district:req.body.district,
//         isActive:req.body.isActive,
//         isPhoneVerified:req.body.isPhoneVerified,

//     }

//     try {
//         const firestoreResponse = await firestore.collection("/HealthWallet2.0/Patients/data").add(newpatient);

//         const patientId = firestoreResponse.id;
//         res.status(201).send({id : patientId});
//     } catch (error) {
//         res.status(400).send(error.message)

//     }
// });

router.post("/patients", async (req, res) => {
  await bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    try {
      admin
        .auth()
        .createUser({
          displayName: req.body.firstName,
          phoneNumber: req.body.phone,
          password: hash,
        })
        .then((userData) => {
            // console.log("userData",userData)
          firestore
            .collection("/HealthWallet2.0/Patients/data")
            .add({
              aadhaarNo: req.body.aadhaarNo,
              email: req.body.email,
              age: req.body.age,
              gender: req.body.gender,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              phone: req.body.phone,
              dateOfBirth: req.body.dateOfBirth,
              state: req.body.state,
              userId: userData.uid,
              district: req.body.district,
              isActive: req.body.isActive,
              isPhoneVerified: req.body.isPhoneVerified,
            })
            .then(async(firestoreResponse) => {
                const patientsId = firestoreResponse.id
                await firestore.collection("/HealthWallet2.0/Patients/data").doc(patientsId).update({
                  patientsId: patientsId
                })
                // console.log("firestoreResponse",firestoreResponse)
                res.send({ message: "Patients Created",id:patientsId });
            })
            
        });
    } catch (e) {
      console.log(e);
      res.json({ message: "Error creating orgainsation" });
    }
  });
});

//----------------------------update patients------------------------------------

router.put("/patients/:id", async (req, res) => {
  const id = req.params.id;
  const newpatient = req.body;

  try {
    await firestore
      .collection("/HealthWallet2.0/Patients/data")
      .doc(id)
      .set(newpatient);

    res.status(200).send({ id });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//-----------------------------get patients------------------------------------

router.get("/patients", async (request, response) => {
  const queryObject = request.query;
  const phone = queryObject["phone"] ? queryObject["phone"] : "";
  const patientsId = queryObject["patientsId"] ? queryObject["patientsId"] : "";
  const gender = queryObject["gender"] ? queryObject["gender"] : "";
  const orderByField = queryObject["orderByField"]
    ? queryObject["orderByField"]
    : "";
  const pageNumber = queryObject["pageNumber"] ? queryObject["pageNumber"] : "";
  const perPage = queryObject["perPage"] ? queryObject["perPage"] : "";

  let collectionRef = firestore.collection("/HealthWallet2.0/Patients/data");

  if (phone) {
    collectionRef = collectionRef.where("phone", "==", phone);
  }

  if (gender) {
    collectionRef = collectionRef.where("gender", "==", gender);
  }

  if(patientsId){
    collectionRef = collectionRef.where("patientsId", "==", patientsId)
  }

  try {
    const firestoreResponse = await collectionRef.get();
    const fetchedRecipes = firestoreResponse.docs.map((patient) => {
      const id = patient.id;
      const data = patient.data();

      return { ...data, id };
    });

    const payload = {
      document: fetchedRecipes,
    };

    response.status(200).send(payload);
  } catch (error) {
    response.status(400).send(error.message);
  }
});

//----------------delete patients-----------------------------

router.delete("/patients/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await firestore
      .collection("/HealthWallet2.0/Patients/data")
      .doc(id)
      .delete();

    res.status(200).send();
  } catch (error) {
    res.status(401).send(error.message);
  }
});



const products = [
  { name: 'Laptop', price: 32000, brand: 'Lenovo', color: 'Silver' },
  { name: 'Phone', price: 700, brand: 'Iphone', color: 'Golden' },
  { name: 'Watch', price: 3000, brand: 'Casio', color: 'Yellow' },
  { name: 'Aunglass', price: 300, brand: 'Ribon', color: 'Blue' },
  { name: 'Camera', price: 9000, brand: 'Lenovo', color: 'Gray' },
];

const datas =  [
      {
          email: "samanvay.agarwal07@gmail.com",
          lastName: "aggarwal",
          phone: "+919125047945",
          age: 18,
          firstName: "saman",
          userId: "Qx8y2phTbeNAjkSqg2WM28oCiiX2",
          state: "rishikesh",
          gender: "male",
          isPhoneVerified: "false",
          patientsId: "8ukP7Mxsbdv8ePikiOdN",
          dateOfBirth: "01/04/1998",
          district: "ddun",
          isActive: "true",
          aadhaarNo: "97685748094",
          id: "8ukP7Mxsbdv8ePikiOdN"
      },
      {
          phone: "+919125047455",
          firstName: "uddeshya",
          district: "ddun",
          lastName: "aggarwal",
          aadhaarNo: "97685748094",
          state: "rishikesh",
          age: 18,
          isPhoneVerified: "false",
          isActive: "true",
          dateOfBirth: "30/07/1999",
          gender: "male",
          email: "uddeshya.agarwal@gmail.com",
          id: "KOKLyVOC2BUHyAFkNG7R"
      }
  ]


//----------------search patients-----------------------------

router.get("/patients/:key",async(req,res)=>{

  const key = req.params.key
  let collectionRef = firestore.collection("/HealthWallet2.0/Patients/data");

  // collectionRef.where("phone", ">=", key) .where("phone", "<=", key + "\uf8ff")
  if(key){
    // collectionRef.orderBy("phone").startAt(key).endAt(key + "\uf8ff")
    collectionRef.where("phone", ">=", key).where("phone", "<=", key + "\uf8ff")
  }
  try {

    const firestoreResponse = await collectionRef.get();
    const fetchedRecipes = firestoreResponse.docs.map((patient) => {
      const id = patient.id;
      const data = patient.data();

      return { ...data, id };
    });
    const payload = [{
      document: fetchedRecipes,
    }];

    // const bigNumbers = products.find(product => product.price > 4000);
    // const bigNumbers = fetchedRecipes.find(product => product.phone === req.params.key);
    // const data = await fetchedRecipes.find(
    //   {
    //     "$or":[
    //       {"phone":{$regex:key}}
    //     ]
    //   }
    // )

    res.status(200).send(payload)
  } catch (error) {
    res.status(401).send(error.message)
  }


})


module.exports = router;

// router.post("/patients", async(request,response)=>{
//     // const autherizationHeader = request.headers["authorization"];

//     // if(!autherizationHeader){
//     //     response.status(401).send("Missing Authorization Header");
//     //     return;
//     // }

//     // try {
//     //     await Utilities.autherizeUser(autherizationHeader,auth)
//     // } catch (error) {
//     //     response.status(401).send(error.message);
//     //     return;

//     // }

//     const newpatient = request.body;
//     // const missingFields = Utilities.validateRecipePostPut(newpatient);

//     // if(missingFields){
//     //     response.status(400).send(`patient is not valid. Missing/invalid fields: ${missingFields}`)
//     //     return;
//     // }

//     // const patient = Utilities.sanitizeRecipePostPut(newpatient);

//     try {
//         const firestoreResponse = await firestore.collection("patients").add(newpatient);

//         const patientId = firestoreResponse.id;
//         response.status(201).send({id : patientId});
//     } catch (error) {
//         response.status(400).send(error.message)

//     }
// });
