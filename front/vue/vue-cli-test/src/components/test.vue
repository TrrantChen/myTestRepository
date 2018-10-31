<template>
    <div class="k-main">
        <div class="k-container container-demo animate-all"  style="max-width: calc(100% - 224px);">
            <div>
                <select required v-model="obj.name" class="form-control" @change="changeHandle">
                    <option value="">--请选择--</option>
                    <option :value="item" v-for="item in obj_lst">{{ item }}</option>
                    <!--<option :value="key" v-for="(value, key) in obj_lst">{{ key }}</option>-->
                </select>
                {{ obj.name }}
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                obj: {
                    name: 'DB',
                },
                obj_lst: []
            }
        },
        watch: {
        },
        mounted: function() {
            // this.obj_lst = {
            //     'DB': 'ffff'
            // };


        },
        created() {
            setTimeout(() => {
                this.obj_lst = ['DB']
            }, 2000)
        },
        methods: {
            changeHandle() {
                console.log('this is change');
            }
        },
    }
</script>
