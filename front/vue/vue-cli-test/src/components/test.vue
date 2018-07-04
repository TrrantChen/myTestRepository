<template>
    <div>
        <div @change="changeHandle" @blur="blurHandle">
            <input type="text">
            <div v-for="(data1, index1) in lst1">
                <div v-for="(data2, index2) in lst2">
                    <span>{{ index1 }}</span>
                    <span>{{ index2 }}</span>
                </div>
            </div>
        </div>
        <input type="checkbox"   true-value="1"
               false-value="0" v-model.number="check_test">
        {{ check_test }}
    </div>

</template>
<script>
    /*
        用于测试一些js方法库
     */
    import * as util from '@/util.js'

    import 'lodash/core'
    import 'lodash/lang'

    export default {
        data() {
            return {
                msg: 'this is msg',
                lst1: [1, 2, 3],
                lst2: [4, 5],
                check_test: 1,
            }
        },
        created() {
            this.autoAction();
        },
        methods: {
            changeHandle() {
                alert("change");
            },
            blurHandle() {
                alert("blur");
            },
            arrayIsEqual() {
                let a = [1, 2];
                let b = [1, 2];

                alert(_.isEqual(a, b));
            },
            autoAction() {
                let timeID = setTimeout(() => {
                    try {
                        callback();
                        this.autoAction();
                    } catch(e) {
                        clearTimeout(timeID);
                        console.log('autoAction is error');
                        console.log(e);
                    }
                }, 1000);
            }
        },
        mounted() {
            window.addEventListener('click', () => {
                alert('test');
            })
        }
    }
</script>