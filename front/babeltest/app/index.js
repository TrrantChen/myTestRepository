import 'babel-polyfill';

// function myPromise() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(10);
//         });
//     })
// }
//
//
// async function init() {
//     let result = await myPromise();
//     alert(result);
// }
//
//
// init();
//
// let res = [1,2,3].find((num) => { return num === 3 });
// alert(res);

let result = [1, 2, 3].includes(3)

alert(result);

// import { foo, bar } from './assign.js'
//
// let obj1 = { a: 1 };
// let obj2 = { b: 2 };
//
// alert(foo(obj1, obj2) + '1');
// alert(bar(obj1, obj2) + '2');