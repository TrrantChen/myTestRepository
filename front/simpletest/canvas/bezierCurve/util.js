export class DrawLineUseBezier {
    env = void 0;
    dom = void 0;
    ctx = void 0;
    mouse_down = void 0;
    mouse_move = void 0;
    mouse_up = void 0;
    option = {};
    move_point_lst = [
        void 0,
        void 0,
        void 0,
    ];

    is_down = false;
    is_first_paint = true;

    constructor(option) {
        let default_option = {
            dom: void 0,
            ctx: void 0,
            env: window,
        };

        if (option === void 0 || (option !== void 0 && option.dom === void 0)) {
            let canvas = DrawTool._createDefaultCanvas();
            document.body.appendChild(canvas);

            default_option.dom = canvas;
            default_option.ctx = canvas.getContext('2d');
        }

        this.option = Object.assign(default_option, option || {});
        this.dom = this.option.dom;
        this.ctx = this.option.ctx;
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 1;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';

        this._init();
    }

    _init() {
        this.mouse_down = this._mouseDownHandle.bind(this);
        this.mouse_move = this._mouseMoveHandle.bind(this);
        this.mouse_up = this._mouseUpHandle.bind(this);
        this._eventRegister();
    }

    static _createDefaultCanvas() {
        let canvas = document.createElement('canvas');
        let width = 800;
        let height = 600;
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        canvas.style.border = '1px solid black';

        return canvas;
    }

    _eventRegister() {
        this.option.dom.addEventListener('mousedown', this.mouse_down);
        this.option.dom.addEventListener('mousemove', this.mouse_move);
        this.option.dom.addEventListener('mouseup', this.mouse_up);
    }

    _eventUnRegister() {
        this.option.dom.removeEventListener('mousedown', this.mouse_down);
        this.option.dom.removeEventListener('mousemove', this.mouse_move);
        this.option.dom.removeEventListener('mouseup', this.mouse_up);
    }

    _mouseDownHandle(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        this.is_down = true;

        this._exchangeLstValue({
            x: evt.clientX,
            y: evt.clientY,
        });
    }

    _mouseMoveHandle(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        if (this.is_down) {

            this._exchangeLstValue({
                x: evt.clientX,
                y: evt.clientY,
            });

            if (this.move_point_lst[0] !== void 0) {

                let start_point = void 0;

                if (this.is_first_paint) {
                    start_point = this.move_point_lst[0];
                    this.is_first_paint = false;
                }
                else {
                    start_point = {
                        x: (this.move_point_lst[0].x + this.move_point_lst[1].x) / 2,
                        y: (this.move_point_lst[0].y + this.move_point_lst[1].y) / 2,
                    }
                }


                let control_point = this.move_point_lst[1];
                let end_point = {
                    x: (this.move_point_lst[1].x + this.move_point_lst[2].x) / 2,
                    y: (this.move_point_lst[1].y + this.move_point_lst[2].y) / 2,
                };

                this._drawLine(start_point, end_point, control_point);
            }
        }
    }

    _mouseUpHandle(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        this._exchangeLstValue({
            x: evt.clientX,
            y: evt.clientY,
        });

        if (this.move_point_lst[0] !== void 0) {
            let start_point = this.move_point_lst[0];
            let control_point = this.move_point_lst[1];
            let end_point = {
                x: (this.move_point_lst[1].x + this.move_point_lst[2].x) / 2,
                y: (this.move_point_lst[1].y + this.move_point_lst[2].y) / 2,
            };

            this._drawLine(start_point, end_point, control_point);
        }

        this.is_down = false;
        this.move_point_lst = [
            void 0,
            void 0,
            void 0,
        ]
    }

    _drawLine(start_point, end_point, control_point) {
        this.ctx.beginPath();
        this.ctx.moveTo(start_point.x, start_point.y);
        this.ctx.quadraticCurveTo(control_point.x, control_point.y, end_point.x, end_point.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    _exchangeLstValue(value) {
        this.move_point_lst[0] = this.move_point_lst[1];
        this.move_point_lst[1] = this.move_point_lst[2];
        this.move_point_lst[2] = value;
    }

    destroy() {
        this._eventUnRegister();
    }
}

export class DrawLineUnUseBezier {
    env = void 0;
    dom = void 0;
    ctx = void 0;
    mouse_down = void 0;
    mouse_move = void 0;
    mouse_up = void 0;
    option = {};
    start_point = {
        x: 0,
        y: 0,
    };
    is_down = false;

    constructor(option) {
        let default_option = {
            dom: void 0,
            ctx: void 0,
            env: window,
        };

        if (option === void 0 || (option !== void 0 && option.dom === void 0)) {
            let canvas = DrawTool._createDefaultCanvas();
            document.body.appendChild(canvas);

            default_option.dom = canvas;
            default_option.ctx = canvas.getContext('2d');
        }

        this.option = Object.assign(default_option, option || {});
        this.dom = this.option.dom;
        this.ctx = this.option.ctx;
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 1;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';

        this._init();
    }

    _init() {
        this.mouse_down = this._mouseDownHandle.bind(this);
        this.mouse_move = this._mouseMoveHandle.bind(this);
        this.mouse_up = this._mouseUpHandle.bind(this);
        this._eventRegister();
    }

    static _createDefaultCanvas() {
        let canvas = document.createElement('canvas');
        let width = 800;
        let height = 600;
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        canvas.style.border = '1px solid black';

        return canvas;
    }

    _eventRegister() {
        this.option.dom.addEventListener('mousedown', this.mouse_down);
        this.option.dom.addEventListener('mousemove', this.mouse_move);
        this.option.dom.addEventListener('mouseup', this.mouse_up);
    }

    _eventUnRegister() {
        this.option.dom.removeEventListener('mousedown', this.mouse_down);
        this.option.dom.removeEventListener('mousemove', this.mouse_move);
        this.option.dom.removeEventListener('mouseup', this.mouse_up);
    }

    _mouseDownHandle(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        this.is_down = true;
        this.start_point = {
            x: evt.clientX,
            y: evt.clientY,
        }
    }

    _mouseMoveHandle(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        if (this.is_down) {
            let end_point = {
                x: evt.clientX,
                y: evt.clientY,
            };

            this._drawLine(this.start_point, end_point);
            this.start_point = end_point;
        }
    }

    _mouseUpHandle(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        if (this.is_down) {
            let end_point = {
                x: evt.clientX,
                y: evt.clientY,
            };

            this._drawLine(this.start_point, end_point);
            this.is_down = false;
        }
    }

    _drawLine(start_point, end_point) {
        this.ctx.beginPath();
        this.ctx.moveTo(start_point.x, start_point.y);
        this.ctx.lineTo(end_point.x, end_point.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    destroy() {
        this._eventUnRegister();
    }
}

export class CompareDifferent {
    dom1 = void 0;
    ctx1 = void 0;
    dom2 = void 0;
    ctx2 = void 0;
    dom3 = void 0;
    ctx3 = void 0;
    mouse_down = void 0;
    mouse_move = void 0;
    mouse_up = void 0;
    option = {};
    start_point = {
        x: 0,
        y: 0,
    };
    move_point_lst = [
        void 0,
        void 0,
        void 0,
    ];

    move_point_3_lst = [
        void 0,
        void 0,
        void 0,
        void 0,
    ];
    is_down = false;
    is_first_paint = true;
    is_first_paint_3 = true;

    constructor(dom1, dom2, dom3) {
        this.dom1 = dom1;
        this.dom2 = dom2;
        this.dom3 = dom3;
        this.ctx1 = dom1.getContext('2d');
        this.ctx2 = dom2.getContext('2d');
        this.ctx3 = dom3.getContext('2d');

        this.ctx1.strokeStyle = 'red';
        this.ctx1.lineWidth = 1;
        this.ctx1.lineJoin = 'round';
        this.ctx1.lineCap = 'round';

        this.ctx2.strokeStyle = 'red';
        this.ctx2.lineWidth = 1;
        this.ctx2.lineJoin = 'round';
        this.ctx2.lineCap = 'round';

        this.ctx3.strokeStyle = 'red';
        this.ctx3.lineWidth = 1;
        this.ctx3.lineJoin = 'round';
        this.ctx3.lineCap = 'round';

        this._init();
    }

    _init() {
        this.mouse_down = this._mouseDownHandle.bind(this);
        this.mouse_move = this._mouseMoveHandle.bind(this);
        this.mouse_up = this._mouseUpHandle.bind(this);
        this._eventRegister();
    }

    _eventRegister() {
        this.dom1.addEventListener('mousedown', this.mouse_down);
        this.dom1.addEventListener('mousemove', this.mouse_move);
        this.dom1.addEventListener('mouseup', this.mouse_up);
    }

    _eventUnRegister() {
        this.dom1.removeEventListener('mousedown', this.mouse_down);
        this.dom1.removeEventListener('mousemove', this.mouse_move);
        this.dom1.removeEventListener('mouseup', this.mouse_up);
    }

    _mouseDownHandle(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        this.is_down = true;
        this.start_point = {
            x: evt.clientX,
            y: evt.clientY,
        };

        this._exchangeLstValue({
            x: evt.clientX,
            y: evt.clientY,
        });

        this._exchangeLstValue3({
            x: evt.clientX,
            y: evt.clientY,
        })
    }

    _mouseMoveHandle(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        if (this.is_down) {
            let end_point = {
                x: evt.clientX,
                y: evt.clientY,
            };

            this._drawLine1(this.start_point, end_point);
            this.start_point = end_point;

            this._exchangeLstValue({
                x: evt.clientX,
                y: evt.clientY,
            });

            this._exchangeLstValue3({
                x: evt.clientX,
                y: evt.clientY,
            });

            if (this.move_point_lst[0] !== void 0) {

                let start_point = void 0;

                if (this.is_first_paint) {
                    start_point = this.move_point_lst[0];
                    this.is_first_paint = false;
                }
                else {
                    start_point = {
                        x: (this.move_point_lst[0].x + this.move_point_lst[1].x) / 2,
                        y: (this.move_point_lst[0].y + this.move_point_lst[1].y) / 2,
                    }
                }

                let control_point = this.move_point_lst[1];
                let end_point = {
                    x: (this.move_point_lst[1].x + this.move_point_lst[2].x) / 2,
                    y: (this.move_point_lst[1].y + this.move_point_lst[2].y) / 2,
                };

                this._drawLine2(start_point, end_point, control_point);
            }

            if (this.move_point_3_lst[0] !== void 0) {
                let start_point = void 0;

                if (this.is_first_paint_3) {
                    start_point = this.move_point_3_lst[0];
                    this.is_first_paint_3 = false;
                }
                else {
                    start_point = {
                        x: (this.move_point_3_lst[2].x + this.move_point_3_lst[3].x) / 2,
                        y: (this.move_point_3_lst[2].y + this.move_point_3_lst[3].y) / 2,
                    }
                }

                let control_point1 = this.move_point_3_lst[1];
                let control_point2 = this.move_point_3_lst[2];

                let end_point = {
                    x: (this.move_point_3_lst[2].x + this.move_point_3_lst[3].x) / 2,
                    y: (this.move_point_3_lst[2].y + this.move_point_3_lst[3].y) / 2,
                };

                this._drawLine3(start_point, end_point, control_point1, control_point2);
            }
        }
    }

    _mouseUpHandle(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        if (this.is_down) {
            let end_point = {
                x: evt.clientX,
                y: evt.clientY,
            };

            this._drawLine1(this.start_point, end_point);
            this.is_down = false;

            this._exchangeLstValue({
                x: evt.clientX,
                y: evt.clientY,
            });

            this._exchangeLstValue3({
                x: evt.clientX,
                y: evt.clientY,
            });

            if (this.move_point_lst[0] !== void 0) {
                let start_point = this.move_point_lst[0];
                let control_point = this.move_point_lst[1];
                let end_point = {
                    x: (this.move_point_lst[1].x + this.move_point_lst[2].x) / 2,
                    y: (this.move_point_lst[1].y + this.move_point_lst[2].y) / 2,
                };

                this._drawLine2(start_point, end_point, control_point);
            }

            if (this.move_point_3_lst[0] !== void 0) {
                let start_point = this.move_point_3_lst[0];
                let control_point1 = this.move_point_3_lst[1];
                let control_point2 = this.move_point_3_lst[2];

                let end_point = {
                    x: (this.move_point_3_lst[2].x + this.move_point_3_lst[3].x) / 2,
                    y: (this.move_point_3_lst[2].y + this.move_point_3_lst[3].y) / 2,
                };

                this._drawLine3(start_point, end_point, control_point1, control_point2);
            }

            this.move_point_lst = [
                void 0,
                void 0,
                void 0,
            ];

            this.move_point_3_lst = [
                void 0,
                void 0,
                void 0,
                void 0,
            ];
        }
    }

    _drawLine1(start_point, end_point) {
        this.ctx1.beginPath();
        this.ctx1.moveTo(start_point.x, start_point.y);
        this.ctx1.lineTo(end_point.x, end_point.y);
        this.ctx1.stroke();
        this.ctx1.closePath();
    }

    _drawLine2(start_point, end_point, control_point) {
        this.ctx2.beginPath();
        this.ctx2.moveTo(start_point.x, start_point.y);
        this.ctx2.quadraticCurveTo(control_point.x, control_point.y, end_point.x, end_point.y);
        this.ctx2.stroke();
        this.ctx2.closePath();
    }

    _drawLine3(start_point, end_point, control_point1, control_point2) {
        this.ctx3.beginPath();
        this.ctx3.moveTo(start_point.x, start_point.y);
        this.ctx3.bezierCurveTo(control_point1.x, control_point1.y, control_point2.x, control_point2.y, end_point.x, end_point.y);
        this.ctx3.stroke();
        this.ctx3.closePath();
    }

    _exchangeLstValue(value) {
        this.move_point_lst[0] = this.move_point_lst[1];
        this.move_point_lst[1] = this.move_point_lst[2];
        this.move_point_lst[2] = value;
    }

    _exchangeLstValue3(value) {
        this.move_point_3_lst[0] = this.move_point_3_lst[1];
        this.move_point_3_lst[1] = this.move_point_3_lst[2];
        this.move_point_3_lst[2] = this.move_point_3_lst[3];
        this.move_point_3_lst[3] = value;
    }

    destroy() {
        this._eventUnRegister();
    }
}

// 控制曲率来绘制不同弯曲度的曲线
export function drawBezierByControlCurvature(ctx, begin, end, curvature = 1) {
    ctx.beginPath();

    let cp = getControlPointByCurvature(begin, end, curvature);

    ctx.moveTo( begin.x, begin.y );
    ctx.quadraticCurveTo(
        cp.x, cp.y,
        end.x, end.y
    );

    ctx.stroke();
}

// 通过曲率来获取中间控制点
function getControlPointByCurvature(begin, end, curvature = 1) {
    return {
        x: ( begin.x + end.x ) / 2 - ( begin.y - end.y ) * curvature,
        y: ( begin.y + end.y ) / 2 - (  end.x - begin.x ) * curvature
    };
}

export function bezierAnimate(ctx, begin, end, curvature = 1, interval = 1) {
    let cp = getControlPointByCurvature(begin, end, curvature);
    let percent = 1;

    let animate = function() {
        requestAnimationFrame(() => {
            animate();
        });

        percent += interval;

        if (percent <= 100) {
            drawBezierByAnimate(ctx, begin, end, cp, percent)
        }
    };

    animate();
}

// 通过动画绘制的曲线
function drawBezierByAnimate(ctx, p0, p1, cp, percent) {
    let t = percent / 100;

    let p0c = {
        x: cp.x - p0.x,
        y: cp.y - p0.y,
    };

    let cp1 = {
        x: p1.x - cp.x,
        y: p1.y - cp.y,
    };

    let q0 = {
        x: p0.x + p0c.x * t,
        y: p0.y + p0c.y * t,
    };

    let q1 = {
        x: cp.x + cp1.x * t,
        y: cp.y + cp1.y * t,
    };

    let q0q1 = {
        x: q1.x - q0.x,
        y: q1.y - q0.y,
    };

    let d = {
        x: q0.x + q0q1.x * t,
        y: q0.y + q0q1.y * t,
    };

    ctx.beginPath();
    ctx.clearRect(0, 0, 800, 800);
    ctx.moveTo(p0.x, p0.y);
    ctx.quadraticCurveTo(
        q0.x, q0.y,
        d.x, d.y
    );
    ctx.stroke();
}
