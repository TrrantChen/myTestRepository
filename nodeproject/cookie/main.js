// const http = require("http");
// const https = require("https");
// const events = require('events');
// const url = require("url");
// const fs = require("fs");
// const express = require("express");
// const app = express();
// const path = require("path");
//
// let privateKey  = fs.readFileSync(path.join(__dirname, './certificate/private.pem'), 'utf8');
// let certificate = fs.readFileSync(path.join(__dirname, './certificate/file.crt'), 'utf8');
// let credentials = {key: privateKey, cert: certificate};
//
//
// let httpsServer = https.createServer(credentials, app);
//
// httpsServer.listen(11100, function() {
//     console.log('HTTPS Server is running on: https://localhost:%s', 11100);
// });
//
// app.use('/web', express.static('static',
//     {
//         setHeaders: setHeadersFunc
//     }
// ));
//
//
//
// const server = app.listen(8999, function() {
//
// });
//
// // domain	String	Domain name for the cookie. Defaults to the domain name of the app.
// //     encode	Function	A synchronous function used for cookie value encoding. Defaults to encodeURIComponent.
// //     expires	Date	Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.
// //     httpOnly	Boolean	Flags the cookie to be accessible only by the web server.
// //     maxAge	Number	Convenient option for setting the expiry time relative to the current time in milliseconds.
// //     path	String	Path for the cookie. Defaults to “/”.
// // secure	Boolean	Marks the cookie to be used with HTTPS only.
// //     signed	Boolean	Indicates if the cookie should be signed.
// //     sameSite	Boolean or String	Value of the “SameSite”
//
// function setHeadersFunc(res, path, stat) {
//     res.cookie('cookie1', '1', {
//         // secure: true,
//         httpOnly: true,
//     });
// }
//
// app.use('/web', express.static('static2',
//     {
//         setHeaders: setHeadersFunc
//     }
// ));
//
//
//
// app.get('/cookie1', function (req, res) {
//     res.send(req.query.a);
// });
//
// const app2 = express();
//
// const server2 = app2.listen(9000, function() {
//
// });
//
// app2.use('/web2', express.static('static',
//     {
//         setHeaders: setHeadersFunc2
//     }
// ));
//
// app2.get('/cookie2', function (req, res) {
//     setHeadersFunc2(res);
//     res.send(req.query.a);
// });
//
// function setHeadersFunc2(res, path, stat) {
//     res.cookie('cookie2', '2');
// }
//
//
//
//
//
//
//
//

require('./http_server');
require('./https_server');

