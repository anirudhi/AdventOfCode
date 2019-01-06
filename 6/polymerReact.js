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

function isInfinite(coord) {
  
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
