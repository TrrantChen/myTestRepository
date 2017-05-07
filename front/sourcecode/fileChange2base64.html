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
            body, html {
                width:100%;
                height:100%;
            }
            body, input, select, button, textarea {
                font-size: 14px;
                font-family: 'Microsoft YaHei',Tahoma, Geneva, sans-serif;
            }
            label {
                display: block;
                text-align: center;
            }
            .container {
                width:100%;
                height:100%;
                display: flex;
                flex-direction:row;
                justify-content:center;
                align-items:center;
            }
            .mainContainer {
                width:800px;
                height:750px;
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
                border: 1px solid #DBDBDB;
                border-radius: 5px;                
            }
            .inputLabelStyle {
                margin:2px 0;
                line-height: 22px;
                width:100px;
                color:#FDFDFD;
                background:-webkit-gradient(linear, 0 0, 0 100%, from(#83C36D), to(#9BC384));
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
                height:33%;
                border-bottom:1px solid #DBDBDB;
            }
            .txtContainer {
                width:100%;
                height:33%;
                word-break: break-word;
                overflow-y: auto;
            }
            .imgStyleWidth {
                width:30%;
            }
            .imgStyleHeight {
                height:30%;
            }
            .canvasContainer {
                height:33%;
                border-bottom:1px solid #DBDBDB;
            }
            .canvasStyle {
                width:100%;
                height:100%;
            }
        </style>
</head>
<body>
    <div class="container">
        <div class="mainContainer">
            <div class="inputContainer">
                <label class="inputLabelStyle borderStyle" for="inputFile">转换文件</label>
                <form>
                    <input id="inputFile" type="file" class="inputStyle" multiple="multiple"></form>
                <div id="inputFileName" class="fileNameStyle borderStyle"></div>
            </div>
            <div class="base64Container borderStyle">
                <div class="canvasContainer"></div>
                <div class="imgContainer"></div>
                <div id="inputBase64" class="txtContainer"></div>
            </div>
        </div>
    </div>
</body>
    <script src="../lib/requirejs/require.js" type="text/javascript"></script>
    <script src="../js/common/requireconfig.js" type="text/javascript"></script>
    <script type="text/javascript">       
        require(["common", "jquery"], function(common){
            var path = common.getHost();

            fileTest()

            function fileTest() {
                $("#inputFile").on("change", function(event) {
                    var fileLst = this.files
                    for (var i = 0; i < fileLst.length; i++) {
                        fileProcess(fileLst[i]);
                    }
                    this.value = "";
                })  
            }

            function fileProcess(file) {
                $("#inputFileName").html(file.name);
                upLoadFile2Server(file);
                processBase64String(file);
            }

            function upLoadFile2Server(file) {
                var xhr = new XMLHttpRequest();
                var formData = new FormData();
                xhr.open("post", path + "upLoadFile", true);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
                        alert(xhr.responseText);
                    }
                }
                formData.append("fileTest", file);
                xhr.send(formData);              
            }
            
            function processBase64String(file) {
                var reader = new FileReader();
                var imgContainer = document.querySelector(".imgContainer");
                var canvasContainer = document.querySelector(".canvasContainer");
                var img = document.createElement("img");
                img.classList.add("obj");
                img.file = file;  
                imgContainer.appendChild(img);
                var img2 = new Image();
                reader.addEventListener("loadend", function(){
                    var imgUrl = reader.result;
                    $("#inputBase64").html(reader.result);
                    img.src = reader.result;
                    img2.src = reader.result;
                    if (img.width > img.height) {
                        img.classList.add("imgStyleWidth");
                    } else {
                        img.classList.add("imgStyleHeight");
                    }
                    if (img2.complete) {
                        drawCanvas();
                    } else {
                        img2.onload = function() {
                            drawCanvas();
                        }
                    }
                })
                reader.addEventListener("error", function(){
                    reader.abort();
                    console.log("file read fail");
                })
                reader.readAsDataURL(file)
                function drawCanvas() {
                    var imgCanvas = document.createElement("canvas");
                    imgCanvas.width = img2.width * 0.3
                    imgCanvas.height = img2.height * 0.3
                    var myctx = imgCanvas.getContext("2d"); 
                    myctx.drawImage(img2, 0, 0, img2.width * 0.3, img2.height * 0.3);
                    canvasContainer.appendChild(imgCanvas);
                }                 
            }
        })
    </script>
</html>