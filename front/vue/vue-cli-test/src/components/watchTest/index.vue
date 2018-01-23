<style>
</style>
<template>
    <div>
        <input type="text" v-model="para.data">
        <div>{{ para.data }}</div>
        <div>======================================================</div>
        <template v-for="data in para.lst1">
            <input type="text" v-model="data.para">
        </template>
        <div>======================================================</div>
        <template v-for="data in para.lst2">
            <input type="text" v-model="data.para">
        </template>
    </div>
</template>
<script>
    export default {
        components: {
            
        },
        data() {  
            return {  
                para: {
                    data: '',
                    lst1: [
                        {
                            para: 1,
                        },
                        {
                            para: 2,
                        },
                        {
                            para: 3,
                        },
                    ],
                    lst2: [
                        {
                            para: 4,
                        },
                        {
                            para: 5,
                        },
                        {
                            para: 6,
                        }

                    ],
                }
            }
        },
        watch: {
//            'para': function(new_value, old_value) {
////                if (new_value !== old_value) {
//                    console.log('para watch');
////                }
//            },
//            para: {
//                handler: function(val, old_val) {
//                    console.log(arguments);
//                    if (val !== old_val) {
//                        console.log('para watch');
//                    }
//                    console.log('ttt');
//                },
//                deep: true,
//            },
            'para.data': function(new_value, old_value) {
                console.log(arguments);
                if (new_value !== old_value) {
                    console.log('data watch');
                }
            },
//            'para.lst1': {
//                handler: function(val, old_val) {
//                    if (val !== old_val) {
//                        console.log('lst1 watch');
//                        console.log(val);
//                    } else {
//                        console.log(val);
//                        console.log(old_val);
//                        console.log('just watch');
//                    }
//
//                },
//                deep: true,
//            },
//            'para.lst1': function(new_value, old_value) {
//                if (new_value !== old_value) {
//                    console.log('lst1 watch');
//                }
//            },
            'para.lst2': function(new_value, old_value) {
//                if (new_value !== old_value) {
                    console.log('lst2 watch');
//                }
            }
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