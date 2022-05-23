const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist') , {recursive: true}, err => {
    if (err) throw err;
});

const templatePath = path.join(__dirname, 'project-dist/index.html')
const template = fs.createWriteStream(templatePath)
const styles = fs.createWriteStream(path.join(__dirname, 'project-dist/style.css'))
const components = path.join(__dirname, 'components')


fs.copyFile(path.join(__dirname, 'template.html'), templatePath ,
    (err) => {
        if (err) throw err;
    });

fs.readFile(path.join(__dirname, 'template.html') , 'utf8', (err, templateData) => {
    let i = 0;
    if (err) throw err;
    else {
        fs.readdir(components, (err, files) => {
            if (err) throw err;
            files.forEach(file => {
                fs.readFile(path.join(components, file) , 'utf8', (err, data) => {
                    if (err) throw err;
                    templateData = templateData.replace(`{{${file.split('.')[0]}}}`, data);
                    i++;
                    if (i > 2)  {
                        template.write(templateData)
                    }
                });
            })
        });
    }
});



//css binder

const input = path.join(__dirname, 'styles');
const output = fs.createWriteStream(path.join(__dirname, 'project-dist/style.css'));


 fs.readdir(input, (err, files) => {
    if (err) throw err;
    else {
        files.forEach(file => {
            if (path.extname(file) !== '.css') return
            let currentFile = fs.createReadStream(path.join(input, file), 'utf-8')
            currentFile.on('data', chunk => output.write(chunk));
        });
    } ;  
});



//assets (sorry for this chaos below)

const inputAssets = path.join(__dirname, 'assets');
const outputAssets = path.join(__dirname, 'project-dist/assets');

fs.mkdir(outputAssets , {recursive: true}, err => {
    if (err) throw err;
    else {
        fs.readdir(inputAssets, (err, folders) => {
            if (err) throw err;
            else {
                folders.forEach(folder => {
                    fs.mkdir(path.join(outputAssets, folder) , {recursive: true}, err => {
                        if (err) throw err;
                        else {
                            fs.readdir(path.join(inputAssets, folder), (err, files) => {
                                if (err) throw err;
                                else {
                                    files.forEach(file => {
                                        fs.copyFile(path.join(inputAssets, `${folder}/${file}`), (path.join(outputAssets, `${folder}/${file}`)),
                                            (err) => {
                                                if (err) throw err;
                                            }
                                        );
                                    })
                                }
                            })
                        }  
                    });
                   
                })
            }
        })
    }  
});