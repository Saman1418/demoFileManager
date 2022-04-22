import React from 'react';
import firebase from "../Firebase/FirebaseConfig";

const auth = firebase.auth();

const Main = () => {

	const logout = () => {
		localStorage.clear();
		auth.signOut();
	}

	return (
		<div style={{ marginTop: 250 }}>
			<center>
				<h3>Welcome{auth.currentUser.phoneNumber}</h3>
				<button style={{ "marginLeft": "20px" }}
				onClick={logout}>Logout</button>
			</center>
		</div>
	);
}

export default Main;
