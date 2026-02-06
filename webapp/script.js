const tg = window.Telegram.WebApp;
tg.expand();

const intro = document.getElementById("intro");
const menu = document.getElementById("menu");
const introText = document.querySelector(".intro-text");
const loveBtn = document.getElementById("love-btn");
const quizBtn = document.getElementById("quiz-btn");
const fromMeBtn = document.getElementById("from-me-btn");
const lotteryBtn = document.getElementById("lottery-btn");
const loveContainer = document.getElementById("love-mode-container");
const quizContainer = document.getElementById("quiz-mode-container");
const fromMeContainer = document.getElementById("from-me-container");

// ===== Режим "Почему я тебя люблю" =====
const lovePhrases = [
  "Ты делаешь мой мир светлее ✨",
  "С тобой каждый день — праздник 🎉",
  "Твоя улыбка — моя радость 😊",
  "Ты самый дорогой человек для меня 💖",
  "Твой смех — самая красивая мелодия в моей жизни 🎶",
  "Твои глаза говорят больше, чем любые слова 👀",
  "Ты помнишь мелочи, которые важны для меня 🧩",
  "Твой запах — он как дом, к которому хочется возвращаться 🏡",
  "Ты веришь в меня, даже когда я не верю в себя 💪",
  "Ты умеешь слушать по-настоящему, всем сердцем ❤️",
  "С тобой молчание - не неловко, а комфортно 🤫",
  "Как ты радуешься мелочам — как ребенок 🌟",
  "Твоя поддержка чувствуется без слов 💪",
  "Ты замечаешь, когда мне плохо, даже если я не говорю 🥺",
  "С тобой я могу расслабиться и быть собой 🌿",
  "Ты умеешь удивлять — приятно 🎊",
  "Твоё присутствие делает всё лучше 🌟",
  "Ты первая, с кем хочется поделиться новостью 📱",
  "Ты умеешь находить выход там, где его не вижу 🧩",
  "С тобой хочется делиться самым сокровенным 💌",
  "Ты умеешь поднять настроение одним словом 🌞",
  "С тобой можно говорить обо всём 🗣️",
  "У тебя доброе сердце — это видно 🤲",
  "С тобой я чувствую себя живым 🤞"
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
  // Убираем все режимы
  loveContainer.innerHTML = "";
  quizContainer.innerHTML = "";
  fromMeContainer.innerHTML = "";
  document.querySelectorAll(".lottery-mode").forEach(el => el.remove());
  document.querySelectorAll(".info-mode").forEach(el => el.remove());
  document.querySelectorAll(".feelings-mode").forEach(el => el.remove());

  // Показываем меню и intro
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

  setTimeout(() => nextBtn.classList.add("show"), 200);

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

// ===== Режим "Информация" =====
const infoBtn = document.createElement("button");
infoBtn.classList.add("mode-btn");
infoBtn.textContent = "Информация";
menu.appendChild(infoBtn);

infoBtn.addEventListener("click", () => {
  menu.classList.remove("show");
  intro.style.display = "none";
  backBtn.classList.add("show");

  loveContainer.innerHTML = "";
  quizContainer.innerHTML = "";
  fromMeContainer.innerHTML = "";
  document.querySelectorAll(".lottery-mode").forEach(el => el.remove());

  const container = document.createElement("div");
  container.classList.add("info-mode");
  container.innerHTML = `
    <div class="info-title">Информация</div>
    <div class="info-glass">
      <div class="info-text" id="info-text"></div>
    </div>
    <button class="mode-btn" id="info-next-btn" style="display:none;">Дальше ➡️</button>
  `;
  document.body.appendChild(container);

  const infoText = document.getElementById("info-text");
  const nextBtn = document.getElementById("info-next-btn");

  const infoLines = [
    "Делая этого бота, я выпил около 30 кружек чая",
    "Делая этого бота, я потратил 6 дней",
    "Делая этого бота, фразу \"да почему нахуй\" я произнёс 200.000 раз",
    "Делая этого бота, я проверял наличие багов и лагов (Извини, если они есть :<)",
    "Делая этого бота, я планировал вообще не то, что ты видишь",
    "Делая этого бота, весь проект наворачивался из-за ChatGPT: 3 раза",
    "Делая этого бота, я старался передать твою значимость для меня 💘"
  ];

  let currentLine = 0;

  function typeLine(text, callback) {
    infoText.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      infoText.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 40);
  }

  typeLine(infoLines[currentLine], () => {
    nextBtn.style.display = "block";
  });

  nextBtn.addEventListener("click", () => {
    currentLine++;
    if (currentLine < infoLines.length) {
      nextBtn.style.display = "none";
      typeLine(infoLines[currentLine], () => {
        if (currentLine === infoLines.length - 1) {
          nextBtn.textContent = "Это всё ✅";
          nextBtn.style.display = "block";
        } else {
          nextBtn.style.display = "block";
        }
      });
    } else {
      container.remove();
      backBtn.classList.remove("show");
      intro.style.display = "block";
      showMenuWithAnimation();
    }
  });
});

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

