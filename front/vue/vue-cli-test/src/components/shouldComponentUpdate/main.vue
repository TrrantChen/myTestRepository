<style>
</style>
<template>
    <div>
        <button @click="add">add</button>
        <parent :count="count"></parent>
        <span>main {{ count }}</span>
    </div>

</template>
<script>
    import parent from './parent'
    export default {
        components: {
            parent
        },
        data() {
            return {
                count: 0,
            }
        },
        methods: {
            add() {
                this.count++;
            }
        }
    }
</script>
