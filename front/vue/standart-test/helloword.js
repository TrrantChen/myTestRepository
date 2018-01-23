/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-10-15 12:24:43
 * @version $Id$
 */

let app = new Vue({
  el: "#app",
  data: {
    message: "hello"
  }
});

let app4 = new Vue({
  el: "#app-4",
  data: {
    todos: [
      { text: "ttt" },
      { text: "dddd" },
      { text: "dasda" },
    ]
  }
});

let addli = document.querySelector("#addli");
addli.addEventListener("click", (evt) => {
  app4.todos.push({ text: "ttdsakj" });
});

let app5 = new Vue({
  el: "#app-5",
  data: {
    message: ""
  },
  methods: {
    showMessage: function() {
      this.message = "Ttt";
    }
  }
});

let app6 = new Vue({
    el: "#app-6",
    data: {
      message: "test",
    },
    computed: {
        reversedMessage: function() {
            return this.message.split('').reverse().join('');
        }
    },
});

let computedPropertyTest = new Vue({
    el: "#computedPropertyTest",
    data: {
        num: 1,
    },
    methods: {
        clickHandle: function() {
            this.num++;
        },
        callMethod: function() {
            return this.num + 20;
        },
        getDateMethod: function() {
            return Date.now();
        },
        getTheComputedMethodValue: function() {
            console.log(this.computedMethod);
        },
    },
    computed: {
        computedMethod: function() {
            return this.num + 10;
        },
        computedGetDate: function() {
            return Date.now();
        }
    }
});

let vClassTest = new Vue({
    el: "#vClassTest",
    data: {
        colorStyle: 0,
    },
    methods: {
        changeStyle: function() {
            ++this.colorStyle;
            if (this.colorStyle === 3) {
                this.colorStyle = 0;
            }

            console.log("changeStyle colorStyle " + this.colorStyle);
        },
        getClassMethods: function() {
            switch (this.colorStyle.toString()) {
                case "0":
                    return "red";
                case "1":
                    return "blue";
                case "2":
                    return "yellow";
            }
        },
    },
    computed: {
        getClass: function() {
            switch (this.colorStyle.toString()) {
                case "0":
                    return "red";
                case "1":
                    return "blue";
                case "2":
                    return "yellow";
            }
        },
    }
});

let arrayForTest = new Vue({
    el: "#arrayForTest",
    data: {
        items: [
            'a',
            'b',
            'c'
        ]
    },
    methods: {
        clickCallback: function() {
            this.changeItem(1, "tttt");
        },
        changeItem: function(num, textValue) {
            // it not work
            // this.items[num] = textValue;
            this.items.splice(num, 1, textValue);
        },
    },
});

let eventThis = new Vue({
    el: "#eventThis",
    methods: {
        clickCallback: function() {
            console.log(arguments);
        }
    }
});

Mock.mock(/testUrl/, {
        retcode: 222
});

let mockTest = new Vue({
    el: "#mockTest",
    data: {
        textValue: "hello"
    },
    methods: {
        getTextValue: function() {
            // this.$http.get('/testUrl/').then((result) => {
            //     this.textValue = result.data.retcode;
            // })

            // fetch('/testUrl/', { method: 'get' }).then((result) => {
            //     this.textValue = result.data.retcode;
            // })
            let that = this
            let xhr = new XMLHttpRequest();
            xhr.open('get', '/testUrl/');
            xhr.onreadystatechange = function() {
                if (xhr.readyState.toString() == "4" && xhr.status.toString() == "200") {
                    that.textValue = JSON.parse(xhr.response).retcode;
                }
            };
            xhr.send(null);
        }
    },
});

let showTest = new Vue({
    el: "#showTest",
    data: {
        items: [1, 2, 3, 4, 5],
        isShow: true,
    }
});

let watchTest = new Vue({
    el: "#watchTest",
    data: {
        getData: "test",
        message: " " ,
    },
    methods: {
        btnHandle: function() {
            fetch("http://" + document.domain  + ":8088/delayloadtest?para0=1000", { method: 'get' }).then(function(response) {
                return response.text()
            }).then((result) => {
                this.getData = result;
            })
        }
    }
});

let componentTest = new Vue({
    el: '#componentTest',
    data: {
        test_message: 0,
        test_obj: {
            num: 1
        }
    },
    components: {
        'myComponent': {
            props: ['variable', 'obj'],
            template: `
                    <div>
                        <div>{{ message }}</div>
                        <div>{{ variable }}</div>
                        <div>other {{ obj.num }}</div>
                    </div>
                    `,
            data: function() {
                return {
                    message: "test",
                }
            },
        }
    }
});