// ===== Режим Лотерея (честная) =====
const lotteryPrizes = [
  "Бесконечные объятия",
  "Пожизненный запас комплиментов",
  "Звание 'Самая лучшая'",
  "Вечное право всегда быть правой",
  "Неограниченный лимит на милоту",
  "Купон на бесконечные поцелуи"
];

lotteryBtn.addEventListener("click", () => {
  menu.classList.remove("show");
  intro.style.display = "none";

  loveContainer.innerHTML = "";
  quizContainer.innerHTML = "";
  fromMeContainer.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("lottery-mode");
  container.innerHTML = `
    <div class="lottery-title">Лотерея 🎫</div>
    <div id="flowers-container"></div>
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
  const flowersContainer = document.getElementById("flowers-container");

  const segmentCount = lotteryPrizes.length;
  const angleStep = 360 / segmentCount;

  lotteryPrizes.forEach((text, i) => {
    const seg = document.createElement("div");
    seg.classList.add("segment");
    seg.style.transform = `rotate(${i*angleStep}deg) translate(0, -100%)`;
    seg.textContent = text;
    wheel.appendChild(seg);
  });

  setTimeout(() => spinBtn.classList.add("show"), 200);

  spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;

    const rotations = 5; 
    const prizeIndex = Math.floor(Math.random() * lotteryPrizes.length); // честная лотерея
    const finalAngle = 360*rotations + prizeIndex*angleStep + angleStep/2;

    wheel.style.transform = `rotate(${finalAngle}deg)`;

    setTimeout(() => {
      prizeEl.textContent = `Поздравляю! Ты выиграла: ${lotteryPrizes[prizeIndex]} 🎉`;
      prizeEl.classList.add("show");

      // Появление кнопки "Назад" под текстом
      backBtn.style.top = (prizeEl.offsetTop + prizeEl.offsetHeight + 20) + "px";
      backBtn.style.left = "50%";
      backBtn.style.transform = "translateX(-50%)";
      backBtn.classList.add("show");
    }, 4000);
  });

  createFlowers(30, flowersContainer);

  function createFlowers(count, container) {
    for (let i = 0; i < count; i++) addFlower(container);
    setInterval(() => addFlower(container), 600);
  }
  function addFlower(container) {
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.textContent = "🏵️";
    flower.style.left = Math.random() * 100 + "%";
    flower.style.fontSize = 14 + Math.random() * 14 + "px";
    flower.style.animationDuration = 3 + Math.random() * 2 + "s";
    flower.style.opacity = 0.5 + Math.random() * 0.5;
    container.appendChild(flower);
    setTimeout(() => container.removeChild(flower), 5000);
  }
});

// ===== Режим "Калькулятор чувств" =====
const feelingsBtn = document.createElement("button");
feelingsBtn.classList.add("mode-btn");
feelingsBtn.textContent = "Калькулятор";
menu.appendChild(feelingsBtn);

const compliments = [
  "Столько раз я думал о тебе 💖",
  "Столько раз я улыбнулся из-за тебя сегодня ✨",
  "Столько причин улыбаться, когда ты рядом ♾️",
  "Настолько ты прекрасна 😊",
  "Твоя улыбка во столько раз ярче солнца 💘",
  "Настолько ты лучше всех остальных ☀️",
  "Столько будет длиться моя любовь к тебе 🌸"
];

feelingsBtn.addEventListener("click", () => {
  menu.classList.remove("show");
  intro.style.display = "none";
  backBtn.classList.add("show");

  loveContainer.innerHTML = "";
  quizContainer.innerHTML = "";
  fromMeContainer.innerHTML = "";
  document.querySelectorAll(".lottery-mode").forEach(el => el.remove());
  document.querySelectorAll(".info-mode").forEach(el => el.remove());
  document.querySelectorAll(".feelings-mode").forEach(el => el.remove());

  const container = document.createElement("div");
  container.classList.add("feelings-mode");
  container.innerHTML = `
    <div class="feelings-window">
      <div class="feelings-title">Калькулятор чувств</div>
      <div class="feelings-display" id="feelings-display">_</div>
      <div class="feelings-buttons">
        <button class="feelings-btn">7</button>
        <button class="feelings-btn">8</button>
        <button class="feelings-btn">9</button>
        <button class="feelings-btn">4</button>
        <button class="feelings-btn">5</button>
        <button class="feelings-btn">6</button>
        <button class="feelings-btn">1</button>
        <button class="feelings-btn">2</button>
        <button class="feelings-btn">3</button>
        <button class="feelings-btn">0</button>
        <button class="feelings-btn">+</button>
        <button class="feelings-btn equal">=</button>
        <button class="feelings-btn clear">C</button>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  const display = document.getElementById("feelings-display");
  let input = "";

  container.querySelectorAll(".feelings-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const val = btn.textContent;

      if (val === "C") {
        input = "";
        display.textContent = "_";
        return;
      }

      if (val === "=") {
        const compliment = compliments[Math.floor(Math.random() * compliments.length)];
        display.textContent = compliment;
        input = "";
        return;
      }

      input += val;
      display.textContent = input;
    });
  });
});

