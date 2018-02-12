<style>
</style>
<template>
    <div style="width:100px;height:100px;border:solid 5px black;" @mousedown="mousedownHandle">
        <div style="border:solid 5px yellow;color: white;">
            {{ msg }}
        </div>

    </div>
</template>
<script>
    export default {
        components: {
            
        },
        data() {  
            return {
                msg: 'this is son components'
            }
        },
        methods: {
            print() {
                console.log(this.msg);
            },
            mousedownHandle() {
                console.log('this is so component');
            }
        }
    }
</script>