/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-11-10 19:20:22
 * @version $Id$
 */

const randomProcess = require("../common/randomProcess");

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

exports.quickSort = function(arr) {
    //如果数组<=1,则直接返回
    if (arr.length <= 1) {
        return arr; }
    var pivotIndex = Math.floor(arr.length / 2);
    //找基准，并把基准从原数组删除
    var pivot = arr.splice(pivotIndex, 1)[0];
    //定义左右数组
    var left = [];
    var right = [];

    //比基准小的放在left，比基准大的放在right
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] <= pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    //递归
    return exports.quickSort(left).concat([pivot], exports.quickSort(right));
}
 


