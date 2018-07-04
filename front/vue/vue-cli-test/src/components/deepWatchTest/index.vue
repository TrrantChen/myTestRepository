<style>
</style>
<template>
    <div>
        <div v-for="(data, index) in lst" >
            <sub_component :sub_obj="data" @del="del(index)"></sub_component>
        </div>
    </div>
</template>
<script>
    import sub_component from './sub'

    export default {
        components: {
            sub_component,
        },
        data() {  
            return {  
                lst: [
                    {
                        num: 0,
                        var: [
                            {
                                sel_value: 'b',
                                name: 'hh',
                            },
                        ]

                    },
                    {
                       num: 1,
                        var: [
                            {
                                sel_value: 'c',
                                name: 'jj',
                            },
                        ]
                    },
                    {
                        num: 2,
                        var: [
                            {
                                sel_value: 'd',
                                name: 'kk',
                            },
                        ]
                    }
                ],
            }
        },
        methods: {
            del(index) {
                this.lst.splice(index, 1);
            }
        }
    }
</script>