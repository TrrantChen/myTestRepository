<style>
</style>
<template>
    <div>
        <span>{{ id_computed }}</span>
        <button @click="changeHandle">add</button>
        <sub_var :obj="obj"></sub_var>
    </div>
</template>
<script>
    import sub_var from './sub'

    export default {
        components: {
            sub_var
        },
        data() {  
            return {
                id: 0,
                obj: {
                    var: 0,
                }
            }
        },
        computed: {
            id_computed: function() {
                console.log('computed');
                return this.id;
            }
        },
        watch: {
            'id': function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    console.log('watch');
                }
            }
        },
        created() {
        
        },
        mounted() {
        
        },
        methods: {
            changeHandle() {
                ++this.obj.var;
            }
        }
    }
</script>