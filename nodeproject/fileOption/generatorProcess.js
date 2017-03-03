/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-03-02 15:26:06
 * @version $Id$
 */

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
奇怪的思维
 */
function demo4() {
    function* test1() {
        console.log(yield);
    }
    var gen = test1();
    console.log(1);
    setTimeout(test1, 500);
    gen.next(2);
    console.log(3);
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

function demo7() {
    var pending = function() {
        var count = 0;
        return function(callback) {
            count++;
            return function() {
                count--;
                console.log(count);
                if (count === 0) {
                    callback();
                }
            };
        };
    };
    var done = pending();
    done(function() {
        console.log('all is over');
    })();
    done(function() {
        console.log('all is over');
    })();
}

demo7();


