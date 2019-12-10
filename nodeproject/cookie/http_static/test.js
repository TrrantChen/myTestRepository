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

function getCORSCookie() {
    const cors_instance = axios.create({
        baseURL: 'https://test1.com',
        withCredentials: true,
        timeout: 1000,
    });

    cors_instance.get('/getCookieCORS', {
        timeout: 5000
    })
        .then((value) => {
            console.log(value.data);
        })
}

function getCORSCookiePost() {
    const cors_instance = axios.create({
        baseURL: 'https://test1.com',
        withCredentials: true,
        timeout: 1000,
    });

    cors_instance.post('/getCookieCORSPOST', {
        timeout: 5000
    })
        .then((value) => {
            console.log(value.data);
        })
}
