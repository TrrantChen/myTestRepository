<style>
    .parse-obj-container {
        position: relative;
    }
</style>
<template>
    <div class="parse-obj-container" v-html="html_fragment">

    </div>
</template>
<script>
    export default {
        components: {

        },
        props: {
            json: {
                type: Object,
                default: function() {
                    return {};
                }
            }
        },
        data() {
            return {
            }
        },
        mounted() {

        },
        computed: {
            json_copy: function() {
                return JSON.parse(JSON.stringify(this.json))
            },
            html_fragment: function() {
                return `<pre class='pre_content'>${ this.parseObj(this.json_copy) }</pre>`
            }
        },
        methods: {
            parseObj(obj, tap) {
                tap = tap || '';
                let result = '';
                let para_type = Object.prototype.toString.call(obj);

                switch(para_type) {
                    case '[object Array]':
                        result += '<a><i class="iconfont i-newly expand_button" style="outline: solid 1px #888;"></i></a><span class="arr"><span class="bracket">[</span>\r\n';

                        for (var i = 0, length = obj.length; i< length; i++) {
                            if (i === length - 1) {
                                result += `    ${tap}${this.parseObj(obj[i], tap + '    ')}\r\n`;
                            } else {
                                result += `    ${tap}${this.parseObj(obj[i], tap + '    ')}<span class="comma">,</span>\r\n`;
                            }
                        }

                        result += `${tap}<span class="bracket">]</span></span><span class="hide hide_arr">[...]</span>`;
                        break;
                    case '[object Object]':
                        result += '<button type="button" class="expand_button">s</button><span class="obj"><span class="brace">{</span>\r\n';
                        let obj_keys = Object.keys(obj);

                        for (var i = 0; i < obj_keys.length; i++) {
                            result += `    ${tap}<span class="key">${ obj_keys[i] }</span><span class="colon">: </span>${ this.parseObj(obj[obj_keys[i]], tap + '    ') }<span class="comma">,</span>\r\n`
                        }

                        result += `${tap}<span class="brace">}</span></span><span class="hide hide_obj">{...}</span>`;
                        break;
                    case '[object String]':
                        result = `<span class="string">obj</span>`;
                        break;
                    case '[object Number]':
                        result = `<span class="number">obj</span>`;
                        break;
                    case '[object Boolean]':
                        result = `<span class="boolean">obj</span>`;
                        break;
                    default:
                        result = obj;
                        break;
                }

                return result;
            },
        }
    }
</script>

=================================================objview==============================================================

<style scoped>
    .model-collapse {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }

    .collapse-header {
        width: 100%;
        position: relative;
    }

    .collapse-content {
        width: 100%;
        position: relative;
    }

    .icon-position {
        position: absolute;
        left: 10px;
        top: 50%;
        z-index:1;
        transition: all 0.25s ease-in-out;
    }

    .collapse-header:hover {
        cursor: pointer;
    }

    .collapse-content-show-animation {
        animation-iteration-count: 1;
        animation:animate-show 0.25s ease-in-out alternate forwards;
    }

    .collapse-content-hide-animation {
        animation-iteration-count: 1;
        animation:animate-hide 0.25s ease-in-out alternate forwards;
    }

    .collapse-content-show {
        opacity: 1;
        height: 100%;
    }

    .collapse-content-hide {
        opacity: 0;
        height: 0;
    }

    @keyframes animate-show {
        0% {
            opacity: 0;
            height: 0;
        }
        100% {
            opacity: 1;
            height: 100%;
        }
    }

    @keyframes animate-hide {
        0% {
            opacity: 1;
            height: 100%;
        }
        100% {
            opacity: 0;
            height: 0;
        }
    }

    .icon-right-animation {
        transform: translateY(-50%) rotate(0);
    }

    .icon-down-animation {
        transform: translateY(-50%) rotate(90deg);
    }

</style>
<template>
    <div class="model-collapse">
        <div class="collapse-header" @click="clickHandler">
            <i class="iconfont i-sright icon-position" :title="value ? '折叠' : '展开'"  :class="[value ? 'icon-down-animation' :  'icon-right-animation']"></i>
            <slot name="header">

            </slot>
        </div>
        <div ref="collapse_content" class="collapse-content " >
            <slot name="content">

            </slot>
        </div>
    </div>
</template>
<script>

    export default {
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            init_data: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                exclude_dom_type: ['input', 'button', 'textarea', 'a', 'select', 'i'],
            }
        },
        created() {
        },
        mounted() {
            // todo submit 的时候展开
            // let collapse_content = this.$refs.collapse_content;
            //
            // console.log(this.$parent);
            // console.log(collapse_content.querySelectorAll('input'));



            let collapse_content = this.$refs.collapse_content;

            // 这么折腾是为了兼容positoin: fixed
            if (this.value) {
                collapse_content.classList.add('collapse-content-show');
            } else {
                collapse_content.classList.add('collapse-content-hide');
            }

            collapse_content.addEventListener('animationend', this.animationEndHanlde);
        },
        beforeDestroy() {
            let collapse_content = this.$refs.collapse_content;
            collapse_content.removeEventListener('animationend', this.animationEndHanlde);
        },
        methods: {
            clickHandler(evt) {
                let dom = evt.target;
                let node_name = dom.nodeName.toLowerCase();
                let collapse_content = this.$refs.collapse_content;

                if (!this.exclude_dom_type.includes(node_name) || (node_name === 'i' && dom.classList.contains('i-sright'))) {
                    this.$emit('input', !this.value);


                    if (!this.value) {
                        collapse_content.classList.remove('collapse-content-hide-animation');
                        collapse_content.classList.remove('collapse-content-hide');
                        collapse_content.classList.add('collapse-content-show-animation');
                    } else {
                        collapse_content.classList.remove('collapse-content-show-animation');
                        collapse_content.classList.remove('collapse-content-show');
                        collapse_content.classList.add('collapse-content-hide-animation');
                    }
                }
            },
            animationEndHanlde(evt) {
                let collapse_content = this.$refs.collapse_content;

                if (collapse_content.classList.contains('collapse-content-hide-animation')) {
                    collapse_content.classList.remove('collapse-content-hide-animation');
                    collapse_content.classList.add('collapse-content-hide');
                }

                if (collapse_content.classList.contains('collapse-content-show-animation')) {
                    collapse_content.classList.remove('collapse-content-show-animation');
                    collapse_content.classList.add('collapse-content-show')
                }
            },
        },
    }
</script>

==================================================collapse================================================================

<style scoped>
    .upload-button-style {
        height: 33px;
    }
</style>
<template>
    <div>
        <button type="button" class="btn up-btn upload-button-style" :disabled="is_loading">
            <img v-show="is_loading" style="height: 16px;" src="//vui.oa.fenqile.com/ui/desktop/vue-loading/theme/loading32.svg" alt="加载中">
            <span v-show="!is_loading">{{ span_content }}</span>
            <input @change="uploadFile" type="file"  :accept="accept" :disabled="disabled" />
        </button>
    </div>
</template>
<script>
    import SparkMD5 from 'spark-md5';
    import Message from 'components/Message/1.0.0';
    import * as WorkerFactory from 'src/modules/worker/workerFactory';

    export default {
        components: {
            Message,
        },
        props: {
            disabled: {
                type: Boolean,
                default: false,
            },
            span_content: {
                type: String,
                default: '上传文件',
            },
            limit_line_num: {
                type: Number,
                default: NaN,
            },
            limit_size: {
                type: Number,
                default: NaN,
            },
            accept: {
                type: String,
                default: '*/*',
            },
            url: {
                type: String,
                // default: '//static.fenqile.com/upload?type=file&output_type=json&scenes=rcpostloan',
                default: '//static.fenqile.com/upload?scenes=publish&type=file&output_type=json',
                // default: '//static.fenqile.com/upload?scenes=modelscript&type=file&output_type=json',
            },
            filter_file_name: {
                type: RegExp,
                default: function() {
                    return /(?:)/;
                }
            }
        },
        data() {
            return {
                is_loading: false,
                worker: null,
            }
        },
        created() {
            this.worker = WorkerFactory.getWorker('countFileLineNumber');
        },
        methods: {
            async uploadFile(evt) {
                this.$emit('on-click');
                this.is_loading = true;
                let file = evt.target.files[0];
                let formData = new FormData();

                try {

                    // 验证文件名，如果有需要的话
                    if (this.filter_file_name.toString() !== '/(?:)/' && this.filter_file_name.test(file.name)) {
                        this.$message.error('上传文件名不能包含中文');
                        return;
                    }

                    let lineNum = isNaN(this.limit_line_num) ? 0 : (await this.getLineNum(file) - 1);
                    let limit_line_num = isNaN(this.limit_line_num) ? Number.MAX_SAFE_INTEGER : this.limit_line_num;
                    let limit_size = isNaN(this.limit_size) ? Number.MAX_SAFE_INTEGER : this.limit_size;

                    if (lineNum <= limit_line_num && file.size < limit_size) {
                        let md5 = await this.getMd5(file);
                        formData.append('file', file);

                        let ajax_result = await this.$ajax.post(this.url, formData);

                        if (ajax_result.retcode === 0) {
                            this.$emit('callBack', {
                                path: ajax_result.src,
                                line_num: lineNum,
                                md5: md5,
                                name: file.name,
                            });

                        } else {
                            this.$message.error('文件上传出错');
                        }
                    } else {
                        let err_msg = (isNaN(this.limit_line_num) ? '' : `文件内容条数须在1~${limit_line_num}之间`) +
                            (isNaN(this.limit_size) ? '' : ` 文件大小需小于${this.getLimitSizeMsg()}`);

                        this.$message.error(err_msg);
                    }
                } catch(e) {
                    this.$message.error(e);
                } finally {
                    evt.target.value = '';
                    this.is_loading = false;
                }
            },
            getMd5(file) {
                return new Promise((resolve, reject) => {
                    try {
                        let spark = new SparkMD5.ArrayBuffer();
                        let fileReader = new FileReader();

                        fileReader.onload = function(e) {
                            spark.append(e.target.result);
                        };

                        fileReader.onloadend = function(e) {
                            resolve(spark.end());
                        };

                        fileReader.onerror = function(e) {
                            reject(e);
                        };

                        fileReader.readAsArrayBuffer(file);
                    } catch(e) {
                        reject(e);
                    }
                });
            },
            getLineNum(file) {
                let that = this;
                return new Promise((resolve, reject) => {
                    try {
                        let fileReader = new FileReader();
                        that.worker.onmessage = function (e) {
                            resolve(e.data.file_line_number);
                        };

                        fileReader.onloadend = function(e) {
                            that.worker.postMessage({ file_content: e.target.result });
                        };

                        fileReader.onerror = function(e) {
                            reject(e);
                        };

                        fileReader.readAsText(file);
                    } catch(e) {
                        reject(e);
                    }

                })
            },
            getLimitSizeMsg() {
                let str = '';

                if (this.limit_size < 1024) {
                    str = 1024;
                } else if (this.limit_size / (1024 * 1024) < 1) {
                    str = (this.limit_size / 1024) + 'KB';
                } else {
                    str = (this.limit_size / (1024 * 1024)) + 'MB';
                }

                return str;
            },
        }
    }
</script>

================================================upload file=======================================================================

export function rgbToHex(r, g, b) {
    let hex = ((r<<16) | (g<<8) | b).toString(16);
    return "#" + new Array(Math.abs(hex.length-7)).join("0") + hex;
}

export function hexToRgb(hex) {
    let rgb = [];

    for (var i=1; i<7; i+=2) {
        rgb.push(parseInt("0x" + hex.slice(i,i+2)));
    }

    return rgb;
}

export function calcGradientColor(min_v, max_v, v,  s_color, e_color) {
    let s_rgb = hexToRgb(s_color);
    let e_rgb = hexToRgb(e_color);

    let diff = Math.min(Math.max(v, min_v), max_v) - min_v;

    let r_rgb = s_rgb.map((value, index) => {
        return Math.round(value + (e_rgb[index] - value) * diff / (max_v - min_v));
    });

    let result = rgbToHex(r_rgb[0], r_rgb[1], r_rgb[2]);

    return result;
}

==============================================color relative======================================================

// base64转blob
function dataURLtoBlob(dataUrl) {
    let arr = dataUrl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let len = bstr.length;
    let u8arr = new Uint8Array(len);

    while (len--) {
        u8arr[len] = bstr.charCodeAt(len);
    }

    return new Blob([u8arr], {type: mime});
}

export function addResize(dom, callback) {

    if (dom) {

        let obj = document.createElement('object');
        obj.setAttribute('style','display:block; position: absolute; top: 0; left: 0; height:100%;width:100%;overflow:hidden;opacity:0;pointer-events:none;z-index:-1;');
        obj.onload = function() {

            this.contentDocument.defaultView.addEventListener('resize', function() {

                if (callback) {
                    callback();
                }

            })
        };
        obj.type='text/html';
        obj.data = 'about:blank';
        dom.appendChild(obj);

    }
}

=================================================util=============================================================

export default class DragAndDropController {
    constructor(source, target, data, option) {
        let default_opt = {
            env: null,
            dropEffect: 'copy',
            is_transform_array: false // true,批量传递数组
            // false 数组会和data一一关联起来。
        };

        if (typeof option !== 'object') {
            this._option = default_opt;
        } else {
            this._option = Object.assign(default_opt, option);
        }

        this._source = source;
        this._target = target;
        this._data = data || '';
        this._uuid = this._uuid();
        this._drag_callback = void 0;
        this._drag_over_callback = void 0;
        this._drop_callback = void 0;
        this._drop_error_callback = void 0;
        this.source_event_lst = [];
        this.target_event_lst = [];

        this._registerDomEvent();
    }

    _registerDomEvent() {
        if (Array.isArray(this._source)) {
            if (this._option.is_transform_array) {
                for (var dom of this._source) {
                    let dragstart_handle = this._dragStartHandle.bind(this);

                    this.source_event_lst.push({
                        dragstart: dragstart_handle
                    });

                    dom.addEventListener('dragstart', dragstart_handle);
                    dom.setAttribute('draggable', true);
                }
            } else {
                for (var i = 0, length = this._source.length; i < length; i++) {
                    let dom = this._source[i];
                    let dragstart_handle = this._dragStartHandle.bind(this, i);

                    this.source_event_lst.push({
                        dragstart: dragstart_handle
                    });

                    dom.addEventListener('dragstart', dragstart_handle);
                    dom.setAttribute('draggable', true);
                }
            }
        } else {
            if (this._source) {
                let dragstart_handle = this._dragStartHandle.bind(this);

                this.source_event_lst.push({
                    dragstart: dragstart_handle
                });

                this._source.addEventListener('dragstart', dragstart_handle);
                this._source.setAttribute('draggable', true);
            }
        }

        if (Array.isArray(this._target)) {
            for (var dom of this._target) {
                let drop_handle = this._dropHandle.bind(this);
                let dragover_handle = this._dragoverHandle.bind(this);

                this.target_event_lst.push({
                    drop: drop_handle,
                    dragover: dragover_handle
                });

                dom.addEventListener('drop', drop_handle);
                dom.addEventListener('dragover', dragover_handle);
            }
        } else {
            if (this._target) {
                let drop_handle = this._dropHandle.bind(this);
                let dragover_handle = this._dragoverHandle.bind(this);

                this.target_event_lst.push({
                    drop: drop_handle,
                    dragover: dragover_handle
                });

                this._target.addEventListener('drop', drop_handle);
                this._target.addEventListener('dragover', dragover_handle);
            }
        }
    }

    _removeDomEvent() {
        if (Array.isArray(this._source)) {
            for (var i = 0, length = this._source.length; i < length; i++) {
                let dom = this._source[i];
                dom.removeEventListener('dragstart', this.source_event_lst[i].dragstart);
            }
        } else {
            if (this._source) {
                this._source.removeEventListener('dragstart', this.source_event_lst[0].dragstart);
            }
        }

        if (Array.isArray(this._target)) {
            for (var i = 0, length = this._target.length; i < length; i++) {
                let dom = this._target[i];
                let obj = this.target_event_lst[i];

                dom.removeEventListener('drop', obj.drop);
                dom.removeEventListener('dragover', obj.dragover);
            }
        } else {
            if (this._target) {
                let obj = this.target_event_lst[0];

                this._target.removeEventListener('drop', obj.drop);
                this._target.removeEventListener('dragover', obj.dragover);
            }
        }
    }

    _dragStartHandle(index, evt) {
        let event = this._option.is_transform_array ? index : evt;
        event.stopPropagation();
        let transfer_data = {
            data: this._option.is_transform_array ? this._data : this._data[index]
        };

        if (this._drag_callback) {
            Reflect.apply(this._drag_callback, this._option.env, [transfer_data, event.currentTarget, this._target]);
        }

        event.dataTransfer.setData(this._uuid.toString(), JSON.stringify(transfer_data));
    }

    _dragoverHandle(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = this._option.dropEffect;

        if (this._drag_over_callback) {
            Reflect.apply(this._drag_over_callback, this._option.env, [evt.currentTarget]);
        }
    }

    _dropHandle(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        let transfer_data = JSON.parse(
            evt.dataTransfer.getData(this._uuid.toString()) || evt.dataTransfer.getData('measure') || JSON.stringify({})
        );

        if (transfer_data !== void 0 && Object.keys(transfer_data).length !== 0) {
            if (this._drop_callback) {
                Reflect.apply(this._drop_callback, this._option.env, [transfer_data.data, evt.currentTarget]);
            }
        } else {
            if (this._drop_error_callback) {
                Reflect.apply(this._drop_error_callback, this._option.env, [evt.currentTarget]);
            } else {
                console.warn('not allow to drop here');
            }
        }

        evt.dataTransfer.clearData();
    }

    _uuid(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [],
            i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
        } else {
            // rfc4122, version 4 form
            var r;

            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';

            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | (Math.random() * 16);
                    uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    }

    destroy() {
        this._removeDomEvent();
    }

    setDragCallback(func) {
        this._drag_callback = func;
    }

    setDragOverCallback(func) {
        this._drag_over_callback = func;
    }

