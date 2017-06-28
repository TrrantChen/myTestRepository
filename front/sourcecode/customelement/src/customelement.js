/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-06-27 09:17:41
 * @version $Id$
 */

import $ from 'jquery';
import * as util from '../../js/common/util'; 
import { getDomCount, action4EverySonDom } from '../../js/common/domoperation';

let container = document.querySelector(".container");

$(() => {
  createCustomElement();
})

function createCustomElement() {
  class BasicElement extends HTMLElement {
    connectedCallback() {
      this.textContent = 'Just a basic custom element.';
    }
  }

  let testElem = customElements.define('basic-element', BasicElement);
  
  container.append(testElem);
}



/*------------弃用使用customElement替代document.registerElement------------*/
  function extendElementByRegister(){
    let proto = Object.create(HTMLButtonElement.prototype, {istest:{value:"this is test"}});

    proto.createdCallback = function() {
      console.log("this is created call back");
    }

    let MegaButton = document.registerElement('mega-button', {
      prototype:proto
    });

    let button1 = document.createElement("button", "mega-button")
    , button2 = new MegaButton()
    , button3 = document.createElement("mega-button");

    button1.innerText = "this is button1";
    button2.innerText = "this is button2";
    button3.innerText = "this is button3";
    container.append(button1);
    container.append(button2);
    container.append(button3);

    var button1Properties =  util.getAllInstanceProperties(button1.__proto__);
    var button2Properties =  util.getAllInstanceProperties(button2.__proto__);

    console.log(button1Properties.length);
    console.log(button2Properties.length)
  }

  function showCustomElementEventByRegister(){
    let proto = Object.create(HTMLElement.prototype);

    proto.createdCallback = function() {
      console.log("this is created call back");
    }

    proto.attachedCallback = function() {
      console.log("this is attached call back");
    }

    proto.detachedCallback = function() {
      console.log("this is detachedCallback")
    }

    proto.attributeChangedCallback = function() {
      console.log("this is attributeChangedCallback")
    }

    let XFoo = document.registerElement('x-foo', {prototype:proto})
      ,xfoo = document.createElement('x-foo');

    container.append(xfoo);

    let removeButton = document.querySelector("#removeButton")
    removeButton.addEventListener("click", () => {
      xfoo.remove();
    })
  }
/*------------弃用使用customElement替代document.registerElement------------*/



