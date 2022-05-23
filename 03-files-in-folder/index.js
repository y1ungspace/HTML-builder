const fs = require('fs');
const PATH = require('path');


const folderPath = PATH.join(__dirname, 'secret-folder');

function showPath (path) {
    fs.readdir(path, {withFileTypes: true}, (err, files) => {
        if (err) throw err;
        else {
          files.forEach(file => {
            fs.stat(PATH.join(folderPath, file.name), (err, stats) => {
                if (err) throw err
                else {
                    if (stats.isFile()) {
                        console.log(`${file.name.split('.')[0]} - ${PATH.extname(file.name).slice(1)} - ${stats.size} Bytes`)
                    }
                }
                })
          })
        }
    })
}

showPath(folderPath);
