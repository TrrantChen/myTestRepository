<style>
</style>
<template>
    <div>
        <span>child {{ text }}</span>
    </div>
</template>
<script>
    import child from './child';
    export default {
        components: {
            child
        },
        props: ['count'],
        data() {
            return {
                pre: '',
            }
        },
        computed: {
            text() {
                if (this.count < 4) {
                    this.pre = this.count;
                }

                return this.pre;
            }
        },
    }
</script>
