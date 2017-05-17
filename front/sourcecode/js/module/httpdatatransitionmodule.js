import * as util from '../common/util.js';

var path = util.getHost();

// 向后端跨域传json的两种方式，区别只在于后端的处理，前端只是在于有没有添加消息头。
export function postJsonWithContentype() {
    var xhr = new XMLHttpRequest();
    xhr.open("post", path + "sendJsonClientCROS", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            alert(xhr.responseText);
        }
    }
    var sendJson = {
        "num": "1"
    };
    xhr.send(JSON.stringify(sendJson));
}

export function postJsonWithoutContentype() {
    var xhr = new XMLHttpRequest();
    xhr.open("post", path + "sendJsonWithoutContentype", false);
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            alert(xhr.responseText);
        }
    }
    var sendJson = {
        "num": "1"
    };
    xhr.send(JSON.stringify(sendJson));
}

// formData传输的时候content-type会直接变为multipart/form-data,传输的消息内容变了，但还是会受到消息头设置的影响 
export function formPost() {
    var formData = new FormData(),
        xhr = new XMLHttpRequest();
    formData.append("test", "name");
    xhr.open("post", path + "getFormClient", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            alert(xhr.responseText);
        }
    }

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(formData);
}

export function postText() {
    var xhr = new XMLHttpRequest();
    xhr.open("post", path + "sendTextClient", true);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            alert(xhr.responseText);
        }
    }
    xhr.send("test=8");
}

// 普通的application/x-www-form-urlencoded例子，如果使用formData作为传输结构，content-type会直接变为multipart/form-data 
export function postMulFormText() {
    var xhr = new XMLHttpRequest();
    xhr.open("post", path + "sendFormClient", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            alert(xhr.responseText);
        }
    }
    xhr.send("test=name");
}

export function postMulFormFormData(parseType) {
    var xhr = new XMLHttpRequest();
    var formData = new FormData();
    switch (parseType) {
        case "multiparty":
            xhr.open("post", path + "sendFormDataParseByMultiparty", true);
            break;
        case "busboy":
            xhr.open("post", path + "sendFormDataParseByBusboy", true);
            break;
        case "connect-multiparty":
            xhr.open("post", path + "sendFormDataParseByConnectMultiparty", true);
            break;
    }

    formData.append("中文", "联通");
    formData.append("num", "1");
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            alert(xhr.responseText);
        }
    }
    xhr.send(formData);
}

export function postXml() {}
