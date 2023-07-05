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

// Function to submit the answer and load the next question
function submitAnswer() {
  // ...

  // Create a new entry in the Firebase Realtime Database
  var database = firebase.database();
  var scoresRef = database.ref('quiz-scores');
  scoresRef.push({
    username: usernameInput.value,
    score: score,
    totalQuestions: totalQuestions,
    scorePercentage: scorePercentage.toFixed(2)
  });

  // ...
}
