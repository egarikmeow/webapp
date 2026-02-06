const tg = window.Telegram.WebApp;
tg.expand();

const intro = document.getElementById("intro");
const menu = document.getElementById("menu");
const introText = document.querySelector(".intro-text");
const loveBtn = document.getElementById("love-btn");
const quizBtn = document.getElementById("quiz-btn");
const fromMeBtn = document.getElementById("from-me-btn");
const loveContainer = document.getElementById("love-mode-container");
const quizContainer = document.getElementById("quiz-mode-container");
const fromMeContainer = document.getElementById("from-me-container");

// ===== Режим "Почему я тебя люблю" =====
const lovePhrases = [
  "Ты делаешь мой мир светлее ✨",
  "С тобой каждый день — праздник 🎉",
  "Твоя улыбка — моя радость 😊",
  "Ты самый дорогой человек для меня 💖",
  "Каждый момент с тобой бесценен 🌸"
];
let loveIndex = 0;

// ===== Стартовый экран =====
function showMenuWithAnimation() {
  menu.classList.add("show");
  const buttons = Array.from(menu.querySelectorAll(".mode-btn"));
  buttons.forEach((btn, i) => {
    btn.classList.remove("show");
    setTimeout(() => btn.classList.add("show"), i * 150);
  });
}

setTimeout(() => intro.classList.add("show"), 300);
setTimeout(() => {
  intro.classList.add("hide");
  showMenuWithAnimation();
}, 1800);

// ===== Кнопка "Назад" =====
const backBtn = document.createElement("button");
backBtn.classList.add("back-btn");
backBtn.textContent = "⬅ Назад";
document.body.appendChild(backBtn);

backBtn.addEventListener("click", () => {
  loveContainer.innerHTML = "";
  quizContainer.innerHTML = "";
  fromMeContainer.innerHTML = "";
  intro.style.display = "block";
  showMenuWithAnimation();
  backBtn.classList.remove("show");
});

// ===== Почему я тебя люблю =====
loveBtn.addEventListener("click", () => {
  menu.classList.remove("show");
  intro.style.display = "none";
  backBtn.classList.add("show");

  loveContainer.innerHTML = `
    <div class="love-mode">
      <div class="love-main">
        <div class="love-title">Я тебя люблю, потому что</div> 
        <div class="love-phrase animate" id="love-phrase">${lovePhrases[loveIndex]}</div>
        <button class="mode-btn" id="next-btn">Ещё ❤️</button>
      </div>
      <div id="hearts-container"></div>
    </div>
  `;

  const lovePhrase = document.getElementById("love-phrase");
  const nextBtn = document.getElementById("next-btn");
  const heartsContainer = document.getElementById("hearts-container");

  setTimeout(() => nextBtn.classList.add("show"), 200); // плавное появление кнопки "Ещё"

  nextBtn.addEventListener("click", () => {
    loveIndex = (loveIndex + 1) % lovePhrases.length;
    lovePhrase.textContent = lovePhrases[loveIndex];
    lovePhrase.classList.remove("animate");
    void lovePhrase.offsetWidth;
    lovePhrase.classList.add("animate");
  });

  createHearts(30, heartsContainer);
});

function createHearts(count, container) {
  for (let i = 0; i < count; i++) addHeart(container);
  setInterval(() => addHeart(container), 500);
}
function addHeart(container) {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = 14 + Math.random() * 14 + "px";
  heart.style.animationDuration = 3 + Math.random() * 2 + "s";
  heart.style.opacity = 0.5 + Math.random() * 0.5;
  container.appendChild(heart);
  setTimeout(() => container.removeChild(heart), 5000);
}

// ===== Режим "От меня" =====
const fromMeTextContent = `Яночка, сегодня 14 февраля, день всех влюбленных, и в этот день я хочу тебе сказать, что я тебя очень сильно люблю и обожаю, ты лучшее что случилось со мной в 2026 году, и я очень рад, что сейчас мы вместе, и хочу, что бы это так было всегда 💘`;

fromMeBtn.addEventListener("click", () => {
  menu.classList.remove("show");
  intro.style.display = "none";
  backBtn.classList.add("show");

  fromMeContainer.innerHTML = `
    <div class="from-me-mode">
      <div class="from-me-text" id="from-me-text"></div>
    </div>
  `;

  const textEl = document.getElementById("from-me-text");
  typeText(textEl, fromMeTextContent, 30000);
});

function typeText(element, text, duration) {
  element.style.opacity = 1;
  const totalChars = text.length;
  let current = 0;
  const intervalTime = duration / totalChars;

  const interval = setInterval(() => {
    element.textContent += text[current];
    current++;
    if (current >= totalChars) clearInterval(interval);
  }, intervalTime);
}

// ===== Режим Лотерея =====
const lotteryBtn = document.getElementById("lottery-btn");

const lotteryPrizes = [
  "Бесконечные объятия",
  "Пожизненный запас комплиментов",
  "Звание 'Самая лучшая'",
  "Бесконечные объятия",
  "Пожизненный запас комплиментов",
  "Звание 'Самая лучшая'"
];

