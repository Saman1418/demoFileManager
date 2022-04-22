import React,{useState} from "react";
import firebase from "../Firebase/FirebaseConfig";
const functions = firebase.functions();
const auth = firebase.auth();


const AdminData = () => {
    const [adminEmail, setAdminEmail] = useState("");
    const [adminStatus, setsdminStatus] = useState(true);

    auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("user",user)
          if (user.admin) {
            console.log("user.admin",user.admin)
            setsdminStatus(true);
          }
          // else{
            
          //   setsdminStatus(false);
           
          // }
    
        //   setLoginStatus(user);
        }
      });

    const handleAdmin = (e) => {
        e.preventDefault();
        const addAdminRole = functions.httpsCallable("addAdminRole");
        addAdminRole({ email: adminEmail }).then((result) => {
          console.log(result);
        });
      };
  return (
    <>
      <header
        id="header"
        className="d-flex flex-lg-row flex-column  align-items-center"
      >
        {adminStatus ? (
          <>
            <form
              onSubmit={handleAdmin}
              className="center-align admin-actions"
              style={{ margin: "40px auto", maxwidth: "300px" }}
            >
              <div className="txt-fields">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={adminEmail}
                  required
                  onChange={(e) => {
                    setAdminEmail(e.target.value);
                  }}
                />
              </div>
              <button type="submit" className="btn btn-info">
                Make admin
              </button>
            </form>
          </>
        ) : (
          ""
        )}
      </header>
    </>
  );
};

export default AdminData;
