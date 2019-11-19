<template>
    <div>

    </div>
</template>
<script>

    export default {
        data() {
            return {
            }
        },
        watch: {
        },
        mounted: function() {
        },
        created() {
            this.callTheBind();
        },
        methods: {
            printThis() {
                console.log(this);
            },
            callTheBind() {
                let obj = {};
                this.printThis.bind(obj)();
            },
        },
    }
</script>
