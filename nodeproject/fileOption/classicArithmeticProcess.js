/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-11-10 19:20:22
 * @version $Id$
 */

var randomProcess = require("./randomProcess");
var arrayProcess = require("./arrayProcess");
var converProcess = require("./converProcess");
var commonProcess = require("./commonProcess");

exports.shuffle = function(array) {
    var length = array.length
    for (var i = length - 1; i > 0; i--) {
        var randomIndex = randomProcess.getRandomIntInclusive(0, i);
        if (i != randomIndex)  {
            array[i] = array[i] ^ array[randomIndex];
            array[randomIndex] = array[i] ^ array[randomIndex];
            array[i] = array[i] ^ array[randomIndex];                        
        }           
    }
    return array;
}


