const http = require("http");
const https = require("https");
const events = require('events');
const url = require("url");
const fs = require("fs");
const express = require("express");
const http_app = express();


const http_server = http_app.listen(9000, function() {
    console.log('http://test2.com/web/test.html')
});

http_app.all('*',function (req, res, next) {
    // if (/\.html/.test(req.url)) {
    //     res.cookie('cookie', 'http' + (++count), {
    //         maxAge: 100000
    //     });
    // }

    next();
});

http_app.use('/web', express.static('http_static', {
    setHeaders: setHeadersFunc
}));

http_app.use(function(req, res, next) {

    if (req.url === '/getData') {
        // res.header('Access-Control-Allow-Origin', 'https://127.0.0.1:11100');
        // res.header('Access-Control-Allow-Headers', 'x-custom-header');
        // res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        // res.header('Access-Control-Allow-Credentials', true);
    }

    next();
});


http_app.get('/getData', function (req, res) {
    res.send('1000');
});

// domain	String	Domain name for the cookie. Defaults to the domain name of the app.
// encode	Function	A synchronous function used for cookie value encoding. Defaults to encodeURIComponent.
// expires	Date	Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.
// httpOnly	Boolean	Flags the cookie to be accessible only by the web server.
// maxAge	Number	Convenient option for setting the expiry time relative to the current time in milliseconds.
// path	String	Path for the cookie. Defaults to “/”.
// secure	Boolean	Marks the cookie to be used with HTTPS only.
// signed	Boolean	Indicates if the cookie should be signed.
// sameSite	Boolean or String	Value of the “SameSite”

let count = 0;
http_app.get('/setCookie', function (req, res) {
    res.cookie('cookie', 'http' + (++count), {
        // maxAge: 1000000,
        // sameSite: true,
        // path: '/getData',
        // secure: false,
        // sameSite: 'None',
    })
        .send('cookie set');
});

http_app.get('/getCookie', function (req, res) {
    res.send(req.headers.cookie);
});

function setHeadersFunc(res, path, stat) {

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
