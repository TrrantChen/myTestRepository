<style>
    .outter {
        width: 600px;
    }
    .container {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        box-sizing: border-box;
        height: 35px;
        padding: 6px 12px;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 3px;
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }

    .left {
        flex: 1;
        height: 100%;
        background: red;
    }

    .right {
        width: 10px;
        height: 100%;
        background: green;
    }

    input {
        min-width: 0;
    }

    focus_style:focus {
        background: red;
    }
</style>
<template>
    <div class="outter">
        <select v-model="msg">
            <option :value="data.value + ',' + data.name" v-for="data in lst">{{ data.value }}</option>
        </select>
        {{ msg }}
    </div>
</template>
<script>
    export default {
        components: {
        },
        data() {  
            return {
                msg: '',
                lst: [
                    {
                        value: 'a',
                        num: '1',
                        name: 'c',
                    },
                    {
                        value: 'b',
                        num: '2',
                        name: 'c',
                    },
                    {
                        value: 'c',
                        num: '3',
                        name: 'c',
                    }
                ]
            }
        },
        methods: {

        }
    }
</script>