import $ from 'jquery';
import  * as util from '../../js/common/util'; 
import { getDomCount, action4EverySonDom } from '../../js/common/domoperation';
$(() => {
  let isShowTestTransitionEventClash = true;
  let testTransitionEventClash = document.querySelector("#testTransitionEventClash");
  let testTransitionEventClashContent = document.querySelector("#testTransitionEventClashContent");
  testTransitionEventClash.addEventListener("click", (evt) => {
    isShowTestTransitionEventClash = !isShowTestTransitionEventClash;

    if(isShowTestTransitionEventClash) {
      testTransitionEventClashContent.style.display = "block";
    } else {
      testTransitionEventClashContent.style.display = "none";
    }
  })
  testClick()
})

function testClick() {
  let testBtn = document.querySelector("#testBtn");
  let testDiv = document.querySelector("#testDiv");
  testBtn.addEventListener("click", (evt) => {
    let radius = 50;
    let computedStyle = window.getComputedStyle(testDiv);
    testDiv.style.width = (parseInt(computedStyle.getPropertyValue("width").replace("px", "")) + radius * 2) + "px";
    testDiv.style.height = (parseInt(computedStyle.getPropertyValue("height").replace("px", "")) + radius * 2) + "px";
    testDiv.style.left = (parseInt(computedStyle.getPropertyValue("left").replace("px", "")) - radius) + "px";
    testDiv.style.top = (parseInt(computedStyle.getPropertyValue("top").replace("px", "")) - radius) + "px";
    testDiv.style.opacity = 1;
  })  
}

function clickRain() {
  let container = document.querySelector(".container");
  document.addEventListener("mousedown", (evt) => { 
    let outter = document.createElement("div");
    outter.className = "outterDiv";
    outter.style.left = evt.pageX + "px";
    outter.style.top = evt.pageY + "px";
    container.append(outter)
    let radius = 50;
    let computedStyleOutter = window.getComputedStyle(outter);
    outter.style.width = (parseInt(computedStyleOutter.getPropertyValue("width").replace("px", "")) + radius * 2) + "px";
    outter.style.height = (parseInt(computedStyleOutter.getPropertyValue("height").replace("px", "")) + radius * 2) + "px";
    outter.style.left = (parseInt(computedStyleOutter.getPropertyValue("left").replace("px", "")) - radius) + "px";
    outter.style.top = (parseInt(computedStyleOutter.getPropertyValue("top").replace("px", "")) - radius) + "px";
    outter.addEventListener('transitionend',transitionFn) 
    outter.style.opacity = 0;
    function transitionFn(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      outter.removeEventListener('transitionend', transitionFn)
      outter.remove();
    }   

    let inner = document.createElement("div");
    inner.className = "innerDiv";
    inner.style.left = evt.pageX + "px";
    inner.style.top = evt.pageY + "px";
    container.append(inner)
    let computedStyleInner = window.getComputedStyle(inner);
    inner.style.width = (parseInt(computedStyleInner.getPropertyValue("width").replace("px", "")) + radius * 2) + "px";
    inner.style.height = (parseInt(computedStyleInner.getPropertyValue("height").replace("px", "")) + radius * 2) + "px";
    inner.style.left = (parseInt(computedStyleInner.getPropertyValue("left").replace("px", "")) - radius) + "px";
    inner.style.top = (parseInt(computedStyleInner.getPropertyValue("top").replace("px", "")) - radius) + "px";
    inner.addEventListener('transitionend',transitionFn) 
    inner.style.opacity = 0;
    function transitionFn(evt) {
      inner.removeEventListener('transitionend', transitionFn)
      inner.remove();
    }   

  })  
}

function transitionEndClash() {
  let test1 = document.querySelector("#test1")
    , test2 = document.querySelector("#test2");

  test1.style.width = "200px";
  test1.addEventListener("transitionend", test1TransitionEnd)

  test2.style.width = "200px";
  test2.addEventListener("transitionend", test2TransitionEnd)

  function test1TransitionEnd(evt) {
    test1.remove();
    console.log("test1 transition end");
  }

  function test2TransitionEnd(evt) {
    console.log("test2 transition end");
  }
}