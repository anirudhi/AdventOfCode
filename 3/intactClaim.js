const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lineArr = [];
let seenObj = {};
let overlapObj = {};

rl.on("line", line => {
  lineArr.push(line);
  let claimSplit = line.split(" ");
  let coord = claimSplit[2].slice(0, -1).split(",");
  let area = claimSplit[3].split("x");
  for (
    let y = Number(coord[1]) + 1;
    y <= Number(coord[1]) + Number(area[1]);
    y++
  ) {
    for (
      let x = Number(coord[0]) + 1;
      x <= Number(coord[0]) + Number(area[0]);
      x++
    ) {
      let pos = x + "," + y;
      if (seenObj.hasOwnProperty(pos)) {
        if (!overlapObj.hasOwnProperty(pos)) {
          overlapObj[pos] = 1;
        }
      } else {
        seenObj[pos] = 1;
      }
    }
  }
});

rl.on("close", () => {
  lineArr.forEach(line => {
    let claimSplit = line.split(" ");
    let id = claimSplit[0];
    let coord = claimSplit[2].slice(0, -1).split(",");
    let area = claimSplit[3].split("x");
    let numIter = Number(area[0]) * Number(area[1]);
    let count = 0;
    for (
      let y = Number(coord[1]) + 1;
      y <= Number(coord[1]) + Number(area[1]);
      y++
    ) {
      for (
        let x = Number(coord[0]) + 1;
        x <= Number(coord[0]) + Number(area[0]);
        x++
      ) {
        let pos = x + "," + y;
        if (overlapObj.hasOwnProperty(pos)) {
            return;
        } 
        count++;
        if (count === numIter) {
          console.log("Intact Claim ID: ", id);
          process.exit();
        }
      }
    }
  });
});
