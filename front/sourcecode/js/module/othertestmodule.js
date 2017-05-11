import util from '../common/util.js';
var path = util.getHost();

export function testPath() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", path + "serverPathTest", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
            alert(xhr.responseText);
        }
    }
    xhr.send(null);
}

export function formDataTest() {
    var formData = new FormData()
    formData.append("test", "name");
    formData.append("num", "1");
    console.log("formData get " + formData.get("test"));
    for (var key of formData.keys()) {
        console.log("formData key " + key)
    }
    for (var value of formData.values()) {
        console.log("formData value " + value)
    }
    for (var pair of formData.entries()) {
        console.log("formData entries " + pair[0] + " " + pair[1]);
    }
}

export function verifyTheNormalAjaxResult(connectType, url) {
    var paras = Array.prototype.slice.call(arguments, 2);
    var xhr = new XMLHttpRequest();
    switch (connectType) {
        case "get":
            var paraStr = paras.length == 0 ? "" : paras.map(function(para, index) {
                switch (index) {
                    case 0:
                        return "?para" + index + "=" + para
                    default:
                        return "&para" + index + "=" + para
                }
            }).reduce(function(a, b) {
                return a + b });
            xhr.open("get", path + url + paraStr, true);
            break;
        case "post":
            xhr.open("post", path + url, true);
            break;
    }
    var obj = {
        success: function(func) {
            xhr.onreadystatechange = function() {
                if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
                    if (func != void 0) {
                        func(xhr.responseText);
                    } else {
                        console.log(xhr.responseText);
                    }
                }
            }
        }
    }
    xhr.send(null);
    return obj;
}

export function promiseResult(connectType, url, delay) {
    var ajaxPromise = new Promise(function(resolve) {
        verifyTheNormalAjaxResult(connectType, url, delay).success(resolve);
    })
    return ajaxPromise;
}
