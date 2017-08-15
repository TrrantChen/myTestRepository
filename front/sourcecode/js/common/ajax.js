import * as util from "./util";

/*
option = {
  url
  ,type
  ,async
  ,contentType
  ,data
  ,dataType
  ,isUpload
  ,success:callback
  ,error:callback
  ,onabort:callback
  ,onerror:callback
  ,onloadend:callback
  ,onloadstart:callback
  ,onprogress:callback
  ,ontimeout:callback
}
 */
export function generalAjax(option) {
    var xhr = new XMLHttpRequest();
    option = option || {};
    var defaultOption = {
        type: "get",
        async: true,
        contentType: "",
        data: null,
        dataType: "text",
        isUpload: false
    };

    if (option.url === void 0) {
        console.log("ajax url must not undefine");
        return
    }

    option = Object.assign(defaultOption, option)


    if (option.type.toLowerCase() == "get" && option.data !== null && !util.isEmptyObject(option.data)) {
        option.url += ("?" + util.obj2keyValueString(option.data))
    }

    xhr.open(option.type, option.url, option.async);

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

      if (option.type.toLowerCase() == "post") {
        try {
          xhr.send(option.data); 
        }
        catch(err) {
          console.error(err);
          if (option.error != void 0) {
              option.error(xhr.readyState, xhr.status);
          }             
        }
          
      } else {
        try {
          xhr.send(null);
        }
        catch(err) {
          console.error(err);
          if (option.error != void 0) {
              option.error(xhr.readyState, xhr.status);
          }           
        }        
      }        

    if (option.dataType !== "") {
        xhr.responseType = option.dataType;
    }
}

function registerEvent(xhr, option) {
    var eventArray = ["onabort", "onerror", "onloadend", "onloadstart", "onprogress", "ontimeout"];
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

