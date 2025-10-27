// --- ЧИСТЫЙ И БЕЗОПАСНЫЙ СКРИПТ ДЛЯ ИГРЫ (без Telegram / без слежки) ---

const gameContainer = document.querySelector(".game-container");
const balloon = document.querySelector(".balloon");
const valueDisplay = document.querySelector(".value");
const predictButton = document.getElementById("predictButton");
const backButton = document.getElementById("backButton");
// NOTE: telegramButton and all network / privacy-invading code removed

const stars = document.querySelector(".stars");
const saturn = document.querySelector(".saturn");

let isAnimating = false;
let targetMultiplier = 1;
let saturnInterval;

function createRandomMeteor() {
  const delay = Math.random() * 15;
  const left = Math.random() * 80;
  const top = Math.random() * 40;
  setTimeout(() => {
    const m = document.createElement("div");
    m.className = "meteor";
    m.style.left = left + "%";
    m.style.top = top + "%";
    const container = document.querySelector(".space-elements");
    if (container) {
      container.appendChild(m);
      setTimeout(() => {
        m.remove();
        createRandomMeteor();
      }, 8000);
    }
  }, delay * 1000);
}

function moveSaturn() {
  if (!saturn) return;
  saturn.style.opacity = "0";
  setTimeout(() => {
    const top = 5 + Math.random() * 30;
    const right = 5 + Math.random() * 30;
    saturn.style.top = top + "%";
    saturn.style.right = right + "%";
    saturn.style.opacity = "1";
  }, 1500);
}

function startSaturnMovement() {
  if (!saturn) return;
  if (saturnInterval) {
    clearInterval(saturnInterval);
  }
  const interval = 15000 + Math.random() * 15000;
  saturnInterval = setInterval(moveSaturn, interval);
  // initial move
  moveSaturn();
}

function getRandomMultiplier() {
  return (1.2 + Math.random() * 8.8).toFixed(2);
}

function updateBalloon(multiplier) {
  valueDisplay.textContent = parseFloat(multiplier).toFixed(2) + "x";
  const minScale = 1;
  const maxScale = 1.8;
  const t = (multiplier - 1) / 9;
  const scale = minScale + (maxScale - minScale) * t;
  const liftBase = 15;
  const lift = -70 - liftBase * t;

  balloon.style.setProperty("--lift-height", lift + "%");
  balloon.style.transform = "translate(-50%, " + lift + "%)";
  balloon.style.scale = scale.toFixed(2);
  balloon.classList.add("flying");
  gameContainer.classList.add("flying");

  if (multiplier > 5) {
    balloon.classList.add("high-flying");
    gameContainer.classList.add("high-flying");
  } else {
    balloon.classList.remove("high-flying");
    gameContainer.classList.remove("high-flying");
  }

  if (multiplier > 5) {
    const glow = 0.3 + (multiplier - 5) / 10;
    saturn.style.filter = "drop-shadow(0 0 25px rgba(255, 255, 255, " + glow + "))";
  }
}

function resetBalloon() {
  return new Promise(resolve => {
    balloon.classList.remove("flying");
    balloon.classList.remove("high-flying");
    gameContainer.classList.remove("flying");
    gameContainer.classList.remove("high-flying");

    balloon.style.transition = "transform 1s ease, scale 1s ease";
    balloon.style.setProperty("--lift-height", "-70%");
    balloon.style.transform = "translate(-50%, -70%)";
    balloon.style.scale = "1";
    valueDisplay.textContent = "1.00x";
    saturn.style.filter = "drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))";

    // reset animations for space elements and stars
    document.querySelectorAll(".space-elements, .nebula, .saturn").forEach(el => {
      el.style.transform = "";
    });

    stars.style.animation = "none";
    // force reflow to restart animation
    void stars.offsetWidth;
    stars.style.animation = "stars-drift 120s infinite linear";

    document.querySelectorAll(".star").forEach(star => {
      const classes = star.className;
      star.style.animation = "none";
      star.style.transform = "";
      void star.offsetWidth;
      if (classes.includes("star-small")) {
        star.style.animation = "twinkle-small 3s infinite alternate";
      } else if (classes.includes("star-medium")) {
        star.style.animation = "twinkle-medium 4s infinite alternate";
      } else if (classes.includes("star-large")) {
        star.style.animation = "twinkle-large 5s infinite alternate";
      } else if (classes.includes("star-bright")) {
        star.style.animation = "pulse-bright 2s infinite alternate";
      } else if (classes.includes("star-colored")) {
        star.style.animation = "color-shift 8s infinite alternate";
      }
    });

    setTimeout(() => {
      balloon.style.transition = "transform 3s cubic-bezier(0.19, 1, 0.22, 1), scale 3s cubic-bezier(0.19, 1, 0.22, 1)";
      resolve();
    }, 800);
  });
}

function updateBackgroundShift(multiplier) {
  const minShift = 10;
  const maxShift = 30;
  const t = (multiplier - 1) / 9;
  const shift = minShift + (maxShift - minShift) * t;
  gameContainer.style.setProperty("--background-shift", shift + "vh");
  gameContainer.style.setProperty("--background-shift-high", shift * 1.2 + "vh");
}

function animate(from, to, durationMs) {
  const start = performance.now();
  isAnimating = true;
  predictButton.disabled = true;
  balloon.style.transition = "transform 3s cubic-bezier(0.19, 1, 0.22, 1), scale 3s cubic-bezier(0.19, 1, 0.22, 1)";
  balloon.classList.add("flying");
  gameContainer.classList.add("flying");

  function frame(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / durationMs, 1);
    const eased = easeOutQuart(progress);
    const current = from + (to - from) * eased;
    updateBackgroundShift(current);
    updateBalloon(current.toFixed(2));
    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      isAnimating = false;
      setTimeout(() => {
        predictButton.disabled = false;
      }, 500);
    }
  }
  requestAnimationFrame(frame);
}

function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
}

// Event listeners
predictButton.addEventListener("click", async () => {
  if (isAnimating) return;
  isAnimating = true;
  predictButton.disabled = true;
  backButton.classList.add("disabled");
  // telegramButton-related UI removed

  await resetBalloon();
  targetMultiplier = getRandomMultiplier();
  const baseTime = parseFloat(targetMultiplier) > 5 ? 5000 : 4000;
  animate(1, parseFloat(targetMultiplier), baseTime);

  const meteorEl = document.querySelector(".meteor");
  if (meteorEl) {
    meteorEl.style.animation = "none";
    void meteorEl.offsetWidth;
    meteorEl.style.animation = "meteor-fall 8s 1";
  }

  setTimeout(() => {
    backButton.classList.remove("disabled");
    predictButton.disabled = false;
    isAnimating = false;
  }, baseTime + 500);
});

// INITIAL STATE
updateBalloon(1);
balloon.style.setProperty("--lift-height", "-70%");
balloon.style.transform = "translate(-50%, -70%)";
balloon.style.scale = "1";
balloon.style.transition = "transform 3s cubic-bezier(0.19, 1, 0.22, 1), scale 3s cubic-bezier(0.19, 1, 0.22, 1)";

for (let i = 0; i < 3; i++) {
  createRandomMeteor();
}
startSaturnMovement();
