import * as util from '../../js/common/util'
   
function iframeFun() {
    var span = document.querySelector(".spanStyle");
    var img = document.querySelector("#imgLink");
    var a = new Date()
    return window.getComputedStyle(img).getPropertyValue("width"); 
}
        
