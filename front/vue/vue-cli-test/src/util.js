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

export function getRandomArbitrary(min, max) {
    min = min == void 0 ? 0 : min;
    max = max == void 0 ? 100 : max;
    return Math.random() * (max - min) + min;
}