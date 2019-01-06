const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lines = [];
let minutes = {};
let guards = {};

rl.on("line", line => {
  lines.push(line);
});

rl.on("close", () => {
  // Sort array by date
  let sortedLines = lines.sort((a, b) => {
    let tsA = a.substring(1, 17).split(" ");
    let tsB = b.substring(1, 17).split(" ");
    let dateA = tsA[0].split("-");
    let dateB = tsB[0].split("-");
    let timeA = tsA[1].split(":");
    let timeB = tsB[1].split(":");
    if (Number(dateA[0]) < Number(dateB[0])) {
      return -1;
    } else if (Number(dateA[0]) > Number(dateB[0])) {
      return 1;
    } else {
      if (Number(dateA[1]) < Number(dateB[1])) {
        return -1;
      } else if (Number(dateA[1]) > Number(dateB[1])) {
        return 1;
      } else {
        if (Number(dateA[2]) < Number(dateB[2])) {
          return -1;
        } else if (Number(dateA[2]) > Number(dateB[2])) {
          return 1;
        } else {
          if (Number(timeA[0]) < Number(timeB[0])) {
            return -1;
          } else if (Number(timeA[0]) > Number(timeB[0])) {
            return 1;
          } else {
            if (Number(timeA[1]) < Number(timeB[1])) {
              return -1;
            } else if (Number(timeA[1]) > Number(timeB[1])) {
              return 1;
            } else {
              return 0;
            }
          }
        }
      }
    }
  });
  // Populate minutes object with default values
  for (let i = 0; i < 60; i++) {
    minutes[i] = [];
  }
  // Parse lines and populate objects
  let currentGuard;
  let sleepStart;
  for (let i = 0; i < lines.length; i++) {
    if (isOp(lines[i], "Guard")) {
      currentGuard = guardNum(lines[i]);
      if (!guards.hasOwnProperty(currentGuard)) {
        guards[currentGuard] = 0;
        sleepStart = 0;
      }
    } else if (isOp(lines[i], "asleep")) {
      sleepStart = timeStart(lines[i]);
    } else if (isOp(lines[i], "wakes")) {
      let sleepEnd = timeStart(lines[i]);
      let sleepDuration = sleepEnd - sleepStart;
      guards[currentGuard] += sleepDuration;
      for (let j = sleepStart; j < timeStart(lines[i]); j++) {
        minutes[j].push(currentGuard);
      }
    }
  }
  // Calculate guard with max sleeping time
  let currentMax = 0;
  for (guard in guards) {
    if (guards[guard] > currentMax) {
      currentMax = guards[guard];
      currentGuard = guard;
    }
  }
  // Calculate most common minute for guard
  currentMax = 0;
  let maxMinute;
  for (minute in minutes) {
    let guardCount = 0;
    minutes[minute].forEach(guard => {
      if (Number(guard) == currentGuard) {
        guardCount++;
      }
    });
    if (guardCount > currentMax) {
      currentMax = guardCount;
      maxMinute = Number(minute);
    }
  }
  console.log("guard", currentGuard);
  console.log("maxminute", maxMinute);
  console.log("Guard x Minute:", currentGuard * maxMinute);
});

function isOp(line, str) {
  if (line.includes(str)) {
    return true;
  }
  return false;
}

function timeStart(line) {
  return Number(line.substring(15, 17));
}

function guardNum(line) {
  return Number(line.split(" ")[3].substring(1));
}
