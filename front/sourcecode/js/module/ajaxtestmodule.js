import {generalAjax} from '../common/ajax.js';
import { autoDownloadUrl } from '../../js/common/domoperation' 
import $ from 'jquery';

export function originXmlHttpRequestTestReadyStateChange() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "http://" + document.domain  + ":8088/delayloadtest" + "?para0=1000");
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            console.log(xhr.response);
        } 
    }           
    xhr.send(null);              
}

export function originXmlHttpRequestTestOnLoad() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "http://" + document.domain  + ":8088/delayloadtest" + "?para0=1000");
    xhr.onload = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            console.log(xhr.response);
        } 
    }           
    xhr.send(null);        
}

export function fetchTest() {
  let oldFetch = window.fetch;
  function fetch() {
    console.log("before1")
    return oldFetch.apply(this, arguments).then(function(response) {
      console.log("before2");
      return response;
    })
  }

  window.fetch = fetch;

  var fetchThen = fetch("http://" + document.domain  + ":8088/delayloadtest?para0=1000", { method: 'get' })
  fetchThen.then(function(response) {
      console.log("this is response");
      return response.text()
   })
  .then(function(result) {
      console.log("this is result");
      console.log(result);
  })
  .catch(function(err) {
      console.log(err);
  });        
}

let jqueryAjaxTest = {
  postTest:function() {
    $.ajax({
      url: "http://" + document.domain  + ":8088/delayloadtest",
      type: 'post',
      async : true,
      datatype: "json",
      contentType:"application/json",
      data:JSON.stringify({para0:1000}),
      success:function(data) {
        console.log("post " + data);
      },
      error:function(data) {
        console.error(data);
      }
    }) 
  },
  getTest:function() {
    $.ajax({
      url: "http://" + document.domain  + ":8088/delayloadtest",
      type: 'get',
      async : true,
      datatype: "json",
      contentType:"application/json",
      data:{para0:1000},
      success:function(data) {
        console.log("get " + data);
      },
      error:function(data) {
        console.error(data);
      }
    })     
  }
}

let mySelfAjaxTest = {
  getTest: function() {
    var option = {
        url:"http://" + document.domain  + ":8088/delayloadtest",
        data:{para0:1000},
        success:function(result) {
            console.log("self ajax " + result);
        }
        ,error:function(readyState, status) {
            console.error(readyState + " " + status);
        }
    }   

    generalAjax(option);        
  },
  postTest:function() {
    var option = {
        url:"http://" + document.domain  + ":8088/delayloadtest"
        ,data:JSON.stringify({para0:1000})
        ,type:"post"
        ,contentType:"application/json"
        ,datatype: "json"
        ,success:function(result) {
            console.log("self ajax post " + result);
        }
        ,error:function(readyState, status) {
            console.error(readyState + " " + status);
        }
    }   

    generalAjax(option);    
  } 
}

export { mySelfAjaxTest, jqueryAjaxTest };


// responseType的老式兼容方法，用于获取文件
export function getFileWithOverrideMimeType() {
  let client = new XMLHttpRequest();
  client.open("get", "http://" + document.domain  + ":8088/img/test.png");
  client.overrideMimeType('text/plain; charset=x-user-defined');
  client.onreadystatechange = function() {
    if (client.readyState.toString() === "4" && client.status.toString() === "200") {
      let tmp = [];
      let binStr = this.responseText;

      for (var i = 0, len = binStr.length; i < len; ++i) {
        var c = binStr.charCodeAt(i);
        // String.fromCharCode(c & 0xff);
        // var byte = c & 0xff;
        tmp.push(c); 
      };

      let u8 = new Uint8Array(tmp);
      let ab = u8.buffer;
      let blob = new Blob([ab]) 
      autoDownloadUrl("output.png", blob);     
    }
  }
  client.send(null);
}

// 新的方法，使用responseType设置为blob
export function getFileWithResponceTyle() {
  let client = new XMLHttpRequest();
  client.open("get", "http://" + document.domain  + ":8088/img/test.png");
  client.responseType = "blob";
  client.onreadystatechange = function() {
    if (client.readyState.toString() === "4" && client.status.toString() === "200") {
      let blob = client.response;
      autoDownloadUrl("output.png", blob);     
    }
  }
  client.send(null); 
}

// 测试各种发送数据的
export function test4SendDataAndDefaultContentTyle() {
  let ab = new ArrayBuffer(32);
  let blob = new Blob([ab]); 
  let formData = new FormData();
  let str = "test";

  let testObj = {
    "ArrayBuffer": ab
    ,"Blob":blob
    ,"Document":document
    ,"String":str
    ,"FormData":formData
  };

  for (var key in testObj) {
    let value = testObj[key];
    let keyName = key;
    let option = {
      url:"http://" + document.domain  + ":8088/test4DefaultContentType"
      ,data:value
      ,type:"post"
      ,success:function(result) {
        console.log(keyName + " " + result);
      }
      ,error:function(readyState, status) {
        console.error(readyState + " " + status);
      }
    }   
    generalAjax(option);    
  }
}



