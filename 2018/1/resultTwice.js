const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let inputArr = [];
let totalsArr = [0];
let total = 0;

rl.on("line", line => {
  inputArr.push(Number(line));
  modifyTotal(Number(line));
});

rl.on("close", () => {
  while (true) {
    inputArr.forEach(line => {
      modifyTotal(line);
    });
  }
});

function modifyTotal(line) {
  total += line;
  if (totalsArr.includes(total)) {
    console.log("Twice total: ", total);
    process.exit();
  }
  totalsArr.push(total);
}
