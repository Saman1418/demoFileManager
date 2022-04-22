import React, { useState, useEffect } from "react";
// import ProgressBar from './ProgressBar';
import firebase from "../Firebase/FirebaseConfig";
const storage = firebase.storage();
const auth = firebase.auth();
const projectFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const DisplayMedia = ({ token }) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [docs, setDocs] = useState([]);
  const [userUID, setUserUID] = useState("");
  const [post, setPost] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  console.log("url", url, "post", post);

  auth.onAuthStateChanged((user) => {
    if (user != null) {
      setUserUID(user.uid);
      user.getIdTokenResult().then((idTokenResult) => {
        // console.log(idTokenResult.claims.admin);
        // console.log("salesManger", idTokenResult.claims);
        user.admin = idTokenResult.claims.admin;
        // setupUI(user);
      });
    }
  });

  const notificationToken = async () => {
    await fetch("http://localhost:5000/api/notification/sendToAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("notificatinData", data);
      })
      .catch((error) => console.log("error", error));
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    const collectionRef = projectFireStore.collection("media");
    const collectionRefPost = projectFireStore.collection("post");
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            const createdAt = timestamp();
            // auth.onAuthStateChanged((user) => {
            //   if (user) {
            collectionRef.add({ uid: userUID, url, createdAt });
            collectionRefPost.add({ uid: userUID, text: post, createdAt });

            // notificationToken()
            //   }
            // });
            // collectionRef.add({url,createdAt });
          });
        setPost("");
      }
    );
  };


  

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       console.log("uid", user.uid);
  //       const unsub = projectFireStore
  //         .collection("media")
  //         // .orderByChild("type").startAt("audio")
  //         .where("uid", "==", user.uid)
  //         // .orderBy("createdAt","desc")
  //         .onSnapshot((snap) => {
  //           let documents = [];
  //           snap.forEach((doc) => {
  //             // console.log(doc.data())
  //             documents.push({ ...doc.data(), id: doc.id });
  //           });
  //           setDocs(documents);
  //         });
  //       return () => unsub();
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const unsub = projectFireStore
      .collection("media")
      // .orderByChild("type").startAt("audio")
      .where("uid", "==", userUID)
      // .orderBy("createdAt","desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          // console.log(doc.data())
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });
    return () => unsub();
  }, [userUID]);
  // console.log("image: ", docs);

  return (
    <>
      <div>
        <div className="d-flex justify-content-center align-items-center">
          <progress value={progress} max="100" />
          <input type="file" onChange={handleChange} />
          <button className="btn btn-success" onClick={handleUpload}>
            Upload
          </button>
          
        </div>

        <div>
          <textarea
            type="box"
            placeholder="Input Box"
            onChange={(e) => setPost(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleUpload}>
            UploadPost
          </button>
        </div>
        {docs &&
          docs.map((item) => {
            return (
              <div
                key={item.id}
                //  style={{display:"inline-block"}}
              >
                {item.url && (
                  <img
                    src={item.url}
                    alt="firebase-image"
                    width="100px"
                    height="100px"
                  />
                )}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default DisplayMedia;

// const msg = firebase.messaging();
// msg
//   .requestPermission()
//   .then(() => {
//     return msg.getToken();
//   })
//   .then((data) => {
//     console.log("token", data);
//   })
//   .catch(() => {
//     console.log("error");
//   });
