const fs = require('fs');
const iconv = require('iconv-lite');

const bufferHelper = require('./common/bufferHelper');


// 处理前端传过来的formData或者文件图片 处理formData
const connectMultiparty = require('connect-multiparty');
const multipartMiddleware = connectMultiparty();
//  同上
const multiparty = require('multiparty');
// 同上
const busboy = require('busboy');

// 使用iconv将buffer，按gbk编码转成utf-8字符串, 转成utf-8文件会变大
exports.copyGbk = function(inputFilePath, outputFilePath) {
  inputFilePath = inputFilePath || "./input/inputgbk.txt";
  outputFilePath = outputFilePath || "./output/outputgbk.txt"
  var data = '';
  var readerStream = fs.createReadStream(inputFilePath);
  var writerStream = fs.createWriteStream(outputFilePath);
  readerStream.on('data', function(chunk) {
    console.log("write data");
    data += iconv.decode(chunk, 'GBK');
  })

  readerStream.on('error', function(err) {
    console.log(err.stack);
  })

  readerStream.on('end', function() {
    console.log("start writting");
    writerStream.write(data);
    writerStream.end();
    bufferHelper.clear();
  })


  writerStream.on('finish', function() {
    console.log("wirte finish");
  })

  writerStream.on('error', function(err) {
    console.log(err.stack);
  })
}

// 普通情况下没问题，但某些情况下会存在截取问题，这种方法速度比buffer快
exports.copyUtfFast = function(inputFilePath, outputFilePath) {
  var inputFilePath = inputFilePath || "./input/inpututf.txt";
  var outputFilePath = outputFilePath || "./output/outpututf.txt"
  var data = '';
  var readerStream = fs.createReadStream(inputFilePath);
  var writerStream = fs.createWriteStream(outputFilePath);
  bufferHelper.clear();
  readerStream.on('data', function(chunk) {
    console.log("write data");
    data += chunk
  })
  readerStream.on('error', function(err) {
    console.log(err.stack);
  })
  readerStream.on('end', function() {
    console.log("start writting");
    writerStream.write(data);
    writerStream.end();
    bufferHelper.clear();
  })
  writerStream.on('finish', function() {
    console.log("wirte finish");
  })
  writerStream.on('error', function(err) {
    console.log(err.stack);
  })
}

// gbk和utf8通用使用bufferhelper
exports.easyWay2CopyFile = function(inputFilePath, outputFilePath) {
  inputFilePath = inputFilePath || "./input/input.txt";
  outputFilePath = outputFilePath || "./output/output.txt"
  console.log("inputFilePath " + inputFilePath);
  console.log("outputFilePath " + outputFilePath);
  var data = '';
  var readerStream = fs.createReadStream(inputFilePath);
  var writerStream = fs.createWriteStream(outputFilePath);
  bufferHelper.clear();
  readerStream.on('data', function(chunk) {
    bufferHelper.concat(chunk);
  })

  readerStream.on('error', function(err) {
    console.log(err.stack);
  })

  readerStream.on('end', function() {
    console.log("start writting");
    writerStream.write(bufferHelper.toString());
    writerStream.end();
    bufferHelper.clear();
  })

  writerStream.on('finish', function() {
    console.log("wirte finish");
  })

  writerStream.on('error', function(err) {
    console.log(err.stack);
  })
}

exports.usePie2CopyFile = function(inputFilePath, outputFilePath) {
  inputFilePath = inputFilePath || "./input/input.txt";
  outputFilePath = outputFilePath || "./output/output.txt"
  var data = '';
  var readerStream = fs.createReadStream(inputFilePath);
  var writerStream = fs.createWriteStream(outputFilePath);
  readerStream.pipe(writerStream);

  readerStream.on('error', function(err) {
    console.log(err.stack);
  })

  readerStream.on('end', function() {
    console.log("start writting");
  })

  writerStream.on('finish', function() {
    console.log("wirte finish");
  })

  writerStream.on('error', function(err) {
    console.log(err.stack);
  })
}

var formidable = require('formidable');

exports.parseFileByConnectMultiparty = function(req, res) {
  var message = '';
  var form = new formidable.IncomingForm(); //创建上传表单
  form.encoding = 'utf-8'; //设置编辑
  form.uploadDir = 'output/'; //设置上传目录
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
  form.parse(req, function(err, fields, files) {
    console.log("parse start");
    if (err) {
      console.log(err);
    }
    var formDataKeys = Object.keys(files);
    for (var i = 0; i < formDataKeys.length; i++) {
      var file = files[formDataKeys[i]];
      reName(file)
    }

    function reName(file) {
      var fileName = file.name;
      var nameArray = fileName.split('.');
      var type = nameArray[nameArray.length - 1];
      var name = '';
      for (var i = 0; i < nameArray.length - 1; i++) {
        name += nameArray[i];
      }
      var avatarName = name + '.' + type;
      var newPath = form.uploadDir + avatarName;
      console.log("avatarName is " + avatarName);
      fs.renameSync(file.path, newPath); //重命名
    }
  });
}

