/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-10 14:59:01
 * @version $Id$
 */
define(["common", "ajax", "domoperation"], function(common, ajax, domoperation){
    var path = common.getHost();

    function chineseCopy() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", path + "chineseCopy", true);
        xhr.send(null);
    }

    function uploadFile(files, url, successCallback) {
        if (document.querySelector(".progressContainer") != void 0) {
            var htmlStr =  '<div class="progressContainer">'
                          +'    <div class="progressStyle">'
                          +'        <div class="progressBar"></div>'
                          +'    </div>'
                          +'    <div class="progressNum">0%</div>'
                          +'</div>';
            domoperation.insertStr2Dom(htmlStr);            
        } 
        var progressContainer =  document.querySelector(".progressContainer"); 
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

    return {
        chineseCopy:chineseCopy,
        uploadFile:uploadFile
    }  
})
