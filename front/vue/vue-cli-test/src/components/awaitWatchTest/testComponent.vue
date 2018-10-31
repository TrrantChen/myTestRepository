<style>
</style>
<template>
    <div>
        <span v-for="val of my_lst">
            {{ val }}
        </span>
    </div>
</template>
<script>
    export default {
        components: {

        },
        props: {
            lst: {
                type: Array,
                default: [],
            },
        },
        data() {
            return {
                my_lst: [],
            }
        },
        watch: {
            lst: function(val) {

                let tmp = [];

                for (var item of val[val.length - 1]) {
                    tmp.push(item + 1);
                }

                this.my_lst.push(tmp);
            }
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
