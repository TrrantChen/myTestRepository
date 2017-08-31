import {getHost} from '../common/util.js';
import {generalAjax} from '../common/ajax.js';
import { autoDownloadUrl } from '../../js/common/domoperation' 
import {string2ab8} from '../../js/common/filedataoperation'
import $ from 'jquery';

const path = getHost();

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

// 测试各种发送数据的默认content-type；
export function test4SendDataAndDefaultContentTyle() {
  let testStr = "this is test";
  let ab = string2ab8(testStr)
  let blob = new Blob([ab]); 
  let formData = new FormData("");
  formData.append("testStrKey", testStr);

  let testObj = {
    "ArrayBuffer": ab,
    "Blob":blob,
    "Document":document,
    "String":testStr,
    "FormData":formData
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

// 向后端跨域传json的两种方式，区别只在于后端的处理，前端只是在于有没有添加消息头。
export function postJsonWithContentype() {
    var xhr = new XMLHttpRequest();
    xhr.open("post", path + "uploadJsonClientCROS", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            console.log(xhr.responseText);
        }
    }
    var sendJson = {
        "num": "1"
    };
    xhr.send(JSON.stringify(sendJson));
}

export function postJsonWithoutContentype() {
    var xhr = new XMLHttpRequest();
    xhr.open("post", path + "uploadJsonWithoutContentype", false);
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            console.log(xhr.responseText);
        }
    }
    var sendJson = {
        "num": "1"
    };
    xhr.send(JSON.stringify(sendJson));
}

// 使用formData进行传输，content-type会默认变为multipart/form-data，但如果在requestHeader进行设置，还是会改变content-type的
export function formPost() {
    var formData = new FormData(),
        xhr = new XMLHttpRequest();
    formData.append("test", "name");
    xhr.open("post", path + "getFormClient", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            console.log(xhr.responseText);
        }
    }

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(formData);
}

export function postString() {
    var xhr = new XMLHttpRequest();
    xhr.open("post", path + "uploadText", true);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            console.log(xhr.responseText);
        }
    }
    xhr.send("test=8");
}

export function postDefaultFormText() {
    var xhr = new XMLHttpRequest();
    xhr.open("post", path + "uploadForm", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            console.log(xhr.responseText);
        }
    }
    xhr.send("test=name");
}

export function postMulFormFormData(parseType) {
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    switch (parseType) {
        case "multiparty":
            xhr.open("post", path + "uploadFormDataParseByMultiparty", true);
            break;
        case "busboy":
            xhr.open("post", path + "uploadFormDataParseByBusboy", true);
            break;
        case "connect-multiparty":
            xhr.open("post", path + "uploadFormDataParseByConnectMultiparty", true);
            break;
    }

    formData.append("中文", "联通");
    formData.append("num", "1");
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            console.log(xhr.responseText);
        }
    }
    xhr.send(formData);
}

export function postXml() {}

/*------------通过promise或者async解决异步+for循环嵌套问题------------*/
  /*
    问题原型为
    for (i) {
      异步发送文件切割片到后端(i)
    }
    为了保证发送到后端的文件切割片顺序是一致，异步回调需要嵌套。
    解决方案为使用promise或者async + 递归来解决。
   */
  function getPromise(i, blobArr) {
    return new Promise((resolve, reject) => {
      uploadFile(blobArr[i], path + "test4PostWithoutThridPart", (result) => {
        console.log(result);  
        resolve(i)
      });    
    })
  }

  function slicePromise(promise, i, max, blobArr) {
    promise.then((result) => {
      console.log(result);
      ++i;
      if (i < max) { 
        let promise  = getPromise(i, blobArr)
        slicePromise(promise, i, max, blobArr);
      }
    })
  }

  async function slicePromise(i, blobArr, max) {
    let result = await getPromise(i, blobArr);
    ++i;
    if (i < max) {
      slicePromise(i, blobArr, max);
    }
  }
/*------------通过promise或者async解决异步+for循环嵌套问题------------*/




