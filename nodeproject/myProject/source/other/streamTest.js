const stream = require("stream");
const fs = require("fs");

let readable = stream.Readable();
let writable = stream.Writable();

let readStream = fs.createReadStream("./test4upload/FileZilla.zip");
readStream.pipe(writable);
let i = 0;
writable._write = function(chunk, enc, next) {
  console.log(++i);
  console.log(chunk.toString());
  console.log(chunk.length);
  next();
}



