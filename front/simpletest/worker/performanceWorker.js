onmessage = (e) => {
    let data = e.data;
    console.log('sub receive data');

    for (var i = 0, length = data.length; i < length; i++) {
        data[i]++;
    }

    console.log('sub send data');
    postMessage(data);
}