let componentTransmitMessage = new Vue({
    el: "#componentTransmitMessage",
    data: {
        message_from_component: "message from component",
        message_to_component: "message 2 component",
    },
    components: {
        'myComponent': {
            props: [ "message_from_parent"],
            data: function() {
                return {
                    message_to_parent: "messsage from component to parent",
                }
            },
            template: `
            <div>
                <div>{{ message_from_parent }}</div>
                <button @click='clickHandle'>send data to parent</button>
            </div>
            `,
            methods: {
                clickHandle: function() {
                    this.$emit('compentclickevent',[this.message_to_parent]);
                    // this.$emit('compentclickevent');
                },
            },
        },
    },
    methods: {
        handDataFromComponent: function(value) {
            this.message_from_component = value[0];
        },
        clickHandle: function() {
            this.message_to_component = "ttt";
        }
    }
});

let slotTest = new Vue({
    el: "#slotTest",
    components: {
        'child': {
            template: `
                <div>
                  <slot text="hello from child"></slot>
                </div>
            `,
        }
    }
});

let dynamicComponentsTest = new Vue({
    el: "#dynamicComponentsTest",
    data: {
        currentComponent: "component1",
        index: 0,
    },
    components: {
        component1: {
            template: `<div>this is component1</div>`,
        },
        component2: {
            template: `<div>this is component2</div>`,
        },
        component3: {
            template: `<div>this is component3</div>`,
        },
    },
    methods: {
        changeComponent: function() {
            this.index++;

            if (this.index > 3) {
                this.index = 0;
            }

            switch(this.index) {
                case 0:
                default:
                    this.currentComponent = "component1";
                    break;
                case 1:
                    this.currentComponent = "component2";
                    break;
                case 2:
                    this.currentComponent = "component3";
                    break;
            }

        }
    },
    beforeUpdate: function() {

        console.group("beforeUpdate====================");
        let tmp2 = $.extend(true, {}, this.$el);
        if (tmp2) {
            console.log(tmp2.innerHTML);
        } else {
            console.log(void 0);
        };
        console.groupEnd();
    },
    updated: function() {
        console.group("update====================");
        let tmp2 = $.extend(true, {}, this.$el);
        if (tmp2) {
            console.log(tmp2.innerHTML);
        } else {
            console.log(void 0);
        }
        console.groupEnd();
    },
});

let notChangeInnerValue = new Vue({
    el: "#notChangeInnerValue",
    data: {
        message_to_component: "test",
        message_modify_by_component: {
            message: "default message",
        },
    },
    components: {
        component1: {
            props: ['message_from_parent', 'message_from_parent_can_modify'],
            template: `
                <div>
                    <div>{{ inner_message }}</div>
                    <button @click="changeParentMessage">change the parent message</button>
                </div>
            `,
            data: function() {
                return {
                    inner_message: this.message_from_parent,
                }
            },
            methods: {
                changeParentMessage: function() {
                    this.message_from_parent_can_modify.message = "now modify by component"
                },
            }
        },
    },
    methods: {
        clickHandle: function() {
            this.message_to_component = "haha";
        },
    }
});

let sonComponentRef = new Vue({
    el: '#sonComponentRef',
    components: {
        child: {
            template: `<div>this is son component</div>`,
            data: function() {
                return {
                    message: "haha",
                }
            }

        },
    },
});

// console.log(sonComponentRef.$refs.profile);

let eventCenter = new Vue();

let globalEventTest = new Vue({
    el: "#globalEventTest",
    data: {
        index: 0,
    },
    components: {
        component1: {
            template:
                `<div>
                    <button @click="sendEvent2SameLevel">send event to the same level</button>
                 </div>`,
            methods: {
                sendEvent2SameLevel: function() {
                    eventCenter.$emit("test_event", 1);
                }
            }
        },
        component2: {
            template:
                `<div>
                    {{ message }}
                 </div>`,
            data: function() {
              return {
                  message: "init",
              }
            },
            created: function() {
                eventCenter.$on("test_event", function(data) {
                    console.log(this);
                    // console.log(data);
                });
            },
            methods: {
            }
        },
    }
});

let count = 0;

