
let obj = {
    value: 1
};

let num = 1;
num++;

console.log(num);

function setValue(num) {
    obj.value = num;
}

function printValue() {
    console.log(obj.value);
}

// module.exports = {
//     obj,
//     setValue,
//     printValue,
// };

setTimeout(() => {
    obj.value = 1000;
});

module.exports = obj;




// commonjs中requirejs中引入的是module.exports属性，而且会有缓存，即require一次之后，第二次require都是直接从缓存中取的，而不是重新 从路径中拉取
// 如果需要重新拉取，可以使用delete require.cache[require.resolve(url)];来删除这个缓存信息
// import export 使用的直接从数据中拉取，也就是说会改变原始的值，而且没法删除这个值。
