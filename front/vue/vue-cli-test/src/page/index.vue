<style>
</style>
<template>
    <div>
        <button class="btnStyle" @click="is_show1 = !is_show1">hello world</button>
        <button class="btnStyle" @click="is_show2 = !is_show2">jsx test</button>
        <button class="btnStyle" @click="is_show3 = !is_show3">add dele lst</button>
        <button class="btnStyle" @click="is_show4 = !is_show4">multi checkbox</button>
        <button class="btnStyle" @click="is_show5 = !is_show5">test 4 parent son</button>
        <button class="btnStyle" @click="is_show6 = !is_show6">watch test</button>
        <button class="btnStyle" @click="is_show7 = !is_show7">double form test</button>
        <button class="btnStyle" @click="is_show8 = !is_show8">async store</button>
        <button class="btnStyle" @click="is_show9 = !is_show9">use global components</button>
        <button class="btnStyle" @click="is_show10 = !is_show10">scroll test</button>
        <button class="btnStyle" @click="is_show11 = !is_show11">auto fill width</button>
        <button class="btnStyle" @click="is_show12 = !is_show12">test</button>
        <button class="btnStyle" @click="is_show13 = !is_show13">active component</button>
        <button class="btnStyle" @click="is_show14 = !is_show14">codemirror test</button>
        <button class="btnStyle" @click="is_show15 = !is_show15">js beautiful</button>
        <hello-world v-if="is_show1"></hello-world>
        <jsx-test v-if="is_show2" :level="1">test</jsx-test>
        <add-dele-lst-test v-if="is_show3"></add-dele-lst-test>
        <mult-com-check-box v-if="is_show4"></mult-com-check-box>
        <testparentsonobj v-if="is_show5"></testparentsonobj>
        <watch-test v-if="is_show6"></watch-test>
        <double-form-test v-if="is_show7"></double-form-test>
        <async-store v-if="is_show8"></async-store>
        <use-global-components v-if="is_show9"></use-global-components>
        <scrolltest v-if="is_show10"></scrolltest>
        <auto-fill-width v-if="is_show11"></auto-fill-width>
        <test v-if="is_show12"></test>
        <active-component v-if="is_show13"></active-component>
        <code-mirror-test v-show="is_show14"></code-mirror-test>
        <jsbeautiful v-if="is_show15"></jsbeautiful>
    </div>
</template>
<script>
    import HelloWorld from '@/components/helloworld';
    import JsxTest from '@/components/jsxtest';
    import AddDeleLstTest from '@/components/addDeleLst/addDeleLstTest';
    import MultComCheckBox from '@/components/multComCheckBox/index';
    import Testparentsonobj  from '@/components/test4parentsonobj/index';
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

    export default {
        components: {
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
            Test,
            ActiveComponent,
            CodeMirrorTest,
            Jsbeautiful,
        },
        data() {  
            return {
                is_show1: false,
                is_show2: false,
                is_show3: false,
                is_show4: false,
                is_show5: false,
                is_show6: false,
                is_show7: false,
                is_show8: false,
                is_show9: false,
                is_show10: false,
                is_show11: false,
                is_show12: false,
                is_show13: false,
                is_show14: false,
                is_show15: false,
            }
        },
        created() {
        },
    }
</script>