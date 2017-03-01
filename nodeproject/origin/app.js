const http = require("http");
const events = require('events');
const url = require("url");

// class MyEmitter extends events {};

// const myEmitter = new MyEmitter();

var EventEmitter = events.EventEmitter;
var myEmitter = new EventEmitter();

process.on('uncaughtException', (err) => {
    console.log(err);
});


myEmitter.on("eventTest", (a) => {
    console.log(a);
})

myEmitter.emit("eventTest", "para")

http.createServer((request, response) => {
    console.log("this is work")
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write("hello");
    response.end();
}).listen(8888)
