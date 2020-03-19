const instance = axios.create({
    baseURL: 'https://test1.com',
    withCredentials: true,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});


function sendCookieDomainTest() {
    // document.cookie = "yrd_cid=test123;Domain=.yirendai.com;path=/";

    document.cookie = 'aa=test';

    instance.get('/sendCookie2Server', {
        timeout: 5000
    })
    .then((value) => {
        console.log(value.data);
    });
}

function sendCookiePathTest() {
    // document.cookie = "yrd_cid=test123" + ";Domain=.yirendai.com;path=/"
}

function setCookieByClient() {
    document.cookie = 'aa=test;path=/;Domain=.test1.com;';

    instance.get('/setCookieByClient', {
        timeout: 5000
    })
        .then((value) => {
            console.log(value.data);
        });
}

function getCookieFromServer() {
    instance.get('/getCookieFromServer', {
        timeout: 5000
    })
        .then((value) => {
            console.log(value.data);
        });
}
