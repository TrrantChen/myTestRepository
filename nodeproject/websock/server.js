const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('open', () => {
    console.log('connected');
});

wss.on('close', () => {
    console.log('close');
});

wss.on('connection', function connection(ws, req) {
    const ip = req.connection.remoteAddress;
    const port = req.connection.remotePort;
    const clientName = ip + port;
    console.log(`${clientName} is connected`);

    ws.send(`welcome ${clientName}`);
    ws.on('message', function incoming(message) {
        console.log(`received: ${message} from ${clientName} `);

        console.log('============');
        console.log(ws);
        console.log('==============');

        // 广播消息给所有客户端
        for (var client of wss.clients) {
            if (client.readyState === WebSocket.OPEN) {
                console.log('--------------------------------------------');
                client.send( `${clientName} ->  ${message}`);
                console.log(client);
                console.log('--------------------------------------------');

            }
        }
    });
});
