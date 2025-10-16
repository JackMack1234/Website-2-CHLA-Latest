// Simple multiple-choice quiz logic
const quizData = [
  { question: "Which city is the largest in Canterbury?", choices: ["Dunedin","Queenstown","Christchurch","Timaru"], correct: 2 },
  { question: "What nickname is Christchurch known by?", choices: ["The Garden City","The Golden City","The Harbour City","The Mountain City"], correct: 0 },
  { question: "Which lake is important to Māori in Canterbury?", choices: ["Lake Taupo","Lake Ellesmere (Te Waihora)","Lake Wakatipu","Lake Wanaka"], correct: 1 }
];

let currentIndex = 0;
let score = 0;
let selected = null;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const resultEl = document.getElementById('result');
const progressEl = document.getElementById('progress');

function renderQuestion() {
  const q = quizData[currentIndex];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = '';
  selected = null;
  q.choices.forEach((choice, i) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = choice;
    btn.dataset.index = i;
    btn.addEventListener('click', () => {
      Array.from(choicesEl.querySelectorAll('button')).forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selected = Number(btn.dataset.index);
    });
    li.appendChild(btn);
    choicesEl.appendChild(li);
  });
  progressEl.textContent = `${currentIndex + 1} / ${quizData.length}`;
}

function showResult() {
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = `<strong>Your score: ${score} / ${quizData.length}</strong><p>${Math.round((score / quizData.length) * 100)}% correct</p>`;
  nextBtn.classList.add('hidden');
  restartBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
  if (selected === null) {
    alert('Please select an answer.');
    return;
  }
  const q = quizData[currentIndex];
  if (selected === q.correct) score++;
  currentIndex++;
  if (currentIndex < quizData.length) {
    renderQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener('click', () => {
  currentIndex = 0;
  score = 0;
  selected = null;
  resultEl.classList.add('hidden');
  nextBtn.classList.remove('hidden');
  restartBtn.classList.add('hidden');
  renderQuestion();
});

// initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderQuestion);
} else {
  renderQuestion();
}