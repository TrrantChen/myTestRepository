const WebSocket = require('ws');

const wss1 = new WebSocket.Server({ port: 8081 });

const wss2 = new WebSocket.Server({ port: 8082 });

wss1.on('open', () => {
    console.log('open');
});

wss1.on('close', () => {
    console.log('close');
});

wss1.on('connection', (ws, req) => {
    console.log(`wss1 is connected`);

    ws.on('message', (msg) => {
        console.log(msg);
    })
});

wss1.on('error', (e) => {
    console.error(e);
});

wss2.on('open', () => {
    console.log('open');
});

wss2.on('close', () => {
    console.log('close');
});

wss2.on('connection', (ws, req) => {
    console.log(`wss1 is connected`);

    ws.on('message', (msg) => {
        console.log(msg);
    })
});

wss2.on('error', (e) => {
    console.error(e);
});
