const minimist = require('minimist');

// npm run pastpara -- --param1 param1 --param2 param1
// 或者 node ./server/server1.js --param1 param1 --param2 param1
console.log('this is server1');
let obj = minimist(process.argv.splice(2));
console.log(obj.param1);
console.log(obj.param2);

