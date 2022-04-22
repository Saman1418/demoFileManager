import React, { useEffect, useState } from "react";
import firebase from "../Firebase/FirebaseConfig";
import { useHistory } from "react-router";
const auth = firebase.auth();
const db = firebase.firestore();

const SignUp = () => {
  let History = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [primaryContactName, setPrimaryContactName] = useState("");
  const [primaryContactNumber, setPrimaryContactNumber] = useState("");

  // const handleSignup = (e) => {
  //   e.preventDefault();

  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((cred) => {
  //       return db.collection("usersData").doc(cred.user.uid).set({
  //         phone,
  //       });
  //       //   console.log(cred.user);
  //       //   console.log("new user Signup");
  //     })
  //     .then(() => {
  //       History.push("/displayMedia");
  //     });
  // };

  const handleSignup = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/orgainsationSignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        address,
        name,
        phoneNumber,
        email,
        confirmPassword,
        lastLogin,
        logoUrl,
        primaryContactName,
        primaryContactNumber
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        // if (result?.statusCode == 200) {
        console.log("result", result);
        History.push("/displayMedia");
        // }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <section className="login">
        <div className="right-bg">
          <div className="container col-lg-12 py-5">
            <div className="row d-flex align-items-center justify-content-center mt-5">
              <div className="col-lg-7 mt-5">
                <h1 className="page-title text-start mb-5">SignUp</h1>

                <form
                  onSubmit={handleSignup}
                  id="loginForm"
                  className="myForm py-0"
                >
                  <div className="col-lg-12">
                    <div className="row my-3">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="fname">Organisations Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="fname"
                            placeholder="First Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="email">Address</label>

                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => {
                              // handleSignupError();
                              setAddress(e.target.value);
                            }}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="phoneNumber">phoneNumber</label>
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            placeholder="91"
                            value={phoneNumber}
                            onChange={(e) => {
                              // handleSignupError();
                              setPhoneNumber(e.target.value);
                            }}
                            required
                          />
                          <br />
                        </div>
                      </div>
                    </div>
                    <div className="row my-3">
                      <div className="col-lg-6">
                        <div
                          className="form-group"
                          style={{
                            position: "relative",
                            cursor: "pointer",
                          }}
                        >
                          <label htmlFor="password">Password</label>
                          <input
                            // type={type}
                            className="form-control"
                            id="password"
                            placeholder="**********"
                            value={password}
                            onChange={(e) => {
                              // handleSignupError();
                              setPassword(e.target.value);
                            }}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div
                          className="form-group"
                          style={{
                            position: "relative",
                            cursor: "pointer",
                          }}
                        >
                          <label htmlFor="confirmPassword">
                            Confirm Password
                          </label>
                          <input
                            // type={type1}
                            className="form-control"
                            id="confirmPassword"
                            placeholder="**********"
                            value={confirmPassword}
                            onChange={(e) => {
                              // handleSignupError();
                              setConfirmPassword(e.target.value);
                            }}
                            required
                          />
                        </div>
                      </div>
                    </div>


                    <div className="col-lg-12 mt-4">
                      <h2>Primary Contact Info</h2>
                      <div className="row my-3">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="fname">primaryContact Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="primaryContact Name"
                            value={primaryContactName}
                            onChange={(e) => setPrimaryContactName(e.target.value)}
                            required
                          />
                        </div>
                      </div>


                      <div className="col-lg-6">
                        <div className="form-group">
                          <label htmlFor="email">primaryContact number</label>
                          <input
                            type="text"
                            className="form-control"
                            id="primaryContact number"
                            placeholder="primaryContact number"
                            value={primaryContactNumber}
                            onChange={(e) => setPrimaryContactNumber(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                  {/* <span className="Login_error">{signupErrorMessage}</span> */}

                  <div className="d-flex justify-content-start mt-4">
                    {/* <input type="submit" value="Sign Up"></input> */}
                    <input
                      // disabled={disableSignupButton}
                      type="submit"
                      className="auth-btn"
                      value="Sign Up"
                      style={{
                        borderRadius: "50px",
                        height: "46px",
                        border: "none",
                        fontSize: "18px",
                      }}
                    ></input>
                  </div>
                  {/* <div className="alternate d-flex justify-content-start">
                        <a style={{ color: "black" }}>
                          Have an account? Login.
                        </a>
                      </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <input type="submit" value="Submit"></input> */}
      {/* </div> */}
    </>
  );
};

export default SignUp;

// {
  /* <h4>Sign up</h4>
      <br /> */
// }
// {
  /* <form onSubmit={handleSignup} id="signup-form">
        <div className="input-field">
          <input
            type="email"
            id="signup-email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <br />
        <br />
        <br />
        <div className="input-field">
          <input
            type="password"
            id="signup-password"
            placeholder="Password"
            required
            value={Password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <br />
        <br />
        <br />
        <div className="input-field">
          <input
            type="text"
            id="signup-password"
            placeholder="mobile Number"
            required
            value={mobileNumber}
            onChange={(e) => {
              setMobileNumber(e.target.value);
            }}
          />
        </div>
        <br />
        <br />
        <br />
        <button type="submit" className="btn yellow darken-2 z-depth-0">
          Sign up
        </button>
      </form> */
// }

// {
  /* <div className="center"> */
// }
// {
  /* <form onSubmit={handleSignup}> */
// }
// {
  /* <div className="txt-field">
            <input
              placeholder="Organisation Name"
              type="text"
              name="UserName"
              value={mobileNumber}
            onChange={(e) => {
              setMobileNumber(e.target.value);
            }}
            ></input>
            {errors.addresses && <span>{errors.addresses}</span>}---------------
          </div>
          

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
            {errors.email && <span>{errors.email}</span>}----------------------------
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
            {errors.addresses && <span>{errors.addresses}</span>}--------------------------
          </div> */
// }
