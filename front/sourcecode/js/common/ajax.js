import * as util from "./util";

export function loadingData(option) {
  let promise = new Promise((resolve, reject) => {
    ajaxOption.success = resolve;
    ajaxOption.error = reject;
    generalAjax(option);
  })
  return promise;
}

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
  let xhr = new XMLHttpRequest();
  option = option || {};
  let defaultOption = {
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

  xhr.onload !== void 0 ? xhr.onload = callback : xhr.onreadystatechange = callback
  
  function callback() {
    if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200" && option.success != void 0) {
      option.success(xhr.response);
    } else {
      if (option.error != void 0) {
        option.error(xhr.readyState, xhr.status);
      }
    }    
  }

  registerEvent(xhr, option)

  let sendData = null;

  switch (option.type.toLowerCase()) {
    case "post":
      sendData = option.data;
      break;
    case "get":
    default:
      sendData = null;
      break;
  }

  try {
    xhr.send(sendData);
  } catch (err) {
    console.error(err);
    if (option.error != void 0) {
      option.error(xhr.readyState, xhr.status);
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