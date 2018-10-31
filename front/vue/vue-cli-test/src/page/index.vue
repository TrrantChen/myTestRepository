<style>
</style>
<script>
    import HelloWorld from '@/components/helloworld';
    import JsxTest from '@/components/jsxTest/index';
    import AddDeleLstTest from '@/components/addDeleLst/addDeleLstTest';
    import MultComCheckBox from '@/components/multComCheckBox/index';
    import Testparentsonobj from '@/components/test4parentsonobj/index';
    import WatchTest from '@/components/watchTest/index';
    import DoubleFormTest from '@/components/doubleFormTest/index';
    import AsyncStore from '@/components/asyncStore/index'
    import UseGlobalComponents from '@/components/globalComponents/useGlobalComponents'
    import Scrolltest from '@/components/scrolltest/scrolltest'
    import AutoFillWidth from '@/components/autoFillWidth/autoFillWidth'
    import Test from '@/components/test'
    import ActiveComponent from '@/components/activeComponent/index'
    import CodeMirrorTest from '@/components/codeMirrorTest/index'
    import Jsbeautiful from '@/components/jsbeautiful/index'
    import MutpleScroll from '@/components/mutpleScroll/index'
    import AsyncawaitTest from '@/components/asyncawaitTest/index'
    import MutualSelect from '@/components/mutualSelect/index'
    import WrapFunc from '@/components/wrapFunc/index'
    import SpanLst from '@/components/spanLst/index'
    import FileUpload from '@/components/fileUpload/index'
    import deepWatch from '@/components/deepWatchTest/index'
    import parentAllEvent from '@/components/parentAllEvent/index'
    import directiveTest from '@/components/directiveTest/index'
    import jsonView from '@/components/jsonView/index'
    import deleSubLst from '@/components/deleSubLst/index'
    import watchAndComputedOrder from '@/components/watchAndComputedOrder/index'
    import expand from '@/components/expand/index'
    import objView from '@/components/objView/index';
    import collapse from '@/components/collapse/index'
    import inputrequire from '@/components/inputrequire/index'
    import echartTest from '@/components/echartTest/index'
    import slider from '@/components/slider/index'
    import fullscreencontainer from '@/components/fullscreen/index'
    import jtopo from '@/components/jtopo/index'
    import movescrollbar from '@/components/moveScrollBar/index'
    import dragAndChange from '@/components/dragAndChange/index'
    import awaitWatchTest from '@/components/awaitWatchTest/index'
    import tableFillData from '@/components/tableFillData/index'

    export default {
        that: this,
        components: {
            tableFillData,
            Test,
            CodeMirrorTest,
            awaitWatchTest,
            dragAndChange,
            movescrollbar,
            jtopo,
            fullscreencontainer,
            slider,
            echartTest,
            inputrequire,
            collapse,
            objView,
            expand,
            HelloWorld,
            JsxTest,
            AddDeleLstTest,
            MultComCheckBox,
            Testparentsonobj,
            WatchTest,
            DoubleFormTest,
            AsyncStore,
            UseGlobalComponents,
            Scrolltest,
            AutoFillWidth,
            ActiveComponent,
            Jsbeautiful,
            MutpleScroll,
            AsyncawaitTest,
            MutualSelect,
            WrapFunc,
            SpanLst,
            FileUpload,
            deepWatch,
            parentAllEvent,
            directiveTest,
            jsonView,
            deleSubLst,
            watchAndComputedOrder,
        },
        data() {
            return {
                show_lst: [],
            }
        },
        created() {
            let components = this.$options.that.a.components;
            let componentNames = Object.keys(components);


            for (var i = 0, length = componentNames.length; i < length; i++) {
                if (i === 0) {
                    this.show_lst.push(true);
                } else {
                    this.show_lst.push(false);
                }
            }
        },
        render() {
            let components = this.$options.that.a.components;
            let componentNames = Object.keys(components);
            let result = [];

            for (let i = 0, length = componentNames.length; i < length; i++) {
                let Component = componentNames[i];
                let name = componentNames[i].replace(/[A-Z]/g, (e) => {
                    return " " + e.toLowerCase()
                });

                let item = null;

                if (name === 'echart test') {
                    item = (<div>
                        <button class="btnStyle" onClick={() => {
                            this.show_lst.splice(i, 1, !this.show_lst[i])
                        }}>{name}</button>
                        {/* <button class="btnStyle" on-click={ this.clickHandle.bind(this, i) }>{name}</button> */}
                        {/* 方法调用的两种方式 */}
                        {/* 这是注释 */}
                        {this.show_lst[i] ? (<Component></Component>) : ''}
                    </div>);
                } else {
                    item = (<div>
                        <button class="btnStyle" onClick={() => {
                            this.show_lst.splice(i, 1, !this.show_lst[i])
                        }}>{name}</button>
                        {/* <button class="btnStyle" on-click={ this.clickHandle.bind(this, i) }>{name}</button> */}
                        {/* 方法调用的两种方式 */}
                        {/* 这是注释 */}
                        {this.show_lst[i] ? (<Component></Component>) : ''}
                    </div>);
                }

                result.push(item);
            }

            return (
                <div>
                    {result}
                </div>
            )
        },
        methods: {
            clickHandle(index) {
                this.show_lst.splice(index, 1, !this.show_lst[index]);
            }
        }
    }
</script>
