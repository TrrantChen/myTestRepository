<!--<template>-->
<!--    <div>-->
<!--        <router-link to="../page1">page1</router-link>-->
<!--        <button @click="toPage2">page2</button>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "index",-->
<!--        create: {-->

<!--        },-->
<!--        methods: {-->
<!--            toPage2() {-->
<!--                this.$router.push({ path: 'page2' });-->
<!--            },-->
<!--        },-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
    <div id="main" ref="main" :style="{ width: width, height: height }"></div>
</template>
<script>
    import { addResize } from './util';

    export default {
        props: {
            is_show: {
                type: Boolean,
                default: true,
            },
            option: {
                type: [Object, Promise],
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
                if (this.myChart) {
                    this.myChart.showLoading();
                }


                if (val instanceof Promise) {
                    val.then((value) => {
                        this.changeOprion(value);
                    })
                }
                else if (val !== oldVal && val) {
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

                        addResize(main, () => {
                            that.myChart.resize();
                        });

                        that.$emit('onsetchart', that.myChart);

                        setTimeout(() => {

                            if (that.option instanceof Promise) {
                                that.option.then((val) => {
                                    that.myChart.setOption(val);
                                })
                            }
                            else {
                                that.myChart.setOption(that.option);
                            }

                        });

                        window.addEventListener('resize', that.resizeHandle);
                        isExecuted = true;
                    }
                }
            },
            changeOprion(val) {
                setTimeout(() => {
                    if (this.myChart !== void 0 && this.myChart !== null) {
                        this.myChart.clear();
                        this.myChart.setOption(val);
                        this.myChart.hideLoading();
                    }
                });
            },
            resizeHandle() {
                this.myChart.resize();
            },
        }
    }
</script>
