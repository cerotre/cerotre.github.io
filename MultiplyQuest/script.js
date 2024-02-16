const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const pointsElement = document.getElementById('points');
const recordElement = document.getElementById('record');
const resetButton = document.getElementById('reset');

const MAX_MULTIPLIER = 10;

let points = 0;
let record = localStorage.getItem('record') || 0;

function generateRandomQuestion() {
  const multiplier1 = getRandomNumber(MAX_MULTIPLIER);
  const multiplier2 = getRandomNumber(MAX_MULTIPLIER);
  return { question: `${multiplier1}x${multiplier2}`, answer: multiplier1 * multiplier2 };
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function displayQuestion() {
  const randomQuestion = generateRandomQuestion();
  questionElement.textContent = randomQuestion.question;
  questionElement.dataset.answer = randomQuestion.answer;
}

function checkAnswer() {
  const userAnswer = parseInt(answerElement.value);
  const correctAnswer = parseInt(questionElement.dataset.answer);

  if (isNaN(userAnswer)) {
    return; // No hace nada si la respuesta no es un número
  }

  if (userAnswer === correctAnswer) {
    points++;
    if (points > record) {
      record = points;
      localStorage.setItem('record', record);
    }
  } else {
    points--;
  }

  pointsElement.textContent = points;
  recordElement.textContent = record;
  displayQuestion();
  answerElement.value = '';
}

function resetGame() {
  points = 0;
  pointsElement.textContent = points;
  displayQuestion();
  answerElement.value = '';
}

answerElement.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    checkAnswer();
  }
});

resetButton.addEventListener('click', resetGame);

displayQuestion();
recordElement.textContent = record;
