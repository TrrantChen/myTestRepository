const stream = require("stream");
const fs = require("fs");
const fdSlicer = require("fd-slicer");

let readable = stream.Readable();
let writable = stream.Writable();
let transform = new stream.PassThrough();


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





