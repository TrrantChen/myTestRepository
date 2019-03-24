<style>
</style>
<template>
    <div>
        <div>
            name1: {{ obj1.name }}
        </div>
        <div>
            name2: {{ obj2.name }}
        </div>
        <button @click="changeName">change</button>
    </div>
</template>
<script>
    export default {
        components: {

        },
        data() {
            return {
                obj1: {},
                obj2: {},
            }
        },
        watch: {

        },
        created() {
            this.query();
        },
        mounted() {

        },
        computed: {

        },
        methods: {
            query() {
                let obj = {
                    name: 'yc',
                    age: 1,
                };

                this.obj1 = obj;
                this.obj2 = obj;
            },
            changeName() {
                this.obj1.name = new Date();
            }
        }
    }
</script>
