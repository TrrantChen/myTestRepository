/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-03-02 09:50:09
 * @version $Id$
 */



function throwError() {
    var err = new Error("this is a error");
    throw err;
}
/*
    解决在promise的then函数中抛出异步异常的问题,想弄出一个通用的异步promise方法，
    但不知道有什么好的抽象方法，还需要进一步抽象。API的接口不够清晰，与原来的用法相差太多
    容易造成误解。
 */
exports.timePromiseTest = function(){
    function timePromise(func) {
        return function() {
            var promise = new Promise(function(resolve, reject){
                func.apply(this, [resolve].concat(Array.prototype.slice.call(arguments, 0)));
            });
            return promise;                    
        }
    };

    var setTimeoutPromise = timePromise(setTimeout);
    setTimeoutPromise(0).then(function(){
        var err = new Error("this is time error");
        throw err;
    }).catch(function(err){
        console.log(err);
    });
}

