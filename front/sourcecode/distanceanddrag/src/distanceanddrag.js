import $ from 'jquery';
import * as util from '../../js/common/util';  
import * as interaction from '../../js/common/interaction'; 
import '../../lib/jquery-ui-1.12.1.custom/jquery-ui.js';

function dragByJqueryUi() {
    var testDivByJqueryui = $("#testDivByJqueryui");
    testDivByJqueryui.draggable({containment: "#absolute"});
    // // testDivByJqueryui.draggable();
    var scrollDiv = $("#scrollDiv");
    // scrollDiv.draggable();

    console.log(testDivByJqueryui.scrollParent());
    // debugger
    // console.log( scrollDiv.scrollParent());
}

function dragInterationTest() {
    interaction.dragable("#relative");
    // interaction.dragable("#testDivByJqueryui", {containment: "#absolute", revert:false});
    // interaction.dragable("#testDivByJqueryui");
    // interaction.dragable("#scrollDiv");
    
    // let testDivByJqueryui = document.querySelector("#testDivByJqueryui");
    // testDivByJqueryui.addEventListener("transitionrun", function(e){
    //     console.log("transitionrun")
    // })

    // testDivByJqueryui.addEventListener("transitionstart", function(e){
    //     console.log("transitionstart")
    // })  

    // testDivByJqueryui.addEventListener("transitionend", function(e){
    //     console.log("transitionend")
    // })   
    
     interaction.dragable("#test4handle", {handle:"#canP"});
     interaction.dragable("#test4cancel", {handle:"#canP2", cancel:"#noCanP"});
     interaction.dragable("#test4OnlyCancel", {handle:"this", cancel:"#noCanP2"});                                
}

function selectableTest() {
    interaction.selectable("#selectorContainer")
}

function selectableByJqueryUi() {
    $("#selectorContainer2").selectable({tolerance:"touch"});
}

$(function() {
    selectableTest();
    selectableByJqueryUi();
    dragInterationTest();
})



// dragInterationTest();
// dragByJqueryUi();


        




