<style>
</style>
<template>
    <div>
        <input type="file" value="测试上传" @change="changeHandle">
        <span>{{ md5 }}</span>
    </div>
</template>
<script>
    import SparkMD5 from 'spark-md5';
    export default {
        components: {
            
        },
        data() {  
            return {
                md5: '',
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
            changeHandle(evt) {
                    let file = evt.target.files[0];
                    Promise.all([this.getMdf(file), this.getCountNum(file)]).then((result) => {
                        console.log(result);
                        evt.target.value = '';
                    }).catch((e) => {
                        console.log(e);
                    })
            },
            getMdf(file) {
                return new Promise((resolve, reject) => {
                    try {
                        let spark = new SparkMD5.ArrayBuffer();
                        let fileReader = new FileReader();

                        fileReader.onload = function(e) {
                            spark.append(e.target.result);
                        };

                        fileReader.onloadend = function(e) {
                            resolve(spark.end());
                        };

                        fileReader.onerror = function(e) {
                            reject(e);
                        };

                        fileReader.readAsArrayBuffer(file);
                    } catch(e) {
                        reject(e);
                    }
                });
            },
            getCountNum(file) {
                return new Promise((resolve, reject) => {
                    try {
                        let fileReader = new FileReader();

                        fileReader.onloadend = function(e) {
                            // console.log(e.target.result);
                            // // let result = e.target.result.match(/^[\s]*\r\n/ig);
                            // // let result = e.target.result.replace(/\s*\r\n/img, '|');
                            // // let result =  target.result.match(/^(\r\n|\s*\r\n)/igm);
                            // // let result = e.target.result.match(/^\r\n/igm);
                            // console.log(JSON.stringify(e.target.result));
                            // let tmp = e.target.result.replace(/^\s*[^\n]\r\n/igm, '');
                            //
                            // // let tmp = e.target.result.match(/^\s*\n/img);
                            // console.log(JSON.stringify(tmp));
                            // let result = tmp.match(/\n/ig);
                            // console.log(result.length);
                            // result !== void 0 && result !== null ? resolve(result.length) : resolve(0);
                            // // resolve(e.target.result.match(/\n/ig).length);

                            // let tmp = '';
                            //
                            // if(navigator.userAgent.indexOf('Windows') > -1) {
                            //     tmp = e.target.result.replace(/^\r\n/igm, '');
                            // } else {
                            //     tmp = e.target.result.replace(/^\n/igm, '');
                            // }
                            //
                            // // let tmp = e.target.result.replace(/(^\r\n)|(^\n)/igm, '');
                            // console.log(tmp);
                            // let result = tmp.match(/\n/ig);
                            // console.log(result.length);
                            let tmp = e.target.result.match(/(\S+\r\n)|(\S+\n)/ig);
                            tmp === null ? resolve(1) : resolve(tmp.length);
                        };

                        fileReader.onerror = function(e) {
                            reject(e);
                        };

                        fileReader.readAsText(file);
                    } catch(e) {
                        reject(e);
                    }

                })
            },
        }
    }
</script>