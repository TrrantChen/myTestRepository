const express = require('express');
const log4js = require('log4js');
const arp = require('node-arp');
const gulp = require('gulp');

const bodyPostRoute = require('./bodyPostRoute');
const httpRoute = require('./httpRoute');
const fileOperationRoute = require('./fileOperationRoute');
const connectRoute = require('./connectRoute');
const commomProcess = require('./commonProcess');
const app = express();


log4js.configure({
  appenders:{
    everything:{
      type:'file'
      ,filename:("./logs/" + commomProcess.dateFormate(new Date(), "yyyyMMdd").toString() + ".log")
      ,maxLogSize:20 * 1000 * 1000
    }
  }
  , categories:{
    default:{appenders:['everything'], level:'debug'}
  }
});

const logger = log4js.getLogger("app");

process.on('uncaughtException', (err) => {
  logger.error("error", err);
});

app.use('/static', express.static('public'));

const server = app.listen(8088, function () {
  const host = server.address().address;
  console.log("server is " + server.address());
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

bodyPostRoute.functionRoute(app);
fileOperationRoute.functionRoute(app);
connectRoute.functionRoute(app);
httpRoute.functionRoute(app);
httpRoute.createHttpServer();




