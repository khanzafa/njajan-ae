// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDY-oimiTAHzumA9P4cDn-Hem0pEqMJU4",
  authDomain: "njajan-ae.firebaseapp.com",
  projectId: "njajan-ae",
  storageBucket: "njajan-ae.appspot.com",
  messagingSenderId: "487896503395",
  appId: "1:487896503395:web:37715bbdb0690fe3815456",
  measurementId: "G-07GMD2EBG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);