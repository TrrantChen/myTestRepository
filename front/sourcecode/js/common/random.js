import {arraySort, num2char} from './util';

// Returns a random number between 0 (inclusive) and 1 (exclusive)
export function getRandom() {
    return Math.random();
}

// Returns a random number between min (inclusive) and max (exclusive)
export function getRandomArbitrary(min, max) {
    min = min == void 0 ? 0 : min;
    max = max == void 0 ? 100 : max;
    return Math.random() * (max - min) + min;
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
export function getRandomInt(min, max) {
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
export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (min == max) {
        return min
    } else {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } 
    
}

export function createRandomArray(length, min, max, isSort) {
    length = length || 10;
    min = min == void 0 ? 0 : min;
    max = max == void 0 ? 1000 : max;
    var array = new Array(length);
    for (var i = 0; i < length; i++) {
        array[i] = getRandomInt(min, max);
    }
    return  isSort ? arraySort(array) : array;
}

export function createRandomString(length) {
    length = length || 10;
    var str = "";
    for (var i = 0; i < length; i++) {
        str +=  num2char(getRandomIntInclusive(97, 122));
    }
    return str;
}

export function createRandomTwoDimensionalArray(rows, cells, isRandomString) {
    var arr = [];  
    rows = rows == void 0 ? 10 : rows;
    cells = cells == void 0 ? 10 : cells;
    if (isRandomString) {
        for(var i = 0; i < rows; i++) {
            var tmp = new Array(cells);
            for(var j = 0; j < cells; j++) {
                tmp[j] = createRandomString(5);
            }
            arr.push(tmp);
        }
    } else {
        for(var i = 0; i < rows; i++) {
            var tmp = new Array(cells);
            for(var j = 0; j < cells; j++) {
                tmp[j] = j;
            }
            arr.push(tmp);
        }
    }
    return arr;
}