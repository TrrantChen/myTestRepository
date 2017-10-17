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
        }
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
})

let arrayForTest = new Vue({
    el: "#arrayForTest",
    data: {
        items: [
            { index: 0, text: "aa" },
            { index: 1, text: "bb" },
            { index: 2, text: "cc" },
        ]
    },
    methods: {
        clickCallback: function() {
            this.changeItem(1, "tttt");
        },
    },
    computed: {
        changeItem: function(index, value) {
            this.items[index].text = value;
        },
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
})

