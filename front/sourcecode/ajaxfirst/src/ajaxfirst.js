<!DOCTYPE HTML>
<html>

<head>
    <meta charset="UTF-8">
    <title>左右固定，中间自适应</title>
    <style type="text/css">
    * {
        padding: 0;
        margin: 0;
    }
    
    html,
    body {
        height: 100%;
    }
    
    .mainContent {
        position: relative;
        width: 100%;
        height: 100%;
        background: #60D2C2;
    }
    
    .left-content {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        height: 100%;
        width: 200px;
        background: #324257;
    }
    
    .middle-content {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 200px;
        left: 200px;
        height: 100%;
        background: #C86578;
    }
    
    .right-content {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        height: 100%;
        width: 200px;
        background: #324257;
    }
    
    .fileInput {
        width: 200px;
    }
    </style>
</head>

<body>
    <div class="mainContent">
        <div class="left-content"></div>
        <div class="middle-content">
            <div class="fileInput">
                <input type="file">
            </div>
        </div>
        <div class="right-content"></div>
    </div>
</body>
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

</html>
