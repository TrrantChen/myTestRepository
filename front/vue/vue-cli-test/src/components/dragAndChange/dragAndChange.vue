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
                // 这块的作用域bind是null也没关系，vue中方法的this都是没法改变的。神奇
                for (let [index, dom] of this.dom_lst.entries()){
                    let tmp_drag_start = this.dragStartHandle.bind(null, index);
                    let tmp_drag_enter = this.dragEnterHandle.bind(null, index);
                    let tmp_drag_over = this.dragOverHandle.bind(null, index);
                    let tmp_drag_leave = this.dragLeaveHandle.bind(null, index);
                    let tmp_drag_end = this.dragEndHandle.bind(null, index);
                    let tmp_drop = this.dropHandle.bind(null, index);


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
                console.log(evt);
                console.log(this);
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
