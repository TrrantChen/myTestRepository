define([], function(){
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
        if (isObject(obj) && Object.keys(obj).length != 0)  {
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
            for(var i = 0; i < length; i ++) {
                result += (keyArray[i] + "=" + obj[keyArray[i]] + ";");
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
        return isServerDebug() ? "http://10.9.233.35:" + (isByNginx() ? 12306 : 8088) + "/" : "http://" + document.domain  + ":8088/";
    }

    function blob2arrayBuffer(blob) {
        var result = null;
        var fileReader = new FileReader()
        fileReader.readAsArrayBuffer(blob);
        fileReader.addEventListener("loadend", function(){
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
        for (var i = 0; i < int8.length; i++ ) {
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

        if(!isLinkExist) {
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
        while(new Date().getTime() < time) {

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
        return new Promise(function (resolve, reject) {
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

    // function() {

    // }

    return {
        ab2string8:ab2string8,
        ab2string16:ab2string16,
        string2ab16:string2ab16,
        string2ab8:string2ab8,
        getHost:getHost,
        blob2arrayBuffer:blob2arrayBuffer,
        arrayBuffer2blob:arrayBuffer2blob,
        arraryBuffer2TypedArray:arraryBuffer2TypedArray,
        typedArray2arrayBuffer:typedArray2arrayBuffer,
        typedArray2Array:typedArray2Array,
        array2TypedArray:array2TypedArray,
        logTime:logTime,
        curryFunc:curryFunc,
        objDeepCopy:objDeepCopy,
        isObject:isObject,
        insertStyle2Head:insertStyle2Head,
        calculateSpanTime:calculateSpanTime,
        str2dom:str2dom,
        sleepBad:sleepBad,
        onRead:onRead,
        asyncOnReady:asyncOnReady,
        onReadyPromise:onReadyPromise,
        myDebounce:myDebounce,
        myThrottle:myThrottle,
        isEmptyObject:isEmptyObject,
        obj2keyValueString:obj2keyValueString
    }  
})