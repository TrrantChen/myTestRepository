/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-11 10:47:49
 * @version $Id$
 */
const fs = require("fs");
const commonProcess = require('./common/commonProcess');

// exports.createHttpServer = function() {
//     var http = require("http");
//     var httpServer = http.createServer();
//     httpServer.on("request", respondMp3);
//     httpServer.listen(8097);
//
//     function respondMp3(req, res) {
//         res.writeHead(200, {
//             'Content-Type': 'audio/mp3'
//         });
//         var readStream = fs.createReadStream("./resource/dataDancing.mp3");
//         readStream.pipe(res);
//     }
// }



exports.functionRoute = function(app) {
    commonProcess.preProcessHttpMethods(app, "get", "/img/test.png", getTestJpg);
}

function getTestJpg(req, res) {
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    var readStream = fs.createReadStream("./resource/test.png");
    readStream.pipe(res);
}