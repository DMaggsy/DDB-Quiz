// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEQRrArNsKOYMjeAVpYAWmaoK1e5HRYM0",
  authDomain: "freshquiz-67c82.firebaseapp.com",
  databaseURL: "https://freshquiz-67c82-default-rtdb.firebaseio.com",
  projectId: "freshquiz-67c82",
  storageBucket: "freshquiz-67c82.appspot.com",
  messagingSenderId: "599950135432",
  appId: "1:599950135432:web:cc30a733a8a661304b4f3d",
  measurementId: "G-1444RBFMYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);