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
    使用generator将异步模拟为同步 真的很难看
 */
function demo7() {
    var gen = fileGenerator();
    function* fileGenerator() {
        fs.readFile("./output/test1.txt", 'utf8',(err, txt)=>{
            gen.next(txt);
        })

        // let data = null;
        // (function test(a) {
        //     data  = a;
        // })(yield)
        // 等价的
        let data = yield;
        
        fs.readFile("./output/" + data + ".txt", 'utf8', (err, txt)=>{
            console.log(txt);            
        })
    }
    gen.next();
}

/*
 有缺陷， 未解决, 想法是把gen和yield提取出来，放到某个方法中执行,但这个暂时还没实现
 */
function improveDemo7() {
    function fileGeneratorCaller(func) {
        const gen = fileGenerator();
        function* fileGenerator() {
            func(yield);
        } 
        gen.next();
    }

    fileGeneratorCaller((yield)=>{
        fs.readFile("./output/test1.txt", 'utf8',(err, txt)=>{
            gen.next(txt);
        })
        const data = yield;
        fs.readFile("./output/" + data + ".txt", 'utf8', (err, txt)=>{
            console.log(txt);            
        })        
    })
}

function demo8() { 
    /*
    helper函数的主要作用是柯理化，让异步函数的参数和函数调用分开
    再使用generator的分步作用是实现。
     */
    // function helper(fn) {
    //     return function() {
    //         var args = [].slice.call(arguments);
    //         var pass;
    //         args.push(function() { // 在回调函数中植入收集逻辑
    //             if (pass) {
    //                 pass.apply(null, arguments);
    //             }
    //         });
    //         fn.apply(null, args);
    //         return function(fn) { // 传入一个收集函数
    //             pass = fn;
    //         };
    //     };
    // };
    // var flow = function*() {
    //     var txt = yield readFile('./output/test1.txt', 'utf8');
    //     console.log(txt);
    // };
    // var readFile = helper(fs.readFile);
    // var generator = flow();
    // var ret = generator.next();  
    // ret.value(function (err, data) {
    //   if (err) {
    //     throw err;
    //   }
    //   generator.next(data);
    // });

    
    function helper() {
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
    
    
    helper('./output/test1.txt', 'utf8')((err, data) => {
        if (err) {
            console.log("this is error " + err);
        } else {
            console.log(data);
        }
    })

    

    // function helper() {
    //     var args = [].slice.call(arguments);
    //     var pass;
    //     args.push(()=>{
    //         if (pass) {
    //             pass.apply(null, arguments);
    //         }
    //     });
    //     // myThrottleInputTest.addEventListener.apply(null, args);
    //     setTimeout.apply(null, args);
    //     return function(fn) {
    //         pass = fn;
    //     }
    // }

    // helper()(() => {
    //     console.log("this is one");
    // })
    
    // var pass;
    // fs.readFile('./output/test1.txt', 'utf8', function() {
    //     if (pass) {
    //         pass.apply(null, arguments);
    //     }
    // })
    // pass = function(err, data) {
    //     console.log(data);
    // }
}

demo8()

