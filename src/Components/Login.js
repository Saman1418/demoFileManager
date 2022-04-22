import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import firebase from "../Firebase/FirebaseConfig";
// import { useHistory } from "react-router";

const auth = firebase.auth();

const Login = () => {
  // let History = useHistory();
  // const [email, setEmail] = useState("");
  // const [Password, setPassword] = useState("");

  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState('');
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState('');


  // Sent OTP

  // const loginWithPhone = () => {
  //   axios.post("/login", {'username': mynumber});
  // }

  const signin = () => {
    if (mynumber === "" || mynumber.length < 10) return;

    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    // debugger
    // console.log(verify)
    auth
      .signInWithPhoneNumber(mynumber, null)
      .then((result) => {
        console.log("result",result)
        setfinal(result);
        alert("code sent");
        setshow(true);
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
  };

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        console.log("result",result)
        console.log("result",result.user.refreshToken)
        
        localStorage.setItem("authDetails", JSON.stringify({uid:result.user.uid,accessToken:result.user.refreshToken}));
        // localStorage.setItem({uid:result.user.uid,accessToken:result.user.accessToken});
      })
      .catch((err) => {
        alert("Wrong code");
      });
  };

  // console.log("final",final)

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   auth.signInWithEmailAndPassword(email, Password).then((cred) => {
  //     History.push("/displayMedia");
  //     // console.log(cred.user);
  //     // console.log("user Login");
  //   });
  //   setEmail("");
  //   setPassword("");
  //   // fetchData()
  // };

  return (
    <>
      <div style={{ marginTop: "200px" }}>
        <center>
          <div style={{ display: !show ? "block" : "none" }}>
            <input
              value={mynumber}
              onChange={(e) => {
                setnumber(e.target.value);
              }}
              placeholder="phone number"
            />
            <br />
            <br />
            <div id="recaptcha-container"></div>
            <button onClick={signin}>Send OTP</button>
          </div>
          <div style={{ display: show ? "block" : "none" }}>
            <input
              type="text"
              placeholder={"Enter your OTP"}
              onChange={(e) => {
                setotp(e.target.value);
              }}
            ></input>
            <br />
            <br />
            <button onClick={ValidateOtp}>Verify</button>
          </div>
        </center>
      </div>
      {/* <div className="center">
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
            {errors.email && <span>{errors.email}</span>}--------------------
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
            {errors.addresses && <span>{errors.addresses}</span>}-----------------
          </div>
            <div id="recaptcha"></div>
            <button onClick={()=>handleOtp()}>OTP</button>
            <label></label>

          <input type="submit" value="Submit"></input>
        </form>
      </div> */}
    </>
  );
};

export default Login;

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
