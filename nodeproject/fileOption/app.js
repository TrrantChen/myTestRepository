const express = require('express');
const app = express();
const bodyPostRoute = require('./bodyPostRoute');
const httpRoute = require('./httpRoute');
const fileOperationRoute = require('./fileOperationRoute');
const connectRoute = require('./connectRoute');
const commomProcess = require('./commonProcess');
const log4js = require('log4js')
const arp = require('node-arp');

log4js.configure({
    appenders: [{
        type: 'file',
        maxLogSize: (20 * 1000 * 1000).toString(),
        filename: ("./logs/" + commomProcess.dateFormate(new Date(), "yyyyMMdd").toString() + ".log")
    }, {
        type: 'console'
    }]
})

var logger = log4js.getLogger("app");

process.on('uncaughtException', (err) => {
    logger.err("error", err);
});

app.use('/static', express.static('public'));

const server = app.listen(8088, function() {
    const host = server.address().address;
    console.log("server is " + server.address());
    const port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

bodyPostRoute.functionRoute(app);
fileOperationRoute.functionRoute(app);
connectRoute.functionRoute(app);

