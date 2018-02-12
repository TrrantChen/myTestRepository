export async function loadPattener(state, ...funcArr) {
    if (state === void 0) {
        state = true;
    } else {
        state = !state;
    }

    if (funcArr.length !== 0) {
        for (var i = 0, length = funcArr.length; i < length; i++) {
            let func = funcArr[i];
            if (Object.prototype.toString.call(func) === '[object Function]') {
                await func();
            }
        }
    }

    state =  false;
}