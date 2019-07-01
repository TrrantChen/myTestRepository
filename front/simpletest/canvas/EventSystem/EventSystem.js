// todo a canvas event system just 4 canvas
export default class EventSystem {
    env = void 0;
    option = {};
    cache = {}

    // 组建这样一种数据结构
    //  {
    //      event_type: {
    //          uuid: handler
    //      }
    //  }

    constructor(option) {
        let default_option = {
            env: window,
        };

        this.option = Object.assign(default_option, option || {});
    }

    on(event_type, handler) {
        let uuid = void 0;

        if (!handler.uuid) {
            // uuid 会存在覆盖的问题？
            uuid = this._setUuid();
            handler.uuid = uuid;
        }
        else {
            uuid = handler.uuid;
        }

        if (!this.cache[event_type]) {
            this.cache[event_type] = {};
            this.cache[event_type][uuid] = handler;
        }
        else {
            if (!this.cache[event_type][uuid]) {
                this.cache[event_type][uuid] = handler;
            }
            else {
                console.log(`the handler has cache, uuid is ${uuid}, event_type is ${event_type}`);
            }
        }

        this._dispatch(event_type, uuid);
    }

    _dispatch(event_type, uuid) {
        let handler = this.cache[event_type][uuid];

    }

    _setUuid(len, radix) {
        let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        let uuid = [],
            i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | (Math.random() * radix)];
            }
        }
        else {
            // rfc4122, version 4 form
            let r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | (Math.random() * 16);
                    uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    }
}