    setDropCallback(func) {
        this._drop_callback = func;
    }

    setDropErrorCallback(func) {
        this._drop_error_callback = func;
    }
}

======================================================draganddrop=================================================


import html2canvas from 'html2canvas';

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

export default class ParticleEffect {
    callback = void 0;
    particles = [];
    particle_ctx = this._createParticleCanvas();
    dom = void 0;

    constructor(target_dom, func) {

        if (func) {
            this.callback = this._execOnce(func);
        }

        this.dom = target_dom;
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

======================================================lizitexiao=========================================================

<style>
    .full-screen-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .full-screen-action {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: auto;
        z-index: 9;
        background: rgba(0, 0, 0, 0.5);
    }

    .exit-full-screen-button {
        position: absolute;
        top: -40px;
        right: -40px;
        width: 80px;
        height: 80px;
        cursor: pointer;
        border-radius: 50%;
        background-color: #000;
        z-index: 9;
    }

    .exit-full-screen-button>i {
        color: #ffffff;
        position: absolute;
        bottom: 15px;
        left: 15px;
        font-size: 12px;
    }

</style>
<template>
    <div class="full-screen-container" :class="{ 'full-screen-action': value }">
        <div @click="exitFullScreen" v-show="value" class="exit-full-screen-button">
            <i class="iconfont i-delete"></i>
        </div>
        <slot>
        </slot>
    </div>
</template>
<script>
    export default {
        props: {
            value: {
                type: Boolean,
                defualt: false,
            }
        },
        watch: {
            value: function(val, old_val) {
                if (val !== old_val) {
                    if (val) {
                        document.documentElement.style.overflow = "hidden";
                    } else {
                        document.documentElement.style.overflow = "";
                    }
                }
            }
        },
        methods: {
            exitFullScreen() {
                this.$emit('exit-handle');
                this.$emit('input', false);

            }
        }
    }
</script>

====================================full screen===========================================================

<style>
    .draggable-content {
        display: flex;
        width: 100%;
    }


</style>
<template>
    <div class="draggable-content" :style="style_obj">
        <slot>

        </slot>
    </div>
</template>
<script>
    export default {
        props: {
            value: {
                type: Array,
                default: function() {
                    return [];
                },
            },
            direction: {
                type: String,
                default: function() {
                    return 'row';
                }
            },
            is_wrap: {
                type: Boolean,
                default: true,
            },
            disabled: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                move_index: void 0,
                dom_lst: [],
                dom_event_map: void 0,
                style_obj: {},
                draggable_content_lst: void 0,
                select_dom: void 0,
                is_drag_start: false,
            }
        },
        watch: {
            'value': {
                handler(val) {

                    if (val && val.length !== 0) {

                        setTimeout(() => {

                            this.dom_lst = this.$slots.default.map((content) => {
                                return content.elm;
                            });

                            this.addDragEventHandle();

                        });

                    }

                },
                immediate: true,
                // deep: true,
            },
            'disabled': function(val, old_val) {

                if (val !== old_val) {

                    for (var dom of this.dom_lst){
                        dom.setAttribute('draggable', !val);
                    }

                }

            }
        },
        created() {
            this.dom_event_map = new Map();
            this.style_obj = {
                'flex-direction' : this.direction === 'row' ? 'row' : 'column',
                'flex-wrap': this.is_wrap ? 'wrap' : 'nowrap',
            };
        },
        mounted() {

        },
        beforeDestroy() {
            this.removeDragEventHandle();
        },
        methods: {
            addDragEventHandle() {

                this.dom_event_map.clear();

                // 这块的事件并不会重复订阅，很神奇。
                for (let [index, dom] of this.dom_lst.entries()){

                    let tmp_drag_start = this.dragStartHandle.bind(dom, index);
                    let tmp_drag_enter = this.dragEnterHandle.bind(dom, index);
                    let tmp_drag_over = this.dragOverHandle.bind(dom, index);
                    let tmp_drag_leave = this.dragLeaveHandle.bind(dom, index);
                    let tmp_drag_end = this.dragEndHandle.bind(dom, index);
                    let tmp_drop = this.dropHandle.bind(dom, index);

                    let evt_obj = {
                        'drag_start': tmp_drag_start,
                        'drag_enter': tmp_drag_enter,
                        'drag_over': tmp_drag_over,
                        'drag_leave': tmp_drag_leave,
                        'drag_end': tmp_drag_end,
                        'drop': tmp_drop,
                    };

                    this.dom_event_map.set(dom, evt_obj);

                    dom.addEventListener('click', this.mousedown);
                    dom.addEventListener('dragstart', tmp_drag_start);
                    dom.addEventListener('dragenter', tmp_drag_enter);
                    dom.addEventListener('dragover', tmp_drag_over);
                    dom.addEventListener('dragleave', tmp_drag_leave);
                    dom.addEventListener('dragend', tmp_drag_end);
                    dom.addEventListener('drop', tmp_drop);
                    dom.setAttribute('draggable', !this.disabled);

                }

            },
            removeDragEventHandle() {

                for (let dom of this.dom_lst){

                    let evt_obj = this.dom_event_map.get(dom);

                    if (evt_obj) {

                        dom.removeEventListener('click', this.mousedown);
                        dom.removeEventListener('dragstart', evt_obj['drag_start']);
                        dom.removeEventListener('dragenter', evt_obj['drag_enter']);
                        dom.removeEventListener('dragover', evt_obj['drag_over']);
                        dom.removeEventListener('dragleave', evt_obj['drag_leave']);
                        dom.removeEventListener('dragend', evt_obj['drag_end']);
                        dom.removeEventListener('drop', evt_obj['drop']);

                    }

                }

                this.dom_event_map.clear();

            },
            mousedown(evt) {
                // this.select_dom = evt.currentTarget;
                // this.select_dom.setAttribute('draggable', true);
                // console.log('click');
                console.log('click');
            },
            dragStartHandle(idx, evt) {
                evt.stopPropagation();

                this.move_index = idx;
                // let dom = evt.currentTarget;
                this.is_drag_start = true;
                evt.dataTransfer.setData("compatibleFireFox", '');
            },
            dragOverHandle(idx, evt) {
                evt.stopPropagation();

                if (this.is_drag_start) {

                    evt.preventDefault();
                    evt.dataTransfer.dropEffect = "move";
                    let dom = evt.currentTarget;
                    dom.style.opacity = 0.5;

                }
            },
            dragEnterHandle(idx, evt) {
                evt.stopPropagation();

                if (this.is_drag_start && this.move_index !== idx) {

                    this.value.splice(idx, 0, this.value.splice(this.move_index, 1)[0]);
                    this.move_index = idx;
                    this.$emit('input', this.value);

                }
            },
            dragLeaveHandle(idx, evt) {
                evt.stopPropagation();

                if (this.is_drag_start) {

                    let dom = evt.currentTarget;
                    dom.style.opacity = 1;

                }
            },
            dragEndHandle(idx, evt) {
                evt.stopPropagation();

                if (this.is_drag_start) {

                    let dom = evt.currentTarget;
                    dom.style.opacity = 1;
                    this.is_drag_start = false;
                    console.log('drag end');

                }
            },
            dropHandle(idx, evt) {
                evt.stopPropagation();

                if (this.is_drag_start) {

                    let dom = evt.currentTarget;
                    dom.style.opacity = 1;
                    console.log('drop');

                }

            },
        }
    }
</script>


==============================================simple drag=====================================================

<style>
</style>
<template>
    <div id="main" ref="main" :style="{ width: width, height: height }"></div>
</template>
<script>
    import { addResize } from '../analysis/util';


