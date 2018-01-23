<style>
</style>
<template>
    <div>
        <template v-for="(check_box, index) in check_box_lst">
            <check-box-test :lst="check_box.value_arr" :obj="check_box.model_obj"  @changeout="changeHandle"></check-box-test>
            <div v-for="value in check_box.model_obj.arr">{{ value }}</div>
            <button @click="check_box_lst.splice(index, 1)">rmove</button>
        </template>
    </div>
</template>
<script>
    import CheckBoxTest from './checkBoxTest.vue'

    export default {
        components: {
            CheckBoxTest,
        },
        data() {  
            return {
                check_box_model: [],
                check_box_lst: [
                    {
                        model_obj: {
                            arr: []
                        },
                        value_arr: [
                            {
                            index: 0,
                            is_used: false,
                            is_check: false,
                            }, {
                            index: 1,
                            is_used: false,
                            is_check: false,
                            }, {
                            index: 2,
                            is_used: false,
                            is_check: false,
                            }
                        ],
                    },
                    {
                        model_obj: {
                            arr: []
                        },
                        value_arr: [
                            {
                                index: 0,
                                is_used: false,
                                is_check: false,
                            }, {
                                index: 1,
                                is_used: false,
                                is_check: false,
                            }, {
                                index: 2,
                                is_used: false,
                                is_check: false,
                            }
                        ],
                    },
                    {
                        model_obj: {
                            arr: []
                        },
                        value_arr: [
                            {
                                index: 0,
                                is_used: false,
                                is_check: false,
                            }, {
                                index: 1,
                                is_used: false,
                                is_check: false,
                            }, {
                                index: 2,
                                is_used: false,
                                is_check: false,
                            }
                        ],
                    },
                ],
                check_box_lst2: [
                    {
                        index: 1,
                        is_check: true,
                    },
                    {
                        index: 2,
                        is_check: false,
                    },
                    {
                        index: 3,
                        is_check: false,
                    }
                ]
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
            changeHandle(data) {
                if (data.is_check) {
                    this.check_box_lst.forEach((check_box) => {
                        check_box.value_arr[data.index].is_used = true;
                    });
                    data.is_used = false;
                }
                else {
                    this.check_box_lst.forEach((check_box) => {
                        check_box.value_arr[data.index].is_used = false;
                    });
                }
            }
        }
    }
</script>