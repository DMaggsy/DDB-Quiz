document.addEventListener('DOMContentLoaded', function() {
    // Define variables
    var categories;
    var currentCategoryIndex = 0;
    var currentQuestionIndex = 0;
    var score = 0;
  
    // Get the start button element
    var startButton = document.getElementById('start-btn');
  
    // Get the question container elements
    var questionContainer = document.getElementById('question-container');
    var questionElement = document.getElementById('question');
    var optionsElement = document.getElementById('options');
  
    // Get the submit button and result elements
    var submitButton = document.getElementById('submit-btn');
    var resultElement = document.getElementById('result');
  
    // Add event listener to the start button
    startButton.addEventListener('click', startQuiz);
  
    // Function to start the quiz
    function startQuiz() {
      // Hide the start button and show the question container
      startButton.style.display = 'none';
      questionContainer.style.display = 'block';
  
      // Load the categories from the JSON file
      loadCategories();
    }

  // Function to load the categories from the JSON file
  function loadCategories() {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        categories = data.categories;
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

    // Check if the selected option is correct
    if (selectedOption.innerText === question.answer) {
      score++;
    }

    // Disable option buttons to prevent multiple selections
    var optionButtons = optionsElement.querySelectorAll('.option-btn');
    for (var i = 0; i < optionButtons.length; i++) {
      optionButtons[i].disabled = true;
    }

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

    // Calculate the score percentage
    var totalQuestions = 0;
    var totalCorrect = 0;
    for (var i = 0; i < categories.length; i++) {
      totalQuestions += categories[i].questions.length;
      totalCorrect += getCorrectAnswersCount(categories[i]);
    }
    var scorePercentage = (score / totalQuestions) * 100;

    // Display the result
    resultElement.innerHTML = 'Quiz ended.<br>';
    resultElement.innerHTML += 'Your score: ' + score + '/' + totalQuestions + '<br>';
    resultElement.innerHTML += 'Score percentage: ' + scorePercentage.toFixed(2) + '%';
  }

  // Function to count the number of correct answers in a category
  function getCorrectAnswersCount(category) {
    var correctCount = 0;
    for (var i = 0; i < category.questions.length; i++) {
      if (category.questions[i].answer === category.questions[i].selectedOption) {
        correctCount++;
      }
    }
    return correctCount;
  }
});
