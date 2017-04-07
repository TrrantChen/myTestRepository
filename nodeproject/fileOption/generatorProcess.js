/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-03-02 15:26:06
 * @version $Id$
 */

const fs = require("fs");
const common = require("./commonProcess");

 /*
 最简单的demo，gen定义的时候helloGenerator内部是不会执行的，函数每次执行到yield处，都会停住，
 除非下次next调用
  */
function demo1() {
    function* helloGenerator() {
        var index = 0;
        console.log("test")
        while (index < 3) {
            yield ++index;
        }
    }
    var gen = helloGenerator();
    console.log("gen.next().value " + gen.next().value);
    console.log("gen.next().value " + gen.next().value);
    console.log("gen.next().value " + gen.next().value);
}

/*
reset的值都是void 0的, 从这个demo可以确定yield的值是无意义的
 */
function demo2() {
    function* ticketGenerator() {
        for (var i = -1; true; i++) {
            var reset = yield i;
            console.log("reset before " + reset);
            if (reset < 0) {
                console.log("reset after " + reset);
                i = -1;
            }
            console.log("i " + i);
        }
    }

    var gen = ticketGenerator();
    console.log("gen.next().value " + gen.next().value);
    console.log("gen.next().value " + gen.next().value);
    console.log("gen.next().value " + gen.next().value);    
}

/*
这个例子可以看出next如何向yield传数据的，而且yield的停止是在console.log执行
之前停止的，
 */
function demo3() {
    function* logGenerator() {
      console.log(yield);
      console.log(yield);
      console.log(yield);
    }

    var gen = logGenerator();
    gen.next(); 
    gen.next('pretzel'); 
    gen.next('california'); 
    gen.next('mayonnaise'); 
}

/*
奇怪的思维，使用generator使异步变为同步, 需要将gen的控制逻辑放到业务逻辑里面，非常混乱
 */
function demo4() {
    
    function* test1() {
        function setTimeoutFunc() {
            setTimeout(function(){
                console.log(2);
                gen.next();
            }, 0)
        }
        console.log(1);
        setTimeoutFunc();
        yield;
        console.log(3);
    }

    var gen = test1();
    gen.next();
}

function generatorValueSetGet() {
    function*test() {
        var a = yield function(value) {
            return value + " test";
        }
    }

    var gen = test();
    var returnValue = gen.next().value("hehe");
    console.log(returnValue);
}

/*
执行顺序会随着yield中断并随着next而继续，所以generator这个等于是说会对
函数的流程做一个控制，而且这个控制是掌握在程序员手里的。
 */
function demo5(){
    function* test() {
        console.log(yield);
        action1();
        console.log(yield);
        action2();
        console.log(yield);
        action3();

    }

    function action1() {
        console.log("this is action1");
    }

    function action2() {
        console.log("this is action2");
    }

    function action3() {
        console.log("this is action3");
    }

    var gen = test();
    gen.next();
    gen.next("1");
    gen.next("2");
    gen.next("3");
}

/*
    yield generator返回的会是一个generator对象
    next().value 返回的是yield表达式执行的结果
    yield 右边的表达式的值只会作为返回值返回到next.value中
    不会赋值给左边的变量（在这个demo中是o）
    而yield由外面传回来的值会作为o的右值被赋予变量
 */
function demo6() {
    function *gen(){
      console.log('start');
      var o = yield 'called';
      console.log("I am back and bring " + o);
    }

    var a = gen();//第一次调用返回一个generator对象
    var b = a.next();//开始执行，到yield时会暂停执行并返回，返回值是一个对象
    console.log("b.value " + b.value);//value值是yield右侧的expression的执行结果
    console.log("b.done " + b.done);//是否完成
    var c = a.next('something from outside');//带个值回去
    console.log("c.value " + c.value);
    console.log("c.done " + c.done);//完成
    a.next();
}

/*
    模拟回调，回调并不等于异步，回调只是异步的一种实现方式之一。
 */
