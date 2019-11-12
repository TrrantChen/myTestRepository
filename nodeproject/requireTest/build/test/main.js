// 循环引用的bug

const { resolve } = require('../util.js');

console.log('===============main================');
// console.log(resolve);

const config = require('../config');

console.log(resolve('1'));
// console.log(config);




