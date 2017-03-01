const http = require("http");
const events = require('events');
const url = require("url");
const fs = require("fs");

// class MyEmitter extends events {};

// const myEmitter = new MyEmitter();

var EventEmitter = events.EventEmitter;
var myEmitter = new EventEmitter();

// process.on('uncaughtException', (err) => {
//     console.log("uncaughtException " + err);
// });


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


function test() {
    try {
        setTimeout(() => {
            var err = new Error("test");
            throw err;
        }, 0)
    } catch(err) {
        // 这不会捕获到抛出！
        console.log("time catch " + err);
    }
}

test();




