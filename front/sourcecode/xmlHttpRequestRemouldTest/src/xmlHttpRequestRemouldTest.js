import $ from 'jquery';
import  * as util from '../../js/common/util'; 
import { getDomCount, action4EverySonDom, ButtonContent, setFrame} from '../../js/common/domoperation';
import { selectable, align, Align } from '../../js/common/interaction';
import { mySelfAjaxTest, jqueryAjaxTest, originXmlHttpRequestTestReadyStateChange, fetchTest } from '../../js/module/ajaxtestmodule'
import { XmlHttpRequestRemould } from '../../js/common/XmlHttpRequestRemouldClass'
import { AjaxAopFnType } from "../../js/common/enum";
import { Loading } from '../../js/common/loadingClass'

$(() => {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "http://" + document.domain  + ":8088/delayloadtest" + "?para0=10000");
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            console.log(xhr.response);
            console.log(xhr.responseText);
        } 
    }           
    xhr.send(null); 

    $("#btnRefresh").on("click", (evt) => {
      xhr.abort();
      console.log("readyState " + xhr.readyState.toString());
      console.log("status " + xhr.status.toString());
    })
})

