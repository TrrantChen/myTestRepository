function printValue(value) {
    alert('这是跨域的 ' + value);
}

function getData() {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:9000',
        withCredentials: true,
        timeout: 1000,
        headers: {'X-Custom-Header': 'foobar'}
    });

    instance.get('/getData', {
        timeout: 5000
    })
        .then((value) => {
            alert('这是跨域的 ' + value.data);
        })
}

// getData();
