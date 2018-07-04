<script>
    import exp from './exp2'
    import another from './another'

    export default {
        components: {
            exp,
            another,
        },
        that: this,
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

        },
        render(h) {
            let components = this.$options.that.a.components;
            let componentsNames = Object.keys(components);
            let items = componentsNames.map((Component) => {
                return <Component></Component>
            });

            return (
                <div>
                    <h3>load component by id</h3>
                    { items }
                </div>
            )

            // let ComponentName = 'exp';
            // return  (
            //     <div>
            //         <h3>load component by id</h3>
            //         <ComponentName></ComponentName>
            //     </div>
            // )

            // let components = this.$options.that.a.components;
            // let componentsNames = Object.keys(components);
            // return h("div", null, [h("h3", null, ["load component by id"]), h(componentsNames[0], null, [])]);
        }
    }
</script>