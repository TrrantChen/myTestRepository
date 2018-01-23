<style>
</style>
<template>
    <div>
        <div>is_default: {{ obj[0].is_default }}</div>
        <div>is_select: {{ obj[0].is_select }}</div>
        <button @click="clickHandle">click</button>
        <button @click="clickHandle2">click2</button>
    </div>

</template>
<script>
    export default {
        components: {
            
        },
        props: {
            obj: Array,
        },
        data() {  
            return {  
                self_obj: {},
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
            clickHandle: function() {
                this.obj[0].is_default = !this.obj[0].is_default
            },
            clickHandle2: function() {
            }
        }
    }
</script>