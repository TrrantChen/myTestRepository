import * as util from '../../js/common/util'
import { blob2DataUrl } from '../../js/common/filedataoperation'
import { uploadFile } from '../../js/common/filemodule'
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
  uploadFile(file, "parseFileByBusboy", (result) => {
    alert(result);
  })
}

function processBase64String(file) {

  var imgContainer = document.querySelector(".imgContainer");
  var canvasContainer = document.querySelector(".canvasContainer");
  var img = document.createElement("img");
  img.classList.add("obj");
  img.file = file;
  imgContainer.appendChild(img);
  var img2 = new Image();

  blob2DataUrl(file).then((result) => {
    var imgUrl = result;
    $("#inputBase64").html(result);
    img.src = result;
    img2.src = result;
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

  function drawCanvas() {
    var imgCanvas = document.createElement("canvas");
    imgCanvas.width = img2.width * 0.3
    imgCanvas.height = img2.height * 0.3
    var myctx = imgCanvas.getContext("2d");
    myctx.drawImage(img2, 0, 0, img2.width * 0.3, img2.height * 0.3);
    canvasContainer.appendChild(imgCanvas);
  }
}