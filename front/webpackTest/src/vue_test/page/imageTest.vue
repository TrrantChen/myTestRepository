<style scoped>
    .img-div {
        width: 200px;
        height: 200px;
        /*background: url('/assets/assets/ss.png');*/
    }
</style>
<template>
    <div>
        <span>三种加载方式</span>
        <br>
        <span>一</span>
        <img width="50" height="50" src="../../../assets/ss.png" alt="img fail">
        <img width="50" height="50" src="../../../assets/large.jpg" alt="img fail">
        <br>
        <span>二</span>
        <img width="50" height="50" :src=aa  alt="img fail">
        <img width="50" height="50" :src=large alt="img fail">
        <br>
        <span>三</span>
        <!--content设置为false的时候不行-->
        <img width="50" height="50" src="/assets/ss.png" alt="img fail">
        <img width="50" height="50" src="/assets/large.jpg" alt="img fail">
        <br>
        <span>四</span>
        <img width="50" height="50" src="vue_project/assets/ss.png" alt="img fail">
        <img width="50" height="50" src="vue_project/assets/large.jpg" alt="img fail">
        <br>
        <div class="img-div"></div>
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
