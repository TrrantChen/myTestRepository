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
  customEventTest();
})

function mouseEventThroughDiv() {
  let buttom = document.querySelector(".buttom");
  let shade = document.querySelector(".shade");
  // let son = document.querySelector(".son");
  buttom.addEventListener("mousedown", (evt) => {
    console.log("buttom " + evt.screenX);
    console.log("buttom target ")
    console.log(evt.target);
    console.log("buttom current target ")
    console.log(evt.currentTarget);
    console.log(evt.relatedTarget);
  })
  // son.addEventListener("mousedown", (evt) => {
  //   console.log("son")
  // })

  shade.addEventListener("mousedown", (evt) => {
    let event = new MouseEvent("mousedown", {
      bubbles:true
      ,cancelable:true
      ,view:window
      ,screenX:evt.screenX
      ,relatedTarget:son
    })
    console.log("shade " + evt.screenX);
    console.log("shade target") 
    console.log(evt.target);
    console.log("shade current target ") 
    console.log(evt.currentTarget);
    buttom.dispatchEvent(event);
  })
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

function customEventTest() {
  let customEventBtn = document.querySelector("#customEventBtn")
    ,event = new CustomEvent("cat", {'detail':"this is test message"});

  
  customEventBtn.addEventListener("cat", (evt) => {
    console.log(evt.detail);
  });

  customEventBtn.dispatchEvent(event);
}






