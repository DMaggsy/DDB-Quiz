document.addEventListener('DOMContentLoaded', function () {
  // Define variables
  var categories;
  var currentCategoryIndex = 0;
  var currentQuestionIndex = 0;
  var score = 0;
  var totalQuestions = 0;

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

  // ...


  // Get the start button element
  var startButton = document.getElementById('start-btn');

  // Get the question container elements
  var questionContainer = document.getElementById('question-container');
  var questionElement = document.getElementById('question');
  var optionsElement = document.getElementById('options');

  // Get the submit button and result elements
  var submitButton = document.getElementById('submit-btn');
  var resultElement = document.getElementById('result');

  // Get the end screen elements
  var endScreen = document.getElementById('end-screen');
  var usernameInput = document.getElementById('username-input');
  var submitScoreButton = document.getElementById('submit-score-btn');

  // Add event listener to the start button
  startButton.addEventListener('click', startQuiz);

  // Function to start the quiz
  function startQuiz() {
    // Hide the start button and show the question container
    startButton.style.display = 'none';
    document.querySelector('.content').style.display = 'none';

    // Show the question container
    questionContainer.style.display = 'block';

    // Load the categories from the JSON file
    loadCategories();
  }

  // Function to load the categories from the JSON file
  function loadCategories() {
    console.log('Load categories function called');

    fetch('assets/data.json')
      .then(response => response.json())
      .then(data => {
        console.log('Data loaded:', data);

        categories = data.categories;
        totalQuestions = getTotalQuestionsCount();
        // Load the first question
        loadQuestion();
      })
      .catch(error => {
        console.error('Error loading questions from data.json:', error);
      });
  }

  // Function to load a question
  function loadQuestion() {
    // Get the current category and question
    var category = categories[currentCategoryIndex];
    var question = category.questions[currentQuestionIndex];

    // Set the question and options in the HTML elements
    questionElement.innerText = question.question;
    optionsElement.innerHTML = '';

    // Create and append the option buttons
    for (var i = 0; i < question.options.length; i++) {
      var optionButton = document.createElement('button');
      optionButton.innerText = question.options[i];
      optionButton.classList.add('option-btn');
      optionButton.addEventListener('click', selectOption);
      optionsElement.appendChild(optionButton);
    }
  }

  // Function to handle option selection
  function selectOption(event) {
    var selectedOption = event.target;
    var category = categories[currentCategoryIndex];
    var question = category.questions[currentQuestionIndex];

    // Remove the "selected" class from all option buttons
    var optionButtons = optionsElement.querySelectorAll('.option-btn');
    optionButtons.forEach(function (button) {
      button.classList.remove('selected');
    });

    // Add the "selected" class to the clicked option button
    selectedOption.classList.add('selected');

    // Show the submit button
    submitButton.style.display = 'block';
  }


  // Add event listener to the submit button
  submitButton.addEventListener('click', submitAnswer);

  // Function to submit the answer and load the next question
  function submitAnswer() {
    // Increment the question index
    currentQuestionIndex++;

    // Check if all questions in the current category are answered
    var category = categories[currentCategoryIndex];
    if (currentQuestionIndex >= category.questions.length) {
      // Check if there are more categories
      if (currentCategoryIndex + 1 < categories.length) {
        // Move to the next category
        currentCategoryIndex++;
        currentQuestionIndex = 0;
      } else {
        // End the quiz and display the result
        endQuiz();
        return;
      }
    }

    // Load the next question
    loadQuestion();

    // Clear the selected option and enable option buttons
    var optionButtons = optionsElement.querySelectorAll('.option-btn');
    for (var i = 0; i < optionButtons.length; i++) {
      optionButtons[i].disabled = false;
      optionButtons[i].classList.remove('selected');
    }

    // Hide the submit button
    submitButton.style.display = 'none';
  }

  // Function to end the quiz and display the result
  function endQuiz() {
    // Hide the question container
    questionContainer.style.display = 'none';

    // Show the end screen
    endScreen.style.display = 'block';

    // Show the submit score button
    submitScoreButton.style.display = 'block';

    // Display the result
    resultElement.innerHTML = 'Quiz ended.<br>';
    resultElement.innerHTML += 'Your score: ' + score + '/' + totalQuestions + '<br>';
  }

// Event listener for the submit score button
submitScoreButton.addEventListener('click', submitScore);

function submitScore() {
  var username = usernameInput.value;
  var scorePercentage = (score / totalQuestions) * 100;

  // Display the result
  resultElement.innerHTML += 'Username: ' + username;

  // Clear the username input
  usernameInput.value = '';
}

// Event listener for the submit score button
submitScoreButton.addEventListener('click', submitScore);
  submitScoreButton.addEventListener('click', function () {
    var username = usernameInput.value;
    var scorePercentage = (score / totalQuestions) * 100;

    // Display the result
    resultElement.innerHTML += 'Username: ' + username;

    // Clear the username input
    usernameInput.value = '';
  });

  // Function to count the number of correct answers in a category
  function getCorrectAnswersCount(category) {
    var correctCount = 0;
    for (var i = 0; i < category.questions.length; i++) {
      if (category.questions[i].answer === category.questions[i].selectedOption) {
        correctCount++;
      }
    }

  }
  // Function to calculate the total number of questions in all categories
  function getTotalQuestionsCount() {
    var totalQuestionsCount = 0;
    for (var i = 0; i < categories.length; i++) {
      totalQuestionsCount += categories[i].questions.length;
    }
    return totalQuestionsCount;
  }

// Function to update the results element with the username and score
function updateResults(score) {
  var resultsElement = document.getElementById('results');
  resultsElement.innerHTML = `
    <h1>Your results</h1>
    <p>Username: <strong>${usernameInput.value}</strong></p>
    <p>Score: <strong>${score}</strong></p>
  `;
}

// Event listener for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
  // Initialize the result element
  var resultElement = document.getElementById('results');
  var scoreInput = document.getElementById('score-input');

  // Hide the question container
  questionContainer.style.display = 'none';

  // Show the end screen
  endScreen.style.display = 'none';

  // Show the submit score button
  submitScoreButton.style.display = 'none';
});

// Function to end the quiz and display the result
function endQuiz() {
  // Hide the question container
  questionContainer.style.display = 'none';

  // Show the end screen
  endScreen.style.display = 'block';

  // Show the submit score button
  submitScoreButton.style.display = 'block';

  // Call the updateResults function
  updateResults(score);

  // Display the result
  resultElement.innerHTML = 'Quiz ended.<br>';
  resultElement.innerHTML += 'Your score: ' + score + '/' + totalQuestions + '<br>';
}





// Event listener for the submit score button
submitScoreButton.addEventListener('click', function () {
  var username = usernameInput.value;
  var scorePercentage = (score / totalQuestions) * 100;

  // Display the result
  resultElement.innerHTML += 'Username: ' + username;

  // Clear the username input
  usernameInput.value = '';
});

// Submit the username and score to the Firebase Realtime Database
function submitScore() {
  // Get the username and score from the user input
  var username = usernameInput.value;
  var score = scoreInput; // <-- Comment out this line

  // Create a new entry in the Firebase Realtime Database
  var database = firebase.database();
  var scoresRef = database.ref('quiz-scores');
  scoresRef.push({
    username: username,
    score: score
  });

  // Update the results element with the username and score
  updateResults(score);

  // Clear the username and score inputs
  usernameInput.value = '';
  scoreInput.value = '';
}



// Event listener for the submit score button
submitScoreButton.addEventListener('click', submitScore);

});