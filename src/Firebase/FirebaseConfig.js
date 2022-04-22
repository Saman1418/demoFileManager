import firebase from "firebase";

const firebaseConfig = {
  // apiKey: "AIzaSyBofhtmHvvldffiq9BNt2G3RQ0wa7Xd_KM",
  // authDomain: "fir-recipe-7631b.firebaseapp.com",
  // databaseURL: "https://fir-recipe-7631b-default-rtdb.firebaseio.com",
  // projectId: "fir-recipe-7631b",
  // storageBucket: "fir-recipe-7631b.appspot.com",
  // messagingSenderId: "289487740363",
  // appId: "1:289487740363:web:303059ed77a5264b40aa4e",
  // measurementId: "G-H971QGG0FR",
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

export default firebase;
