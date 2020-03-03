function test4ChangeValue() {
    let import_obj = require('./testObj');
    console.log('-------------');
    console.log(import_obj);
    // let test1= import_obj.obj;
    //
    // console.log(test1.value);
    // test1.value = 2;
    delete require.cache[require.resolve('./testObj')];
    let import_obj2 = require('./testObj');

    console.log(import_obj === import_obj2);
    // console.log('-=================');
    // console.log(import_obj2);
    // let test2 = import_obj2.obj;
    // console.log(test2.value);
}

function test4AddAdd() {
    // 代码只会执行一次，后面都是取缓存
    let test1= require('./testObj').obj;
    let test2 = require('./testObj').obj;
}

function clearCache() {
    let test1= require('./testObj');
    test1.obj.value = 90;

    console.log(test1.obj.value);

    delete require.cache[require.resolve('./testObj')];

    console.log(test1);

    let test2 = require('./testObj');


    console.log(test2.obj.value);
}

function test4Func() {
    let obj = require('./testObj');
    obj.setValue(10);
    console.log(obj.obj.value);

    delete require.cache[require.resolve('./testObj')];

    let obj2 = require('./testObj');

    console.log(obj2.obj.value);
}


function test4timeout() {
    let obj = require('./testObj');
    console.log(obj.value);

    setTimeout(() => {
        console.log(obj.value)
    }, 2000)
}

test4timeout();
