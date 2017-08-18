import $ from 'jquery';
import  * as util from '../../js/common/util'; 
import { getDomCount, action4EverySonDom, ButtonContent, setFrame} from '../../js/common/domoperation';
import { selectable, align, Align } from '../../js/common/interaction';
import { mySelfAjaxTest, jqueryAjaxTest, originXmlHttpRequestTestReadyStateChange } from '../../js/module/ajaxtestmodule'
import { XmlHttpRequestRemould } from '../../js/common/XmlHttpRequestRemouldClass'
import { AjaxAopFnType } from "../../js/common/enum";
import { Loading } from '../../js/common/loadingClass'

$(() => {
  let xmlHttpRequestRemould = new XmlHttpRequestRemould()
  
  xmlHttpRequestRemould.addFn2Arr((para, that) => {
    console.log("before this is one");
  }, AjaxAopFnType.fnBeforeOpen)


  xmlHttpRequestRemould.addFn2Arr((that) => {
    console.log("after this is one")
  }, AjaxAopFnType.fnAfterDataReturn)

let xmlHttpRequestRemould2 = new XmlHttpRequestRemould() 

  xmlHttpRequestRemould2.addFn2Arr((para, that) => {
    console.log("before this is two");
  }, AjaxAopFnType.fnBeforeOpen)


  xmlHttpRequestRemould2.addFn2Arr((that) => {
    console.log("after this is two")
  }, AjaxAopFnType.fnAfterDataReturn)





  // jqueryAjaxTest();
  debugger;
    var xhr = new XMLHttpRequest();
    xhr.open("get", "http://" + document.domain  + ":8088/delayloadtest" + "?para0=1000");
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            console.log(xhr.response);
            console.log(xhr.responseText);
        } 
    }           
    xhr.send(null);   

  // let btnRefresh = document.querySelector("#btnRefresh");
  // btnRefresh.addEventListener("click", (evt) => {
  //   mySelfAjaxTest();
  // })

  // mySelfAjaxTest();
})