<style>
</style>
<template>
    <div>
        <span>current test id is {{ test_id }}</span>
        <br>
        <span>is odd test id {{ is_odd_id }}</span>
        <br>
        <button @click="changeTestId">change test id</button>
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
            test_id() {
                return this.$store.state.common.test_id;
            },
            is_odd_id() {
                return this.$store.getters.getIsOddTestId;
            }
        },
        methods: {
            changeTestId() {
                let test_id = this.test_id;
                test_id++;
                this.$store.commit('TEST_ID', test_id);
            }
        }
    }
</script>
