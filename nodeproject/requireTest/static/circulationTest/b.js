console.log('b start');
import { foo } from './a.js';
console.log('b.mjs');
console.log(foo);

function bar() {

}

export { bar };
