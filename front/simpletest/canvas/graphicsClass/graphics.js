class CanvasBasics {
    constructor() {
        this.uuid = this.setUuid();
    }

    setUuid(len, radix) {
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

    getUuid() {
        return this.uuid;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }
}

export class CanvasRect extends CanvasBasics {
    constructor(ctx, option) {
        super();
        let default_option = {
            env: window,
            is_repaint: false,
            c_left: 0,
            c_top: 0,
            c_width: window.innerWidth,
            c_height: window.innerHeight,
            left: 100,
            top: 100,
            width: 100,
            height: 100,
            border_width: 0,
            background_color: 'red',
            border_color: 'black',
                    // "orange";
                    // "#FFA500";
                    // "rgb(255,165,0)";
                    // "rgba(255,165,0,1)";
        };

        this.option = Object.assign(default_option, option || {});
        this._settingParams(ctx);
        this._init();
    }

    _settingParams(ctx) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.env = this.option.env;
        this.is_repaint = this.option.is_repaint;

        this.clear_obj = {};
        this.clear_obj.x = this.option.c_left;
        this.clear_obj.y = this.option.c_top;
        this.clear_obj.w = this.option.c_width;
        this.clear_obj.h = this.option.c_height;

        // 用于存储对象的信息，包括坐标信息，长宽，颜色，等
        this.obj = {};
        this.obj.x = this.option.left;
        this.obj.y = this.option.top;
        this.obj.w = this.option.width;
        this.obj.h = this.option.height;
        this.obj.fillStyle = this.option.background_color;
        this.obj.strokeStyle = this.option.border_color;
        this.obj.lineWidth = this.option.border_width;
    }

    _init() {
        // 是否启用重绘
        // 传递初始值的位置，大小
        // 保留位置和大小信息
        // 方便以后调整
        // 可以尝试绑定事件信息
        if (this.is_repaint) {
            this.ctx.clearRect(
                this.clear_obj.x,
                this.clear_obj.y,
                this.clear_obj.width,
                this.clear_obj.height,
            );
        }
    }

    draw() {
        if (this.obj.lineWidth !== 0) {
            this.ctx.lineWidth = this.obj.lineWidth;
            this.ctx.strokeStyle = this.obj.strokeStyle;
            this.ctx.strokeRect(
                this.obj.x + this.obj.lineWidth / 2,
                this.obj.y + this.obj.lineWidth / 2,
                this.obj.w + this.obj.lineWidth,
                this.obj.h + this.obj.lineWidth,
            );
        }

        this.ctx.fillStyle = this.obj.fillStyle;
        this.ctx.fillRect(
            this.obj.x + this.obj.lineWidth,
            this.obj.y + this.obj.lineWidth,
            this.obj.w,
            this.obj.h,
        );

        this.obj.actual_width = this.obj.w + this.obj.lineWidth * 2;
        this.obj.actual_height = this.obj.h + this.obj.lineWidth * 2;
    }

    on(event, call_back) {
        let client_rect = this.canvas.getBoundingClientRect();
        let dom_style = window.getComputedStyle(this.canvas);
        let border_width = parseInt(dom_style.getPropertyValue('border-width'));
        let left = client_rect.x + border_width;
        let top = client_rect.y + border_width;

        this.canvas.addEventListener(event, (evt) => {
            let x = evt.clientX - left;
            let y = evt.clientY - top;

            if (x >= this.obj.x && x <= this.obj.x + this.obj.actual_width && y >= this.obj.y && y <= this.obj.y + this.obj.actual_height && call_back) {
                call_back(evt, x, y, this.obj);
            }
        })
    }

    destroy() {

    }
}

export class CanvasArc extends CanvasBasics {
    constructor(ctx, env) {
        super();
        this.ctx = ctx;
        this.env = env;
    }
}

export class CanvasPath extends CanvasBasics {
    constructor(ctx, env) {
        super();
        this.ctx = ctx;
        this.env = env;
    }
}

export class CanvasQuadratic extends CanvasBasics {
    constructor(ctx, env) {
        super();
        this.ctx = ctx;
        this.env = env;
    }
}

export class CanvasBezier extends CanvasBasics {
    constructor(ctx, env) {
        super();
        this.ctx = ctx;
        this.env = env;
    }
}

export class CanvasPathFor2D extends CanvasBasics {
    constructor(ctx, env) {
        super();
        this.ctx = ctx;
        this.env = env;
    }
}


