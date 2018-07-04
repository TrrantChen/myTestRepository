<style>
    .v-slider-container {
        position: relative;
        width:20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 14px 28px;
    }

    .v-slider-container:hover .v-slider-rail{
        /*background: #e1e1e1;*/
    }

    .v-slider-container:hover {
        cursor: pointer;
    }

    .v-slider-rail {
        width:8px;
        background: #91d5ff;
    }


    .v-slider-handle {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 7px;
        width: 28px;
        height: 28px;
        cursor: pointer;
        border-radius: 50%;
        border: 2px solid #91d5ff;
        background-color: #fff;
        cursor: pointer;
    }

    .v-slider-label_style {
        position: absolute;
        top: -3px;
        left: 25px;
    }

    .v-slider-rail-container {
        position: relative;
    }


</style>
<template>
    <div ref="slider_container" class="v-slider-container">
        <template v-for="i in count">
            <div class="v-slider-rail-container">
                <div ref="slider_rail" class="v-slider-rail" :style="{ height: i === count ? '0px' : step_hight + 'px', background: i === count ? 'transparent' : '#91d5ff' }" >
                </div>
                <label class="v-slider-label_style" for="">{{ i }}</label>
            </div>
        </template>
        <div ref="slider_handle" class="v-slider-handle" :style="{ top: (slider_handle_origin_top + move_index * step_hight) + 'px' }">
        </div>
    </div>
</template>
<script>

    export default {
        components: {
        },
        props: {
            value: {
                type: Number,
                default: 0,
            },
            count: {
                type: Number,
                default: 6,
            },
            step_hight: {
                type: Number,
                default: 20,
            },
            is_show: {
                type: Boolean,
                default: true,
            }
        },
        watch: {
            is_show: function(val, oldVal) {
                if (val !== oldVal && val && this.y_lst.length === 0) {
                    setTimeout(() => {
                        this.setYLst();
                    }, 1000);
                }
            },
        },
        data() {
            return {
                slider_handle: void 0,
                slider_container: void 0,
                y_lst: [],
                slider_handle_origin_top: 7,
                index: 0,
                move_index: 0,
            }
        },
        created() {
            this.move_index = this.value;
        },
        mounted() {
            this.slider_container = this.$refs.slider_container;
            this.slider_handle = this.$refs.slider_handle;
            this.slider_handle.addEventListener('mousedown', this.mouseDownHandle);
            this.slider_container.addEventListener('mousedown', this.containerMouseDown);
            this.setYLst();
        },
        beforeDestroy() {
            if (this.slider_handle) {
                this.slider_handle.removeEventListener('mousedown', this.mouseDownHandle);
            }

            if (this.slider_container) {
                this.slider_container.removeEventListener('mousedown', this.containerMouseDown);
            }
        },
        methods: {
            mouseDownHandle(evt) {
                evt.stopPropagation();
                evt.preventDefault();

                document.addEventListener('mousemove', this.mouseMoveHandle);
                document.addEventListener('mouseup', this.mouseUpHandle);
            },
            mouseMoveHandle(evt) {
                evt.stopPropagation();
                evt.preventDefault();

                this.setTop(evt);
            },
            mouseUpHandle(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                this.move_index = this.index;
                this.$emit('input', this.index);

                document.removeEventListener('mousemove', this.mouseMoveHandle);
                document.removeEventListener('mouseup', this.mouseUpHandle);
            },
            containerMouseDown(evt) {
                this.setTop(evt);
                this.move_index = this.index;
                this.$emit('input', this.index);
            },
            setYLst() {
                let boundingClientRect = this.slider_container.getBoundingClientRect();
                let start_point_y = 0;

                if (boundingClientRect !== void 0 && boundingClientRect !== null) {
                    start_point_y = boundingClientRect.top + window.scrollY + this.slider_handle_origin_top;
                }

                for (var i = 0; i < this.count; i++) {
                    let tmp = start_point_y + i * this.step_hight;
                    this.y_lst.push(tmp);
                }
            },
            setTop(evt) {
                let y = evt.pageY;
                if (y <= this.y_lst[0]) {
                    this.setHandleY(0)
                } else if (y >= this.y_lst[this.y_lst.length - 1]) {
                    this.setHandleY(this.y_lst.length - 1)
                } else {
                    for (var i = 0; i < this.y_lst.length; i++) {
                        if (y <= this.y_lst[i + 1] && y > this.y_lst[i]) {
                            if (y * 10 >  this.y_lst[i] * 10 + (this.step_hight / 2).toFixed(1) * 10) {
                                this.setHandleY(i + 1);
                            } else {
                                this.setHandleY(i);
                            }
                        }
                    }
                }
            },
            setHandleY(i) {
                this.index = i;
                this.move_index = this.index;
            }
        }

    }
</script>