const axios = require('axios');
const fs = require("fs");

const path = './static/task_obj.js';
let is_test = false;
let url = is_test
    ? 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=8289f3ee-e23c-49d4-8e1e-ce6a0fc47e79'
    : 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=99871ab9-3eb0-460b-8b17-b18853bee06b';

let period = is_test ? 1 * 10 * 1000 : 30 * 60 * 1000;
let add_time = is_test ? 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;

let now = new Date();
let toady = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} 09:30:00`;
let post_date = new Date(toady).getTime();
let is_post = true;

function getData(obj) {
    transformData(obj);
    let view = makeViewData(obj);

    let data =  {
        msgtype: "markdown",
        markdown: {
            content: view,
        },
    };

    return data;
}

function transformData(data) {
    let last = data.last;
    let now = data.now;
    let last_keys = Object.keys(last);

    for (var last_key of last_keys) {
        if (parseInt(last[last_key]) >= 100) {
            delete last[last_key];
        } else {
            last[last_key] = parseInt(last[last_key]) + 10;

            if (parseInt(last[last_key]) + 10 >= 100) {
                delete now[last_key];
            } else {
                now[last_key] = '';
            }
        }
    }
}

function makeViewData(data) {
    let result = '';
    let last = data.last;
    let now = data.now;
    let last_keys = Object.keys(last);
    let now_keys = Object.keys(now);

    result += '### 昨日工作进度\n';

    for (var last_key of last_keys) {
        result += `>${last_key}:<font color="info">${last[last_key]}</font>\n`;
    }

    result += '\n';
    result += '### 今日工作内容\n';

    for (var now_key of now_keys) {
        result += `>${now_key}\n`;
    }

    result += '\n';
    result += '### 遇到问题反馈\n';
    result += '无\n';
    result += '### 需要协调资源\n';
    result += '无\n';

    return result;
}

function postData(data, task_obj) {
    let json_data = JSON.stringify(data);


    let options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: json_data,
        url,
    };

    axios(options)
        .then(function (response) {
            console.log('success');
            console.log(response.data);
            modifyJsFile(task_obj);
            // console.log(response);
        })
        .catch(function (error) {
            console.log('error');
            // console.log(error);
        });
}

function timeHandle() {
    setTimeout(() => {
        try {
            let now = new Date().getTime();

            console.log(`now is ${now} post_date is ${post_date}`);

            if (now > post_date) {
                post_date = post_date + add_time;
                if (!is_post) {
                    let task_obj = require(path);
                    let data = getData(task_obj);
                    postData(data, task_obj);
                    console.log(`done  now:${now}  post_date:${post_date}`);
                    is_post = true;
                }
                else {
                    console.log(`no done is_post is true now:${now}  post_date:${post_date}`);
                }
            }
            else {
                is_post = false;
                console.log(`no done now less post_date  now:${now}  post_date:${post_date}`);
            }
        } catch(e) {
            console.error(e);
        }
        finally {
            timeHandle();
        }
    }, period);
}

function modifyJsFile(data) {
    // 默认写入操作时覆盖原文件
    let json_data = JSON.stringify(data).replace(/{|,/g, '$&\r\n').replace(/}/g, '\r\n$&');
    let file_content =  `module.exports = ${ json_data }`;

    fs.writeFile(path, file_content, (err) => {
        if (err) {
            console.log(err);
        } else {
            // console.log('success');
            // let task_obj = require(path);
            // console.log(task_obj);
        }
    });
}


function start() {
    timeHandle();
}

start();

function test() {
    let a = {
        last: {
            "鹰眼字段功能联调中": "20",
            "日报自动化脚本开发": "90",
            "印尼审核页面展示项修改": "90",
            "印尼审核工作台订单展示修改": "90",
            "印尼字段联调": "20",
        },
        now: {}
    };

    modifyJsFile(a)
}

// test();














