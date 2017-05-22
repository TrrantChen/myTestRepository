    export function isServerDebug() {
        return false;
    }

    export function isByNginx() {
        return false;
    }

    export function isObject(obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    }

    export function isEmptyObject(obj) {
        if (isObject(obj) && Object.keys(obj).length != 0) {
            return false;
        } else {
            return true;
        }
    }

    export function obj2keyValueString(obj) {
        if (isEmptyObject(obj)) {
            return null;
        } else {
            var keyArray = Object.keys(obj),
                length = keyArray.length,
                result = "";
            for (var i = 0; i < length; i++) {
                if (i == 0) {
                    result += (keyArray[i] + "=" + obj[keyArray[i]]);
                } else {
                    result += ("&" + keyArray[i] + "=" + obj[keyArray[i]]);
                }

            }
            return result;
        }
    }

    export function ab2string8(arrayBuffer) {
        return String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))
    }

    export function ab2string16(arrayBuffer) {
        return String.fromCharCode.apply(null, new Uint16Array(arrayBuffer))
    }

    export function string2ab16(str) {
        var arrayBuffer = new ArrayBuffer(str.length * 2)
        var charBuf = new Uint16Array(arrayBuffer);
        for (var i = 0; i < str.length; i++) {
            charBuf[i] = str.charCodeAt(i)
        }
        return arrayBuffer;
    }

    export function string2ab8(str) {
        var arrayBuffer = new ArrayBuffer(str.length)
        var charBuf = new Uint8Array(arrayBuffer);
        for (var i = 0; i < str.length; i++) {
            charBuf[i] = str.charCodeAt(i)
        }
        return arrayBuffer;
    }

    export function getHost() {
        return isServerDebug() ? "http://10.9.233.35:" + (isByNginx() ? 12306 : 8088) + "/" : "http://" + document.domain + ":8088/";
    }

    export function blob2arrayBuffer(blob) {
        var result = null;
        var fileReader = new FileReader()
        fileReader.readAsArrayBuffer(blob);
        fileReader.addEventListener("loadend", function() {
            result = fileReader.result;
            return result;
        })
    }

    export function arrayBuffer2blob(arrayBuffer) {
        var blob = new Blob([arrayBuffer]);
        return blob;
    }

    export function arraryBuffer2TypedArray(arrayBuffer) {
        var int8 = new Int8Array(arrayBuffer);
        return int8;
    }

    export function typedArray2arrayBuffer(int8) {
        return int8.buffer;
    }

    export function typedArray2Array(int8) {
        var array = [];
        for (var i = 0; i < int8.length; i++) {
            array[i] = int8[i];
        }
        return array;
    }

    export function array2TypedArray(array) {
        var int8 = new Int8Array(array);
        return int8;
    }

    export function logTime(timString, func, process, length) {
        console.time(timString);
        if (length === void 0) {
            length = process
            func(length)
        } else {
            func(process, length)
        }
        console.timeEnd(timString)
    }

    export function curryFunc(func) {
        var fixedArgs = [].slice.call(arguments, 1);
        return function() {
            var args = fixedArgs.concat([].slice.call(arguments));
            return func.apply(null, args);
        }
    }

    export function objDeepCopy(obj) {
        if (isObject(obj)) {
            return JSON.parese(JSON.stringify(obj));
        } else {
            return {};
        }
    }

    export function objShallowCopy(obj) {
        if (isObject(obj)) {
            return Object.assign({}, obj);
        } else {
            return {};
        }
    }

    export function insertStyle2Head(cssString) {
        var style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = cssString;
        var head = document.getElementsByTagName('head')[0]
        var headChildren = head.children;
        var isLinkExist = false;
        var headLength = headChildren.length;

        for (var i = 0; i < headLength; i++) {
            if (headChildren[i] instanceof HTMLLinkElement) {
                isLinkExist = true;
                head.insertBefore(style, headChildren[i])
                break;
            }
        }

        if (!isLinkExist) {
            head.appendChild(style);
        }
    };

    export function calculateSpanTime(func, funcName, isShowTheResult) {
        isShowTheResult = isShowTheResult || false;
        return function() {
            console.time(funcName);
            var result = func.apply(null, arguments);
            if (isShowTheResult && result != void 0) {
                console.log(result);
            }
            console.timeEnd(funcName);
        }
    }

    export function str2dom(str) {　　
        var objE = document.createElement("div");　　
        objE.innerHTML = str;　　
        return objE.children[0];
    }

    export function sleepBad(millisecond) {
        var time = parseInt(millisecond) + new Date().getTime();
        while (new Date().getTime() < time) {

        }
    }

    export function onRead(fn) {
        var ready = document.readyState;
        if (ready == "interactive" || ready == "complete") {
            fn();
        } else {
            window.addEventListener("DOMContentLoaded", fn);
        }
    }

    export function asyncOnReady(fn) {
        var ready = document.readyState;
        if (ready == "interactive" || ready == "complete") {
            setTimeout(fn(), 0);
        } else {
            window.addEventListener("DOMContentLoaded", fn);
        }
    }

    export function onReadyPromise() {
        return new Promise(function(resolve, reject) {
            var readyState = document.readyState;
            if (readyState === 'interactive' || readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('DOMContentLoaded', resolve);
            }
        });
    }

    export function myThrottle(func, time, delayApply) {
        delayApply = delayApply || false;
        var startTime = 0;
        var isFirstDelayClick = true;
        return function() {
            var now = new Date().getTime();
            if (now - startTime > time || startTime == 0) {
                startTime = new Date().getTime();
                func.apply(null, arguments);
                isFirstDelayClick = true;
            } else {
                // 模拟的场景为在time时间内再一次点击
                // delayApply决定是否在time结束后去执行time内的一次点击事件
                if (isFirstDelayClick && delayApply) {
                    isFirstDelayClick = false;
                    setTimeout(function() {
                        func.apply(null, arguments);
                    }, time + startTime - now);
                }
            }
        }
    }

    // func会在time结束后调用，如果time时间内又发生调用，就把定时器清空，重启一个time时间
    // 的定时器去调用func
    export function myDebounce(func, time) {
        var startTime = 0;
        var timeOut = null;
        return function() {
            var para = arguments;
            var now = new Date().getTime();
            if (now - startTime > time || startTime == 0) {
                startTime = new Date().getTime();
                timeOut = setTimeout(function() {
                    func.apply(null, para);
                }, time);
            } else {
                startTime = new Date().getTime();
                clearTimeout(timeOut);
                timeOut = setTimeout(function() {
                    func.apply(null, para);
                }, time);
            }
        }
    }

    export function autoDownloadUrl(downloadName, downloadContent) {
        var a = document.createElement('a');
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, false);
        a.download = downloadName;
        a.href = window.URL.createObjectURL(downloadContent);
        a.dispatchEvent(evt);
        a.click();
    }

    export function isString(obj) {
        return Object.prototype.toString.call(obj) == "[object String]"
    }

    export function isArray(obj) {
        if (Array.isArray !== void 0) {
            return Array.isArray(obj);
        } else {
            return Object.prototype.toString.call(obj) == "[object Array]";
        }
    }

    export function initGetUid() {
        let uid = 0;

        function incrementUid() {
            return uid++;
        }
        return function() {
            return incrementUid();
        }
    }

    export function promiseAop(func) {
        func = func || function() {
            console.log("test")
        }

        var origin = Promise;
        Promise = function() {
            var args = [].slice.call(arguments);
            arguments[0] = function(reslove, reject) {
                func();
                args[0](reslove, reject);
            }
            return new origin(arguments[0]);
        };

        let arrProperties = getWritableInstanceProperties(origin);

        for (var i = 0; i < arrProperties.length; i++) {
            Promise[arrProperties[i]] = origin[arrProperties[i]];
        }
    }

    /*
        返回所有实例属性，不管是可枚举的还是不可枚举
     */
    export function getAllInstanceProperties(obj) {
        if (obj === void 0) {
            return [];
        } else {
            return Object.getOwnPropertyNames(obj);
        }
    }

    /*
        返回所有可改写的属性
     */
    export function getWritableInstanceProperties(obj) {
      if (obj === void 0) {
        return [];
      } else {
        let instancePropertiesArr = getAllInstanceProperties(obj);
        return instancePropertiesArr.filter((instanceProperties, index) => {
          return Object.getOwnPropertyDescriptor(obj, instanceProperties).writable === true;
        })
      }
    }    

    /*
        获取所有可枚举属性
     */
    export function getAllEnumerableProperties(obj) {
        if (obj === void 0) {
            return [];
        } else {
            return Object.keys(obj);
        }
    }

    /*
        获取所有不可枚举属性
     */
    export function getAllUnEnumerableProperties(obj) {
        if (obj === void 0) {
            return [];
        } else {
            return Object.getOwnPropertyNames(obj).filter((str) => {
                return !obj.propertyIsEnumerable(str);
            })
        }
    }

    /*
        返回对象原型链上属性
     */
    export function getAllPrototypeProperties(obj) {
        if (obj) {
            return getAllInstanceProperties(obj.prototype);
        } else {
            return [];
        }
    }

    /*
     * 1所有实例属性，不可枚举和可枚举 
     * 2 所有不可枚举属性
     * 3 原型链上的属性 + 可枚举属性 
     * 4 所有属性，包括原型上 
     * 0 所有可枚举属性]    
     */
    export function getPropertiesRange(range, source) {
        var propertiesArr = [];
        switch (range) {
            case 1:
                propertiesArr = getAllInstanceProperties(source);
                break;
            case 2:
                propertiesArr = getAllUnEnumerableProperties(source);
                break;
            case 3:
                propertiesArr = getAllPrototypePropertie(source.prototype).concat(getAllEnumerableProperties(source));
                break;
            case 4:
                propertiesArr = getAllPrototypePropertie(source.prototype).concat(getAllInstanceProperties(source));
                break;
            case 0:
            default:
                propertiesArr = getAllEnumerableProperties(source);
                break;
        }
        return propertiesArr;
    }

    /**
     * [copyPropertiesFromObj2Obj description]
     * @param  {[type]} source [description]
     * @param  {[type]} target [description]
     * @param  {[type]} range  [复制的属性范围 
     * @return {[type]}        [description]
     */
    export function copyPropertiesFromObj2Obj(target, source, isDeep, range) {
        range = parseInt(range) || 0;
        var propertiesArr = getPropertiesRange(range, source);
        var arrLength = propertiesArr.length;
        if (isDeep) {
            for (var i = 0; i < arrLength; i++) {
                if (isObject(source[propertiesArr[i]])) {
                    target[propertiesArr[i]] = {};
                    copyPropertiesFromObj2Obj(target[propertiesArr[i]], source[propertiesArr[i]], true)
                } else if (isArray(source[propertiesArr[i]])) {
                    target[propertiesArr[i]] = [];
                    arrCopy(target[propertiesArr[i]], source[propertiesArr[i]])
                } else {
                    target[propertiesArr[i]] = source[propertiesArr[i]];
                }
            }
        } else {
            for (var i = 0; i < arrLength; i++) {
                target[propertiesArr[i]] = source[propertiesArr[i]];
            }
        }
    }

    export function arrCopy(target, source) {
        var length = source.length;
        for (var i = 0; i < 　length; i++) {
            if (isArray(source[i])) {
                source[i] = [];
                arrCopy(target[i], source[i]);
            } else if (isObject(source[i])) {
                target[i] = {};
                copyPropertiesFromObj2Obj(target[i], source[i], true);
            } else {
                target[i] = source[i];
            }
        }
    }

    export function arguments2Array(arg) {
        return arg.length === 1 ? [arg[0]] : Array.apply(null, arg);
    }

    export function getInt(num) {
        let result = parseInt(num);
        return isNaN(result) ? 0 : result;
    }

    export function escapeStringRegexp(str) {
        let regex = /[|\\{}()[\]^$+*?.]/g
        return str.replace(regex, '\\$&');
    }

    Function.prototype.before = function(fn) {
        let args = [],
            length = arguments.length,
            _self = this;

        for (var i = 1; i < length; i++) {
            args.push(arguments[i]);
        }

        return function() {
            fn.apply(this, args);
            _self.apply(this, arguments);
        }
    }

    Function.prototype.after = function(fn) {
        let args = [],
            length = arguments.length,
            _seft = this;

        for (var i = 1; i < length; i++) {
            args.push(arguments[i]);
        }

        return function() {
            _self.apply(this, arguments);
            fn.apply(this, args);
        }
    }
