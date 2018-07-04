<style>
</style>
<template>
    <div id="main" ref="main" :style="{ width: width, height: height }"></div>
</template>
<script>
    import * as echarts from 'echarts';

    export default {
        components: {

        },
        props: {
            is_show: {
                type: Boolean,
                default: true,
            },
            option: {
                type: Object,
                default: function() {
                    return {
                        series:[],
                    }
                }
            },
            width: {
                type: String,
                default: '600px',
            },
            height: {
                type: String,
                default: '400px',
            }
        },
        data() {
            return {
                initEchart: null,
                myChart: null,
            }
        },
        watch: {
            is_show: function(val, oldVal) {
                if (val !== oldVal && val) {
                    this.initEchart();
                }
            },
            option: function(val, oldVal) {
                if (val !== oldVal && val) {
                    this.changeOprion(val);
                }
            }
        },
        created() {
            this.initEchart = this.initEchartOne();
        },
        mounted() {
            if (this.is_show) {
                this.initEchart();
            }
        },
        beforeDestroy() {
            if (this.myChart) {
                this.myChart.dispose();
                this.myChart = null;
                window.removeEventListener('resize', this.resizeHandle);
            }
        },
        methods: {
            initEchartOne() {
                let that = this;
                let isExecuted = false;

                return function() {
                    if (!isExecuted) {
                        let main = that.$refs.main;
                        that.myChart = echarts.init(main);

                        this.$nextTick(() => {
                            that.myChart.setOption(that.option);
                        });

                        window.addEventListener('resize', that.resizeHandle);
                        isExecuted = true;
                    }
                }
            },
            changeOprion(val) {
                this.$nextTick(() => {
                    this.myChart.clear;
                    this.myChart.setOption(val);
                });
            },
            resizeHandle() {
                console.log('resize');
                this.myChart.resize();
            }
        }
    }
</script>