/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-05-07 17:19:55
 * @version $Id$
 */

import * as a from './a.js'

console.log('b starting');
exports.done = false;
// const a = require('./a.js');
console.log('in b, a.done = %j', a.done);
exports.done = true;
console.log('b done');