lotteryBtn.addEventListener("click", () => {
  menu.classList.remove("show");
  intro.style.display = "none";
  backBtn.classList.add("show");

  loveContainer.innerHTML = "";
  quizContainer.innerHTML = "";
  fromMeContainer.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("lottery-mode");

  container.innerHTML = `
    <div class="lottery-title">Лотерея 🎫</div>
    <div class="wheel-container">
      <div class="wheel" id="wheel"></div>
    </div>
    <button class="spin-btn" id="spin-btn">Крутить 🎡</button>
    <div class="lottery-prize" id="lottery-prize"></div>
  `;

  document.body.appendChild(container);

  const wheel = document.getElementById("wheel");
  const spinBtn = document.getElementById("spin-btn");
  const prizeEl = document.getElementById("lottery-prize");

  // создаем сегменты
  const segmentCount = lotteryPrizes.length;
  const angleStep = 360 / segmentCount;
  lotteryPrizes.forEach((text, i) => {
    const seg = document.createElement("div");
    seg.classList.add("segment");
    seg.style.transform = `rotate(${i*angleStep}deg) translate(0, -100%)`;
    seg.textContent = text;
    wheel.appendChild(seg);
  });

  // плавное появление кнопки
  setTimeout(() => spinBtn.classList.add("show"), 200);

  // привязка клика к кнопке
  spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;

    const rotations = 5; // обороты
    const prizeIndex = 0; // всегда выигрыш
    const finalAngle = 360*rotations + prizeIndex*angleStep + angleStep/2;

    wheel.style.transform = `rotate(${finalAngle}deg)`;

    setTimeout(() => {
      prizeEl.textContent = `Поздравляю! Ты выиграла: ${lotteryPrizes[prizeIndex]} 🎉`;
      prizeEl.classList.add("show");
    }, 4000);
  });
});

// ===== Режим Викторина =====
const quizQuestions = [
  {q:"Я люблю котов?", opts:["Да","Нет","Не знаю"]},
  {q:"Что мне больше приглядывается по душе?", opts:["Кино","Театр","Ничего"]},
  {q:"Что мне больше приглядывается по душе?", opts:["Вода","Кола","Чай"]},
  {q:"Что мне больше приглядывается по душе?", opts:["Кошка","Собака","Попугай"]},
  {q:"Что бы я выбрал?", opts:["Юрист","Менеджер","IT"]},
  {q:"Что мне больше приглядывается по душе?", opts:["Гулянки","Сидеть дома","В гости"]},
  {q:"Что мне больше приглядывается по душе?", opts:["Любить","Быть любимой","Затрудняюсь"]}
];
const praises = ["Да!","Верно)","Я также ответил","Именно!","Умница!"];
let quizIndex = 0;

quizBtn.addEventListener("click", () => {
  menu.classList.remove("show");
  intro.style.display = "none";
  backBtn.classList.add("show");

  quizContainer.innerHTML = `
    <div class="quiz-mode">
      <div id="roses-container"></div>
      <div class="quiz-window">
        <div class="quiz-question" id="quiz-question"></div>
        <div class="quiz-options" id="quiz-options"></div>
        <button class="mode-btn" id="next-quiz-btn">Дальше ➡️</button>
      </div>
    </div>
  `;

  const questionEl = document.getElementById("quiz-question");
  const optionsEl = document.getElementById("quiz-options");
  const nextBtn = document.getElementById("next-quiz-btn");
  const rosesContainer = document.getElementById("roses-container");

  quizIndex = 0;
  nextBtn.classList.remove("show");
  showQuestion();

  nextBtn.addEventListener("click", () => {
    quizIndex++;
    if (quizIndex >= quizQuestions.length) {
      showFinalText();
    } else {
      showQuestion();
      nextBtn.classList.remove("show");
    }
  });

  createRoses(30, rosesContainer);

  function showQuestion() {
    const q = quizQuestions[quizIndex];
    questionEl.textContent = q.q;
    questionEl.style.filter = "blur(6px)";
    questionEl.style.opacity = 0;
    optionsEl.innerHTML = "";

    setTimeout(() => {
      questionEl.style.transition = "all 0.6s ease";
      questionEl.style.filter = "blur(0)";
      questionEl.style.opacity = 1;
    }, 50);

    q.opts.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.classList.add("quiz-option");

      setTimeout(() => btn.classList.add("show"), i * 150); // плавное появление кнопок

      btn.addEventListener("click", () => {
        const praise = praises[Math.floor(Math.random() * praises.length)];

        questionEl.style.filter = "blur(6px)";
        questionEl.style.opacity = 0;

        setTimeout(() => {
          questionEl.textContent = praise;
          questionEl.style.filter = "blur(6px)";
          questionEl.style.opacity = 0;
          setTimeout(() => {
            questionEl.style.transition = "all 0.6s ease";
            questionEl.style.filter = "blur(0)";
            questionEl.style.opacity = 1;
          }, 50);
        }, 300);

        btn.classList.add("correct");
        setTimeout(() => nextBtn.classList.add("show"), 50); // плавно показать кнопку "Дальше"
      });

      optionsEl.appendChild(btn);
    });
  }

  function createRoses(count, container) {
    for (let i = 0; i < count; i++) addRose(container);
    setInterval(() => addRose(container), 600);
  }

  function addRose(container) {
    const rose = document.createElement("div");
    rose.classList.add("rose");
    rose.textContent = "🌹";
    rose.style.left = Math.random() * 100 + "%";
    rose.style.fontSize = 14 + Math.random() * 14 + "px";
    rose.style.animationDuration = 3 + Math.random() * 2 + "s";
    rose.style.opacity = 0.5 + Math.random() * 0.5;
    container.appendChild(rose);
    setTimeout(() => container.removeChild(rose), 5000);
  }

  function showFinalText() {
    quizContainer.innerHTML = `
      <div class="quiz-mode">
        <div class="final-text">Молодец! Ты знаешь меня на все 100%. Это ли не прекрасно, солнце?)</div>
      </div>
    `;
  }
});
