<style>
</style>
<template>
    <div style="margin-top: 50px;">
        <div v-for="item, index in lst2" style="margin-top: 20px;">
            <select v-model="item.value" @change="changeHandle(index, item)" @input="inputHandle(item)">
                <option value=""></option>
                <option :value="data" v-for="data in item.arr">{{ data }}</option>
            </select>
        </div>
    </div>
</template>
<script>
    export default {
        components: {
            
        },
        data() {  
            return {  
                common_lst: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                lst2: [{ value: '', arr: [], tmp: ''}, { value: '', arr: [], tmp: '' }, { value: '', arr: [], tmp: '' }, { value: '', arr: [], tmp: '' }, { value: '', arr: [], tmp: '' }],
                isOddEven: false,
            }
        },
        watch: {

        },
        created() {
            this.lst2.forEach((obj) => {
                obj.arr = this.common_lst;
            })
        },
        mounted() {
        
        },
        computed: {
        
        },
        methods: {
            inputHandle(item) {
                item.tmp = item.value;
            },
            changeHandle(index, item) {
                if (item.value !== item.tmp) {
                    let oldValue = item.tmp;

                    if (oldValue !== '') {
                        this.common_lst.push(oldValue);
                    }

                    if (item.value !== '') {
                        this.common_lst.splice(this.common_lst.indexOf(item.value), 1);
                        item.arr = this.common_lst.concat([item.value]);
                        this.lst2.forEach((obj) => {
                            if (obj.value !== '') {
                                obj.arr = this.common_lst.concat([obj.value])
                            }

                            obj.arr.sort((a, b) => { return  a > b });
                        })
                    }
                }
            },
            arrIsEqual(a, b) {
                let result = false;

                outer:if (a.length === b.length) {
                    for (var i = 0, length = a.length; i < length; i++) {
                        if (a[i] !== b[i]) {
                            break outer;
                        }
                    }
                    result = true;
                }

                return result;
            },
        }
    }

</script>

