import $ from 'jquery';
import _ from 'underscore'
import * as util from '../../js/common/util'
import * as ajaxtestmodule from '../../js/module/ajaxtestmodule'

let oldFetch = window.fetch;
window.fetch = function() {
    var arr = [].slice.call(arguments);
    return oldFetch.apply(this, arr);
}

$(function(){
  util.promiseAop();
  ajaxtestmodule.fetchTest(); 
  var arr = [1, 2, 3];
  _.forEach(arr, (num) => {
    console.log(num);
  })
  console.log("test");
})

