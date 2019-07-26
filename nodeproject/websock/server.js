const WebSocket = require('ws');
const ParticleEllipse = require('./business/ParticleEllipse');
const Group = require('./business/Group');
const wss = new WebSocket.Server({ port: 8081 });

wss.on('open', () => {
    console.log('open');
});

wss.on('close', () => {
    console.log('close');
});

wss.on('connection', (ws, req) => {
    ws.is_alive = true;

    let protocol_obj = createProtocolObj(ws.protocol);
    console.log(`${protocol_obj.uuid} is connected`);

    // 接收的msg的格式为
    // {
    //      request_type: 'send' / 'get' / 'broadcast'
    //      data_type: ''
    //      value: ''
    // }
    //
    // 返回的消息格式为
    // {
    //     data_type: '',
    //         values: [],
    // }
    ws.on('message', (msg) => {
        console.log(`received message from ${protocol_obj.uuid} `);

        let request = void 0;

        try {
            request = JSON.parse(msg) || void 0;
        } catch(e) {
            console.error(e);
        }

        if (request) {
            let request_type = request.request_type;
            let data_type = request.data_type;

            switch(request_type) {
                case 'send':
                    sendProcess(request, protocol_obj, ws);

                    if (data_type === 'state') {
                        syncData(request.value, protocol_obj.page);
                    }

                    break;
                case 'broadcast':
                    broadcastProcess(request, protocol_obj, ws);
                    break;
                case 'get':
                default:
                    if (request.data_type === 'ping') {
                        let response = {};
                        response.data_type = 'ping';
                        ws.send(JSON.stringify(response));
                    }
                    else {
                        getProcess(request, protocol_obj, ws);
                    }

                    break;
            }
        }
    });

    ws.on('pong', () => {
        ws.is_alive = true;
    });
});

wss.on('error', (e) => {
    console.error(e);
});

// beatHeart
setInterval(() => {
    wss.clients.forEach((ws) => {
        let protocol_obj = createProtocolObj(ws.protocol);

        if (ws.is_alive === false) {
            ws.terminate();
            console.log(`${protocol_obj.uuid} is force closed`);
        }
        else {
            ws.is_alive = false;
            ws.ping(noop);
            console.log(`${protocol_obj.uuid} still connect`);
        }
    })
}, 10 * 60 * 1000);

function sendProcess(request, protocol_obj, ws) {
    let response = {};
    response.values = [request.value];
    response.data_type = request.data_type;

    for (var client of wss.clients) {
        if (client.readyState === WebSocket.OPEN) {
            let c_protocol_obj = createProtocolObj(client.protocol);

            if (c_protocol_obj.uuid !== protocol_obj.uuid) {
                client.send(JSON.stringify(response));
            }
        }
    }
}

function broadcastProcess(request, protocol_obj, ws) {
    let main = void 0;
    let response = {};
    response.values = [request.value];
    response.data_type = request.data_type;

    for (var client of wss.clients) {
        if (client.readyState === WebSocket.OPEN) {
            let c_protocol_obj = createProtocolObj(client.protocol);

            if (c_protocol_obj.uuid !== protocol_obj.uuid) {
                client.send(JSON.stringify(response));
            }
            else {
                main = client;
            }
        }
    }

    if (main) {
        main.send(JSON.stringify(response));
    }
}

function getProcess(request, protocol_obj, ws) {
    let page = protocol_obj.page;
    let data = request.value;
    let data_type = request.data_type;
    let response = {};
    response.values = [];
    response.data_type = data_type;

    switch(data_type) {
        case 'bad_point_data':
        default:
            response.values[0] = data;
            let r = getInitDataFromBusiness(page, data);
            response.values[1] = r;
            break;
    }

    ws.send(JSON.stringify(response));
}

function getInitDataFromBusiness(page, data) {
    let result = void 0;

    switch(parseInt(page)) {
        case 1:
            result = ParticleEllipse.getInitData(data);
            break;
        case 2:
        default:
            result = Group.getInitData(data);
            break;
    }

    return result;
}

function syncData(data, page) {
    switch(parseInt(page)) {
        case 1:
        default:
            ParticleEllipse.setState(data);
            break;
        case 2:
            Group.setState(data);
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

function noop() {}

// setInterval(() => {
//     console.log('====all client====');
//     for (var client of wss.clients) {
//         // if (client.readyState === WebSocket.OPEN) {
//             let c_protocol_obj = createProtocolObj(client.protocol);
//             console.log(c_protocol_obj.uuid);
//         // }
//     }
//
//     console.log('=====all open client=====');
//     for (var client of wss.clients) {
//         if (client.readyState === WebSocket.OPEN) {
//             let c_protocol_obj = createProtocolObj(client.protocol);
//             console.log(c_protocol_obj.uuid);
//         }
//     }
//
// }, 5000);


