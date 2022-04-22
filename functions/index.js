// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);


const FirebaseConfig = require("./FirebaseConfig");
const DashboardApi = require("./DashboardApi");
const OtpApi = require("./OtpApi");


const functions = FirebaseConfig.functions;

functions.logger.log("Logging Auth");
functions.logger.log("FirebaseConfig");
const firestore = FirebaseConfig.firestore;
const auth = FirebaseConfig.auth;

functions.logger.log(auth);
// const storageBucket = FirebaseConfig.storageBucket;
const admin = FirebaseConfig.admin;


// console.log("auth",auth)

exports.api = functions.https.onRequest(DashboardApi);
exports.otp = functions.https.onRequest(OtpApi);



// exports.onCreateRecipe = functions.firestore
//   .document("recipes/{recipeId}")
//   .onCreate(async (snapshot) => {
//     const countDocRef = firestore.collection("recipeCounts").doc("all");
//     const countDoc = await countDocRef.get();

//     if (countDoc.exists) {
//       countDocRef.update({ count: admin.firestore.FieldValue.increment(1) });
//     } else {
//       countDocRef.set({ count: 1 });
//     }

//     const recipe = snapshot.data();

//     if (recipe.isPublished) {
//       const countPublishedDocRef = firestore
//         .collection("recipeCounts")
//         .doc("published");
//       const countPublishedDoc = await countPublishedDocRef.get();

//       if (countPublishedDoc.exists) {
//         countPublishedDocRef.update({
//           count: admin.firestore.FieldValue.increment(1),
//         });
//       } else {
//         countPublishedDocRef.set({ count: 1 });
//       }
//     }
//   });

// exports.onDeleteRecipe = functions.firestore
//   .document("recipes/{recipeId}")
//   .onDelete(async (snapshot) => {
//     const recipe = snapshot.data();
//     const imageUrl = recipe.imageUrl;

//     if (imageUrl) {
//       const decodedUrl = decodeURIComponent(imageUrl);
//       const startIndex = decodedUrl.indexOf("/o/") + 3;
//       const endIndex = decodedUrl.indexOf("?");
//       const fullFilePath = decodedUrl.substring(startIndex, endIndex);
//       const file = storageBucket.file(fullFilePath);

//       console.log(`Attemping to delete: ${fullFilePath}`);

//       try {
//         await file.delete();
//         console.log("Successfully deleted image.");
//       } catch (error) {
//         console.log(`Failed to delete file: ${error.message}`);
//       }

//       const countDocRef = firestore.collection("recipeCounts").doc("all");
//       const countDoc = await countDocRef.get();

//       if (countDoc.exists) {
//         countDocRef.update({ count: admin.firestore.FieldValue.increment(-1) });
//       } else {
//         countDocRef.set({ count: 0 });
//       }

//       const recipe = snapshot.data();

//       if (recipe.isPublished) {
//         const countPublishedDocRef = firestore
//           .collection("recipeCounts")
//           .doc("published");
//         const countPublishedDoc = await countPublishedDocRef.get();

//         if (countPublishedDoc.exists) {
//           countPublishedDocRef.update({
//             count: admin.firestore.FieldValue.increment(-1),
//           });
//         } else {
//           countPublishedDocRef.set({ count: 0 });
//         }
//       }
//     }
//   });



//   exports.onUpdateRecipe = functions.firestore
//   .document("recipes/{recipeId}").onUpdate(async(changes)=>{
//       const oldRecipes = changes.before.data();
//       const newRecipes = changes.after.data();

//       let publishCount = 0;

//       if(!oldRecipes.isPublished && newRecipes.isPublished){
//           publishCount += 1;
//       }else if(oldRecipes.isPublished && !newRecipes.isPublished){
//         publishCount -= 1;
//       }

//       if(publishCount !== 0){
//           const publishedCountDocRef = firestore.collection("recipeCounts").doc("published");

//           const publishedCountDoc = await publishedCountDocRef.get();

//           if(publishedCountDoc.exists){
//               publishedCountDocRef.update({
//                   count : admin.firestore.FieldValue.increment(publishCount),
//               });
//           }else{
//               if(publishCount > 0){
//                   publishedCountDocRef.set({count:publishCount});
//               }else{
//                   publishedCountDocRef.set({count:0});
//               }
//           }
//       }

//   })

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.signUpUser = functions.https.onRequest((request, response) => {
//     const name = request.query.name;
//     const email = request.query.email;
//     const Password = request.query.password;
//     functions.auth().createUserWithEmailAndPassword(email, Password)
//     console.log("signup",email)
//     .then(()=>{
//         response.send("user sign up successfully")
//     })

// });

// exports.loginUser = functions.https.onRequest((request, response) => {
//     const email = request.query.email;
//     const password = request.query.password;
//     functions.auth.user().signInWithEmailAndPassword(email, password)
//     console.log("login",email)
//     .then(()=>{
//         response.send("user login up successfully")
//     })

// });

// exports.newUserSignUp = functions.auth.user().onCreate(user=>{
//     return admin.firestore().collection('users').doc(user.uid).set({
//         email:user.email,
//         uid:user.uid
//     })
// })
