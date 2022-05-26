const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, 'styles');
const output = fs.createWriteStream(path.join(__dirname, 'project-dist/bundle.css'));


 fs.readdir(input, (err, files) => {
    if (err) throw err;
    else {
        files.forEach(file => {
            if (path.extname(file) !== '.css') return
            let currentFile = fs.createReadStream(path.join(input, file), 'utf-8')
            currentFile.on('data', chunk => output.write(chunk));
        })
    }   
})

console.log('Successfully merged all css files ^^')


