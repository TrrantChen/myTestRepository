import $ from 'jquery';
import  * as util from '../../js/common/util'; 
import { getDomCount, action4EverySonDom, ButtonContent, setFrame} from '../../js/common/domoperation';
import { selectable, align, Align } from '../../js/common/interaction';
import { mySelfAjaxTest, jqueryAjaxTest, originXmlHttpRequestTestReadyStateChange, fetchTest, getFileWithOverrideMimeType, getFileWithResponceTyle, test4SendDataAndDefaultContentTyle } from '../../js/module/ajaxtestmodule'
import { XmlHttpRequestRemould } from '../../js/common/XmlHttpRequestRemouldClass'
import { AjaxAopFnType } from "../../js/common/enum";
import { Loading } from '../../js/common/loadingClass'


$(() => {
  $("#btnRefresh").on("click", (evt) => {
    // var script = document.createElement("script");
    // script.src = "http://10.9.234.79:26180/vmaxmetadata/metadatamanage/common/language?";
    // document.body.insertBefore(script, document.body.firstChild);
     $.ajax({
          type: "GET",
          url:"http://10.9.234.79:26180/vmaxmetadata/metadatamanage/common/language",   
          dataType:"jsonp",
          jsonp: 'callback',
          jsonpCallback:"handleResponse",
          success:function(data){
            console.log(data);
          },
          error:function(xhr, status, error) {
            console.log(status + '; ' + error);
          }
     });    
  })
})

window.handleResponse = function(value) {
  console.log(value);
}



