<style>
    .div_style {
        width: 100px;
        height: 100px;
        border: solid 1px black;
    }

    .green {
        background: green;
    }
</style>
<template>
    <div>
        <h3>this is just a async/await test;</h3>
        <button @click="clickHandle">change div</button>
        <div class="div_style" :class="{ green: is_green }" ></div>
    </div>
</template>
<script>
    export default {
        components: {
            
        },
        data() {  
            return {  
                is_green: false,
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
            async test1() {
                function rejectPromise() {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            try {
                                throw new Error('this is a error');
                            } catch(e) {
                                reject(e);
                            }
                        }, 0)
                    })
                }

                try {
                    let result = await rejectPromise();
                } catch(e) {
                    console.log(e);
                }
            },
            promiseIf() {
                myPromise().then((result) => {
                    console.log(result);
                });

                function myPromise() {
                    return new Promise((resolve, reject) => {
                        let a = 0;

                        if ( a > 0) {
                            resolve('get');
                        } else {

                        }
                    })
                }

            },
            async clickHandle() {
                this.is_green = !this.is_green;
                let result = await this.setTimeoutPromise();
                console.log(result);
            },
            setTimeoutPromise() {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(10)
                    }, 1000)
                })
            }
        }
    }
</script>