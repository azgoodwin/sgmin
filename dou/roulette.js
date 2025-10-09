"";
const items = [{
  name: "RED",
  image: "images/red.png"
}, {
  name: "BLACK",
  image: "images/black.png"
}, {
  name: "STAR",
  image: "images/star.png"
}];
const rouletteItems = document.getElementById("rouletteItems");
const spinButton = document.getElementById("spinButton");
const resultElement = document.getElementById("result");
const arrowTop = document.getElementById("arrowTop");
const arrowBottom = document.getElementById("arrowBottom");
const resultFrame = document.getElementById("resultFrame");
const glowEffect = document.getElementById("glowEffect");
const particlesContainer = document.getElementById("particles");
const analysisOverlay = document.getElementById("analysisOverlay");
let isSpinning = false;
let isResetting = false;
function initBackgroundCells() {
  const _0x2287f5 = window.innerWidth < 768 ? 15 : 25;
  const _0xbc5217 = document.getElementById("particles");
  _0xbc5217.innerHTML = "";
  for (let _0x3739e4 = 0; _0x3739e4 < _0x2287f5; _0x3739e4++) {
    createBackgroundCell();
  }
}
function createBackgroundCell() {
  const _0x33345d = document.getElementById("particles");
  const _0x5a51bc = document.createElement("div");
  _0x5a51bc.classList.add("background-cell");
  const _0x497ec2 = ["red", "black", "star"];
  const _0x15be61 = _0x497ec2[Math.floor(Math.random() * _0x497ec2.length)];
  _0x5a51bc.classList.add(_0x15be61);
  const _0x462a3a = Math.random() * 60 + 40;
  _0x5a51bc.style.width = _0x462a3a + "px";
  _0x5a51bc.style.height = _0x462a3a + "px";
  const _0x3332cd = Math.random() * window.innerWidth;
  const _0x21f44f = Math.random() * window.innerHeight;
  _0x5a51bc.style.left = _0x3332cd + "px";
  _0x5a51bc.style.top = _0x21f44f + "px";
  const _0x158143 = Math.random() * 0.15 + 0.05;
  _0x5a51bc.style.opacity = _0x158143;
  const _0x1f29fb = Math.random() * 200 - 100;
  const _0x258321 = Math.random() * 200 - 100;
  const _0x3f334e = Math.random() * 200 - 100;
  const _0xb7f07b = Math.random() * 200 - 100;
  const _0x193839 = Math.random() * 200 - 100;
  const _0x1c6eb0 = Math.random() * 200 - 100;
  const _0x3a81e8 = Math.random() * 180;
  _0x5a51bc.style.setProperty("--move-x", _0x1f29fb + "px");
  _0x5a51bc.style.setProperty("--move-y", _0x258321 + "px");
  _0x5a51bc.style.setProperty("--move-x2", _0x3f334e + "px");
  _0x5a51bc.style.setProperty("--move-y2", _0xb7f07b + "px");
  _0x5a51bc.style.setProperty("--move-x3", _0x193839 + "px");
  _0x5a51bc.style.setProperty("--move-y3", _0x1c6eb0 + "px");
  _0x5a51bc.style.setProperty("--rotate-deg", _0x3a81e8 + "deg");
  const _0x2ceb95 = Math.random() * 60 + 30;
  _0x5a51bc.style.setProperty("--duration", _0x2ceb95 + "s");
  _0x5a51bc.style.animation = "floatAnimation " + _0x2ceb95 + "s linear infinite";
  if (Math.random() < 0.3) {
    _0x5a51bc.classList.add("glow");
  }
  _0x33345d.appendChild(_0x5a51bc);
}
function getItemWidth() {
  if (window.innerWidth <= 480) {
    return 80;
  } else if (window.innerWidth <= 700) {
    return 90;
  } else {
    return 120;
  }
}
function createRouletteItems() {
  const _0xd869e5 = items.length * 15;
  let _0x1b9552 = "";
  const _0x46d84b = Math.ceil(items.length * 1.5);
  for (let _0x1344c3 = 0; _0x1344c3 < _0xd869e5 + _0x46d84b; _0x1344c3++) {
    const _0xea2c85 = items[_0x1344c3 % items.length];
    _0x1b9552 += "<div class=\"roulette-item\" data-name=\"" + _0xea2c85.name + "\">\n            <img src=\"" + _0xea2c85.image + "\" alt=\"" + _0xea2c85.name + "\">\n        </div>";
  }
  rouletteItems.innerHTML = _0x1b9552;
  const _0x6064c = document.querySelectorAll(".roulette-item");
  _0x6064c.forEach(_0x299b06 => {
    _0x299b06.addEventListener("mouseenter", () => {
      if (!isSpinning) {
        _0x299b06.classList.add("highlight");
      }
    });
    _0x299b06.addEventListener("mouseleave", () => {
      _0x299b06.classList.remove("highlight");
    });
  });
  centerRoulettePosition();
}
function centerRoulettePosition() {
  const _0x3569ae = getItemWidth();
  const _0x70133d = document.querySelector(".roulette-container").offsetWidth;
  const _0x32e174 = Math.floor(_0x70133d / _0x3569ae);
  const _0x209f5e = Math.ceil(items.length * 1.5);
  const _0x30e26a = -_0x3569ae * _0x209f5e + (_0x70133d - _0x3569ae) / 2;
  rouletteItems.style.transition = "none";
  rouletteItems.style.transform = "translateX(" + _0x30e26a + "px)";
  rouletteItems.offsetWidth;
  rouletteItems.style.transition = "transform 5s cubic-bezier(0.34, 1.56, 0.64, 1)";
}
function getElementUnderArrow() {
  const _0x51acb4 = document.querySelector(".roulette-container").getBoundingClientRect();
  const _0x5813d4 = _0x51acb4.left + _0x51acb4.width / 2;
  const _0x108625 = document.querySelectorAll(".roulette-item");
  for (let _0x4063ee of _0x108625) {
    const _0x3455d3 = _0x4063ee.getBoundingClientRect();
    if (_0x5813d4 >= _0x3455d3.left && _0x5813d4 <= _0x3455d3.right) {
      return _0x4063ee;
    }
  }
  return null;
}
function spin() {
  if (isSpinning) {
    return;
  }
  isSpinning = true;
  spinButton.disabled = true;
  spinButton.classList.add("spinning");
  if (resultElement.textContent) {
    resultElement.classList.remove("active");
    setTimeout(() => {
      resultElement.textContent = "";
    }, 300);
  }
  analysisOverlay.classList.add("active");
  resultFrame.classList.remove("active");
  setTimeout(() => {
    analysisOverlay.classList.remove("active");
    glowEffect.classList.add("active");
    centerRoulettePosition();
    arrowTop.classList.add("spinning");
    arrowBottom.classList.add("spinning");
    const _0x40cc11 = Math.floor(Math.random() * items.length);
    const _0x4b7105 = items[_0x40cc11].name;
    const _0x519279 = getItemWidth();
    const _0xe88e90 = document.querySelector(".roulette-container").offsetWidth;
    const _0xed16da = Math.ceil(items.length * 1.5);
    const _0x30d821 = -_0x519279 * _0xed16da + (_0xe88e90 - _0x519279) / 2;
    const _0x149450 = 10;
    const _0x526648 = _0x30d821 - _0x519279 * (items.length * _0x149450 + _0x40cc11);
    playSpinSound();
    setTimeout(() => {
      rouletteItems.style.transform = "translateX(" + _0x526648 + "px)";
    }, 100);
    const _0x64773b = function () {
      const _0x12afbc = getElementUnderArrow();
      const _0xe97710 = _0x12afbc ? _0x12afbc.dataset.name : _0x4b7105;
      if (_0x12afbc) {
        const _0x21acce = document.querySelector(".roulette-container").getBoundingClientRect();
        const _0x5dbbe0 = _0x21acce.left + _0x21acce.width / 2;
        const _0x43a322 = _0x12afbc.getBoundingClientRect();
        const _0x19d584 = _0x43a322.left + _0x43a322.width / 2;
        if (Math.abs(_0x5dbbe0 - _0x19d584) > 2) {
          const _0x2b8442 = getComputedStyle(rouletteItems).transform;
          const _0x961fbe = new DOMMatrix(_0x2b8442);
          const _0x3f4126 = _0x961fbe.m41;
          const _0x4db8de = _0x5dbbe0 - _0x19d584;
          rouletteItems.style.transition = "transform 0.5s ease-out";
          rouletteItems.style.transform = "translateX(" + (_0x3f4126 + _0x4db8de) + "px)";
          setTimeout(_0x4f0853, 600);
          return;
        }
      }
      _0x4f0853();
      function _0x4f0853() {
        const _0x12ec57 = getElementUnderArrow();
        const _0xfe2c75 = _0x12ec57 ? _0x12ec57.dataset.name : _0x4b7105;
        if (_0x12ec57) {
          _0x12ec57.classList.add("selected-item");
        }
        playResultSound(_0xfe2c75);
        resultElement.innerHTML = "Bet on: <span>" + _0xfe2c75 + "</span>";
        setTimeout(() => {
          resultElement.classList.add("active");
        }, 200);
        arrowTop.classList.remove("spinning");
        arrowBottom.classList.remove("spinning");
        setTimeout(() => {
          glowEffect.classList.remove("active");
        }, 3000);
        setTimeout(() => {
          isSpinning = false;
          spinButton.disabled = false;
          spinButton.classList.remove("spinning");
          if (_0x12ec57) {
            setTimeout(() => {
              _0x12ec57.classList.remove("selected-item");
            }, 3000);
          }
        }, 1000);
      }
      rouletteItems.removeEventListener("transitionend", _0x64773b);
    };
    rouletteItems.addEventListener("transitionend", _0x64773b);
  }, 2000);
}
function playSpinSound() {}
function playResultSound(_0x509d21) {}
document.addEventListener("DOMContentLoaded", () => {
  createRouletteItems();
  initBackgroundCells();
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 300);
});
window.addEventListener("resize", () => {
  if (!isSpinning && !isResetting) {
    if (window.resizeTimer) {
      clearTimeout(window.resizeTimer);
    }
    window.resizeTimer = setTimeout(() => {
      centerRoulettePosition();
      initBackgroundCells();
    }, 250);
  }
});