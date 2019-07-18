const WebSocket = require('ws');
const ParticleEllipse = require('./business/ParticleEllipse');
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
    //      request: ''
    //      response: '',
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

            switch(request_type) {
                case 'send':
                    sendProcess(msg_obj, protocol_obj, ws);
                    break;
                case 'click':
                    clickProcess(msg_obj, protocol_obj, ws);
                    break;
                case 'get':
                default:
                    getProcess(msg_obj, protocol_obj, ws);
                    break;
            }
        }
    })
});

wss.on('error', (e) => {
    console.error(e);
});

function sendProcess(msg_obj, protocol_obj, ws) {
    msg_obj.response = msg_obj.request;
    let page = protocol_obj.page;

    // syncData(msg_value, page);

    for (var client of wss.clients) {
        if (client.readyState === WebSocket.OPEN) {
            let c_protocol_obj = createProtocolObj(client.protocol);

            if (c_protocol_obj.uuid !== protocol_obj.uuid) {
                client.send(JSON.stringify(msg_obj));
            }
        }
    }
}

function clickProcess(msg_obj, protocol_obj, ws) {
    let main = void 0;
    msg_obj.response = msg_obj.request;

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
}

function getProcess(msg_obj, protocol_obj, ws) {
    let page = protocol_obj.page;
    let data = msg_obj.request;
    let data_type = msg_obj.data_type;

    switch(data_type) {
        case 'rotate_y':
            msg_obj.response = getRotatoYFromBusiness(page);
            break;
        case 'bad_point_data':
        default:
            let bad_point_positions =  getInitDataFromBusiness(page, data);

            msg_obj.response = {
                bad_point_data: msg_obj.request,
                bad_point_positions: bad_point_positions,
            };

            break;
    }

    ws.send(JSON.stringify(msg_obj));
}

function getInitDataFromBusiness(page, data) {
    let result = void 0;

    switch(page) {
        case '1':
            result = ParticleEllipse.getInitData(data);
            break;
        case '2':
        default:
            break;
    }

    return result;
}

function getRotatoYFromBusiness(page) {
    let result = void 0;

    switch(page) {
        case '1':
        default:
            result = ParticleEllipse.getRotateY();
            break;
        case '2':
            break;
    }

    return result;
}

function getParticleEllipseInitData(data) {

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


