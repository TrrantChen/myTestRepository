const http = require("http");
const https = require("https");
const events = require('events');
const url = require("url");
const fs = require("fs");
const express = require("express");
const http_app = express();

http_app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://127.0.0.1:11100');
    res.header('Access-Control-Allow-Headers', 'x-custom-header');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);

    res.header("Content-Type", "application/json;charset=utf-8");

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

const http_server = http_app.listen(9000, function() {
    console.log('http://127.0.0.1:9000/web/test.html')
});

http_app.use('/web', express.static('http_static',
    {
        setHeaders: setHeadersFunc
    }
));


http_app.get('/jsonptest', function (req, res) {
    let cb = escapeHTML(req.query.cb);
    let value = 10;
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:9000');
    res.send(cb + "(" + value + ")");
});

http_app.get('/getData', function (req, res) {
    res.header('Access-Control-Allow-Origin', 'https://127.0.0.1:11100');
    res.header('Access-Control-Allow-Headers', 'x-custom-header');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    res.send('1000');
});

function setHeadersFunc(res, path, stat) {
    res.cookie('cookie', 'http' + new Date().getTime());
}

// 防止XSS
function escapeHTML(str) {
    if (!str) return '';
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/'/g, "&#39;");
    return str;
}
