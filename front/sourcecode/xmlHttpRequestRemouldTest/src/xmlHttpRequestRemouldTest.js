import $ from 'jquery';
import  * as util from '../../js/common/util'; 
import { getDomCount, action4EverySonDom, ButtonContent, setFrame} from '../../js/common/domoperation';
import { selectable, align, Align } from '../../js/common/interaction';
import { mySelfAjaxTest, jqueryAjaxTest, originXmlHttpRequestTestReadyStateChange, fetchTest } from '../../js/module/ajaxtestmodule'
import { XmlHttpRequestRemould } from '../../js/common/XmlHttpRequestRemouldClass'
import { AjaxAopFnType } from "../../js/common/enum";
import { Loading } from '../../js/common/loadingClass'


$(() => {
  jqueryAjaxTest.getTest();
  $("#btnRefresh").on("click", (evt) => {
    jqueryAjaxTest.getTest();
  })
})



