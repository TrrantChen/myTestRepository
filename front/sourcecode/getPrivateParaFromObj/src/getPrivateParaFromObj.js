/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-06-23 10:03:18
 * @version $Id$
 */
import $ from 'jquery';
import * as util from '../../js/common/util'; 
import { getDomCount, action4EverySonDom } from '../../js/common/domoperation';
import { getAllObjPara } from '../../js/common/symbolManage';

$(() => {
  function foo() {
    let obj = {
      a:1
      ,b:2
    }

    return function(key) {
      return obj[key];
    }
  }

  Object.defineProperty(Object.prototype, getAllObjPara, {
    get() {
      return this;
    }
  })

  let fn = foo();
  let fnCpy = fn(getAllObjPara)
  console.log(fnCpy.a);
})

