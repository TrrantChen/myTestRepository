export default class DragAndDropController {
    constructor(source, target, data, option) {
        let default_opt = {
            env: null,
            dropEffect: 'copy',
        };

        if (typeof option !== "object") {
            this._option = default_opt;
        }
        else {
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
            for (var dom of this._source) {
                let dragstart_handle = this._dragStartHandle.bind(this);

                this.source_event_lst.push({
                    dragstart: dragstart_handle
                });

                dom.addEventListener('dragstart', dragstart_handle);
                dom.setAttribute('draggable', true);
            }
        }
        else {
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
        }
        else {
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
        }
        else {
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
        }
        else {
            if (this._target) {
                let obj = this.target_event_lst[0];

                this._target.removeEventListener('drop', obj.drop);
                this._target.removeEventListener('dragover', obj.dragover);
            }
        }
    }

    _dragStartHandle(evt) {
        evt.stopPropagation();
        evt.dataTransfer.clearData();

        let transfer_data = {
            data: this._data,
            uuid: this._uuid,
        };

        if (this._drag_callback) {
            Reflect.apply(this._drag_callback, this._option.env, [transfer_data, evt.currentTarget, this._target])
        }

        evt.dataTransfer.setData("transfer_data", JSON.stringify(transfer_data));

    }

    _dragoverHandle(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = this._option.dropEffect;

        if (this._drag_over_callback){
            Reflect.apply(this._drag_over_callback, this._option.env, [evt.currentTarget])
        }
    }

    _dropHandle(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        let transfer_data = JSON.parse(evt.dataTransfer.getData("transfer_data") || JSON.stringify({}));

        if (transfer_data !== void 0 && this._uuid === transfer_data.uuid) {
            if (this._drop_callback) {
                Reflect.apply(this._drop_callback, this._option.env, [transfer_data.data, evt.currentTarget])
            }
        }
        else {
            if (this._drop_error_callback) {
                Reflect.apply(this._drop_error_callback, this._option.env, [evt.currentTarget]);
            }
            else {
                console.warn('not allow to drop here');
            }
        }
    }

    _uuid(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
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
                    r = 0 | Math.random()*16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
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
