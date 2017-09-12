import * as util from './util.js';
import * as ajax from './ajax.js';
import * as domoperation from './domoperation.js';

var path = util.getHost();

export function uploadFilePromise(file, url, option) {
  let promise = new Promise((resolve, reject) => {
    try {
      uploadFile(file, url, {
        success:resolve,
        error:reject
      })        
    }
    catch(err) {
      reject(err);
    }
  }) 

  return promise;
}

export function uploadFile(file, url, option) {
  let defaultOption = {
    success: function() {
      console.log("upload file success;")
    }, 
    error: function() {
      console.log("upload file error");
    },
    isWithProcess:false
  };
  let fileOption = Object.assign(defaultOption, option); 
  let formData = new FormData();

 if (file instanceof Blob || file instanceof File) {
    formData.append("fileBlob0", file);
  } else {
    throw new Error("files is not corret type")
  }

  let ajaxOption = {
    type: "post",
    async: true,
    data: formData,
    url: url,
    isUpload: true,
    success: fileOption.success,
    error: fileOption.error
  }

  domoperation.setAjaxWithProcess(ajaxOption, fileOption.isWithProcess);
  ajax.generalAjax(ajaxOption);
}

export function uploadFiles(files, url, option) {
  if (files instanceof FileList || Array.isArray(files)) {
    let uploadFiles = files.map((file) => {
      return uploadFilePromise(file, url, option);
    })

    return Promise.all(uploadFiles);
  } else {
    return new Promise((resolve, reject) => {
      reject("files must be FileList or Array");
    })
  }
}

export function downloadFilePromise(filePath, url, option) {
  let promise = new Promise((resolve, reject) => {
    option.success = resolve;
    option.error = reject;
  })

  return promise;
}

export function downloadFile(filePath, url, option) {
  let defaultOption = {
    success: function() {
      console.log("upload file success;")
    }, 
    error: function() {
      console.log("upload file error");
    },
    isWithProcess:false
  };
  let fileOption = Object.assign(defaultOption, option);   
  let ajaxOption = {
    type: "get",
    url: url,
    dataType: "blob",
    data: {path:filePath},
    success: fileOption.success,
    error: fileOption.error
  };

  domoperation.setAjaxWithProcess(ajaxOption, fileOption.isWithProcess);
  ajax.generalAjax(ajaxOption);
}

export function downloadFiles(filePaths, url, option) {
  let loadFiles = filePaths.map((filePath) => {
    return downloadFilePromise(filePath, url, option);
  });

  return Promsie.all(loadFiles);
}