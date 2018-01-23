<style>
</style>
<template>
    <div style="color: white;">{{ name }}</div>
</template>
<script>
    export default {
        components: {
            
        },
        data() {  
            return {  
                msg: ''
            }
        },
        watch: {
        
        },
        created() {
            this.asyncByMutationSetName();
        },
        mounted() {
        
        },
        computed: {
            name() {
                return this.$store.state.name;
            }
        },
        methods: {
            // 异步的设置store,使用mutation会没有反应
            asyncByMutationSetName() {
                let that = this;
                setTimeout(function() {
                    that.$store.commit('NAME', 'test');
                }, 2000);
                console.log(this.name);
            }
        }
    }
</script>