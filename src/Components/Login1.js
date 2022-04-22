import React, { useEffect, useState } from "react";
// import axios from "axios";
import "./Login.css";
import firebase from "../Firebase/FirebaseConfig";
import { useHistory } from "react-router";

const auth = firebase.auth();

const Login1 = () => {
  let History = useHistory();
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");




  const handleLogin = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, Password).then((cred) => {
      History.push("/displayMedia");
      // console.log(cred.user);
      // console.log("user Login");
    });
    setEmail("");
    setPassword("");
    // fetchData()
  };

  return (
    <>
      
      <div className="center">
        <h1>Login Form</h1>
        <form onSubmit={handleLogin}>
          

          <div className="txt-field">
            <input
              placeholder="Email"
              type="text"
              name="email"
              value={email}
              onChange={(e) => {
              setEmail(e.target.value);
            }}
            ></input>
            {/* {errors.email && <span>{errors.email}</span>}-------------------- */}
          </div>

          <div className="txt-field">
            <input
              placeholder="Password"
              type="password"
              name="Password"
              value={Password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            ></input>
            {/* {errors.addresses && <span>{errors.addresses}</span>}----------------- */}
          </div>
            {/* <div id="recaptcha"></div> */}
            {/* <button onClick={()=>handleOtp()}>OTP</button> */}
            {/* <label></label> */}

          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </>
  );
};

export default Login1;

// const fetchData = async () => {
//   try {
//     const res = await axios.get("http://localhost:5000/api/notification/sendToAll", {
//       // headers: {
//       // 	Authorization: 'Bearer ' + token,
//       // },
//     });

//     console.log("ImagesList", res.data);
//     // setDocs(res.data);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const handleOtp = () =>{
//   let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
//   let number = '+919953822945';
//   firebase.auth().signInWithPhoneNumber(number,recaptcha).then((e)=>{
//     let code = prompt('enter the otp','');
//     if(code == null) return;
//     e.confirm(code).then((result)=>{
//       console.log(result.user,"user");
//       // document.querySelector('label').textContent = result.user.phoneNumber + "Number Verified"
//     }).catch((error)=>{
//       console.log(error)
//     })
//   })
// }
