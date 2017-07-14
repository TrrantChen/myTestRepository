import $ from 'jquery';
import  * as util from '../../js/common/util'; 
import { rainEffect, getDomCount, action4EverySonDom, insertStyle2Head, getAllClassNameArr} from '../../js/common/domoperation';
import { getRandomInt, getRandomArbitrary } from '../../js/common/random';

let container = document.querySelector(".container");
let addRainEffect =  rainEffect(3);
let clearRandomId = null;
let clearRandomScaleId = null;

$(() => {
  let testAttrModifyCssPropertyBtn = document.querySelector("#testAttrModifyCssPropertyBtn");
  let testAttrModifyCssPropertyContent = document.querySelector("#testAttrModifyCssPropertyContent");

  btnControlShow(testAttrModifyCssPropertyBtn, testAttrModifyCssPropertyContent);

  let showRainControlBtn = document.querySelector("#showRainControlBtn");
  let showRainControlContent = document.querySelector("#showRainControlContent");
  btnControlShow(showRainControlBtn, showRainControlContent);

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
            randomRadiusRainHandleWithCustomProperty();
          } else {
            window.clearInterval(clearRandomScaleId)
          }        
          break;                 
    }   
  })

  let showLineLayoutBtn = document.querySelector("#showLineLayoutBtn");
  let showLineLayoutContent = document.querySelector("#showLineLayoutContent");

  btnControlShow(showLineLayoutBtn, showLineLayoutContent);

  let showRepeatLinearGradientBtn = document.querySelector("#showRepeatLinearGradientBtn");
  let showRepeatLinearGradientContent = document.querySelector("#showRepeatLinearGradientContent");

  btnControlShow(showRepeatLinearGradientBtn, showRepeatLinearGradientContent);

  let showMaterialDesignBtn = document.querySelector("#showMaterialDesignBtn");
  let showMaterialDesignContent = document.querySelector("#showMaterialDesignContent");

  btnControlShow(showMaterialDesignBtn, showMaterialDesignContent);

  testClick();
  test4CssCustomProp();

  let materialDesignBtn = document.querySelector("#materialDesignBtn");
  materialDesignBtnFn(materialDesignBtn);
})

function btnControlShow(btn, content) {
  btn.addEventListener("click", (evt) => {
    content.classList.toggle("show");
    
  })
}

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

function randomRadiusRainHandleWithCustomProperty() {
  function fn() {
    let startPositionX = getRandomInt(0, 1000)
      ,startPositionY = getRandomInt(0, 600)
      ,randomScale = getRandomArbitrary(1, 8);
    document.documentElement.style.setProperty("--animation-scale", randomScale);
    addRainEffect(container, startPositionX, startPositionY)   
  };
  clearRandomScaleId = setInterval(fn, 300);
}

/*
  使用增删样式表来控制动画，但是效果不好，会出现卡顿。
 */
function randomRadiusRainHandleWithInsertAndDelete() {
  function fn() {
    let startPositionX = getRandomInt(0, 1000)
      ,startPositionY = getRandomInt(0, 600)
      ,randomScale = getRandomArbitrary(1, 8)
      ,styleSheetList =  document.styleSheets[1];

    styleSheetList.deleteRule(2);
    styleSheetList.insertRule(`@keyframes circleExtend {to {transform:scale(${randomScale}, ${randomScale});opacity:0;}}`, 2);
    addRainEffect(container, startPositionX, startPositionY)   
  };
  setInterval(fn, 300);  
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
  // let cssArr = [{
  //   className:".materialDesignBtnStyle"
  //   ,classValue:`{
  //     position:relative;
  //   }`
  // }
  // , {
  //   className:".waveDiv"
  //   ,classValue:`
  //   {
  //     width:20px;
  //     height:20px;
  //     border-radius:100%;
  //     position:absolute;
  //     background:rgb(0,0,0);
  //     animation-name:waveanimation;
  //     animation-duration:0.6s;
  //     animation-timing-function:ease-out;
  //     animation-iteration-count:1;
  //     transform: scale(0);
  //     opacity:0;
  //   }
  //   `
  // }
  // , {
  //   className:"@keyframes waveanimation"
  //   ,classValue:`
  //   {
  //     to {
  //       transform:scale(3, 3);
  //       opacity:0;
  //     }
  //   }      
  //   `
  // }]

  // insertStyle2Head(cssArr, false, false);
  
  
  btn.addEventListener("click", clickHandle)
  btn.classList.add("materialDesignBtnStyle");
  
  let div = createDiv();

  btn.append(div);

  function clickHandle(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    div.style.left = evt.offsetX;
    div.style.top = evt.offsetY;
    div.style.opacity = 1;
  }

  div.addEventListener("animationend", animationendHandle)

  function animationendHandle(evt) {
     div.style.opacity = 0;
  }


  function createDiv() {
    let div = document.createElement("div");
    div.className = "waveDiv";
    return div;
  }
}


