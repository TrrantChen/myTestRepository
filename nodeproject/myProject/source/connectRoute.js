/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-11 10:17:34
 * @version $Id$
 */

const url = require("url");
const path = require("path");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const txtParser = bodyParser.text();

const commonProcess = require("./common/commonProcess");
const randomProcess = require("./common/randomProcess");


exports.functionRoute = function(app) {
    commonProcess.preProcessHttpMethods(app, "get", "/", defaultConnect);
    commonProcess.preProcessHttpMethods(app, "get", "/testUrlAndpath", testUrlAndpath);
    commonProcess.preProcessHttpMethods(app, "get", "/serverPathTest", serverPathTest);
    commonProcess.preProcessHttpMethods(app, "get", "/xhr2crossdomain", xhr2crossdomain);
    commonProcess.preProcessHttpMethods(app, "get", "/test4Jsonp", test4Jsonp);   
    commonProcess.preProcessHttpMethods(app, "get", "/getClientIPAdress", getClientIPAdress);  
    commonProcess.preProcessHttpMethods(app, "get", "/delayloadtest", delayloadtestGet); 
    commonProcess.preProcessHttpMethods(app, "post", "/delayloadtest", delayloadtestPost, jsonParser);
    commonProcess.preProcessHttpMethods(app, "get", "/getArrayResut", getArrayResut);
    commonProcess.preProcessHttpMethods(app, "get", "/getRandomTableData", getRandomTableData);
    commonProcess.preProcessHttpMethods(app, "post", "/test4DefaultContentType", test4DefaultContentType);
    commonProcess.preProcessHttpMethods(app, "post", "/test4PostWithoutThridPart", test4PostWithoutThridPart);
};

function getRandomTableData(req, res) {
    res.send(JSON.stringify(randomProcess.createRandomTwoDimensionalArray(req.query.rows, req.query.cells, true)));
}

function defaultConnect(req, res) {
    res.send("success");
}

function testUrlAndpath(req, res) {
    commonProcess.setAccess(req, res)
    var pathname = url.parse(req.url).pathname;
    res.send("pathname is " + pathname)
}

function delayloadtestGet(req, res) {
    var delaytime = req.query.para0 || 2000 
    setTimeout(function(){
        var delaytime = req.query.para0 || 2000 
        res.send(delaytime);
    }, delaytime);
}

function getArrayResut(req, res) {
    res.send(["1", "2", "3"]);
}

function delayloadtestPost(req, res) {
    if (req.body != undefined) {
        setTimeout(function(){
            res.send(req.body.para0.toString());
        }, parseInt(req.body.para0));
    } else {
        res.send("body undefined");
    }   
}

function getClientIPAdress(req, res) {
    var result = req.socket.remoteAddress || req.connection.remoteAddress || req.headers['x-forwarded-for'] || req.ip || req.ips
    if (result != void 0 && result.indexOf("ffff:") != -1) {
        result = result.split("ffff:")[1]
    }
    res.send(result);
}

function serverPathTest(req, res) {
    commonProcess.setAccess(req, res)
    console.log("system is " + process.platform + "\n"); // win32
    console.log("__dirname " + __dirname + "\n"); // D:\Demo\frontDemo\nodeproject\fileOption     绝对路径
    console.log("__filename " + __filename + "\n"); // D:\Demo\frontDemo\nodeproject\fileOption\app.js 绝对路径
    console.log("process.cwd() " + process.cwd() + "\n"); // D:\Demo\frontDemo\nodeproject\fileOption 相对于node命令执行的目录的路径
    console.log("path.resolve('./') " + path.resolve('./') + "\n"); // D:\Demo\frontDemo\nodeproject\fileOption 相对于node命令执行的目录的路径
    var result = "" +
        " system is " + process.platform + "\n" +
        " __dirname " + __dirname + "\n" +
        " __filename " + __filename + "\n" +
        " process.cwd() " + process.cwd() + "\n" +
        " path.resolve('./') " + path.resolve('./') + "\n"
    res.send(result)
}

function xhr2crossdomain(req, res) {
    res.header("Access-Control-Allow-Origin", "http://www.zte.com.cn");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.send("hello");
}

function test4Jsonp(req, res) {
    var callback = req.query.callback;
    var obj = {name:"yc", num:"1", test:"true"}
    res.send(callback + "(" + JSON.stringify(obj) + ")");
}

function test4DefaultContentType(req, res) {
  try {
    res.send(req.headers["content-type"]);
  }
  catch(err) {
    console.log(err);
    res.send(err);
  }
}

function test4PostWithoutThridPart(req, res) {
    getReqDataAwait(req).then((data) => {
        console.log(data);
        res.send(data);
    });
}

async function getReqDataAwait(req) {
  return getReqData(req);
}

function getReqData(req) {
  let data = "";
  req.setEncoding('utf8');
  return new Promise((resolve, reject) => {
    req.on("data" , (chunk) => {
      console.log("data----");
       console.log(chunk);
       data += chunk;
    });

    req.on("end", () => {
      resolve(data);
    })
  })
}
