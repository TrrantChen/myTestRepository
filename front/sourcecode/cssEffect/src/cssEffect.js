import $ from 'jquery';
import  * as util from '../../js/common/util'; 
import { getDomCount, action4EverySonDom, insertStyle2Head} from '../../js/common/domoperation';
import { getRandomInt, getRandomArbitrary } from '../../js/common/random';
$(() => {
  let testAttrModifyCssProperty = document.querySelector("#testAttrModifyCssProperty");
  let testAttrModifyCssPropertyContent = document.querySelector("#testAttrModifyCssPropertyContent");
  btnControlShow(testAttrModifyCssPropertyBtn, testAttrModifyCssPropertyContent);
  // testClick();
  // randomRadiusRain();
  mouseMoveRain();
})

function btnControlShow(btn, content) {
  btn.addEventListener("click", (evt) => {
    content.classList.toggle("show");
    test4CssCustomProp();
  })
}

function testClick() {
  let testBtn = document.querySelector("#testBtn");
  let container = document.querySelector(".container")
  let addRainEffect =  rainEffect(3);
  testBtn.addEventListener("click", (evt) => {
    addRainEffect(container, 100, 100);
  }) 
}

function mouseDownRain() {
  let container = document.querySelector(".container");
  let addRainEffect =  rainEffect(3);
  document.addEventListener("mousedown", (evt) => { 
    addRainEffect(container, evt.pageX, evt.pageY);
    console.log("mouseover");
  })  
}

function mouseMoveRain() {
  let container = document.querySelector(".container");
  let addRainEffect =  rainEffect(3);
  document.addEventListener("mousemove", (evt) => { 
    let randomScale = getRandomArbitrary(1, 10);
    document.documentElement.style.setProperty("--animation-scale", randomScale);
    addRainEffect(container, evt.pageX, evt.pageY);
  })  
}

function randomRain() {
  let container = document.querySelector(".container")
  let addRainEffect = rainEffect(3);
  setInterval((evt) => {
    let startPositionX = getRandomInt(0, 1000)
      ,startPositionY = getRandomInt(0, 600);
    addRainEffect(container, startPositionX, startPositionY)
  }, 50)
}

function randomRadiusRain() {
  let container = document.querySelector(".container")
  let addRainEffect = rainEffect(3);
  setInterval((evt) => {
    let startPositionX = getRandomInt(0, 1000)
      ,startPositionY = getRandomInt(0, 600)
      ,randomScale = getRandomArbitrary(1, 8);
    console.log(randomScale);
    document.documentElement.style.setProperty("--animation-scale", randomScale);
    addRainEffect(container, startPositionX, startPositionY)
  }, 100)  
}

function rainEffect(effectNum) {
  effectNum = effectNum || 1;
  let cssString = ""

  switch (effectNum) {
    case 1:
      cssString = `
        .outterDiv {
          width:0px;
          height:0px;
          border:solid 1px #111;
          position: absolute;
          border-radius: 100%;
          transition: all 1s  ease-in-out; 
          transition-delay:0.3s;
          opacity: 1;
        }

        .innerDiv {
          width:0px;
          height:0px;
          border:solid 1px #111;
          position: absolute;
          border-radius: 100%;
          transition: all 1s  ease-in-out;  
          opacity: 1;
        }  
      `;
      break;
    case 2:
      cssString = `
        .outterDiv {
          width:1px;
          height:1px;
          border:solid 1px #111;
          position: absolute;
          border-radius: 100%;
          opacity: 1;
          animation-name:circleExtend;
          animation-duration:1s;
          animation-timing-function:ease-in-out;
          animation-iteration-count:1;             
        }

        .innerDiv {
          width:1px;
          height:1px;
          border:solid 1px #111;
          position: absolute;
          border-radius: 100%;
          opacity: 1;
          animation-name:circleExtend;
          animation-duration:1s;
          animation-timing-function:ease-out;
          animation-delay:0.2s;
          animation-iteration-count:1;          
        } 

        @keyframes circleExtend {
          0% {
            transform:scale(0, 0);
          }

          50% {
            transform:scale(100, 100);
          }

          100% {
            transform:scale(150, 150);
            opacity:0;
          }
        }       
      `;
      break;
    case 3:
      cssString = `
        .outterDiv {
          width:10px;
          height:10px;
          border:solid 1px #111;
          position: absolute;
          border-radius: 100%;
          opacity: 1;
          animation-name:circleExtend;
          animation-duration:2s;
          animation-timing-function:ease-out;
          animation-iteration-count:1;
          transform: scale(0);             
        }

        .innerDiv {
          width:50px;
          height:50px;
          border:solid 1px #111;
          position: absolute;
          border-radius: 100%;
          opacity: 1;
          animation-name:circleExtend;
          animation-duration:2s;
          animation-timing-function:ease-out;
          animation-delay:0.2s;
          animation-iteration-count:1;
          transform: scale(0); 
       
        } 

        @keyframes circleExtend {
         to {
            transform:scale(var(--animation-scale), var(--animation-scale));
            opacity:0;
          }
        } 

        :root {
          --animation-scale:6;
        }

      `;
    default:
      break;
  }

  insertStyle2Head(cssString);

  return function(container, startPositionX, startPositionY, radius) {
    switch (effectNum) {
      case 1:
        rainEffectRealizeOne(container, startPositionX, startPositionY, radius);
        break;
      case 2:
      case 3:
        rainEffectRealizeTwo(container, startPositionX, startPositionY, radius);
        break;
      default:
        break;
    }
  }
}

