localStorage.clear();

const startButton = document.querySelector('.start-button');
const mainContainer = document.querySelector('.main-container');
const questionContainerElement = document.querySelector('.question-container');
const answerContainerElement = document.querySelector('.answer-container');
const nextButton = document.querySelector('.next-button');
const questionText = document.querySelector('.question');
const answerButtons = document.querySelectorAll('.btn');
const body = document.querySelector('.body');
let resultText = document.createElement('p');
let questionCount = 1;
let correctArray = [];
let incorrectArray = [];
let answersArray = [];
const resultsContainer = document.createElement('div');
const resultsButton = document.querySelector('.results-button');
const submitScore = document.createElement('button');
const submitScoreContainer = document.createElement('div');
const results = document.createElement('p');
const initialsContainer = document.createElement('div');
const initialsLabel = document.createElement('label');
const initials = document.createElement('input');
const topScoresContainer = document.createElement('div');
const topScores = document.createElement('p');
const scoreDate = new Date().toLocaleDateString();
const topScoresTitleContainer = document.createElement('div');
const topScoresTitle = document.createElement('h2');
const newQuizButtonContainer = document.createElement('div');
const newQuizButton = document.createElement('button');
let scoreIndex = 0;
let toStorage = [];

let scoreArray = [];
let initialsArray = [];
let topScoresArray = [];

const startQuiz = function(index) {
    if (questionCount >= questions.length) {
      questionContainerElement.classList.add('hide');
      answerContainerElement.classList.add('hide');
      nextButton.classList.add('hide');
      return;
    }
    if (localStorage.length === 0) {
      index = 0;
    }
    nextButton.classList.add('hide');
    localStorage.clear();
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    answerContainerElement.classList.remove('hide');
    questionText.innerText = questions[index].question;
    resetState();
    questions[index].answers.forEach((answer) => {
      const button = document.createElement('button');     
      button.innerText = answer.text;
      button.classList.add('btn');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      answerContainerElement.appendChild(button);
      button.addEventListener('click', selectAnswer);
    })
  }

function selectAnswer(e) {
  if (localStorage.length >= 1) {
    return
  }

  const selectedButton = e.target;
  if (selectedButton.dataset.correct) {
    resultText.innerText = 'Correct!';
    resultText.classList.remove('incorrect');
    resultText.classList.add('result-text');
    resultText.classList.add('correct');
    answerContainerElement.appendChild(resultText);
    localStorage.setItem('answerStatus', 'correct'); 
    answersArray.push(1);  
    correctArray.push(1);

  } else {
    resultText.innerText = 'incorrect!';
    resultText.classList.remove('correct');
    resultText.classList.add('result-text');
    resultText.classList.add('incorrect');    
    answerContainerElement.appendChild(resultText);
    localStorage.setItem('answerStatus', 'incorrect');
    answersArray.push(1);
    incorrectArray.push(1);
  }
  nextButton.classList.remove('hide');
  if ((questions.length) === questionCount) {
    addResultsButton()
  };
}

function nextQuestion() {
  let qIndex = questionCount;
  startQuiz(qIndex);
  questionCount += 1;
};

function addResultsButton() {
  nextButton.classList.add('hide');
  resultsButton.classList.remove('hide'); 
}

function endOfQuiz() {
  initials.value = '';
  questionContainerElement.classList.add('hide');
  answerContainerElement.classList.add('hide');
  resultsButton.classList.add('hide');
  resultsContainer.classList.remove('hide');
  submitScore.classList.add('submit-score');
  initialsContainer.classList.add('initials-container');
  initialsLabel.setAttribute('for', 'initials');
  initialsLabel.classList.add('initials-label');
  initials.classList.add('initials');
  results.classList.add('results-score');
  submitScoreContainer.classList.add('submit-score-container');
  initials.setAttribute('type', 'text');
  initialsLabel.innerHTML = 'Enter Your Initials';
  submitScore.innerHTML = 'Submit your score!'
  initialsContainer.appendChild(initialsLabel);
  initialsContainer.appendChild(initials);
  resultsContainer.appendChild(results);
  resultsContainer.appendChild(initialsContainer);
  submitScoreContainer.appendChild(submitScore);
  resultsContainer.appendChild(submitScoreContainer);
  resultsContainer.classList.add('results-container');
  mainContainer.appendChild(resultsContainer);
  results.innerText = `You answered ${correctArray.length} out of ${questions.length} correctly. Your score is ${(correctArray.length/questions.length) * 100}%.
  `;
};

