/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-11-15 15:59:11
 * @version $Id$
 */

define(["common"], function(common) {
    function generalAjax(option) {
        option = option || {};
        var defaultOption = {
            httpmethod: "get",
            async: true,
            contentType: "",
            data: null,
            dataType: "text"
        };

        if (option.url === void 0) {
            console.log("ajax url must not undefine");
            return 
        }
        option = Object.assign(defaultOption, option)
        var xhr = new XMLHttpRequest();


        if (option.contentType !== "") {
            xhr.setRequestHeader("Content-type", option.contentType);
        }

        if (option.dataType !== "") {
            xhr.responseType = option.dataType;
        }        

        xhr.open(option.httpmethod, option.url, option.async);
        if (xhr.onload !== void 0) {
            xhr.onload = function() {
                if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
                    option.success(xhr.response);
                }                
            }
        } else {
            xhr.onreadystatechange = function() {
                if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
                    option.success(xhr.response);
                }
            }            
        }

        if (option.onloadstart !== void 0) {
            xhr.upload.onloadstart = option.onloadstart;
        }

        if (option.onprogress !== void 0) {
            xhr.upload.onprogress = option.onprogress;
        }

        if (option.onerror !== void 0) {
            xhr.onerror = option.onerror;
        }

        if (option.httpmethod.toLowerCase() == "post") {
            xhr.send(option.data);
        } else {
             xhr.send(null);
        }
        
    }

    return {
        generalAjax: generalAjax
    }
})