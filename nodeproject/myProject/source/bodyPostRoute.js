/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-26 10:20:59
 * @version $Id$
 */

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const txtParser = bodyParser.text();

const commonProcess = require('./common/commonProcess');
const fileOperationProcess = require('./fileOperationProcess');

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({
    extended: false
})

// 处理前端传过来的formData或者文件图片 处理formData
const connectMultiparty = require('connect-multiparty');
const multipartMiddleware = connectMultiparty();
//  同上
const multiparty = require('multiparty');
// 同上
const busboy = require('busboy');

exports.functionRoute = function(app) {
    commonProcess.preProcessHttpMethods(app, "post", "/uploadJsonWithoutContentype", parseJsonWithoutContentType);
    commonProcess.preProcessHttpMethods(app, "post", "/uploadJsonClientCROS", parseJsonCROSPost, jsonParser);
    commonProcess.preProcessHttpMethods(app, "post", "/uploadText", parseText, txtParser);
    commonProcess.preProcessHttpMethods(app, "post", "/uploadForm", urlencodedParser, parseForm);
    commonProcess.preProcessHttpMethods(app, "post", "/uploadFormDataParseByConnectMultiparty", parseFormDataByConnectMultiparty, multipartMiddleware);
    commonProcess.preProcessHttpMethods(app, "post", "/uploadFormDataParseByBusboy", parseFormDataByBusboy);
    commonProcess.preProcessHttpMethods(app, "post", "/uploadFormDataParseByMultiparty", parseFormDataByMultiparty);
    commonProcess.preProcessHttpMethods(app, "post", "/upLoadFileByConnectMultiparty", parseFileByConnectMultiparty);
    commonProcess.preProcessHttpMethods(app, "post", "/upLoadFileByMultiparty", parseFileByMultiparty);
    commonProcess.preProcessHttpMethods(app, "post", "/upLoadFileByBusboy", parseFileByBusboy);
    commonProcess.preProcessHttpMethods(app, "get", "/downLoadFileWithBuffer", downLoadFileWithBuffer);
    commonProcess.preProcessHttpMethods(app, "get", "/downLoadFileWithStream", downLoadFileWithStream);

  commonProcess.preProcessHttpMethods(app, "post", "/uploadFormDataWithoutThirdPart", uploadFormDataWithoutThirdPart);
  commonProcess.preProcessHttpMethods(app, "post", "/uploadFileWithoutThirdPart", uploadFileWithoutThirdPart);
}


// 下载 使用buffer 一次性将数据读取到内存中
function downLoadFileWithBuffer(req, res) {
    fileOperationProcess.downloadWidthBuffer(req, res);
}

// 使用stream流来进行下载，能边解析文件边下载，减少数据占用内存
function downLoadFileWithStream(req, res) {
    fileOperationProcess.downloadWidthStream(req, res);
}

// 解析json
// 不需要在客户端添加content-type
// 直接使用data来读取
function parseJsonWithoutContentType(req, res) {
    var result = "";
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        result += chunk
    });
    req.on('end', function() {
        var json = JSON.parse(result);
        res.send(result);
    })
}

// 解析json，需要预请求，需要第三方进行解析
function parseJsonCROSPost(req, res) {
    if (req.body != undefined) {
        res.send(req.body);
    } else {
        res.send("body undefined");
    }
}

// 解析txt
function parseText(req, res) {
    if (req.body != undefined) {
        res.send(req.body);
    } else {
        res.send("body undefined");
    }
}

// 解析默认表单数据application/x-www-form-urlencoded
function parseForm(req, res) {
    if (req.body != "undefined") {
        res.send(req.body);
    } else {
        res.send("form body undefined");
    }
}

// 解析前端构造的二进制数据FormData,使用第三方插件ConnectMultiparty解析
function parseFormDataByConnectMultiparty(req, res) {
    // todo
    if (req.body != undefined) {
        var reqbodyStr = "";
        var reqfileStr = "";
        for (var bodyPara in req.body) {
            reqbodyStr += (bodyPara + ":" + req.body[bodyPara] + " ");
        }
        for (var filePara in req.files) {
            reqfileStr += (filePara + ":" + req.files[filePara] + " ");
        }
        res.send("req.body " + reqbodyStr + "\n req.files " + reqfileStr);
    } else {
        res.send("sendMultipartyFormData");
    }
}

// 解析前端构造的二进制数据FormData,使用第三方插件Multiparty解析
function parseFormDataByMultiparty(req, res) {
    // todo
    var multipartyOption = {
        uploadDir: "./output"
    }
    var form = new multiparty.Form(multipartyOption);
    form.parse(req, function(err, fields, files) {
        
        console.log("fields");
        for (var i = 0; i < fields.length; i++) {
            console.log(fields[i]);
        }       
        console.log("files")
        for (var i = 0; i < files.length; i++) {
            console.log(files[i]);
        }     
        res.send("success")       
    })
}

// 解析前端构造的二进制数据FormData,使用第三方插件Busboy解析
function parseFormDataByBusboy(req, res) {
    // todo
    fileOperationProcess.uploadWithThirdPart(req, res);
    res.send("success");
}

// 处理文件，通过第三方插件
function parseFileByConnectMultiparty(req, res) {
    fileOperationProcess.parseFileByConnectMultiparty(req, res);
    res.send("success");
}

function parseFileByMultiparty(req, res) {
    fileOperationProcess.parseFileByMultiparty(req, res);
}

function parseFileByBusboy(req, res) {
    fileOperationProcess.parseFileByBusboy(req, res);
}


// 直接解析FormData数据, 不通过第三方
function uploadFormDataWithoutThirdPart(req, res) {

}

// 直接解析文件， 不通过第三方
function uploadFileWithoutThirdPart(req, res) {
  fileOperationProcess.uploadFileWithoutThirdPart(req, res);
}






// // 2、使用node-multiparty
// // 对object不友好，会把属性的值改为数组
// var multiparty = require('multiparty');
// var util = require('util');
// app.post("/getFileNodeMultipartyClientFormData", function(req, res){
//     commonProcess.setAccess(res);
//     var form = new multiparty.Form();
//     form.parse(req, function(err, fields, files) {
//         // console.log("fields:"  + fields + " files:" + files);
//         console.log(util.inspect({fields: fields, files: files}));
//     });    
//     res.send("file success");
// })

// // 3、使用busboy
// // var Busboy = require('busboy');
// app.post("/getFileBusboyClientFormData", function(req, res){
//     commonProcess.setAccess(res);
//     res.send("file success");
// })



// // 解析xml 
// app.post("/getXmlClient", function(req, res){
//     commonProcess.setAccess(res);
//     res.send("xml success");
// })