function scoreSubmission() {
  scoreArray.push((correctArray.length/questions.length) * 100);
  initialsArray.push(initials.value);
  resultsContainer.classList.add('hide');
  topScoresTitleContainer.classList.remove('hide');
  topScores.classList.remove('hide');
  newQuizButtonContainer.classList.remove('hide');
  topScoresContainer.classList.add('top-scores-container');
  topScoresTitleContainer.classList.add('top-scores-title-container');
  topScoresTitleContainer.appendChild(topScoresTitle);
  mainContainer.appendChild(topScoresTitleContainer);
  topScoresContainer.appendChild(topScores);
  mainContainer.appendChild(topScoresContainer); 
  
  if (topScoresArray.length === 0) {
    topScoresTitle.innerText = 'Top Scores';
    topScores.innerText = `${scoreDate} - ${initialsArray[0]}: ${scoreArray[0]}%`;
    toStorage.push(topScores.innerText)
    localStorage.setItem('topScores', toStorage);
    localStorage.getItem('topScores');

  } else {
    topScoresTitle.innerText = 'Top Scores';
    topScores.innerHTML = `${scoreDate} - ${initialsArray[scoreIndex]}: ${scoreArray[scoreIndex]}% <br>` +
    topScoresArray[scoreIndex - 1];
    toStorage.push(`${scoreDate} - ${initialsArray[scoreIndex]}: ${scoreArray[scoreIndex]}%`);
    localStorage.setItem('topScores', toStorage);
    localStorage.getItem('topScores');
  };

  newQuizButtonContainer.classList.add('new-quiz-btn-container');
  newQuizButton.classList.add('new-quiz-btn');
  newQuizButton.innerText = 'New Quiz'
  newQuizButtonContainer.appendChild(newQuizButton);
  body.appendChild(newQuizButtonContainer);
  correctArray = [];
  topScoresArray.push(topScores.innerHTML);
  scoreIndex += 1;
};

function startNewQuiz() {
  topScoresTitleContainer.classList.add('hide');
  topScores.classList.add('hide');
  newQuizButtonContainer.classList.add('hide');
  questionCount = 1;
  startQuiz(0);
}

function resetState() {
  answerContainerElement.innerHTML = '';
}

startButton.addEventListener('click', startQuiz);

nextButton.addEventListener('click', nextQuestion);

resultsButton.addEventListener('click', endOfQuiz);

submitScore.addEventListener('click', scoreSubmission);

newQuizButton.addEventListener('click', startNewQuiz)

const questions = [
  {
    question: 'Which of the following is NOT a primitive value?',
    answers: [
      {
        text: 'string', correct: false
      },
      {
        text: 'boolean',
        correct: false
      },
      {
        text: 'array',
        correct: true
      },
      {
        text: 'number',
        correct: false
      }
    ]
    
  },
  {
    question: 'How do you create a new function in Javascript?',
    answers: [
      {
        text: 'new.function(){}', correct: false
      },
      {
        text: 'function myFunction(){}',
        correct: true
      },
      {
        text: 'function:myFunction(){}',
        correct: false
      },
      {
        text: 'function = myFunction(){}',
        correct: false
      }
    ]
  },
  {
    question: 'How do you declare a new date in Javascript?',
    answers: [
      {
        text: 'var date = Date();', correct: false
      },
      {
        text: 'var date = date(\'now\');',
        correct: false
      },
      {
        text: 'var date = new Date();',
        correct: true
      },
      {
        text: 'var date = date().current();',
        correct: false
      }
    ]

  },
  {
    question: 'How do you round the number 5.35 to the nearest integer?',
    answers: [
      {
        text: 'rnd(5.35)', correct: false
      },
      {
        text: 'Math.rnd(5.35)',
        correct: false
      },
      {
        text: 'round(5.35)',
        correct: false
      },
      {
        text: 'Math.round(5.35)',
        correct: true
      }
    ]
  },
  {
    question: 'How do you open a confirm window in Javascript?',
    answers: [
      {
        text: 'confirm()', correct: true
      },
      {
        text: 'location.confirm()',
        correct: false
      },
      {
        text: 'window.open_confirm()',
        correct: false
      },
      {
        text: 'window.new_confirm()',
        correct: false
      }
    ]
  }
]

