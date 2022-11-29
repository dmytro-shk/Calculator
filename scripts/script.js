const lightTheme = "styles/light.css";
const darkTheme = "styles/dark.css";
const sunIcon = "assets/SunIcon.svg";
const moonIcon = "assets/MoonIcon.svg";
const clickShort = "assets/audio/clickShort.mp3";
const clickLong = "assets/audio/clickLong.mp3";
const errorShort = "assets/audio/errorShort.mp3";
const themeIcon = document.getElementById("theme-icon");
const res = document.getElementById("result");
const toast = document.getElementById("toast");
const operators = ["+", "-", "*", "/"];
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let firstPlay = false;

function calculate(value) {
  console.log("1 > " + value);
  value = autocompleteBrackets(value);
  console.log("2 > " + value);
  const calculatedValue = eval(value || null);
  if (isNaN(calculatedValue)) {
    res.value = "Can't divide 0 with 0";
    setTimeout(() => {
      res.value = "";
    }, 1300);
  } else {
    res.value = calculatedValue;
  }
}

// Swaps the stylesheet to achieve dark mode.
function changeTheme() {
  const theme = document.getElementById("theme");
  setTimeout(() => {
    toast.innerHTML = "Calculator";
  }, 1500);
  if (theme.getAttribute("href") === lightTheme) {
    playSFX(clickLong);
    theme.setAttribute("href", darkTheme);
    themeIcon.setAttribute("src", sunIcon);
    toast.innerHTML = "Dark Mode 🌙";
  } else {
    playSFX(clickLong);
    theme.setAttribute("href", lightTheme);
    themeIcon.setAttribute("src", moonIcon);
    toast.innerHTML = "Light Mode ☀️";
  }
}

// Displays entered value on screen.
function liveScreen(enteredValue) {
  if (!res.value) {
    res.value = "";
  }

  if (operators.includes(enteredValue)) {
    addOperator(enteredValue);
  } else {
    res.value += enteredValue;
  }
}

function removeLastChar() {
  const resultInput = res.value;
  if (resultInput != "") {
    res.value = resultInput.substring(0, res.value.length - 1);
  } else {
    playSFX(errorShort);
  }
}

function toNegative() {
  if (res.value.length != 0) {
    let lastChar = res.value.at(-1);
    removeLastChar();
    addBrackets();
    res.value += "-" + lastChar;
  } else {
    return;
  }
}

function celarInput() {
  result.value = "";
}

function addOperator(operator) {
  const lastChar = res.value.at(-1);
  if (
    operators.includes(lastChar) ||
    lastChar === undefined ||
    lastChar === "("
  ) {
    playSFX(errorShort);
  } else {
    res.value += operator;
  }
}

function addBrackets() {
  const lastChar = res.value.at(-1);
  const bracketOpen = res.value.count("[(]");
  const bracketClose = res.value.count("[)]");
  if (lastChar === "(" || lastChar === undefined) {
    res.value += "(";
    console.log("a");
  } else if (lastChar === ")") {
    if (bracketOpen < bracketClose) {
      res.value += ")";
      console.log("b");
    } else if (bracketOpen > bracketClose) {
      res.value += ")";
      console.log("c");
    } else {
      res.value += "*(";
      console.log("d");
    }
  } else if (digits.includes(lastChar) && bracketOpen === bracketClose) {
    res.value += "*(";
    console.log("e");
  } else if (operators.includes(lastChar)) {
    res.value += "(";
    console.log("f");
  } else {
    res.value += ")";
    console.log("g");
  }
}

function autocompleteBrackets(value) {
  const bracketOpen = value.count("[(]");
  const bracketClose = value.count("[)]");
  const diff = bracketOpen - bracketClose;
  console.log("diff" + diff);
  if (diff === 0) {
    console.log("brackets are ok!");
  } else {
    for (var i = 0; i < diff; i++) {
      value += ")";
      console.log(res.value);
    }
  }
  return value;
}

//adding event handler on the document to handle keyboard inputs
document.addEventListener("keydown", keyboardInputHandler);

//function to handle keyboard inputs
function keyboardInputHandler(e) {
  playSFX(clickShort);

  // to fix the default behavior of browser,
  // enter and backspace were causing undesired behavior when some key was already in focus.
  e.preventDefault();
  //grabbing the liveScreen

  //numbers
  if (e.key === "0") {
    res.value += "0";
  } else if (e.key === "1") {
    res.value += "1";
  } else if (e.key === "2") {
    res.value += "2";
  } else if (e.key === "3") {
    res.value += "3";
  } else if (e.key === "4") {
    res.value += "4";
  } else if (e.key === "5") {
    res.value += "5";
  } else if (e.key === "6") {
    res.value += "6";
  } else if (e.key === "7") {
    res.value += "7";
  } else if (e.key === "7") {
    res.value += "7";
  } else if (e.key === "8") {
    res.value += "8";
  } else if (e.key === "9") {
    res.value += "9";
  }

  //unwantedChars
  if (e.key === "+") {
    addOperator("+");
  } else if (e.key === "-") {
    addOperator("-");
  } else if (e.key === "*") {
    addOperator("*");
  } else if (e.key === "/") {
    console.log("xxx");
    addOperator("/");
  }

  //brackets
  if (e.key === "(") {
    addBrackets();
  } else if (e.key === ")") {
    // res.value += ")";
    addBrackets();
  }

  //percentage key
  if (e.key === "%") {
    res.value += "%";
    console.log(res.value);
  }

  //clear key
  if (e.key === "c") {
    celarInput();
  }

  //decimal key
  if (e.key === ".") {
    res.value += ".";
  }

  //press enter to see result
  if (e.key === "Enter" || e.key === "=") {
    calculate(result.value);
  }

  //backspace for removing the last input
  if (e.key === "Backspace") {
    removeLastChar();
  }
}
