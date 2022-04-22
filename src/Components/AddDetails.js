import React, { useState, useEffect } from "react";
import "./AddDetails.css";
import firebase from "../Firebase/FirebaseConfig";
const db = firebase.firestore();
const auth = firebase.auth();

const AddDetails = () => {
  const [docs, setDocs] = useState([]);
  const [name, setName] = useState("");
  const [website, setWebSite] = useState("");
  const [bio, setBio] = useState("");

  //   const renderData = (doc) => {
  // console.log("list", doc.data());
  // setName(doc.data().name)
  // setWebsite(doc.data().website)
  //   };

  //   db.collection("emailData")
  //     .get()
  //     .then((snapshot) => {
  //         let documents = [];
  //       snapshot.docs.forEach((doc) => {
  //           documents.push({...doc.data(),id:doc.id})
  //         // renderData(doc);
  //       });
  //       setUserData(documents)
  //     });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
          setBio(doc.data().bio)
          // <div>${doc.data().bio}</div>
        });
        const unsub = db.collection("emailData").onSnapshot((snap) => {
          let documents = [];
          snap.forEach((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
          });
          setDocs(documents);

        
        });
        return () => unsub();


      } else {
        console.log("user logout");
      }
    });
    
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, website);
    db.collection("emailData").add({
      name,
      website,
    });
    setName("");
    setWebSite("");
  };

  const handleDelete = (id) => {
    db.collection("emailData").doc(id).delete();
  };

  return (
    <>
      <h1>{bio!=undefined ? bio: "user"} Data</h1>

      <div className="content">
        <form onSubmit={handleSubmit} id="add-cafe-form">
          <input
            type="text"
            name="Name"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            name="Website"
            placeholder="Website"
            value={website}
            onChange={(e) => {
              setWebSite(e.target.value);
            }}
          />
          <button type="submit">Add</button>
        </form>
        <ul id="cafe-list">
          {docs &&
            docs.map((item) => {
              return (
                <div key={item.id}>
                  <li>{`Name: ${item.name} and Website: ${item.website}`}</li>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                  <br />
                </div>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default AddDetails;
