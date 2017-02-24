var express = require('express');
var app = express();
var bodyPostServer = require('./bodyPostServer');
var httpServer = require('./httpServer');
var fileOperationServer = require('./fileOperationServer');
var connectServer = require('./connectServer');
var commomProcess = require('./commonProcess');

var log4js = require('log4js')

log4js.configure({
    appenders:[{
        type:'file',
        maxLogSize: (20 * 1000 * 1000).toString(),
        filename:(commomProcess.dateFormate("./logs/" + new Date(), "yyyyMMdd").toString() + ".log")
    }]    
})

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



