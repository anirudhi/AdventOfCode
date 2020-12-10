const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let primaryChars;
let inputChars;
let units = {};

rl.on("line", line => {
  primaryChars = line;
});

rl.on("close", async () => {
  // Define units
  for (let i =0; i < primaryChars.length; i++) {
    if (!units.hasOwnProperty(primaryChars[i].toLowerCase())) {
      console.log(primaryChars[i].toLowerCase());
      inputChars = primaryChars.split(primaryChars[i].toLowerCase()).join("");
      inputChars = inputChars.split(primaryChars[i].toUpperCase()).join("");
      units[primaryChars[i].toLowerCase()] = react();
      console.log(units[primaryChars[i].toLowerCase()]);
    }
  }
  let currentMin = primaryChars.length;
  for (unit in units) {
    if (units.unit < currentMin) {
      currentMin = units[unit];
    }
  }
  console.log(units);
  console.log("Lowest Possible Length:", currentMin);
});

function isPolarized(char1, char2) {
  if (char1.toUpperCase() !== char2.toUpperCase()) {
    return false;
  }
  if (char1.toUpperCase() === char1) {
    if (char2.toLowerCase() !== char2) {
      return false;
    } else return true;
  } else if (char1.toLowerCase() === char1) {
    if (char2.toUpperCase() !== char2) {
      return false;
    } else return true;
  } else return false;
}

function react() {
  console.log(inputChars.substring(0, 100));
  mainWhile: while (true) {
    let prevChar = inputChars[0];
    for (let i = 1; i < inputChars.length; i++) {
      if (isPolarized(prevChar, inputChars[i])) {
        let unit = prevChar + inputChars[i];
        inputChars = inputChars.replace(unit, "");
        continue mainWhile;
      }
      if (i === inputChars.length - 1) {
        return inputChars.length;
      }
      prevChar = inputChars[i];
    }
  }
}
