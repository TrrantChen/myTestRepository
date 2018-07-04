<style>
    .json-view {
        width: 600px;
        height: 600px;
        border: solid 1px black;
    }

    pre {
        background: lightgray;
        border: solid 1px gainsboro;
    }

    .key {
        color: green;
    }

</style>
<template>
    <div>
        <div class="json-view" v-html="jsonFormat(json)">

        </div>
    </div>
</template>
<script>
    export default {
        components: {
            
        },
        data() {  
            return {  
               json: JSON.stringify({
                   a: 42123,
                   b: {
                       a: [12, 3, 4, 5],
                       c: 'aasd',
                   }
               })
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
            jsonFormat(json) {
                return '<pre>' + this.syntaxHighlight(JSON.stringify(JSON.parse(json), undefined, 4)) + '</pre>';
            },
            syntaxHighlight(json) {
                json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                    var cls = 'number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'key';
                        } else {
                            cls = 'string';
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'boolean';
                    } else if (/null/.test(match)) {
                        cls = 'null';
                    }
                    return '<span class="' + cls + '">' + match + '</span>';
                });
            }
        }
    }
</script>