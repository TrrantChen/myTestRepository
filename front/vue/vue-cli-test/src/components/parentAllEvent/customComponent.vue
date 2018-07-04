<style>
</style>
<template>
    <div>
        <input type="text" @change="changeHandle">
    </div>
</template>
<script>
    export default {
        components: {
            
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
            changeHandle() {
                this.$emit('change');
            }
        }
    }
</script>