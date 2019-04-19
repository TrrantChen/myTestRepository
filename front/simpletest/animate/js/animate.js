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
    finish_callback = void 0;
    easing_func = Tween.Easing.Linear.None;
    env = void 0;

    constructor(option) {
        let default_option = {
            source: 0,
            target: 0,
            duration: 1000,
            env: window,
            easing_func: Tween.Easing.Linear.None,
        };

        let current_option = Object.assign(default_option, option);

        if (Object.prototype.toString.call(current_option.source) === '[object Float32Array]') {
            let length = current_option.source.length;
            this.source = new Float32Array(length);
            for (var i = 0; i < length; i++) {
                this.source[i] = current_option.source[i];
            }
        }
        else {
            this.source = JSON.parse(JSON.stringify(current_option.source));
        }

        this.current = current_option.source;
        this.target = current_option.target;
        this.duration = current_option.duration;
        this.env = current_option.env;
        this.easing_func = current_option.easing_func;
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
            // elapsed 和 value 需要分开
            let elapsed = (now - this.start_time) / this.duration;
            let value = this.easing_func(elapsed);

            if (elapsed > 1) {
                elapsed = 1;
                value = 1;
            }

            if (elapsed === 1) {
                this.is_finish = true;

                if (this.finish_callback) {
                    this.finish_callback.apply(this.env, [this.current]);
                }

            }

            this._calculateDistance(value);

            if (this.update_callback) {
                this.update_callback.apply(this.env, [this.current]);
            }
        }
    }

    _calculateDistance(elapsed) {
        let type_str = Object.prototype.toString.call(this.source).replace(/\[|(object)|\]|\s/g, '');

        switch(type_str) {
            case "Array":
            case "Float32Array":
                for (var i = 0, length = this.source.length; i < length; i++) {
                    this.current[i]  = this.source[i] + (this.target[i] - this.source[i]) * elapsed;
                }

                break;
            case "Object":
            default:
                this.current.x = this.source.x + (this.target.x - this.source.x) * elapsed;
                this.current.y = this.source.y + (this.target.y - this.source.y) * elapsed;
                this.current.z = this.source.z + (this.target.z - this.source.z) * elapsed;
                break;
            case "Number":
            case "String":
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

    setFinishCallback(func) {
        this.finish_callback = func;
    }
}

Tween.Easing = {
    //线性匀速运动效果；
    Linear: {
        None: function(k) {
            return k;
        }
    },
    //二次方的缓动（t^2）；
    Quadratic: {
        In: function(k) {
            return k * k;
        },
        Out: function(k) {
            return k * (2 - k);
        },
        InOut: function(k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k;
            }

            return -0.5 * (--k * (k - 2) - 1);
        },
    },

    //三次方的缓动（t^3）；
    Cubic: {
        In: function(k) {
            return k * k * k;
        },
        Out: function(k) {
            return --k * k * k + 1;
        },
        InOut: function(k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k * k;
            }

            return 0.5 * ((k -= 2) * k * k + 2);
        },
    },

    //四次方的缓动（t^4）；
    Quartic: {
        In: function(k) {
            return k * k * k * k;
        },
        Out: function(k) {
            return 1 - (--k * k * k * k);
        },
        InOut: function(k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k * k * k;
            }

            return -0.5 * ((k -= 2) * k * k * k - 2);
        },
    },

    //五次方的缓动（t^5）；
    Quintic: {
        In: function(k) {
            return Math.pow(k , 5);
        },
        Out: function(k) {
            return --k * k * k * k * k + 1;
        },
        InOut: function(k) {
            if ((k *= 2) < 1) {
                return 0.5 * Math.pow(k, 5);
            }

            return 0.5 * ((k -= 2) * k * k * k * k + 2);
        },
    },

    //正弦曲线的缓动（sin(t)）；
    Sinusoidal: {
        In: function(k) {
            return 1 - Math.cos(k * Math.PI / 2);
        },
        Out: function(k) {
            return Math.sin(k * Math.PI / 2);
        },
        InOut: function(k) {
            return 0.5 * (1 - Math.cos(Math.PI * k));
        },
    },

    //指数曲线的缓动（2^t）；
    Exponential: {
        In: function(k) {
            return k === 0 ? 0 : Math.pow(1024, k - 1);
        },
        Out: function(k) {
            return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
        },
        InOut: function(k) {
            if (k === 0) {
                return 0;
            }

            if (k === 1) {
                return 1;
            }

            if ((k *= 2) < 1) {
                return 0.5 * Math.pow(1024, k - 1);
            }

            return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
        },
    },

    //圆形曲线的缓动（sqrt(1-t^2)）；
    Circular: {
        In: function(k) {
            return 1 - Math.sqrt(1 - k * k);
        },
        Out: function(k) {
            return Math.sqrt(1 - (--k * k));
        },
        InOut: function(k) {
            if ((k *= 2) < 1) {
                return -0.5 * (Math.sqrt(1 - k * k) - 1);
            }

            return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
        },
    },

    //指数衰减的正弦曲线缓动；
    Elastic: {
        In: function(k) {
            let s;
            let a = 0.1;
            let p = 0.4;
            if (k === 0) { return 0; }
            if (k === 1) { return 1; }
            if (!a || a < 1) { a = 1; s = p / 4; }
            else { s = p * Math.asin(1 / a) / (2 * Math.PI); }
            return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
        },
        Out: function(k) {
            let s;
            let a = 0.1;
            let p = 0.4;
            if (k === 0) { return 0; }
            if (k === 1) { return 1; }
            if (!a || a < 1) { a = 1; s = p / 4; }
            else { s = p * Math.asin(1 / a) / (2 * Math.PI); }
            return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
        },
        InOut: function(k) {
            let s;
            let a = 0.1;
            let p = 0.4;
            if (k === 0) { return 0; }
            if (k === 1) { return 1; }
            if (!a || a < 1) { a = 1; s = p / 4; }
            else { s = p * Math.asin(1 / a) / (2 * Math.PI); }
            if ((k *= 2) < 1) {
                return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
            }
            return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
        },
    },

    //超过范围的三次方缓动（(s+1)*t^3 – s*t^2）；
    Back: {
        In: function(k) {
            let s = 1.70158;
            return k * k * ((s + 1) * k - s);
        },
        Out: function(k) {
            let s = 1.70158;
            return --k * k * ((s + 1) * k + s) + 1;
        },
        InOut: function(k) {
            let s = 1.70158 * 1.525;

            if ((k *= 2) < 1) {
                return 0.5 * (k * k * ((s + 1) * k - s));
            }

            return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
        },
    },

    //指数衰减的反弹缓动。
    Bounce: {
        In: function(k) {
            return 1 - Tween.Easing.Bounce.Out(1 - k);
        },
        Out: function(k) {
            if (k < (1 / 2.75)) {
                return 7.5625 * k * k;
            } else if (k < (2 / 2.75)) {
                return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
            } else if (k < (2.5 / 2.75)) {
                return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
            } else {
                return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
            }
        },
        InOut: function(k) {
            if (k < 0.5) {
                return  Tween.Easing.Bounce.In(k * 2) * 0.5;
            }

            return Tween.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
        },
    },
};
