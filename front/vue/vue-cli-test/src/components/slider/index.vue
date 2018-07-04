<style>
</style>
<template>
    <div style="display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;width:100%;">
        <slider v-model="index" :count="count" :step_hight="step_hight"></slider>
    </div>
</template>
<script>
    import slider from './slider';

    export default {
        components: {
            slider,
        },
        data() {  
            return {  
                index: 0,
                // count: 2,
                count: 7,
                // step_hight: 100,
                step_hight: 100,
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