<style>
</style>
<template>
    <div>
        <button @click="is_show = !is_show">show</button>
        <!--<div v-if="is_show">-->
        <div>
            <select v-model="select_value">
                <option value=""></option>
                <option :value="value" v-for="value in lst">{{ value }}</option>
            </select>
            <span style="color:white;" >{{ select_value }}</span>
            <button @click="lst.push(4)">add</button>
            <ul v-for="(data, index) in lst" v-test-directive="{ key: lst, other: is_show}">
                <li>
                    {{ data }}<button @click="remove(index)">remove</button>
                </li>
            </ul>
        </div>

    </div>
</template>

<!--el：指令所绑定的元素，可以用来直接操作 DOM 。-->
<!--binding：一个对象，包含以下属性：-->
<!--name：指令名，不包括 v- 前缀。-->
<!--value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。-->
<!--oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。-->
<!--expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。-->
<!--arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。-->
<!--modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。-->
<!--vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。-->
<!--oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。-->
<script>
    import testDirective from '../../directive/testDirective';
    import Vue from 'vue'
    Vue.use(testDirective);

    export default {
        components: {

        },
        data() {
            return {
                lst: [1, 1, 2, 3],
                select_value: '',
                is_show: false,
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
            remove(index) {
                this.lst.splice(index, 1);
            }
        }
    }
</script>
