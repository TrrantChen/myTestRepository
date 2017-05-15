<!DOCTYPE HTML>
<html>




<script src="../lib/jquery/jquery-2.1.4.js" type="text/javascript"></script>
<script src="../lib/angular/angular.js" type="text/javascript"></script>
<script src="../lib/bootstrap/js/bootstrap.js" type="text/javascript"></script>
<script type="text/javascript">
jQuery(document).ready(function() {
    test4postJson()
});

function test4get1() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "/ajaxtest/test1?t=10086", false);
    xhr.send(null);
    var resultStr = " xhr.responseText " + xhr.responseText + "\n xhr.responseXML " + xhr.responseXML + "\n xhr.responseType " + xhr.responseType + "\n xhr.readyState " + xhr.readyState
    alert(resultStr)
}

function test4get2() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "/ajaxtest/test1", false);
    xhr.send("t=10086");
    var resultStr = " xhr.responseText " + xhr.responseText + "\n xhr.responseXML " + xhr.responseXML + "\n xhr.responseType " + xhr.responseType + "\n xhr.readyState " + xhr.readyState
    alert(resultStr)
}

function test4post() {
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/ajaxtest/posttest", false)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("fname=Bill&lname=Gates");
    var resultStr = " xhr.responseText " + xhr.responseText + "\n xhr.responseXML " + xhr.responseXML + "\n xhr.responseType " + xhr.responseType + "\n xhr.readyState " + xhr.readyState
    alert(resultStr)
}

function test4postJson() {
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/ajaxtest/posttest4json", false)
    xhr.setRequestHeader("Content-type", "application/json");
    var obj = {
        name: 'testpost'
    }
    xhr.send(JSON.stringify(obj));
    var resultStr = " xhr.responseText " + xhr.responseText + "\n xhr.responseXML " + xhr.responseXML + "\n xhr.responseType " + xhr.responseType + "\n xhr.readyState " + xhr.readyState
    alert(resultStr)
}

function test4postText() {
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/ajaxtest/posttest4text", false)
    xhr.setRequestHeader("Content-type", "text/html");
    xhr.send("<div>test</div>");
    var resultStr = " xhr.responseText " + xhr.responseText + "\n xhr.responseXML " + xhr.responseXML + "\n xhr.responseType " + xhr.responseType + "\n xhr.readyState " + xhr.readyState
    alert(resultStr)
}

function getDataByJqueryAjax() {
    $.ajax({
        url: "/demo/promise/test1",
        type: 'get',
        dataType: 'json',
        async: true,
        contentType: "application/json",
        data: JSON.stringify({})
    }).done(function(result) {
        alert(result.result);
    });
}

function classicFunc() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "/ajaxtest/classicFunc", true);
    xhr.onreadystatechange = function() {
        stateChange(xhr.readyState.toString(), xhr.status.toString(), xhr.responseText);
    }
    xhr.send(null);
}

function xmlhttprequestlevel2testTimeout() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "/ajaxtest/xmlhttprequestlevel2testTimeout", true);
    xhr.onreadystatechange = function() {
        stateChange(xhr.readyState.toString(), xhr.status.toString(), xhr.responseText);
    }
    xhr.timeout = 150;
    xhr.ontimeout = function(event) {　　　　
        alert('请求超时！');　　　　
    }
    xhr.send(null);
}

function xmlhttprequestlevel2testFormData() {

}

function xmlhttprequestCORS() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "http://10.9.235.86:10087/CORS/test1", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4") {
            if (xhr.status.toString() == "200") {
                alert(xhr.responseText);
            }
        }
    }
    xhr.send(null);
}

function stateChange(readyState, status, result) {
    switch (readyState) {
        case "0":
        case "1":
        case "2":
        case "3":
            console.log(readyState);
            break;
        case "4":
            console.log(status);
            console.log(readyState);
            if (status == "200") {
                alert(result)
                console.log(status);
            }
            break;
        default:
            console.log("error");
            break;
    }
}
</script>


