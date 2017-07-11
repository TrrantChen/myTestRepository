import $ from 'jquery';
import  * as util from '../../js/common/util'; 
import { getDomCount, action4EverySonDom } from '../../js/common/domoperation';
let container = document.querySelector(".container");
$(() => {
  let test = document.querySelector("#test");

  test.addEventListener("mousedown", (evt) => {
    console.log(evt.offsetX + " " + evt.offsetY);
  })

  test.addEventListener("mouseup", (evt) => {
  })

  test.addEventListener("click", (evt) => {
  })


})