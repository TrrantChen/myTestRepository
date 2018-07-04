<style>
    .pre_content, span.obj, span.arr {
        position: relative;
    }

    .expand_button {
        /*position: absolute;*/
        /*left: 0;*/
        /*top: 0;*/
    }

    .parse_obj_container {
        outline: 1px black solid;
        position: relative;
    }

    .parse_obj_content {
        position: relative;
        left: 20px;
        top: 0px;
    }

    .code_line_number_content {
        position: absolute;
        left: 0px;
        top: 0px;
        outline: 1px red solid;
        height: 100%;
        width: 20px;
    }

    .hide {
        display: none;
    }

</style>
<template>
    <div class="parse_obj_container">
        <div class="code_line_number_content">
            <ul>
                <li v-for="line in line_number">
                    {{ line }}
                </li>
            </ul>
        </div>
        <div ref="parse_obj_content" class="parse_obj_content" v-html="obj_html">
        </div>
    </div>
</template>
<script>
    export default {
        components: {
            
        },
        data() {  
            return {  
                obj: {
                    str: "aaaaa",
                    num: 1,
                    arr: ['1', 2, 'kkkk'],
                    sub_obj: {
                        a: 1,
                        b: 'name',
                        c: [{
                            first: 1,
                            first_str: 'one',
                        }, {
                            second: 2,
                            second_str: 'second',
                        }, {
                            three: 3,
                            three_str: 'three',
                        }],
                    }
                },
                obj_html: '',
                line_number: [],
            }
        },
        created() {
            let count = 1;
            this.line_number = [];
            this.obj_html = `<pre class='pre_content'>${this.parseObj(this.obj)}</pre>`;

            this.obj_html.split(/\r\n/).forEach(() => {
                this.line_number.push(count);
                count++;
            })
        },
        mounted() {
            let parse_obj_content = this.$refs.parse_obj_content;
            let select_dom = parse_obj_content.querySelectorAll('button.expand_button');

            select_dom.forEach((dom) => {
                dom.addEventListener('click', (evt) => {
                    evt.stopPropagation();
                    evt.preventDefault();

                    let next_dom = dom.nextElementSibling;
                    let hide_dom = dom.nextElementSibling.nextElementSibling;

                    if (next_dom.classList.contains('hide')) {
                        next_dom.classList.remove('hide');
                    } else {
                        next_dom.classList.add('hide');
                    }

                    if (hide_dom.classList.contains('hide')) {
                        hide_dom.classList.remove('hide');
                    } else {
                        hide_dom.classList.add('hide');
                    }
                })
            })
        },
        methods: {
            parseObj(obj, tap) {
                tap = tap || '';
                let result = '';
                let para_type = Object.prototype.toString.call(obj);

                switch(para_type) {
                    case '[object Array]':
                        result += '<button type="button" class="expand_button">s</button><span class="arr"><span class="bracket">[</span>\r\n';

                        for (var i = 0, length = obj.length; i< length; i++) {
                            if (i === length - 1) {
                                result += `    ${tap}${this.parseObj(obj[i], tap + '    ')}\r\n`;
                            } else {
                                result += `    ${tap}${this.parseObj(obj[i], tap + '    ')}<span class="comma">,</span>\r\n`;
                            }
                        }

                        result += `${tap}<span class="bracket">]</span></span><span class="hide hide_arr">[...]</span>`;
                        break;
                    case '[object Object]':
                        result += '<button type="button" class="expand_button">s</button><span class="obj"><span class="brace">{</span>\r\n';
                        let obj_keys = Object.keys(obj);

                        for (var i = 0; i < obj_keys.length; i++) {
                            result += `    ${tap}<span class="key">${ obj_keys[i] }</span><span class="colon">: </span>${ this.parseObj(obj[obj_keys[i]], tap + '    ') }<span class="comma">,</span>\r\n`
                        }

                        result += `${tap}<span class="brace">}</span></span><span class="hide hide_obj">{...}</span>`;
                        break;
                    case '[object String]':
                        result = `<span class="string">obj</span>`;
                        break;
                    case '[object Number]':
                        result = `<span class="number">obj</span>`;
                        break;
                    case '[object Boolean]':
                        result = `<span class="boolean">obj</span>`;
                        break;
                    default:
                        result = obj;
                        break;
                }

                return result;
            },
        },
    }
</script>