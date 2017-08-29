    import * as util from '../../js/common/util'  
import { autoDownloadUrl } from '../../js/common/domoperation'  
import { downloadFile, uploadFile } from '../../js/common/filemodule'

let path = util.getHost();
$(function(){
    fileDownUseBase64();
    fileDownUseCreateObjectURL();
    fileUpload("parseFileByBusboy");
})

/*------------download------------*/
    function fileDownUseCreateObjectURL() {
        var downloadlabel = document.querySelector("#downloadlabel");
        downloadlabel.onclick = function() { 
            downloadFile(
                    "./output/test1.txt", 
                    path + "downLoadFileWithStream", 
                    function(result) {
                        console.log("onload")
                        autoDownloadUrl("output.txt", result);
                    },
                    false      
            );                                       
        }   
    }

    function fileDownUseBase64() {
        downloadFile(
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
            uploadFile(this.files, path + url);
            this.value = "";
        })  
    }
/*------------fileUpload------------*/

      
    
