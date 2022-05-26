const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, 'files');
const output = path.join(__dirname, 'files-copy');


fs.readdir(output, (err, files) => {
    if (err) return
    else {
        files.forEach(file => {
            fs.unlink(path.join(output, file), err => {
                if (err) throw err;
            });
        });
    };
});

fs.mkdir(output , { recursive: true }, err => {
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
                })
            }
        })
    }  
});



