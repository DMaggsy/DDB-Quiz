document.addEventListener('DOMContentLoaded', function () {
  // Define variables
  let usernameInput = document.getElementById('username-input');
  let categories;
  let currentCategoryIndex = 0;
  let currentQuestionIndex = 0;
  let totalQuestions = 0;
  let score = 0;

  // Function to handle the "Enter username" button click event
  function enterUsername() {

    // Get the username input value
    let username = usernameInput.value;
    console.log('Username:', username);

    // Hide Question container
    document.getElementById('question-container').style.display = 'none';

    // Hide the "Enter username" button
    document.getElementById('enter-username').style.display = 'none';

    // Hide the username input
    document.getElementById('username-input').style.display = 'none';

    // Show the "Start quiz" button
    document.getElementById('start-quiz').style.display = 'block';

  }

  // Function to start the quiz
  function startQuiz() {
    // Hide the "Start quiz" button
    document.getElementById('start-quiz').style.display = 'none';

    // Show the question container
    document.getElementById('question-container').style.display = 'block';

    // Load the categories from the JSON file
    loadCategories();
  }
  // Get the start text element
  let startText = document.getElementById('start-text');

  // Add event listener to the "Enter username" button
  let enterUsernameButton = document.getElementById('enter-username');
  enterUsernameButton.addEventListener('click', enterUsername);

  // Add this code before attaching the event listener
  let startQuizButton = document.getElementById('start-quiz');

  // Add event listener to the "Start quiz" button
  startQuizButton.addEventListener('click', function () {
    console.log('Start quiz button clicked');

    // Hide the start quiz button
    startQuizButton.style.display = 'none';

    // Show the question container
    questionContainer.style.display = 'block';

    // Hide the start text
    startText.style.display = 'none';

    // Load the categories from the JSON file
    loadCategories();

    // Show the submit button after the quiz starts
    submitButton.style.display = 'flex';

  });




  // Function to load the categories from the JSON file
  function loadCategories() {
    console.log('Load categories function called');

    fetch('assets/data.json')
      .then(response => response.json())
      .then(data => {
        console.log('Data loaded:', data);

        categories = data.categories;
        totalQuestions = getTotalQuestionsCount();
        // Hide the start text
        startText.style.display = 'none';

        // Show the question container
        questionContainer.style.display = 'block';
        // Load the first question
        loadQuestion();
      })
      .catch(error => {
        console.error('Error loading questions from data.json:', error);
      });
  }

  function loadQuestion() {
    let category = categories[currentCategoryIndex];
    if (!category) {
      endQuiz(); // No more categories, end the quiz
      return;
    }
    let question = category.questions[currentQuestionIndex];

    // Set the question and options in the HTML elements
    questionElement.innerText = question.question;
    optionsElement.innerHTML = '';

    // Create and append the option buttons
    for (let i = 0; i < question.options.length; i++) {
      let optionButton = document.createElement('button');
      optionButton.innerText = question.options[i];
      optionButton.classList.add('option-btn');
      optionButton.addEventListener('click', selectOption);
      optionsElement.appendChild(optionButton);
    }

    // Get the result element
    let resultElement = document.createElement('div');

    // Show the result element
    resultElement.style.display = 'none';

    // Call the endQuiz() function if the quiz is over
    if (currentQuestionIndex >= totalQuestions) {
      endQuiz(resultElement);
      return;
    }

    // Return the result element
    return resultElement;
  }


  // Get the question container elements
  let questionContainer = document.getElementById('question-container');
  let questionElement = document.getElementById('question');
  let optionsElement = document.getElementById('options');

  // Get the submit button and result elements
  let submitButton = document.getElementById('submit-btn');
  let resultElement = document.getElementById('result');


  // Show the question container
  document.getElementById('question-container').style.display = 'block';

  // Add event listener to the submit button
  submitButton.addEventListener('click', submitAnswer);

  // Function to handle option selection
  function selectOption(event) {
    let selectedOption = event.target;
    let category = categories[currentCategoryIndex];
    let question = category.questions[currentQuestionIndex];

    // Remove the "selected" class from all option buttons
    let optionButtons = optionsElement.querySelectorAll('.option-btn');
    optionButtons.forEach(function (button) {
      button.classList.remove('selected');
    });

    // Add the "selected" class to the clicked option button
    selectedOption.classList.add('selected');

  }

function submitAnswer() {
  // Check if an option is selected
  let selectedOption = optionsElement.querySelector('.selected');
  if (!selectedOption) {
    return; // Exit the function if no option is selected
  }

  // Increment the question index
  currentQuestionIndex++;

  // Get the current question from the category
  let category = categories[currentCategoryIndex];
  let question = category.questions[currentQuestionIndex - 1]; // Subtract 1 to get the correct question

  if (selectedOption.innerText === question.correctOption) {
    score++; // Increment the score if the answer is correct
  }
  

  // Check if all questions in the current category are answered
  if (currentQuestionIndex >= category.questions.length) {
    // Check if there are more categories
    if (currentCategoryIndex + 1 < categories.length) {
      // Move to the next category
      currentCategoryIndex++;
      currentQuestionIndex = 0;
      // Load the next question
      loadQuestion();
    } else {
      // End the quiz and display the result
      displayResult();
    }
  } else {
    // Load the next question
    loadQuestion();
  }

  // Clear the selected option and enable option buttons
  let optionButtons = optionsElement.querySelectorAll('.option-btn');
  for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].disabled = false;
    optionButtons[i].classList.remove('selected');
  }
}

  

// Function to end the quiz and display the result
function endQuiz() {
  // Get the end screen element
  let endScreen = document.getElementById('end-screen');

  // Hide the question container
  questionContainer.style.display = 'none';

  // Show the end screen
  endScreen.style.display = 'block';

}




// Function to calculate the number of answered questions
function getAnsweredQuestionsCount() {
  let answeredCount = 0;
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i];
    for (let j = 0; j < category.questions.length; j++) {
      if (category.questions[j].selectedOption) {
        answeredCount++;
      }
    }
  }
  return answeredCount;
}


  // Function to calculate the total number of questions in all categories
  function getTotalQuestionsCount() {
    let totalQuestionsCount = 0;
    for (let i = 0; i < categories.length; i++) {
      totalQuestionsCount += categories[i].questions.length;
    }
    return totalQuestionsCount;
  }



  function displayResult() {
    // Calculate the total number of questions answered correctly
    let correctCount = 0;
    for (let i = 0; i < categories.length; i++) {
      let category = categories[i];
      for (let j = 0; j < category.questions.length; j++) {
        let question = category.questions[j];
        if (question.selectedOption === question.answer) {
          correctCount++;
        }
      }
    }
  
    // Calculate the score as a percentage
    let scorePercentage = (correctCount / totalQuestions) * 100;
  
    // Get the end screen element
    let endScreen = document.getElementById('end-screen');
  
    // Hide the question container
    questionContainer.style.display = 'none';
  
    // Show the end screen
    endScreen.style.display = 'block';
  
    // Display the result
    let resultsElement = document.getElementById('results');
    resultsElement.innerHTML = `
      <h1>Your results</h1>
      <p>Username: <strong>${usernameInput.value}</strong></p>
      <p>Score: <strong>${scorePercentage.toFixed(2)}%</strong></p>
    `;
  }
  
  

  // Submit the username and score to the Firebase Realtime Database
  function submitScore() {
    // Get the username and score from the user input
    let username = usernameInput.value;

    // Update the results element with the username and score
    updateResults(score);

    // Clear the username and score inputs
    usernameInput.value = '';
    scoreInput.value = '';
  }
});