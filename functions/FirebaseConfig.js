const functions = require("firebase-functions");
const admin = require("firebase-admin");

// const FIREBASE_STORAGE_BUCKET = "";

const apiFirebaseOptions = {
    ...functions.config().firebase,
    Credential: admin.credential.applicationDefault(),
};


admin.initializeApp(apiFirebaseOptions);

const firestore = admin.firestore();
const settings = {timestampsInSnapshorts: true};

firestore.settings(settings);

// const storageBucket = admin.storage().bucket(FIREBASE_STORAGE_BUCKET);
const auth = admin.auth();


module.exports = {functions,auth,firestore,admin};