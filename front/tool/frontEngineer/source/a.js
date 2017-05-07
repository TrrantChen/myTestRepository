/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-05-07 17:19:36
 * @version $Id$
 */

import * as b from './b.js'

console.log('a starting');
exports.done = false;
// const b = require('./b.js');
console.log('in a, b.done = %j', b.done);
exports.done = true;
console.log('a done');
