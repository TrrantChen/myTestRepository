<template>
    <div class="index-container">
        this is index
        <router-link to="/page1">page1</router-link>
        <button @click="toPage2">page2</button>
        <button @click="toTestStore">test store</button>
        <button @click="toImageTest">img test</button>
    </div>
</template>
<script>
    import '../css/index.css';

    export default {
        data() {
            return {
                a: 1,
            }
        },
        methods: {
            toPage2() {
                this.$router.push({ path: 'page2' });
            },
            toTestStore() {
                this.$router.push({ path: 'testStore' });
            },
            toImageTest() {
                this.$router.push({ path: 'imageTest' });
            }
        }
    }
</script>
