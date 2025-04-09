// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer. 
const questions = [ 
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Madrid", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false }
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Scripts", correct: false },
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style Syntax", correct: false }
    ]
  },
  {
    question: "What's George Eliot's real name?",
    answers: [
      { text: "T.S. Eliot", correct: false },
      { text: "Marian Evans", correct: true },
      { text: "Joan Didion", correct: false },
      { text: "Currer Bell", correct: false }
    ]
  }
];

// 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
// In the 'id' field for each element tag with an ID we can reference, it's possible to set an ID e.g. "question".
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const hintButton = document.getElementById("hint-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
    // These HTML elements need to adapt in accordance with changes in the program state (i.e. currentQuestionIndex),
    // so they can't be known and rendered statically from the outset.
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    // 4. What is the line below doing? 
    // This is dynamically inserting the created button into the DOM tree as a child of
    // the <div> which is designated to hold the answer buttons.
    answerButtonsElement.appendChild(button);
  });

  hintButton.style.display = "block";
}

function resetState() {
  nextButton.style.display = "none";
  hintButton.style.display = "none";
  answerButtonsElement.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtonsElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
  // If we did not change this from the invisible "none" to something visible e.g. "block", 
  // we wouldn't be able to see the button.
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
  nextButton.textContent = "Restart";
  nextButton.style.display = "block";
  hintButton.style.display = "none";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// 6. Summarize in your own words what you think this block of code is doing. 
// This block ensures that clicking next advances to the handler code which shows the next question or the final score 
// unless we've already reached the end, at which point it resets/restarts the quiz.
nextButton.addEventListener("click", () => { 
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

hintButton.addEventListener("click", (e) => {
  // at most once, mark an incorrect answer red to give a hint
  answers = answerButtonsElement.children;
  var count = 0;
  for(var i = 0; i < answers.length; i++){
    if (!(answers[i].correct) && count == 0){
      answers[i].classList.add("wrong");
      count++;
    }
  };
});

startQuiz();
