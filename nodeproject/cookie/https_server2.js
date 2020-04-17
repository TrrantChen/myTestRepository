const http = require("http");
const https = require("https");
const events = require('events');
const url = require("url");
const fs = require("fs");
const express = require("express");
const https_app = express();
const path = require("path");

let privateKey  = fs.readFileSync(path.join(__dirname, './certificate/private.pem'), 'utf8');
let certificate = fs.readFileSync(path.join(__dirname, './certificate/file.crt'), 'utf8');
let credentials = {key: privateKey, cert: certificate};
let httpsServer = https.createServer(credentials, https_app);

httpsServer.listen(11101, function() {
    console.log('https://www.anothertest1.com/web/anothertest.html')
});

https_app.use('/web', express.static('https_static'));

https_app.get('/sendCookieByBrower', function (req, res) {
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

