const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let twoChar = 0;
let threeChar = 0;

rl.on("line", line => {
  if (isNumChar(line, 2)) twoChar++;
  if (isNumChar(line, 3)) threeChar++;
});

rl.on("close", () => {
  console.log("Checksum: ", twoChar * threeChar);
});

function isNumChar(line, num) {
  let chars = line.split("");
  let charCount = {};
  chars.forEach(char => {
    if (charCount.hasOwnProperty(char)) {
      charCount[char] += 1;
    } else {
      charCount[char] = 1;
    }
  });
  for (let char in charCount) {
    if (charCount[char] === num) return true;
  }
  return false;
}
