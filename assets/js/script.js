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

  // Get the Exit Quiz button
  let exitButton = document.getElementById('Exit');

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

    // Show the Exit Quiz button after the quiz starts
    exitButton.style.display = 'block';

  });

  // Add event listener to the "Exit Quiz" button
  exitButton.addEventListener('click', function () {
    // Reset the quiz state
    currentCategoryIndex = 0;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('score').innerText = 'Score: 0';
    document.getElementById('results').innerHTML = '';

    // Hide the end screen
    document.getElementById('end-screen').style.display = 'none';

    // Hide the start quiz button
    document.getElementById('start-quiz').style.display = 'none';

    // Show the username input
    document.getElementById('username-input').style.display = 'block';

    // Show the "Enter username" button
    document.getElementById('enter-username').style.display = 'block';

    // Flex display for enter username and username input
    document.getElementById('enter-username').style.display = 'flex';

    // Show start text
    startText.style.display = 'block';

    // Hide the "Exit Quiz" button
    exitButton.style.display = 'none';

    //Hide the Question container
    document.getElementById('question-container').style.display = 'none';

    // Reset the username input value
    usernameInput.value = '';
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
    for (const element of question.options) {
      let optionButton = document.createElement('button');
      optionButton.innerText = element;
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
      endQuiz();
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

  // Show the question container
  document.getElementById('question-container').style.display = 'block';

  // Add event listener to the submit button
  submitButton.addEventListener('click', submitAnswer);

  // Function to handle option selection
  function selectOption(event) {
    let selectedOption = event.target;

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
  
    if (selectedOption.innerText === question.answer) {
      score++; // Increment the score if the answer is correct
    }
  
    // Calculate the score as a percentage
    let scorePercentage = (score / totalQuestions) * 100;
  
    // Update the score display based on the theme
    updateScoreDisplay(scorePercentage);
  
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
    for (const element of optionButtons) {
      element.disabled = false;
      element.classList.remove('selected');
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



  // Function to calculate the total number of questions in all categories
  function getTotalQuestionsCount() {
    let totalQuestionsCount = 0;
    for (const element of categories) {
      totalQuestionsCount += element.questions.length;
    }
    return totalQuestionsCount;
  }

  // Function to calculate the number of correct answers
  function getCorrectAnswersCount() {
    let correctCount = 0;
    for (const category of categories) {
      for (const question of category.questions) {
        if (question.selectedOption === question.answer) {
          correctCount++;
        }
      }
    }
    return correctCount;
  }

  let shipwreckTheme = document.getElementById('shipwreck-theme');
  let smallboatTheme = document.getElementById('smallboat-theme');
  let pirateshipTheme = document.getElementById('pirateship-theme');

  function updateScoreDisplay() {
    // Get the score display elements for each theme
    let shipwreckScore = document.getElementById('shipwreck-score');
    let smallboatScore = document.getElementById('smallboat-score');
    let pirateshipScore = document.getElementById('pirateship-score');

    // Calculate the score as a percentage
    let scorePercentage = (score / totalQuestions) * 100;
  
    // Update the score displays for each theme
    shipwreckScore.innerHTML = `Score: ${score}`;
    smallboatScore.innerHTML = `Score: ${score}`;
    pirateshipScore.innerHTML = `Score: ${scorePercentage.toFixed(2)}%`;
  }
  

  function displayResult() {
    let correctCount = getCorrectAnswersCount();
  
    // Calculate the score as a percentage
    let scorePercentage = (score / totalQuestions) * 100;
  
    // Get the end screen element
    let endScreen = document.getElementById('end-screen');
  
    // Hide the question container
    questionContainer.style.display = 'none';
  
    // Show the end screen
    endScreen.style.display = 'block';
  
    // Determine the theme based on the score percentage
    if (scorePercentage >= 0 && scorePercentage <= 33.33) {
      // Shipwreck theme
      let shipwreckResults = document.getElementById('shipwreck-results');
      shipwreckResults.innerHTML = `
        <h2>Username: <strong>${usernameInput.value}</strong></h2>
        <h1>Oh No! Badluck, you're shipwrecked!</h1>
        <img src="assets/images/shipwrecked.png" alt="Shipwrecked"/>
        <h2>Score: <strong>${scorePercentage.toFixed(2)}%</strong></h2>
        <h2>Thanks for playing!</h2>
      `;
      shipwreckTheme.style.display = 'block';
  
      // Update the score display for the shipwreck theme
      updateScoreDisplay(scorePercentage);
    } else if (scorePercentage > 33.33 && scorePercentage <= 63.33) {
      // Small boat theme
      let smallboatResults = document.getElementById('smallboat-results');
      smallboatResults.innerHTML = `
        <h2>Username: <strong>${usernameInput.value}</strong></h2>
        <h1>You just about got away!</h1>
        <h2>Score: <strong>${scorePercentage.toFixed(2)}%</strong></h2>
        <h2>Thanks for playing!</h2>
      `;
      smallboatTheme.style.display = 'block';
  
      // Update the score display for the small boat theme
      updateScoreDisplay(scorePercentage);
    } else {
      // Large pirate ship theme
      let pirateshipResults = document.getElementById('pirateship-results');
      pirateshipResults.innerHTML = `
        <h2>Username: <strong>${usernameInput.value}</strong></h2>
        <h1>Smooth Sailing! Nice one!</h1>
        <h2>Score: <strong>${scorePercentage.toFixed(2)}%</strong></h2>
        <h2>Thanks for playing!</h2>
      `;
      pirateshipTheme.style.display = 'block';
  
      // Update the score display for the large pirate ship theme
      updateScoreDisplay(scorePercentage);
    }
  }
  
});