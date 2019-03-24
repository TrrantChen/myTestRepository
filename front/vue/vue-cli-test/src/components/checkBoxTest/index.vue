<style>
</style>
<template>
    <div>
        <div id='example-3' v-if="is_show">
            <input type="checkbox" id="jack" value="1" v-model="lst" @input="inputHandle" @change="changeHandle">
            <label for="jack">Jack</label>
            <input type="checkbox" id="john" value="2" v-model="lst">
            <label for="john">John</label>
            <input type="checkbox" id="mike" value="3" v-model="lst">
            <label for="mike">Mike</label>
            <br>
            <span>Checked names: {{ lst }}</span>
        </div>
        <button @click="is_show = !is_show">show</button>
        <button @click="print">print</button>
    </div>
</template>
<script>
    export default {
        components: {

        },
        data() {
            return {
                lst: [],
                is_show: true,
            }
        },
        watch: {

        },
        created() {
            this.lst = [1, 2];
        },
        mounted() {

        },
        computed: {

        },
        methods: {
            inputHandle() {
                console.log('input');
            },
            changeHandle() {
                console.log('change');
            },
            print() {
                console.log(this.lst);
            }
        }
    }
</script>
