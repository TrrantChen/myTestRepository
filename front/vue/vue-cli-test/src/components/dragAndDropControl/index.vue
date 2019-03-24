<style>
</style>
<template>
    <div>
        <div id="other" draggable="true" style="width:100px;height:100px;border:1px solid black;">

        </div>
        <div id="source" style="width:100px;height:100px;border:1px solid black;">
            test
        </div>
        <div id="target" style="width:500px;height:500px;border:1px solid black;">

        </div>

    </div>
</template>
<script>
    import DragAndDropController from '@/components/dragAndDropControl/dragAndDropController';

    export default {
        components: {

        },
        data() {
            return {

            }
        },
        watch: {

        },
        created() {

        },
        mounted() {
            let other = document.querySelector('#other');
            let source = document.querySelector('#source');
            let target = document.querySelector('#target');
            let dragAndDropController = new DragAndDropController(source, target, this, 'ddddd');
            dragAndDropController.setDropCallback((data, dom) => {
                target.innerHTML = data;
            });

            other.addEventListener('dragstart', (evt) => {

            })
        },
        computed: {

        },
        methods: {

        }
    }
</script>
