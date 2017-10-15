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
      // this.message = "Ttt";
      console.log(this)
    }
  }
})

function test(printTwo) {
  printing: {
    console.log("test");
    if (!printTwo) break printing;
    console.log("Two");
  }

  console.log("Three");
}

test(false);