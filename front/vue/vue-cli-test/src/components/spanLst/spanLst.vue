<style scoped>
    .span-lst-container {
        position: relative;
        border: solid 1px black;

    }

    .span-lst-ul {
        list-style-type: none;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .span-lst-li {
        color: rgba(0, 0, 0, 0.65);
        background-color: #fafafa;
         padding: 0px 10px;
        border: 1px solid #e8e8e8;
        border-radius: 2px;
        height: 24px;
        line-height: 22px;
        max-width: 99%;
        overflow: hidden;
        margin-right: 4px;
        margin-top:2px;
    }

    .span-lst-span:hover {
        cursor: pointer;
    }

    .span-lst-data {
        display:inline-block;
    }

</style>
<template>
    <div class="span-lst-container">
        <ul class="span-lst-ul">
            <li class="span-lst-li" v-for="data, index in lst">
                <div class="span-lst-data">{{ data }}</div>
                <span class="span-lst-span" @click="deleSpan(index)">x</span>
            </li>
            <li class="span-lst-li" v-if="is_show_input">
                <input type="text">
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        model: {
            prop: 'lst',
        },
        props: {
            lst: {
                type: Array,
                default: [],
            },
            value: {
                type: String,
                default: '',
            },
            is_show_input: {
                type: Boolean,
                default: false,
            }
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
        
        },
        computed: {
        
        },
        methods: {
            deleSpan(index) {
                this.lst.splice(index, 1);
            }
        }
    }
</script>