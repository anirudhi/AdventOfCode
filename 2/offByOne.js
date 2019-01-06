const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lines = [];
let commonLetters = "";

rl.on("line", line => {
  lines.push(line);
});

rl.on("close", () => {
  lines.forEach((line, index) => {
    for (let i = index + 1; i < lines.length; i++) {
      if (offByOne(line, lines[i])) {
        console.log("Common Letters: ", commonLetters);
        return;
      }
    }
  });
});

function offByOne(line1, line2) {
  let numDiff = 0;
  let common = "";
  let chars1 = line1.split("");
  let chars2 = line2.split("");
  chars1.forEach((char, index) => {
    if (char !== chars2[index]) {
      numDiff++;
    } else {
      common += char;
    }
  });
  if (numDiff === 1) {
    commonLetters = common;
    return true;
  }
  return false;
}