let inputTest = new Vue({
    el: "#inputTest",
    data: {
        inputValue: 0,
    },
    methods: {
        inputHandle(event) {
            this.inputValue = event.target.value;
        },
        clickHandle() {
            console.log(this.inputValue);
        },
        changeHandle(event) {
            this.inputValue = event.target.value;
        },
        keyupHandle(event) {
            // if (Number.isNaN(Number.parseInt(event.key))) {
            //     event.target.value = event.target.value.replace(event.key, "");
            // }
            // console.log("up");
            // console.log(event.key);
            if (event.code !== null && event.code.includes("Key")) {
                let key = event.code.replace("Key", '').toLocaleLowerCase();
                event.target.value = event.target.value.toLocaleLowerCase().replace(key, '');
            }

            console.log(event.key);
            console.log(event.code);
            console.log(event.target.value);
        },
        keydownHandle(event) {
            // if (Number.isNaN(Number.parseInt(event.key))) {
            //     event.target.value = event.target.value.replace(event.key, "");
            // }
            // console.log("down");
            // console.log(event.key);
        }
    },
})

let lifeCircleTest = new Vue({
    el: "#lifeCircleTest",
    data: {
        test_data: 0,
    },
    components: {
        child: {
            template: `<div>this is child component</div>`
        }
    },
    methods: {
        testFun: function() {
            console.log("this is a fun")
        },
        updateHandle: function() {
            ++this.test_data;
            // this.$nextTick(function() {
            //     console.log('this.$data');
            //     let tmp1 = $.extend(true, {}, this.$data);
            //     console.log(tmp1);
            //     console.log('this.$el');
            //     let tmp2 = $.extend(true, {}, this.$el);
            //     if (tmp2) {
            //         console.log(tmp2.innerHTML);
            //     } else {
            //         console.log(void 0);
            //     }
            // });
        },
        destroyHandle: function() {
            lifeCircleTest.$destroy();
        },
    },
    beforeCreate: function() {
        console.group("beforeCreate====================");
        console.log('this.$data');
        let tmp1 = $.extend(true, {}, this.$data);
        console.log(tmp1);
        console.log('this.$el');
        let tmp2 = $.extend(true, {}, this.$el);
        if (tmp2) {
            console.log(tmp2.innerHTML);
        } else {
            console.log(void 0);
        }
        console.log('this.test_data');
        let tmp3 = this.test_data;
        console.log(tmp3);
        console.groupEnd();
    },
    created: function() {
        console.group("created====================");
        console.log('this.$data');
        let tmp1 = $.extend(true, {}, this.$data);
        console.log(tmp1);
        console.log('this.$el');
        let tmp2 = $.extend(true, {}, this.$el);
        if (tmp2) {
            console.log(tmp2.innerHTML);
        } else {
            console.log(void 0);
        }
        console.log('this.test_data');
        let tmp3 = this.test_data;
        console.log(tmp3);
        console.groupEnd();
    },
    beforeMount: function() {
        console.group("beforeMount====================");
        console.log('this.$data');
        let tmp1 = $.extend(true, {}, this.$data);
        console.log(tmp1);
        console.log('this.$el');
        let tmp2 = $.extend(true, {}, this.$el);
        if (tmp2) {
            console.log(tmp2.innerHTML);
        } else {
            console.log(void 0);
        }
        console.log('this.test_data');
        let tmp3 = this.test_data;
        console.log(tmp3);
        console.groupEnd();
    },
    mounted: function() {
        console.group("mounted====================");
        console.log('this.$data');
        let tmp1 = $.extend(true, {}, this.$data);
        console.log(tmp1);
        console.log('this.$el');
        let tmp2 = $.extend(true, {}, this.$el);
        if (tmp2) {
            console.log(tmp2.innerHTML);
        } else {
            console.log(void 0);
        }
        console.log('this.test_data');
        let tmp3 = this.test_data;
        console.log(tmp3);
        console.groupEnd();
    },
    beforeUpdate: function() {
        console.group("beforeUpdate====================");
        console.log('this.$data');
        let tmp1 = $.extend(true, {}, this.$data);
        console.log(tmp1);
        console.log('this.$el');
        let tmp2 = $.extend(true, {}, this.$el);
        if (tmp2) {
            console.log(tmp2.innerHTML);
        } else {
            console.log(void 0);
        }
        console.log('this.test_data');
        let tmp3 = this.test_data;
        console.log(tmp3);
        console.groupEnd();
    },
    updated: function() {
        console.group("updated====================");
        console.log('this.$data');
        let tmp1 = $.extend(true, {}, this.$data);
        console.log(tmp1);
        console.log('this.$el');
        let tmp2 = $.extend(true, {}, this.$el);
        if (tmp2) {
            console.log(tmp2.innerHTML);
        } else {
            console.log(void 0);
        }
        console.log('this.test_data');
        let tmp3 = this.test_data;
        console.log(tmp3);
        console.groupEnd();
        this.$nextTick(function() {
            console.log(this.$refs);
        })
    },
    activated: function() {
        console.group("activated====================");
        console.log('this.$data');
        let tmp1 = $.extend(true, {}, this.$data);
        console.log(tmp1);
        console.log('this.$el');
        let tmp2 = $.extend(true, {}, this.$el);
        if (tmp2) {
            console.log(tmp2.innerHTML);
        } else {
            console.log(void 0);
        }
        console.log('this.test_data');
        let tmp3 = this.test_data;
        console.log(tmp3);
        console.groupEnd();
    },
    deactivated: function() {
        console.group("deactivated====================");
        console.log('this.$data');
        let tmp1 = $.extend(true, {}, this.$data);
        console.log(tmp1);
        console.log('this.$el');
        let tmp2 = $.extend(true, {}, this.$el);
        if (tmp2) {
            console.log(tmp2.innerHTML);
        } else {
            console.log(void 0);
        }
        console.log('this.test_data');
        let tmp3 = this.test_data;
        console.log(tmp3);
        console.groupEnd();
    },
    beforeDestroy: function() {
        console.group("beforeDestroy====================");
        console.log('this.$data');
        let tmp1 = $.extend(true, {}, this.$data);
        console.log(tmp1);
        console.log('this.$el');
        let tmp2 = $.extend(true, {}, this.$el);
        if (tmp2) {
            console.log(tmp2.innerHTML);
        } else {
            console.log(void 0);
        }
        console.log('this.test_data');
        let tmp3 = this.test_data;
        console.log(tmp3);
        console.groupEnd();
    },
    destroyed: function() {
        console.group("destroyed====================");
        console.log('this.$data');
        let tmp1 = $.extend(true, {}, this.$data);
        console.log(tmp1);
        console.log('this.$el');
        let tmp2 = $.extend(true, {}, this.$el);
        if (tmp2) {
            console.log(tmp2.innerHTML);
        } else {
            console.log(void 0);
        }
        console.log('this.test_data');
        let tmp3 = this.test_data;
        console.log(tmp3);
        console.groupEnd();
    },
    errorCaptured: function() {
        console.group("errorCaptured====================");
        console.log('this.$data');
        let tmp1 = $.extend(true, {}, this.$data);
        console.log(tmp1);
        console.log('this.$el');
        let tmp2 = $.extend(true, {}, this.$el);
        if (tmp2) {
            console.log(tmp2.innerHTML);
        } else {
            console.log(void 0);
        }
        console.log('this.test_data');
        let tmp3 = this.test_data;
        console.log(tmp3);
        console.groupEnd();
    }
});

