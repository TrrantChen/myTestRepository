var express = require('express');
var app = express();
var httpProxy = require('http-proxy');
var http = require('http');

app.get('/', function(req, res) {

    res.send("this is proxy");
});


app.get('/test', function(req, res) {
    if (req.query.name != undefined) {
        res.send(req.query.name);
    } else {
        res.send("test");
    }
    
});

app.get('/debug', function(req, res) {
        res.send("debug"); 
});

var server1 = app.listen(9099, function() {
    // var host = server.address().address;
    // console.log("server is " + server.address())
    // var port = server.address().port;
    // console.log('Example app listening at http://%s:%s', host, port);
});

var server2 = app.listen(9098, function() {
    // var host = server.address().address;
    // console.log("server is " + server.address())
    // var port = server.address().port;
    // console.log('Example app listening at http://%s:%s', host, port);
});


// var proxy = httpProxy.createProxyServer({});
// var server = http.createServer(function(req, res){
//     proxy.web(req, res, {target:'http://10.9.235.133:8999'});
// })
// console.log("listen on port 10000")
// server.listen(10000);


//======= Setup a basic stand-alone proxy server
httpProxy.createProxyServer({target:'http://10.9.235.133:10086'}).listen(10000);
http.createServer(function(req, res){
    res.write('this is true');
    res.end();
}).listen(10086);

//======= Setup a stand-alone proxy server with custom server logic
var proxy = httpProxy.createProxyServer({});
var server = http.createServer(function(req, res){
  // You can define here your custom logic to handle the request
  // and then proxy the request.    
    proxy.web(req, res, {target:'http://10.9.235.133:8999'});
})
console.log("listen on port 10001")
server.listen(10001);

//======= Setup a stand-alone proxy server with proxy request header re-writing
var proxy1 = httpProxy.createProxyServer({});

proxy1.on('proxyReq', function(proxyReq, req, res, optioins) {
    // 会修改发给8999的消息头
    console.log("proxyReq change");
    proxyReq.setHeader('xxx', 'footbar');
})

var server1 = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.

  console.log("proxy send")
  proxy1.web(req, res, {
    target:'http://10.9.235.133:8999'
  });
});

console.log("listening on port 10002")
server1.listen(10002);
