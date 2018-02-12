<style>
</style>
<template>
    <div>
        <button @click="addComponent">add component</button>
        <button @click="removeComponent">remove component</button>
        <div id="box" ref="box">

        </div>
    </div>
</template>
<script>
    import SonComponent from './sonComponent.vue'
    import Vue from 'vue';

    let sonComponent = Vue.extend(SonComponent);

    export default {
        components: {
            sonComponent
        },
        data() {  
            return {  
               num: 0,
            }
        },
        methods: {
            addComponent() {
                const tmp = new sonComponent();
                tmp.$data.msg = this.num++;
                tmp.$mount();
                this.$refs.box.appendChild(tmp.$el);
                console.log(tmp.$el);

//                new sonComponent().$mount('#box');
            },
            removeComponent() {

            }
        }
    }
</script>