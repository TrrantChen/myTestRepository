<style scoped>
    body, html {
        width: 100%;
        height: 100%;
    }
    div .my_div {
        height: 100px;
        width: 100px;
        background: red;
    }

    .my_div:hover {
        background: green;
    }

    .auto-report .rich-select-wrapper {
        width: 188px;
    }

    .rich-select-wrapper {
        position: relative;
    }

    .rich-select-wrapper .select-input {
        position: relative;
        min-height: 35px;
    }

    .rich-select-wrapper .select-input input.form-control[readonly] {
        background-color: #fff;
    }

    .rich-select-wrapper .select-input.multiple input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .rich-select-wrapper .select-input input {
        position: relative;
        padding: 6px 20px 6px 12px;
        user-select: none;
    }

    .form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {
        background-color: #f3f3f3;
        opacity: 1;
        color: #5a5a5a;
    }

    .form-control {
        width: 100%;
        box-sizing: border-box;
        height: 35px;
        padding: 6px 12px;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 3px;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }

    .form-control, output {
        display: block;
        font-size: 14px;
        line-height: 1.5;
        color: #657180;
    }

    .rich-select-wrapper .select-tags {
        position: relative;
        padding: 3px 18px 2px 2px;
    }


    .text-overflow, .text-overflow-2 {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .text-nowrap, .text-overflow {
        white-space: nowrap;
    }

    .rich-select-wrapper .select-tags .select-tag {
        display: inline-block;
        background-color: #ECF7FF;
        color: #20a0ff;
        margin: 3px 0 3px 6px;
        padding: 0 5px;
        height: 24px;
        line-height: 22px;
        font-size: 12px;
        border-radius: 2px;
        box-sizing: border-box;
        border: 1px solid rgba(32,160,255,.2);
        white-space: nowrap;
    }

</style>
<template>
    <div>
        <div style="width:150px;">
            <div class="rich-select-wrapper">
                <div class="select-input multiple">
                    <input type="text" readonly="readonly" placeholder="" class="form-control">
                    <div class="select-tags text-overflow">
                        <div class="text-overflow" style="white-space: nowrap;">
                            <span class="select-tag">电商采蛋流程<i class="iconfont i-delete"></i></span>
                            <span class="select-tag">商户渠道投放授信<i class="iconfont i-delete"></i></span>
                            <span class="select-tag">爱奇艺H5现金贷<i class="iconfont i-delete"></i></span>
                            <span class="select-tag">爱奇艺现金贷<i class="iconfont i-delete"></i></span>
                            <span class="select-tag">申卡提额<i class="iconfont i-delete"></i></span>
                        </div>
                    </div>
                    <i class="iconfont i-delete"></i> <span class="icon"></span>
                </div>
            </div>
        </div>

        <div  v-rich-selector-hover>
            <ul v-for="value of lst">
                <li>{{ value }}</li>
            </ul>
        </div>

        <button @click="add">add</button>
    </div>
</template>
<script>
    import richSelectorHover from '../../directive/richSelectorHover';
    import Vue from 'vue'
    Vue.use(richSelectorHover);

    export default {
        components: {

        },
        data() {
            return {
                lst: [1, 2, 3],
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
            add() {
                this.lst.push(4);
            },
        }
    }
</script>