// ===== Кнопка Секрет режим =====
const secretBtn = document.createElement("button");
secretBtn.classList.add("mode-btn");
secretBtn.textContent = "Секрет ✨";
menu.appendChild(secretBtn);

secretBtn.addEventListener("click", () => {
  menu.classList.remove("show");
  intro.style.display = "none";
  backBtn.classList.add("show");

  loveContainer.innerHTML = "";
  quizContainer.innerHTML = "";
  fromMeContainer.innerHTML = "";
  document.querySelectorAll(".lottery-mode").forEach(el => el.remove());
  document.querySelectorAll(".info-mode").forEach(el => el.remove());
  document.querySelectorAll(".feelings-mode").forEach(el => el.remove());

  // ===== Создаем разметку секрет режима =====
  const container = document.createElement("div");
  container.classList.add("secret-mode");
  container.innerHTML = `
    <div class="secret-title">Секретный режим</div>
    <button class="secret-btn" id="secret-btn">Нажми меня!</button>
    <div class="secret-text" id="secret-text">👆👆👆</div>
    <div class="bu-text" id="bu-text">БУ! Люблю тебя</div>
    <svg class="heart-svg" viewBox="0 0 100 100">
      <path class="heart-path" id="heart-path" d="M50 30 
        C35 0, 0 20, 50 90 
        C100 20, 65 0, 50 30" />
    </svg>
  `;
  loveContainer.appendChild(container);

  const secretText = document.getElementById("secret-text");
  const secretBtnEl = document.getElementById("secret-btn");
  const buText = document.getElementById("bu-text");
  const heartPath = document.getElementById("heart-path");

  secretBtnEl.addEventListener("click", () => {
    // Взрыв текста
    secretText.classList.add("explode");

    setTimeout(() => {
      secretText.style.display = "none";
      buText.classList.add("show");

      // Через 0.8с скрываем "БУ!" и рисуем контур сердца
      setTimeout(() => {
        buText.style.display = "none";
        heartPath.style.strokeDashoffset = 0;
      }, 800);
    }, 500);
  });
});