    export default {
        components: {

        },
        props: {
            is_show: {
                type: Boolean,
                default: true,
            },
            option: {
                type: [Object, Promise],
                default: function() {
                    return {
                        series:[],
                    }
                }
            },
            width: {
                type: String,
                default: '600px',
            },
            height: {
                type: String,
                default: '400px',
            }
        },
        data() {
            return {
                initEchart: null,
                myChart: null,
            }
        },
        watch: {
            is_show: function(val, oldVal) {
                if (val !== oldVal && val) {
                    this.initEchart();
                }
            },
            option: function(val, oldVal) {
                if (this.myChart) {
                    this.myChart.showLoading();
                }


                if (val instanceof Promise) {
                    val.then((value) => {
                        this.changeOprion(value);
                    })
                }
                else if (val !== oldVal && val) {
                    this.changeOprion(val);
                }
            }
        },
        created() {
            this.initEchart = this.initEchartOne();
        },
        mounted() {
            if (this.is_show) {
                this.initEchart();
            }
        },
        beforeDestroy() {
            if (this.myChart) {
                this.myChart.dispose();
                this.myChart = null;
                window.removeEventListener('resize', this.resizeHandle);
            }
        },
        methods: {
            initEchartOne() {
                let that = this;
                let isExecuted = false;

                return function() {
                    if (!isExecuted) {
                        let main = that.$refs.main;
                        that.myChart = echarts.init(main);

                        addResize(main, () => {
                            that.myChart.resize();
                        });

                        that.$emit('onsetchart', that.myChart);

                        setTimeout(() => {
                            if(!that.myChart){
                                return ;
                            }
                            if (that.option instanceof Promise) {
                                that.option.then((val) => {
                                    that.myChart.setOption(val);
                                })
                            }
                            else {
                                that.myChart.setOption(that.option);
                            }

                        });
                        window.addEventListener('resize', that.resizeHandle);
                        isExecuted = true;
                    }
                }
            },
            changeOprion(val) {
                setTimeout(() => {
                    if (this.myChart !== void 0 && this.myChart !== null) {
                        this.myChart.clear();
                        this.myChart.setOption(val);
                        this.myChart.hideLoading();
                    }
                });
            },
            resizeHandle() {
                this.myChart.resize();
            },
        }
    }
</script>

=========================================================echart========================================================

https://codepen.io/search/pens?q=fold%20menu&page=1&order=popularity&depth=everything | CodePen Search
https://codepen.io/johuder33/pen/JYryom | Folding Menu CSS3 and jQuery
https://codepen.io/MWILL/pen/AevrH | CSS only 3D fold menu
https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective | perspective - CSS（层叠样式表） | MDN
https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-style | transform-style - CSS（层叠样式表） | MDN
https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&ei=pKTvXMvaE4-kwgPy96KYAg&q=transition&oq=transition&gs_l=psy-ab.3...134933.134933..135305...0.0..0.0.0.......0....2j1..gws-wiz.IinS-zq_DE0 | transition - Google 搜索
https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/translate3d | translate3d() - CSS（层叠样式表） | MDN

https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&ei=UozvXOOPDszXvASnyJOIAg&q=canvas+%E4%B8%8D%E8%A7%84%E5%88%99%E5%9B%BE%E5%BD%A2+%E4%BA%8B%E4%BB%B6&oq=canvas+%E4%B8%8D%E8%A7%84%E5%88%99%E5%9B%BE%E5%BD%A2+%E4%BA%8B%E4%BB%B6&gs_l=psy-ab.3...133206.135823..136038...0.0..0.666.4873.3-7j1j3......0....1..gws-wiz.zVtCSLiG7k8 | canvas 不规则图形 事件 - Google 搜索
https://blog.csdn.net/iefreer/article/details/51484100 | 使用Canvas绘制不完美/不规则的圆形 - 陈小峰（iefreer）的专栏 - CSDN博客
https://blog.csdn.net/baidu_31333625/article/details/53760448 | h5里不规则图形的点击事件的解决方案 - 人民群众小学生 - CSDN博客
https://blog.csdn.net/oMiracle123/article/details/79727024 | html5 canvas实现不规则形状图片触发事件 - newmiracle学习天地 - CSDN博客
https://www.cnblogs.com/zhangjk1993/p/6139146.html | 【HTML5】Canvas 内部元素添加事件处理 - zhangjk - 博客园

https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&biw=1920&bih=977&ei=F3PeXJjFKInEvQTt6rr4Bg&q=vue+angular+react+%E4%BA%8B%E4%BB%B6&oq=vue+angular+react+%E4%BA%8B%E4%BB%B6&gs_l=psy-ab.3...3804.3804..4427...0.0..0.156.156.0j1......0....1..gws-wiz.rj0WLSGKxmE | vue angular react 事件 - Google 搜索
http://dean.edwards.name/weblog/2005/10/add-event/ | Dean Edwards: addEvent() – My Solution
http://dean.edwards.name/my/events.js | dean.edwards.name/my/events.js
https://www.cnblogs.com/aaronjs/p/3444874.html | 解密jQuery事件核心 - 绑定设计（一） - 【艾伦】 - 博客园
https://foio.github.io/jquery-event-research/ | jQuery事件系统研究 – 积木村の研究所
http://foio.github.io/javascript-delegate/ | javascript事件委托机制对比 – 积木村の研究所
https://foio.github.io/ | 积木村の研究所
https://www.h5jun.com/post/mixin-in-es6.html | 类的装饰器：ES6 中优雅的 mixin 式继承 - 十年踪迹的博客
https://segmentfault.com/a/1190000008871433 | Canvas getContext("3d")? - 阿创的前端小站 - SegmentFault 思否
https://www.google.com/search?q=canvas+%E4%BA%8B%E4%BB%B6%E5%BA%93&rlz=1C1GCEU_zh-CNUS833US833&oq=canvas+%E4%BA%8B%E4%BB%B6%E5%BA%93&aqs=chrome..69i57.2349j0j1&sourceid=chrome&ie=UTF-8 | canvas 事件库 - Google 搜索
https://www.google.com/search?q=jquery+%E6%95%B0%E6%8D%AE%E7%BC%93%E5%AD%98+%E6%9C%BA%E5%88%B6&rlz=1C1GCEU_zh-CNUS833US833&oq=jquery+%E6%95%B0%E6%8D%AE%E7%BC%93%E5%AD%98+%E6%9C%BA%E5%88%B6&aqs=chrome..69i57.12190j0j1&sourceid=chrome&ie=UTF-8 | jquery 数据缓存 机制 - Google 搜索
https://juejin.im/entry/58ad3060570c35006bce3bf6 | jQuery 源码系列（八）data 缓存机制 - 前端 - 掘金
https://www.cnblogs.com/chaojidan/p/4179230.html | jquery源码解析：jQuery数据缓存机制详解1 - chaojidan - 博客园
https://www.crockford.com/blog.html | Blog
https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&ei=yVLrXNCRBNKw9QP39ISoDA&q=jquery+%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6+&oq=jquery+%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6+&gs_l=psy-ab.3...8697.8697..9008...0.0..0.0.0.......0....1..gws-wiz.vWihiWA2k9A | jquery 自定义事件 - Google 搜索

https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&ei=k_LsXMi3C4rivgS7_r_oCQ&q=Bootstrap%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%95%8C%E9%9D%A2%E6%A8%A1%E6%9D%BF&oq=Bootstrap%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86%E7%95%8C%E9%9D%A2%E6%A8%A1%E6%9D%BF&gs_l=psy-ab.3...1335.1335..1719...0.0..0.0.0.......0....2j1..gws-wiz.fD3-0o5sxQ4 | Bootstrap后台管理界面模板 - Google 搜索
https://adminlte.io/themes/AdminLTE/index2.html | AdminLTE 2 | Dashboard
http://www.bootstrapmb.com/tag/houtaimoban | Bootstrap后台模板 - Bootstrap模板库
http://www.bootstrapmb.com/tag/bootstraphoutai | bootstrap后台 - Bootstrap模板库
http://www.cssmoban.com/tags.asp?n=bootstrap%E5%90%8E%E5%8F%B0 | bootstrap后台网站模板_bootstrap后台网站模板免费下载_模板之家

https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&ei=qV_mXP3JF4qF0wS2nI_IDw&q=%E5%88%A4%E6%96%AD%E4%B8%A4%E6%9D%A1%E7%9B%B4%E7%BA%BF%E6%98%AF%E5%90%A6%E7%9B%B8%E4%BA%A4&oq=%E5%88%A4%E6%96%AD%E4%B8%A4%E6%9D%A1%E7%9B%B4%E7%BA%BF%E6%98%AF%E5%90%A6%E7%9B%B8%E4%BA%A4&gs_l=psy-ab.3..0i12.11508.21421..21644...10.0..2.719.17064.3-41j4j1j1......0....1..gws-wiz.....0..0j0i67j0i5i30j0i12i5i30.ado4kHYfBFM | 判断两条直线是否相交 - Google 搜索
https://blog.csdn.net/qiushangren/article/details/82782220 | 判断两点连线是否与线段相交，判断两点是否在线段两边 - qiushangren的专栏 - CSDN博客
https://www.cnblogs.com/Duahanlang/archive/2013/05/11/3073434.html | 计算几何 --- 判断两条线段是否相交（平面内） - 妮king狼 - 博客园
https://zhuanlan.zhihu.com/p/37360022 | 03. 判断两线段相交 - 知乎
https://www.google.com/search?q=%E5%90%91%E9%87%8F%E5%8F%89%E7%A7%AF&rlz=1C1GCEU_zh-CNUS833US833&oq=%E5%90%91%E9%87%8F%E5%8F%89%E7%A7%AF&aqs=chrome..69i57.1616j0j1&sourceid=chrome&ie=UTF-8 | 向量叉积 - Google 搜索
https://zh.wikipedia.org/wiki/%E5%8F%89%E7%A7%AF | 叉积 - 维基百科，自由的百科全书
https://zh.wikipedia.org/wiki/%E7%82%B9%E7%A7%AF | 数量积 - 维基百科，自由的百科全书

https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage | Basic usage of canvas - Web APIs | MDN
https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors | 使用样式和颜色 - Web API 接口参考 | MDN
https://www.zhangxinxu.com/wordpress/2017/03/canvas-2d-cool-affect-skills-technology/ | canvas 2D炫酷动效的实现套路和需要的技术积累 « 张鑫旭-鑫空间-鑫生活
https://www.zhangxinxu.com/study/201703/canvas-ball.html | canvas基础的圆圈圈水平随机运动效果 » 张鑫旭-鑫空间-鑫生活
https://www.zhangxinxu.com/wordpress/2013/08/%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF-cubic-bezier-css3%E5%8A%A8%E7%94%BB-svg-canvas/ | 贝塞尔曲线与CSS3动画、SVG和canvas的基情 « 张鑫旭-鑫空间-鑫生活
https://www.zhangxinxu.com/wordpress/2014/06/deep-understand-svg-path-bezier-curves-command/ | 深度掌握SVG路径path的贝塞尔曲线指令 « 张鑫旭-鑫空间-鑫生活
https://www.google.com/search?q=canvas+%E7%94%BB+%E6%9B%B2%E7%BA%BF&rlz=1C1GCEU_zh-CNUS833US833&oq=canvas+%E7%94%BB+%E6%9B%B2%E7%BA%BF&aqs=chrome..69i57j0.3644j0j1&sourceid=chrome&ie=UTF-8 | canvas 画 曲线 - Google 搜索
https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&ei=kEHRXMSNBYeA9QPmz72ACw&q=canvas+%E5%8A%A8%E7%94%BB+%E5%BA%93&oq=canvas+%E5%8A%A8%E7%94%BB+%E5%BA%93&gs_l=psy-ab.3...508402.510370..510504...0.0..0.161.1755.0j12......0....1..gws-wiz.......0i67j0i12j0.U5z0Djh9Q9E | canvas 动画 库 - Google 搜索
https://www.cnblogs.com/rubylouvre/p/3570636.html | canvas的性能优化 - 司徒正美 - 博客园
http://taobaofed.org/blog/2016/02/22/canvas-performance/ | Canvas 最佳实践（性能篇） | Taobao FED | 淘宝前端团队
https://segmentfault.com/a/1190000004852668 | 每周一点canvas动画——序 - 每天一点canvas动画 - SegmentFault 思否
https://codepen.io/supperjet/pen/MbbPeJ?editors=0010 | A Pen by Yufei Zhou
https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&ei=g1bRXKnRMM7-9QPp6YqwAg&q=canvas+%E7%BA%BF%E6%AE%B5+%E7%B2%92%E5%AD%90%E5%8C%96&oq=canvas+%E7%BA%BF%E6%AE%B5+%E7%B2%92%E5%AD%90%E5%8C%96&gs_l=psy-ab.3...8625.9542..9717...0.0..1.334.1860.0j6j2j1......0....1..gws-wiz.XPsd-ZII-kw | canvas 线段 粒子化 - Google 搜索
https://juejin.im/post/5bf506576fb9a049a62c329a | canvas 粒子效果 - 手残实践纪录 - 掘金
https://blog.fundebug.com/2019/01/11/10-javascript-animation-library-in-2019/ | 2019年10个最受欢迎的JavaScript动画库！ | Fundebug博客
https://github.com/juliangarnier/anime | juliangarnier/anime: JavaScript animation engine
https://codepen.io/juliangarnier/pen/MZXQNV | Advanced staggering with anime.js
https://www.google.com/search?q=%E5%8A%A8%E7%94%BB+%E6%89%A7%E8%A1%8C+%E7%B2%92%E5%BA%A6&rlz=1C1GCEU_zh-CNUS833US833&oq=%E5%8A%A8%E7%94%BB+%E6%89%A7%E8%A1%8C+%E7%B2%92%E5%BA%A6&aqs=chrome..69i57.8087j0j1&sourceid=chrome&ie=UTF-8 | 动画 执行 粒度 - Google 搜索
https://developer.mozilla.org/en-US/docs/Web/API/DOMParser | DOMParser - Web APIs | MDN
https://developer.mozilla.org/en-US/docs/Web/API/XMLSerializer | XMLSerializer - Web APIs | MDN
https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment | DocumentFragment - Web API 接口参考 | MDN
https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D | CanvasRenderingContext2D - Web API 接口参考 | MDN
https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/addHitRegion | CanvasRenderingContext2D.addHitRegion() - Web API 接口参考 | MDN

https://www.google.com.hk/search?safe=strict&rlz=1C1GCEU_zh-CNUS833US833&biw=1876&bih=913&ei=Bt6uXPePFu6Sr7wPh4O8kAc&q=%E8%A1%A5%E9%97%B4%E5%8A%A8%E7%94%BB+%E7%AE%97%E6%B3%95+%E5%8E%9F%E7%90%86&oq=%E8%A1%A5%E9%97%B4%E5%8A%A8%E7%94%BB+%E7%AE%97%E6%B3%95+%E5%8E%9F%E7%90%86&gs_l=psy-ab.3...48299.48299..48526...0.0..0.0.0.......0....1..gws-wiz.0gg_kE8dNzI | 补间动画 算法 原理 - Google Search
https://blog.csdn.net/qq_30100043/article/details/79697349 | Tween.js补间动画插件入门 - 现在学习也不晚 - CSDN博客
https://www.cnblogs.com/mrsunny/archive/2011/05/13/2045021.html | javascript动画、运动算法详细解释与分析 （一、Tween 运动算法学习笔记） - 像阳光一样 - 博客园
https://www.cnblogs.com/mrsunny/archive/2011/05/13/2045814.html | javascript动画、运动算法详细解释与分析 （二、javascript动画 时间精度问题） - 像阳光一样 - 博客园
http://www.cnblogs.com/cloudgamer/archive/2009/01/06/tween.html | JavaScript Tween算法及缓动效果 - cloudgamer - 博客园
https://www.zhangxinxu.com/wordpress/2017/01/share-a-animation-algorithm-js/ | 分享一个即插即用的私藏缓动动画JS小算法 « 张鑫旭-鑫空间-鑫生活
https://www.zhangxinxu.com/wordpress/2016/12/how-use-tween-js-animation-easing/ | 如何使用Tween.js各类原生动画运动缓动算法 « 张鑫旭-鑫空间-鑫生活
https://www.zhangxinxu.com/study/201612/how-to-use-tween-js.html | Tween.js动画算法使用示意 » 张鑫旭-鑫空间-鑫生活
https://www.zhangxinxu.com/wordpress/2018/10/scroll-behavior-scrollintoview-%e5%b9%b3%e6%bb%91%e6%bb%9a%e5%8a%a8/ | CSS scroll-behavior和JS scrollIntoView让页面滚动平滑 « 张鑫旭-鑫空间-鑫生活
https://github.com/sole/tween.js/blob/master/src/Tween.js | tween.js/Tween.js at master · sole/tween.js
https://github.com/tweenjs/tween.js | tweenjs/tween.js: Javascript tweening engine
https://www.google.com.hk/search?safe=strict&rlz=1C1GCEU_zh-CNUS833US833&ei=7lSwXIPRFIHfmAXRz4jADw&q=string+%E6%88%AA%E5%8F%96+%E5%89%8D%E4%B8%A4%E4%BD%8D&oq=string+%E6%88%AA%E5%8F%96+%E5%89%8D%E4%B8%A4%E4%BD%8D&gs_l=psy-ab.3...3864634.3869539..3869699...2.0..0.688.5708.0j17j3j0j2j2....2..0....1..gws-wiz.......0j0i131j0i3j0i12j33i160.FyvdzjDEvMw | string 截取 前两位 - Google Search
https://www.cnblogs.com/junjieok/p/3306155.html | 实现js浮点数加、减、乘、除的精确计算（网上很多文章里的方法是不能解决所有js浮点数计算误差的） - junjieok - 博客园
https://juejin.im/post/5aa1395c6fb9a028df223516 | JS中浮点数精度问题 - 掘金
https://juejin.im/entry/59e40ba951882546b15b8d00 | JavaScript 浮点数陷阱及解法 - 前端 - 掘金

https://zhuanlan.zhihu.com/p/59691803 | 下一代Web端图形接口现状与前景 - 知乎
https://github.com/gpuweb/gpuweb/issues/2 | Is a clean break from WebGL really necessary? · Issue #2 · gpuweb/gpuweb
https://www.jianshu.com/p/dcb0ffa77887 | GPU通用计算API的变迁和趋势 - 简书
https://www.bgteach.com/article/176 | 图形程序接口知多少 | OpenGL、OpenCL、Vulkan、OpenGL ES、WebGL、Metal、Directx - 【饼干教育-行业资讯】CG行业重大资讯 | 商务办公重大资讯 | 互联网重大资讯 - 饼干教育 - 新软件，新趋势；新人才，新未来！学习软件、设计、游戏、动画的好地方！
https://zhuanlan.zhihu.com/p/45682197 | WebGL BOF 2018 ( 业界发展 ) - 知乎

https://greensock.com/docs | GreenSock | Docs
https://github.com/greensock/GreenSock-JS/ | greensock/GreenSock-JS: GreenSock's GSAP JavaScript animation library (including Draggable).
https://github.com/livoras/blog/issues/8 | JavaScript基于时间的动画算法 · Issue #8 · livoras/blog

https://cli.im/text?68d5e7bbf9f204ae4255d0749121bcc5 | 草料文本二维码生成器
http://tool.oschina.net/commons?type=3 | RGB颜色对照表
http://wiki.fenqile.com/pages/viewpage.action?pageId=31680881 | 2.3. 复杂网络系统 - 大数据中心 - 乐信知识库
https://www.sioe.cn/yingyong/yanse-rgb-16/ | RGB颜色值与十六进制颜色码转换工具
https://www.json.cn/# | JSON在线解析及格式化验证 - JSON.cn

https://www.google.com.hk/search?q=three.js+tween+buffergeometry&safe=strict&rlz=1C1GCEU_zh-CNUS833US833&ei=QailXN3cMtKbmAWeuaCwAQ&start=40&sa=N&ved=0ahUKEwidgZrV67XhAhXSDaYKHZ4cCBY4HhDy0wMIgAE&biw=1920&bih=977 | three.js tween buffergeometry - Google 搜索
https://blog.csdn.net/u013270347/article/details/81479026 | Three.js学习笔记-Tween.js插件 - WebFrontEnd_TL - CSDN博客
http://www.jk-quantized.com/blog/2016/02/10/particle-tweening | Tweening Particles With Three.js - Musings of a Fondue
https://jk-quantized.herokuapp.com/experiments/Bank3js/Tests/equiWebcam/equiWebcam2c.html | equiWebcam
https://threejs.org/examples/#css3d_sprites | three.js / examples
https://stackoverflow.com/questions/27538901/tweening-particles-in-buffergeometry | three.js - tweening particles in buffergeometry - Stack Overflow
https://stackoverflow.com/questions/25066173/three-js-buffer-geometry-particles-need-to-animate-random-groups-of-particles | javascript - Three.js - Buffer geometry particles, need to animate random groups of particles in system - Stack Overflow
https://stackoverflow.com/questions/17410761/how-to-quickly-update-a-large-buffergeometry | javascript - How to quickly update a large BufferGeometry? - Stack Overflow
https://alteredqualia.com/three/examples/webgl_cubes.html | WebGL Cubes

https://www.google.com.hk/search?q=threejs+ShaderMaterial++gradual+circle&safe=strict&rlz=1C1GCEU_zh-CNUS833US833&source=lnms&tbm=isch&sa=X&ved=0ahUKEwi1x7fM44rhAhVGiLwKHdjrDV0Q_AUIDigB&biw=1920&bih=977 | threejs ShaderMaterial gradual circle - Google 搜索
https://stackoverflow.com/questions/18425201/three-js-webgl-draw-a-circle-custom-fill-and-border-color-from-shader | javascript - Three.js WebGL Draw a circle custom fill and border color from shader - Stack Overflow
https://www.google.com.hk/search?safe=strict&biw=1920&bih=928&ei=HDuPXLG_PIaroASR8LDQCw&q=threejs+ShaderMaterial++canvas&oq=threejs+ShaderMaterial++canvas&gs_l=psy-ab.3...2207.5199..5337...2.0..0.133.757.8j1......0....1..gws-wiz.......0j0i10i30j0i30j33i160.yTl8cLxTKTE | threejs ShaderMaterial canvas - Google 搜索
https://stackoverflow.com/questions/40318470/three-js-multiple-canvases-and-shader | Three.js multiple Canvases and Shader - Stack Overflow
https://zhuanlan.zhihu.com/p/36931159 | 学习SHADER 之 ShaderMaterial - 知乎
http://www.yanhuangxueyuan.com/Three.js_course/shader.html | three.js自定义着色器程序ShaderMaterial_郭隆邦技术博客
https://stackoverflow.com/questions/38821176/three-js-opacity-gradient | javascript - three.js opacity gradient - Stack Overflow
https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial | ShaderMaterial - three.js docs
https://www.google.com.hk/search?q=three+js+ShaderMaterial+%E5%8F%91%E5%85%89&lr=&safe=strict&hl=zh-CN&source=lnms&sa=X&ved=0ahUKEwj3rq-b0I3hAhUBfd4KHYZHAtoQ_AUICSgA&biw=1904&bih=916&dpr=1 | three js ShaderMaterial 发光 - Google 搜索
https://juejin.im/entry/587602d861ff4b006d5b481d | WebGL - 片元着色器 1.Bloom 特效实现 - 前端 - 掘金
https://juejin.im/post/5c8650676fb9a049dc031483 | 基于three.js的3D炫酷元素周期表 - 掘金

https://threejs.org/examples/#webgl_custom_attributes_points | three.js / examples
https://github.com/mrdoob/three.js/blob/master/examples/webgl_custom_attributes_points.html | three.js/webgl_custom_attributes_points.html at master · mrdoob/three.js
https://www.google.com/search?q=ShaderMaterial&rlz=1C1GCEU_zh-CNUS833US833&oq=ShaderMaterial&aqs=chrome..69i57j0l5.712j0j1&sourceid=chrome&ie=UTF-8 | ShaderMaterial - Google 搜索
https://threejs.org/docs/#api/en/materials/ShaderMaterial | ShaderMaterial - three.js docs
https://threejs.org/examples/#webgl_buffergeometry_custom_attributes_particles | three.js / examples
https://threejs.org/examples/textures/sprites/spark1.png | spark1.png (32×32)
https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry_custom_attributes_particles.html | three.js/webgl_buffergeometry_custom_attributes_particles.html at master · mrdoob/three.js
https://www.khronos.org/files/opengles_shading_language.pdf | The OpenGL ES Shading Language
https://www.google.com/search?q=webgl+%E8%B0%83%E8%AF%95+GLSL&rlz=1C1GCEU_zh-CNUS833US833&ei=qz6KXKzPN5nu-QbTs6CwAw&start=10&sa=N&ved=0ahUKEwjs0KqWx4HhAhUZd94KHdMZCDYQ8NMDCJAB&biw=1904&bih=907 | webgl 调试 GLSL - Google 搜索
https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&ei=VkCKXLLqD4GchwPutqToDQ&q=chrome+shader+editor&oq=chrome+shader+editor&gs_l=psy-ab.3..0j0i8i30.15777.20401..20686...3.0..0.265.1443.13j2j1......0....1..gws-wiz.......0i131j0i12i10j0i30j0i12i10i30j0i12i5i10i30j0i13j0i8i13i30.Sjc2GyCscuE | chrome shader editor - Google 搜索

https://stackoverflow.com/questions/12945092/memory-leak-with-three-js-and-many-shapes?rq=1 | javascript - Memory leak with three.js and many shapes - Stack Overflow
https://threejs.org/examples/webgl_test_memory.html | three.js - webgl
https://threejs.org/examples/webgl_test_memory2.html | three.js - webgl
https://techbrood.com/threejs/docs/#%E5%8F%82%E8%80%83%E6%89%8B%E5%86%8C/%E6%95%B0%E5%AD%A6%E5%B7%A5%E5%85%B7%E5%BA%93(Math)/%E9%A2%9C%E8%89%B2(Color) | Three.js - 在线中文文档 - 参考手册 - 颜色(Color)
https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&ei=tNlzXI_EC-iVr7wPwqC40As&q=LineBasicMaterial+vertexColors&oq=LineBasicMaterial+vertexColors&gs_l=psy-ab.12..0i30.1384094.1403303..1406580...0.0..0.88.251.3......0....1j2..gws-wiz.....0..0j0i19j0i30i19j0i10i30i19j0i5i30i19.JQZcn7d06wc | LineBasicMaterial vertexColors - Google 搜索
https://stackoverflow.com/questions/26790345/vertex-colors-in-three-line | three.js - Vertex Colors in THREE.Line - Stack Overflow
http://jsfiddle.net/214huf0a/ | Edit fiddle - JSFiddle
https://threejs.org/examples/?q=memory#webgl_test_memory | three.js / examples
https://github.com/mrdoob/three.js/blob/master/examples/webgl_test_memory.html | three.js/webgl_test_memory.html at master · mrdoob/three.js
http://www.hangge.com/blog/cache/detail_1816.html | Three.js - 材质的使用详解2（网格基础材质、深度材质、法向材质、面材质）

https://www.google.com.hk/search?safe=strict&rlz=1C1GCEU_zh-CNUS833US833&ei=Q7KhXIOpAYGG8wWxtKuIDQ&q=vertexColors+%E7%90%86%E8%A7%A3&oq=vertexColors+%E7%90%86%E8%A7%A3&gs_l=psy-ab.3...16923.23468..23674...11.0..0.366.1921.0j3j3j2......0....1..gws-wiz.......0i13i10j0i13i30j0i30j0i10i30j0i13i10i30j0i8i13i30j0i8i13i10i30j33i160._jQRoIvPFdM | vertexColors 理解 - Google 搜索
https://threejs.org/examples/webgl_geometry_colors.html | three.js webgl - geometry - vertex colors
https://zhuanlan.zhihu.com/p/29474729 | Three.js源码解读二：Geometry - 知乎
https://blog.csdn.net/qq_30100043/article/details/79102061 | 54 Three.js 使用THREE.PointCloudMaterial（新版本：THREE.PointsMaterial）样式化粒子 - 现在学习也不晚 - CSDN博客
https://www.google.com.hk/search?safe=strict&rlz=1C1GCEU_zh-CNUS833US833&ei=grKhXJvXAsaL8wW4lITgBQ&q=threejs+%E9%80%8F%E6%98%8E%E9%A2%9C%E8%89%B2&oq=threejs+%E9%80%8F%E6%98%8E%E9%A2%9C%E8%89%B2&gs_l=psy-ab.3...64285.67032..67215...2.0..1.445.1892.0j7j2j0j1......0....1..gws-wiz.7Irgo6vLHZY | threejs 透明颜色 - Google 搜索
https://blog.csdn.net/yinzhijiezhan/article/details/52699655 | 各种颜色的透明色 - yinzhijiezhan的专栏 - CSDN博客

https://www.google.com.hk/search?hl=zh-CN&as_q=three+js+transparent+depthTest+blending&as_epq=&as_oq=&as_eq=&as_nlo=&as_nhi=&lr=lang_zh-CN&cr=&as_qdr=all&as_sitesearch=&as_occt=any&safe=active&as_filetype=&as_rights= | three js transparent depthTest blending - Google 搜索
https://stackoverflow.com/questions/37647853/three-js-depthwrite-vs-depthtest-for-transparent-canvas-texture-map-on-three-p | javascript - Three.js - depthWrite vs depthTest for transparent canvas texture map on THREE.Points - Stack Overflow
https://threejs.org/docs/#api/en/constants/Materials | Materials - three.js docs
https://threejs.org/examples/#webgl_materials_blending | three.js / examples
https://github.com/mrdoob/three.js/blob/master/examples/webgl_points_billboards.html | three.js/webgl_points_billboards.html at master · mrdoob/three.js
https://www.google.com.hk/search?safe=strict&rlz=1C1GCEU_zh-CNUS833US833&ei=UJKYXLHdA6aFr7wP1q2d0AI&q=threejs+line+width&oq=threejs+line+width&gs_l=psy-ab.3..0i7i10i30j0i13j0i13i30j0i8i13i30j0i8i13i10i30.3793905.3805852..3806044...2.0..0.615.5713.2-13j2j2j2......0....1..gws-wiz.......0j0i67j0i12j0i10j0i7i30i19j0i8i7i30i19j0i8i7i10i30i19.L_wPJ5GczgA | threejs line width - Google 搜索
https://threejs.org/docs/index.html#api/en/materials/LineBasicMaterial | LineBasicMaterial - three.js docs
https://blog.csdn.net/qq_30100043/article/details/79533654 | 60 Three.js 使用精灵贴图创建类似HUD层 - 现在学习也不晚 - CSDN博客
https://www.google.com.hk/search?hl=zh-CN&as_q=three+js+depthTest&as_epq=&as_oq=&as_eq=&as_nlo=&as_nhi=&lr=lang_zh-CN&cr=&as_qdr=all&as_sitesearch=&as_occt=any&safe=active&as_filetype=&as_rights= | three js depthTest - Google 搜索
https://blog.gmem.cc/three-js-study-note | 绿色记忆:Three.js学习笔记
https://www.jianshu.com/p/c52965aff608 | webgl 19.DepthTest (深度测试) - 简书
https://stackoverflow.com/questions/37647853/three-js-depthwrite-vs-depthtest-for-transparent-canvas-texture-map-on-three-p | javascript - Three.js - depthWrite vs depthTest for transparent canvas texture map on THREE.Points - Stack Overflow
https://www.google.com.hk/search?hl=zh-CN&as_q=depthWrite&as_epq=&as_oq=&as_eq=&as_nlo=&as_nhi=&lr=lang_zh-CN&cr=&as_qdr=all&as_sitesearch=&as_occt=any&safe=active&as_filetype=&as_rights= | depthWrite - Google 搜索
https://blog.csdn.net/liuhongyi0104/article/details/75332484 | THREE.JS的材质material一些注意的属性 - liuhongyi0104的博客 - CSDN博客
https://www.jianshu.com/p/5807b5f69480 | Three.js 透明物体不能正常显示/渲染顺序的控制问题 - 简书
https://blog.csdn.net/omni360/article/details/42218273 | three.js 源码注释（五十七）Material /ShaderMaterial.js - omni360的专栏 - CSDN博客
https://xbuba.com/questions/40975579 | three.js: 透明对象隐藏其他透明对象（alphaTest不起作用，depthWrite = false导致一些麻烦）
https://www.google.com.hk/search?safe=strict&rlz=1C1GCEU_zh-CNUS833US833&biw=1920&bih=977&ei=KnqcXMe9HpXWmAWokab4Dg&q=3d+force+graph&oq=3d+force&gs_l=psy-ab.1.0.0l3j0i30l4j0i12i30j0i12i10i30l2.5257.8024..9776...2.0..0.243.1370.0j6j2......0....1..gws-wiz.......0i131j0i67j0i10j0i12j0i12i10j0i10i30.mucefVfn400 | 3d force graph - Google 搜索
https://github.com/vasturiano/3d-force-graph | vasturiano/3d-force-graph: 3D force-directed graph component using ThreeJS/WebGL

https://segmentfault.com/a/1190000004987068 | html5手机页面的那些meta - 我和我最后的倔强 - SegmentFault 思否
https://stackoverflow.com/questions/24889100/ios-8-removed-minimal-ui-viewport-property-are-there-other-soft-fullscreen | javascript - iOS 8 removed "minimal-ui" viewport property, are there other "soft fullscreen" solutions? - Stack Overflow

https://threejs.org/docs/index.html#api/en/materials/LineBasicMaterial | LineBasicMaterial - three.js docs
https://www.google.com.hk/search?safe=strict&rlz=1C1GCEU_zh-CNUS833US833&biw=1920&bih=977&ei=AISUXJSIFo_c0gSEhJPADQ&q=es6+%E6%A8%A1%E5%9D%97%E5%86%85+%E8%B0%83%E7%94%A8+export+%E5%87%BD%E6%95%B0&oq=es6+%E6%A8%A1%E5%9D%97%E5%86%85+%E8%B0%83%E7%94%A8+export+%E5%87%BD%E6%95%B0&gs_l=psy-ab.3...27493.37076..37324...1.0..1.339.5960.0j23j7j2......0....1..gws-wiz.......0i67j0j0i7i30j0i8i7i30j33i160.NOpPOqh0s_U | es6 模块内 调用 export 函数 - Google 搜索
https://ithelp.ithome.com.tw/articles/10193351 | DAY 20. Three.js 紋理 Texture - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天
https://www.google.com.hk/search?safe=strict&rlz=1C1GCEU_zh-CNUS833US833&ei=602UXJt1kLaYBaGfhMgP&q=threejs+%E6%9B%B4%E6%96%B0material&oq=threejs+%E6%9B%B4%E6%96%B0material&gs_l=psy-ab.3...13399.29020..29251...1.0..0.324.5831.0j28j3j3......0....1..gws-wiz.......0i7i30j0i13j0i13i30j0i13i5i30j0i7i10i30j0j0i8i13i30j0i7i10i30i19j0i7i30i19j0i8i13i30i19.fpnX_U8_jZg | threejs 更新material - Google 搜索
https://discourse.threejs.org/t/updating-material-map/2381 | Updating Material map? - Questions - three.js Discourse
https://www.cnblogs.com/w-wanglei/p/6766220.html | 加载和使用纹理 - heavi - 博客园
https://chenjy1225.github.io/2016/09/27/three-js-needsUpdate-sources-code/ | three.js needsUpdate 方法
https://stackoverflow.com/questions/11468558/how-to-update-material-of-cube-on-runtime-using-webgl | javascript - How to update material of cube on runtime using WebGL? - Stack Overflow
https://www.google.com.hk/search?safe=strict&rlz=1C1GCEU_zh-CNUS833US833&ei=mFiUXJZepLSYBd_VhtgL&q=%E5%B8%B8%E7%94%A8+%E5%9D%90%E6%A0%87%E5%88%86%E5%B8%83+%E7%AE%97%E6%B3%95&oq=%E5%B8%B8%E7%94%A8+%E5%9D%90%E6%A0%87%E5%88%86%E5%B8%83+%E7%AE%97%E6%B3%95&gs_l=psy-ab.3...5269.9654..9796...0.0..0.246.1584.0j6j3......0....1..gws-wiz.WMgC6CptLS4 | 常用 坐标分布 算法 - Google 搜索
http://www.cnblogs.com/TenosDoIt/p/4025221.html | 均匀的生成圆和三角形内的随机点 - tenos - 博客园
https://wenku.baidu.com/view/de291225aaea998fcc220ef9.html | 一种解法的证明 - 百度文库
https://www.google.com.hk/search?safe=strict&rlz=1C1GCEU_zh-CNUS833US833&ei=LY2UXMz6Iq60mAWl0If4CQ&q=%E7%90%83%E9%9D%A2+%E5%9D%87%E5%8C%80+%E5%88%86%E5%B8%83&oq=%E7%90%83%E9%9D%A2+%E5%9D%87%E5%8C%80+%E5%88%86%E5%B8%83&gs_l=psy-ab.3..0i12.430021.438316..438426...11.0..0.381.5046.0j15j9j2......0....1..gws-wiz.....0..0j0i131j0i8i13i4i10i30i42j0i8i13i4i30j0i13i4i30j0i67.1jC0WLiletI | 球面 均匀 分布 - Google 搜索
https://zhuanlan.zhihu.com/p/19699319#comment-53519476 | 球面上「均匀」分布的 n 个点 - 知乎
https://www.oschina.net/code/snippet_58387_25593 | 将n个点均匀地分布在球面上 - 开源中国社区
https://www.google.com.hk/search?q=three+js+line+special+effects&safe=strict&rlz=1C1GCEU_zh-CNUS833US833&source=lnms&sa=X&ved=0ahUKEwi4o8nyvpXhAhVyEqYKHaXfBa8Q_AUICSgA&biw=1920&bih=977&dpr=1 | three js line special effects - Google 搜索
https://www.google.com.hk/search?q=three+js+line+special+effects&safe=strict&tbm=isch&tbs=rimg:Ce8iIjgtUY_1zIjhr-2et4_1FR47ts-CY4sahkURGi8RMr4xE_1crB5P2a8FZS6oVB-XpjgDg9b9CaRiQ2aUnxPKO3pMSoSCWv7Z63j8VHjEYuUu03wKygJKhIJu2z4JjixqGQRPEyIoSTy8qwqEglREaLxEyvjERG8QTOQIkbqSSoSCT9ysHk_1ZrwVEY28S8N6vji6KhIJlLqhUH5emOARgElOpxc39BgqEgkOD1v0JpGJDRHpoZAAYeYTgSoSCZpSfE8o7ekxETi23-NXuIdx&tbo=u&sa=X&ved=2ahUKEwjSxsiDv5XhAhUlG6YKHR5ODvgQ9C96BAgBEBg&biw=1920&bih=977&dpr=1 | three js line special effects - Google 搜索
https://www.instructables.com/id/Instructables-Universe-in-Threejs/ | Instructables Universe in Three.js: 13 Steps (with Pictures)
https://www.html5rocks.com/en/tutorials/casestudies/100000stars/ | Making 100,000 Stars - HTML5 Rocks
http://stars.chromeexperiments.com/ | 100,000 Stars
https://www.google.com.hk/search?q=&safe=strict&tbm=isch&tbs=rimg:CQ4PW_1QmkYkNIjjR9gdtIQyw9B3pdayXaJ4LWl1lyrqAiz8MrfqAFaU8TS0zWreREr2Pnc8r2JWuvHpUINErS3PZPioSCdH2B20hDLD0ER7gKvDU2bzyKhIJHel1rJdongsR1YlbiL2ywh8qEglaXWXKuoCLPxHdwHh-nRjWHCoSCQyt-oAVpTxNERdSsq5ymz_1ZKhIJLTNat5ESvY8RP6ymWiK0-GgqEgmdzyvYla68ehG5STAVH-5NcyoSCVQg0StLc9k-EVx0xc8x25e8&tbo=u&sa=X&ved=2ahUKEwjg-KuKv5XhAhWbKqYKHQ9NCkgQ9C96BAgBEBg&biw=1920&bih=977&dpr=1 | Google 搜索

https://www.jotform.com/blog/20-exceptional-three-js-experiments-98740/ | 20 Exceptional Three.js Experiments | The JotForm Blog
https://github.com/mrdoob/stats.js/blob/master/src/Stats.js | stats.js/Stats.js at master · mrdoob/stats.js · GitHub
https://threejs.org/docs/index.html#manual/en/introduction/Code-style-guide | Code style guide - three.js docs
https://github.com/dataarts/dat.gui | GitHub - dataarts/dat.gui: dat.gui is a lightweight controller library for JavaScript.
https://github.com/dataarts/dat.gui/blob/master/API.md | dat.gui/API.md at master · dataarts/dat.gui · GitHub
https://github.com/dataarts/dat.gui/blob/master/API.md#GUI+destroy | dat.gui/API.md at master · dataarts/dat.gui · GitHub
https://github.com/dataarts/dat.gui/blob/master/API.md#GUI+remove | dat.gui/API.md at master · dataarts/dat.gui · GitHub
https://github.com/dataarts/dat.gui/blob/master/API.md#GUI+close | dat.gui/API.md at master · dataarts/dat.gui · GitHub
https://blog.csdn.net/lin5165352/article/details/83055606 | 使用threejs实现地球辉光和大气层效果 - X01式动力装甲的专栏 - CSDN博客
https://blog.csdn.net/srk19960903/article/details/78734238 | 使用threejs实现辉光&大气层效果 - srk19960903的博客 - CSDN博客

https://www.google.com.hk/search?safe=strict&rlz=1C1GCEU_zh-CNUS833US833&biw=1892&bih=916&tbm=isch&sa=1&ei=HLuQXP-LLo7Z-Qapt7OgCw&q=threejs+%E5%8A%A8%E7%94%BB+%E7%89%B9%E6%95%88&oq=threejs+%E5%8A%A8%E7%94%BB+%E7%89%B9%E6%95%88&gs_l=img.3...69536.73538..73718...0.0..1.212.1917.12j5j2......0....1..gws-wiz-img.......0j0i10i30j0i30j0i24j0i10i24j0i10i19j0i19j0i10i30i19j0i12i10i24._O8v870NQd0 | threejs 动画 特效 - Google 搜索
https://www.google.com.hk/search?q=threejs+%E5%8A%A8%E7%94%BB+%E7%89%B9%E6%95%88&safe=strict&tbm=isch&tbs=rimg:CbWzOTlXdXf4Igi1szk5V3V3-CoSCbWzOTlXdXf4EfpmMFfJDUda&tbo=u&ved=2ahUKEwjf_sOA943hAhUb9bwKHbeTCWsQiRx6BAgBEAo&ictx=1&uact=3 | threejs 动画 特效 - Google 搜索
https://codepen.io/search/pens?q=spread%20circle&page=1&order=popularity&depth=everything | CodePen Search
https://blog.csdn.net/www93111/article/details/72938459 | canvas动画圆形扩散 - __w__的博客 - CSDN博客

https://www.google.com/search?q=three+js+buffergeometry+size&lr=lang_zh-CN%7Clang_zh-TW&hl=zh-CN&tbs=lr:lang_1zh-CN%7Clang_1zh-TW,qdr:y&source=lnt&sa=X&ved=0ahUKEwjW4fWPk_7gAhUMdt4KHSpzAM8QpwUIIw&biw=1920&bih=977 | three js buffergeometry size - Google 搜索
https://stackoverflow.com/questions/33975780/create-a-buffergeometry-with-several-particles-sizes-best-performance | javascript - Create a bufferGeometry with several particles sizes. Best performance? - Stack Overflow
https://stackoverflow.com/questions/18257929/three-js-particles-of-various-sizes | javascript - Three.js Particles of various sizes - Stack Overflow
http://stemkoski.github.io/Three.js/ParticleSystem-Attributes.html | ParticleSystem - Attributes (Three.js)

https://medium.com/neo4j/visualizing-graphs-in-3d-with-webgl-9adaaff6fe43 | Visualizing Graphs in 3D with WebGL – neo4j – Medium
https://github.com/vasturiano/3d-force-graph | GitHub - vasturiano/3d-force-graph: 3D force-directed graph component using ThreeJS/WebGL
https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&ei=b-eFXPvqMIzQ8wWNp5bYBg&q=OrbitControls+mobile&oq=OrbitControls+mobile&gs_l=psy-ab.3...9177.11384..11799...0.0..0.0.0.......0....1..gws-wiz.tp6NWzgsOMQ | OrbitControls mobile - Google 搜索
https://stackoverflow.com/questions/52335607/three-js-orbit-controls-on-mobile-touch-device | android - Three JS - Orbit controls on mobile/touch device - Stack Overflow
https://github.com/mrdoob/three.js/blob/master/examples/js/controls/OrbitControls.js | three.js/OrbitControls.js at master · mrdoob/three.js · GitHub
https://blog.csdn.net/qq_30100043/article/details/75042703 | 10 Three.js使用orbit controls插件（轨道控制）来控制模型交互动作 - 现在学习也不晚 - CSDN博客
https://blog.csdn.net/qq_37338983/article/details/78575333 | three.js轨道控制器OrbitControls.js - Bruce_wjh的博客 - CSDN博客
https://github.com/mrdoob/three.js/pull/10597 | Add panning to two-finger gesture in OrbitControls.js by MauricioVives · Pull Request #10597 · mrdoob/three.js · GitHub
https://github.com/mrdoob/three.js/issues/9047 | OrbitControls and DeviceOrientationControls · Issue #9047 · mrdoob/three.js · GitHub

https://www.google.com/search?lr=&hl=zh-CN&biw=1920&bih=977&ei=CYOHXL3yOsyImAXI5aog&q=threejs+camera+lookat++not+work&oq=threejs+camera+lookat++not+work&gs_l=psy-ab.3..0i10i19.44644.47059..47441...0.0..0.443.2305.0j3j4j0j2......0....1..gws-wiz.......0i10i30i19j0i8i10i30i19.SoPBDU4LXZk | threejs camera lookat not work - Google 搜索
https://www.cnblogs.com/v-weiwang/p/6072235.html | three.js 相机camera位置属性设置详解 - 黑衣帽子 - 博客园
https://stackoverflow.com/questions/14271672/moving-the-camera-lookat-and-rotations-in-three-js | Moving the camera, lookAt and rotations in three.js - Stack Overflow
https://stackoverflow.com/questions/10325095/threejs-camera-lookat-has-no-effect-is-there-something-im-doing-wrong | javascript - ThreeJS camera.lookAt() has no effect, is there something I'm doing wrong? - Stack Overflow
https://stackoverflow.com/questions/36800799/camera-lookat-not-working-with-stereoeffect/36801725 | three.js - Camera lookAt not working with stereoeffect - Stack Overflow

https://www.google.com/search?q=three+js+%E6%B8%B8%E6%88%8F+%E5%9C%A8%E7%BA%BF+demo&rlz=1C1GCEU_zh-CNUS833US833&ei=E0SDXICYCdSTr7wPs82CyAE&start=10&sa=N&ved=0ahUKEwjA7fSrn_TgAhXUyYsBHbOmABkQ8tMDCHw&biw=1920&bih=977 | three js 游戏 在线 demo - Google 搜索
https://www.google.com/search?q=3d++graph&rlz=1C1GCEU_zh-CNUS833US833&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjSioGN-vTgAhUzyYsBHYXDCHYQ_AUIDigB&biw=1920&bih=977 | 3d graph - Google 搜索
https://www.google.com/search?q=3d++graph&tbm=isch&tbs=rimg:CbW0AQj_1GF3xIjhposBrbgKebHOZi8qbmDVI5PFhKJGpNt-B7OVCu6CAeA-ea4FcV2BDnMxqz5ytKOn8b-hI30M44CoSCWmiwGtuAp5sEWS6tIQxpjnIKhIJc5mLypuYNUgRWgF4pgjuvHIqEgnk8WEokak23xHD8sfpNOg9DCoSCYHs5UK7oIB4EdijLtBPUb8CKhIJD55rgVxXYEMRIlBEZwtx-0YqEgmczGrPnK0o6RHxRKek8B2J8yoSCfxv6EjfQzjgEbmux2AKVLnB&tbo=u&sa=X&ved=2ahUKEwjX882h-vTgAhULwIsBHZAUCYEQ9C96BAgBEBg&biw=1920&bih=977&dpr=1 | 3d graph - Google 搜索
https://medium.com/neo4j/visualizing-graphs-in-3d-with-webgl-9adaaff6fe43 | Visualizing Graphs in 3D with WebGL – neo4j – Medium
https://github.com/vasturiano/3d-force-graph | GitHub - vasturiano/3d-force-graph: 3D force-directed graph component using ThreeJS/WebGL
https://www.google.com/imgres?imgurl=http%3A%2F%2F1fykyq3mdn5r21tpna3wkdyi-wpengine.netdna-ssl.com%2Fwp-content%2Fuploads%2F2016%2F07%2Fallenkey.gif&imgrefurl=https%3A%2F%2Feng.uber.com%2Ftech-stack-part-one%2F&docid=GheXs_TTov_aiM&tbnid=5PFhKJGpNt8jrM%3A&vet=10ahUKEwiqw9im-vTgAhVNOrwKHYdzAw4QMwhBKAMwAw..i&w=800&h=566&bih=977&biw=1920&q=3d%20%20graph&ved=0ahUKEwiqw9im-vTgAhVNOrwKHYdzAw4QMwhBKAMwAw&iact=mrc&uact=8 | Google 图片搜索 http://1fykyq3mdn5r21tpna3wkdyi-wpengine.netdna-ssl.com/wp-content/uploads/2016/07/allenkey.gif 的结果
https://www.projet-plume.org/fonctionnalites-principales/traitement-de-donnees?page=5 | traitement de données | PLUME
https://seenthis.net/tag/simulation | #simulation
https://www.youtube.com/watch?v=FjY3EPR369o | 3D Graph Visualization in Mayavi - YouTube
https://bl.ocks.org/vasturiano/02affe306ce445e423f992faeea13521 | 3D Force-Directed Graph (ThreeJS) - bl.ocks.org
https://www.google.com/imgres?imgurl=https%3A%2F%2Fexploreyourdata.files.wordpress.com%2F2013%2F06%2Fpic.jpg&imgrefurl=https%3A%2F%2Fexploreyourdata.wordpress.com%2F2013%2F06%2F28%2Fnew-plugin-for-gephi-layout-your-graphs-in-3d%2F&docid=7aG7vUIHxXPQaM&tbnid=woS50v1d-3F8eM%3A&vet=10ahUKEwiqw9im-vTgAhVNOrwKHYdzAw4QMwhIKAowCg..i&w=1025&h=775&bih=977&biw=1920&q=3d%20%20graph&ved=0ahUKEwiqw9im-vTgAhVNOrwKHYdzAw4QMwhIKAowCg&iact=mrc&uact=8 | Google 图片搜索 https://exploreyourdata.files.wordpress.com/2013/06/pic.jpg 的结果
http://www.vesnam.com/Rblog/viznets4/ | Network visualization – part 4: 3D networks | Fun with R
https://github.com/search?l=JavaScript&o=desc&q=3d+graph&s=stars&type=Repositories | Search · 3d graph · GitHub

http://techbrood.com/?q=threejs | 国内领先的H5动画特效,WebGL,WebVR,WebAR,WebXR作品分享平台 - 踏得网
http://wow.techbrood.com/fiddle/10419 | Three.js BufferGeometry 几何缓存绘画方法的使用实例 - 踏得网
http://wow.techbrood.com/fiddle/33995 | ThreeJS+GSAP彩虹蚕宝宝 - 踏得网
http://www.yanhuangxueyuan.com/three.js_course/copy.html | three.js三维模型复制、克隆_郭隆邦技术博客

http://mozdas.blogspot.com/ | THREE JS: Create sphere,torous,ellipsoid using parametric equtions
https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&ei=449_XLO9FeWTr7wPjeG62AQ&q=Float32Array+%E4%B8%8D%E5%AE%9A%E9%95%BF&oq=Float32Array+%E4%B8%8D%E5%AE%9A%E9%95%BF&gs_l=psy-ab.3...1072.6449..6592...16.0..0.204.1302.0j7j1......0....1..gws-wiz.......0i67j0j0i30j0i8i30j33i160.OXPZwALDIps | Float32Array 不定长 - Google 搜索
https://www.google.com/search?hl=zh-CN&as_q=threejs+%E7%A2%B0%E6%92%9E%E6%A3%80%E6%B5%8B&as_epq=&as_oq=&as_eq=&as_nlo=&as_nhi=&lr=&cr=&as_qdr=y&as_sitesearch=&as_occt=any&safe=images&as_filetype=&as_rights= | threejs 碰撞检测 - Google 搜索
https://blog.csdn.net/linolzhang/article/details/67119049 | Three.js进阶篇之6 - 碰撞检测 - 跟随技术的脚步-linolzhang的专栏 - CSDN博客
https://willbean.github.io/2017/07/10/three-js-crash-detection/ | 死鬼去哪里了！
https://www.zhihu.com/question/37760800 | (80 条消息)threejs中碰撞检测的原理是什么？ - 知乎
https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&biw=1920&bih=977&ei=j_KAXLbUBqqSr7wPv8iYoAE&q=threejs+%E5%90%8C%E4%B8%80%E4%B8%AA+mesh+%E4%B8%8D%E5%90%8C+group&oq=threejs+%E5%90%8C%E4%B8%80%E4%B8%AA+mesh+%E4%B8%8D%E5%90%8C+group&gs_l=psy-ab.3...68920.75975..76358...0.0..0.400.8603.0j1j27j5j1......0....1..gws-wiz.......0i10i67j0i10j0j0i10i19j0i10i30i19j33i160.zeE0Z9AAZOI | threejs 同一个 mesh 不同 group - Google 搜索
https://threejs.org/docs/#api/en/objects/Group | Group - three.js docs
https://blog.csdn.net/ithanmang/article/details/80965712 | 16 - three.js 笔记 - Group 组合对象 - 学无止境 - CSDN博客
https://blog.csdn.net/JaRiS_jade/article/details/82184671 | Three.js几何对象的组合 - jarisMA的博客 - CSDN博客
http://tool.oschina.net/commons?type=3 | RGB颜色对照表
https://threejs.org/docs/#api/en/core/Raycaster | Raycaster - three.js docs

https://blog.csdn.net/u013090676/article/details/77188088 | Three.js raycaster 填坑 - u013090676的博客 - CSDN博客
https://www.jianshu.com/p/708b00d86c7a | three.js raycaster射线碰撞的坑 - 简书
https://blog.csdn.net/weixin_41111068/article/details/81608903 | three.js Raycaster 射线拾取 canvas不占满整屏时射线拾取存在偏差 - 蜗牛速度额的博客 - CSDN博客
https://blog.csdn.net/weixin_41111068/article/details/81707239 | Three.js THREE.Raycaster 射线拾取详解 （解决射线无法射到object3,group里的children） - 蜗牛速度额的博客 - CSDN博客
https://segmentfault.com/a/1190000009858873 | Three.js Raycaster 射线 碰撞检测 - 个人文章 - SegmentFault 思否
https://www.twblogs.net/a/5c656610bd9eee06ee22da60/zh-cn | three.js利用射线Raycaster进行碰撞检测 - 台部落
https://stonema.github.io/2018/03/20/ThreeJS%E4%B8%AD%E7%9A%84Raycaster%E5%BA%94%E7%94%A8/ | ThreeJS中的Raycaster应用 | Youngs's Blog
https://segmentfault.com/a/1190000010490845 | ThreeJS中的点击与交互——Raycaster的用法 - moonx - SegmentFault 思否
http://www.cnblogs.com/lizhengjin/p/5914216.html | 拾取模型的原理及其在THREE.JS中的代码实现 - 我是小李,欢迎交流 - 博客园
https://blog.csdn.net/meegomeego/article/details/8686816 | OpenGL中各种坐标系的理解 - SpeedBoy007的专栏 - CSDN博客
https://blog.csdn.net/ruangong1203/article/details/60476621 | threejs对象拾取 - 目尽地平线 - CSDN博客
https://blog.csdn.net/u013090676/article/details/77188088 | Three.js raycaster 填坑 - u013090676的博客 - CSDN博客
https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&ei=4eR8XIG2A62zmAWB-JPACw&q=touchstart++clientX&oq=touchstart++clientX&gs_l=psy-ab.3..0l2j0i8i30j0i5i30l3.98384.104348..104886...0.0..0.154.1179.0j8......0....1..gws-wiz.......0i67j0i30._YbubsB8_QU | touchstart clientX - Google 搜索
https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events | 触摸事件 - Web API 接口参考 | MDN
https://developer.mozilla.org/en-US/docs/Web/API/Touch/clientX | Touch.clientX - Web APIs | MDN
https://www.zhihu.com/search?type=content&q=raycaster | raycaster - 搜索结果 - 知乎
https://www.zhihu.com/question/275617079/answer/381452082 | three.js鼠标拾取从而计算对应的三维坐标？ - 知乎
https://www.lunzi.online/modules/post.html#/detailPost?id=5a28f8d01be7d306c0eea13c | 文章
https://www.zhihu.com/question/37760800/answer/79095228 | threejs中碰撞检测的原理是什么？ - 知乎
https://blog.csdn.net/qq_30100043/article/details/79054862 | 58 Three.js 通过THREE.Raycaster给模型绑定点击事件 - 现在学习也不晚 - CSDN博客

https://blog.csdn.net/srk19960903/article/details/78734238 | 使用threejs实现辉光&大气层效果 - srk19960903的博客 - CSDN博客
https://blog.csdn.net/qq_35425276/article/details/79711233 | 3d之移动的星空 - 小小少年 - CSDN博客
https://juejin.im/entry/5721b79639b057006ac8b810 | 用 Canvas 编织璀璨星空图 - 前端 - 掘金

https://www.google.com/search?q=particle+threejs+line&rlz=1C1GCEU_zh-CNUS833US833&source=lnms&sa=X&ved=0ahUKEwiDy82LpM_gAhULE6YKHa7BBP8Q_AUICSgA&biw=1920&bih=977&dpr=1 | particle threejs line - Google 搜索
https://codepen.io/antishow/post/three-js-particles | THREE.js Particles by Matthew Chase on CodePen
https://codepen.io/seanseansean/pen/EaBZEY | Three Js Point Cloud Experiment
http://shiya.io/bounce-some-particles-with-three-js/ | Bounce Some Particles with three.js – Shiya's Blog
https://stemkoski.github.io/Three.js/
https://stackoverflow.com/questions/43762768/threejs-particle-system-with-dynamic-lines | javascript - Threejs particle system with dynamic lines - Stack Overflow
https://jsfiddle.net/awinhayden/387c3xa7/3/ | Edit fiddle - JSFiddle
https://stackoverflow.com/questions/43689188/threejs-particle-system-with-joining-lines-programming-logic/43700503#43700503 | javascript - Threejs Particle System with joining lines. Programming logic? - Stack Overflow
https://jsfiddle.net/awinhayden/387c3xa7/2/ | Edit fiddle - JSFiddle
https://codepen.io/jkiss/pen/OVEeqK | Particles Random Animation in Canvas
https://www.jotform.com/blog/20-exceptional-three-js-experiments-98740/
http://danni-three.blogspot.com/2013/09/threejs-particle-engine-iii-fire.html | Three.js How To Tutorial: Three.js - Particle Engine III (Fire and Sphere)
https://stackoverflow.com/questions/11250053/three-js-canvas-particles-dont-render-with-orthographiccamera | Three.js canvas particles don't render with OrthographicCamera - Stack Overflow
https://particulatejs.org/
https://stackoverflow.com/questions/11250053/three-js-canvas-particles-dont-render-with-orthographiccamera | Three.js canvas particles don't render with OrthographicCamera - Stack Overflow
https://stackoverflow.com/questions/43610075/how-to-create-lines-between-nearby-particles-in-threejs | javascript - How to create lines between nearby particles in ThreeJS? - Stack Overflow
https://awingit.github.io/particles/
https://www.google.com/search?q=%E6%95%B0%E6%8D%AE+%E5%9D%87%E5%8C%80+%E5%88%86%E5%B8%83+%E7%90%83%E9%9D%A2&rlz=1C1GCEU_zh-CNUS833US833&oq=%E6%95%B0%E6%8D%AE+%E5%9D%87%E5%8C%80+%E5%88%86%E5%B8%83+%E7%90%83%E9%9D%A2&aqs=chrome..69i57.8924j0j1&sourceid=chrome&ie=UTF-8 | 数据 均匀 分布 球面 - Google 搜索

https://threejs.org/docs/#api/en/objects/Sprite | Sprite - three.js docs
https://threejs.org/docs/#api/en/objects/Points | Points - three.js docs
https://threejs.org/docs/index.html#manual/en/introduction/How-to-update-things | How to update things - three.js docs
https://threejs.org/docs/index.html#api/en/core/BufferGeometry | BufferGeometry - three.js docs
https://threejs.org/docs/index.html#api/en/materials/PointsMaterial | PointsMaterial - three.js docs
https://threejs.org/docs/#api/en/objects/Line | Line - three.js docs
https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&ei=qZNqXNbqHI6Vr7wPtMqBsAI&q=LineSegments+Line+threejs&oq=LineSegments+Line+threejs&gs_l=psy-ab.3..33i160l2.2031.4613..4725...2.0..1.464.1942.0j6j2j0j1......0....1..gws-wiz.3Yn5myIUnjM | LineSegments Line threejs - Google 搜索
https://stackoverflow.com/questions/19221527/three-js-how-to-draw-a-discontinuous-line-using-buffergeometry# | javascript - Three.js - how to draw a discontinuous line using BufferGeometry? - Stack Overflow
https://threejs.org/docs/#api/en/core/BufferGeometry | BufferGeometry - three.js docs
https://www.google.com/search?lr=lang_zh-CN&hl=zh-CN&as_qdr=all&biw=1459&bih=837&tbs=lr%3Alang_1zh-CN&ei=kstrXMu_BsyBr7wPp-yOiAI&q=threejs+setDrawRange&oq=threejs+setDrawRange&gs_l=psy-ab.3..0.1815127.1815127..1815528...0.0..0.93.93.1......0....2j1..gws-wiz.JT3yu_sQzFo | threejs setDrawRange - Google 搜索
https://blog.csdn.net/u013270347/article/details/81117956 | Three.js学习笔记-Core(核心) - WebFrontEnd_TL - CSDN博客
https://www.google.com/search?q=threejs+setDrawRange&hl=zh-CN&as_qdr=all&tbas=0&source=lnt&sa=X&ved=0ahUKEwiskMqTycfgAhWBHKYKHUI3ABIQpwUIIg&biw=1920&bih=928 | threejs setDrawRange - Google 搜索
https://codepen.io/ahmetkilinc/pen/PmVgmX?editors=1010 | three.js drawing line using BufferGeometry
https://stackoverflow.com/questions/32921801/how-do-drawcalls-work-in-three-js | javascript - how do drawcalls work in three.js? - Stack Overflow
https://stackoverflow.com/questions/31399856/drawing-a-line-with-three-js-dynamically | javascript - Drawing a line with three.js dynamically - Stack Overflow
http://jsfiddle.net/1v00pxx5/ | Edit fiddle - JSFiddle
http://jsfiddle.net/w67tzfhx/ | Edit fiddle - JSFiddle
https://www.google.com/search?hl=zh-CN&as_q=gamma+webgl&as_epq=&as_oq=&as_eq=&as_nlo=&as_nhi=&lr=lang_zh-CN&cr=&as_qdr=all&as_sitesearch=&as_occt=any&safe=images&as_filetype=&as_rights= | gamma webgl - Google 搜索
https://threejs.org/docs/#api/en/core/Raycaster | Raycaster - three.js docs
https://threejs.org/docs/#api/en/materials/PointsMaterial | PointsMaterial - three.js docs
https://www.cnblogs.com/w-wanglei/p/6750967.html | 粒子和粒子系统 - heavi - 博客园
https://www.google.com/search?q=three+js+Raycaster&rlz=1C1GCEU_zh-CNUS833US833&ei=CgBtXMiqEM_i-AaWwqHYAw&start=10&sa=N&ved=0ahUKEwjI1_Ku48ngAhVPMd4KHRZhCDsQ8tMDCKsB&biw=1920&bih=977 | three js Raycaster - Google 搜索
https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&ei=mep0XNupEMOwmAXOoYHACA&q=threejs+transparent+%E6%97%A0%E6%95%88&oq=threejs+transparent+%E6%97%A0%E6%95%88&gs_l=psy-ab.3...5766.7230..7445...0.0..0.180.857.5j3......0....1..gws-wiz.......0i10j0j0i10i30j0i30j0i13i30j0i8i13i30j33i160.YupUQQatOtY | threejs transparent 无效 - Google 搜索
https://www.jianshu.com/p/45f1543a24e9 | THREE.JS blending与opacity冲突问题 - 简书
https://threejs.org/examples/webgl_materials_blending.html | three.js webgl - materials - blending

https://codepen.io/search/pens?q=Threejs%20Particle%20%20&page=1&order=popularity&depth=everything | CodePen Search
https://codepen.io/mathias-madsen-stav/pen/BKYdjx | Evry - Gravity Particles
https://codepen.io/subcreati0n/pen/vvpwdg | ThreeJS Particles
https://codepen.io/Fallenstedt/pen/LyGrKz | Threejs particle sphere ex
https://www.google.com/search?q=threejs+setDrawRange&hl=zh-CN&as_qdr=all&tbas=0&source=lnt&sa=X&ved=0ahUKEwi5gsS8387gAhWOGaYKHVv_CB8QpwUIIg&biw=1920&bih=937 | threejs setDrawRange - Google 搜索
https://threejs.org/docs/#api/en/core/BufferGeometry.drawRange | BufferGeometry#drawRange - three.js docs
https://www.google.com/search?q=BufferGeometry+indexed&rlz=1C1GCEU_zh-CNUS833US833&oq=BufferGeometry++indexed&aqs=chrome..69i57j69i60j0l4.1648j0j1&sourceid=chrome&ie=UTF-8 | BufferGeometry indexed - Google 搜索
https://threejs.org/docs/#api/en/core/BufferGeometry | BufferGeometry - three.js docs
https://threejs.org/examples/?q=sprite#webgl_sprites | three.js / examples
https://github.com/mrdoob/three.js/blob/master/examples/webgl_sprites.html | three.js/webgl_sprites.html at master · mrdoob/three.js · GitHub
https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&biw=1920&bih=937&ei=c6lvXKm0AYe5mAXdwbqICQ&q=threejs+%E7%B2%92%E5%AD%90+%E6%96%B9%E5%BD%A2+%E7%90%83%E5%BD%A2&oq=threejs+%E7%B2%92%E5%AD%90+%E6%96%B9%E5%BD%A2+%E7%90%83%E5%BD%A2&gs_l=psy-ab.3...52995.56397..56596...0.0..0.178.1998.6j12......0....1..gws-wiz.nFqpe-bz8vg | threejs 粒子 方形 球形 - Google 搜索
https://blog.csdn.net/qq_30100043/article/details/75000631 | 8 Three.js使用轨迹球插件（trackball）增加对模型的交互功能 - 现在学习也不晚 - CSDN博客
http://www.wjceo.com/blog/threejs/ | threejs | 暮志未晚-中文案例网
https://juejin.im/post/5ba06119e51d450e84779ece | 初识three.js，搭建three.js+vue.js项目 - 掘金
https://www.google.com/search?q=vertexColors&rlz=1C1GCEU_zh-CNUS833US833&oq=vertexColors&aqs=chrome..69i57j0l5.383j0j1&sourceid=chrome&ie=UTF-8 | vertexColors - Google 搜索
https://threejs.org/docs/#api/en/constants/Materials | Materials - three.js docs
https://threejs.org/examples/#webgl_geometry_colors | three.js / examples
https://blog.csdn.net/zhulx_sz/article/category/7233668 | 【 分类 】- threejs - zhulx_sz 的博客（为了家人，努力赚钱~） - CSDN博客
https://blog.csdn.net/zhulx_sz/article/details/79097878 | three.js 07-03 之 Sprite 用外部图片格式化粒子 - zhulx_sz 的博客 - CSDN博客
https://www.google.com/search?q=SpriteMaterial+canvas&rlz=1C1GCEU_zh-CNUS833US833&oq=SpriteMaterial+canvas&aqs=chrome..69i57.3072j0j1&sourceid=chrome&ie=UTF-8 | https://www.google.com/search?q=SpriteMaterial+canvas&rlz=1C1GCEU_zh-CNUS833US833&oq=SpriteMaterial+canvas&aqs=chrome..69i57.3072j0j1&sourceid=chrome&ie=UTF-8
https://stackoverflow.com/questions/14103986/canvas-and-spritematerial | javascript - Canvas and SpriteMaterial - Stack Overflow
http://jsfiddle.net/rgE2j/141/ | three.js ~ example ~ Mr.doob - JSFiddle

https://cloud.tencent.com/developer/article/1004960 | Three.js 粒子系统学习小记：礼花效果实现 - 云+社区 - 腾讯云
https://www.solutiondesign.com/blog/-/blogs/webgl-and-three-js-particles | blog - sdg
https://juejin.im/post/5b8d47cce51d4538bf55e3a8 | threejs+tweenjs实现3D粒子模型切换 - 掘金
http://up.qq.com/act/a20170301pre/index.html# | UP2017腾讯互动娱乐年度发布会 - 腾讯互动娱乐
https://segmentfault.com/a/1190000014688660 | three.js快速入门和实战 - wim-chan的博客 - SegmentFault 思否
https://www.jianshu.com/p/2e7495a5d0f3 | ThreeJs 基础入门 - 简书
https://blog.csdn.net/qq_30100043/article/details/81513026 | 14 Three.js 性能优化 - 现在学习也不晚 - CSDN博客
https://juejin.im/entry/59a3750ef265da24934b0c7f | Three.js 现学现卖 - 前端 - 掘金
https://blog.csdn.net/qq_30100043/article/details/78957057 | 52 Three.js里面的粒子 - 现在学习也不晚 - CSDN博客
http://www.wjceo.com/blog/threejs/ | threejs | 暮志未晚-中文案例网
https://juejin.im/post/5a1e7e7e51882503eb4b0a80 | 一起炫起来 -- 3D粒子动画篇 - 掘金
https://www.cnblogs.com/wanbo/p/6869175.html | three.js粒子效果（分别基于CPU&GPU实现） - cnwander - 博客园
https://stackoverrun.com/cn/q/7648973 | javascript - three.js中的可点击粒子PointCloud
https://blog.csdn.net/qq_30100043/article/details/79054862 | 58 Three.js 通过THREE.Raycaster给模型绑定点击事件 - 现在学习也不晚 - CSDN博客
http://www.wjceo.com/blog/threejs/2018-02-13/60.html | 58 Three.js 通过THREE.Raycaster给模型绑定点击事件 | 暮志未晚-中文案例网
https://segmentfault.com/a/1190000015862604 | Three.js 粒子系统动画与发光材质——利用HTML5画布绘制 - 个人文章 - SegmentFault 思否
https://www.google.com/search?q=three+js+%E6%B8%90%E5%8F%98&lr=&hl=zh-CN&tbs=qdr:y&ei=dD1hXLffBY-soASP-42YBQ&start=10&sa=N&ved=0ahUKEwi36dKfrLPgAhUPFogKHY99A1MQ8tMDCGs&biw=1920&bih=937 | three js 渐变 - Google 搜索
https://www.404forest.com/2018/10/12/massive-data-visualization-full-rendering-optimization/ | 万级节点可视化全量渲染优化探究 - 404Forest
https://cloud.tencent.com/developer/article/1175424 | WebGL ThreeJS学习总结三 - 云+社区 - 腾讯云
https://www.google.com/search?q=threejs++%E7%B2%92%E5%AD%90&rlz=1C1GCEU_zh-CNUS833US833&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjKsrTks7PgAhXJdt4KHS4rC6EQ_AUIDigB&biw=1920&bih=937 | threejs 粒子 - Google 搜索
https://blog.csdn.net/lin5165352/article/details/83856957 | three.js粒子过度效果制作(一) - X01式动力装甲的专栏 - CSDN博客
https://blog.csdn.net/lin5165352/article/details/83897238 | three.js粒子过度效果制作(二) - X01式动力装甲的专栏 - CSDN博客
https://blog.csdn.net/ithanmang/article/details/82344831 | 56 - three.js 笔记 - 通过 Tween.js 维护粒子位移 - 学无止境 - CSDN博客
https://codepen.io/acauamontiel/pen/mJdnw | Constellation
https://github.com/mrdoob/three.js/blob/master/examples/webgl_lines_fat.html | three.js/webgl_lines_fat.html at master · mrdoob/three.js · GitHub
https://github.com/mrdoob/three.js/blob/master/examples/webgl_points_dynamic.html | three.js/webgl_points_dynamic.html at master · mrdoob/three.js · GitHub
https://www.google.com/search?q=Tween.js&rlz=1C1GCEU_zh-CNUS833US833&oq=Tween.js&aqs=chrome..69i57j69i61l2j0l3.415j0j1&sourceid=chrome&ie=UTF-8 | Tween.js - Google 搜索
https://juejin.im/entry/5a4eeaecf265da3e3245494b | [翻译] tween.js 中文使用指南 - 前端 - 掘金
https://codepen.io/zhaoqize/pen/xpXKwN | hello,Tween.js
https://github.com/tweenjs/tween.js | GitHub - tweenjs/tween.js: Javascript tweening engine
https://www.wangxutech.com/ | 网旭科技-创造价值，追求卓越
https://www.google.com/search?biw=1920&bih=888&ei=tXxiXPjTAdT6wQOQkJjADg&q=threejs++%E7%BB%98%E5%88%B6%E7%B2%92%E5%AD%90&oq=threejs++%E7%BB%98%E5%88%B6%E7%B2%92%E5%AD%90&gs_l=psy-ab.3...7870454.7881673..7881800...12.0..0.169.2551.20j7......0....1..gws-wiz.......0i12j0i10j0j33i160j0i10i30i42.YmEXn_ot50I | threejs 绘制粒子 - Google 搜索
https://juejin.im/post/5b0ace63f265da0db479270a | Three.js粒子特效，shader渲染初探 - 掘金
https://www.jianshu.com/p/09f4c707e95c | 如何把一件事讲得言简意赅，语出惊人，少即是多 - 简书
https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&ei=Md5jXJClJoeC-QbXjIj4AQ&q=threejs++PointsMaterial&oq=threejs++PointsMaterial&gs_l=psy-ab.3..0i19j0i10i30i19l2.1507833.1508322..1508712...0.0..0.202.281.1j0j1......0....1j2..gws-wiz.......0i12j0i10j0.pPqUKAMJdN0 | threejs PointsMaterial - Google 搜索
https://stackoverrun.com/cn/q/11423534 | javascript - Three.js - 给粒子圆形
http://huolalaweb.com/2018/08/06/three-js%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/ | three.js性能优化 – 火辣辣
https://www.cnblogs.com/xulei1992/p/5714429.html | Three.js基础探寻四——立方体、平面与球体 - Redchar - 博客园

https://www.google.com/search?q=threejs+point+%E6%96%87%E5%AD%97&rlz=1C1GCEU_zh-CNUS833US833&oq=threejs+point+%E6%96%87%E5%AD%97&aqs=chrome..69i57.7221j0j1&sourceid=chrome&ie=UTF-8 | threejs point 文字 - Google 搜索
https://blog.csdn.net/qq563969790/article/details/76584976 | 关于three.js中添加文字的方式 - qq563969790的博客 - CSDN博客
https://www.google.com/search?q=particle+ball+threejs&rlz=1C1GCEU_zh-CNUS833US833&source=lnms&tbm=isch&sa=X&ved=0ahUKEwj-6vv7lsTgAhXME4gKHdOEA5AQ_AUIDigB&biw=1920&bih=937 | particle ball threejs - Google 搜索
https://www.google.com/search?tbm=isch&sa=1&ei=-blvXICHKoiHr7wP3cyomAM&q=particle++threejs&oq=particle++threejs&gs_l=img.3.1.0i8i30j0i10i24.1736698.1737209..1737456...0.0..0.132.132.0j1......0....1..gws-wiz-img.MA2618wPPc8 | particle threejs - Google 搜索
https://www.google.com/search?q=particle+ball+threejs&tbm=isch&tbs=rimg:Cb1tZqBWwjstIgi9bWagVsI7LSoSCb1tZqBWwjstEWv8na4uaqi-&tbo=u&ved=2ahUKEwjxtfSEnsTgAhXaAIgKHYwbCSoQiRx6BAgBEAo&ictx=1&uact=3 | particle ball threejs - Google 搜索
https://freshdesignweb.com/html5-css3-3d-examples-demo/ | 40+ Best HTML5 and CSS3 3D Demo Examples - freshDesignweb
https://www.google.com/search?q=particle+ball+threejs&tbm=isch&tbs=rimg:CcClIdodbUy1IgjApSHaHW1MtSoSCcClIdodbUy1ESLo2_1ewK6HI&tbo=u&ved=2ahUKEwjgwYOZl8TgAhVUMd4KHYYqCdcQiRx6BAgBEAo&ictx=1&uact=3#imgrc=_ | particle ball threejs - Google 搜索
https://qiita.com/yamagamirenya/items/638099c6017d0290cdeb | three.jsのサンプルを使って球を作ってみる(Lineとbuffergeometory) - Qiita
http://danni-three.blogspot.com/ | Three.js How To Tutorial
https://onextrapixel.com/20-codepen-solutions-for-awesome-mouse-effects/ | 20 Codepen Solutions for Awesome Mouse Effects
http://www.qianqian-ye.com/Everyday/Day06/ | Visual and Audio Experiment
https://threejs.org/docs/#api/en/math/Line3 | Line3 - three.js docs
https://www.google.com/search?q=threejs+point+random+sphere&rlz=1C1GCEU_zh-CNUS833US833&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiN2oWN38TgAhWPdt4KHVIHAGoQ_AUIDigB&biw=1920&bih=937 | threejs point random sphere - Google 搜索
https://stackoverflow.com/questions/25343527/how-can-i-make-a-three-js-sprite-face-towards-a-specific-vector | canvas - How can I make a three.js sprite face towards a specific vector? - Stack Overflow
https://stackoverflow.com/questions/11039113/three-js-putting-smaller-objects-on-random-positions-of-a-larger-sphere | Three.js: Putting smaller objects on random positions of a larger sphere - Stack Overflow
https://stackoverflow.com/questions/5531827/random-point-on-a-given-sphere | javascript - Random Point on a given Sphere - Stack Overflow
https://www.google.com/search?rlz=1C1GCEU_zh-CNUS833US833&biw=1920&bih=888&ei=WhlqXJfOB4eBoASc4Y6oBg&q=three.js+multiplyScalar&oq=three.js+multiplyScalar&gs_l=psy-ab.3..0i19.23319880.23319880..23320646...0.0..0.412.412.4-1......0....2j1..gws-wiz.t-G2cGYeR0Y | three.js multiplyScalar - Google 搜索
https://stackoverflow.com/questions/27486949/three-js-change-vector-length-by-absolute-value | three.js - THREE JS change vector length by absolute value - Stack Overflow
https://www.google.com/search?q=BufferGeometry+position&rlz=1C1GCEU_zh-CNUS833US833&oq=BufferGeometry+position&aqs=chrome..69i57j0l2.3047j0j1&sourceid=chrome&ie=UTF-8 | BufferGeometry position - Google 搜索
https://threejs.org/docs/#api/en/core/BufferGeometry | BufferGeometry - three.js docs
https://my.oschina.net/zhubaoxin/blog/843371 | BufferGeometry(立体正方形案例，由三角形片组成) - zbx的个人空间 - 开源中国
https://discourse.threejs.org/t/updating-index-position-uv-attributes-of-a-buffergeometry/1342 | Updating index, position , uv attributes of a BufferGeometry - Questions - three.js Discourse

http://darrendev.blogspot.com/2016/03/gradients-in-threejs.html | Darren's Developer Diary: Gradients in Three.JS
https://www.google.com/search?hl=zh-CN&as_qdr=all&biw=1920&bih=977&ei=LT5yXPWSNK2kmAWrpr7oBw&q=threejs++%E9%9A%8F%E6%9C%BA+&oq=threejs++%E9%9A%8F%E6%9C%BA+&gs_l=psy-ab.3...3811.763921..764209...0.0..1.801.3391.0j4j0j5j6-1......0....1..gws-wiz.......0i10j0i12j0i10i67j0j33i160.PY3k65UH5j0 | threejs 随机 - Google 搜索
https://code.i-harness.com/zh-CN/q/1e0d4f9 | javascript 如何用three.js中的随机粒子制作一个球体 - CODE Q&A Solved
https://blog.csdn.net/qq_30100043/article/details/79559620 | 63 Three.js 将多个网格合并成一个网格 - 现在学习也不晚 - CSDN博客
https://www.google.com/search?q=three+js+gradual&rlz=1C1GCEU_zh-CNUS833US833&source=lnms&sa=X&ved=0ahUKEwjcxZqWtdPgAhVlyIsBHbBjAT4Q_AUICSgA&biw=1920&bih=937&dpr=1 | three js gradual - Google 搜索
https://discourse.threejs.org/t/rendering-a-gradient-material-using-threejs-and-glsl/602 | Rendering a gradient material using threejs and GLSL - Questions - three.js Discourse
https://gist.github.com/sinclairtarget/e78a92f86ef0eeb13cb1 | Simple Gradient Shader · GitHub
https://stackoverflow.com/questions/45092071/implementing-a-gradient-shader-in-three-js | graphics - Implementing a gradient shader in three.js - Stack Overflow
https://threejs.org/docs/#api/en/materials/ShaderMaterial | ShaderMaterial - three.js docs
http://techbrood.com/threejs/docs/#%E5%8F%82%E8%80%83%E6%89%8B%E5%86%8C/%E6%9D%90%E6%96%99(Materials)/%E7%9D%80%E8%89%B2%E5%99%A8%E6%9D%90%E6%96%99(ShaderMaterial) | Three.js - 在线中文文档 - 参考手册 - 着色器材料(ShaderMaterial)
https://blog.csdn.net/zhulx_sz/article/details/78750357 | three.js 04-08 之 ShaderMaterial 材质 - zhulx_sz 的博客 - CSDN博客
http://glslsandbox.com/ | GLSL Sandbox Gallery
https://blog.csdn.net/qq_35158695/article/details/83304281 | threejs 第二十用 shaderMaterial - qq_35158695的博客 - CSDN博客
https://zhuanlan.zhihu.com/p/26895960 | 写一些运行在GPU的代码「ShaderMaterial」 - 知乎
https://blog.csdn.net/u010816223/article/details/24810125 | three.js学习 函数使用方法散记2 - u010816223的专栏 - CSDN博客
https://www.jianshu.com/p/4f3f4eec1478 | Threejs写的渐变发亮半球 - 简书
https://discourse.threejs.org/t/draw-a-line-with-a-simple-single-colour-fading-gradient/1775/2 | Draw a Line with a simple single colour fading gradient - Questions - three.js Discourse
https://codepen.io/tr13ze/pen/pbjWwg | ThreeJS Gradient
http://joanclaret.github.io/html5-canvas-animation/ | Html5-canvas-animation by JoanClaret
https://www.google.com/search?q=ShaderMaterial&rlz=1C1GCEU_zh-CNUS833US833&oq=ShaderMaterial&aqs=chrome..69i57j69i60l2j69i61j69i59l2.495j0j1&sourceid=chrome&ie=UTF-8 | ShaderMaterial - Google 搜索

http://es6.ruanyifeng.com/?search=Reflect&x=0&y=0#docs/reflect | es6.ruanyifeng.com/?search=Reflect&x=0&y=0#docs/reflect
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy | Proxy | MDN
https://www.google.com.hk/search?q=es6+reflect&rlz=1C1CHBD_zh-CNJP772US772&oq=es6+reflect&aqs=chrome..69i57j0l5.4366j0j1&sourceid=chrome&ie=UTF-8 | es6 reflect - Google 搜索
https://zhuanlan.zhihu.com/p/24778807 | ES6 Reflect - 知乎
https://segmentfault.com/a/1190000003798438 | JavaScript 原型系统的变迁，以及 ES6 class - David Chen 的编程大杂烩 - SegmentFault 思否
https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/up%20&%20going/README.md#you-dont-know-js-up--going | You-Dont-Know-JS/README.md at 1ed-zh-CN · getify/You-Dont-Know-JS · GitHub
https://brucewar.gitbooks.io/svg-tutorial/33.SVG%E5%8F%98%E6%8D%A2.html | 33.SVG变换 · SVG教程（中文翻译版）
https://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/ | 理解CSS3 transform中的Matrix(矩阵) « 张鑫旭-鑫空间-鑫生活
https://juejin.im/post/5a40564e6fb9a0450909bb21 | 一起来聊聊table组件的固定列 - 掘金
https://juejin.im/entry/592190de44d904006cca7b0c | You Don't Know JS 中文电子书 - 前端 - 掘金
https://jingsam.github.io/2017/03/08/vnode-deep-clone.html | Vue之slot深度复制 - jingsam
https://jsfiddle.net/rayrutjes/gqadsra4/4/ | Vue recursive scoped slots - JSFiddle
https://my.oschina.net/dkvirus/blog/1626570 | dva 中使用 axios 统一拦截错误示例 - dkvirus的个人空间 - 开源中国
https://www.processon.com/diagraming/5c22f269e4b0535f20c948c7
https://hijiangtao.github.io/2017/08/03/How-to-Manipulate-DOM-Effectively/ | 如何监听页面 DOM 变动并高效响应 - Joe’s Blog
http://javascript.ruanyifeng.com/dom/mutationobserver.html | javascript.ruanyifeng.com/dom/mutationobserver.html

https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer | DataTransfer | MDN
https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations | Drag Operations | MDN
https://www.jianshu.com/p/a45b4448f443 | vue实现dom元素拖动布局 - 简书
https://segmentfault.com/q/1010000007237240 | javascript - vue的拖动是什么思路呢 - SegmentFault 思否
https://github.com/OneWayTech/vue2-drag-and-drop-demo | GitHub - OneWayTech/vue2-drag-and-drop-demo: Drag and drop demo for Vue.js 2.x
https://github.com/SortableJS/Vue.Draggable | GitHub - SortableJS/Vue.Draggable: Vue component allowing drag-and-drop sorting in sync with View-Model. Based on Sortable.js
https://david-desmaisons.github.io/draggable-example/ | draggable-example
https://github.com/SortableJS/Sortable/blob/master/Sortable.js | Sortable/Sortable.js at master · SortableJS/Sortable · GitHub
http://sortablejs.github.io/Sortable/ | Sortable. No jQuery.
https://github.com/SortableJS/Vue.Draggable | GitHub - SortableJS/Vue.Draggable: Vue component allowing drag-and-drop sorting in sync with View-Model. Based on Sortable.js
https://david-desmaisons.github.io/draggable-example/ | draggable-example
https://www.google.com/search?q=vue+key&rlz=1C1CHBD_zh-CNJP772US772&oq=vue+key&aqs=chrome..69i57j0l5.3158j0j1&sourceid=chrome&ie=UTF-8 | vue key - Google 搜索
https://calendar.perfplanet.com/2013/diff/ | Performance Calendar » React’s diff algorithm
https://github.com/livoras/blog/issues/13 | 深度剖析：如何实现一个 Virtual DOM 算法 · Issue #13 · livoras/blog · GitHub

https://developers.google.com/web/fundamentals/web-components/ | Building Components  |  Web Fundamentals  |  Google Developers
https://www.google.com/search?rlz=1C1CHBD_zh-CNJP772US772&ei=REQgXJBdyP_AA56KmbAK&q=web+components+%E5%87%89%E5%87%89&oq=web+components+%E5%87%89%E5%87%89&gs_l=psy-ab.3...683281.691172..691306...2.0..1.197.3204.16j13....2..0....1..gws-wiz.......0j0i67j0i131j0i131i67j0i10i67j0i10j0i12j0i12i10j0i30j0i10i30j0i19j0i30i19j0i8i30i19j33i160.4vcLY-auMrM | web components 凉凉 - Google 搜索
http://taobaofed.org/blog/2018/10/31/a-tag/ | Atag - Web Components 最佳实践 | Taobao FED | 淘宝前端团队
https://github.com/alibaba/rax/tree/master/packages/atag | rax/packages/atag at master · alibaba/rax
https://www.cnblogs.com/yexiaochai/p/4167554.html | 【shadow dom入UI】web components思想如何应用于实际项目 - 叶小钗 - 博客园
http://news.51cto.com/art/201810/585197.htm | 腾讯开源框架 Omi 更新，全面拥抱 Web Components - 51CTO.COM
https://www.zhangxinxu.com/wordpress/2018/03/htmlunknownelement-html5-custom-elements/ | HTMLUnknownElement与HTML5自定义元素的故事 « 张鑫旭-鑫空间-鑫生活
https://www.google.com/search?q=Omi&rlz=1C1CHBD_zh-CNJP772US772&oq=Omi&aqs=chrome..69i57j69i61.399j0j1&sourceid=chrome&ie=UTF-8 | Omi - Google 搜索
https://github.com/Tencent/omi/blob/master/README.CN.md | omi/README.CN.md at master · Tencent/omi
https://juejin.im/entry/5799e5cdc4c971005ab8a2ee | 神秘的 shadow-dom 浅析 - 前端 - 掘金
https://www.google.com/search?rlz=1C1CHBD_zh-CNJP772US772&ei=TkYgXIyJA5nv-QbOz6bwDg&q=firefox+shadow+dom&oq=firefox+shadow+dom&gs_l=psy-ab.3..0i7i30l10.175.175..383...0.0..0.80.80.1......0....1..gws-wiz.y7SguyOOVBg | firefox shadow dom - Google 搜索
https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM | Using shadow DOM | MDN

https://zhuanlan.zhihu.com/p/29207391 | Headless Chrome 入门
https://www.google.com.hk/search?safe=strict&ei=gTp6W_zrGKmP0gKFk4KoDw&q=puppeteer+%E9%A1%B5%E9%9D%A2%E8%B7%B3%E8%BD%AC&oq=puppeteer+%E9%A1%B5%E9%9D%A2%E8%B7%B3%E8%BD%AC&gs_l=psy-ab.3..0.13017126.13026171.0.13026365.39.24.12.0.0.0.393.2709.7j5j1j3.16.0..2..0...1.1j4.64.psy-ab..12.20.1666...0i67k1j0i12k1j0i30k1j0i12i10i30k1j0i12i5i10i30k1j0i8i30k1j33i160k1.0.aBJFtMKZlUs | puppeteer 页面跳转 - Google 搜索
https://www.cnblogs.com/Johnzhang/p/9010585.html | 基于puppeteer模拟登录抓取页面 - JerremyZhang - 博客园
https://www.cnblogs.com/dolphinX/p/7715268.html | Puppeteer: 更友好的 Headless Chrome Node API - 谦行 - 博客园
https://try-puppeteer.appspot.com/ | Try Puppeteer
https://github.com/Samaritan89/headless-crawler/blob/master/src/mn.js | headless-crawler/mn.js at master · Samaritan89/headless-crawler · GitHub
https://github.com/GoogleChrome/puppeteer | GitHub - GoogleChrome/puppeteer: Headless Chrome Node API
https://github.com/GoogleChrome/puppeteer/blob/v1.7.0/docs/api.md#class-elementhandle | puppeteer/api.md at v1.7.0 · GoogleChrome/puppeteer · GitHub
https://github.com/GoogleChrome/puppeteer/tree/master/examples/ | puppeteer/examples at master · GoogleChrome/puppeteer · GitHub
https://github.com/GoogleChromeLabs/puppeteer-examples | GitHub - GoogleChromeLabs/puppeteer-examples: Use case-driven examples for using Puppeteer and headless chrome
http://zxc0328.github.io/2017/08/03/headlesschrome/ | Headless Chrome截图服务实战 | Zindex's blog
https://developer.mozilla.org/zh-CN/docs/Web/API/Window/location | window.location - Web API 接口 | MDN

https://www.zhihu.com/question/41026400/answer/118726253 | 开源HTML5拓扑图绘制工具？ - 知乎
http://www.jtopo.com/demo/container.html | jTopo Demo
http://doc.qunee.com/pages/viewpage.action?pageId=1146979 | 图元管理 - Qunee for HTML5 - 中文 - Qunee Online Document System
http://demo.qunee.com/#Group%20Demo | Qunee for HTML5 - online Demos
http://ocanvas.org/docs/Core | Documentation - oCanvas - Object-based canvas drawing
http://ocanvas.org/demos/2 | Demos - oCanvas - Object-based canvas drawing
https://github.com/koggdal/ocanvas | GitHub - koggdal/ocanvas: JavaScript library for object-based canvas drawing.
https://github.com/phobal/ivideo?utm_source=gold_browser_extension | GitHub - phobal/ivideo: 一个可以观看国内主流视频平台所有视频的客户端（Mac、Windows、Linux） A client that can watch video of domestic(China) mainstream video platform
https://github.com/hongru/Canvas-Tattle/issues/6 | 【Canvas杂谈：第一季】我在上面画了一个圈，你能帮我长出事件么？ · Issue #6 · hongru/Canvas-Tattle · GitHub
https://www.google.com/search?lr=&hl=zh-CN&q=canvas%E7%B1%BB%E5%BA%93&sa=X&ved=0ahUKEwjkwen_0MvcAhUK-lQKHd30CVAQ1QIIngEoBA&biw=1920&bih=943 | canvas类库 - Google 搜索
https://www.html5canvastutorials.com/ | HTML5 Canvas Tutorials
https://zhuanlan.zhihu.com/p/39886896 | 将你的 Virtual dom 渲染成 Canvas
https://zhuanlan.zhihu.com/p/40572203 | 使用Canvas给DOM元素添加粒子效果
https://codepen.io/airen/pen/QBgzyN?editors=0010 | DOM to Canvas #4
https://css-tricks.com/adding-particle-effects-to-dom-elements-with-canvas/ | Adding Particle Effects to DOM Elements with Canvas | CSS-Tricks
https://github.com/ZachSaucier/Disintegrate | GitHub - ZachSaucier/Disintegrate: A small JS library to break DOM elements into animated Canvas particles.
https://zachsaucier.github.io/Disintegrate/disintegrate-draggable.html | Draggable demo - Disintegrate
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations | Transformations - Web APIs | MDN
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas | Pixel manipulation with canvas - Web APIs | MDN
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Hit_regions_and_accessibility | Hit regions and accessibility - Web APIs | MDN
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas | Optimizing canvas - Web APIs | MDN
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Finale | Finale - Web APIs | MDN
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D | CanvasRenderingContext2D - Web APIs | MDN
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage | CanvasRenderingContext2D.drawImage() - Web APIs | MDN
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData | CanvasRenderingContext2D.getImageData() - Web APIs | MDN
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData | CanvasRenderingContext2D.putImageData() - Web APIs | MDN
https://www.ctolib.com/pshihn-rough.html | Rough.js:一个轻量级的，可以生成类似手绘效果的Canvas图形库 - JavaScript开发社区 | CTOLib码库
http://www.html-js.com/article/Qunee-graphic-components-topology-map-editor-1 | 拓扑图编辑器（1） - Qunee图形组件 - 前端乱炖
http://www.cnblogs.com/penghuwan/p/7492814.html | 【javascript】谈谈HTML5: Web-Worker、canvas、indexedDB、拖拽事件 - 外婆的彭湖湾 - 博客园
https://vimcaw.github.io/blog/2018/02/10/%E7%94%A8Canvas%E5%AE%9E%E7%8E%B0%E5%9B%BE%E5%B1%82/ | 用Canvas实现图层 - vimcaw的个人博客
https://www.google.com.tw/search?rlz=1C1CHBD_zh-CNJP772US772&biw=1920&bih=943&ei=LGlpW8iiJNHp-QarqKagAg&q=canvas+%E6%BB%9A%E8%BD%AE&oq=canvas+%E6%BB%9A%E8%BD%AE&gs_l=psy-ab.3..0l2.1973479.1976325.0.1976502.12.11.0.0.0.0.626.1876.0j1j1j1j0j2.5.0....0...1c.1j4.64.psy-ab..8.4.1343...0i67k1j0i131k1j0i12k1.0.glzbX5oWCBg | canvas 滚轮 - Google 搜索
https://segmentfault.com/q/1010000008675028 | 如何使用canvas实现图片的放大缩小？ - SegmentFault 思否
https://huangbuyi.github.io/Baidu-IFE-2017/automotive-matting/ | Document
https://www.cnblogs.com/tugenhua0707/p/7362207.html | 学习 JS滚轮事件(mousewheel/DOMMouseScroll) - 龙恩0707 - 博客园
https://developer.mozilla.org/zh-CN/docs/Web/Events/wheel | 滚轮事件 - 事件类型一览表 | MDN
https://blog.csdn.net/clh604/article/details/8559887 | html5鼠标滚轮事件mousewheel使用 - CSDN博客
https://www.google.co.jp/search?hl=zh-CN&as_q=chrome+%E9%BC%A0%E6%A0%87+%E6%BB%9A%E8%BD%AE+%E4%BA%8B%E4%BB%B6&as_epq=&as_oq=&as_eq=&as_nlo=&as_nhi=&lr=&cr=&as_qdr=y&as_sitesearch=&as_occt=any&safe=images&as_filetype=&as_rights= | chrome 鼠标 滚轮 事件 - Google 搜索
https://developer.mozilla.org/en-US/docs/Web/Events/wheel | wheel - Event reference | MDN
https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent | WheelEvent - Web APIs | MDN

https://juejin.im/entry/5a45e8a96fb9a04511717324 | 用Vue.js递归组件构建一个可折叠的树形菜单 - 前端 - 掘金
https://www.google.co.jp/search?q=__webpack_hmr&rlz=1C1CHBD_zh-CNJP772US772&oq=__webpack_hmr&aqs=chrome..69i57.399j0j1&sourceid=chrome&ie=UTF-8 | __webpack_hmr - Google 搜索
http://louiszhai.github.io/2017/04/19/hmr/#Frame | webpack与browser-sync热更新原理深度讲解 | louis blog
https://github.com/abbshr/abbshr.github.io/issues/22 | 学习WebSocket协议—从顶层到底层的实现原理（修订版） · Issue #22 · abbshr/abbshr.github.io · GitHub
https://segmentfault.com/a/1190000005614604?utm_source=tuicool&utm_medium=referral | 手把手深入理解 webpack dev middleware 原理與相關 plugins - andyyou 程序猿生活 - SegmentFault 思否
https://www.google.co.jp/search?rlz=1C1CHBD_zh-CNJP772US772&ei=-qNOW6uXI4Ti-Aan0LWgCw&q=%E4%BC%A0%E8%BE%93+frame+stream&oq=%E4%BC%A0%E8%BE%93+frame+stream&gs_l=psy-ab.3..33i160k1l2.497914.502353.0.502732.22.21.0.0.0.0.216.2291.6j13j1.20.0....0...1c.1j4.64.psy-ab..2.15.1693...0j0i131k1j0i67k1j0i131i67k1j0i12k1.0.1yCsKYZ2FAE | 传输 frame stream - Google 搜索
https://www.kancloud.cn/digest/web-performance-http2/74825 | 多路复用 · Web性能优化与HTTP/2 · 看云
https://www.cnblogs.com/saryli/p/4237245.html | 用HTTP协议传输媒体文件 学习 - 清明-心若淡定 - 博客园
https://zhuanlan.zhihu.com/p/27961684 | 深入了解 gRPC：协议

https://zhuanlan.zhihu.com/p/29433875 | 性能优化之组件懒加载: Vue Lazy Component 介绍
https://nicholaslee119.github.io/2017/10/04/Chrome-Devtool-Performance%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97/ | 全新Chrome Devtool Performance使用指南 | Nic's Utopia
https://segmentfault.com/a/1190000002789768 | js简单的设置快捷键，hotkeys捕获键盘键和组合键的输入 - 小弟调调 - SegmentFault 思否
https://juejin.im/post/5ad71f39f265da239f07e862 | 你应该知道的requestIdleCallback - 掘金
https://div.io/topic/1370 | 【译】使用requestIdleCallback - Div.IO
https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment
https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createDocumentFragment
https://developers.google.com/speed/docs/insights/browser-reflow?csw=1
https://juejin.im/post/590f4eadac502e006cf718c3 | DocumentFragment 的优化小知识 - 掘金
http://www.cnblogs.com/springfield/archive/2010/06/27/1765589.html | JavaScript Tips - 使用DocumentFragment加快DOM渲染速度 - Springfield - 博客园
https://www.zhihu.com/question/27260165 | DocumentFragment真的能提高 JS 动态添加 DOM 的性能吗？ - 知乎

http://wiki.fenqile.com/pages/viewpage.action?pageId=30392428 | 鹰眼系统多工程同时本地开发配置优化 - 风控研发部-平台研发中心 - 乐信知识库
https://www.cnblogs.com/wangmeijian/p/4163936.html | 5种方式将数字转成千分位 - wangmeijian - 博客园
http://deerchao.net/tutorials/regex/regex.htm#backreference | 正则表达式30分钟入门教程
https://my.oschina.net/bigyuan/blog/49589 | 正则表达式中单词的匹配注意 ^$ 与 \b - 世上只有想不通的人，没有走不通的路。 - 开源中国
https://www.zhihu.com/question/46315785 | JavaScript 的正则表达式中的 \b 以及 \B 问题？ - 知乎
https://www.google.co.jp/search?lr=lang_zh-CN&hl=zh-CN&as_qdr=all&biw=1920&bih=944&tbs=lr%3Alang_1zh-CN&ei=9mAwW5fQKMmM8wWImoGIDg&q=%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F+%5Cb+%E9%80%80%E6%A0%BC%E7%AC%A6&oq=%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F+%5Cb+%E9%80%80%E6%A0%BC%E7%AC%A6&gs_l=psy-ab.3...138205.155930.0.156050.57.44.12.0.0.0.471.4504.10j16j4j0j1.31.0....0...1.1j4.64.psy-ab..15.27.3282...0j0i67k1j0i12k1j0i10k1.0.Nkcv0mkaKF8 | 正则表达式 \b 退格符 - Google 搜索
https://segmentfault.com/a/1190000013084624 | 正则表达式中[\b]和\b和\B的区别及匹配分析思路 - 我的笔记 - SegmentFault 思否
https://stackoverflow.com/questions/34292024/regular-expression-vs-vs-none/34292146 | regex - Regular Expression: +$ VS *$ VS none - Stack Overflow
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions | 正则表达式 - JavaScript | MDN
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec | RegExp.prototype.exec() - JavaScript | MDN
https://ant.design/components/slider-cn/ | 滑动输入条 Slider - Ant Design
http://www.iteye.com/news/23619 | 11款JavaScript颜色拾取插件推荐 - Web前端 - ITeye资讯
http://jscolor.com/examples/ | Examples - jscolor Color Picker

https://stackoverflow.com/questions/43270159/vuejs-2-how-to-watch-store-values-from-vuex | vue.js - vuejs 2 how to watch store values from vuex - Stack Overflow
https://juejin.im/post/5923a3bf2f301e006b272bed | vuex中的state在组件中如何监听？ - 掘金
http://www.alloyteam.com/2017/07/12918/ | 用jsx写vue组件 | AlloyTeam
https://alligator.io/vuejs/jsx-render-functions/ | Writing Vue.js Render Functions in JSX ← Alligator.io
https://zhuanlan.zhihu.com/p/25623356 | Vue.js 实用技巧（二）
http://www.ptbird.cn/vue-echarts-base-props-to-rechart.html | Vue中使用Echarts出现子组件无法根据props进行绘图更新问题 - Postbird - 招猫逗狗的开发者

https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace_in_the_DOM | Whitespace in the DOM - Web APIs | MDN
http://joji.me/zh-cn/blog/performance-issue-of-using-massive-transferable-objects-in-web-worker | Web Worker传输大量Transferable对象时的性能问题
http://joji.me/zh-cn/blog/processing-huge-files-using-filereader-readasarraybuffer-in-web-browser | 使用FileReader.readAsArrayBuffer()在浏览器中处理大文件
http://www.cnblogs.com/zichi/p/4954328.html | Web Worker 是什么鬼？ - 韩子迟 - 博客园
http://www.alloyteam.com/2015/11/deep-in-web-worker/#prettyPhoto | 【转向Javascript系列】深入理解Web Worker | AlloyTeam
https://developer.mozilla.org/zh-CN/docs/Web/API/Worker | Worker - Web API 接口 | MDN
https://afshinm.github.io/50k/ | 50K Array, HTML5 Web Worker Demo
https://github.com/mdn/simple-web-worker/blob/gh-pages/main.js | simple-web-worker/main.js at gh-pages · mdn/simple-web-worker · GitHub
http://mdn.github.io/simple-web-worker/ | Web Workers basic example
https://www.google.com/search?rlz=1C1CHBD_zh-CNJP772US772&ei=XrwMW8KvHoP48gWTyIewDg&q=web+worker+file&oq=web+worker+file&gs_l=psy-ab.3..0l3j0i22i30k1l7.769654.774894.0.775176.17.15.1.1.1.0.610.1823.0j2j2j1j0j1.6.0....0...1c.1j4.64.psy-ab..9.8.1835...0i67k1j0i131k1j0i131i67k1j0i10i67k1.0.U70kHB-3hdA | web worker file - Google 搜索
https://www.html5rocks.com/en/tutorials/file/filesystem-sync/ | The Synchronous FileSystem API for Workers - HTML5 Rocks
https://stackoverflow.com/questions/5408406/web-workers-without-a-separate-javascript-file?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa | Web workers without a separate Javascript file? - Stack Overflow
https://www.google.com.hk/search?newwindow=1&safe=strict&rlz=1C1CHBD_zh-CNJP772US772&ei=rMQMW-LfK8rd8QWIk6RI&q=vue+%E4%BD%BF%E7%94%A8+worker&oq=vue+%E4%BD%BF%E7%94%A8+worker&gs_l=psy-ab.3...5058.6636.0.6974.4.4.0.0.0.0.84.306.4.4.0....0...1c.1j4.64.psy-ab..0.0.0....0.RQ7AO9l8SbI | vue 使用 worker - Google 搜索
https://www.tangshuang.net/3657.html | vue-worker：在vue中方便使用web worker_唐霜的博客
https://codeday.me/news/20170622/24667.html | 使用webworkers的Vue插件 – vue-worker - 代码日志
https://www.oschina.net/translate/sing-webworkers-for-safe-concurrent-javascript?lang=chs&page=2# | 使用让 JavaScript 安全且并发的 Web Workers - 技术翻译 - 开源中国社区
https://juejin.im/post/5acf348151882579ef4f5a77 | 怎么在 ES6+Webpack 下使用 Web Worker - 掘金
https://blog.noteawesome.com/2017/04/23/web-worker%E5%AE%9E%E8%B7%B5/ | web worker实践 | 哎呀标题迷路了
https://github.com/kaola-fed/blog/issues/100 | 浅谈HTML5 Web Worker · Issue #100 · kaola-fed/blog · GitHub
https://oychao.github.io/2018/04/02/else/15_web_worker_practice/ | Web Worker的一些实践 | 传不习乎

https://www.google.com/search?rlz=1C1CHBD_zh-CNJP772US772&ei=ll0PW42SIMLO0gTIxryABQ&q=worker%E7%BC%96%E7%A8%8B%E6%A8%A1%E5%9E%8B&oq=worker%E7%BC%96%E7%A8%8B%E6%A8%A1%E5%9E%8B&gs_l=psy-ab.3...1972211.1976585.0.1976715.19.17.0.0.0.0.195.1569.1j11.12.0....0...1c.1j4.64.psy-ab..7.7.811...0j0i67k1j0i131k1j0i10k1.0.ts_Nfsrd_To | worker编程模型 - Google 搜索
https://developer.mozilla.org/en-US/docs/Web/API/Transferable | Transferable - Web APIs | MDN
https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap | ImageBitmap - Web APIs | MDN
https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap | self.createImageBitmap() - Web APIs | MDN
https://developer.mozilla.org/en-US/docs/Web/API/MessagePort | MessagePort - Web APIs | MDN
https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API | Channel Messaging API - Web APIs | MDN
https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel/port1 | MessageChannel.port1 - Web APIs | MDN
https://developer.mozilla.org/en-US/docs/Web/API/MessagePort | MessagePort - Web APIs | MDN
https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap | ImageBitmap - Web APIs | MDN
https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage | Worker.postMessage() - Web APIs | MDN
https://github.com/mdn/simple-web-worker/blob/gh-pages/main.js | simple-web-worker/main.js at gh-pages · mdn/simple-web-worker · GitHub
https://stackoverflow.com/questions/16071211/using-transferable-objects-from-a-web-worker?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa | javascript - Using transferable objects from a Web Worker - Stack Overflow
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer | ArrayBuffer - JavaScript | MDN
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView | DataView - JavaScript | MDN
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray | TypedArray - JavaScript | MDN

https://egoist.moe/2017/09/21/vue-jsx-full-guide/ | Vue JSX 使用指南
https://github.com/vuejs/babel-preset-vue | GitHub - vuejs/babel-preset-vue: Babel preset for transforming Vue JSX.
https://github.com/nickmessing/babel-plugin-jsx-v-model | GitHub - nickmessing/babel-plugin-jsx-v-model: JSX Syntactic Sugar Plugin for v-model
https://github.com/nickmessing/babel-plugin-jsx-event-modifiers | GitHub - nickmessing/babel-plugin-jsx-event-modifiers: Event modifiers syntactic sugar for JSX
https://github.com/vuejs/babel-plugin-transform-vue-jsx#difference-from-react-jsx | GitHub - vuejs/babel-plugin-transform-vue-jsx: babel plugin for vue 2.0 jsx
https://jsx.egoist.moe/gist/8a264502933118ee7afe811139bb52f6 | JSX Live Editor
https://reactjs.org/docs/introducing-jsx.html | Introducing JSX - React
https://github.com/vuejs/babel-plugin-transform-vue-jsx | GitHub - vuejs/babel-plugin-transform-vue-jsx: babel plugin for vue 2.0 jsx
https://github.com/vuejs/babel-plugin-transform-vue-jsx#usage | GitHub - vuejs/babel-plugin-transform-vue-jsx: babel plugin for vue 2.0 jsx
http://www.alloyteam.com/2017/07/12918/ | 用jsx写vue组件 | AlloyTeam
https://www.mmxiaowu.com/article/584824c1d4352863efb55471 | Vue jsx 和 React jsx 的一些不同点 - M.M.F 小屋
https://cn.vuejs.org/v2/guide/forms.html | 表单输入绑定 — Vue.js
https://www.google.com/search?rlz=1C1CHBD_zh-CNJP772US772&ei=IFf1WpWhM8Gm0gT6pa3YBA&q=vue+%E5%B0%A4%E9%9B%A8%E6%BA%AA+%E4%B9%A6&oq=vue+%E5%B0%A4%E9%9B%A8%E6%BA%AA+%E4%B9%A6&gs_l=psy-ab.3...18180.20183.0.20291.5.5.0.0.0.0.1016.1226.1j1j7-1.3.0....0...1c.1j4.64.psy-ab..2.0.0....0.uV1Den7U5Ag | vue 尤雨溪 书 - Google Search
https://juejin.im/entry/59d73ba95188257e876a454a | 尤雨溪-新手向：Vue 2.0 的建议学习顺序 - 前端 - 掘金
https://github.com/vuejs/vue/blob/dev/.github/CONTRIBUTING.md#development-setup | vue/CONTRIBUTING.md at dev · vuejs/vue · GitHub
https://flow.org/en/docs/getting-started/ | Getting Started | Flow
https://juejin.im/entry/5acb052df265da237314bf23 | Vue作者尤雨溪：Vue 2.0，渐进式前端解决方案 - 前端 - 掘金
http://vlambda.com/wz_5gPCBYH54NN.html | 《Vue.js小书》发布，尤雨溪作序推荐_图灵教育-Lambda在线
http://luotao.me/2017/08/02/vue-flowtype/ | Vue.js 配置 Flowtype 静态类型检查 · LUOTAO'S BLOG

http://web.jobbole.com/83575/ | CSS3硬件加速也有坑 - WEB前端 - 伯乐在线
http://web.jobbole.com/93193/ | 火狐浏览器是如何又变快起来的？ - WEB前端 - 伯乐在线
https://segmentfault.com/a/1190000000490328 | 前端性能优化（CSS动画篇） - 说学逗唱 - SegmentFault 思否
https://www.html5rocks.com/zh/tutorials/speed/layers/ | Accelerated Rendering in Chrome: The Layer Model - HTML5 Rocks
http://zyingying.github.io/2016/04/16/CSS3%E5%BC%80%E5%90%AF%E7%A1%AC%E4%BB%B6%E5%8A%A0%E9%80%9F%E5%8F%8A%E5%88%A9%E5%BC%8A/ | CSS3开启硬件加速及利弊 | 2yingying

https://github.com/vuejs/vuex/blob/dev/examples/shopping-cart/components/ProductList.vue | vuex/ProductList.vue at dev · vuejs/vuex · GitHub
https://segmentfault.com/a/1190000009119500 | Vuex之理解Mutations - hk的技术博客 - SegmentFault 思否
http://www.alloyteam.com/2016/12/learn-rxjs/ | 构建流式应用—RxJS详解 | AlloyTeam
https://zhuanlan.zhihu.com/p/29433875 | 性能优化之组件懒加载: Vue Lazy Component 介绍
https://zhuanlan.zhihu.com/p/25383159 | RxJS 入门指引和初步应用

http://vui.oa.fenqile.com/?#/basic/animate | Animate 动画-VUI
https://getbootstrap.com/docs/4.0/layout/grid/ | Grid system · Bootstrap
https://1200px.com/ | 1200px Grid System
https://www.zhihu.com/question/19602912 | 什么是栅格化设计？ - 知乎
http://www.iaxure.com/3636.html | 【转载】网页的栅格化设计 – Axure原创教程网
https://www.google.com.hk/search?q=css+grid&rlz=1C1CHBD_zh-CNJP772US772&oq=css+grid&aqs=chrome..69i57j69i60l3j0l2.2437j0j1&sourceid=chrome&ie=UTF-8 | css grid - Google 搜索
https://developer.mozilla.org/en-US/docs/Web/CSS/grid | grid - CSS | MDN

https://www.google.co.jp/search?hl=zh-CN&as_q=resizeobserver&as_epq=&as_oq=&as_eq=&as_nlo=&as_nhi=&lr=lang_zh-CN&cr=&as_qdr=all&as_sitesearch=&as_occt=any&safe=images&as_filetype=&as_rights= | resizeobserver - Google 搜索
https://github.com/que-etc/resize-observer-polyfill | GitHub - que-etc/resize-observer-polyfill: A polyfill for the Resize Observer API
https://www.zhihu.com/question/67951942 | html5 mutation observer 不能监听元素尺寸变化，还有何用？ - 知乎
https://github.com/que-etc/resize-observer-polyfill/blob/master/src/ResizeObserver.js | resize-observer-polyfill/ResizeObserver.js at master · que-etc/resize-observer-polyfill · GitHub
https://github.com/WICG/ResizeObserver | GitHub - WICG/ResizeObserver
https://github.com/WICG?utf8=%E2%9C%93&q=&type=&language=html | Web Incubator CG · GitHub
https://developer.mozilla.org/zh-CN/search?q=PerformanceObserver&topic=apps&topic=html&topic=css&topic=js&topic=api&topic=canvas&topic=svg&topic=webgl&topic=mobile&topic=webdev&topic=http&topic=webext | 搜索结果：“PerformanceObserver” | MDN

https://cn.vuejs.org/v2/guide/list.html | 列表渲染 — Vue.js
https://router.vuejs.org/zh-cn/essentials/dynamic-matching.html | 动态路由匹配 · vue-router
https://vuex.vuejs.org/zh-cn/installation.html | 安装 · Vuex
https://codepen.io/quietcoder/pen/pNMQyo | Vue动态实例化组件
https://codepen.io/quietcoder/pen/zoXWVX | vue 动态插入组件
https://github.com/liuchengxu/git-commit-emoji-cn | liuchengxu/git-commit-emoji-cn: 😁 git commit emoji 使用指南

https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver | MutationObserver - Web APIs | MDN
https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver | MutationObserver - Web API 接口 | MDN
http://javascript.ruanyifeng.com/dom/mutationobserver.html | Mutation Observer API -- JavaScript 标准参考教程（alpha）

http://element-cn.eleme.io/#/zh-CN/component/switch | 组件 | Element
https://jsfiddle.net/api/post/library/pure/
https://ant.design/components/switch-cn/ | 开关 Switch - Ant Design
https://codepen.io/pen/?&editors=001 | A Pen by Tarrant
http://www.material-ui.com/#/components/toggle | Toggle - Material-UI
https://www.google.com.hk/search?safe=strict&rlz=1C1CHBD_zh-CNHK766HK766&ei=RhgAWrbpLcaX8QWP94pI&q=vue+%E7%BB%84%E4%BB%B6+v-model&oq=vue+%E7%BB%84%E4%BB%B6+v-model&gs_l=psy-ab.3..0.1580.10439.0.10820.32.24.8.0.0.0.244.2743.0j10j5.15.0....0...1.1j4.64.psy-ab..11.18.2024...0i12k1.0.Yp9PnIWYF98 | vue 组件 v-model - Google 搜索
https://github.com/ccforward/cc/issues/70 | 65.从 Vue.js 自定义输入框深入理解 v-model · Issue #70 · ccforward/cc

==================================================one tab=========================================================











