import * as util from '../../js/common/util'
function myFirstAopTest() {
    function MyFirstAop() {
        this.before = function(originFunc, beforeFunc) {
            return {
                originFunc:originFunc,
                targetFunc:function() {
                    beforeFunc.apply(this, arguments);
                    originFunc.apply(this, arguments);
                }
            }
        }

        this.after = function(originFunc, afterFunc) {
            return {
                originFunc:originFunc,
                targetFunc:function() {
                    originFunc.apply(this, arguments);
                    afterFunc.apply(this, arguments);
                }
            }
        }

        this.round = function(originFunc, roundFunc) {
            return {
                originFunc:originFunc,
                targetFunc:function() {
                    roundFunc.apply(this, arguments);
                    originFunc.apply(this, arguments);
                    roundFunc.apply(this, arguments);
                }
            }
        }  
    }

    function TestFunc() {
        this.doSomething = function(something) {
            something = something || "nothing";
            console.log("do " + something);
        }
    }

    var testFunc = new TestFunc();   
    var myFirstAop = new MyFirstAop();  

    var beforeDoSomething = myFirstAop.before(testFunc.doSomething, function(){
        console.log("this is before");
    })
    testFunc.doSomething = beforeDoSomething.targetFunc;
    testFunc.doSomething("something test"); 
    testFunc.doSomething = beforeDoSomething.originFunc;
    console.log("=====================================================")


    var afterDoSomething = testFunc.doSomething = myFirstAop.after(testFunc.doSomething, function(){
        console.log("this is after");
    })
    testFunc.doSomething = afterDoSomething.targetFunc;
    testFunc.doSomething("something test");     
    testFunc.doSomething = afterDoSomething.originFunc;
    console.log("=====================================================")



    var roundDoSomething = testFunc.doSomething = myFirstAop.round(testFunc.doSomething, function(){
        console.log("this is round");
    })      
    testFunc.doSomething = roundDoSomething.targetFunc;          
    testFunc.doSomething("something test");                           
}

function aopOnlineTestBySiTu() {
    function Person() {
        this.say = function(name, lang) {
            alert("我的名字叫做" + name + ",专注于" + lang + "……");
        }
    }
    Aspects = function() {};
    Aspects.prototype = {
        before: function(target, method, advice) {
            var original = target[method];
            target[method] = function() {
                (advice)();
                original.apply(target, arguments);
            }
            return target
        },
        after: function(target, method, advice) {
            var original = target[method];
            target[method] = function() {
                original.apply(target, arguments);
                (advice)();
            }
            return target
        },
        around: function(target, method, advice) {
            var original = target[method];
            target[method] = function() {
                (advice)();
                original.apply(target, arguments);
                (advice)();
            }
            return target
        }
    }
    var t = new Person;
    var a = new Aspects;
    t = a.before(t, "say", function() {
        alert("请你介绍一下自己！")
    });
    t.say("司徒正美", "javascript");
}

function aopOnlineTestByTc() {
    Function.prototype.before = function(func) {
        var _self = this;
        console.log("1 " + this);
        return function() {
            console.log("2 " + this);
            if (func.apply(this, arguments) == false) {
                console.log("3 " + this);
                return false;
            }
            console.log("4 " + this)
            return _self.apply(this, arguments);
        }
    };

    Function.prototype.after = function(func) {
        var _self = this;
        return function() {
            var ret = _self.apply(this, arguments);
            if (ret == false) {
                return false;
            }
            func.apply(this, arguments);
            return ret;
        }
    }

    Function.prototype.round = function(func) {
        var _self = this;
        return function() {
            if (func.apply(this, arguments) == false) {
                return false;
            }
            var ret = _self.apply(this, arguments);

            if (ret == false) {
                return false;
            }

            return func.apply(this, arguments);
        }
    }

    var test = function(name) {
        name = name || "yc";
        console.log(name + " is your name");
    }

    test = test.before(function(){
        console.log("test")
    })
    test();
}



 


