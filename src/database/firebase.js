import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";
import 'firebase/messaging';
import 'firebase/storage';
require("dotenv").config();//allow usage of .env file

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const initmessaging = firebaseApp.messaging();
export const auth = firebaseApp.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const storage = firebase.storage().ref();
export default firebaseApp.firestore();
