/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-06-19 15:00:39
 * @version $Id$
 */

import $ from 'jquery';
import * as util from '../../js/common/util'; 
import { getDomCount, action4EverySonDom, preventElemAddEvent, ButtonContent, initGetAllElementEventFn, getElemAllEvent, getAllEvent} from '../../js/common/domoperation';
import { isClear, eventObj } from '../../js/common/symbolManage';

$(() => {
  let buttonContent = new ButtonContent(".container");
  buttonContent.addButtonAndContent(`
      <div class="buttom">
          <div class="son">
            
          </div>
      </div>
      <div class="shade">
        
      </div>    
      `, {
        btnText:"mouseEnterHandle"
        , contentStyleArr:["mouseEnterHandle"]
      });

  buttonContent.addButtonAndContent(`
    <button id="button1">button1</button>
    <button id="button2">button2</button>  
    `
    , {
      btnText:"selfEventTest"
      , contentStyleArr:["selfEventTest"]
    });

  buttonContent.addButtonAndContent(`
    <button id="customEventBtn">customEventBtn</button>
    `
    , {
      btnText:"customEventTest"
      , contentStyleArr:["customEventTest"]
    });

  buttonContent.addButtonAndContent(`
    <button id="removeElemDefaultEventBtn" class="buttonStyle">test</button>
    `
    , {
      btnText:"removeElemDefaultEventTest"
    }
  );  

  buttonContent.addButtonAndContent(`
    <button id="showElemEvent" class="buttonStyle">showElemEvent</button>
    <button id="removeClickEvent" class="buttonStyle">removeClickEvent</button>
    <button id="addClickEvent" class="buttonStyle">addClickEvent</button>
    <div id="testDiv" style="width:100px;height:100px;background:black;"></div>
    `
    , {
      btnText:"elemEventTest"
    }
  )  

  buttonContent.addButtonAndContent(`
    <div id="eventClassThisTestDiv" style="width:100px;height:100px;background:black;"></div>
    `
    , {
      btnText:"eventClassThisTest"
    }
  )  

  // mouseEventThroughDiv();
  // selfEventTest();
  // customEventTest();
  // removeElemDefaultEventTest();
  // showElemEventTest();
  eventClassThis();
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

function removeElemDefaultEventTest() {
  preventElemAddEvent("removeElemDefaultEventBtn");

  let btn = document.querySelector("#removeElemDefaultEventBtn");
  btn.addEventListener("click", (evt) => {
    alert("test");
  }); 
}

function showElemEventTest() {
  initGetAllElementEventFn();
  let showElemEvent = document.querySelector("#showElemEvent");
  let removeClickEvent = document.querySelector("#removeClickEvent");
  let addClickEvent = document.querySelector("#addClickEvent");
  let testDiv = document.querySelector("#testDiv");

  showElemEvent.addEventListener("click", (evt) => {
    console.log(getElemAllEvent("testDiv"));
  })

  addClickEvent.addEventListener("click", (evt) => {
    testDiv.addEventListener("click", clickHandle);
  })
  
  removeClickEvent.addEventListener("click", (evt) => {
    testDiv.removeEventListener("click", clickHandle);
  })

  function clickHandle() {
    console.log("this is click");
  }
}

function eventClassThis() {
  let eventClassThisTestDiv = document.querySelector("#eventClassThisTestDiv");
  // let eventClass = new EventClass(eventClassThisTestDiv);
  let eventFn = new EventFn(eventClassThisTestDiv);
}

class EventClass {
  constructor(elem) {
    this.target = elem;
    this.target.addEventListener("mousedown", this.mousedownHandle.bind(this));
    this.value = 1
  }

  mousedownHandle(evt) {
    console.log("this is mousedown");
    console.log(this.value)
    document.addEventListener("mousemove", this.mousemoveHandle.bind(this));
    document.addEventListener("mouseup", this.mouseupHandle.bind(this));
  }

  mousemoveHandle(evt) {
    console.log(this.value)
    console.log("this is mousemove");
  }

  mouseupHandle(evt) {
    console.log("this is mouseup");
    console.log(this.value)
    document.removeEventListener("mousemove", this.mousemoveHandle);
    document.removeEventListener("mouseup", this.mouseupHandle);
  }
}

function EventFn(elem) {
  this.target = elem;
  this.value = 1
  this.target.addEventListener("mousedown", EventFn.prototype.mousedownHandle.bind(this));
}

EventFn.prototype.mousedownHandle = function(evt){
  console.log("this is mousedown");
  console.log(this.value)
  document.addEventListener("mousemove", EventFn.prototype.mousemoveHandle.bind(this));
  document.addEventListener("mouseup", EventFn.prototype.mouseupHandle.bind(this));
}

EventFn.prototype.mousemoveHandle = function(evt) {
    console.log(this.value)
    console.log("this is mousemove");
  }

EventFn.prototype.mouseupHandle = function(evt) {
    console.log("this is mouseup");
    console.log(this.value)
    document.removeEventListener("mousemove", EventFn.prototype.mousemoveHandle);
    document.removeEventListener("mouseup", EventFn.prototype.mouseupHandle);
}