function asyncAndCallback(){
    function AsyncTest() {
        let eventNameObj = {};
        this.addListener = (eventName, callback) => {
            eventNameObj[eventName] = callback;
        };
        this.on = (evenName, para) => {
            if (eventNameObj[evenName] === void 0) {
                console.log("there is no this event " + evenName)
            } else {
                let func = eventNameObj[evenName];
                func.apply(this, [para]);
            }
        };       
    } 
          
    var asyncTest = new AsyncTest();
    asyncTest.addListener("test", (para) => {
        common.throwErr();
        console.log(para);
    })

    try {
        asyncTest.on("test", "haha");       
    }
    catch(err) {
        console.log(err);
    } 
}

/*
    第一次执行next会到yield自动停止，而且会把yield右边的表达式执行
 */
function yieldExecuteExpression() {
    function test() {
        console.log("test")
    }

    function* gener() {
        var a = yield test();
        console.log("next") 
    }

    var gen = gener();
    gen.next();
}

/*
    yield无法夸作用域调用，思路其实是错的，yield无法当参数传递
 */

function improve4Demo7bymyself() {
    function fileGeneratorCaller(func) {
        console.log("1")
        const gen = fileGenerator();
        function* fileGenerator() {
            console.log("2");
            var data = yield;
            func(data);
        } 
        gen.next();
    }

    function callback(yield) {
        fs.readFile("./output/test1.txt", 'utf8',function(err, txt){
            console.log(txt);
            gen.next(txt);
        })
        const data = yield;
        fs.readFile("./output/" + data + ".txt", 'utf8', function(err, txt){
            console.log(txt);
        })
    }

    fileGeneratorCaller(callback);
}

/*
    thunk函数的主要作用是柯理化，让异步函数的参数和函数调用分开
    再使用generator的分步作用去实现。就是个thunk
 */
function thunk(fn) {
    return function() {
        var args = [].slice.call(arguments);
        var pass = void 0;
        var context = this;
        args.push(function() {
            if (pass) {
                pass.apply(null, arguments);
            }
        })

        fn.apply(context, args);
        return function(fn) {
            pass = fn;
        } 
    }
}

/*
    thunk函数的改进过程
 */
function theProveProcessOfthunk(){
    /*
        thunk函数的最原始模型，原理来源于异步代码的执行在主js代码执行之后
        所以可以在异步函数定义之后执行之前修改异步代码的函数实现。
        这也是异步代码的一个不好的地方，可以将代码的实现放到其他地方
        造成代码阅读的困难。
     */
    function originthunk() {
        var pass;
        fs.readFile('./output/test1.txt', 'utf8', function() {
            if (pass) {
                pass.apply(null, arguments);
            }
        })
        pass = function(err, data) {
            console.log(data);
        }
    }

    /*
        比较正常的写法。异同步都可以
     */
    function normalThunk() {
        function thunk() {
            var paras = [].slice(arguments);
            return function(cb) {
                paras.push(cb);
                fs.readFile.apply(this, paras);
            }
        }

    }

    /*
        改进的thunk，利用异步代码执行的特点将，异步的回调作为函数参数返回出来
        实现柯理化，其实这部分也可以使用thunk来实现。
        最后再做进一步的抽取，将fs.readFile也抽取出来，再加多一层，就变成三层柯理化
        为最终的方案。
        ps:这种thunk化写法只适合异步执行的代码，不适合同步执行的。
     */
    function provethunk() {
        function thunk() {
            var args = [].slice.call(arguments);
            var pass;
            args.push(() => {
                if (pass) {
                    console.log(arguments);
                    pass.apply(null, arguments);
                }
            });
            fs.readFile.apply(null, args);
            return function(fn) {
                pass = fn;
            }
        }
              
        thunk('./output/test1.txt', 'utf8')((err, data) => {
            if (err) {
                console.log("this is error " + err);
            } else {
                console.log(data);
            }
        })        
    }    
}

/*
    一种尝试，但是觉得并不好
 */
function furtherAbstractor() {
    var fileReader = thunk(fs.readFile);

    var flow = function*(rightFn, processFn) {
        var result = yield rightFn();
        processFn(result);
    }

    function getValue() {
        return "test";
    } 

    function printValue(result) {
        console.log(result);
    }

    var gen = flow(getValue, printValue);
    gen.next(gen.next().value);
}


