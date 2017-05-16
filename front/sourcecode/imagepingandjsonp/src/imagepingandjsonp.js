import * as util from '../../js/common/util'
    
$(function(){
  useJqueryAjax();
})
    
function imgPing() {
    var img = new Image();
    img.onload = img.onerror = function() {
        alert("done");
    }
    img.src = "http://10.9.233.35:8080/demos/data?example=common/datasource/with_select/"            
}

function handleResponse(value) {
    var keys = Object.keys(value);
    for (var i = 0; i < keys.length; i++) {
        console.log(keys[i] + ":" + value[keys[i]]);
    }
}

function jsonpFunc() {
    var script = document.createElement("script");
    script.src = "http://10.9.235.47:8088/test4Jsonp?callback=handleResponse";
    document.body.insertBefore(script, document.body.firstChild);
}

function useJqueryAjax() {
   // 表面上是走ajax实际上用的还是jsonp，需要创建一个script，然后在里面插入代码，我只能说这个接口真是不怎么样
   $.ajax({
        url:"http://10.9.235.47:8088/test4Jsonp?callback=?",   
        dataType:"jsonp",
        jsonpCallback:"handleResponse",
        success:function(data){
            alert(data);
        }
   });            
}

      
