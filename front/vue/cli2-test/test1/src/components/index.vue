<template>
    <div>
        <router-link to="../page1">page1</router-link>
        <button @click="toPage2">page2</button>
    </div>
</template>

<script>
    export default {
        name: "index",
        create: {

        },
        methods: {
            toPage2() {
                this.$router.push({ path: 'page2' });
            },
        },
    }
</script>

<style scoped>

</style>
