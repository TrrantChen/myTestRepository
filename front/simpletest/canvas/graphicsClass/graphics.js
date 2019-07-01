class CanvasBasics {
    constructor() {
        this._uuid = this._setUuid();
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

    getUuid() {
        return this._uuid;
    }
}

export class CanvasRect extends CanvasBasics {
    constructor(ctx, option) {
        super();
        let default_option = {
            env: window,
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

        this._option = Object.assign(default_option, option || {});
        this._settingParams(ctx);
        this._init();
    }

    _settingParams(ctx) {
        this._ctx = ctx;
        this._canvas = ctx.canvas;
        this._env = this._option.env;

        // 用于存储对象的信息，包括坐标信息，长宽，颜色，等
        // 两边的参数名称进行映射
        this._obj = {};
        this._obj.x = this._option.left;
        this._obj.y = this._option.top;
        this._obj.w = this._option.width;
        this._obj.h = this._option.height;
        this._obj.fillStyle = this._option.background_color;
        this._obj.strokeStyle = this._option.border_color;
        this._obj.lineWidth = this._option.border_width;
    }

    _init() {
        // 传递初始值的位置，大小
        // 保留位置和大小信息
        // 方便以后调整
        // 可以尝试绑定事件信息

    }

    // 重新绘制这个区域
    rePaint() {
        this.clear();
        this.draw();
    }

    clear() {
        if (this._obj.lineWidth !== 0) {
            this._ctx.clearRect(
                this._obj.x,
                this._obj.y,
                this._obj.w + this._obj.lineWidth * 2,
                this._obj.h + this._obj.lineWidth * 2,
            );
        }
        else {
            this._ctx.clearRect(
                this._obj.x + this._obj.lineWidth,
                this._obj.y + this._obj.lineWidth,
                this._obj.w,
                this._obj.h,
            );
        }
    }

    draw() {
        if (this._obj.lineWidth !== 0) {
            this._ctx.lineWidth = this._obj.lineWidth;
            this._ctx.strokeStyle = this._obj.strokeStyle;
            this._ctx.strokeRect(
                this._obj.x + this._obj.lineWidth / 2,
                this._obj.y + this._obj.lineWidth / 2,
                this._obj.w + this._obj.lineWidth,
                this._obj.h + this._obj.lineWidth,
            );
        }

        this._ctx.fillStyle = this._obj.fillStyle;
        this._ctx.fillRect(
            this._obj.x + this._obj.lineWidth,
            this._obj.y + this._obj.lineWidth,
            this._obj.w,
            this._obj.h,
        );

        this._obj.actual_width = this._obj.w + this._obj.lineWidth * 2;
        this._obj.actual_height = this._obj.h + this._obj.lineWidth * 2;
    }

    on(event, call_back) {
        let client_rect = this._canvas.getBoundingClientRect();
        let dom_style = window.getComputedStyle(this._canvas);
        let border_width = parseInt(dom_style.getPropertyValue('border-width'));
        let left = client_rect.x + border_width;
        let top = client_rect.y + border_width;

        this._canvas.addEventListener(event, (evt) => {
            let x = evt.clientX - left;
            let y = evt.clientY - top;

            if (x >= this._obj.x && x <= this._obj.x + this._obj.actual_width && y >= this._obj.y && y <= this._obj.y + this._obj.actual_height && call_back) {
                call_back(evt, x, y, this._obj);
            }
        })
    }

    destroy() {
        // 清空图层
        // 移除事件等
    }
}




