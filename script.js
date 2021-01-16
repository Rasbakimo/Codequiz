
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    var output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
        var answers = [];
        for(letter in currentQuestion.answers){
         //  radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    var numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      var answerContainer = answerContainers[questionNumber];
      var selector = `input[name=question${questionNumber}]:checked`;
      var userAnswer = (answerContainer.querySelector(selector) || {}).value;
      
      if(userAnswer === currentQuestion.correctAnswer){      
        numCorrect++;
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      
      else{
        answerContainers[questionNumber].style.color = 'red';
      }
      
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(show) {
    slides[currentSlide].classList.remove('active-slide');
    slides[show].classList.add('active-slide');
    currentSlide = show;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      // startButton.style.display = 'none';
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  var quizContainer = document.getElementById('quiz');
  var resultsContainer = document.getElementById('results');
  var submitButton = document.getElementById('submit');
  var myQuestions = [
    {
      question: "Which is a function syntax?",
      answers: {
        a: "var value + name ",
          b: " div input div ",
          c: "var name = value ;"
        },
        correctAnswer: "c"
        },
        {
        question: "What does CSS mean?",
        answers: {
          a: "condensed storage sheet",
          b: "cascading style sheett",
          c: "code style sheet"
        },
        correctAnswer: "b"
        },
        {
        question: "what is the way to stop a function?",
        answers: {
          a: "return",
          b: "stop",
          c: "reset",
        },
        correctAnswer: "a"
        }
       
  ];


  buildQuiz();

  // Pagination
  // var startButton = document.getElementById("start");
  var previousButton = document.getElementById("previous");
  var nextButton = document.getElementById("next");
  var slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  // startButton.addEventListener('click', startTimer)
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener('click', showPreviousSlide);
  nextButton.addEventListener('click', showNextSlide);
