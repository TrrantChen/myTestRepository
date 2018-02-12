<style>
</style>
<template>
    <div>
        <textarea ref="textArea" cols="30" rows="10" :value="value"></textarea>
        <button @click="format">test</button>
    </div>
</template>
<script>
    import beautify from 'js-beautify';

    export default {
        methods: {
            format() {
                let txt = this.$refs.textArea.value;
                this.$refs.textArea.value = beautify(txt, { indent_size: 2, space_in_empty_paren: true });
            }
        }
    }
</script>