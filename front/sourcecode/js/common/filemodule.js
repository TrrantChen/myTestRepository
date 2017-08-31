import * as util from './util.js';
import * as ajax from './ajax.js';
import * as domoperation from './domoperation.js';

var path = util.getHost();

export function uploadFile(files, url, successCallback, isWithProcess) {
  isWithProcess = isWithProcess || false;
  successCallback = successCallback || function() { console.log("upload file success;") };

  var formData = new FormData();
  if (files instanceof FileList) {
    for (var i = 0; i < files.length; i++) {
      formData.append("fileBlob" + i.toString(), files[i]);
    }
  } else if (files instanceof Blob || files instanceof File) {
    formData.append("fileBlob0", files);
  }

  var option = {
    type: "post",
    async: true,
    data: formData,
    url: url,
    isUpload: true,
    success: successCallback
  }

  domoperation.setAjaxWithProcess(option, isWithProcess);
  ajax.generalAjax(option);
}

export function downloadFile(filePaths, url, successCallback, isWithProcess) {
  isWithProcess = isWithProcess || false;
  successCallback = successCallback || function() { console.log("download file success;") };
  var option = {
    type: "get",
    url: url,
    dataType: "blob",
    success: successCallback
  };

  domoperation.setAjaxWithProcess(option, isWithProcess);

  if (util.isArray(filePaths)) {
    for (var i = 0; i < filePaths.length; i++) {
      option.data = { path: filePaths[i] };
      ajax.generalAjax(option);
    }

  } else {
    option.data = { path: filePaths }
    ajax.generalAjax(option);
  }
}