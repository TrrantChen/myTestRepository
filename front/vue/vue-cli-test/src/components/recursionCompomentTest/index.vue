<style>
</style>
<template>
    <div>
        <recursion :lst="lst"></recursion>
    </div>
</template>
<script>
    import recursion from './recursionCompoment';
    export default {
        components: {
            recursion,
        },
        data() {
            return {
                lst:  [
                    {
                        "index_name" : "授信申请用户数", //指标的名称，用于前端排序
                        "detail_data_list" : [
                            {
                                data : "授信申请用户数"
                            },
                            {
                                "data" : "12345",
                                "data_type" : 1
                            },
                            {
                                "data" : "22.33",
                                "data_type" : 2
                            }
                        ],
                        //子数据，目前只有两层子数据
                        "children_list" : [
                            {
                                "detail_data_list" : [
                                    {
                                        "data" : "线上"
                                    },
                                    {
                                        "data" : "12345",
                                        "data_type" : 1
                                    },
                                    {
                                        "data" : "22.33",
                                        "data_type" : 2
                                    }
                                ],
                                "children_list" : [
                                    {
                                        "detail_data_list" : [
                                            {
                                                "data" : "广告及合作"
                                            },
                                            {
                                                "data" : "12345",
                                                "data_type" : 1
                                            },{
                                                "data" : "1.23",
                                                "data_type" : 2
                                            }
                                        ]
                                    },
                                    {
                                        "detail_data_list" : [
                                            {
                                                "data" : "自然流量"
                                            },
                                            {
                                                "data" : "12345",
                                                "data_type" : 1
                                            },{
                                                "data" : "1.23",
                                                "data_type" : 2
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "detail_data_list" : [
                                    {
                                        "data" : "线下"
                                    },
                                    {
                                        "data" : "12345",
                                        "data_type" : 1
                                    },
                                    {
                                        "data" : "22.33",
                                        "data_type" : 2
                                    }
                                ],
                                "children_list" : [
                                    {
                                        "detail_data_list" : [
                                            {
                                                "data" : "乐卡授信"
                                            },
                                            {
                                                "data" : "12345",
                                                "data_type" : 1
                                            },{
                                                "data" : "1.23",
                                                "data_type" : 2
                                            }
                                        ]
                                    },
                                    {
                                        "detail_data_list" : [
                                            {
                                                "data" : "大额授信"
                                            },
                                            {
                                                "data" : "12345",
                                                "data_type" : 1
                                            },{
                                                "data" : "1.23",
                                                "data_type" : 2
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "index_name" : "授信通过用户数", //指标的名称，用于前端排序
                        "detail_data_list" : [
                            {
                                data : "授信通过用户数"
                            },
                            {
                                "data" : "12345",
                                "data_type" : 1
                            },
                            {
                                "data" : "22.33",
                                "data_type" : 2
                            }
                        ],
                        //子数据，目前只有两层子数据
                        "children_list" : [
                            {
                                "detail_data_list" : [
                                    {
                                        "data" : "线上"
                                    },
                                    {
                                        "data" : "12345",
                                        "data_type" : 1
                                    },
                                    {
                                        "data" : "22.33",
                                        "data_type" : 2
                                    }
                                ],
                                "children_list" : [
                                    {
                                        "detail_data_list" : [
                                            {
                                                "data" : "广告及合作"
                                            },
                                            {
                                                "data" : "12345",
                                                "data_type" : 1
                                            },{
                                                "data" : "1.23",
                                                "data_type" : 2
                                            }
                                        ]
                                    },
                                    {
                                        "detail_data_list" : [
                                            {
                                                "data" : "自然流量"
                                            },
                                            {
                                                "data" : "12345",
                                                "data_type" : 1
                                            },{
                                                "data" : "1.23",
                                                "data_type" : 2
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "detail_data_list" : [
                                    {
                                        "data" : "线下"
                                    },
                                    {
                                        "data" : "12345",
                                        "data_type" : 1
                                    },
                                    {
                                        "data" : "22.33",
                                        "data_type" : 2
                                    }
                                ],
                                "children_list" : [
                                    {
                                        "detail_data_list" : [
                                            {
                                                "data" : "乐卡授信"
                                            },
                                            {
                                                "data" : "12345",
                                                "data_type" : 1
                                            },{
                                                "data" : "1.23",
                                                "data_type" : 2
                                            }
                                        ]
                                    },
                                    {
                                        "detail_data_list" : [
                                            {
                                                "data" : "大额授信"
                                            },
                                            {
                                                "data" : "12345",
                                                "data_type" : 1
                                            },{
                                                "data" : "1.23",
                                                "data_type" : 2
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
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