function rainEffectRealizeOne(container, startPositionX, startPositionY, radius) {
  if (container !== void 0 && container !== null) {
    radius = radius || 50;
    let outter = document.createElement("div")

    outter.className = "outterDiv";
    outter.style.left = startPositionX + "px";
    outter.style.top = startPositionY + "px"; 
    container.append(outter);

    let computedStyleOutter = window.getComputedStyle(outter);

    outter.style.width = (parseInt(computedStyleOutter.getPropertyValue("width").replace("px", "")) + radius * 2) + "px";
    outter.style.height = (parseInt(computedStyleOutter.getPropertyValue("height").replace("px", "")) + radius * 2) + "px";
    outter.style.left = (parseInt(computedStyleOutter.getPropertyValue("left").replace("px", "")) - radius) + "px";
    outter.style.top = (parseInt(computedStyleOutter.getPropertyValue("top").replace("px", "")) - radius) + "px";
    outter.addEventListener('transitionend',transitionOutterFn) 
    outter.style.opacity = 0;

    function transitionOutterFn(evt) {
      outter.removeEventListener('transitionend', transitionOutterFn)
      outter.remove();
    }  

    let inner = document.createElement("div");

    inner.className = "innerDiv";
    inner.style.left = startPositionX + "px";
    inner.style.top = startPositionY + "px";

    container.append(inner)

    let computedStyleInner = window.getComputedStyle(inner);
    inner.style.width = (parseInt(computedStyleInner.getPropertyValue("width").replace("px", "")) + radius * 2) + "px";
    inner.style.height = (parseInt(computedStyleInner.getPropertyValue("height").replace("px", "")) + radius * 2) + "px";
    inner.style.left = (parseInt(computedStyleInner.getPropertyValue("left").replace("px", "")) - radius) + "px";
    inner.style.top = (parseInt(computedStyleInner.getPropertyValue("top").replace("px", "")) - radius) + "px";
    inner.addEventListener('transitionend',transitionInnerFn) 
    inner.style.opacity = 0;

    function transitionInnerFn(evt) {
      inner.removeEventListener('transitionend', transitionInnerFn)
      inner.remove();
    }   
  }  
}

function rainEffectRealizeTwo(container, startPositionX, startPositionY) {
  if (container !== void 0 && container !== null) {
    let outter = document.createElement("div")

    outter.className = "outterDiv";
    outter.style.left = startPositionX + "px";
    outter.style.top = startPositionY + "px"; 
    outter.addEventListener("animationend", animationOutterEnd);
    container.append(outter)

    function animationOutterEnd(evt) {
      outter.removeEventListener("animationend", animationOutterEnd);
      outter.remove();
    }

    let inner = document.createElement("div");

    inner.className = "innerDiv";  
    inner.style.left = startPositionX + "px";
    inner.style.top = startPositionY + "px";   
    inner.addEventListener("animationend", animationInnerEnd);
    container.append(inner)  

    function animationInnerEnd(evt) {
      inner.removeEventListener("animationend", animationInnerEnd);
      inner.remove();
    }
  }
}

function test4CssCustomProp() {
  let changeCssCustomPropBtn = document.querySelector("#changeCssCustomPropBtn");
  let testCssDiv = document.querySelector(".testCssDiv");
  changeCssCustomPropBtn.addEventListener("click", (evt) => {
    testCssDiv.setAttribute('data-attr', "200px");
    testCssDiv.style.setProperty("--test-width", "400px");
    console.log(window.getComputedStyle(document.documentElement).getPropertyValue("--test-height"));
    document.documentElement.style.setProperty("--animation-scale", 2);
  })
}


