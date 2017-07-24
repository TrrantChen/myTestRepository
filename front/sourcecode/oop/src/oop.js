/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-07-24 14:25:27
 * @version $Id$
 */

import $ from 'jquery';

$(() => {
  test4FnInstanceCallPara();
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
}

class TestClass {
  constructor(value) {
    this.a = value;
  }

  static staticFn() {
    console.log("static")
    console.log(this);
    console.log(this.testPara);
  }

  testFn() {
    console.log("this fn")
    console.log(this);
    console.log(this.a);
  }
}

TestClass.testPara = 10


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


