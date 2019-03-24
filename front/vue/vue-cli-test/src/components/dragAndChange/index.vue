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
        <h4>my drag component with obj lst</h4>
        <div class="width_style">
            <drag-and-change v-model="lst">
                <template  v-for="(obj, index) in lst">
                    <template v-if="obj.id === 1">
                        <button :key="obj.id" style="background: red;">
                            {{ obj.value }}
                        </button>
                    </template>
                    <template v-else>
                        <div :key="obj.id" class="div_style">
                            {{ obj.value }}
                        </div>
                    </template>
                </template>
            </drag-and-change>
        </div>
        <h4>web drag component width obj lst</h4>
        <div class="width_style">
            <draggable class="list-group" element="ul" v-model="lst"  @start="isDragging=true" @end="isDragging=false">
                <!--<transition-group type="transition" :name="'flip-list'">-->
                    <template v-for="(obj, idx) in lst">
                        <template v-if="obj.id === 1">
                            <button :key="obj.id" style="background: red;">
                                {{ obj.value }}
                            </button>
                        </template>
                        <template v-else>
                            <div :key="obj.id" class="div_style">
                                {{ obj.value }}
                            </div>
                        </template>
                    </template>
                <!--</transition-group>-->
            </draggable>
        </div>
        <h4>my drag component with lst</h4>
        <div class="width_style">
            <drag-and-change v-model="value_lst">
                <template  v-for="(value, index) in value_lst">
                    <template v-if="index === 1">
                        <span style="background: red;width: 50px;" :key="value"> {{ value }} </span>
                    </template>
                    <template v-else>
                        <div class="div_style" :key="value">
                            {{ value }}
                        </div>
                    </template>
                </template>
            </drag-and-change>
        </div>
        <h4>web drag component width lst</h4>
        <div class="width_style">
            <draggable class="list-group" element="ul" v-model="value_lst"  @start="isDragging=true" @end="isDragging=false">
                <transition-group type="transition" :name="'flip-list'">
                    <div v-for="(value, idx) in value_lst" :key="value" class="div_style">
                        <span v-if="idx === 1"  :key="idx" style="border:1px black solid;width:100px;height:30px;background: red;"> {{ value }} </span>

                        <div v-else class="div_style" :key="idx">
                            {{ value }}
                        </div>
                    </div>
                </transition-group>
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
                lst: [
                    {
                        id: 1,
                        value: 'a',
                    },
                    {
                        id: 2,
                        value: 'b',
                    },
                    {
                        id: 3,
                        value: 'c',
                    },
                    {
                        id: 4,
                        value: 'd',
                    },
                    {
                        id: 5,
                        value: 'e',
                    }
                ],
                value_lst: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6
                ],
            }
        },
        watch: {

        },
        created() {

        },
        mounted() {
        },
        computed: {

        },
        methods: {
        }
    }
</script>
