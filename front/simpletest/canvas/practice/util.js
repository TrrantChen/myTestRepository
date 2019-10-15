


// 高斯模糊算法

export function gaussianBlur(image_data, radius = 3, sigma) {
    let data = image_data.data;
    let width = image_data.width;
    let height = image_data.height;
    sigma = sigma || radius / 3;
    let gaussian_lst = createGaussianLst(radius, sigma);
    let pos = 0,
        offset_pos = 0,
        total_gaussian = 0,
        tmp_gaussian = 0,
        r = 0,
        g = 0,
        b = 0;

    // 分两次求值，先x，后y
    // x轴求值

    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            pos = i * width + j;
            total_gaussian = 0;
            r = 0;
            g = 0;
            b = 0;

            for (var k = -radius; k <= radius; k++) {
                offset_pos = pos + k;

                if (offset_pos > i * width - 1 && offset_pos < (i + 1) * width) {
                    tmp_gaussian = gaussian_lst[k + radius];
                    r += data[offset_pos * 4] * tmp_gaussian;
                    g += data[offset_pos * 4 + 1] * tmp_gaussian;
                    b += data[offset_pos * 4 + 2] * tmp_gaussian;
                    total_gaussian += tmp_gaussian;
                }
            }

            data[pos * 4] = (r / total_gaussian);
            data[pos * 4 + 1] = (g / total_gaussian);
            data[pos * 4 + 2] = (b / total_gaussian);
        }
    }

    // y轴求值

    for (var i = 0; i < width; i++) {
        for (var j = 0; j < height; j++) {
            pos = j * width + i;
            total_gaussian = 0;
            r = 0;
            g = 0;
            b = 0;

            for (var k = -radius; k <= radius; k++) {
                offset_pos = pos + k * width;

                if (offset_pos > -1 && offset_pos < width * height) {
                    tmp_gaussian = gaussian_lst[k + radius];
                    r += data[offset_pos * 4] * tmp_gaussian;
                    g += data[offset_pos * 4 + 1] * tmp_gaussian;
                    b += data[offset_pos * 4 + 2] * tmp_gaussian;
                    total_gaussian += tmp_gaussian;
                }
            }

            data[pos * 4] = (r / total_gaussian);
            data[pos * 4 + 1] = (g / total_gaussian);
            data[pos * 4 + 2] = (b / total_gaussian);
        }
    }

    return data;
}

function createGaussianLst(radius, sigma) {
    let result = [];
    let total = 0;

    for (var j = -radius; j <= radius; j++) {
        let tmp = gaussianBlurFormula(j, sigma);
        total += tmp;
        result.push(tmp);
    }

    // 归一化
    result = result.map((value) => {
        return value / total;
    });

    return result;
}

function gaussianBlurFormula(x, sigma) {
    let a = 1 / (sigma * Math.sqrt(2 * Math.PI));
    let b = -1 / (2 * Math.pow(sigma, 2));

    return a * Math.exp(b * x * x);
}

// 粒子破碎效果, 依赖于html2Canvas
export class ParticleEffect {
    callback = void 0;
    particles = [];
    particle_ctx = this._createParticleCanvas();
    dom = void 0;

    constructor(dom) {
        this.dom = dom;
    }

    setCallback(func) {
        this.callback = func;
    }

    startEffect() {
        if (this.dom) {
            let reduction_factor = 25;

            html2canvas(this.dom).then((canvas) => {
                let ctx =  canvas.getContext('2d');
                let width = this.dom.offsetWidth;
                let height = this.dom.offsetHeight;
                let color_data = ctx.getImageData(0, 0, width, height).data;
                let count = 0;
                let bcr = this.dom.getBoundingClientRect();

                for(let local_x = 0; local_x < width; local_x++) {
                    for(let local_y = 0; local_y < height; local_y++) {
                        if(count % reduction_factor === 0) {
                            let index = (local_y * width + local_x) * 4;
                            let rgba_color_arr = color_data.slice(index, index + 4);
                            let globalX = window.scrollX + bcr.left + local_x;
                            let globalY =  window.scrollY + bcr.top + local_y;
                            let particle = this._createParticleAtPoint(globalX, globalY, rgba_color_arr);
                            this.particles.push(particle);
                        }

                        count++;
                    }
                }

                window.requestAnimationFrame(this._update.bind(this));

            })
                .catch(ext => {
                    console.log(ext);
                });

        }
    }

    _createParticleCanvas() {
        let particleCanvas = document.querySelector('#particleCanvas');

        if (!particleCanvas) {

            particleCanvas = document.createElement('canvas');
            particleCanvas.id = 'particleCanvas';
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
            particleCanvas.style.position = "absolute";
            particleCanvas.style.top = "0";
            particleCanvas.style.left = "0";
            particleCanvas.style.zIndex = "1001";
            particleCanvas.style.pointerEvents = "none";
            document.body.appendChild(particleCanvas);

        }

        return particleCanvas.getContext('2d');
    }

    _createParticleAtPoint(x, y, colorData) {
        let particle = new ExplodingParticle();
        particle.rgbArray = colorData;
        particle.startX = x;
        particle.startY = y;
        particle.startTime = Date.now();

        return particle;
    }

