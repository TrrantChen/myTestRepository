<style>
    tbody>tr>td {
        border: 1px solid black;
        height: 50px;
    }
</style>
<template>
    <div>
        <table style="width:100%;">
            <thead>
            <tr>
                <th>8888098098098</th>
                <th>888888098098098</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="arr of lst">
                    <td v-for="val of arr">
                        {{ val.value || '' }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        components: {

        },
        data() {
            return {
                lst: [
                    ['', ''],
                    ['', ''],
                    ['', ''],
                ]
            }
        },
        created() {
            this.query();
        },
        methods: {
            query() {
                setTimeout(() => {
                    let result = [
                        [
                            { index: 1 },
                            { value: '222' },
                        ]
                    ];

                    let head_lst = result.map((lst) => {
                        return lst[0];
                    });

                    let val_lst = result.map((lst) => {
                        let tmp = [];

                        for (var i = 0, length = lst.length; i < length; i++) {
                            tmp.push(lst[i]);
                        }

                        return tmp;
                    });

                    for (var j = 0, length = head_lst.length; j < length; j++) {
                        let obj = head_lst[j];
                        this.lst.splice(obj.index, 1, val_lst[j]);
                    }
                }, 5000)
            }
        }
    }
</script>
