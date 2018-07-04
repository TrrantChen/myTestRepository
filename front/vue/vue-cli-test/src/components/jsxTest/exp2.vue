<script>
    import sub_component from './sub'

    export default {
        components: {
            sub_component,
        },
        data() {  
            return {  
                msg: 'jsx test',
                input_test: '',
                lst: [1, 2, 3],
                component_name: 'sub_component',
            }
        },
        render() {
            let item = this.lst.map((value) => {
                return <div>{value}</div>
            });

            return  <div>
                        {this.msg}
                        <input type="text" v-model={this.input_test}/>
                        <div>{ this.input_test }</div>
                        <button onClick={ this.del.bind(this, item.length - 1) }>del</button>
                        {item}
                    </div>
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
            del(index) {
                this.lst.splice(index, 1);
            }
        }
    }
</script>