import $ from 'jquery';
import * as util from '../../js/common/util';  
import {dragable, drogable, resizable, selectable, align, Dragable} from '../../js/common/interaction'; 
import { buttonShowContent, getElement,  initGetAllElementEventFn, getAllEvent, getElemAllEvent} from '../../js/common/domoperation';
import '../../lib/jquery-ui-1.12.1.custom/jquery-ui.js';

let addButtonShowContent = buttonShowContent();
let setting = document.querySelector("#setting");
let globalButton = void 0;
setting.addEventListener("click", (evt) => {
  if (globalButton !== void 0) {
    globalButton.style.background = "red";
  }
})

$(function() {

  addButtonShowContent("#btnDrag", "#dragContent", getButton);
  addButtonShowContent("#btnSelector", "#selectorContent", getButton);
  addButtonShowContent("#btnSortable", "#sortableContent", getButton);
  addButtonShowContent("#btnTestNormal", "#testNormalContent", testNormal);
  addButtonShowContent("#btnTestAxis", "#testAxisContent", testAxis);
  addButtonShowContent("#btnTestContainment", "#testContainment");

  addButtonShowContent("#btnTestCancelAndHandle", "#testCancelAndHandle", testCancelAndHandle);
  addButtonShowContent("#btnTestRevert", "#testRevert", testRevert);
  addButtonShowContent("#btnTestCssUserDrag", "#TestCssUserDrag");



  testNormalByUI();
  testAxisByUI(); 
  testContainmentUI();
  testCancelAndHandleUI();
  testRevertUI();

  // p-pddding m-margin t-translate r-relative a-absolute b-border 
  // Spmtr|FPpmtrb|C
  
  createContaimentDemo("S|FP|C")
  
  createContaimentDemo("S|FPp|C")
  createContaimentDemo("S|FPm|C")
  createContaimentDemo("S|FPt|C")
  createContaimentDemo("S|FPr|C")
  createContaimentDemo("S|FPb|C")
  createContaimentDemo("S|FPa|C")

  createContaimentDemo("S|FP|Cp")
  createContaimentDemo("S|FP|Cm")
  createContaimentDemo("S|FP|Ct")
  createContaimentDemo("S|FP|Cr")
  createContaimentDemo("S|FP|Cb")
  createContaimentDemo("S|FP|Ca")    
  
  createContaimentDemo("SP|F|C")

  createContaimentDemo("SPp|F|Cp")
  createContaimentDemo("SPm|F|Cm")
  createContaimentDemo("SPt|F|Ct")
  createContaimentDemo("SPr|F|Cr")
  createContaimentDemo("SPb|F|Cb")
  createContaimentDemo("SPa|F|Ca")

  createContaimentDemo("SP|Fp|C")
  createContaimentDemo("SP|Fm|C")
  createContaimentDemo("SP|Ft|C")
  createContaimentDemo("SP|Fr|C")
  createContaimentDemo("SP|Fb|C")
  createContaimentDemo("SP|Fa|C")  
})

function getButton(btn) {
  globalButton = btn;
}

function testNormal(btn) {
  let dragable = new Dragable("#testNormalDiv");
  globalButton = btn;
}

function testNormalByUI() {
  $( "#testNormalDivUI" ).draggable();
}

function testAxis(btn) {
  // dragable("#testAxisX", {axis:"x"})
  // dragable("#testAxisY", {axis:"y"})
  // dragable("#testAll", {axis:"all"})
  let dragableX = new Dragable("#testAxisX", {axis:"x"});
  let dragableY = new Dragable("#testAxisY", {axis:"y"});
  let dragableAll = new Dragable("#testAll", {axis:"all"});
  globalButton = btn;
}

function testAxisByUI() {
  $( "#testAxisXUI" ).draggable({ axis: "x" });
  $( "#testAxisYUI" ).draggable({ axis: "y" });
  $( "#testAllUI" ).draggable();
}

