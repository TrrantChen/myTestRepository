<style>
</style>
<template>
    <div>
        <form @submit.prevent="action1">
            <input type="text" v-model="message1" required>
            <form @submit.prevent="action2">
                <input type="text" v-model="message2" required>
                <input type="submit">
            </form>
            <form @submit.prevent="action3">
                <input type="text" v-model="message3" required>
                <input type="submit">
            </form>
            <form action="">
                <input type="checkbox" name="a">
                <input type="checkbox" name="a">
                <input type="checkbox" name="a">
                <input type="submit">
            </form>
            <input type="submit">
        </form>

    </div>

</template>
<script>
    export default {
        components: {
            
        },
        data() {  
            return {
                message1: '',
                message2: '',
                message3: '',
                is_what: false,

            }
        },
        methods: {
            action1() {
                console.log(this.message1);
                console.log(this.message2);
                console.log(this.message3);
            },
            action2() {
                console.log(this.message2);
            },
            action3() {
                console.log(this.message3);
            },
            startVerify() {

            },
            loading1() {
                console.log('this is 1');
            },
            loading2() {
                console.log('this is 2');
            },
            handle1() {
                this.is_what = true;
            },
            handle2() {
                this.is_what = false;
            },
        }
    }
</script>