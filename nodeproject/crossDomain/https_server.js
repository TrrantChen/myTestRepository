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

httpsServer.listen(11100, function() {
    console.log('https://127.0.0.1:11100/web/test.html')
});

https_app.use('/web', express.static('https_static',
    {
        setHeaders: setHeadersFunc
    }
));

function setHeadersFunc(res, path, stat) {
    res.cookie('cookie', 'https' + new Date().getTime(), {
        // secure: true,
        httpOnly: true,
    });
}
