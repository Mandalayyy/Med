let currentQuestion = 1;
const totalQuestions = 7;
let countdownInterval;
const answers = [];

// Дані для кожного питання
const questions = [
  { image: './assets/pic_1.jpg', text: 'Is the penis 8 inches or more in length?' },
  { image: './assets/pic_2.jpg', text: 'Have you exppirienced erectile problems or decrease in libido?' },
  { image: './assets/pic_3.jpg', text: 'Are you currently taking any medications or supplements that might affect your sexual health? ' },
  { image: './assets/pic_4.jpg', text: 'Do you have any underlying health conditions, such as diabetes or hypertension?' },
  { image: './assets/pic_5.jpg', text: 'Have you ever undergone any previous treatments or surgeries for sexual enhancement or related issues?' },
  { image: './assets/pic_6.jpg', text: 'How important is it for you to have access to safe and effective medication for enhancing your sexual health?' },
  { image: './assets/pic_7.jpg', text: 'Do you think your wife is satisfied with the size of your penis?' }
];

function showQuestion(questionIndex) {
  const question = questions[questionIndex - 1];
  
  // Змінюємо зображення, заголовок і текст питання
  document.getElementById('questionImage').src = question.image;
  document.getElementById('questionText').textContent = question.text;

  // Оновлюємо активний клас для номера питання
  const questionNumbers = document.querySelectorAll('.question-number');
  questionNumbers.forEach((questionNumber, index) => {
    questionNumber.classList.toggle('active', index + 1 === questionIndex);
  });
}

function initQuestionNumbers() {
  const questionNumbersContainer = document.getElementById('questionNumbers');
  
  for (let i = 1; i <= totalQuestions; i++) {
    const questionNumber = document.createElement('span');
    questionNumber.textContent = i;
    questionNumber.className = 'question-number';
    
    questionNumber.addEventListener('click', () => {
      currentQuestion = i;
      showQuestion(currentQuestion);
    });
    
    questionNumbersContainer.appendChild(questionNumber);
  }
}

// Функція для обробки відповіді
function answer(response) {
  // Save the answer in the array
  answers.push({ question: currentQuestion, answer: response });

  // Proceed to the next question
  if (currentQuestion < totalQuestions) {
      currentQuestion++;
      showQuestion(currentQuestion);
  } else {
      showOverlay();
  }
}

function showOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'flex';
  
  // Start the timer only when the overlay is opened
  const countdownMinutes = 10; // Timer duration in minutes
  const display = document.querySelector('#timer');
  startTimer(countdownMinutes * 60, display);
}

function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  countdownInterval = setInterval(() => {
      // Convert minutes and seconds to strings
      minutes = String(Math.floor(timer / 60)).padStart(2, '0');
      seconds = String(timer % 60).padStart(2, '0');

      // Update the display with each digit wrapped in a span
      display.innerHTML = `
          <span>${minutes[0]}</span><span>${minutes[1]}</span>
          <span>${seconds[0]}</span><span>${seconds[1]}</span>`;

      // Decrement the timer
      if (--timer < 0) {
          timer = duration; // Reset timer when it reaches zero
      }
  }, 1000);
}

function submitForm() {
  // Отримуємо значення email
  const email = document.getElementById('email').value;

  // Перевірка, чи поле електронної пошти не порожнє та правильного формату
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
      alert("Email is not correct");
      return false;
  }

  // Перевірка, чи всі відповіді заповнені
  if (answers.length !== 7) {
      alert("Answer all questions");
      return false;
  }

  // Готуємо дані для відправки
  const formData = new FormData();
  formData.append('email', email);
  formData.append('answers', JSON.stringify(answers));

  // Звільнення місця для відповіді
  // Відправка форми за допомогою fetch
  fetch('./process.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.text())
  .then(data => {
      console.log(data);
      if (data === 'success') {
          window.location.href = 'https://www.menshealth.com/';
      } else {
          alert(data); // Відображення повідомлення про помилку
      }
  })
  .catch(error => console.error('Error:', error));

  return false; // Запобігає стандартному відправленню форми
}

function closeOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
  
  // Stop the timer when the overlay is closed
  clearInterval(countdownInterval);
}
// Ініціалізація номери питань та показ першого питання
initQuestionNumbers();
showQuestion(currentQuestion);