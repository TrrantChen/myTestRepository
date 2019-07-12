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
    let token = ws.protocol;
    console.log(`${token} is connected`);

    ws.on('message', (msg) => {
        console.log(`received message from ${token} `);
    })
});

wss.on('error', (e) => {
    console.error(e);
});