function testContainment(btn) {
  try {
      let dragable = new Dragable("#testContainmentDiv", {containment:"#testContent"});    
    // dragable("#testContainmentDiv", {containment:"#testContent"});
    globalButton = btn;
  }
  catch(err) {
    console.log(err);
  }
}

function testContainmentUI() {
  let testContentUI = document.querySelector("#testContentUI");
  $("#testContainmentDivUI").draggable({containment:testContentUI});
}

function testCancelAndHandle(btn) {
  try {
    let dragable1 = new Dragable("#test4handle", {handle:"#canP"});
    let dragable2 = new Dragable("#test4cancel", {handle:"#canP2", cancel:"#noCanP"});
    let dragable3 = new Dragable("#test4OnlyCancel", {handle:"this", cancel:"#noCanP2"});
    globalButton = btn;
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

function testRevert(btn) {
  try {
    let dragable1 = new Dragable("#testReverDiv", {revert:true});
    // dragable("#testReverDiv", {revert:true});
    globalButton = btn;
  }
  catch(err) {
    console.log(err);
  }
}

function testRevertUI() {
  $("#testRevertDivUI").draggable({revert:true});
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

// p-pddding m-margin t-translate r-relative a-absolute b-border 
// pmtr|tmpr|abmp
function createContaimentDemo(str) {
  let suffix = str.replace(/\|/g, "")
    ,btnGroup = document.querySelector("#btnGroup")
    ,contentGroup = document.querySelector("#contentGroup")
    ,button = document.createElement("button")
    ,content = document.createElement("div")
    ,sonContent1 = document.createElement("div")
    ,sonContent2 = document.createElement("div");

  button.classList.add("buttonStyle");
  button.textContent = "containment" + suffix;
  btnGroup.appendChild(button);

  content.classList.add("testContent");
  contentGroup.appendChild(content);


  sonContent1.classList.add("testSonContent");
  content.appendChild(sonContent1);
  let dom1 = getDemoDom(str);
  sonContent1.appendChild(dom1.content);

  sonContent2.classList.add("testSonContent");
  content.appendChild(sonContent2);
  let dom2 = getDemoDom(str);
  sonContent2.appendChild(dom2.content);

  addButtonShowContent(button, content, (btn) => {
    let dragable = new Dragable(dom1.child, {containment:dom1.contaiment});  
    $(dom2.child).draggable({containment:dom2.contaiment}); 
    globalButton = btn;
    // test4ClientRect(dom1.contaiment, suffix, "containment");
    test4ClientRect(dom1.child, suffix, "child");    
  });
}

function getDemoDom(str) {
  let strArr = str.split("|")
    ,strArrLength = strArr.length
    ,result = {
      contaiment:null
      ,content:null
      ,child:null
    };

  let divArr = strArr.map((str) => {
    let div = document.createElement("div")
      ,strLength = str.length;
    
    for(var i = 0; i < strLength; i++) {
      if (str[i] === "P") {
        result.contaiment = div;
      } else {
        domAddClass(div, str[i]);
      }
    }

    return div;
  })

  for (var i = 0; i < strArrLength - 1; i++) {
    divArr[i].appendChild(divArr[i + 1]);
  }
  
  result.content = divArr[0]
  result.child = divArr[strArrLength - 1];
  return result;
}

function test4ClientRect(elem, suffix, other) {
  console.log(suffix);
  console.log(other);
  console.log(elem.getBoundingClientRect())
}

function domAddClass(elem, c) {
  elem.classList.add(classObj[c]);
}

let classObj = {
  "p":"paddingStyle"
  ,"m":"marginStyle"
  ,"t":"translateStyle"
  ,"r":"relativeStyle"
  ,"a":"absoluteStyle"
  ,"b":"borderStyle"
  ,"S":"secondContentStyle"
  ,"F":"firstContentStyle"
  ,"C":"testDivStyle"
}

        




