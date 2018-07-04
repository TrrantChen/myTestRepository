<style>
</style>
<template>
    <div style="border:solid 1px red;">
        <span style="color:white;">num is {{ sub_obj.num }}</span>
        <div v-for="var_obj in sub_obj.var">
            <sub_sub :sub_sub="var_obj"  :num="sub_obj.num"></sub_sub>
        </div>
        <button @click="del">del</button>
    </div>
</template>
<script>
    import sub_sub from './sub_sub';

    export default {
        components: {
            sub_sub,
        },
        props: {
            sub_obj: Object,
        },
        methods: {
            del() {
                this.$emit('del');
            },
        }
    }
</script>