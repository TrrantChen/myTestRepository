/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-10 14:59:01
 * @version $Id$
 */
define(["common", "ajax", "domoperation"], function(common, ajax, domoperation){
    var path = common.getHost();

    function uploadFile(files, url, successCallback, isWithProcess) {
        isWithProcess = isWithProcess || false;
        successCallback = successCallback || function(){ console.log("upload file success;")};
                              
        var formData = new FormData();

        for (var i = 0; i < files.length; i++) {
            formData.append("fileBlob" + i.toString(), files[i]);
        }    
             
        var option = {
            httpmethod: "post",
            async: true,
            data: formData,
            url:url,
            isUpload:true,
            success:successCallback
        }

        domoperation.setAjaxWithProcess(option, isWithProcess); 
        ajax.generalAjax(option);
    }

    function downloadFile(filePaths, url, successCallback, isWithProcess) {
        isWithProcess = isWithProcess || false;
        successCallback = successCallback || function(){ console.log("download file success;")};
        var option = {
            httpmethod: "get",
            url:url,
            dataType:"blob",
            success:successCallback
        };  

        domoperation.setAjaxWithProcess(option, isWithProcess);                                  

        if (common.isArray(filePaths)) {
            for (var i = 0; i < filePaths.length; i++) {
                option.data = {path:filePaths[i]};
                ajax.generalAjax(option);                
            }

        } else {
            option.data = {path:filePaths}
            ajax.generalAjax(option);              
        }
    }

    return {
        uploadFile:uploadFile,
        downloadFile:downloadFile
    }  
})
