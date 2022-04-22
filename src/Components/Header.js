import React, { useState } from "react";
import "./Header.css";
// import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "../Firebase/FirebaseConfig";

import { useHistory } from "react-router";

const auth = firebase.auth();
const functions = firebase.functions();

const Header = () => {
  let History = useHistory();
  const [loginStatus, setLoginStatus] = useState(null);
  const [adminStatus, setsdminStatus] = useState();
  const [adminEmail, setAdminEmail] = useState("");

  const handleLogout = () => {
    auth.signOut();
    History.push("/login");
  };


  auth.onAuthStateChanged((user) => {
    if (user) {
      // console.log("user",user)
      if (user.admin) {
        console.log("user.admin",user.admin)
        setsdminStatus(true);
      }
      // else{
        
      //   setsdminStatus(false);
       
      // }

      setLoginStatus(user);
    } else {
      setLoginStatus(null);
    }
  });


  // auth.onAuthStateChanged((user) => {
  //     if (user.admin) {
  //       console.log("user.admin",user.admin)
  //       setsdminStatus(true);
  //     } 
  //     else{
  //       console.log("User is log out")
  //     }
  // });

  const handleAdmin = (e) => {
    e.preventDefault();
    const addAdminRole1 = functions.httpsCallable("addAdminRole");
    addAdminRole1({ email: adminEmail }).then((result) => {
      console.log(result);
    });
  };
  return (
    <>
     
{/* 
      <header
        id="header"
        className="sticky-top d-flex flex-lg-row flex-column  align-items-center"
      >
        <div className="container d-flex align-items-center">
          <a href className="logo me-auto">
            <Link to={"/"}>
              <a href className="nav-link scrollto">
                Home
              </a>
            </Link>
          </a>

      
          <ul>
            {loginStatus == null ? (
              <>
                <Link to={"/SignUp"}>
                  <a href className="">
                    SignUp
                  </a>
                </Link>

                <Link to={"/login"}>
                  <a href className="">
                    Login
                  </a>
                </Link>
              </>
            ) : (
              <>
              
                <Link to={"/displayMedia"}>
                  <a href className="nav-link scrollto">
                  displayMedia
                  </a>
                </Link>
                <br/>
                <br/>
                <button href className="" onClick={handleLogout}>
                  LogOut
                </button>
              </>
            )}
          </ul>
        </div>
      </header> */}

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
          HealthWallet	
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <Link to={"/"}>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page">
                    Home
                  </a>
                </li>
              </Link>

              {loginStatus == null ? (
                <>
                  <Link to={"/SignUp"}>
                    <li class="nav-item">
                      <a class="nav-link">SignUp</a>
                    </li>
                  </Link>

                  <Link to={"/login"}>
                    <li class="nav-item">
                      <a class="nav-link">Login</a>
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={"/displayMedia"}>
                    <a href className="nav-link scrollto">
                    displayMedia
                    </a>
                  </Link>

                  {loginStatus.admin == true && (
                    <Link to={"/AdminData"}>
                      <a href className="nav-link scrollto">
                        AdminData
                      </a>
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    class="btn btn-primary"
                  >
                    Logout
                  </button>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
