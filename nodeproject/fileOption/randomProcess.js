/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-27 15:59:03
 * @version $Id$
 */

var arrayProcess = require("./arrayProcess");
var converProcess = require("./converProcess");

// Returns a random number between 0 (inclusive) and 1 (exclusive)
exports.getRandom = function() {
    return Math.random();
}

// Returns a random number between min (inclusive) and max (exclusive)
exports.getRandomArbitrary = function(min, max) {
    min = min == void 0 ? 0 : min;
    max = max == void 0 ? 100 : max;
    return Math.random() * (max - min) + min;
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
exports.getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (min == max) {
        return min;
    } else {
        return Math.floor(Math.random() * (max - min)) + min;
    }   
}

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
exports.getRandomIntInclusive = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (min == max) {
        return min
    } else {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } 
    
}

exports.createRandomArray = function(length, min, max, isSort) {
    length = length || 10;
    min = min || 0,
    max = max || 1000
    var array = new Array(length);
    for (var i = 0; i < length; i++) {
        array[i] = exports.getRandomInt(min, max);
    }
    return  isSort ? arrayProcess.arraySort(array) : array;
}

exports.createRandomString = function(length) {
    length = length || 10;
    var str = "";
    for (var i = 0; i < length; i++) {
        str +=  converProcess.num2char(exports.getRandomIntInclusive(97, 122));
    }
    return str;
}