exports.parseFileByMultiparty = function(req, res) {
  var multipartyOption = {
    uploadDir: "./output"
  }
  var form = new multiparty.Form(multipartyOption);
  form.parse(req, function(err, fields, files) {
    console.log("error:" + err);
    console.log("fields");
    for (var i = 0; i < fields.length; i++) {
      console.log(fields[i]);
    }
    console.log("files")
    var filesArray = Object.keys(files);
    for (var i = 0; i < filesArray.length; i++) {
      var fileAttributes = files[filesArray[i]][0];
      var path = fileAttributes.path;
      var fileName = fileAttributes.originalFilename;
      fs.renameSync(path, form.uploadDir + "/" + fileName);
    }
    res.send("success")
  })

  form.on('error', (err) =>  {
    res.send("error:" + err);
  })
}

exports.parseFileByBusboy = function(req, res) {
  var busboyInstance = new busboy({
    headers: req.headers
  });

  busboyInstance.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    var writerStream = fs.createWriteStream("./output/" + filename);
    file.pipe(writerStream);
  });

  busboyInstance.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    console.log("fieldname " + fieldname + "\n" +
      "val " + val + "\n" +
      "fieldnameTruncated " + fieldnameTruncated + "\n" +
      "valTruncated " + valTruncated + "\n" +
      "encoding " + encoding + "\n" +
      "mimetype " + mimetype
    );
  });

  busboyInstance.on('finish', function() {
    console.log('Done parsing form!');
    res.send("success")
  });
  req.pipe(busboyInstance);
}

//
exports.uploadFileWithoutThirdPart = function(req, res) {
  var outputPath = "./output/output.txt";
  var writeStream = fs.createWriteStream(outputPath);
  req.pipe(writeStream);
  res.send("success");
}

exports.downloadWithThirdPart = function(req, res) {
  var path = 'public/upload/file.txt'; // 文件存储的路径

  // filename:设置下载时文件的文件名，可不填，则为原名称
  res.download(filepath, filename);
};

exports.downloadWidthBuffer = function(req, res) {
  var path = req.query.path;
  fileExistPromise(path).then(function() {
    var readerStream = fs.createReadStream(path);
    bufferHelper.clear();
    readerStream.on('data', function(chunk) {
      bufferHelper.concat(chunk);
    })
    readerStream.on('error', function(err) {
      console.log(err.stack);
    })
    readerStream.on('end', function() {
      var result = bufferHelper.toString();
      console.log("start writting " + result.length);
      res.send(result);
      bufferHelper.clear();
    })
  }).catch(function(err) {
    res.send(err);
  })
}

var fileExistPromise = function(path) {
  var promise = new Promise(function(resolve, reject){
    fs.stat(path, function(err, stats) {
      if (err) {
        reject(err)
      } else {
        resolve(stats)
      }
    })
  })
  return promise;
}

exports.downloadWidthStream = function(req, res) {
  var path = req.query.path;
  fileExistPromise(path).then(function(stats){
    res.header("Content-Length", stats.size.toString());
    var readerStream = fs.createReadStream(path);
    readerStream.pipe(res);
  }).catch(function(err){
    res.send(err);
  })
}

// var path = './output/Adobe Photoshop.zip';
// fs.stat('./output/Adobe Photoshop.zip', function(err, stats) {
//     if (err) {
//         console.log('读取文件信息失败')
//     }
//     console.log(stats);
//     console.log('是否为文件：', stats.isFile);
//     console.log('是否为目录：', stats.isDictionary);
//     console.log('读写权限是：', stats.mode);
//     console.log('文件大小是：', stats.size);
//     console.log('访问时间是：', stats.atime);
//     console.log('修改时间是：', stats.mtime);
//     console.log('创建时间是：', stats.ctime);
//     // res._contentLength = stats.size;
//     res.header("Content-Length", stats.size.toString());
//     var readerStream = fs.createReadStream(path);
//     readerStream.pipe(res);
// })

exports.readFile = function(filePath, option) {
  fileExistPromise(filePath).then(function(stats){
    var readerStream = fs.createReadStream(path);
  }).catch(function(err){

  })
}