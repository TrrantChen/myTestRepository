<style>
    .json-pre {
        text-align: start;
    }
</style>
<template>
    <div>
        <div>
            <button @click="showAndExpend">show</button>
            <pre class="json-pre">{
                    <div v-show="is_show">
                        <span class="key">"similar_score":</span> <span class="number">69</span>,
                        <span class="key">"mac_code":</span> <span class="string">"8262282B-2456-4EBF-907F-16AFA9F2256F"</span>,
                        <span class="key">"uid":</span> <span class="number">100814</span>,
                        <span class="key">"result":</span> <span class="number">0</span>,
                        <span class="key">"similar_mac_code":</span> <span class="string">"843F71E3-F6B1-4022-B581-50D97746AC30"</span>,
                        <span class="key">"channel_id":</span> <span class="number">3021</span>
                    </div>
                    <div v-show="!is_show">
                        <span>....</span>
                    </div>
                }
            </pre>
        </div>
    </div>
</template>
<script>
    export default {
        components: {
            
        },
        data() {  
            return {
                is_show: false,
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
            showAndExpend() {
                this.is_show = !this.is_show;
            }
        }
    }
</script>