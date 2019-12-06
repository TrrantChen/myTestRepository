const http = require("http");
const events = require('events');
const url = require("url");
const fs = require("fs");
const express = require("express");
const app = express();

app.use('/web', express.static('static',
    {
        setHeaders: setHeadersFunc
    }
));

const server = app.listen(8999, function() {

});

function setHeadersFunc(res, path, stat) {
    res.set('Cache-Control', 'no-store');
    setCookie(res);
}

function setCookie(res) {
    res.set('X-XSS-Protection', '1');
    res.cookie('ddddd', 'ddsads');
}

//在url 输入http://127.0.0.1:8999/getxss?a=<script>alert(document.cookie)</script> 就可以做一个反射型xss
app.get('/getxss', function (req, res) {
    setCookie(res);
    // res.send(escapeHTML(req.query.a));
    // res.send(req.query.a);
    // res.sendStatus(200);

    let result = {
        value: req.query.a
    };

    res.send(JSON.stringify(result));
});

// 对get的值进行过滤
function escapeHTML(str) {
    if (!str) return '';
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/'/g, "&#39;");
    return str;
}






