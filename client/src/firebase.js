import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyD4JMnZWHWdglwB2tdQHTGfvaAlt8dh-VI",
  authDomain: "merng-blog.firebaseapp.com",
  //   databaseURL: "https://merng-blog.firebaseio.com",
  projectId: "merng-blog",
  storageBucket: "merng-blog.appspot.com",
  //   messagingSenderId: "971773977654",
  appId: "1:971773977654:web:0a16ead39ae466a2386497",
  measurementId: "G-TDFF422P6E",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.googleAuthProvider();
