<style>
</style>
<template>
    <div>
        <table>
            <tbody>
                <template v-for="obj in lst">
                    <template v-if="obj.is_loading">
                        <tr>
                            <td>
                                this is loading
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr v-for="arr in obj.lst">
                            <td v-for="value in arr">
                                {{ value }}
                            </td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        components: {

        },
        data() {
            return {
                lst: [{
                    index: 1,
                    is_loading: true,
                    lst: [['']],
                }, {
                    index: 2,
                    is_loading: true,
                    lst: [['']],
                }],
            }
        },
        created() {


            setTimeout(() => {
                this.lst[1].is_loading = false;
                this.lst[1].lst = [[1, 2], [3, 4]]
            }, 2000);

            setTimeout(() => {
                this.lst[0].is_loading = false;
                this.lst[0].lst = [[5, 6], [7, 8]]
            }, 4000);
        },
        mounted() {

        },
        computed: {

        },
        methods: {

        }
    }
</script>
