<style>
    .full-screen-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .full-screen-action {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: auto;
        z-index: 9;
        background: rgba(0, 0, 0, 0.5);
    }

    .exit-full-screen-button {
        position: absolute;
        top: -40px;
        right: -40px;
        width: 80px;
        height: 80px;
        cursor: pointer;
        border-radius: 50%;
        background-color: #000;
        z-index: 9;
    }

    .exit-full-screen-button>span {
        color: #ffffff;
        position: absolute;
        bottom: 15px;
        left: 15px;
        font-size: 12px;
    }

</style>
<template>
    <div class="full-screen-container" :class="{ 'full-screen-action': value }">
        <div @click="exitFullScreen" v-show="value" class="exit-full-screen-button"><span>X</span></div>
        <slot>
        </slot>
    </div>
</template>
<script>
    export default {
        components: {
            
        },
        props: {
            value: {
                type: Boolean,
                defualt: false,
            }
        },
        watch: {
            value: function(val, old_val) {
                if (val !== old_val) {
                    if (val) {
                        document.documentElement.style.overflow = "hidden";
                    } else {
                        document.documentElement.style.overflow = "";
                    }
                }
            }
        },
        methods: {
            exitFullScreen() {
                this.$emit('input', false);
            }
        }
    }
</script>