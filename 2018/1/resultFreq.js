const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let total = 0;

rl.on('line', (line) => {
    total += Number(line);
    console.log(total);
});

