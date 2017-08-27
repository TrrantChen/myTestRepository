/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-11 11:31:41
 * @version $Id$
 */

const commonProcess = require("./common/commonProcess");
const util = require("./common/util");

const copeTypeArray = ["utf8", "ascii", "utf16le", "ucs2", "base64", "hex"];

exports.functionRoute = function(app) {
    commonProcess.preProcessHttpMethods(app, "get", "/getBufferFromServer", getBufferFromServer);
    commonProcess.preProcessHttpMethods(app, "get", "/testByteLength", testByteLength);
    commonProcess.preProcessHttpMethods(app, "get", "/string2Buffer", string2Buffer);
    commonProcess.preProcessHttpMethods(app, "get", "/buffer2String", buffer2String);  
}

// buffer都可以直接传送到客户端，无需转码
function getBufferFromServer(req, res) {
    commonProcess.setAccess(req, res)
    var bufEn = new Buffer("server is normal");
    var bufCn = new Buffer("服务器反应正常");
    res.send( "bufCn is " + bufCn + "\n" +
            "bufEn is " + bufEn + "\n")    
}

function testByteLength(req, res) {
    commonProcess.setAccess(req, res)
    var result = "testByteLength \n";
    for (var i = 0; i < copeTypeArray.length; i++) {
        result += (" 蛤 " + copeTypeArray[i] + " " + util.getByteLength("蛤", copeTypeArray[i]) + "\n")
    }

    for (var i = 0; i < copeTypeArray.length; i++) {
        result += (" A " + copeTypeArray[i] + " " + util.getByteLength("A", copeTypeArray[i]) + "\n")
    }   

    res.send(result)
}

function string2Buffer(req, res) {
    commonProcess.setAccess(req, res)
    var result = "string2Buffer \n"
    copeTypeArray.forEach(function (copeType) {
        try {
            result += ("A " + copeType + " " + util.string2Buffer("A", copeType) + "\n")
        }
        catch(e){
            result += ("A " + copeType + " error "  + "\n")
        }
        
    })
    copeTypeArray.forEach(function (copeType) {
        try {
            result += ("蛤 " + copeType + " " + util.string2Buffer("蛤", copeType) + "\n")
        }
        catch(e) {
            result += ("蛤 " + copeType + " error "  + "\n")
        }        
    })    
    res.send(result)
}

function buffer2String(req, res) {
    commonProcess.setAccess(req, res)
    var result = "buffer2String \n"
    copeTypeArray.forEach(function (copeType) {
        try {
            result += ("A " + copeType + " " + util.buffer2String(util.string2Buffer("A", copeType), copeType)+ "\n")
        }
        catch(e){
            result += ("A " + copeType + " error "  + "\n")
        }
        
    })
    copeTypeArray.forEach(function (copeType) {
        try {
            result += ("蛤 " + copeType + " " + util.buffer2String(util.string2Buffer("蛤", copeType), copeType) + "\n")
        }
        catch(e) {
            result += ("蛤 " + copeType + " error "  + "\n")
        }        
    })    
    res.send(result)   
}
