<style>
</style>
<template>
    <div>
        {{ test }}
    </div>
</template>
<script>
    export default {
        props: {
            obj: Object
        },
        components: {
            
        },
        data() {  
            return {  
                
            }
        },
        watch: {
            'obj.var': function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    console.log('watch');
                }
            }
        },
        created() {
        
        },
        mounted() {
        
        },
        computed: {
            test: function() {
                console.log('computed');
                return this.obj.var;
            }
        },
        methods: {
        
        }
    }
</script>