const express = require("express");
const router = express.Router();
var admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const firebase = require("../../firebase/FirebaseConfig");

const firestore = firebase.firestore();

// router.post("/users", async(request,response)=>{

//     const newusers = request.body;

//     try {
//         const firestoreResponse = await firestore.collection("users").add(newusers);

//         const usersId = firestoreResponse.id;
//         response.status(201).send({id : usersId});
//     } catch (error) {
//         response.status(400).send(error.message)

//     }
// });

//---- create Volunters-------

router.post("/volunteer", async (req, res) => {
  await bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    // console.log(hash);

    try {
      admin
        .auth()
        .createUser({
          displayName: req.body.name,
          phoneNumber: req.body.phoneNumber,
          password: hash,
        })
        .then((userData) => {
          // console.log(userData)
          // console.log("uid",userData.uid)
          admin.auth().setCustomUserClaims(userData.uid, {
            admin: false,
            valunteer: true,
            patient: false,
          });

          firestore.collection("/HealthWallet2.0/Volunters/data").add({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            userId: userData.uid,
            gender: req.body.gender,
            roles: req.body.roles,
            dateOfBirth: req.body.dateOfBirth,
            UploadIdProof: req.body.UploadIdProof,
            orgId:req.body.orgId
          });
        }).then(()=>{
          res.send({ message: "Volunters Created" });
        })
      

      
    } catch (e) {
      console.log(e);
      res.json({ message: "Error creating orgainsation" });
    }
  });
});

//----------------------------- get Volunters---------------------------------

router.get("/volunteer", async (request,response)=>{
    

  const queryObject = request.query;
  const roles = queryObject["roles"] ? queryObject["roles"] : "";
  const userId = queryObject["userId"] ? queryObject["userId"] : "";
  const orgId = queryObject["orgId"] ? queryObject["orgId"] : "";
 


  let collectionRef = firestore.collection("/HealthWallet2.0/Volunters/data");


  if(roles){
      collectionRef = collectionRef.where("roles", "==", roles);
  }

  if(userId){
      collectionRef = collectionRef.where("userId", "==", userId);
  }

  if(orgId){
    collectionRef = collectionRef.where("orgId", "==", orgId);
  }



  try {
      const firestoreResponse = await collectionRef.get();
      const fetchedVolunters = firestoreResponse.docs.map((volunters)=>{
          const id = volunters.id;
          const data = volunters.data();

          return {...data,id};

      });

      const payload = {
          document: fetchedVolunters
      }

      response.status(200).send(payload);
  } catch (error) {
      response.status(400).send(error.message);
      
  }

})


//----------------------------update patients------------------------------------

router.put('/volunteer/:id',async(req,res)=>{


  const id = req.params.id;
  const newVolunters = req.body;


  try {
      await firestore.collection("/HealthWallet2.0/Volunters/data").doc(id).set(newVolunters);

      res.status(200).send({id});
  } catch (error) {
      res.status(400).send(error.message);
      
  }

})


//----------------delete patients-----------------------------

router.delete('/volunteer/:id', async (req,res)=>{

  const id = req.params.id;

  try {
      await firestore.collection("/HealthWallet2.0/Volunters/data").doc(id).delete()

      res.status(200).send({id:id,"message":"deleted"})
  } catch (error) {
      res.status(401).send(error.message);
  }



})

// router.get("/users", async (req, res) => {
//   const usersResult = await admin.auth().listUsers(1000);
//   res.json(usersResult.users);
// });

module.exports = router;

// router.post("/users", async (req, res) => {
//   await bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
//     // console.log(hash);

//     try {
//       admin.auth().createUser({
//         displayName: req.body.name,
//         usertype:"Volunteer",
//         phoneNumber: req.body.phone,
//         password: hash,
//       }).then((userdata)=>{

//         admin.auth()
// .setCustomUserClaims(uid, { admin: false,valunteer:true,patient:false })

// .then(() => {
//   // The new custom claims will propagate to the user's ID token the
//   // next time a new one is issued.
//   firestore.collection("/HealthWallet2.0/Volunters/data").add({
//     name: req.body.name,
//     phoneNumber: req.body.phone,
//     userId:userData.userId,
//     gender:req.body.gender,
//     roles:req.body.roles,
//     dateOfBirth:req.body.dateOfBirth,
//     UploadIdProof:req.body.UploadIdProof
// })
// res.send({ message: "Volunters Created" });
// });

//     } catch (e) {
//       console.log(e);
//       res.json({ message: "Error creating orgainsation" });
//     }
//   });
// });
