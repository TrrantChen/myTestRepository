/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-06-20 15:40:22
 * @version $Id$
 */
import $ from 'jquery';
import * as util from '../../js/common/util'; 
import { getDomCount, action4EverySonDom } from '../../js/common/domoperation';

$(() => {
  let container = document.querySelector(".container")
  ,mouseoverDiv = document.querySelector("#mouseoverDiv")
  ,clickDiv = document.querySelector("#clickDiv")
  ,moduleDiv = document.querySelector("#moduleDiv")
  ,closeDiv = document.querySelector("#closeDiv")
  ,containerChildren = container.children
  ,containerChildrenLength = container.children.length
  ,test11 = document.querySelector(".test11");

  for (var i = 0; i < containerChildrenLength; i++) {
    let dom = containerChildren[i];
    if ((/MODULE/g).test(dom.nodeName)) {
      dom.addEventListener("mouseover", (evt) => {
          evt.stopPropagation();
          let mouseoverDom = evt.target;
          let moduleDom = evt.currentTarget;
          setDomBoundingClientRect(mouseoverDiv, mouseoverDom);  
          setDomBoundingClientRect(moduleDiv, moduleDom);  
          console.log("this is dom")  
      })

      dom.addEventListener("click", (evt) => {
        evt.stopPropagation();
        let clickDom = evt.target;
        setDomBoundingClientRect(clickDiv, clickDom);
      })
    }
  }

  moduleDiv.addEventListener("mouseover", (evt) => {
    let event = new MouseEvent("mouseover", {
      bubbles:true
      ,cancelable:false
      ,view:window
    })
    console.log("shadow");
    test11.dispatchEvent(event);
  })

  closeDiv.addEventListener("click", () => {
    alert("test");
  })

})

function setDomBoundingClientRect(target, source) {

  let boundingClientRect = source.getBoundingClientRect();

  target.style.width = boundingClientRect.width + "px";
  target.style.height = boundingClientRect.height + "px";
  target.style.transform = `translate(${boundingClientRect.left}px, ${boundingClientRect.top}px)`
}

let currentDiv = document.querySelector("#currentDiv")
