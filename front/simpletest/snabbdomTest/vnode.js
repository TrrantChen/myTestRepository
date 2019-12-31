"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// vnode可以说就只是一层简单的抽象，就是一个obj，里面会存放需要转换成dom的信息。
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children, text: text, elm: elm, key: key };
}
exports.vnode = vnode;
exports.default = vnode;
//# sourceMappingURL=vnode.js.map