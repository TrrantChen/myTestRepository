const stream = require("stream");
const fs = require("fs");
const fdSlicer = require("fd-slicer");
const util = require('../common/util');

let readable = stream.Readable();
let writable = stream.Writable();
let transform = new stream.PassThrough();
let transform2 = stream.Transform();

function writeStreamTest2() {
  let readStream = fs.createReadStream("./test4upload/test.txt");
  readStream.pipe(writable);
  let i = 0;
  writable._write = function(chunk, enc, next) {
    if (writable.first === void 0) {
      writable.first = true;
      fs.open('./output/test.txt', 'wx', function(err, fd) {
        if (err) return null;
        var slicer = fdSlicer.createFromFd(fd, {autoClose: true});
        let ws = slicer.createWriteStream({end:Infinity});
        transform.pipe(ws);
      });
    }

    let length = chunk.length;
    console.log(length)
    for (var i = 0; i < length - 2; i++) {
      chunk[i]++;
    }

    transform.write(chunk);

    next();
  }
}

function simpleTest() {
  let readStream = fs.createReadStream("./nodeproject/myProject/output/test.txt");
  let writeStream = fs.createWriteStream("./nodeproject/myProject/output/out.txt")

  transform2._transform = function(chunk, encoding, callback) {
    let length = chunk.length;

    for (var i = 0; i < length; i++) {
      chunk[i] += 1;
    }
    this.push(chunk);
    callback();
  }
  readStream.pipe(transform2).pipe(writeStream);
}

function writeStreamTest() {
  let readStream = fs.createReadStream("./nodeproject/myProject/output/test.txt");
  readStream.pipe(writable);
  writable._write = function(chunk, enc, next) {
    let length = chunk.length;

    for (var i = 0; i < length; i++) {
      chunk[i] += 1;
    }

    console.log(chunk.toString('utf8'));
    next();
  }
}

function writeTest() {
  fs.open("./output/testWrite.txt", 'a', (err, fd) => {
    fs.write(fd, "test aaaa\r\n", function() {
      console.log(arguments);
    });
  })
}

writeTest();



