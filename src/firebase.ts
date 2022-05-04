// import React, { useState } from "react";
// import * as firebase from "firebase/app";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"

// TODO: hide this!
const firebaseConfig = {
	apiKey: "AIzaSyDbrm1fKmn1-wb7Axs6YUNDzdyyUdLG63k",
	authDomain: "kumi-dev.firebaseapp.com",
	projectId: "kumi-dev",
	storageBucket: "kumi-dev.appspot.com",
	messagingSenderId: "483223848777",
	appId: "1:483223848777:web:714973e0396df5834afc98",
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);


export default firebase;
