// 判断有没有循环
export function isCyclic (obj) {
    var seenObjects = [];

    function detect (obj) {
        if (obj && typeof obj === 'object') {
            if (seenObjects.indexOf(obj) !== -1) {
                return true;
            }
            seenObjects.push(obj);
            for (var key in obj) {
                if (obj.hasOwnProperty(key) && detect(obj[key])) {
                    console.log(obj, 'cycle at ' + key);
                    return true;
                }
            }
        }
        return false;
    }

    return detect(obj);
}

// 用于批量处理数据
export async function batchQuery(env, query_statement, stop_conn, call_back) {
    let index = 0;

    if (stop_conn) {
        while(!stop_conn.apply(env, [index])) {
            if (query_statement) {
                let result = await query_statement.apply(env, [index]);

                if (call_back) {
                    call_back.apply(env, [result]);
                }
            }

            ++index;
        }
    }
}

export function getUuid(len, radix) {
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
