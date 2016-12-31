var express = require('express');
var app = express();
var bodyPostServer = require('./bodyPostServer');
var httpServer = require('./httpServer');
var fileOperationServer = require('./fileOperationServer');
var connectServer = require('./connectServer');
var commomProcess = require('./commonProcess');

app.use('/static', express.static('public'));

var server = app.listen(8088, function() {
    var host = server.address().address;
    console.log("server is " + server.address());
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

commomProcess.setApp(app);
bodyPostServer.functionRoute(app);
fileOperationServer.functionRoute(app); 
connectServer.functionRoute(app);



