// process.nextTick(() => {
//   console.log("this is nextTick1");
// });

setImmediate(() => {
  console.log("this is setImmediate1");
})


setTimeout(() => {
  console.log("this is set time out");
}, 0)

// process.nextTick(() => {
//   console.log("this is nextTick2");
// });

setImmediate(() => {
  console.log("this is setImmediate2");
})



