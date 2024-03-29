/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-07-24 14:25:27
 * @version $Id$
 */

import $ from 'jquery';

$(() => {
  // test4Class();
})


class Circle {
  constructor(radius) {
    this.radius = radius;
    Circle.circlesMade++;
  };

  static draw(circle, canvas) {

  };

  static get circlesMade() {
    return !this._count ? 0 : this._count;
  };

  static set circlesMade(val) {
    this._count = val;
  };

  area() {
    return Math.pow(this.radius, 2) * Math.PI;
  };

  get radius() {
    return this._radius;
  };

  set radius(radius) {
    if (!Number.isInteger(radius)) {
      throw new Error("圆的半径必须为整数。");
    }
        
    this._radius = radius;
  };

  getThis() {
    return this;
  }
}

class TestClass {
  constructor(value) {
    this.a = value;
    if (TestClass.first === void 0) {
      this.fnExOnce();
      TestClass.first = true;
    }
  }

  static staticFn() {
    console.log("static")
    console.log(this);
    console.log(this.testPara);
  }

  testFn() {
    this.anotherFn();
    innerFn();

    function innerFn() {
      alert("this is inner fn");
    }
  }

  anotherFn() {
    console.log("this is another");
  }

  fnExOnce() {
    alert("once function");
  }
}

TestClass.testPara = 10

function TestGlobalFn() {
  let privatePara = "a";

  this.thisPara = "thisPara";
  this.thisFn = function() {}

  function privateFn() {}
}

TestGlobalFn.prototype.proFn = function() {}
TestGlobalFn.prototype.proPara = "proPara";

TestGlobalFn.staticPara = "staticPara";
TestGlobalFn.staticFn = function() {}

/*
  测试this，原型链和静态上的方法和参数的互相调用情况
 */
function test4FnAndParaInFn() {  
  function TestFn() {
    let a = "a";

    this.thisPara = "thisPara";
    this.thisFn = function() {
      try {
        console.log(a);  
      }
      catch(err) {
        console.error("thisFn call private para fail;");
        console.error(err);
      }
      
      try {
        console.log(this.thisPara);
      }
      catch(err) {
        console.error("thisFn call this para fail;");
        console.error(err);
      }
      
      try {
        console.log(TestFn.prototype.proPara);
      }
      catch(err) {
        console.error("thisFn call pro para fail");
        console.error(err);
      }

      try {
        console.log(TestFn.staticPara);
      }
      catch(err) {
        console.error("thisFn call static para fail");
        console.error(err);
      }
    }
  }

  TestFn.prototype.proFn = function() {
      try {
        console.log(a);  
      }
      catch(err) {
        console.error("proFn call private para fail;");
        console.error(err);
      }
      
      try {
        console.log(this.thisPara);
      }
      catch(err) {
        console.error("proFn call this para fail;");
        console.error(err);
      }
      
      try {
        console.log(TestFn.prototype.proPara);
      }
      catch(err) {
        console.error("proFn call pro para fail");
        console.error(err);
      }

      try {
        console.log(TestFn.staticPara);
      }
      catch(err) {
        console.error("proFn call static para fail");
        console.error(err);
      }
  }

  TestFn.prototype.proPara = "proPara";

  TestFn.staticPara = "staticPara";
  TestFn.staticFn = function() {
      try {
        console.log(a);  
      }
      catch(err) {
        console.error("static fn call private para fail;");
        console.error(err);
      }
      
      try {
        console.log(this.thisPara);
      }
      catch(err) {
        console.error("static fn call this para fail;");
        console.error(err);
      }
      
      try {
        console.log(TestFn.prototype.proPara);
      }
      catch(err) {
        console.error("static fn call pro para fail");
        console.error(err);
      }

      try {
        console.log(TestFn.staticPara);
      }
      catch(err) {
        console.error("static fn call static para fail");
        console.error(err);
      }  
  }

  let testFn = new TestFn();
  console.log("thisFn===============================")
  testFn.thisFn();
  console.log("proFn================================")
  testFn.proFn();
  console.log("staticFn=================================")
  TestFn.staticFn();
}

/*
  测试实例对象能否调用this，原型链和静态上参数。
 */
function test4FnInstanceCallPara() {
  function TestFn() {
    let a = "a";
    this.thisPara = "thisPara";
  }

  TestFn.prototype.proPara = "proPara";
  TestFn.staticPara = "staticPara";

  let testFn = new TestFn();

  try {
    console.log("instance call private para")
    console.log(testFn.a)
  }
  catch(err) {
    console.error("instance call private para fail")
    console.error(err);  
  }

  try {
    console.log("instance call this para");
    console.log(testFn.thisPara);
  }
  catch(err) {
    console.error("instance call this para fail")
    console.error(err);
  }

  try {
    console.log("instance call pro para");
    console.log(testFn.proPara);
  }
  catch(err) {
    console.error("instance call pro para fail")
    console.error(err);
  }

  try {
    console.log("instance call static para");
    console.log(testFn.staticPara);
  }
  catch(err) {
    console.error("istance call static para fail");
    console.error(err);
  }
}

function testClassBind() {
  class bindClass {
    constructor(value) {
      this.value = value || 0;
    }

    bindFn() {
      console.log(this.value);
    }
  }

  let a = new bindClass("a");
  let objA = {
    value:"objA"
  };
  let bindA = a.bindFn.bind(objA);
  let bindB = a.bindFn.bind(objA);
  debugger;
  console.log(bindA === bindB);
}



// 如果已经实例化 就直接返回保存的实例 如果没有 就初始化实例 并返回

// let getInstance = (function() {
//   let _instance;
//   return function(newInstanceType) {
//     if (typeof _instance !== newInstanceType) {
//       _instance = new newInstanceType();
//     } 
//     return _instance;
//   }
// })()


function test4SingleFn() {
  class Test4Single {
    constructor(para) {
      this.para = para || "name";

      if (Test4Single.single === void 0) {
        Test4Single.single = this;
      }

      return Test4Single.single;
    }

    print() {
      console.log(this.para);
    }
  }

  let test4Single1 = new Test4Single("aa");
  let test4Single2 = new Test4Single("bb");
  test4Single1.print();
  test4Single2.print();
  console.log(test4Single1 === test4Single2);
}


// 测试如果直接调用一个class和new一个class的区别
function test4Class() {
  class TestClass {
    constructor() {
      console.log("this is test class");
    }

    print() {
      console.log("this is print");
    }
  }

  let a = new TestClass();
  let b = TestClass();
}





