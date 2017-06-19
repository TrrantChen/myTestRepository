/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-06-19 15:00:39
 * @version $Id$
 */

import $ from 'jquery';
import * as util from '../../js/common/util'; 
import { getDomCount, action4EverySonDom } from '../../js/common/domoperation';

$(() => {
  mouseEventThroughDiv();
  selfEventTest();
})

function mouseEventThroughDiv() {
  let buttom = document.querySelector(".buttom");
  let shade = document.querySelector(".shade");
  buttom.addEventListener("mouseenter", mouseEnterHandle)
  shade.addEventListener("mouseenter", (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    let event = new MouseEvent("mouseenter", {
      bubbles:true
      ,cancelable:true
      ,view:window
    })

    buttom.dispatchEvent(event);
  })

  function mouseEnterHandle(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      console.log(evt.target);  
  }
}

function selfEventTest() {
  let button1 = document.querySelector("#button1")
    ,button2 = document.querySelector("#button2");

  button1.addEventListener("click", (evt) => {
    let event = new MouseEvent("click", {
      bubbles:true
      ,cancelable:true
      ,view:window
    })

    let result = button2.dispatchEvent(event);
    console.log(result);
  })

  button2.addEventListener("click",(evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    console.log(evt.target)
    console.log("this is button2")
  })
}






