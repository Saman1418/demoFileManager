const express = require("express");
const router = express.Router();
var admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const firebase = require("../../firebase/FirebaseConfig");

const firestore = firebase.firestore();

router.post("/orgainsationSignup", async (req, res) => {
  // await bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    // console.log(hash);

    try {
      admin
        .auth()
        .createUser({
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          // password: hash,
          password: req.body.password,
        })
        .then((data) => {

          console.log("data", data);
          admin.auth().createUser({
            
            displayName: req.body.primaryContactName,
            phoneNumber: req.body.primaryContactNumber,
          })
          .then((user) => {
            console.log("user",user);
            firestore
              .collection("/HealthWallet2.0/Organisations/data")
              .add({
                email: req.body.email,
                address: req.body.address,
                orgName: req.body.name,
                phoneNumber: req.body.phoneNumber,
                lastLogin: req.body.lastLogin,
                logoUrl: req.body.logoUrl,
                orgAdmins: [user.uid],
                // primaryColor:req.body.primaryColor,
              })
  
              .then(async (firestoreResponse) => {
                const orgainsationId = firestoreResponse.id;
                await firestore
                  .collection("/HealthWallet2.0/Organisations/data")
                  .doc(orgainsationId)
                  .update({
                    orgId: orgainsationId,
                  });
                // console.log("firestoreResponse",firestoreResponse)
                res
                  .status(200)
                  .send({ message: "orgainsation Created", id: orgainsationId });
              });
          });
        })
        
    } catch (e) {
      console.log(e);
      res.json({ message: "Error creating orgainsation" });
    }
  // });
});



router.post("/orgainsationLogin", async (req, res) => {
  // await bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    // console.log(hash);
    
    try {
      firebase
      .auth()
      .signInWithEmailAndPassword( req.body.email,req.body.password)
          .then((user) => {
            console.log("LoginUser",user);
            res.status(200).send({user})
          })
        
        
    } catch (e) {
      console.log(e);
      res.json({ message: "Error creating orgainsation" });
    }
  // })
  
})


router.post("/orgainsationSignUp1", async (req, res) => {
  
    try {
      firebase
      .auth()
      .createUserWithEmailAndPassword( req.body.email,req.body.password)
          .then((user) => {
            console.log("SignUpUser",user);
            res.status(200).send({user})
          });
        
        
    } catch (e) {
      console.log(e);
      res.json({ message: "Error creating orgainsation" });
    }
  
});








router.get("/orgainsationSignup", async (req, res) => {
  const usersResult = await admin.auth().listUsers(1000);
  res.json(usersResult.users);
});

//--------------get Orgain--------------------
router.get("/orgainsationSignup/:id", async (req, res) => {
  const id = req.params.id;
  // const newVolunters = req.body;

  try {
    const orgainsationData = await firestore
      .collection("/HealthWallet2.0/Organisations/data")
      .doc(id)
      .get();

    res.status(200).send({ orgainsationData });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//--------------get update--------------------
router.put("/orgainsationSignup/:id", async (req, res) => {
  const id = req.params.id;
  const newOrgainsation = req.body;

  try {
    await firestore
      .collection("/HealthWallet2.0/Patients/data")
      .doc(id)
      .set(newOrgainsation);

    res.status(200).send({ id });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
