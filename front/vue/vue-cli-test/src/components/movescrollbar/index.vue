<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

</style>
<template>
    <div>
        <div class="container">
            <button @click="moveLeft" style="display:inline-block;"><</button>
            <div style="display:inline-block;border:1px solid black;width:400px;height:30px;overflow:hidden;">
                <div style="background: #F6E7D3; width:1000px;height:100%;transition:all 0.1s ease-in;" :style="{ transform: 'translateX(' + index * 100 + 'px)'}">
                    <div v-for="i in lst" style="width:100px;height:100%;display: inline-block;border: 1px solid black;">
                        {{ i }}
                    </div>
                </div>
            </div>
            <button @click="moveRight" style="display:inline-block;">></button>
        </div>

    </div>
</template>
<script>
    export default {
        components: {
            
        },
        data() {  
            return {
                lst: [],
                index: 0,
            }
        },
        watch: {
        
        },
        created() {
            for (var i = 0; i < 10; i++) {
                this.lst.push(i);
            }
        },
        mounted() {
        
        },
        computed: {
        
        },
        methods: {
            moveLeft() {
                this.index--;

                if (this.index < -6 ) {
                    this.index = -6;
                }
            },
            moveRight() {
                this.index++;

                if (this.index > 0) {
                    this.index = 0;
                }
            },
        }
    }
</script>