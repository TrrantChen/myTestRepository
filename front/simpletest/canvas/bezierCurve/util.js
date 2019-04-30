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
    is_down = false;

    constructor(dom1, dom2) {
        this.dom1 = dom1;
        this.dom2 = dom2;
        this.ctx1 = dom1.getContext('2d');
        this.ctx2 = dom2.getContext('2d');

        this.ctx1.strokeStyle = 'red';
        this.ctx1.lineWidth = 1;
        this.ctx1.lineJoin = 'round';
        this.ctx1.lineCap = 'round';

        this.ctx2.strokeStyle = 'red';
        this.ctx2.lineWidth = 1;
        this.ctx2.lineJoin = 'round';
        this.ctx2.lineCap = 'round';

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

            if (this.move_point_lst[0] !== void 0) {
                let start_point = this.move_point_lst[0];
                let control_point = this.move_point_lst[1];
                let end_point = {
                    x: (this.move_point_lst[1].x + this.move_point_lst[2].x) / 2,
                    y: (this.move_point_lst[1].y + this.move_point_lst[2].y) / 2,
                };

                this._drawLine2(start_point, end_point, control_point);
            }

            this.move_point_lst = [
                void 0,
                void 0,
                void 0,
            ]
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

    _exchangeLstValue(value) {
        this.move_point_lst[0] = this.move_point_lst[1];
        this.move_point_lst[1] = this.move_point_lst[2];
        this.move_point_lst[2] = value;
    }

    destroy() {
        this._eventUnRegister();
    }
}
