import $ from 'jquery';
import _ from 'underscore'
import * as util from '../../js/common/util'
import {generalAjax} from '../../js/common/ajax'
import {createOpenFileInput} from '../../js/common/domoperation'
import { mySelfAjaxTest, jqueryAjaxTest, originXmlHttpRequestTestReadyStateChange, test4SendDataAndDefaultContentTyle } from '../../js/module/ajaxtestmodule'

let container = document.querySelector(".container");

$(() => {
  let n = 0;
  slicePromise(getPromise(n), n);
})

function testBlob() {
  let input = createOpenFileInput(container);
  input.addEventListener("change", (evt) => {
    let file = evt.target.files[0]
      , result = sliceBlob(file, 40)
      , length = result.length;

    slicePromise(getPromise(0), 0, length);

    evt.target.value = "";
  })
}

function sliceBlob(blob, size) {
  let result = []
    ,n = Math.ceil(blob.size / size);

  for (var i = 0; i < n; i++) {
    let tmp = null
    if (i === n - 1) {
      tmp = blob.slice(i * size, blob.size - 1);
    } else {
      tmp = blob.slice(i * size, i * size + size - 1);
    }
    result.push(tmp);
  }

  return result;
}

function getPromise(i) {
  return new Promise((resolve, reject) => {
    resolve(i)
  })
}

function slicePromise(promise, i, max) {
  ++i;
  if (i < max) {
    promise.then((result) => {
      console.log(result);
      let promise  = getPromise(i)
      slicePromise(promise, i, max);
    })
  }
}



