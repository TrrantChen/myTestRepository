import $ from '../../lib/jquery/jquery-2.2.3';
import * as util from '../../js/common/util'
import * as ajaxtestmodule from '../../js/module/ajaxtestmodule'
import globalTest from '../../lib/globalTest.js'

let oldFetch = window.fetch;
window.fetch = function() {
    var arr = [].slice.call(arguments);
    return oldFetch.apply(this, arr);
}

$(function(){
  util.promiseAop();
  ajaxtestmodule.fetchTest(); 
  globalTest();
})