let checkboxTest = new Vue({
    el: '#checkboxTest',
    data: {
        selected_list: [],
        data_list: [1, 2, 3],
        selected_data: '',
    }
});

let getChildComponentByRefs = new Vue({
    el: "#getChildComponentByRefs",
    components: {
        child1: {
            template: '<div>this is component1</div>',
            created() {
                console.log("parent is ");
                console.log(this.$parent);
            },
        },
        child2: {
            template: '<div>this is component2</div>',
        },
        child3: {
            template: '<div>this is component3</div>',
        }
    },
    created() {
        console.log("created");
        console.log(this.$refs);
        this.$nextTick(function() {
            console.log("created nextTick");
            console.log(this.$refs);
        })
    },
    mounted() {
        console.log("mounted");
        console.log(this.$refs);
        this.$nextTick(function() {
            console.log("mounted nextTick");
            console.log(this.$refs);
        })
    }
});

function microtaskAndMacrotask() {
    setTimeout(() => {
        console.log("this is set time out 1");
        Promise.resolve().then(() => {
            console.log("this is promise3");
        });

        Promise.resolve().then(() => {
            console.log("this is promise4");
        });
    }, 0);

    setTimeout(() => {
        console.log("this is set time out 2");
    });

    Promise.resolve().then(() => {
        console.log("this is promise1");
    });

    Promise.resolve().then(() => {
        console.log("this is promise2");
    });

}

function switchCaseTest() {
    let obj1 = {
        a: "1",
        b: "2",
        c: "3",
    }

    let obj2 = {
        a: "1",
        b: "2",
        c: "3",
    }

    let value1 = "1";
    let value2 = "2";

    switch(value1) {
        case obj1.a:
            switch(value2) {
                case obj2.a:
                    console.log("+++++++a");
                    break;
                case obj2.b:
                    console.log("+++++++b");
                    break;
                case obj2.c:
                    console.log("+++++++c");
                    break;
            }
            break;
        case obj1.b:

            break;
        case obj1.c:

            break;
    }

}


