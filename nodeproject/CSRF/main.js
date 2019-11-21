const http = require("http");
const events = require('events');
const url = require("url");
const fs = require("fs");
const express = require("express");
const app = express();

app.use('/web', express.static('static',
    {
        setHeaders: setHeadersFunc
    }
));

const server = app.listen(8999, function() {

});

function setHeadersFunc(res, path, stat) {
    res.cookie('cookie1', '1');
}

app.use('/web', express.static('static2',
    {
        setHeaders: setHeadersFunc
    }
));



app.get('/csrf', function (req, res) {
    setHeadersFunc(res);
    res.send(req.query.a);
});

const app2 = express();

const server2 = app2.listen(9000, function() {

});

app2.use('/web2', express.static('static',
    {
        setHeaders: setHeadersFunc2
    }
));

app2.get('/csrf2', function (req, res) {
    setHeadersFunc2(res);
    res.send(req.query.a);
});

function setHeadersFunc2(res, path, stat) {
    res.cookie('cookie2', '2');
}








