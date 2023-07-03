// Include the Firebase SDK using the script tag
document.write('<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>');
document.write('<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>');


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
firebase.initializeApp(firebaseConfig);