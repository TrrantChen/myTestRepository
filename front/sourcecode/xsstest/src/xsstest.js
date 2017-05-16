import * as util from '../../js/common/util'
    
let path = util.getHost();
$("#btnTest").click(function(){
    var input1 = document.querySelector("#input1");
    var input = document.createElement("input");
    input.classList.add("inputStyle");
    input.setAttribute("type", "text")
    // input.value = input1.value;
    input.setAttribute("value", input1.value)
    var container = document.querySelector(".container");
    container.appendChild(input);
    // debugger
})
      
