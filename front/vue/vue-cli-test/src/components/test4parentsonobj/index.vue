<style>
</style>
<template>
    <div>

        <div v-for="message_obj in message_obj_arr">
            <span>{{ message_obj.is_default }}</span>
        </div>
        <div>================================</div>
        <!--<div v-for="message_obj in message_obj_arr">-->
            <!--<son  :obj="message_obj"></son>-->
        <!--</div>-->
        <son  :obj="message_obj_arr"></son>
        <son  :obj="message_obj_arr"></son>
        <son  :obj="message_obj_arr"></son>
    </div>
</template>
<script>
    import Son from './son';

    export default {
        components: {
            Son,
        },
        data() {  
            return {  
                message_obj_arr: [
                    {
                        is_default: false,
                    },
                    {
                        is_default: false,
                    },
                ]
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
        
        }
    }
</script>