const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let inputChars;

rl.on("line", line => {
  inputChars = line;
});

rl.on("close", () => {
  mainLoop();
  console.log("Reduced Length: ", inputChars.length);
});

function isPolarized(char1, char2) {
  if (char1.toUpperCase() !== char2.toUpperCase()) {
    return false;
  }
  if (char1.toUpperCase() === char1) {
    if (char2.toLowerCase() !== char2) {
        return false;
    } else return true;
  }
  else if (char1.toLowerCase() === char1) {
    if (char2.toUpperCase() !== char2) {
        return false;
    } else return true;
  }
  else return false;
}

function mainLoop() {
  mainWhile: while (true) {
    let prevChar = inputChars[0];
    for (let i = 1; i < inputChars.length; i++) {
      if (isPolarized(prevChar, inputChars[i])) {
        let unit = prevChar + inputChars[i];
        inputChars = inputChars.replace(unit, "");
        continue mainWhile;
      }
      if (i === inputChars.length - 1) {
        return;
      }
      prevChar = inputChars[i];
    }
  }
}
