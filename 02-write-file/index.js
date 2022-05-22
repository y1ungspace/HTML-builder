const fs = require('fs');
const path = require('path');
const process = require('process');


fs.writeFile(
    path.join(__dirname, 'text.txt'),
    '',
    (err) => {
        if (err) throw err;
        console.log("Hi! plese, enter your message:")
    }
);

const output = fs.createWriteStream('02-write-file/text.txt');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.on('line', (data) =>  {
    if (data === 'exit') {
        console.log("Program is closed. Bye!");
        process.exit()
        return }
    output.write(`${data}\n`);
    })

process.on('beforeExit', () => {
    console.log("Program is closed. Bye!");
});

