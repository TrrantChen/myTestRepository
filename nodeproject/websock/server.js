const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });

// 初始化
// 链接回调
// 心跳

wss.on('open', () => {
    console.log('open');
});

wss.on('close', () => {
    console.log('close');
});

wss.on('connection', (ws, req) => {
    let protocol_obj = createProtocolObj(ws.protocol);
    console.log(`${protocol_obj.uuid} is connected`);

    // msg 的格式为
    // {
    //      request_type: 'send' or 'get'
    //      value: ''
    // }
    ws.on('message', (msg) => {
        console.log(`received message from ${protocol_obj.uuid} `);

        let msg_obj = void 0;

        try {
            msg_obj = JSON.parse(msg) || void 0;
        } catch(e) {
            console.error(e);
        }

        if (msg_obj) {
            let request_type = msg_obj.request_type;
            let page = msg_obj.page;
            let data = '';
            let msg_value = msg_obj.value;

            switch(request_type) {
                case 'send':
                    syncData(msg_value, page);

                    for (var client of wss.clients) {
                        if (client.readyState === WebSocket.OPEN) {
                            let c_protocol_obj = createProtocolObj(client.protocol);

                            if (c_protocol_obj.uuid !== protocol_obj.uuid) {
                                client.send(JSON.stringify(msg_obj));
                            }
                        }
                    }

                    break;
                case 'click':
                    let main = void 0;

                    for (var client of wss.clients) {
                        if (client.readyState === WebSocket.OPEN) {
                            let c_protocol_obj = createProtocolObj(client.protocol);

                            if (c_protocol_obj.uuid !== protocol_obj.uuid) {
                                client.send(JSON.stringify(msg_obj));
                            }
                            else {
                                main = client;
                            }
                        }
                    }

                    if (main) {
                        main.send(JSON.stringify(msg_obj));
                    }

                    break;
                case 'get':
                default:
                    data = getInitDataFromBusiness(page);
                    ws.send(JSON.stringify(data));
                    break;
            }
        }
    })
});

wss.on('error', (e) => {
    console.error(e);
});

function getInitDataFromBusiness(page) {
    let result = {};

    switch(page) {
        case '1':
            break;
        case '2':
        default:
            break;
    }

    return result;
}

function getStepDataFromBusiness(page) {
    let result = {};

    switch(page) {
        case '1':
            break;
        case '2':
        default:
            break;
    }

    return result;
}

function syncData(data, page) {
    switch(page) {
        case '1':
            break;
        case '2':
        default:
            break;
    }
}

function createProtocolObj(str) {
    let result = {
        uuid: '',
        page: '',
    };

    if (str && str !== '') {
        let lst = str.split('#');

        if (lst && lst.length > 1) {
            result.uuid = lst[0];
            result.page = lst[1];
        }

    }

    return result;
}

setInterval(() => {
    console.log('====all client====');
    for (var client of wss.clients) {
        // if (client.readyState === WebSocket.OPEN) {
            let c_protocol_obj = createProtocolObj(client.protocol);
            console.log(c_protocol_obj.uuid);
        // }
    }

    console.log('=====all open client=====');
    for (var client of wss.clients) {
        if (client.readyState === WebSocket.OPEN) {
            let c_protocol_obj = createProtocolObj(client.protocol);
            console.log(c_protocol_obj.uuid);
        }
    }

}, 5000);
