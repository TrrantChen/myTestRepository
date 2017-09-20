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


function readableTest() {
  function simpleTest() {
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

  // 对象模式下才能push object 要不会报错, 而且从buffer中读取到的也是object
  function objectModeTest() {
    let Readable = stream.Readable;
    let readable = new Readable({objectMode: true});

    readable._read = function() {
      readable.push({test:"test"});
      readable.push(null);
    };

    readable.on("readable", () => {
      let data = readable.read();
      debugger;
      console.log(data);
    })

    readable.on("end", () => {
      console.log("this is end");
    })
  }

  // flow到paused的切换
  function FlowAndPauseTest() {
    this.rb = stream.Readable();
    this.rb._read = function() {
      this.push("a\r\n");
      this.push("b\r\n");
      this.push(null);
    };
    this.rb.setEncoding('utf8');

    // 监听data事件，会自动从pause切换到flow
    this.rb.on("data", (chunk) => {
      console.log("====================================")
      console.log("this is data " + chunk);
      console.log(this.rb._readableState.flowing);
      console.log(this.rb._readableState.buffer);
    });

    this.rb.on("readable", () => {
      console.log("====================================")
      console.log("this is readable");
      console.log(this.rb._readableState.flowing);
      console.log(this.rb._readableState.buffer);
    });

    this.rb.on("end", () => {
      console.log("====================================")
      console.log("this is end");
      console.log(this.rb._readableState.flowing);
      console.log(this.rb._readableState.buffer);
    });    
  }

  // 在使用pause且没有pipe的情况下后，即使监听了data事件，数据依旧在buffer中，不会触发data和end事件
  FlowAndPauseTest.prototype.pauseAndFlow1 = function() {
    this.rb.pause();  
  };

  // 通过read()方法触发data事件，但流还是处于pause
  FlowAndPauseTest.prototype.pauseAndFlow2 = function() {
    this.rb.pause();

    this.rb.on("readable", () => {
      let data = this.rb.read();
      console.log(data);
    });
  };

  // pipe在前，pause在后，流会pause
  FlowAndPauseTest.prototype.pauseAndFlow3 = function() {
    this.rb.pipe(process.stdout);   
    this.rb.pause();
  };

  // pause在前，pipe在后，流会flow
  FlowAndPauseTest.prototype.pauseAndFlow4 = function() {
    this.rb.pause();
    this.rb.pipe(process.stdout);   
  }; 

  // resume能让流变为flow
  FlowAndPauseTest.prototype.pauseAndFlow5 = function() {
    this.rb.pause();
    this.rb.resume();  
  }; 

  // unpipe 也能重新让流pause
  FlowAndPauseTest.prototype.pauseAndFlow6 = function() {
    this.rb.pause();
    this.rb.pipe(process.stdout); 
    this.rb.unpipe(process.stdout);     
  };  

  // let flowAndPauseTest = new FlowAndPauseTest();
  // flowAndPauseTest.pauseAndFlow6();
  
  objectModeTest();
}

readableTest();
