import $ from 'jquery';
import  * as util from '../../js/common/util'; 
import { getDomCount, action4EverySonDom, ButtonContent, setFrame} from '../../js/common/domoperation';
import { selectable, align, Align } from '../../js/common/interaction';
import { mySelfAjaxTest, jqueryAjaxTest, originXmlHttpRequestTestReadyStateChange } from '../../js/module/ajaxtestmodule'
import { XmlHttpRequestRemould } from '../../js/common/XmlHttpRequestRemouldClass'
import { AjaxAopFnType } from "../../js/common/enum";

$(() => {
  let xmlHttpRequestRemould = new XmlHttpRequestRemould();
  xmlHttpRequestRemould.addFn2Arr((para, that) => {
    console.log("========================before====================")
    console.log(para);
    console.log(that);
    console.log("========================before====================")
  }, AjaxAopFnType.fnBeforeOpen)


  xmlHttpRequestRemould.addFn2Arr((that) => {
    console.log("========================after====================")
    console.log(that);
    console.log("========================after====================")
  }, AjaxAopFnType.fnAfterDataReturn)
  mySelfAjaxTest();
  // jqueryAjaxTest();
  // originXmlHttpRequestTestReadyStateChange();
})