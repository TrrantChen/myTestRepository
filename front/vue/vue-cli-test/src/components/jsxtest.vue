<style>
</style>
<script>
    export default {
        myself_option: 'just for test',
        components: {
            
        },
        render(createElement) {
            // create kebabCase id
            let headingId = this.getChildrenTextContent(this.$slots.default)
                .toLowerCase()
                .replace(/\W+/g, '-')
                .replace(/(^\-|\-$)/g, '');

            console.log(headingId);

            return createElement(
                'h' + this.level,
                [
                    createElement('a', {
                        attrs: {
                            name: headingId,
                            href: '#' + headingId
                        }
                    }, this.$slots.default)
                ]
            )
        },
        data() {  
            return {  
                message: 'test_message',
            }
        },
        props: {
            level: {
                type: Number,
                required: true
            }
        },
        watch: {
        
        },
        created() {
            this.printMySelfOption();
        },
        mounted() {
        
        },
        computed: {
        
        },
        methods: {
            printMySelfOption() {
                console.log(this.$options.myself_option);
            },
            getChildrenTextContent(children) {
                return children.map(function (node) {
                    return node.children
                        ? this.getChildrenTextContent(node.children)
                        : node.text
                }).join('')
            }
        }
    }

</script>