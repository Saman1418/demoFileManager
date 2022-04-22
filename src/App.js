import React,{useState} from "react";
import "./App.css";
import firebase from "./Firebase/FirebaseConfig";
import AddDetails from "./Components/AddDetails";
import Header from "./Components/Header";
import SignUp from "./Components/SignUp";
import DisplayMedia from "./Components/DisplayMedia";
import AdminData from "./Components/AdminData";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Components/Main";
import Login from "./Components/Login";
import Login1 from "./Components/Login1";
import {useAuthState} from 'react-firebase-hooks/auth';
import Page from "./Components/playVideo/Page";
const auth = firebase.auth();


const App = () => {

  const [token, settoken] = useState()
  const [user] = useAuthState(auth);
  // auth.onAuthStateChanged(user=>{
  //   if(user){
  //     console.log("user login",user)
  //   }
  //   else{
  //     console.log("user logout")
  //   }
    
  // })

// console.log(token)

  return (
    <>
    {/* {user ? <Main/> : <Login/>} */}
    {/* <Page/> */}

      <Router>
        <div className="App">
          <Header />
          <Switch>
            

            <Route path="/AddDetails">
            <AddDetails/>
            </Route>

            <Route path="/AdminData">
            <AdminData/>
            </Route>

            <Route path="/signUp">
              <SignUp />
            </Route>

            <Route path="/login">
            <Login1 />
            </Route>

            <Route path="/displayMedia">
              <DisplayMedia token={token}/>
            </Route>

            <Route path="/">
            <Login1 />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
    // <div className="App">
    //   <div className="title-row">
    //     <Header/>
    //     <AddDetails/>
    //   </div>
    // </div>
  );
};
export default App;



  // React.useEffect(()=>{
  //   const msg = firebase.messaging();
  //   msg.requestPermission().then(()=>{
  //     return msg.getToken();
  //   }).then((data)=>{
  //     // console.log("token",data)
  //     settoken(data)
  //   }).catch(()=>{
  //     console.log("error")
  //   })
  // })
