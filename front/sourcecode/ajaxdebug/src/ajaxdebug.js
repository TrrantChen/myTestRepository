import $ from 'jquery';
import _ from 'underscore'
import * as util from '../../js/common/util'
import {generalAjax, loadingData} from '../../js/common/ajax'
import {createOpenFileInput} from '../../js/common/domoperation'
import {uploadFile, uploadFilePromise} from '../../js/common/filemodule'
import {mySelfAjaxTest, jqueryAjaxTest, originXmlHttpRequestTestReadyStateChange, test4SendDataAndDefaultContentTyle } from '../../js/module/ajaxtestmodule'
import {sliceBlob} from '../../js/common/filedataoperation'


let container = document.querySelector(".container")
  ,path = util.getHost();

$(() => {
  testBlob();
})

function testBlob() {
  let input = createOpenFileInput(container);
  input.addEventListener("change", (evt) => {
    let file = evt.target.files[0];
    uploadFilePromise(file, path + "test4PostWithoutThridPart").then((result) => {
      console.log(result)
    });
    evt.target.value = "";
  })
}







