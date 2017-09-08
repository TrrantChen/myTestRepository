import * as util from '../../js/common/util'
import {generalAjax} from '../../js/common/ajax'
    
let path = util.getHost();

let btnTest = document.querySelector("#btnTest");
let textareaTest = document.querySelector("#textareaTest");
let showContent = document.querySelector("#showContent");

// 输入值可以是"<img src='abc' onerror ='alert(1)' >"
btnTest.addEventListener("click", (evt) => {
  let option = {
      url:"http://" + document.domain  + ":8088/downloadHtml"
      ,data:textareaTest.value
      ,type:"post"
      ,contentType:"text/javascript"
      ,datatype: "document"
      ,success:function(result) {
        showContent.innerHTML = `<a onclick=location= "${result}">test</a>`;
      }
      ,error:function(readyState, status) {
      }
  }   
  generalAjax(option);    
}) 
