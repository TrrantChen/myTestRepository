/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-08-23 11:07:06
 * @version $Id$
 */

import $ from 'jquery';
import  * as util from '../../js/common/util'; 

$(() => {
  existObjgetset();
})

function simpleObjgetset() {
  let testObj = {
    para:1
  };

  Object.defineProperty(testObj, "fn", {
    set:function(value) {
      console.log("set before")
      this.tmp = value;
      console.log("set after");
    },
    get:function() {
      console.log("get before");
      return this.tmp;
    }
  })

  testObj.fn = function(num) {
    console.log(num);
  }

  testObj.fn(1);  
}
