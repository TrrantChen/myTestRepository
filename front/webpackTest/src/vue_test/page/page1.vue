<style scoped>
    .test_css {
        background: antiquewhite;
    }

    .test_css span {
        font-size: 20px;
    }

    .test_css .test_div {
        width: 300px;
        height: 300px;
        border: 1px solid black;
        transform: rotate(45deg);
    }

    .test_css .another_div {
        width: 100px;
        height: 100px;
        border: 1px solid blue;
    }
</style>
<template>
    <div class="test_css">
        <span>this page is change for css</span>
        <div class="test_div">
        </div>
        <div class="another_div">

        </div>
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

        },
        methods: {

        }
    }
</script>
