import $ from 'jquery';
import  * as util from '../../js/common/util'; 
import { getDomCount, action4EverySonDom, ButtonContent, setFrame} from '../../js/common/domoperation';
import { selectable, align, Align } from '../../js/common/interaction';
import '../../../node_modules/babel-polyfill/browser'
import { mySelfAjaxTest, jqueryAjaxTest, originXmlHttpRequestTestReadyStateChange } from '../../js/module/ajaxtestmodule'
import { XmlHttpRequestRemould } from '../../js/common/XmlHttpRequestRemouldClass'
$(() => {

  let xmlHttpRequestRemould = new XmlHttpRequestRemould();
  xmlHttpRequestRemould.setFnBeforeOpen((para, that) => {
    console.log("========================before====================")
    console.log(para);
    console.log(that);
    console.log("========================before====================")
  })

  xmlHttpRequestRemould.setFnAfterDataReturn((that) => {
    console.log("========================after====================")
    console.log(that);
    console.log("========================after====================")
  })
  // mySelfAjaxTest();
  jqueryAjaxTest();
  // originXmlHttpRequestTestReadyStateChange();
})