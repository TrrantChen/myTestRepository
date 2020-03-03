
function jsonpTest() {

    jsonpAop('cb');

    let script = document.createElement('script');

    script.src = 'http://127.0.0.1:9000/jsonptest?cb=call';
    document.body.appendChild(script);
    document.body.removeChild(script);

}

function call(value) {
    console.log('call');
    console.log(value);
}
