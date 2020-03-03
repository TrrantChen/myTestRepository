console.log('import');
import { print } from './import2.js'

print();

import { test } from './export.js';
import { obj as obj1 } from './export.js';
import { obj as obj2 } from './export.js';

console.log('++++++++++++++++++++++++++');
console.log(test);

setTimeout(() => {
    console.log('++++++++++++++++++++++++++');
    console.log(test);
}, 2000);

console.log('+++++++++++++++++++++++++++');
console.log(obj1 === obj2);

obj1.value = 500;

import { print as print2 } from './import2.js'

print2();





