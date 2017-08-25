/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-08 19:35:23
 * @version $Id$
 */

var buffers = [];
var nread = 0;

exports.concat = function(chunk) {
    buffers.push(chunk);
    nread += chunk.length;
}

exports.toString = function() {
    var buffer = null;
    switch (buffers.length) {
        case 0:
            buffer = new Buffer(0);
            break;
        case 1:
            buffer = buffers[0];
            break;
        default:
            buffer = new Buffer(nread);
            for (var i = 0, pos = 0, buflength = buffers.length; i < buflength; i++) {
                var chunk = buffers[i];
                chunk.copy(buffer, pos);
                pos += chunk.length;
            }
            break;
    }
    return buffer;
}

exports.clear = function() {
    buffers = [];
    nread = 0;
}