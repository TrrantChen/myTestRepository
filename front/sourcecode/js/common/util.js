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

export function sleepBad(millisecond) {
  var time = parseInt(millisecond) + new Date().getTime();
  while (new Date().getTime() < time) {

  }
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

/*
  用于过滤正则表达式特殊符号的
  例 var a = "aaa..";
  想把.号过滤掉，需要一个特殊的表达式
  var reg = "."
  如果使用
  a.replace(new RegExp(reg), "")
  结果为"",因为.表示把所有的都过滤掉
  所以需要使用
  escapeStringRegexp(reg)将"."转化为"\."
  才表示需要把.给过滤掉。
 */
export function escapeStringRegexp(str) {
  let regex = /[|\\{}()[\]^$+*?.]/g
  return str.replace(regex, '\\$&');
}

export function areyouready() {
  let t = Math.random();
  console.log(t)
}

export function completionZero(num) {
  num = parseInt(num);
  return num > 10 ? num : "0" + num;
}

/*
  将string转换为可以pipe的stream
 */
export function str2stream(str) {
    let s = new Readable();
    s._read = function noop() {};
    s.push(str);
    s.push(null); 
    return s;
}

export function isArrayContain(set, ele) {
  return [].indexOf.call(set, ele) !== -1 ? true : false;
}

export function arraySort(array, desc) {
    desc = desc || false;
    if (desc) {
        return array.sort(desSort)
    } else {
        return array.sort(ascSort)
    } 
}

// ascSort(a,b)传给sort()，数字数组作升序排列
function ascSort (a, b) {  // a和b是数组中相邻的两个数组项
    return a - b; 
    // 如果 return -1, 表示a小于b，a排列在b的前面
    // 如果 return 1, 表示a大于b,a排列在b的后面
    // 如果 return 0, 表示a等于b,a和b的位置保持不变
}

// desSort(a,b)传给sort()，数字数组作降序排列
function desSort (a, b) { // a和b是数组中相邻的两个数组项
    return b - a;
    // 如果 return -1, 表示b小于a，b排列在a的前面
    // 如果 return 1, 表示b大于a, b排列在a的后面
    // 如果 return 0, 表示 b等于a, b和a的位置保持不变
}

export function num2char(num) {
    return String.fromCharCode(num);
}

export function char2num(ch) {
    return ch.charCodeAt(0);
}

/*
  数组去重
 */
export function twoArrayUnique(target, source) {
  let result = []
    , tmpMap = new WeakMap()
    , sourceLength = source.length
    , targetLength = target.length;

  for (var i = 0; i < sourceLength; i++) {
    tmpMap.set(source[i], true);
  }

  for (var i = 0; i < targetLength; i++) {
    if (tmpMap.get(target[i]) !== true) {
      result.push(target[i]);
    }
  }

  return result;
}

export function createUuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export function assignOption(defaultOption, option) {
  defaultOption = defaultOption || {};
  option = option || {};
  return Object.assign(defaultOption, option);
}

export function removeArrayItem(arr, para) {
  let index = arr.indexOf(para);
  if (index !== -1) {
    arr.splice(index, 1);
  }
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

// "yyyy MM dd HH mm ss ffff"
Date.prototype.format = function(str) {
  console.log(this);
  let year = completionZero(this.getFullYear())
     ,month = completionZero(this.getMonth())
     ,date = completionZero(this.getDate())
     ,hour = completionZero(this.getHours())
     ,min = completionZero(this.getMinutes())
     ,second = completionZero(this.getSeconds())
     ,milliseconds = this.getMilliseconds(); 

  if (milliseconds >= 100 && milliseconds < 1000) {
    milliseconds = "0" + milliseconds.toString();
  } else if (milliseconds >= 10 && milliseconds < 100) {
    milliseconds = "00" + milliseconds.toString();
  } else if (milliseconds < 10) {
    milliseconds = "000" + milliseconds.toString();
  }

  return str.replace("yyyy", year)
            .replace("MM", month)
            .replace("dd", date)
            .replace("HH", hour)
            .replace("mm", min)
            .replace("ss", second)
            .replace("ffff", milliseconds)
}


