onmessage = (e) => {
    console.log('receive data from main thread');
    console.log(e.data.postData);
    changeData(e.data.postData);
    console.log(e.data.postData);
    postMessage(e.data.postData);
};

function changeData(data) {
    data.value = 'ffff';
}