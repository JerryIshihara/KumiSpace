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

export const actionCodeSettings = {
	// URL you want to redirect back to. The domain (www.example.com) for this
	// URL must be in the authorized domains list in the Firebase Console.
	url: 'http://localhost:3000',
	// This must be true.
	handleCodeInApp: true,
	// iOS: {
	//   bundleId: 'com.example.ios'
	// },
	// android: {
	//   packageName: 'com.example.android',
	//   installApp: true,
	//   minimumVersion: '12'
	// },
	// dynamicLinkDomain: 'example.page.link'
  };


export default firebase;
