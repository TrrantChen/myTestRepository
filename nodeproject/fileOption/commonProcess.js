/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-26 10:15:04
 * @version $Id$
 */
var os = require('os');
var randomProcess = require("./randomProcess");
var arrayProcess = require("./arrayProcess");
var converProcess = require("./converProcess");
var app =  null;  

// var accessPath = "http://" +  ((process.platform == "win32") ? os.networkInterfaces()["本地连接"][1].address : "") + ":8099";
exports.setAccess = function(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-type,Content-Length, Authorization, Accept,X-Requested-With, X-PINGOTHER");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");                
}

exports.getOperationSystemType = function() {
    return process.platform.toString()
}

exports.optionsProcess = function(req, res) {
    exports.setAccess(res);
    res.send(" ");    
}

exports.preProcessHttpMethods = function(app, httpMethods, url, callback, middleParse) {
    switch (httpMethods) {
        case "get":
            if (middleParse != void 0) {
                app.get(url, middleParse, preProcessCallback(callback));
            } 
            else {
                app.get(url, preProcessCallback(callback));
            }
            break;
        case "post":
            app.options(url, exports.optionsProcess);
            if (middleParse != void 0) {
                app.post(url, middleParse, preProcessCallback(callback));
            } else {
                app.post(url, preProcessCallback(callback));
            }
            break;
        default:
            console.error("preProcessHttpMethods error");
            break;
    }
}

exports.createRandomArray = function(length, min, max, isSort) {
    length = length || 10;
    min = min || 0,
    max = max || 1000
    var array = new Array(length);
    for (var i = 0; i < length; i++) {
        array[i] = randomProcess.getRandomInt(min, max);
    }
    return  isSort ? arrayProcess.arraySort(array) : array;
}

exports.createRandomString = function(length) {
    length = length || 10;
    var str = "";
    for (var i = 0; i < length; i++) {
        str +=  converProcess.num2char(randomProcess.getRandomIntInclusive(97, 122));
    }
    return str;
}

exports.calculateSpanTime = function(func, funcName) {
    var fixedArgs = [].slice.call(arguments, 2)
    console.time(funcName);
    var result  = func.apply(null, fixedArgs);
    if (result != void 0) {
         console.log(result);
    }
    console.timeEnd(funcName);
}

function preProcessCallback(callback) {
    return function(req, res) {
        exports.setAccess(res);
        callback(req, res);  
    }
}

exports.asserts = function(funcRight) {
    var funcRightPara = Array.prototype.slice.call(arguments, 1);
    return function(funcLeft) {
        var funcLeftPara = Array.prototype.slice.call(arguments, 1);
        var resultRight = funcRight.apply(null, funcRightPara);
        var resultLeft = funcLeft.apply(null, funcLeftPara);
        if (resultRight === resultLeft) {
            return true;
        } else {
            console.log("resultRight is " + resultRight);
            console.log("resultLeft is " + resultLeft);
            return false;
        }
    }
}

exports.dateFormate = function(dateTime, format) {
    var date = {
        "M+": dateTime.getMonth() + 1,
        "d+": dateTime.getDate(),
        "h+": dateTime.getHours(),
        "m+": dateTime.getMinutes(),
        "s+": dateTime.getSeconds(),
        "q+": Math.floor((dateTime.getMonth() + 3) / 3),
        "S+": dateTime.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (dateTime.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
                date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

exports.throwErr = () => {
    let error = new Error();
    throw error;
}


