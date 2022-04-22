// const express = require('express')
// var cors = require("cors");
// const bodyParser = require("body-parser");

// const firebase = require("./firebase/FirebaseConfig")

// const firestore = firebase.firestore()
// const auth = firebase.auth()


// const app = express();

// app.use(cors({origin:true}));

// app.use(bodyParser.json());



const express = require('express')
// const port = process.env.PORT || 3000
const compression = require('compression')
const bodyParser = require("body-parser");
const path = require('path');
var cors = require("cors");
const firebase = require("./firebase/FirebaseConfig");
const app = express()
app.use(express.urlencoded())
app.use(express.json());


app.use(cors({origin:true}));
app.use(bodyParser.json());


//storage 
const saltedMd5 = require('salted-md5')
// const path = require('path');
const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})
require('dotenv').config()






// view engine setup
app.set('views', path.join(__dirname, 'static', 'views'))
app.set('view engine', 'ejs')
app.use(compression())
app.use('/public', express.static(path.join(__dirname, 'static', 'public')))




// -----------firebase Config

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://healthwallet-d6d30-default-rtdb.firebaseio.com",
  storageBucket: process.env.BUCKET_URL
  });
  // app.locals.bucket = admin.storage().bucket()
  

  app.post('/upload',upload.single('file'),async(req,res)=>{
    const name = saltedMd5(req.file.originalname, 'SUPER-S@LT!')
    const fileName = name + path.extname(req.file.originalname)
    await app.locals.bucket.file(fileName).createWriteStream().end(req.file.buffer)
    res.send('done');
    })


//--- Patients Details ----
const patientsRoutes = require('./routes/Dashboard/patients')

app.use(patientsRoutes)


//--- Authantication Details ----
const otpGenerateRoutes = require('./routes/authenticationApi/generate-otp')
const otpVerifyRoutes = require('./routes/authenticationApi/verify-otp')

app.use(otpGenerateRoutes)
app.use(otpVerifyRoutes)



//---Admin users Details ----

const users = require('./routes/Volunters/Volunters')



app.use(users)


//---HealthCamp Details ----

const healthCampRoutes = require('./routes/HealthCamp/healthCamp')

app.use(healthCampRoutes)


//---healthRecord details ----

const healthRecordRoutes = require('./routes/healthRecord/healthRecord')

app.use(healthRecordRoutes)




//---orgainsation Details ----

const orgainsationCreateRoutes = require('./routes/orgainsation/orgainsation')

app.use(orgainsationCreateRoutes)

//---logger ----

const loggerRoutes = require('./routes/logger/logger')

app.use(loggerRoutes)






app.get('/', function(req, res) {
    res.send('Node API');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log("server started"));