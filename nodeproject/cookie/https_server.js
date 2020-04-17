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
    console.log('https://test1.com/web/test.html')
});

https_app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://test2.com');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Credentials', true);

    next();
});

https_app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://test2.com');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Credentials', true);

    next();
});

https_app.use('/web', express.static('https_static', {
        setHeaders: setHeadersFunc
    }
));

https_app.get('/getCookieCORS', function (req, res) {
    res.send(req.headers.cookie);
});

https_app.post('/getCookieCORSPOST', function (req, res) {
    res.send(req.headers.cookie);
});

https_app.get('/sendCookie2Server', function (req, res) {
    console.log(req.headers.cookie);
    res.send(req.headers.cookie);
});

https_app.get('/getCookieFromServer', function (req, res) {
    res.cookie('cookie', 'https' + new Date().getTime(), {
        secure: true,
        sameSite: 'none',
        // httpOnly: true,
    });
    console.log(req.headers.cookie);
    res.send(req.headers.cookie);
});

https_app.get('/setCookieByClient', function (req, res) {
    console.log(req.headers.cookie);
    res.send(req.headers.cookie);
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

function setHeadersFunc(res, path, stat) {
    // res.cookie('cookie', 'https' + new Date().getTime(), {
    //     // secure: true,
    //     // httpOnly: true,
    // });
}
