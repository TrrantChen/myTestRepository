define([], function() {
    function isServerDebug() {
        return false;
    }

    function isByNginx() {
        return false;
    }

    function isObject(obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    }

    function isEmptyObject(obj) {
        if (isObject(obj) && Object.keys(obj).length != 0) {
            return false;
        } else {
            return true;
        }
    }

    function obj2keyValueString(obj) {
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

    function ab2string8(arrayBuffer) {
        return String.fromCharCode.apply(null, new Uint8Array(arrayBuffer))
    }

    function ab2string16(arrayBuffer) {
        return String.fromCharCode.apply(null, new Uint16Array(arrayBuffer))
    }

    function string2ab16(str) {
        var arrayBuffer = new ArrayBuffer(str.length * 2)
        var charBuf = new Uint16Array(arrayBuffer);
        for (var i = 0; i < str.length; i++) {
            charBuf[i] = str.charCodeAt(i)
        }
        return arrayBuffer;
    }

    function string2ab8(str) {
        var arrayBuffer = new ArrayBuffer(str.length)
        var charBuf = new Uint8Array(arrayBuffer);
        for (var i = 0; i < str.length; i++) {
            charBuf[i] = str.charCodeAt(i)
        }
        return arrayBuffer;
    }

    function getHost() {
        return isServerDebug() ? "http://10.9.233.35:" + (isByNginx() ? 12306 : 8088) + "/" : "http://" + document.domain + ":8088/";
    }

    function blob2arrayBuffer(blob) {
        var result = null;
        var fileReader = new FileReader()
        fileReader.readAsArrayBuffer(blob);
        fileReader.addEventListener("loadend", function() {
            result = fileReader.result;
            return result;
        })
    }

    function arrayBuffer2blob(arrayBuffer) {
        var blob = new Blob([arrayBuffer]);
        return blob;
    }

    function arraryBuffer2TypedArray(arrayBuffer) {
        var int8 = new Int8Array(arrayBuffer);
        return int8;
    }

    function typedArray2arrayBuffer(int8) {
        return int8.buffer;
    }

    function typedArray2Array(int8) {
        var array = [];
        for (var i = 0; i < int8.length; i++) {
            array[i] = int8[i];
        }
        return array;
    }

    function array2TypedArray(array) {
        var int8 = new Int8Array(array);
        return int8;
    }

    function logTime(timString, func, process, length) {
        console.time(timString);
        if (length === void 0) {
            length = process
            func(length)
        } else {
            func(process, length)
        }
        console.timeEnd(timString)
    }

    function curryFunc(func) {
        var fixedArgs = [].slice.call(arguments, 1);
        return function() {
            var args = fixedArgs.concat([].slice.call(arguments));
            return func.apply(null, args);
        }
    }

    function objDeepCopy(obj) {
        if (isObject(obj)) {
            return JSON.parese(JSON.stringify(obj));
        } else {
            return {};
        }
    }

    function objShallowCopy(obj) {
        if (isObject(obj)) {
            return Object.assign({}, obj);
        } else {
            return {};
        }
    }

    function insertStyle2Head(cssString) {
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

    function calculateSpanTime(func, funcName, isShowTheResult) {
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

    function str2dom(str) {　　
        var objE = document.createElement("div");　　
        objE.innerHTML = str;　　
        return objE.children[0];
    }

    function sleepBad(millisecond) {
        var time = parseInt(millisecond) + new Date().getTime();
        while (new Date().getTime() < time) {

        }
    }

    function onRead(fn) {
        var ready = document.readyState;
        if (ready == "interactive" || ready == "complete") {
            fn();
        } else {
            window.addEventListener("DOMContentLoaded", fn);
        }
    }

    function asyncOnReady(fn) {
        var ready = document.readyState;
        if (ready == "interactive" || ready == "complete") {
            setTimeout(fn(), 0);
        } else {
            window.addEventListener("DOMContentLoaded", fn);
        }
    }

    function onReadyPromise() {
        return new Promise(function(resolve, reject) {
            var readyState = document.readyState;
            if (readyState === 'interactive' || readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('DOMContentLoaded', resolve);
            }
        });
    }

    function myThrottle(func, time, delayApply) {
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
    function myDebounce(func, time) {
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

    function autoDownloadUrl(downloadName, downloadContent) {
        var a = document.createElement('a');
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, false);
        a.download = downloadName;
        a.href = window.URL.createObjectURL(downloadContent);
        a.dispatchEvent(evt);
        a.click();
    }

    function isString(obj) {
        return Object.prototype.toString.call(obj) == "[object String]"
    }

    function isArray(obj) {
        if (Array.isArray !== void 0) {
            return Array.isArray(obj);
        } else {
            return Object.prototype.toString.call(obj) == "[object Array]";
        }
    }

    function initGetUid() {
        let uid = 0;
        function incrementUid() {
            return uid++;
        }
        return function() {
            return incrementUid();
        }
    }

    function promiseAop(func) {
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

        var arrProperties = getAllInstanceProperties(origin);

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

    /*
        获取所有可枚举属性
     */
    function getAllEnumerableProperties(obj) {
        if (obj === void 0) {
            return [];
        } else {
            return Object.keys(obj);
        }
    }

    /*
        获取所有不可枚举属性
     */
    function getAllUnEnumerableProperties(obj) {
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
    function getAllPrototypeProperties(obj) {
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
    function getPropertiesRange(range, source) {
        var propertiesArr = [];
        switch(range) {
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
    function copyPropertiesFromObj2Obj(target, source, isDeep, range) {
        range = parseInt(range) || 0;
        var propertiesArr = getPropertiesRange(range, source);
        var arrLength = propertiesArr.length;
        if (isDeep) {
            for (var i = 0; i < arrLength; i++) {
                if (isObject(source[propertiesArr[i]])) {
                    target[propertiesArr[i]] = {};
                    copyPropertiesFromObj2Obj(target[propertiesArr[i]], source[propertiesArr[i]], true)
                } else if(isArray(source[propertiesArr[i]])) {
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

    function arrCopy(target, source) {
        var length = source.length;
        for(var i = 0; i <　length; i++) {
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

    function getInt(num) {
        let result = parseInt(num);
        return isNaN(result) ? 0 : result;
    }

    return {
        ab2string8: ab2string8,
        ab2string16: ab2string16,
        string2ab16: string2ab16,
        string2ab8: string2ab8,
        getHost: getHost,
        blob2arrayBuffer: blob2arrayBuffer,
        arrayBuffer2blob: arrayBuffer2blob,
        arraryBuffer2TypedArray: arraryBuffer2TypedArray,
        typedArray2arrayBuffer: typedArray2arrayBuffer,
        typedArray2Array: typedArray2Array,
        array2TypedArray: array2TypedArray,
        logTime: logTime,
        curryFunc: curryFunc,
        objDeepCopy: objDeepCopy,
        isObject: isObject,
        insertStyle2Head: insertStyle2Head,
        calculateSpanTime: calculateSpanTime,
        str2dom: str2dom,
        sleepBad: sleepBad,
        onRead: onRead,
        asyncOnReady: asyncOnReady,
        onReadyPromise: onReadyPromise,
        myDebounce: myDebounce,
        myThrottle: myThrottle,
        isEmptyObject: isEmptyObject,
        obj2keyValueString: obj2keyValueString,
        autoDownloadUrl: autoDownloadUrl,
        isArray: isArray,
        isString: isString,
        initGetUid: initGetUid,
        promiseAop: promiseAop,
        getAllPrototypeProperties: getAllPrototypeProperties,
        getAllEnumerableProperties: getAllEnumerableProperties,
        getAllUnEnumerableProperties: getAllUnEnumerableProperties,
        getAllInstanceProperties:getAllInstanceProperties,
        copyPropertiesFromObj2Obj:copyPropertiesFromObj2Obj,
        arrCopy:arrCopy,
        getPropertiesRange:getPropertiesRange,
        getInt:getInt
    }
})
