const http = require("http");
const events = require('events');
const url = require("url");
const fs = require("fs");
const express = require("express");
const app = express();

// class MyEmitter extends events {};

// const myEmitter = new MyEmitter();

var EventEmitter = events.EventEmitter;
var myEmitter = new EventEmitter();

// process.on('uncaughtException', (err) => {
//     console.log("uncaughtException " + err);
// });


// myEmitter.on("error", (a) => {
//     console.log(a);
// })


http.createServer((request, response) => {
    console.log("this is work")
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });

    response.write("hello");
    response.end();
}).listen(8888)


app.get('/', function (req, res) {
    try {
        var error = new Error("test");
        throw error;
        res.send('Hello World!');        
    }
    catch(err) {
        console.log(err);
        res.send('err'); 
    }
});

// try {
//     app.get('/', function(req, res) {
//         var error = new Error("test");
//         throw error;
//         res.send('Hello World!');
//     });
// } catch (err) {
//     console.log(err);
// }



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
}); 













