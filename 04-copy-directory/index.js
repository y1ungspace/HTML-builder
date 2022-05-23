const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, 'files');
const output = path.join(__dirname, 'files-copy');

fs.mkdir(output , {recursive: true}, err => {
    if (err) throw err;
    else {
        fs.readdir(input, (err, files) => {
            if (err) throw err;
            else {
                files.forEach(file => {
                    fs.writeFile(
                        path.join(output, file),
                        '',
                        (err) => {
                            if (err) throw err;
                        }
                    );

                    fs.copyFile(path.join(input, file), (path.join(output, file)),
                        (err) => {
                        if (err) throw err;
                        }
                    );
                    console.log(file)
                })
            }
        })
    }  
});



