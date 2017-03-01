/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-11 10:47:49
 * @version $Id$
 */


exports.createHttpServer = function() {
    var http = require("http");
    var httpServer = http.createServer();
    httpServer.on("request", respondMp3);
    httpServer.listen(8097);

    function respondMp3(req, res) {
        res.writeHead({
            'Content-Type': 'audio/mp3'
        });
        var readStream = fs.createReadStream("./resource/dataDancing.mp3");
        readStream.pipe(res);
    }
}