const fs = require("fs");

function getFileName(doc_path) {
    let file_name_lst = [];

    if (fs.existsSync(doc_path)) {
        file_name_lst = fs.readdirSync(doc_path);
    }
    else {
        console.log('path no exist');
    }

    return file_name_lst;
};

function deleFile(file_path) {
    if (Array.isArray(file_path)) {
        for (var file of file_path) {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            }
        }
    }
    else {
        if (fs.existsSync(file_path)) {
            fs.unlinkSync(file_path);
        }
    }
};

module.exports = {
    getFileName,
    deleFile
};



