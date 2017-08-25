/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-11 19:39:36
 * @version $Id$
 */

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


