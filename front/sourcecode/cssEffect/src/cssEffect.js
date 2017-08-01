import $ from 'jquery';
import  * as util from '../../js/common/util'; 
import { rainEffect, getDomCount, action4EverySonDom, insertStyle2Head, getAllClassNameArr, ripple, buttonShowContent} from '../../js/common/domoperation';
import { getRandomInt, getRandomArbitrary } from '../../js/common/random';

let container = document.querySelector(".container");
let addRainEffect =  rainEffect(3, {isRandom:true});
let clearRandomId = null;
let clearRandomScaleId = null;
let addButtonShowContent = buttonShowContent();

$(() => {
  let testAttrModifyCssPropertyBtn = document.querySelector("#testAttrModifyCssPropertyBtn");
  let testAttrModifyCssPropertyContent = document.querySelector("#testAttrModifyCssPropertyContent");

  addButtonShowContent(testAttrModifyCssPropertyBtn, testAttrModifyCssPropertyContent);

  let showRainControlBtn = document.querySelector("#showRainControlBtn");
  let showRainControlContent = document.querySelector("#showRainControlContent");
  addButtonShowContent(showRainControlBtn, showRainControlContent);
  
  showRainControlContent.addEventListener("change", (evt) => {
    let id = evt.target.id
      ,isChecked = evt.target.checked;
    switch(id.toLowerCase()) {
        case "rainmousedown":
          if (isChecked) {
            document.addEventListener("mousedown", mouseDownRainHandle);
          } else {
            document.removeEventListener("mousedown", mouseDownRainHandle);
          }
          break;
        case "rainmousemove":
          if (isChecked) {
            document.addEventListener("mousemove", mouseMoveRainHandle);
          } else {
            document.removeEventListener("mousemove", mouseMoveRainHandle);
          }
          break;
        case "autorandom":
          if (isChecked) {
            randomRainHandle();
          } else {
            window.clearInterval(clearRandomId);
          }
          break; 
        case "autorandomscale":
          if (isChecked) {
            randomRadiusRainHandle();
          } else {
            window.clearInterval(clearRandomScaleId)
          }        
          break;                 
    }   
  })

  let showLineLayoutBtn = document.querySelector("#showLineLayoutBtn");
  let showLineLayoutContent = document.querySelector("#showLineLayoutContent");

  addButtonShowContent(showLineLayoutBtn, showLineLayoutContent);

  let showRepeatLinearGradientBtn = document.querySelector("#showRepeatLinearGradientBtn");
  let showRepeatLinearGradientContent = document.querySelector("#showRepeatLinearGradientContent");

  addButtonShowContent(showRepeatLinearGradientBtn, showRepeatLinearGradientContent);

  let showMaterialDesignBtn = document.querySelector("#showMaterialDesignBtn");
  let showMaterialDesignContent = document.querySelector("#showMaterialDesignContent");

  addButtonShowContent(showMaterialDesignBtn, showMaterialDesignContent);

  testClick();
  test4CssCustomProp();

  let materialDesignBtn = document.querySelector("#materialDesignBtn");
  materialDesignBtnFn(materialDesignBtn);

  let showChangeStyleBySheetBtn = document.querySelector("#showChangeStyleBySheetBtn");
  let changeStyleBySheetContent = document.querySelector("#changeStyleBySheetContent");

  addButtonShowContent(showChangeStyleBySheetBtn, changeStyleBySheetContent);

  let changeStyleBtn = document.querySelector("#changeStyleBtn");
  changeStyleBtn.addEventListener("click", (evt) => {
    changeStyleUseSheet();
  })

  let showCssPseudoClassTestBtn = document.querySelector("#showCssPseudoClassTestBtn");
  let cssPseudoClassTestContent = document.querySelector("#cssPseudoClassTestContent");

  addButtonShowContent(showCssPseudoClassTestBtn, cssPseudoClassTestContent);
  pseudoClassTest();


  addButtonShowContent(document.querySelector("#showClassPriorityBtn"), document.querySelector("#showClassPriorityContent"))
})

function testClick() {
  let testBtn = document.querySelector("#testBtn");
  testBtn.addEventListener("click", (evt) => {
    addRainEffect(container, 100, 100);
  }) 
}

function mouseDownRainHandle(evt) {
  addRainEffect(container, evt.pageX, evt.pageY); 
}

function mouseMoveRainHandle(evt) {
    let randomScale = getRandomArbitrary(1, 10);
    document.documentElement.style.setProperty("--animation-scale", randomScale);
    addRainEffect(container, evt.pageX, evt.pageY);  
}

function randomRainHandle() {
  clearRandomId = setInterval((evt) => {
    let startPositionX = getRandomInt(0, 1000)
      ,startPositionY = getRandomInt(0, 600);
    addRainEffect(container, startPositionX, startPositionY)
  }, 50)
}

function randomRadiusRainHandle() {
  function fn() {
    let startPositionX = getRandomInt(0, 1000)
      ,startPositionY = getRandomInt(0, 600)
    addRainEffect(container, startPositionX, startPositionY); 
  };
  clearRandomScaleId = setInterval(fn, 300);
}

function test4CssCustomProp() {
  let changeCssCustomPropBtn = document.querySelector("#changeCssCustomPropBtn");
  let testCssDiv = document.querySelector(".testCssDiv");
  let isChangeColor = true;
  changeCssCustomPropBtn.addEventListener("click", (evt) => {
    testCssDiv.setAttribute('data-attr', "200px");
    testCssDiv.style.setProperty("--test-width", "400px");
    // 获取css自定义属性
    console.log(window.getComputedStyle(document.documentElement).getPropertyValue("--test-height"));
    // 修改css全局自定义属性
    document.documentElement.style.setProperty("--animation-scale", 2);
    isChangeColor = !isChangeColor;
    let value = isChangeColor ? 'blue' : 'green';
    document.documentElement.setAttribute('lang', value);

  })
}

function materialDesignBtnFn(btn) {
  ripple(btn);
}

function changeStyleUseSheet() {
  document.styleSheets[1].cssRules[20].style.background = "#F4DD51";
}

function pseudoClassTest() {
  let addHover = document.querySelector("#addHover")
    , originStyle = null;
  addHover.addEventListener("mouseover", (evt) => {
    // console.log("mouseover " + originStyle);
    evt.target.style.cursor = "move";
  })

  addHover.addEventListener("mouseout", (evt) => {
    // console.log("mouseout " + originStyle);
    // document.documentElement.style.cursor = "default";
  })
}


