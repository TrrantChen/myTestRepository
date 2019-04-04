// 最原始的帧数控制方法
export function tick(ftp = 60) {
    let interval = 1000 / ftp;
    console.log(interval);
    let then = Date.now();
    let now = void 0;

    let exec = function(func = () => { console.log('done') }, ) {
        now = Date.now();

        if (now - then > interval) {
            func(interval);
            then = Date.now();
        }

        requestAnimationFrame(() => {
            exec();
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
