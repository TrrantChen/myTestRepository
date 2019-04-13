// 最原始的帧数控制方法
export function tick(ftp = 60) {
    let interval = 1000 / ftp;
    let uuid = createUuid();
    let count = 0;
    let then = Date.now();
    let now = void 0;

    let exec = function(func = () => { console.log('done') }, ) {
        now = Date.now();
        count++;

        if (now - then > interval) {
            func(interval);
            then = Date.now();
        }

        requestAnimationFrame(() => {
            exec(func);
        })
    };

    return exec;
}

export function anotherTickFromWeb(func = () => { console.log('done') }, ftp = 60) {
    let interval = 1000 / ftp;
    let then = Date.now();
    let now = void 0;
    let acc = 0;

    let exec = function() {
        now = Date.now();
        let pass = now - then;
        then = now;
        acc += pass;

        while (acc >= interval) {
            func(interval);
            acc -= interval;
        }

        requestAnimationFrame(() => {
            exec();
        })
    };

    return exec;
}

// 帧数控制类 将控制器放到外面
export class Tick {
    ftp = 0;
    interval = 0;
    now = 0;
    then = 0;
    callback = void 0;
    is_parse = true;
    env = void 0;

    constructor(ftp = 60, env = window) {
        this.ftp = ftp;
        this.then = Date.now();
        this.interval = 1000 / this.ftp;
        console.log(this.interval);
        this.env = env;
    }

    setCallback(callback) {
        this.callback = callback;
    }

    parse() {
        this.is_parse = true;
    }

    start() {
        this.is_parse = false;
    }

    update() {
        if (!this.is_parse) {
            this.now = Date.now();

            if (this.now - this.then >= this.interval) {
                this.callback.apply(this.env, [this.now, this.now - this.then]);
                this.then = Date.now();
            }
        }
    }
}

// 用于测试setTimeout, 或者requestAnimationFrame的帧数
export function getFtps(raf) {
    let framecount = 0;
    let allframecount = 0;
    let then = Date.now();

    let loop = function() {
        let now = Date.now();
        framecount++;
        allframecount++;

        if (now - then > 1000) {
            console.log(framecount);
            console.log(`ftp is ${ Math.round(framecount * 1000 / (now - then)) }`);
            framecount = 0;
            then = now;
        }

        raf(loop);
    };

    loop();
}

function createUuid(len, radix) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) {
            uuid[i] = chars[0 | Math.random()*radix];
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
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}

// 一个补间动画算法
export class Tween {
    source = 0;
    current = 0;
    target = 0;
    duration = 0;
    start_time = 0;
    Now = window.performance.now.bind(window.performance);
    is_finish = false;
    start_callback = void 0;
    update_callback = void 0;
    env = void 0;

    constructor(option) {
        let default_option = {
            source: 0,
            target: 0,
            duration: 1000,
            env: window,
        };

        let current_option = Object.assign(default_option, option);

        this.source = JSON.parse(JSON.stringify(current_option.source));
        this.current = current_option.source;
        this.target = current_option.target;
        this.duration = current_option.duration;
        this.env = current_option.env;
    }

    start() {
        this.start_time = this.Now();

        if (this.start_callback) {
            this.start_callback.apply(this.env, []);
        }
    }

    update() {
        if (!this.is_finish) {
            let now = this.Now();
            let elapsed = (now - this.start_time) / this.duration;
            elapsed = elapsed > 1 ? 1 : elapsed;

            if (elapsed === 1) {
                this.is_finish = true;
            }

            this._calculateDistance(elapsed);



            if (this.update_callback) {
                this.update_callback.apply(this.env, [this.current]);
            }
        }
    }

    _calculateDistance(elapsed) {
        let type_str = Object.prototype.toString.call(this.source);

        switch(type_str) {
            case "[object Array]":
                for (var i = 0, length = this.source.length; i < length; i++) {
                    this.current[i]  = this.source[i] + (this.target[i] - this.source[i]) * elapsed;
                }

                break;
            case "[object Object]":
            default:
                this.current.x = this.source.x + (this.target.x - this.source.x) * elapsed;
                this.current.y = this.source.y + (this.target.y - this.source.y) * elapsed;
                this.current.y = this.source.y + (this.target.y - this.source.y) * elapsed;
                break;
            case "[object Number]":
            case "[object String]":
                this.current = parseInt(this.source) + (parseInt(this.target) - parseInt(this.source)) * elapsed;
                break;
        }
    }

    setStartCallback(func) {
        this.start_callback = func;
    }

    setUpdateCallback(func) {
        this.update_callback = func;
    }


}
