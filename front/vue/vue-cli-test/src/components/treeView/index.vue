<style>
</style>
<template>
    <div>
        <input type="text" @change="changeHandle">
        <tree-view :data_obj="tree_data_obj" :level="0" :search_value="search_value" search_key="label">
        </tree-view>
    </div>
</template>
<script>
    import treeView from './treeView';

    export default {
        components: {
            treeView
        },
        data() {
            return {
                tree_data_obj: {
                    data: {
                        value: '',
                        label: '',
                    },
                    children: [
                        {
                            data: {
                                value: 1,
                                label: 'test',
                            },
                            children:[
                                {
                                    data: {
                                        value: 2,
                                        label: 'test2',
                                    },
                                    children: [
                                        {
                                            data: {
                                                value: 3,
                                                label: 'test3',
                                            }
                                        },
                                        {
                                            data: {
                                                value: 4,
                                                label: 'test6',
                                            }
                                        },
                                    ]
                                },
                                {
                                    data: {
                                        value: 5,
                                        label: 'test5',
                                    }
                                },
                            ]
                        },
                        {
                            data: {
                                value: 1,
                                label: 'test',
                            },
                            children:[
                                {
                                    data: {
                                        value: 2,
                                        label: 'test2',
                                    },
                                    children: [
                                        {
                                            data: {
                                                value: 3,
                                                label: 'test3',
                                            }
                                        },
                                        {
                                            data: {
                                                value: 4,
                                                label: 'test4',
                                            }
                                        },
                                    ]
                                },
                                {
                                    data: {
                                        value: 5,
                                        label: 'test5',
                                    }
                                },
                            ]
                        },
                    ],
                },
                search_value: '',
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
            changeHandle(evt) {
                this.search_value = evt.target.value;
            }
        }
    }
</script>
