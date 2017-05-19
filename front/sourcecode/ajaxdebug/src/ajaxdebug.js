import * as util from '../../js/common/util.js'
import * as ajaxtestmodule from '../../js/module/ajaxtestmodule'

let oldFetch = window.fetch;
window.fetch = function() {
    var arr = [].slice.call(arguments);
    return oldFetch.apply(this, arr);
}

$(function(){
  util.promiseAop();
  ajaxtestmodule.fetchTest();  
})

