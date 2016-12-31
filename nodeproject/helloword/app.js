var express = require('express');
var app = express();
var config = require('./config.json');
var testExport = require('./testExport');
var testExportWidhModule = require('./testExportWithModule');


app.use('/web', express.static('public'));

app.get('/', function(req, res) {
    res.send(config.name);
});

app.get('/test', function(req, res) {
    res.send(testExport.getAppName("ta"));
});

app.post('/testModule', function(req, res) {
    res.send("post");
})

app.get('/testModule', function(req, res) {
    res.send(testExportWidhModule(10));
})

var server = app.listen(8999, function() {
    var host = server.address().address;
    console.log("server is " + server.address())
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});