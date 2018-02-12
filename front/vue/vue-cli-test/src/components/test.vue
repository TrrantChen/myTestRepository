<template>
    <div>
        {{ msg }}
    </div>
</template>
<script>
    /*
        用于测试一些js方法库
     */
    import * as util from '@/util.js'

    export default {
        name: "test",
        data() {
            return {
                msg: 'this is msg',
            }
        },
        methods: {
            testFunc(str1, str2) {
                console.log(str1);
                console.log(str2);
            }
        },
        created() {
            let first = true;
            util.loadPattener(first, this.testFunc.bind(this, 'this is test', 'this is test2'));
        },
    }
</script>