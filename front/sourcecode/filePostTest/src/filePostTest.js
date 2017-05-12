<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style type="text/css">
            * {
                margin:0px;
                padding:0px;
                box-sizing: border-box;
            }
    
            body, input, select, button, textarea {
                font-size: 14px;
                font-family: 'Microsoft YaHei',Tahoma, Geneva, sans-serif;
            }   
            
            body, html {
                width:100%;
                height:100%;
            } 

            a {
                display: block;
                white-space: nowrap;
            }

            .container {
                width:100%;
                height:100%;
                display: flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                background: #EFF3CD;
            }

            .mainContainer {
                width:500px;
                height:30px;
                display: flex;
                flex-direction:column;
                justify-content:flex-start;             
            }

            .inputContainer {
                width:100%;
                height:30px;
                display: flex;
                flex-direction:row;
                justify-content:flex-start;                              
            }

            .base64Container {
                width:100%;
                height: 100%;
                display: flex;
                flex-direction:column;
                justify-content:flex-start;                

            }  

            .borderStyle {
                border: 1px solid #605063;
                border-radius: 5px;                
            }          

            .inputLabelStyle {
                margin:2px 0;
                line-height: 22px;
                width:100px;
                color:#EFF3CD;
                background:-webkit-gradient(linear, 0 0, 0 100%, from(#61ADA0), to(#248F8D));
                display: block;
                text-align: center;
                cursor:pointer;
            }

            .inputStyle {
                position: absolute;
                clip:rect(0 0 0 0);
                font-size: 0px;
            }

            .fileNameStyle {
                width: 100%;
                margin: 2px 0px 2px 2px;                
            }

            .imgContainer {
                width:100%;
                height:50%;
                border-bottom:1px solid #DBDBDB;
            }

            .txtContainer {
                width:100%;
                height:50%;
            }

            .canvasStyle {
                width:100%;
                height:100%;
            }

            .progressContainer {
                width:500px;
                height:130px;
                border:1px solid #DBDBDB;
                position: absolute;
                top:0;
                bottom:0;
                left:0;
                right:0;
                margin:auto;
                z-index: 1000;
                background: #F6F6F6;
                display: none;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                font-size:0px; 

            }

            .progressStyle {
                width:400px;
                height:30px;
                background: #E4CAB9;
                display: inline-block;
            }

            .progressBar {
                width:0px;
                height:30px;
                background:#4BC3E6;
            }

            .progressNum {
                font-size:14px;
                display: inline-block;
            }

            .downloadContainer {
                width:100px;
                height:22px;
            }
        </style>
</head>
<body>
    <div class="container">
        <div class="mainContainer">
            <div class="inputContainer">
                <label class="inputLabelStyle borderStyle" for="inputFile">上传文件</label>
                <form>
                    <input id="inputFile" type="file" class="inputStyle" multiple="multiple"></form>
                <div id="inputFileName" class="fileNameStyle borderStyle"></div>
            </div>
        </div>
        <div class="downloadContainer">
            <label id="downloadlabel" class="inputLabelStyle borderStyle">下载</label>
            <a id="testA" href="./proce.txt" download="proce.txt">Download By Url</a>
            <a id="testC">fileDownload Use Base64</a>
        </div>
    </div>
</body>
    <script src="../lib/requirejs/require.js" type="text/javascript"></script>
    <script src="../js/common/requireconfig.js" type="text/javascript"></script>
    <script type="text/javascript">
        require.config({
            paths: {
                "othertestmodule":'../js/fileandajax/othertestmodule',
                "filemodule":"../js/fileandajax/filemodule",
                "domoperation":"../js/common/domoperation",
                "ajax":"../js/common/ajax"
            }
        })  

        require(["common", "othertestmodule", "filemodule", "constant", "domoperation", "ajax", "jquery", "underscore"], function(common, othertestmodule, filemodule, constant, domoperation, ajax){
            var path = common.getHost();
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

        })        
    </script>
</html>