class App {
  constructor() {
    this.themes = {
      theme1: {
        "--main-back": "hsl(222, 26%, 31%)",
        "--key-back-main": "hsl(223, 31%, 20%)",
        "--screen-back": "hsl(224, 36%, 15%)",
        "--key1-back": "hsl(225, 21%, 49%)",
        "--key1-shadow": "hsl(224, 28%, 35%)",
        "--key2-back": "hsl(6, 63%, 50%)",
        "--key2-shadow": "hsl(6, 70%, 34%)",
        "--key3-back": "hsl(30, 25%, 89%)",
        "--key3-shadow": "hsl(28, 16%, 65%)",
        "--text-dark": "hsl(221, 14%, 31%)",
        "--text-light": "hsl(224, 36%, 15%)",
        "--text-light-screen": "hsl(0, 0%, 99%)"
      },
      theme2: {
        "--main-back": "hsl(0, 0%, 90%)",
        "--key-back-main": "hsl(0, 5%, 81%)",
        "--screen-back": "hsl(0, 0%, 93%)",
        "--key1-back": "hsl(185, 42%, 37%)",
        "--key1-shadow": "hsl(185, 58%, 25%)",
        "--key2-back": "hsl(25, 98%, 40%)",
        "--key2-shadow": "hsl(25, 99%, 27%)",
        "--key3-back": "hsl(45, 7%, 89%)",
        "--key3-shadow": "hsl(35, 11%, 61%)",
        "--text-dark": "hsl(60, 10%, 19%)",
        "--text-light": "hsl(0, 0, 100%)",
        "--text-light-screen": "hsl(0, 0, 100%)"
      },
      theme3: {
        "--main-back": "hsl(268, 75%, 9%)",
        "--key-back-main": "hsl(268, 71%, 12%)",
        "--screen-back": "hsl(268, 71%, 12%)",
        "--key1-back": "hsl(281, 89%, 26%)",
        "--key1-shadow": "hsl(285, 91%, 52%)",
        "--key2-back": "hsl(176, 100%, 44%)",
        "--key2-shadow": "hsl(177, 92%, 70%)",
        "--key3-back": "hsl(268, 47%, 21%)",
        "--key3-shadow": "hsl(290, 70%, 36%)",
        "--text-dark": "hsl(198, 20%, 13%)",
        "--text-light": "hsl(52, 100%, 62%)",
        "--text-light-screen": "hsl(52, 100%, 62%)"
      }
    };
    this.calculation = [];
    this.input = "";
    this.result = "";
    this.isCalulated = false;
    this.action = false;
    this.calculatorInput = document.querySelector(".calculator-input");
    this.colorTheme = document.querySelectorAll(".color-theme");
    this.themeBtnContainer = document.querySelector(".theme-btn-container");
    this.themeLabel = document.querySelectorAll(".theme-label");
    this.addEventListener();
  }

  addEventListener() {
    window.addEventListener("click", (event) => {
      if (event.target.classList.contains("theme-color-btn")) {
        this.changeTheme(event);
        return;
      }
      if (!event.target.dataset.id) return;
      let char = event.target.dataset.id;

      this.checkCalulated(event);
      if (char === "del") {
        this.deleteChar();
        return;
      }
      if (char === "reset") {
        this.clearCalculator();
        return;
      }
      if (char === "=") {
        this.equalAction();
        return;
      }
      if (event.target.classList.contains("calculator-action")) {
        if (this.action) {
          return;
        }
        this.action = true;
        this.calculatorInput.innerText += char;
        this.input += char.toString();
        return;
      }
      this.calculatorInput.innerText += char;
      this.action = false;
      this.input += char.toString();
    });
  }

  checkCalulated(event) {
    if (
      this.isCalulated &&
      event.target.classList.contains("calculator-number")
    ) {
      this.input = "";
      this.calculatorInput.innerText = this.input;
      this.isCalulated = false;
    } else if (this.isCalulated) {
      this.calculatorInput.innerText = this.input;
      this.isCalulated = false;
    }
  }

  deleteChar() {
    this.input = this.input.toString().slice(0, -1);
    this.calculatorInput.innerText = this.input;
    if (this.action) {
      this.action = false;
    }
  }

  equalAction() {
    this.input = this.input.toString();
    if (
      this.input.endsWith("/") ||
      this.input.endsWith("*") ||
      this.input.endsWith("+") ||
      this.input.endsWith("-")
    ) {
      this.input = this.input.slice(0, -1);
      this.calculatorInput.innerText = this.input;
    }
    if (
      this.input.startsWith("/") ||
      this.input.startsWith("*") ||
      this.input.startsWith("+") ||
      this.input.startsWith("-")
    ) {
      this.input = this.input.substring(1);
      this.calculatorInput.innerText = this.input;
    }
    if (!this.input) return;
    this.result = this.equal(this.input);
    this.calculatorInput.innerText += "=" + this.result;
    this.isCalulated = true;
    this.input = this.result;
  }

  equal(num) {
    return Function("return (" + num + ")")();
  }

  clearCalculator() {
    this.input = "";
    this.calculatorInput.innerText = "";
  }

  changeTheme(event) {
    const themeName = event.target.id;
    const theme = this.themes[themeName];
    for (var variable in theme) {
      document.documentElement.style.setProperty(variable, theme[variable]);
    }
    for (let i = 0; i < this.themeLabel.length; i++) {
      const childElement = this.themeLabel[i].childNodes[1];
      if (childElement.id === themeName) {
        this.themeLabel[i].classList.add("checked");
      } else if (this.themeLabel[i].classList.contains("checked")) {
        this.themeLabel[i].classList.remove("checked");
      }
    }
  }
}

new App();
