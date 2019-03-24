<style>
</style>
<template>
    <div @click="expandOrHide($event, obj)">
        <div v-if="obj.data.level !== 0">
            <span v-html="createBlankByLevel(obj.data.level)"></span>
            <span>{{ obj.data.label }}</span>
            <span>{{ obj.data.is_expand }}</span>
        </div>
        <div v-show="obj.data.is_expand">
            <template v-for="item in obj.children">
                <tree-view :data_obj="item" :level="next_level" :search_value="search_value" :search_key="search_key"  @expand="getExpandFromChild">
                </tree-view>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'treeView',
        props: {
            data_obj: {
               type: Object,
               default: function() {
                   return {};
               }
            },
            level: {
                type: Number,
                default: 0,
            },
            search_value: {
                type: String,
                default: '',
            },
            search_key: {
                type: String,
                default: 'value',
            },
            is_deep_search: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                obj: {},
                next_level: 0,
            }
        },
        watch: {
            'search_value': {
                handler: function(val, old_val) {
                    if (val !== old_val && val !== '') {
                        this.search();
                    }
                },
                immediate: true,
            },
        },
        created() {
            this.next_level = this.level + 1;
            let tmp = JSON.parse(JSON.stringify(this.data_obj));
            tmp.data.level = this.level;
            tmp.data.is_expand = tmp.data.level === 0;
            this.obj = tmp;
        },
        mounted() {
        },
        computed: {

        },
        methods: {
            createBlankByLevel(level) {
               return new Array(level).fill('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;').join('');
            },
            expandOrHide(evt, item) {
                evt.stopPropagation();
                if (item.data.level === 0) {
                    item.data.is_expand = true;
                } else {
                    item.data.is_expand = !item.data.is_expand;
                }
            },
            getExpandFromChild(is_expand) {
                if (is_expand) {
                    this.obj.data.is_expand = true;
                    this.$emit('expand', true);
                }
            },
            search() {
                if (this.obj.data[this.search_key] === this.search_value) {
                    this.$emit('expand', true);
                }
            }
        }
    }
</script>
