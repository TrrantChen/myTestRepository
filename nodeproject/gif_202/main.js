// 使用gif做监控打点，并返回204
const http = require("http");
const events = require('events');
const url = require("url");
const fs = require("fs");
const express = require("express");
const app = express();

app.use('/web', express.static('static'));

const server = app.listen(8999, function() {

});

app.get('/test.gif', function(req, res){
    console.log(req.query);
    res.status(204).send();
});
