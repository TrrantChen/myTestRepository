import $ from 'jquery';
import _ from 'underscore';
import '../../lib/jquery-ui-1.12.1.custom/jquery-ui';
import * as util from '../../js/common/util'; 
import * as domoperation from '../../js/common/domoperation';
import * as interaction from '../../js/common/interaction';

let align = void 0;

window.onload = function() {
  let getFrame = document.querySelector("#getFrame");
  let hBtn = document.querySelector("#hBtn");
  let vBtn = document.querySelector("#vBtn");
  let revocationBtn = document.querySelector("#revocationBtn");

  hBtn.addEventListener("click", (evt) => {
    let domArrLength = selectedArr.length;
    if (domArrLength !== 0) {
      align = new interaction.Align(selectedArr, {alignType:"h"});
    }
  })

  vBtn.addEventListener("click", (evt) => {
    let domArrLength = selectedArr.length;
    if (domArrLength !== 0) {
      align = new interaction.Align(selectedArr, {alignType:"v"});
    }
  })  

  revocationBtn.addEventListener("click", (evt) => {
    if (align !== void 0) {
      align.revocation();
    }
  })

  getFrame.addEventListener("click", (evt) => {
    let winAndDoc = domoperation.getWinAndDoc();
  })

  let sonframe = document.querySelector("#sonframe");
  let sonDoc = sonframe.contentDocument;
  let sonWin = sonframe.contentWindow;
  let control1 = document.querySelector("#control1");
  let control2 = document.querySelector("#control2");
  let control3 = document.querySelector("#control3");
  let selectedArr = [];
  let selectedArrObj = [{
    elem:null
    ,targetOffsetInfo:{
      x:0
      ,y:0
    }
  }];
  var id = 0;
  let sonFrameMain = sonDoc.querySelector("#sonFrameMain");
  let sonFrameMain2 = sonDoc.querySelector("#sonFrameMain2");
  domoperation.setFrame(sonframe);
  let dynamicReferenceLine = new interaction.DynamicReferenceLine(sonFrameMain, { frame:sonframe });

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
    let div = domoperation.insertStr2Dom(insertStr, sonFrameMain)
    let dragable = new interaction.Dragable(div, {
      frame:sonframe
      ,containment:"#sonFrameMain"
      ,mousedown:(evt, targetOffsetInfo) => {
        [].slice.call(sonFrameMain.querySelectorAll(".clicked")).forEach((div) => {
          div.classList.remove("clicked");
        })

        if (align !== void 0) {
          align.clearOriginOffsetInfo();
        }

        div.classList.add("clicked");
        selectedArrObj = [];
        let length = selectedArr.length
        if (length > 1) {
          if (selectedArr.indexOf(div) !== -1) {
            for (var i = 0; i < length; i++) {
              if (selectedArr[i] === div) {
                continue;
              }

              let elementComputedStyle = domoperation.getElementComputedStyle(selectedArr[i])
              ,translate = domoperation.getTheTranslate(elementComputedStyle);
              selectedArrObj.push({
                elem:selectedArr[i]
                ,targetOffsetInfo:{
                  x:translate.x
                  ,y:translate.y
                }              
              })
            }
          }
          else {

          }
        }

        dynamicReferenceLine.show();
        setDynamicReferenceLine(dynamicReferenceLine, targetOffsetInfo)
      },mousemove:(evt, moveDistance, mouseMoveTargetOffsetInfo) => {
        if (selectedArrObj.length !== 0) {
          selectedArrObj.forEach((selectedItem) => {
            selectedItem.elem.style.transform = `translate(${selectedItem.targetOffsetInfo.x + moveDistance.x}px, ${selectedItem.targetOffsetInfo.y + moveDistance.y}px)`;
          })
        }
        setDynamicReferenceLine(dynamicReferenceLine, mouseMoveTargetOffsetInfo)
      },mouseup:(evt) => {
        dynamicReferenceLine.hide();
      }
    });
  })

  interaction.selectable(sonFrameMain, {
    frame:sonframe
    ,filterArr:[].slice.call(sonFrameMain.querySelectorAll(".dynamicReferenceLineStyle"))
    ,mousedown:(evt) => {
      [].slice.call(sonFrameMain.querySelectorAll(".clicked")).forEach((div) => {
        div.classList.remove("clicked");
      })      
      dynamicReferenceLine.hide();
      if (align !== void 0) {
        align.clearOriginOffsetInfo();
      }      
    }
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
    let dom = domoperation.insertStr2Dom(insertStr, sonFrameMain2)
    $(dom).draggable();

  })

  control3.addEventListener("click", (event) => {
    ++id;   
    let insertStr = `
                <div id="test${id}" class="testDivClass1">
                </div>`
      , cssObj = {
        id:"testDiv1"
        , cssArr:[{
          className:".testDivClass1"
          ,classValue:`
          {
            width:200px;
            height:50px;
            background:#D2D5B5;
            position:absolute;
            left:0;
            top:0;
          }`
        }]
      };

    domoperation.insertStyle2Head(cssObj, {isCheckRepeat:true, isInsertFirst:true});
    domoperation.insertStr2Dom(insertStr, sonFrameMain)
    let dragable = new interaction.Dragable("#test" + id, {frame:sonframe});
  })
}

function setDynamicReferenceLine(dynamicReferenceLine, translate) {
  dynamicReferenceLine.setHorizontalLinePosition({x:0, y:translate.y});
  dynamicReferenceLine.setVerticalLinePosition({x:translate.x , y:0});
  dynamicReferenceLine.setHorizontalLineWidthAndLabel(translate.x);
  dynamicReferenceLine.setVerticalLineHeightAndLabel(translate.y);     
}


