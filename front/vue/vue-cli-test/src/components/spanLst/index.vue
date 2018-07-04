<style>
</style>
<template>
    <div style="width:10%;">
        <span-lst :lst="data_lst" :is_show_input="true"></span-lst>
        <button @click="clickHandle">add</button>
    </div>
</template>
<script>
    import SpanLst from './spanLst';

    export default {
        components: {
            SpanLst,
        },
        data() {  
            return {  
                data_lst: ['c12', 'a10', 'b11'],
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
            clickHandle() {
                this.data_lst.push('f33');
            }
        }
    }
</script>