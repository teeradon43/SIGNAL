import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import 'firebase/messaging';
require("dotenv").config();//allow usage of .env file

const firebaseConfig = {
  apiKey: "AIzaSyDqgvnYkiiEHGvY8z_ykQSiuImMNrO7TTY",
    authDomain: "signal-sdp.firebaseapp.com",
    projectId: "signal-sdp",
    storageBucket: "signal-sdp.appspot.com",
    messagingSenderId: "454115237023",
    appId: "1:454115237023:web:dd5c4225c7b3e1fa2396aa"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const initmessaging = firebaseApp.messaging();
export const auth = firebaseApp.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default firebaseApp.firestore();
