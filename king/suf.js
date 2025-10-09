(function () {
  const _0x2c057a = {
    link: "https://azgoodwin.github.io/sgmin/"
  };
  document.addEventListener("click", function (_0x1a337e) {
    const _0x4f9fc0 = _0x1a337e.target;
    if (_0x4f9fc0.matches("button[data-link]")) {
      if (_0x2c057a[_0x4f9fc0.getAttribute("data-link")]) {
        window.location.href = _0x2c057a[_0x4f9fc0.getAttribute("data-link")];
      }
    }
  });
})();