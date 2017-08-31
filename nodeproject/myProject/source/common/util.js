const iconv = require('iconv-lite');

exports.num2char = function(num) {
    return String.fromCharCode(num);
}

exports.char2num = function(ch) {
    return ch.charCodeAt(0);
}

// asce 升序 Desc 降序
exports.arraySort = function(array, desc) {
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

exports.gbk2buffer = function(str) {
    if (str != undefined && typeof str == "string") {
        return incov.encode(str, 'GBK');
    } else {
        return new Buffer();
    }
}
// 主要用于将网络获取的gbk文本保存到数据库或在内存中使用时要用到，如果保存为文本，是不需要用到这个的
exports.buffer2gbk = function(buffer) {
    if (buffer != undefined && Buffer.isBuffer(buffer)) {
        return iconv.decode(buf, 'GBK');
    } else {
        return "";
    }
}

exports.getByteLength = function(str, codeType) {
    return Buffer.byteLength(str, codeType);
}

exports.buffer2String = function(buffer, codeType) {
    return buffer.toString(codeType, 0, buffer.length);
}

exports.string2Buffer = function(str, codeType) {
    var buf = new Buffer(str.length * 3);
    buf.fill(0);
    for (var i = 0; i < str.length; i++) {
        buf.write(str[i], i * 3, codeType);
    }
    return buf;
}

exports.throwErr = () => {
    let error = new Error();
    throw error;
}

exports.noop= () => {};

exports.initGetUid = function() {
    let uid = 0;
    function incrementUid() {
        return uid++;
    }
    return function() {
        return incrementUid();
    }
}

/*
  将string转换为可以pipe的stream
 */
exports.str2stream = function(str) {
  let s = new Readable();
  s._read = function noop() {};
  s.push(str);
  s.push(null);
  return s;
}