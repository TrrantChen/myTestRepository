/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-11-15 15:59:11
 * @version $Id$
 */

define(["common", "underscore"], function(common) {
    // option httpmethod async contentType data dataType url isUpload 
    function generalAjax(option) {
        var xhr = new XMLHttpRequest();
        option = option || {};
        var defaultOption = {
            httpmethod: "get",
            async: true,
            contentType: "",
            data: null,
            dataType: "text",
            isUpload:false
        };

        if (option.url === void 0) {
            console.log("ajax url must not undefine");
            return 
        }

        if (Object.assign != void 0) {
            option = Object.assign(defaultOption, option)
        } else {
            option = _.assign(defaultOption, option)
        }
            
        
        if (option.httpmethod.toLowerCase() == "get" && option.data !== null && !common.isEmptyObject(option.data)) {
            option.url += ("?" + common.obj2keyValueString(option.data))
        }      

        xhr.open(option.httpmethod, option.url, option.async);

        if (option.contentType !== "") {
            xhr.setRequestHeader("Content-type", option.contentType);
        }

        if (xhr.onload !== void 0) {
            xhr.onload = function() {
                if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200" && option.success != void 0) {
                    option.success(xhr.response);
                } else {
                    if (option.error != void 0) {
                        option.error(xhr.readyState, xhr.status);
                    }
                }              
            }
        } else {
            xhr.onreadystatechange = function() {
                if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200" && option.success != void 0) {
                    option.success(xhr.response);
                } else {
                    if (option.error != void 0) {
                        option.error(xhr.readyState, xhr.status);
                    }
                }
            }            
        }

        registerEvent(xhr, option)

        if (option.httpmethod.toLowerCase() == "post") {
            xhr.send(option.data);
        } else {
            xhr.send(null);
        }

        if (option.dataType !== "") {
            xhr.responseType = option.dataType;
        }      
    }

    function registerEvent(xhr, option) {
        var eventArray = ["onabort","onerror","onloadend","onloadstart","onprogress","ontimeout"];  
        if (option.isUpload == true) {
            for (var i = 0; i < eventArray.length; i++) {
                if (option[eventArray[i]] !== void 0) {
                    xhr.upload[eventArray[i]] = option[eventArray[i]];
                }
            }                
        } else {
            for (var i = 0; i < eventArray.length; i++) {
                if (option[eventArray[i]] !== void 0) {
                    xhr[eventArray[i]] = option[eventArray[i]];
                }
            }             
        }
    }

    return {
        generalAjax: generalAjax
    }
})