import $ from 'jquery';
import _ from 'underscore';
import '../../lib/jquery-ui-1.12.1.custom/jquery-ui';
import * as util from '../../js/common/util'; 
import * as domoperation from '../../js/common/domoperation';
import * as interaction from '../../js/common/interaction';

window.onload = function() {
  let getFrame = document.querySelector("#getFrame");
  let hBtn = document.querySelector("#hBtn");
  let vBtn = document.querySelector("#vBtn");

  hBtn.addEventListener("click", (evt) => {
    let domArrLength = selectedArr.length;
    if (domArrLength !== 0) {
      interaction.align(selectedArr, {align:"h"});
    }
  })

  vBtn.addEventListener("click", (evt) => {
    let domArrLength = selectedArr.length;
    if (domArrLength !== 0) {
      interaction.align(selectedArr, {align:"v"});
    }
  })  

  getFrame.addEventListener("click", (evt) => {
    let winAndDoc = domoperation.getWinAndDoc();

    console.log(winAndDoc.win);
    console.log(winAndDoc.doc);
  })

  let sonframe = document.querySelector("#sonframe");
  let sonDoc = sonframe.contentDocument;
  let sonWin = sonframe.contentWindow;
  let control1 = document.querySelector("#control1");
  let control2 = document.querySelector("#control2");
  let control3 = document.querySelector("#control3");
  let selectedArr = [];
  var id = 0;
  let sonFrameMain = sonDoc.querySelector("#sonFrameMain");
  let sonFrameMain2 = sonDoc.querySelector("#sonFrameMain2");
  domoperation.setFrame(sonframe);
  control1.addEventListener("click", (event) => {
    ++id;   
    let insertStr = `
                <div id="test${id}" class="testDivClass">
                </div>`
      , cssObj = {
        id:"testDiv"
        , cssArr:[{
          className:".testDivClass"
          ,classValue:`
          {
            width:100px;
            height:100px;
            background:#D9D5A7;
            position:absolute;
            left:0;
            top:0;
          }`
        }]
      };

    domoperation.insertStyle2Head(cssObj, {isCheckRepeat:true, isInsertFirst:true});
    domoperation.insertStr2Dom(insertStr, sonFrameMain)
    interaction.dragable("#test" + id, {frame:sonframe});
  })

  interaction.selectable(sonFrameMain, {
    frame:sonframe
    ,selected:(evt) => {
      if (evt.selectedArr !== void 0 && evt.selectedArr !== null) {
        selectedArr = evt.selectedArr;
      }   
    }
  })  

  control2.addEventListener("click", (event) => {
    ++id;   
    let insertStr = `
                <div id="test${id}" class="testDivClass">
                </div>`;

    domoperation.insertStr2Dom(insertStr, sonFrameMain2)
    interaction.dragable("#test" + id, {frame:sonframe});
  })

  control3.addEventListener("click", (event) => {
    let str =   'var sonFrameMain = document.querySelector("#sonFrameMain");'
              + 'var dom = document.createElement("div");'
              + 'dom.style.width = "50px";'
              + 'dom.style.height = "50px";'
              + 'dom.style.background = "red";'
              + 'sonFrameMain.append(dom);'
    let script = document.createElement("script");
    script.innerText = str
    let sonframe = document.querySelector("#sonframe");
    let body = sonframe.contentDocument.body;
    body.append(script);
  })
}