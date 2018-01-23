<style>
</style>
<template>
    <div>
        <add-dele-lst :lst="test_lst">
            <template slot-scope="props">
                <div v-for="val in props.test">
                    <span style="border: solid 1px black; background: yellow;">{{ val }}</span>
                </div>
            </template>
        </add-dele-lst>
        <button @click="test_lst.push(100)">add</button>
    </div>
</template>
<script>
    import addDeleLst from './addDeleLst'
    export default {
        components: {
            addDeleLst,
        },
        data() {  
            return {  
                test_lst: [1, 2, 3, 4, 5],
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