/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-10 14:59:01
 * @version $Id$
 */
define(["common", "ajax", "domoperation"], function(common, ajax, domoperation){
    var path = common.getHost();

    function uploadFile(files, url, successCallback) {
        var progressContainer =  domoperation.createAndGetProgress();
        progressContainer.style.display = "flex"                                   
        var formData = new FormData();

        for (var i = 0; i < files.length; i++) {
            formData.append("fileBlob" + i.toString(), files[i]);
        }    
             
        var option = {
            httpmethod: "post",
            async: true,
            data: formData,
            url:url,
            success:function(result) {
                if (successCallback !== void 0) {
                    successCallback(result);
                } else {
                    console.log(result);
                }
                progressContainer.style.display = "none" 
            },  
            onloadstart:function() {
                progressContainer.style.display = "flex" 
            },
            onprogress:function(event) {
                var progressStyle = document.querySelector(".progressStyle");
                var progressBar = document.querySelector(".progressBar");
                var progressNum = document.querySelector(".progressNum");
                var strLength = window.getComputedStyle(progressStyle).getPropertyValue("width").length;
                var totalWidth = window.getComputedStyle(progressStyle).getPropertyValue("width").slice(0, strLength - 2);
                progressBar.style.width = parseInt(totalWidth) * Math.round(event.loaded / event.total * 100) / 100 + "px";
                progressNum.innerText =  Math.round(event.loaded / event.total * 100) + "%" 
            }
        }
        ajax.generalAjax(option);
    }

    function downloadFile(option, isWithProcess) {
        isWithProcess = isWithProcess || false;
        if (isWithProcess) {
            var progressContainer =  domoperation.createAndGetProgress();
            option.onloadstart = function() {
                console.time("下载 ")
                progressContainer.style.display = "flex"              
            };
            option.onprogress = function(event) {
                var lengthComputable = event.lengthComputable;
                var total = event.total;
                var progressStyle = document.querySelector(".progressStyle");
                var progressBar = document.querySelector(".progressBar");
                var progressNum = document.querySelector(".progressNum");
                var strLength = window.getComputedStyle(progressStyle).getPropertyValue("width").length;
                var totalWidth = window.getComputedStyle(progressStyle).getPropertyValue("width").slice(0, strLength - 2);
                progressBar.style.width = parseInt(totalWidth) * Math.round(event.loaded / event.total * 100) / 100 + "px";
                progressNum.innerText =  Math.round(event.loaded / event.total * 100) + "%" 
            };  
            option.onloadend = function(){
                console.timeEnd("下载 ")
                progressContainer.style.display = "none"            
            };                              
        }

        ajax.generalAjax(option);        
    }

    return {
        uploadFile:uploadFile,
        downloadFile:downloadFile
    }  
})
