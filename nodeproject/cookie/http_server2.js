const http = require("http");
const https = require("https");
const events = require('events');
const url = require("url");
const fs = require("fs");
const express = require("express");
const http_app = express();


const http_server = http_app.listen(9001, function() {
    console.log('http://www.anothertest2.com/web/anothertest.html')
});


http_app.use('/web', express.static('http_static'));

http_app.get('/sendCookieByBrower', function (req, res) {
    let brower_cookie = req.headers.cookie;
    console.log('test');
    console.log(brower_cookie);
    let result = '';

    if (brower_cookie && brower_cookie !== '') {
        result = `server has reveive the cooike, is ${brower_cookie}`;
    }
    else {
        result = `the cookie is empty`;
    }

    res.send(result);
});
