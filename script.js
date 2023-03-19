const startButton = document.querySelector('.start-button');
const questionContainerElement = document.querySelector('.question-container');
const answerContainerElement = document.querySelector('.answer-container');
const nextButton = document.querySelector('.next-button');
const questionText = document.querySelector('.question');
const answerButtons = document.querySelectorAll('.btn');
let resultText = document.createElement('p');

const startQuiz = function() {
    localStorage.clear();
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    answerContainerElement.classList.remove('hide');
    questionText.innerText = questions[0].question;
    resetState();
    questions[0].answers.forEach((answer) => {
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
  if (localStorage.length === 1) {
    return
  }

  const selectedButton = e.target;
  if (selectedButton.dataset.correct) {
    resultText.innerText = 'Correct!';
    resultText.classList.add('result-text');
    resultText.classList.add('correct');
    answerContainerElement.appendChild(resultText);
    localStorage.setItem('answerStatus', 'correct');
    console.log(localStorage);

  } else {
    resultText.innerText = 'incorrect!';
    resultText.classList.add('result-text');
    resultText.classList.add('incorrect');    
    answerContainerElement.appendChild(resultText);
    localStorage.setItem('answerStatus', 'incorrect');
  }
  
}

function resetState() {
  answerContainerElement.innerHTML = '';
}

startButton.addEventListener('click', startQuiz);

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

