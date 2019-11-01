const FileOperation = require('./fileOperation.js');
const path = require('path');

function emptyHtdocs(output_path) {
    let file_lst = FileOperation.getFileName(output_path);

    file_lst = file_lst.filter((file_name) => {
        return /\.js$/.test(file_name);
    }).map((file_name) => {
        return output_path + '\\' + file_name;
    });

    FileOperation.deleFile(file_lst);
}

function resolve (dir) {
    return path.join(__dirname,  dir)
}

module.exports = {
    emptyHtdocs,
    resolve,
};
