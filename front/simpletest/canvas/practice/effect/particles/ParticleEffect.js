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
