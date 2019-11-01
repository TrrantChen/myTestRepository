<style scoped>
    .img-div {
        width: 200px;
        height: 200px;
        /*background: url('/assets/assets/ss.png');*/
    }
</style>
<template>
    <div>
        this is img tes
        <img src="/assets/ss.png" alt="img fail">
        <img src="/assets/large.jpg" alt="img fail">
        <div class="img-div"></div>
        <img :src=aa  alt="img fail">
        <img :src=large alt="img fail">
    </div>
</template>
<script>
    import ss from '../../../assets/ss.png';
    import large from '../../../assets/large.jpg';

    export default {
        data() {
            return {
                aa: ss,
                large: large,
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
