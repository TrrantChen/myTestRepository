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
        type:'logLevelFilter',
        level:'info',
        category:'test1',
        appender:{
            type:'console'
        }
    }]    
})
var logger1 =  log4js.getLogger("test1");
logger1.debug("Time", new Date());
logger1.info("Time", new Date());
var logger2 = log4js.getLogger("test2");
logger2.debug("Time", new Date());



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



