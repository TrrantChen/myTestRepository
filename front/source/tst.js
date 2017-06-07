(function () {
'use strict';

// func会在time结束后调用，如果time时间内又发生调用，就把定时器清空，重启一个time时间
// 的定时器去调用func










function promiseAop(func) {
    func = func || function () {
        console.log("test");
    };

    var origin = Promise;
    Promise = function Promise() {
        var args = [].slice.call(arguments);
        arguments[0] = function (reslove, reject) {
            func();
            args[0](reslove, reject);
        };
        return new origin(arguments[0]);
    };

    var arrProperties = getWritableInstanceProperties(origin);

    for (var i = 0; i < arrProperties.length; i++) {
        Promise[arrProperties[i]] = origin[arrProperties[i]];
    }
}

/*
    返回所有实例属性，不管是可枚举的还是不可枚举
 */
function getAllInstanceProperties(obj) {

    if (obj === void 0) {
        return [];
    } else {
        return Object.getOwnPropertyNames(obj);
    }
}

function getWritableInstanceProperties(obj) {
    if (obj === void 0) {
        return [];
    } else {
        var instancePropertiesArr = getAllInstanceProperties(obj);
        return instancePropertiesArr.filter(function (instanceProperties, index) {
            return Object.getOwnPropertyDescriptor(obj, instanceProperties).writable === true;
        });
    }
}

/*
    获取所有可枚举属性
 */


/*
    获取所有不可枚举属性
 */


/*
    返回对象原型链上属性
 */


/*
 * 1所有实例属性，不可枚举和可枚举 
 * 2 所有不可枚举属性
 * 3 原型链上的属性 + 可枚举属性 
 * 4 所有属性，包括原型上 
 * 0 所有可枚举属性]    
 */


/**
 * [copyPropertiesFromObj2Obj description]
 * @param  {[type]} source [description]
 * @param  {[type]} target [description]
 * @param  {[type]} range  [复制的属性范围 
 * @return {[type]}        [description]
 */










Function.prototype.before = function (fn) {
    var args = [],
        length = arguments.length,
        _self = this;

    for (var i = 1; i < length; i++) {
        args.push(arguments[i]);
    }

    return function () {
        fn.apply(this, args);
        _self.apply(this, arguments);
    };
};

Function.prototype.after = function (fn) {
    var args = [],
        length = arguments.length,
        _seft = this;

    for (var i = 1; i < length; i++) {
        args.push(arguments[i]);
    }

    return function () {
        _self.apply(this, arguments);
        fn.apply(this, args);
    };
};

promiseAop();

}());
