import $ from 'jquery';
import * as util from '../../js/common/util';  
import {dragable, drogable, resizable, selectable, align, Dragable} from '../../js/common/interaction'; 
import { buttonShowContent, getElement} from '../../js/common/domoperation';
import '../../lib/jquery-ui-1.12.1.custom/jquery-ui.js';

let addButtonShowContent = buttonShowContent();

$(function() {
  addButtonShowContent("#btnDrag", "#dragContent");
  addButtonShowContent("#btnSelector", "#selectorContent");
  addButtonShowContent("#btnSortable", "#sortableContent");
  addButtonShowContent("#btnTestNormal", "#testNormalContent");
  addButtonShowContent("#btnTestAxis", "#testAxisContent");
  addButtonShowContent("#btnTestContainment", "#testContainment");
  addButtonShowContent("#btnTestCancelAndHandle", "#testCancelAndHandle");
  addButtonShowContent("#btnTestRevert", "#testRevert");
  addButtonShowContent("#btnTestCssUserDrag", "#TestCssUserDrag");

  testNormal();
  testNormalByUI();
  testAxis();
  testAxisByUI();
  
  testContainment();  // 有问题
  testContainmentUI();

  testCancelAndHandle();
  testCancelAndHandleUI();

  testRevert();
  testRevertUI();
})

function testNormal() {
  let dragable = new Dragable("#testNormalDiv");
  // dragable("#testNormalDiv");
}

function testNormalByUI() {
  $( "#testNormalDivUI" ).draggable();
}

function testAxis() {
  // dragable("#testAxisX", {axis:"x"})
  // dragable("#testAxisY", {axis:"y"})
  // dragable("#testAll", {axis:"all"})
  
  let dragableX = new Dragable("#testAxisX", {axis:"x"});
  let dragableY = new Dragable("#testAxisY", {axis:"y"});
  let dragableAll = new Dragable("#testAll", {axis:"all"});
}

function testAxisByUI() {
  $( "#testAxisXUI" ).draggable({ axis: "x" });
  $( "#testAxisYUI" ).draggable({ axis: "y" });
  $( "#testAllUI" ).draggable();
}

function testContainment() {
  try {
    let dragable = new Dragable("#testContainmentDiv", {containment:"#testContent"});
    // dragable("#testContainmentDiv", {containment:"#testContent"});
  }
  catch(err) {
    console.log(err);
  }
}

function testContainmentUI() {
  $("#testContainmentDivUI").draggable({containment:"#testContentUI"});
}

function testCancelAndHandle() {
  try {

    let dragable1 = new Dragable("#test4handle", {handle:"#canP"});
    let dragable2 = new Dragable("#test4cancel", {handle:"#canP2", cancel:"#noCanP"});
    let dragable3 = new Dragable("#test4OnlyCancel", {handle:"this", cancel:"#noCanP2"});

    // dragable("#test4handle", {handle:"#canP"});
    // dragable("#test4cancel", {handle:"#canP2", cancel:"#noCanP"});
    // dragable("#test4OnlyCancel", {handle:"this", cancel:"#noCanP2"});       
  }
  catch(err) {
    console.log(err);
  }
}

function testCancelAndHandleUI() {
  $("#test4handleUI").draggable({handle:"#canPUI"});
  $("#test4cancelUI").draggable({handle:"#canP2UI", cancel:"#noCanPUI"});
  $("#test4OnlyCancelUI").draggable({handle:"this", cancel:"#noCanP2UI"});     
}

function testRevert() {
  try {
    let dragable1 = new Dragable("#testReverDiv", {revert:true});
    // dragable("#testReverDiv", {revert:true});
  }
  catch(err) {
    console.log(err);
  }
}

function testRevertUI() {
  $("#testRevertDivUI").draggable({revert:true});
}


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
    dragable("#relative");
    // dragable("#testDivByJqueryui", {containment: "#absolute", revert:false});
    // dragable("#testDivByJqueryui");
    // dragable("#scrollDiv");
    
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
}

function selectableTest() {
  let filterArr = [].slice.call(document.querySelectorAll(".filter"))
    , selectorContainer = document.querySelector("#selectorContainer")
  selectable(selectorContainer, {filterArr:filterArr})
}

function selectableByJqueryUi() {
    $("#selectorContainer2").selectable({tolerance:"touch"});
}

function sortableByJqueryUi() {
    $("#sortableContainer2").sortable();
    $("#sortableContainer2").disableSelection();
}





        




