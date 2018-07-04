<style>
</style>
<template>
    <div>
        <button @click="fullScreen">full screen</button>
        <fullscreencontainer v-model="is_full_screen">
            <div>
                this is just a test
            </div>
        </fullscreencontainer>
    </div>
</template>
<script>
    import fullscreencontainer from './fullscreencontainer'

    export default {
        components: {
            fullscreencontainer,
        },
        data() {  
            return {
                is_full_screen: false,
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
            fullScreen() {
                this.is_full_screen = true;
            }
        }
    }
</script>