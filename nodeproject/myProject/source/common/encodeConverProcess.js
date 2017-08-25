/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-11 14:10:07
 * @version $Id$
 */

 var iconv = require('iconv-lite');
 var commonProcess = require("./commonProcess");

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


