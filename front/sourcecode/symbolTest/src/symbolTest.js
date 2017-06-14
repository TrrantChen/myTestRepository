/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-06-14 14:16:57
 * @version $Id$
 */

import $ from 'jquery';
import * as util from '../../js/common/util'; 
import './module';

$(() => {
  test4SymbolIterator();
})

/*
  作为obj属性的标志之一
 */
function normalUse4Symbol() {
  let symbol = Symbol();
  Object.prototype[symbol] = () => {
    console.log("this is  symbol");
  }

  let o = {}
  o[symbol]();
}

/*
  从别的模块中引入重名的symbol，不会出现问题
 */
function repeatNameFromOtherModule() {
  var sy1 = Symbol();
  Object.prototype[sy1] = function() {
    console.log("this is sy1")
  };

  let o = {}
  console.log(o);
}

/*
  如果需要获取object上的symbol属性，只能使用getOwnPropertySymbols，
  keys和getOwnPropertyNames是不行的
 */
function checkSymbolProperty() {
  let symbol = Symbol();
  Object.prototype[symbol] = () => {
    console.log("this is  symbol");
  }
  console.log(Object.keys(Object.prototype));
  console.log(Object.getOwnPropertyNames(Object.prototype));
  console.log(Object.getOwnPropertySymbols(Object.prototype));
}

function test4SymbolIterator() {
  function Test() {
    this.name = "test";
    this.age = 30;
    this.num = 1;
    let a = 2;
    let b = 3;
  }

  Test.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]

  let test = new Test();

  for(var a of test) {
    console.log(a);
  }

  


}