function demoImproveProcess4FileGenerator() {
    /*
        使用generator将异步模拟为同步 真的很难看,将next放在callback中。
     */
    function origin() {
        var gen = fileGenerator();
        function* fileGenerator() {
            fs.readFile("./output/test1.txt", 'utf8',(err, txt)=>{
                gen.next(txt);
            })
            let data = yield;
            fs.readFile(data, 'utf8', (err, txt)=>{
                console.log(txt);            
            })
        }
        gen.next();
    }

    /* 
        相比最原始的版本，通过thunk化将所有的yield集中放到一个地方管理。
        但是相对的，generator会产生很长的调用链。
     */
    function firstImprove() {  
        var flow = function*() {
            var txt1 = yield readFile('./output/test1.txt', 'utf8');
            console.log(txt1);
            var txt2 = yield readFile('./output/test2.txt', 'utf8');
            console.log(txt2);
        };

        var readFile = thunk(fs.readFile);
        var generator = flow();
        var ret = generator.next(); 
        ret.value(function (err, data) {
          if (err) {
            throw err;
          }
          generator.next(data).value(function(err, data){
            if (err) {
                throw err;
            }
            generator.next(data);
          })
        });
    }

    /*
        想方法将generator给统一管理起来，思路是采用递归的形式来解决
     */
    function secondImprove() {
        var readFile = thunk(fs.readFile);
        var flow = function*() {
            var txt1 = yield readFile('./output/test1.txt', 'utf8');
            console.log(txt1);
            var txt2 = yield readFile('./output/test2.txt', 'utf8');
            console.log(txt2);
        };

        function co(gen) {
            genRecursion();
            function genRecursion(para) {
                let result = gen.next(para);
                if (!result.done) {
                    result.value(function(err, data) {
                        if(err) {
                            throw err;
                        }
                        genRecursion(data);
                    })
                }
            }

            // let result = null;
            // while(result == null || !result.done ) {
            //     result = gen.next();
            //     result.value(function(err, data){
            //         if(err) {
            //             throw err;
            //         }
            //         gen.next(data)
            //     })
            // }            
        };     

        co(flow());
        
    }

    /*
        对数组执行并行处理
     */
    function parallelImprove() {
        var co = function (flow) {
          var generator = flow();
          var next = function (data) {
            var ret = generator.next(data);
            if (!ret.done) {
              if (Array.isArray(ret.value)) {
                var count = 0;
                var results = [];
                ret.value.forEach(function (item, index) {
                  count++;
                  item(function (err, data) {
                    count--;
                    if (err) {
                      throw err;
                    }
                    results[index] = data;
                    if (count === 0) {
                      next(results);
                    }
                  });
                });
              } else {
                ret.value(function (err, data) {
                  if (err) {
                    throw err;
                  }
                  next(data);
                });
              }
            }
          };
          next();
        };

        // var _sleep = function (ms, fn) {
        //   setTimeout(fn, ms);
        // };

        // var sleep = thunk(_sleep);

        // co(function* () {
        //   console.time('sleep1');
        //   yield sleep(1000);
        //   yield sleep(1000);
        //   console.timeEnd('sleep1');
        //   console.time('sleep2');
        //   yield [sleep(1000), sleep(1000)];
        //   console.timeEnd('sleep2');
        // });
        
        var readFile = thunk(fs.readFile);
        co(function*(){
            var results = yield [readFile('./output/test1.txt', 'utf8'), readFile('./output/test2.txt', 'utf8')]
            console.log(results[0]);
            console.log(results[1]);
        })
    }

    secondImprove();
}


function stateMachineByGenerator() {
    function *clock() {
        while (true) {
            yield true;
            yield false;
        }
    }  

    var gen = clock();
    console.log(gen.next().value);
    console.log(gen.next().value);

}

/*
    想利用generator来实现map，但还没想好
 */
(function mapreduceuseGenerator() {
    var arr = [1, 3, 4, 5, 6];
    arr.map((num) => {
        return num + 1;
    }).filter((num) => {
        return  num < 6;
    }).forEach((num) => {
        console.log(num);
    });
})()



