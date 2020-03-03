// 用proxy是无法实现的

let set_once =true;

function jsonpAop(jsonp_name, new_cb_name = 'test', new_cb = function(data) { console.log('new_cb'); console.log(data); }) {
    let _createElement = document.createElement;

    document.createElement = function(tag) {
        let dom = _createElement.call(document, tag);

        if (tag === 'script') {
            proxyScriptSrc(dom, jsonp_name, new_cb_name, new_cb);
        }

        return dom;
    }
}

function proxyScriptSrc(dom, jsonp_name, new_cb_name, new_cb) {
    Object.defineProperty(dom, 'src',{
        get : function(){
            return src
        },
        set : function(value){
            if (set_once) {
                requestAgain(value, jsonp_name, new_cb_name, new_cb);
                set_once = false;
            }

            dom.setAttribute('src', value);
        }
    });
}

function requestAgain(url, jsonp_name, new_cb_name, new_cb) {
    setTimeout(() => {
        let script = document.createElement('script');


        window[new_cb_name] = new_cb;

        let result = new RegExp(jsonp_name + '=(.*)', 'g').exec(url);
        let old_cb_name = result[1];


        url= url.replace(old_cb_name, new_cb_name);


        script.src = url;
        document.body.appendChild(script);
        document.body.removeChild(script);

    })
}
