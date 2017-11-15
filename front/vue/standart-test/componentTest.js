/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-11-03 14:48:49
 * @version $Id$
 */


let switchComponentTemplate = `
<span class="switch-outer" @click = "switchHandle">
    <span class="switch-inner" >{{ checkText }} </span>
</span>

`;

let switchComponent = {
    props: ['check_text', 'uncheck_text', 'is_check'],
    data() {
        return {
            is_check_inner: true,
            test_model: "fff",
        }
    },
    computed: {
        checkText() {
            return this.is_check_inner ? this.check_text : this.uncheck_text;
        },
    },
    template: switchComponentTemplate,
    methods: {
        switchHandle() { 
            debugger
            console.log(this.test_model);
            this.is_check_inner = !this.is_check_inner;
            this.$emit('switch_change', [this.is_check_inner]);
        },
    },
};

let componentTest = new Vue({
    el: "#componentTest",
    data: {
        inputValue: "",
    },
    methods: {
        switchChangeHandle(argArr) {
            let isSwitch = argArr[0];
            console.log(isSwitch);
        },
    },
    components: {
        "switchComponent": switchComponent,
    }
});
