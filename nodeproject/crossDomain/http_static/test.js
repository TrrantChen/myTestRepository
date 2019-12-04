function printValue(value) {
    alert(value);
}

function getData() {
    const instance = axios.create({
        headers: {'Access-Control-Allow-Origin': '*'},
        baseURL: 'http://127.0.0.1:9000',
        timeout: 1000,
    });

    instance.get('/getData', {
        timeout: 5000
    })
        .then((value) => {
            alert(value.data);
        })
}

getData();
