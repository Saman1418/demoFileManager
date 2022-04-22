
const firebase = require("firebase")

const firebaseConfig = {
  apiKey: "AIzaSyAshLLDT66v-W7bJtn_sjaFGqAQTk_c5vI",
  authDomain: "healthwallet-d6d30.firebaseapp.com",
  projectId: "healthwallet-d6d30",
  storageBucket: "healthwallet-d6d30.appspot.com",
  messagingSenderId: "132906735651",
  appId: "1:132906735651:web:402412a76998c680e5f996",
  measurementId: "G-EC1NX4QHNZ"
};

// if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
// }

module.exports = firebase;
