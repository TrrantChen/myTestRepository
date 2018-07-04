<style>
</style>
<template>
    <div style="border:solid black 1px;">
        <span>{{ sub_sub.name }}</span>
        <select v-model="sub_sub.sel_value">
            <option value="">choose</option>
            <option :value="data.value" v-for="data in lst">{{ data.name }}</option>
        </select>
    </div>
</template>
<script>
    export default {
        props: {
            sub_sub: {
                type: Object,
                default: function() {
                    return {
                        sel_value: 'aaa',
                        name: 'bbb',
                    }
                }
            },
            num: Number,
        },
        // watch: {
        //     index: function(val, old) {
        //         this.lst = this.getDataSync();
        //         if (val !== old) {
        //             console.log('test');
        //         }
        //     }
        // },

        watch: {
            num: function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.lst = this.getDataSync();
                }
            }
        },
        data() {  
            return {  
                lst: [],
            }
        },
        created() {
            this.lst = this.getDataSync();
        },
        // updated() {
        //     this.lst = this.getDataSync();
        // },
        methods: {
            getDataSync() {
                switch(this.num) {
                    case 0:
                        return [
                            {
                                value: 'a',
                                name: '1',
                            },
                            {
                                value: 'b',
                                name: '555',
                            },
                            {
                                value: 'c',
                                name: '6',
                            },
                            {
                                value: 'd',
                                name: '8',
                            }
                        ];
                    case 1:
                        return [
                            {
                                value: 'c',
                                name: '2',
                            },
                            {
                                value: 'u',
                                name: '21',
                            },
                            {
                                value: 'g',
                                name: '2212',
                            },
                            {
                                value: 'f',
                                name: '8',
                            }
                        ];
                    case 2:
                        return [
                            {
                                value: 'd',
                                name: '3',
                            },
                            {
                                value: 'hj',
                                name: '3123133',
                            },
                            {
                                value: 'uc',
                                name: '34833',
                            },
                            {
                                value: 'du',
                                name: '345633',
                            }
                        ];
                    default:
                        break;
                }
            },
        }
    }
</script>