<style>
</style>
<template>
    <div>
        <button class="btnStyle" @click="changeData">changeData</button>
        <button class="btnStyle" @click="is_show = !is_show">show</button>
        <div v-show="is_show" style="width:100%">
            <echartComponent :is_show="is_show" :width="'100%'" :option="option"></echartComponent>
        </div>
    </div>
</template>
<script>
    import { getRandomArbitrary } from '@/util.js';
    import echartComponent from './echartComponent';

    export default {
        components: {
            echartComponent,
        },
        data() {  
            return {
                chartData: [],
                is_show: false,
            }
        },
        created() {
            this.chartData = this.createData();
        },
        computed: {
            option: function() {
                return  {
                    series: [{
                        type: 'treemap',
                        leafDepth: 2,
                        data: [
                            {
                                "name":"10.00 20% tt",
                                "report_id":1,
                                "value":1000,
                                "tmp_data":[
                                    "tt",
                                    1000,
                                    222,
                                    20,
                                    1211,
                                    1121
                                ],
                                "children":[
                                    {
                                        "name":"8.00 23% fdff",
                                        "report_id":2,
                                        "value":800,
                                        "tmp_data":[
                                            "fdff",
                                            800,
                                            200,
                                            23,
                                            1231,
                                            1232
                                        ],
                                        "children":[
                                            {
                                                "name":"6.00 42% dasda",
                                                "report_id":4,
                                                "value":600,
                                                "tmp_data":[
                                                    "dasda",
                                                    600,
                                                    232,
                                                    42,
                                                    12312,
                                                    123
                                                ]
                                            },
                                            {
                                                "name":"2.00 43% opopo",
                                                "report_id":5,
                                                "value":200,
                                                "tmp_data":[
                                                    "opopo",
                                                    200,
                                                    2324,
                                                    43,
                                                    23123,
                                                    123
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name":"2.00 24% dasd",
                                        "report_id":3,
                                        "value":200,
                                        "tmp_data":[
                                            "dasd",
                                            200,
                                            213,
                                            24,
                                            21312,
                                            3123
                                        ],
                                        "children":[
                                            {
                                                "name":"1.00 12% d98jh",
                                                "report_id":6,
                                                "value":100,
                                                "tmp_data":[
                                                    "d98jh",
                                                    100,
                                                    78123,
                                                    12,
                                                    2198,
                                                    32131
                                                ]
                                            },
                                            {
                                                "name":"1.00 10% wqjk",
                                                "report_id":7,
                                                "value":100,
                                                "tmp_data":[
                                                    "wqjk",
                                                    100,
                                                    2131,
                                                    10,
                                                    2131,
                                                    123111
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }]
                };
            }
        },
        methods: {
            changeData() {
                this.chartData = this.createData();
            },
            createData() {
                return [{
                    name: 'nodeA',            // First tree
                    value: 10,
                    children: [{
                        name: 'nodeAa',       // First leaf of first tree
                        value: 4
                    }, {
                        name: 'nodeAb',       // Second leaf of first tree
                        value: 6
                    }]
                }, {
                    name: 'nodeB',            // Second tree
                    value: 20,
                    children: [{
                        name: 'nodeBa',       // Son of first tree
                        value: 20,
                        children: [{
                            name: 'nodeBa1',  // Granson of first tree
                            value: 20
                        }]
                    }]
                }]
            },
        }
    }
</script>