import $ from 'jquery';
import * as util from '../../js/common/util'
import * as ajaxtestmodule from '../../js/module/ajaxtestmodule'
// import globalTest from 'globalTest'

let oldFetch = window.fetch;
window.fetch = function() {
    var arr = [].slice.call(arguments);
    return oldFetch.apply(this, arr);
}

$(function(){
  util.promiseAop();
  ajaxtestmodule.fetchTest(); 
  // globalTest();
  console.log("test");
})

