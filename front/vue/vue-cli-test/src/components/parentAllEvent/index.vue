<style>
</style>
<template>
    <div>
        <div @change="changeHanle" style="border:solid 10px black; margin: 40px;">
            <input type="text">
            <input type="text">
            <input type="text">
            <input type="text">
            <custom-component></custom-component>
        </div>
    </div>
</template>
<script>
    import customComponent from './customComponent'

    export default {
        components: {
            customComponent,
        },
        data() {  
            return {  
                
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
            changeHanle() {
                alert('change');
            },
        }
    }
</script>