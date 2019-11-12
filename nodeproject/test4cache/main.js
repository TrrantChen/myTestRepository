const http = require("http");
const events = require('events');
const url = require("url");
const fs = require("fs");
const express = require("express");
const app = express();

app.use('/web', express.static('static', {
    setHeaders: setHeadersFunc
}));

const server = app.listen(8999, function() {

});

function setHeadersFunc(res, path, stat) {
    // res.set('Cache-Control', 'public');
    // res.set('Cache-Control', 'no-cache');
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate ');
    // res.set('Cache-Control', 'no-store');
    // res.set('Cache-Control', 'max-age=1000000');
    // console.log(res)
    // res.set('ETag', '33a64df551425fcc55e4d42a148795d9f25f89d4');
    // res.set('Expires', 'Fri Nov 16 2018 09:33:01 GMT+0800 (CST)');
    // res.set('Last-Modified', 'Wed, 21 Oct 2018 07:28:00 GMT');

    // res.set('Pragma', 'no-cache');
    // res.set('Cache-Control', 'no-cache, max-age=100');
    // res.set('Cache-Control', 'max-age=1, max-stale=10');
    // res.set('Cache-Control', 'no-cache, max-age=10, max-stale=10');
    // res.set('Expires', 'Wed, 25 Sep 2019 14:25:55 GMT');
    // Mon Sep 30 2019 14:47:54 GMT+0800
    // res.set('Expires', 'Wed, 21 Oct 2015 07:28:00 GMT');
    // res.set('Expires', 'Mon, 30 Sep 2019 14:25:55 GMT');
}
