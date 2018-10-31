<style>
</style>
<template>
    <div style="background: red; height:300px;width:500px;">
        <!--<test-component :lst="lst"></test-component>-->
    </div>
</template>
<script>
    import TestComponent from './testComponent';

    export default {
        components: {
            TestComponent,
        },
        data() {
            return {
                lst: [],
                tmp: '',
            }
        },
        watch: {
            lst: function(val, old_val) {
                this.tmp = val[val.length - 1];
                console.log('lst');
            },
            tmp: function(val, old_val) {
                if (val !== old_val) {
                    console.log('tmp');
                }
            }
        },
        created() {
            this.createLst();
        },
        mounted() {

        },
        computed: {

        },
        methods: {
            async createLst() {
                for (let i = 0; i < 6; i++) {
                    // let value = await this.getData(i);
                    // this.lst.push(value);
                    this.lst.push(i);
                }
            },
            getData(i) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(i)
                    })
                })
            }
        }
    }
</script>
