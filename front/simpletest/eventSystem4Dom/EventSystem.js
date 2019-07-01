// 最简单的一个事件封装模型
import { getUuid } from '../util.js';

export function equipDom(dom) {
    if (dom) {
        if (!dom.$on) {
            dom.$on = on;
        }

        if (!dom.$remove) {
            dom.$remove = remove;
        }

        if (!dom.$removeAll) {
            dom.$removeAll = reomveAll;
        }
    }
}

function on(event_type, func) {

    if (!func.uuid) {
        func.uuid = getUuid();
    }

    let uuid = func.uuid;
    let dom = this;

    if (!dom.$event_obj) {
        dom.$event_obj = {};
        dom.$event_obj[event_type] = {};
        dom.$event_obj[event_type][uuid] = func;
    }
    else {
        if (!dom.$event_obj[event_type]) {
            dom.$event_obj[event_type] = {};
            dom.$event_obj[event_type][uuid] = func;
        }
        else {
            if (!dom.$event_obj[event_type][uuid]) {
                dom.$event_obj[event_type][uuid] = func;
                dom.addEventListener(event_type, func);
            }
        }
    }

}

function reomveAll() {
    let dom = this;

    if (dom.$event_obj) {
        let event_type_lst = Object.keys(dom.$event_obj);

        for (var event_type of event_type_lst) {
            let funcs = Object.values(dom.$event_obj[event_type]);

            for (var func of funcs) {
                remove(event_type, func);
            }
        }
    }
}

function remove(event_type, func) {
    let dom = this;
    let uuid = func.uuid;

    if (dom.$event_obj && uuid && dom.$event_obj[event_type] && dom.$event_obj[event_type][uuid]) {
        delete dom.$event_obj[event_type][uuid];
        dom.removeListener(event_type, func);
    }
}



