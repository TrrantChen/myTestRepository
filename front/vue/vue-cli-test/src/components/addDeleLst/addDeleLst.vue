<style>
</style>
<template>
    <div>
        <slot :test="lst"></slot>
    </div>
</template>
<script>
    export default {
        props: {
            lst: {
                type: Array,
                default: [],
            },
        },
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
            addValue() {

            },
        }
    }
</script>