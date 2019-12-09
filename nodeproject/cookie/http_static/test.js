let set_cookie = document.querySelector('#set_cookie');
let get_data = document.querySelector('#get_data');

const instance = axios.create({
    baseURL: 'http://test2.com',
    withCredentials: true,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

set_cookie.addEventListener('click', (evt) => {
    setCookie();
});

get_data.addEventListener('click', (evt) => {
    getData();
});

function setCookie() {
    instance.get('/setCookie', {
        timeout: 5000
    })
        .then((value) => {
            console.log(value.data);
        });
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
            console.log(value.data);
        });
}

function getCookie() {
    instance.get('/getCookie', {
        timeout: 5000
    })
        .then((value) => {
            console.log(value.data);
        });
}

