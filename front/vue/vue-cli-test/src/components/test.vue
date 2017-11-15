<template>
    <td><input type="text" :value="value" @input="inputHandle"></td>
</template>
<script>
    export default {
        pros: {
            value: '',
        },
        name: "test",
        methods: {
            inputHandle(evt) {
                this.$emit("input", evt.target.value);
            },
        },
    } 
</script>