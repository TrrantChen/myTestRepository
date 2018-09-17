<style>
    .content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 1600px;
        margin-left: 50px;
    }

    .div_style {
        width: 200px;
        height: 40px;
        border: solid 1px black;
        background: orange;
    }

    .width_style {
        margin-bottom: 30px;
        border:1px black solid;
        padding: 30px;
    }

</style>
<template>
    <div>
        <button @click="show">show</button>
        <button @click="dele">dele</button>
        <!--<div class="width_style">-->
            <!--<div ref="content" class="content">-->
                <!--<template v-for="(value, idx) in lst" >-->
                    <!--<template v-if="idx === 1">-->
                    <!--<span draggable="true" style="background: red;" class="div_style" @dragstart="dragStartHandle($event, idx)" @dragenter="dragEnterHandle($event, idx)" @dragover="dragOverHandle($event, idx)" @dragleave="dragLeaveHandle($event, idx)" @drop="dropHandle($event, idx)">-->
                        <!--{{ value }}-->
                    <!--</span>-->
                    <!--</template>-->
                    <!--<template v-else>-->
                        <!--<div  draggable="true" class="div_style" @dragstart="dragStartHandle($event, idx)" @dragenter="dragEnterHandle($event, idx)" @dragover="dragOverHandle($event, idx)" @dragleave="dragLeaveHandle($event, idx)" @drop="dropHandle($event, idx)">-->
                            <!--{{ value }}-->
                        <!--</div>-->
                    <!--</template>-->
                <!--</template>-->

                <!--&lt;!&ndash;<div class="div_style" v-for="value, idx in lst" draggable="true" @dragstart="dragStartHandle($event, idx)" @dragenter="dragEnterHandle($event, idx)" @dragover="dragOverHandle($event, idx)" @dragleave="dragLeaveHandle($event, idx)" @drop="dropHandle($event, idx)">&ndash;&gt;-->
                <!--&lt;!&ndash;&ndash;&gt;-->
                <!--&lt;!&ndash;{{ value }}&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="width_style">-->
            <!--<draggable v-model="lst">-->
                <!--&lt;!&ndash;<template v-for="(value, idx) in lst" >&ndash;&gt;-->
                    <!--&lt;!&ndash;<template v-if="idx === 1">&ndash;&gt;-->
                    <!--&lt;!&ndash;<span draggable="true" style="background: red;" class="div_style" @dragstart="dragStartHandle($event, idx)" @dragenter="dragEnterHandle($event, idx)" @dragover="dragOverHandle($event, idx)" @dragleave="dragLeaveHandle($event, idx)" @drop="dropHandle($event, idx)">&ndash;&gt;-->
                        <!--&lt;!&ndash;{{ value }}&ndash;&gt;-->
                    <!--&lt;!&ndash;</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;</template>&ndash;&gt;-->
                    <!--&lt;!&ndash;<template v-else>&ndash;&gt;-->
                        <!--<div v-for="(value, idx) in lst"  draggable="true" class="div_style" >-->
                            <!--{{ value }}-->
                        <!--</div>-->
                    <!--&lt;!&ndash;</template>&ndash;&gt;-->
                <!--&lt;!&ndash;</template>&ndash;&gt;-->
            <!--</draggable>-->
        <!--</div>-->
        <h4>my drag component</h4>
        <div class="width_style">
            <drag-and-change v-model="lst">
                <template  v-for="(value, index) in lst">
                    <div class="div_style">
                        <!--<span v-if="index === 1"  :key="index"> {{ value }} </span>-->

                        <!--<div v-else class="div_style"  :key="index" >-->
                        <!--{{ value }}-->
                        <!--</div>-->
                        {{ value }}
                    </div>
                </template>
            </drag-and-change>
        </div>
        <h4>web drag component</h4>
        <div class="width_style">
            <draggable class="list-group" element="ul" v-model="lst"  @start="isDragging=true" @end="isDragging=false">
                <!--<transition-group type="transition" :name="'flip-list'">-->
                    <!--<li class="list-group-item" v-for="element in list" :key="element.order">-->
                        <!--<i @click=" element.fixed=! element.fixed" aria-hidden="true"></i>-->
                        <!--{{element.name}}-->
                        <!--<span class="badge">{{element.order}}</span>-->
                    <!--</li>-->
                    <div v-for="(value, idx) in lst" :key="value" class="div_style">
                        <!--<span v-if="idx === 1"  :key="idx" style="border:1px black solid;width:100px;height:30px;background: red;"> {{ value }} </span>-->

                        <!--<div v-else class="div_style" :key="idx">-->
                            <!--{{ value }}-->
                        <!--</div>-->
                        {{ value }}
                    </div>
                <!--</transition-group>-->
            </draggable>
        </div>
    </div>
