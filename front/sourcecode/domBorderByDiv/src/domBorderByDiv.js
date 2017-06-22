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
  let container = document.querySelector(".container");
  let currentDiv = document.querySelector("#currentDiv");
  action4EverySonDom(container, (dom)=> {
    dom.addEventListener("mouseover", (evt) => {
      currentDiv.style.borderColor = "red";
      evt.preventDefault();
      evt.stopPropagation();
      let targetDom = evt.target
      ,boundingClientRect = targetDom.getBoundingClientRect();
      console.log(targetDom);
      console.log(`width:${boundingClientRect.width} height:${boundingClientRect.height} left:${boundingClientRect.left + window.scrollX} top:${boundingClientRect.top + window.scrollY}`)
      currentDiv.style.width = boundingClientRect.width + "px";
      currentDiv.style.height = boundingClientRect.height + "px";
      currentDiv.style.transform = `translate(${boundingClientRect.left}px, ${boundingClientRect.top}px)`
    });

    dom.addEventListener("click", (evt) => {
      evt.stopPropagation();
      currentDiv.style.borderColor = "green";
    })
  })


})