// ===== Кнопка "Случ" =====
const luckBtnMenu = document.createElement("button");
luckBtnMenu.classList.add("mode-btn");
luckBtnMenu.textContent = "Случ 💙";
menu.appendChild(luckBtnMenu);

const herQualities = [
  "Твоя искренность","Умение слушать","Доброе сердце","Чувство юмора","Целеустремленность","Скромность",
  "Отзывчивость","Честность","Оптимизм","Чуткость","Решительность","Терпеливость","Верность","Щедрость",
  "Самокритичность","Смелость","Надежность","Тактичность","Эмпатия","Душевность","Твоя улыбка","Твой смех",
  "Твои глаза","Твой голос","Твоя походка","Твои жесты","Твоя осанка","Твой стиль","Твоя ухоженность",
  "Твоя грация","Твоя мимика","Твой взгляд","Твоя улыбка глазами","Твои волосы","Твои руки","Твой почерк",
  "Твоя манера говорить","Твоя пластика","Твоя улыбка сквозь слезы","Твой задумчивый вид","Остроумие",
  "Начитанность","Любознательность","Креативность","Аналитический ум","Память","Наблюдательность",
  "Логика","Воображение","Эрудиция","Умение учиться","Проницательность","Интуиция","Смекалка",
  "Внимательность","Умение аргументировать","Гибкость мышления","Мудрость","Обучаемость",
  "Системное мышление","Эмоциональный интеллект","Умение поддерживать","Сопереживание",
  "Умение прощать","Терпимость","Вдохновенность","Чувственность","Нежность","Страстность","Заботливость",
  "Чуткость к настроению","Умение утешить","Душевная теплота","Искренняя радость","Умение любить",
  "Эмоциональная щедрость","Умение радоваться","Душевная глубина","Эмоциональная устойчивость",
  "Умение сопереживать","Умение удивлять","Непредсказуемость","Спонтанность","Уверенность",
  "Самоирония","Умение признавать ошибки","Самодостаточность","Инициативность","Ответственность",
  "Пунктуальность","Аккуратность","Честолюбие","Трудолюбие","Упорство","Дисциплинированность",
  "Организованность","Энергичность","Активность","Жизнелюбие","Умение отдыхать"
];

luckBtnMenu.addEventListener("click", () => {
  menu.classList.remove("show");
  intro.style.display = "none";
  backBtn.classList.add("show");

  loveContainer.innerHTML = "";
  quizContainer.innerHTML = "";
  fromMeContainer.innerHTML = "";
  document.querySelectorAll(".lottery-mode").forEach(el => el.remove());
  document.querySelectorAll(".info-mode").forEach(el => el.remove());
  document.querySelectorAll(".feelings-mode").forEach(el => el.remove());

  const container = document.createElement("div");
  container.classList.add("luck-mode");
  container.innerHTML = `
    <div class="luck-title">Вот, что я люблю в тебе:</div>
    <div class="luck-text" id="luck-text"></div>
    <button class="luck-btn" id="why-btn">Почему?</button>
  `;
  loveContainer.appendChild(container);

  const luckText = document.getElementById("luck-text");
  const whyBtn = document.getElementById("why-btn");

  setTimeout(() => whyBtn.classList.add("show"), 200);

  whyBtn.addEventListener("click", () => {
    const randomQuality = herQualities[Math.floor(Math.random() * herQualities.length)];
    luckText.textContent = randomQuality;
    luckText.classList.remove("show");
    void luckText.offsetWidth; // сброс анимации
    luckText.classList.add("show");
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
  {q:"Что мне больше приглядывается по душе?", opts:["Любить","Быть любимым","Затрудняюсь"]}
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

      setTimeout(() => btn.classList.add("show"), i * 150);

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
        setTimeout(() => nextBtn.classList.add("show"), 50);
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
