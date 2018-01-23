<style>
</style>
<template>
    <div>
        <template v-for="data in lst">
            <input type="checkbox"  :disabled="data.is_used" @change="changeHandle(data)">
        </template>

    </div>
</template>
<script>
    export default {
        props: {
            lst: Array,
            obj: Object,
        },
        methods: {
            changeHandle(data) {
                data.is_check = !data.is_check;
                this.$emit('changeout', data)
            }
        }
    }
</script>