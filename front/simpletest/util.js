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
