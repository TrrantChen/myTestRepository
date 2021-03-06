const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8082 });

wss.on('open', () => {
    console.log('open');
});

wss.on('close', () => {
    console.log('close');
});

wss.on('connection', function connection(ws, req) {
    // console.log('======================================');
    // console.log(ws);
    // console.log('--------------------------------------');
    // console.log(req);
    // console.log('======================================');

    let token = ws.protocol;
    console.log(`${token} is connected`);

    ws.send(`welcome ${token}`);
    ws.on('message', function incoming(message) {
        console.log(`received message from ${token} `);

        let msg_obj = JSON.parse(message) || null;

        if (msg_obj) {
            let type = msg_obj.type;

            switch(type) {
                case 'show_all':
                    console.log(`client size is ${wss.clients.size}`);
                    break;
                case 'msg':
                default:
                    // 广播消息给所有客户端
                    for (var client of wss.clients) {
                        console.log(client);
                        if (client.readyState === WebSocket.OPEN && client.protocol !== token) {
                            console.log('--------------------------------------------');
                            client.send( `${token} ->  ${msg_obj.value}`);
                            console.log('--------------------------------------------');
                        }
                    }
                    break;
            }

        }

    });

    ws.on('pong', () => {
        console.log('pong fired');
        let is_alive = true;
    });

    ws.ping(function() {});
});



