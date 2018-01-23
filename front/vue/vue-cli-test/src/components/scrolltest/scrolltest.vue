<style>
    .outter {
        width:200px;
        height: 200px;
        border: solid 1px white;
        overflow-y: auto;
    }

    .inner {
        width: 100%;
        height: 1000px;
    }
</style>
<template>
    <div>
        <div class="outter">
            <div class="inner">

            </div>
        </div>
        <button @click="scroll">scroll</button>
    </div>
</template>
<script>
    export default {
        methods: {
            scroll() {

            },
        }
    }
</script>