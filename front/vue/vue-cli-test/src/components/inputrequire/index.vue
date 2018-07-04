<style>
</style>
<template>
    <div>
        <form @submit.prevent="save">
            <input ref="input" required type="text">
            <button type="submit">sub</button>
        </form>
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
            this.$refs.input.addEventListener('invalid', function() {
                console.log('dddd');
            })
        },
        computed: {
        
        },
        methods: {
            save() {
                alert('test');
            }
        }
    }
</script>