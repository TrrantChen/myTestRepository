 // 加深对addEvent库的理解

 function addEvent(elem, type, handler) {

    // 为没一个handler添加一个guid
    if (!handler.$$guid) {
        handler.$$guid = addEvent.guid++;
    }

    //
    if (!elem.events) {
        elem.events = {};
    }

    // 获取这个元素在这个事件类型上的所有回调
    let handlers = elem.events[type];

    // 如果事件回调为空，如第一次进来
    if (!handlers) {

        // 相当于 handlers = {}; elem.events[type] = {};
        // 但还是有点不同，即handlers和elem.events[type]指向的是同一个空间，handlers一变，elem.events[type]也会变，反之亦然
        handlers = elem.events[type] = {};

        // 如果元素存在另外一种方式的注册事件，则把这个用另外一种方式注册的回调存到handlers中
        if (elem[`on${type}`]) {
            handlers[0] = elem[`on${type}`];
        }
    }

    // 将回调储存起来
    handlers[handler.$$guid] = handler;
    // handle为主监听函数 onType 存储的就是主函数
    elem[`on${type}`] = handleEvent;
 }

 addEvent.guid = 1;

function removeEvent(elem, type, handler) {
    if (elem.events && elem.events[type]) {
        delete elem.events[type][handler.$$guid];
    }
}

function handleEvent(event) {
    // this 为elem
    let return_value = true;
    let handlers = this.events[event.type];

    for (var i in handlers) {
        this.$$handleEvent = handlers[i];

        if (this.$$handleEvent(event) === false) {
            return_value = false;
        }
    }

    return return_value;
}
