const fs = require('fs');
const readableStream = fs.createReadStream('01-read-file/text.txt', 'utf-8');
readableStream.on('data', chunk => console.log(chunk));