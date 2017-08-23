import {generalAjax} from '../common/ajax.js';
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

// export function jqueryAjaxTest() {
//     function postTest() {
//       $.ajax({
//           url: "http://" + document.domain  + ":8088/delayloadtest",
//           type: 'post',
//           async : true,
//           datatype: "json",
//           contentType:"application/json",
//           data:JSON.stringify({para0:1000}),
//           success:function(data) {
//               console.log("post " + data);
//           },
//           error:function(data) {
//               console.error(data);
//           }
//       })        
//     }

//     function getTest() {
//       $.ajax({
//           url: "http://" + document.domain  + ":8088/delayloadtest",
//           type: 'get',
//           async : true,
//           datatype: "json",
//           contentType:"application/json",
//           data:{para0:1000},
//           success:function(data) {
//               console.log("get " + data);
//           },
//           error:function(data) {
//               console.error(data);
//           }
//       })        
//     }

//     postTest();
//     getTest();
// }

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

export { jqueryAjaxTest };

export function mySelfAjaxTest() {
  function getTest() {
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
  }

  function postTest() {
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

  getTest();
  postTest();
}



