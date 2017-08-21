import * as util from '../../js/common/util'
let path = util.getHost();

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
    reader.addEventListener("loadend", function() {
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
    reader.addEventListener("error", function() {
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
    
