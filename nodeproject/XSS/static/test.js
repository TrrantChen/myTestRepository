axios.get('/getxss', {
    params: {
        a: '12345',
    },
    test_para: 'ppp',
})
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });

function addHtml() {
    let content = document.querySelector('.content');
    let textarea = document.querySelector('textarea');
    let span = document.querySelector('span');

    span.innerText = projectXss(textarea.value);
    content.innerHTML = projectXss(textarea.value);
}

function projectXss(v) {
    v = v.replace(/&/g, "&amp;");
    v = v.replace(/</g, "&lt;");
    v = v.replace(/>/g, "&gt;");
    v = v.replace(/"/g, "&quot;");
    v = v.replace(/'/g, "&#39;");
    return v;
}

