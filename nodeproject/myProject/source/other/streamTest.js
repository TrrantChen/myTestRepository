const stream = require("stream");
const fs = require("fs");
const fdSlicer = require("fd-slicer");
const util = require('../common/util');

function writeStreamTest2() {
  let transform = new stream.PassThrough();
  let writable = stream.Writable();
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
  function simpleReadAble() {
    let Readable = stream.Readable;
    let readable = new Readable();

    readable._read = function() {
      readable.push("test");
      readable.push(null);
    };

    readable.on("readable", () => {
      let data = readable.read();
      console.log("readable:" + data);
    })
  }

  function simpleTransform() {
    let readStream = fs.createReadStream("./nodeproject/myProject/output/test.txt");
    let writeStream = fs.createWriteStream("./nodeproject/myProject/output/out.txt");
    let transform2 = stream.Transform();

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

  simpleReadAble();
}

function writeStreamTest() {
  let writable = stream.Writable();
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

function writeAtTheSameTime() {
  fs.open("./output/testWrite.txt", 'a', (err, fd) => {
    console.log("this is first open");
    fs.write(fd, "test aaaa\r\n", function() {
      console.log("this is first wirte")
    });
  })

  fs.open("./output/testWrite.txt", 'a', (err, fd) => {
    console.log("this is second open");
    fs.write(fd, "test aaaueyqiuwy\r\n", function() {
      console.log("this is second write");
    });
  })
}

function objectModeTest() {
}

function flowModeTest() {

  function unFlowMode() {
    console.log("this is un flow mode");
    process.stdin
      .on('readable', function() {
        // 有数据到了, 拼命读, 直到读完.
        var chunk;
        console.log('New data available');
        while((chunk = process.stdin.read()) !== null) {
          console.log(
            'Chunk read: (' + chunk.length + ') "' + chunk.toString() + '"'
          );
        }})
      .on('end', function() {
        process.stdout.write('End of stream');
      });
  }

  function flowMode() {
    console.log("this is flow mode");
  // 流动模式
    process.stdin
      .on('data', function(chunk) {
        console.log('New data available');
        console.log(
          'Chunk read: (' + chunk.length + ')" ' +
          chunk.toString() + '"'
        );
      })
      .on('end', function() {
        process.stdout.write('End of stream');
      });
  }

  unFlowMode();
  // flowMode();
}

simpleTest();


