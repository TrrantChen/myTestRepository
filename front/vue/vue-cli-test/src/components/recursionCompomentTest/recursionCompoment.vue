<style scoped>
    table {
        outline: solid 1px black;
        width: 100%;
    }
</style>
<template>
    <div>
        <table>
            <tbody>
                <template v-for="obj of lst">
                    <tr >
                        <template v-for="detail_data of obj.detail_data_list">
                            <td>{{ detail_data.data }}</td>
                        </template>
                    </tr>
                    <tr v-if="obj.children_list">
                        <td :colspan="obj.detail_data_list.length">
                            <recursion :lst="obj.children_list || []"></recursion>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        name: 'recursion',
        components: {

        },
        props: {
            lst: {
                type: Array,
                default: function() {
                    return [];
                }
            },
        },
        data() {
            return {

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

        }
    }
</script>