    _update() {

        if(typeof this.particle_ctx !== "undefined") {
            this.particle_ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }

        for(let i = 0; i < this.particles.length; i++) {
            this.particles[i].draw(this.particle_ctx);

            if(i === this.particles.length - 1) {

                let percent = (Date.now() - this.particles[i].startTime) / this.particles[i].animationDuration;

                if(percent > 1) {
                    this.particles = [];
                }
            }
        }

        if (this.callback) {
            this.callback();
        }

        if (this.particles.length !== 0) {
            window.requestAnimationFrame(this._update.bind(this));
        } else {
            this.particle_ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }

    }

    _execOnce(fn) {
        let is_execed = false;

        return function() {

            if (!is_execed) {

                fn();
                is_execed = true;

            }

        }
    }
}

class ExplodingParticle {
    animationDuration = 1000; // in ms

    speed = {
        x: -5 + Math.random() * 10,
        y: -5 + Math.random() * 10
    };

    radius = 5 + Math.random() * 5;

    remainingLife = 30 + Math.random() * 10;

    rgbArray = ['0', '0', '0'];
    startX = 0;
    startY = 0;
    startTime = 0;

    constructor(rgbArray, startX, startY, startTime) {
        this.rgbArray = rgbArray;
        this.startX = startX;
        this.startY = startY;
        this.startTime = startTime;
    };

    draw = ctx => {
        let that = this;

        if(this.remainingLife > 0 && this.radius > 0) {

            ctx.beginPath();
            ctx.arc(that.startX, that.startY, that.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(" + this.rgbArray[0] + ',' + this.rgbArray[1] + ',' + this.rgbArray[2] + ", 1)";
            ctx.fill();

            that.remainingLife--;
            that.radius -= 0.25;
            that.startX += that.speed.x;
            that.startY += that.speed.y;

        }
    };
}

// 绘制箭头
export function drawArrow(ctx, s_pos, e_pos, option = {}) {
    let default_option = {
        line_width: 1,
        line_color: 'black',
        arrow_line_width: 1,
        arrow_line_color: 'black',
        arrow_angle: 30,
        arrow_line_length: 10,
        with_arc: true,
    };

    let _option = Object.assign(default_option, option || {});

    ctx.beginPath();
    ctx.lineWidth = _option.line_width;
    ctx.strokeStyle = _option.line_color;
    ctx.moveTo(s_pos.x, s_pos.y);
    ctx.lineTo(e_pos.x, e_pos.y);
    ctx.closePath();
    ctx.stroke();

    let obj = calculateArrowAngle(s_pos, e_pos, _option.arrow_angle, _option.arrow_line_length);

    ctx.beginPath();
    ctx.lineWidth = _option.arrow_line_width;
    ctx.strokeStyle = _option.arrow_line_color;
    ctx.moveTo(e_pos.x, e_pos.y);
    ctx.lineTo(obj.p1.x, obj.p1.y);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = _option.arrow_line_width;
    ctx.strokeStyle = _option.arrow_line_color;
    ctx.moveTo(e_pos.x, e_pos.y);
    ctx.lineTo(obj.p2.x, obj.p2.y);
    ctx.closePath();
    ctx.stroke();
}

function calculateArrowAngle(s_pos, e_pos, angle, l) {
    let se = {
        x: e_pos.x - s_pos.x,
        y: e_pos.y - s_pos.y,
    };

    let se_angle = calcAngleDegrees(se.x, se.y);
    let angle1 = se_angle + 180 - angle;
    let angle2 = se_angle + 180 + angle;

    let x1 = e_pos.x + l * Math.cos(angle1 * Math.PI / 180);
    let y1 = e_pos.y + l * Math.sin(angle1 * Math.PI / 180);

    let x2 =  e_pos.x + l * Math.cos(angle2 * Math.PI / 180);
    let y2 =  e_pos.y + l * Math.sin(angle2 * Math.PI / 180);


    let p1 = {
        x: x1,
        y: y1,
    };

    let p2 = {
        x: x2,
        y: y2,
    };

    return {
        p1, p2
    }
}

function calcAngleDegrees(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}

// 判断两条直线是否相交
export function twoLineIsIntersect(p1, p2, q1, q2) {
    let result = false;

    if (
        // 判断以两条线段为对角线的矩形是否相交，如果相交那肯定是相交的。
        Math.min(p1.x, p2.x) <= Math.max(q1.x, q2.x)
        && Math.min(q1.x, q2.x) <= Math.max(p1.x, p2.x)
        && Math.min(p1.y, p2.y) <= Math.max(q1.y, q2.y)
        && Math.min(q1.y, q2.y) <= Math.max(p1.y, p2.y)
    ) {
        // 使用两条线段的向量积，但无法处理两条线段在同一直线上但不相交的情况。
        // x1y2 - x2y1
        let p1p2 = {
            x: p2.x - p1.x,
            y: p2.y - p1.y,
        };

        let p1q1 = {
            x: q1.x - p1.x,
            y: q1.y - p1.y,
        };

        let p1q2 = {
            x: q2.x - p1.x,
            y: q2.y - p1.y,
        };

        // p1p2 X p1q1
        let c1 = p1p2.x * p1q1.y - p1q1.x * p1p2.y;
        // p1p2 X p1q2
        let c2 = p1p2.x * p1q2.y - p1q2.x * p1p2.y;

        return c1 * c2 < 0;
    }
    else {
        result = false;
    }

    return result;
}