</template>
<script>
    import DragAndChange from './dragAndChange';
    import draggable from 'vuedraggable'


    export default {
        components: {
            DragAndChange,
            draggable,
        },
        data() {  
            return {
                list: ["vue.draggable", "draggable", "component", "for", "vue.js 2.0", "based", "on", "Sortablejs"].map((name, index) => {
                    return { name, order: index + 1, fixed: false };
                }),
                lst : [],
                move_index: void 0,
                parent: void 0,
                move_dom: void 0,
            }
        },
        watch: {
        
        },
        created() {
            // for (var i = 0, length = 10; i < length; i++) {
            //     this.lst.push(i);
            // }

            this.lst = [1,2,3,4,5,6,7];

            console.log(this.lst);
        },
        mounted() {
            // this.parent = this.$refs.content;
            //
            // let observer = new MutationObserver(function(mutation_record_lst) {
            //     console.log(mutation_record_lst);
            // });
            //
            // observer.observe(this.parent, { childList: true });
        },
        computed: {
        
        },
        methods: {
            dragStartHandle(evt, idx) {
                this.move_index = idx;
                console.log('drag start');
                this.move_dom = evt.currentTarget;
                this.move_dom.style.background = 'black';
            },
            dragOverHandle(evt, idx) {
                console.log('over start');
                evt.preventDefault();
                evt.dataTransfer.dropEffect = "copy";
                let dom = evt.currentTarget;
                dom.style.opacity = 0.5;
            },
            dragEnterHandle(evt, idx) {

                if (evt.currentTarget !== this.move_dom) {
                    let source_dom = this.move_dom;
                    let target_dom = evt.currentTarget;

                    let dom_lst = [].slice.call(this.parent.children);
                    let source_idx = dom_lst.indexOf(source_dom);
                    let target_idx = dom_lst.indexOf(target_dom);

                    let tmp = this.lst[source_idx];


                    if (source_idx > target_idx) {

                        source_dom.remove();
                        this.parent.insertBefore(source_dom, target_dom);


                        for (var i = source_idx; i > target_idx; i--) {
                            this.lst[i] = this.lst[i - 1];
                            // this.lst.splice(i, 1, this.lst[i - 1]);
                        }


                    } else {

                        source_dom.remove();
                        this.parent.insertBefore(source_dom, target_dom.nextSibling);


                        for (var i = source_idx; i < target_idx; i++) {
                            this.lst[i] = this.lst[i + 1];
                            // this.lst.splice(i, 1, this.lst[i + 1]);
                        }


                    }

                    this.lst[target_idx] = tmp;
                    // this.lst.splice(target_idx, 1, tmp);


                    console.log(this.lst);
                }



                // if (this.move_index !== idx) {
                //
                //     let source = this.lst.splice(this.move_index, 1);
                //     this.lst.splice(idx, 0, source[0]);
                //     this.move_index = idx;
                //
                //
                //
                // }
            },
            show() {
                console.log(this.lst);
            },
            dragLeaveHandle(evt, idx) {
                let dom = evt.currentTarget;
                dom.style.opacity = 1;
            },
            dropHandle(evt, idx) {
                let dom = evt.currentTarget;
                dom.style.opacity = 1;
                this.move_dom.style.background = 'orange';
            },
            dele() {
                this.lst = JSON.parse(JSON.stringify(this.lst));
                console.log(this.lst);
                this.lst.splice(0,1);
                console.log(this.lst);
            }
        }
    }
</script>