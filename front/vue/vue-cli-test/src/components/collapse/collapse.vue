<style scoped>
    .collapse {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }

    .collapse-header {
        width: 100%;
        position: relative;
    }

    .collapse-header:hover {
        cursor: pointer;
    }

    .collapse-content {
        width: 100%;
        position: relative;
    }

    .btnStyle {
        position: absolute;
        top: 0;
        left: 0;
    }

</style>
<template>
    <div class="collapse">
        <div class="collapse-header" @click="clickHandler">
            <button class="btnStyle">{{ is_expand ? '收缩' : '展开' }}</button>
            <slot name="header">

            </slot>
        </div>
        <div class="collapse-content">
            <slot name="content">

            </slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: {

        },
        data() {  
            return {  
                is_expand: false,
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
            clickHandler() {
                this.is_expand = !this.is_expand;
            },
        },
    }
</script>