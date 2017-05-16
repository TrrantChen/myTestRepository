import * as util from '../../js/common/util'  

let path = util.getHost();
$(function(){
    fileDownUseBase64();
    fileDownUseCreateObjectURL();
    fileUpload("upLoadFileByBusboy");
})

/*------------download------------*/
    function fileDownUseCreateObjectURL() {
        var downloadlabel = document.querySelector("#downloadlabel");
        downloadlabel.onclick = function() { 
            filemodule.downloadFile(
                    "./output/test1.txt", 
                    path + "downLoadFileWithStream", 
                    function(result) {
                        console.log("onload")
                        common.autoDownloadUrl("output.zip", result);
                    },
                    false      
            );                                       
        }   
    }

    function fileDownUseBase64() {
        filemodule.downloadFile(
                "./output/test1.txt", 
                path + "downLoadFileWithBuffer", 
                function(result) {
                    var reader = new FileReader();
                    reader.addEventListener("loadend", function(){
                        var a = document.querySelector("#testC");
                        a.href = reader.result;
                        a.download = "test1.txt"; 
                    })                        
                    reader.readAsDataURL(result)                              
                }    
        );                       
    }
/*------------download------------*/

/*------------fileUpload------------*/
    function fileUpload(url) {
        url = url || "upLoadFile"
        $("#inputFile").on("change", function(event) {
            filemodule.uploadFile(this.files, path + url);
            this.value = "";
        })  
    }
/*------------fileUpload------------*/

      
    
