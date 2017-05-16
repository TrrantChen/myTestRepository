import * as util from '../../js/common/util'
import * as othertestmodule from '../../js/module/othertestmodule'    
// function xmlHttpRequestRemould() {
//     var send = window.XMLHttpRequest.prototype.send;
//     function replaceSend() {
//         var paras = Array.prototype.slice.call(arguments, 0);
//         console.log("selfSend");
//         if (this.onload) {
//             this.tmponload = this.onload;
//             this.onload = replaceOnLoad;
//         }

//         if (this.onreadystatechange) {
//             this.tmponreadystatechange = this.onreadystatechange;
//             this.onreadystatechange = replaceOnReadyChange;
//         } 

//         if (this.onerror) {
//             this.tmponerror = this.onerror; 
//             this.onerror = replaceOnError;
//         }

//         return send.apply(this, arguments);
//     }

//     function replaceOnReadyChange() {
//         console.log("onreadychange " + this.readyState);
//         return this.tmponreadystatechange.apply(this, arguments);
//     }

//     function replaceOnLoad() {
//         console.log("onload ")
//         return this.tmponload.apply(this, arguments);
//     }

//     function replaceOnError() {
//         console.log("onError");
//         return this.tmponerror.apply(this, arguments);
//     }

//     XMLHttpRequest.prototype.send = replaceSend;               
// };
// function iframeTest() {
// }
// xmlHttpRequestRemould();

// jQuery( document ).ready(function() {
//     $(".showButton").on("click", function(){
//         loading.show()
//     }) 

//     $(".hideButton").on("click", function() {
//         loading.hideOnce();
//     })                              
// })

othertestmodule.verifyTheNormalAjaxResult("get", "delayloadtest", 5000);
// othertestmodule.verifyTheNormalAjaxResult("get", "delayloadtest", 0); 

// $.ajax({
//     url: "http://" + document.domain  + ":8088/delayloadtest",
//     type: 'get',
//     async : true,
//     data:JSON.stringify({para0:0})
// }).then(function(data){
//     console.log(data);
// })

// $.ajax({
//     url: "http://" + document.domain  + ":8088/delayloadtest",
//     type: 'post',
//     async : true,
//     datatype: "json",
//     contentType:"application/json",
//     data:JSON.stringify({para0:5000})
// }).then(function(data){
//     console.log(data);
// }, function(data){
//     console.log(data);
// })

// var subframeLeft = document.getElementById("subframeLeft");
// var subframeRight = document.getElementById("subframeRight"); 

// subframeLeft.onload = function() {
//     console.log("a")
// }

// subframeLeft.src = "./ajaxdebug.html";
// subframeRight.src = "./fileChange2base64.html";

// subframeLeft.onload = function() {
//     console.log("b")
// }        


        
 