import {getElement, checkCss3Support, setFrame, getScrollParent, getElemBoundingClientRect, 
  getElementComputedStyle, getPosition, getTheTranslate, getMargin, getPadding, insertStyle2Head, setTheTranslate, initGetAllElementEventFn, getAllEvent, getElemAllEvent} from './domoperation';
import * as util from './util';
import { MouseButton } from './enum'

/*
 option {
   axis:x, y, all
   containment: selector
   translate:true/false   // 是否使用translate替代position
   handle: selector
   cancel:selector
   revert: true/false 
   frame: iframe dom  
 }
 范围选择
 自动滚动
 */
export function dragable(selector, optionPara) {
  let defaultOption = {
      axis: "all"
      ,translate: true
      ,revert: false
      ,frame:{
        contentDocument:document
        ,contentWindow:window
      }       
    }
    ,target = getElement(selector)
    ,option = Object.assign(defaultOption, optionPara)
    ,isTranslate = checkCss3Support("transform") && option.translate
    ,targetPositionInfo = updateTargetPositionInfo(target)
    ,mouseDownPage = { x: 0, y: 0 }
    ,containment = getElement(option.containment)
    ,containmentPositionRange = getContainmentPositionRange()
    // ,originTranslate = null
    ,mosueDownTargetLocationInfo = null
    
    ,isRangeLimit = containment !== void 0 ? true : false
    ,handleSelector = option.handle !== void 0 ? (option.handle === "this" ? target : getElement(option.handle)) : void 0
    ,cancelSelector = option.cancel !== void 0 ? getElement(option.cancel) : void 0
    // ,scrollLeftAdd = 10
    // ,scrollTopAdd = 10
    // ,scrollParent = void 0
    // ,scrollParentBoundingClientRect = void 0    
    ,doc = option.frame.contentDocument
    ,win = option.frame.contentWindow
    
    ,css = {
      id :"dragCss"
      , cssArr : [{
        className:".dragCursorMove:hover"
        ,classValue:`{
          cursor:move
        }
        `
      }
      ,{
        className:".dragCursorDefault:hover"
        ,classValue:`{
          cursor:default
        }
        `
      }]
    }

  setFrame(option.frame);
  insertStyle2Head(css, {isCheckRepeat:true});

  if (containment !== void 0) {
    // if (domoperation.getElementComputedStyle(containment)("overflow").toLowerCase() !== "visible"){
    //     isRangeLimit = false;
    // } else {
    //     isRangeLimit = true;
    // }
  } 

  /*
    获取滚动的信息
    // scrollParent = getScrollParent(target);

    // if (scrollParent !== void 0) {
    //   if (scrollParent !== doc) {
    //     scrollParentBoundingClientRect = getElemBoundingClientRect(scrollParent);
    //   } else {
    //     scrollParentBoundingClientRect = {
    //       left: win.scrollX,
    //       top: win.scrollY,
    //       right: doc.body.scrollWidth,
    //       bottom: doc.body.scrollHeight
    //     }
    //   }
    // }

    // let originPageX = 0;
    // let scrollLeftAddFunc = _.throttle(function(scrollParent, event) {
    //   let distance = event.pageX - originPageX;
    //   scrollParent.scrollLeft += distance;
    //   originPageX = 0;
    // }, 100);
   */

  if (option.handle !== void 0 && option.handle !== "this") {
    target.classList.add("dragCursorDefault");
    handleSelector.classList.add("dragCursorMove");
  } else {
    target.classList.add("dragCursorMove");
  }

  if (option.cancel !== void 0) {
    cancelSelector.classList.add("dragCursorDefault");
  } 

  target.addEventListener("mousedown", mouseDownHandle);

  function mouseDownHandle(event) {
    event.preventDefault();
    event.stopPropagation();

    if ((option.handle !== void 0 && handleSelector !== event.target) || (option.cancel !== void 0 && cancelSelector === event.target) || event.button !== MouseButton.left) {
      return;
    }

    mouseDownPage.x = event.pageX;
    mouseDownPage.y = event.pageY;
    targetPositionInfo = updateTargetPositionInfo(target);
    mosueDownTargetLocationInfo = isTranslate ? targetPositionInfo.translate : targetPositionInfo.position;

    doc.addEventListener("mousemove", mouseMoveHandle);
    doc.addEventListener("mouseup", mouseUpHandle);
  }

  function mouseMoveHandle(event) {
    event.preventDefault();
    event.stopPropagation();

    let mouseMovePoint =  getMouseMovePoint(event)
      ,x = mouseMovePoint.x
      ,y = mouseMovePoint.y;

    if (isRangeLimit) {
      if (mouseMovePoint.x < containmentPositionRange.left) {
        mouseMovePoint.x = containmentPositionRange.left;
      }

      if (mouseMovePoint.x > containmentPositionRange.right) {
        mouseMovePoint.x = containmentPositionRange.right;
      }

      if (mouseMovePoint.y < containmentPositionRange.top) {
        mouseMovePoint.y = containmentPositionRange.top;
      }

      if (mouseMovePoint.y > containmentPositionRange.bottom) {
        mouseMovePoint.y = containmentPositionRange.bottom;
      }
    }      

    setAxis(mouseMovePoint);


    /*
      自动滚动，思路，
      // if (scrollParent !== void 0) {
      //   let targetBoundingClientRect = domoperation.getElemBoundingClientRect(target);
      //   let distanceBetweenTargetAndScrollParent = {
      //     left: targetBoundingClientRect.left - scrollParentBoundingClientRect.left,
      //     top: targetBoundingClientRect.top - scrollParentBoundingClientRect.top,
      //     right: targetBoundingClientRect.right - scrollParentBoundingClientRect.right,
      //     bottom: targetBoundingClientRect.bottom - scrollParentBoundingClientRect.bottom
      //   }

      //   if (scrollParentBoundingClientRect.right - event.pageX < event.movementX) {
      //     scrollParent.scrollLeft += event.movementX
      //     console.log(scrollParent.scrollLeft);
      //   }

      //   // if (distanceBetweenTargetAndScrollParent.left > scrollParent.clientWidth - target.offsetWidth) {
      //   //     // scrollParent.scrollLeft = doc.body.scrollWidth - doc.body.clientWidth;
      //   //     // scrollParent.scrollLeft = scrollParent.scrollWidth - scrollParent.clientWidth;
      //   //     scrollParent.scrollLeft += 20;
      //   //     // scrollParent.scrollLeft = scrollParent.scrollLeft + event.movementX;
      //   //     // if (originPageX === 0) {
      //   //     //     originPageX = event.pageX;
      //   //     // }
      //   //     // scrollLeftAddFunc(scrollParent, event);
      //   // }

      //   if (distanceBetweenTargetAndScrollParent.left < 0) {
      //     scrollParent.scrollLeft -= scrollLeftAdd;
      //   }

      //   if (distanceBetweenTargetAndScrollParent.top > scrollParent.clientHeight - target.offsetHeight) {
      //     scrollParent.scrollTop += scrollTopAdd;
      //   }

      //   if (distanceBetweenTargetAndScrollParent.top < 0) {
      //     scrollParent.scrollTop -= scrollTopAdd;
      //   }
      // }
     */
  }

  /*
    // function autoScroll() {
    //     targetBoundingClientRect =  domoperation.getElemBoundingClientRect(target);
    //     distanceBetweenTargetAndScrollParent = {
    //         left:targetBoundingClientRect.left - scrollParentBoundingClientRect.left,
    //         top:targetBoundingClientRect.top - scrollParentBoundingClientRect.top,
    //         right:targetBoundingClientRect.right - scrollParentBoundingClientRect.right,
    //         bottom:targetBoundingClientRect.bottom - scrollParentBoundingClientRect.bottom
    //     }

    //     if (distanceBetweenTargetAndScrollParent.left > scrollParent.clientWidth - target.offsetWidth) {
    //         // scrollParent.scrollLeft = doc.body.scrollWidth - doc.body.clientWidth;
    //         // scrollParent.scrollLeft = scrollParent.scrollWidth - scrollParent.clientWidth;
    //         scrollParent.scrollLeft += scrollLeftAdd;
    //         // scrollParent.scrollLeft = scrollParent.scrollLeft + event.movementX;
    //     }


    //     if (distanceBetweenTargetAndScrollParent.left < 0)  {
    //         scrollParent.scrollLeft -= scrollLeftAdd;
    //     } 

    //     if (distanceBetweenTargetAndScrollParent.top > scrollParent.clientHeight - target.offsetHeight) {
    //         scrollParent.scrollTop += scrollTopAdd;
    //     } 

    //     if (distanceBetweenTargetAndScrollParent.top < 0) {
    //         scrollParent.scrollTop -= scrollTopAdd;
    //     }              
    // }  
   */

  function getMouseMovePoint(event) {
    let result = {x:0, y:0};

    if (isTranslate) {
      result.x = parseInt(mosueDownTargetLocationInfo.x + event.pageX - mouseDownPage.x);
      result.y = parseInt(mosueDownTargetLocationInfo.y + event.pageY - mouseDownPage.y);
    } else {
      result.x = parseInt(mosueDownTargetLocationInfo.left + event.pageX - mouseDownPage.x);
      result.y = parseInt(mosueDownTargetLocationInfo.top + event.pageY - mouseDownPage.y);
    }

    return result;
  }

  function setAxis(mouseMovePoint) {
    let x = mouseMovePoint.x
      ,y = mouseMovePoint.y;
    if (isTranslate) {
      switch (option.axis.toUpperCase()) {
        case "X":
          target.style.transform = `translate(${x}px, 0)`;
          break;
        case "Y":
          target.style.transform = `translate(0, ${y}px)`;
          break;
        case "ALL":
        default:
          target.style.transform = `translate(${x}px, ${y}px)`;
          break;
      }
    } else {
      switch (option.axis.toUpperCase()) {
        case "X":
          target.style.left = x + "px";
          break;
        case "Y":
          target.style.top = y + "px";
          break;
        case "ALL":
        default:
          target.style.left = x + "px";
          target.style.top = y + "px";
          break;
      }
    }
  }

  function mouseUpHandle(event) {
    event.preventDefault();
    event.stopPropagation();
    doc.removeEventListener("mousemove", mouseMoveHandle);
    doc.removeEventListener("mouseup", mouseUpHandle);
    setRevert();
  }

  function setRevert() {
    if (option.revert) {
      target.style.transition = "transform 0.5s linear";
      target.addEventListener("transitionend", transitionendHandle);

      target.style.transform = `translate(${mosueDownTargetLocationInfo.x}px, ${mosueDownTargetLocationInfo.y}px)`;

      function transitionendHandle(evt) {
        target.style.transition = "";
        target.removeEventListener("transitionend", transitionendHandle);
      }
    }    
  }

  function getContainmentPositionRange() {
    let result = {
      left:0
      ,top:0
      ,right:0
      ,bottom:0
    }
    if (containment !== void 0) {
      let distanceBetweenContainmentAndDoc = getElemBoundingClientRect(containment)
      ,distanceBetweenTargeEleAndDoc = getElemBoundingClientRect(target.offsetParent)
      ,containmentPadding = getPadding(getElementComputedStyle(containment))

      if (isTranslate) {
        distanceBetweenTargeEleAndDoc.left += (targetPositionInfo.position.left + targetPositionInfo.margin.left + containmentPadding.left);
        distanceBetweenTargeEleAndDoc.top += (targetPositionInfo.position.top + targetPositionInfo.margin.left + containmentPadding.left);
      } else {
        distanceBetweenTargeEleAndDoc.left += (targetPositionInfo.translate.x + targetPositionInfo.margin.left + containmentPadding.left);
        distanceBetweenTargeEleAndDoc.top += (targetPositionInfo.translate.y + targetPositionInfo.margin.top + containmentPadding.top);
      }

      let distanceBeteenTargetAndContainment = {
        left: distanceBetweenTargeEleAndDoc.left - distanceBetweenContainmentAndDoc.left,
        top: distanceBetweenTargeEleAndDoc.top - distanceBetweenContainmentAndDoc.top
      };

      result = {
        left: 0 - distanceBeteenTargetAndContainment.left,
        top: 0 - distanceBeteenTargetAndContainment.top,
        right: 0 - distanceBeteenTargetAndContainment.left + containment.clientWidth - target.offsetWidth,
        bottom: 0 - distanceBeteenTargetAndContainment.top + containment.clientHeight - target.offsetHeight
      }    
    } 

    return result;
  }

  function updateTargetPositionInfo(elem) {
    let result = {};

    if (elem !== void 0) {
      let targetComputedStyle = getElementComputedStyle(elem);
      result.position = getPosition(targetComputedStyle);
      result.translate = getTheTranslate(targetComputedStyle);
      result.margin = getMargin(targetComputedStyle);      
    }

    return result;
  }
}

export function drogable(elem) {
}

export function resizable(elem) {
}

/*
  filterArr:  array elem
  frame 
  selected:function()  // event
  todo
  tolerance: fit or touch  fit的话需要把整个item都框住，才会提示被选中， touch就是有一点接触都会提示被选中
  selected;
  selecting;
  start;
  stop;
  unselected;
  unselecting;
 */
export function selectable(elem, option) {
  let target = elem
    ,selectDiv = null
    ,startMousePosition = null
    ,startDomPosition = null
    ,defaultOption = {
      filterArr: []
      ,selected:(evt) => {}
    }
    ,selectedArr = []
    ,doc = document
    ,win = window
    ,cssString = `
    .selecting {
    }
    
    .selected {
    }

    .selectBox {
      border:1px dashed black;
      width:0px;
      height:0px;
      position:fixed;
      background:none;
      pointer-events: none;
    }`;

  insertStyle2Head(cssString);
  option = Object.assign(defaultOption, option);


  if (option.frame !== void 0) {
    doc = option.frame.contentDocument;
    win = option.frame.contentWindow;
    setFrame(option.frame);
  }

  if (target !== void 0 && target !== null) {
    let elemAndRectArr = null;

    target.addEventListener('mousedown', (event) => {
      if (event.button === 0) {
        event.stopPropagation();
        event.preventDefault();

        selectedArr = [];

        let domArr = [].slice.call(target.children)
          , domArrLength = domArr.length;

        if (option.filterArr.length !== 0) {
          domArr = util.twoArrayUnique(domArr, option.filterArr);
        };

        elemAndRectArr = domArr.map((elem) => {
          elem.classList.remove("selecting");
          elem.classList.remove("selected");
          let boundingClientRect = elem.getBoundingClientRect();

          return {
            elem: elem,
            left: boundingClientRect.left,
            right: boundingClientRect.right,
            top: boundingClientRect.top,
            bottom: boundingClientRect.bottom
          }          
        });

        startMousePosition = { x: event.pageX, y: event.pageY };
        startDomPosition = { x: event.pageX - win.scrollX, y: event.pageY - win.scrollY }
        if (selectDiv === null) {
          selectDiv = doc.createElement("div");
          selectDiv.classList.add("selectBox");        
        } else {
          selectDiv.style.display = "block";
        }

        selectDiv.style.left = startDomPosition.x + "px";
        selectDiv.style.top = startDomPosition.y + "px";
        target.appendChild(selectDiv);
        doc.addEventListener('mousemove', mouseMoveHandle);
        doc.addEventListener('mouseup', mouseUpHandle);
      }
    })

    function mouseMoveHandle(event) {
      // 对应场景，如果鼠标移动从sonIframe到parentIframe，然后再回到sonIframe，需要手动执行mouseup事件。
      if (event.which === 0) {
        mouseUpHandle(event);
      } else {
        let width = event.pageX - startMousePosition.x
          ,height = event.pageY - startMousePosition.y;

        let testLeft = 0;

        if (width < 0) {
          selectDiv.style.left = (startDomPosition.x + width) + 'px';
        } else {
          selectDiv.style.left = startDomPosition.x + 'px';
        }

        if (height < 0) {
          selectDiv.style.top = (startDomPosition.y + height) + 'px';
        } else {
          selectDiv.style.top = startDomPosition.y + 'px';
        }


        selectDiv.style.width = Math.abs(width) + "px";
        selectDiv.style.height = Math.abs(height) + "px";

        // 框选覆盖条件判断，判断条件为如果框的clientRect的大小如果和container中child的大小有重叠
        // 则为其执行覆盖事件
        let selectDivClientRect = selectDiv.getBoundingClientRect();
        for(var i = 0; i < elemAndRectArr.length; i++) {
          let elemAndRect = elemAndRectArr[i];

          if (isRectOverlap(selectDivClientRect, elemAndRect)) {
            if (!util.isArrayContain(elemAndRect.elem.classList, "selecting")) {
              selectedArr.push(elemAndRect.elem);
              elemAndRect.elem.classList.add("selecting");
            }
          } else {
            if (util.isArrayContain(elemAndRect.elem.classList, "selecting")) {

              elemAndRect.elem.classList.remove("selecting");
              selectedArr.splice(selectedArr.indexOf(elemAndRect.elem), 1);
            }
          }
        } 
      }
    }

    function isRectOverlap(selectDivClientRect, elemAndRect) {
      if (selectDivClientRect.right < elemAndRect.left || selectDivClientRect.left > elemAndRect.right || selectDivClientRect.bottom < elemAndRect.top || selectDivClientRect.top > elemAndRect.bottom) {
        return false;
      } else {
        return true;
      }
    }

    function mouseUpHandle(event) {
      event.stopPropagation();
      event.preventDefault();
      selectedArr.forEach((dom) => {
        dom.classList.remove("selecting");
        dom.classList.add("selected");
      })

      selectDiv.style.width = "0px";
      selectDiv.style.height = "0px";
      selectDiv.style.display = "none";
      event.selectedArr = selectedArr;
      option.selected(event);
      doc.removeEventListener('mousemove', mouseMoveHandle);
      doc.removeEventListener('mouseup', mouseUpHandle);
    }      
  }
}

/*
    拖动，滚动条自动滚动。
    思路为元素与doc的距离大于小于某个阀值的时候会自动增加会减少scrollTop/scrollLeft的值。
    1、计算滚动元素所在的有滚动条的窗体距离doc的距离
    2、计算滚动元素距离doc的距离
    3、获取两者之差，即滚动元素距离滚动窗体的距离
    4、判断这个距离是否 > 滚动窗体的可视区域 - 元素的宽高
    5、如果大于这个可视区域，就改变滚动窗体的scrollTop/Left
    6、
 */

/*
  option : {
    align: h/v
  }
 */
export function align(elemArr, option) {
  if (elemArr !== void 0 && elemArr !== null && elemArr.length > 1) {
    option = option || {};
    let defaultOption = {
      align:"h"
    }
    ,elemArrLength = elemArr.length
    ,standardDom = elemArr[0]
    ,standardDomComputedStyles = getElementComputedStyle(standardDom)
    ,standardDomWidth = parseInt(standardDomComputedStyles("width"))
    ,standardDomHeight = parseInt(standardDomComputedStyles("height"))
    ,translate = getTheTranslate(standardDomComputedStyles)
    ,position = getPosition(standardDomComputedStyles);

    option = Object.assign(defaultOption, option);

    switch(option.align.toLowerCase()) {
      case "h":
        for (var i = 1; i < elemArrLength; i++) {
          let elemComputedStyle = getElementComputedStyle(elemArr[i])
            ,elemHeight = parseInt(elemComputedStyle("height"))
            ,adjustment = Math.abs(elemHeight - standardDomHeight) / 2;

          if (elemHeight > standardDomHeight) {
            elemArr[i].style.top = position.top + "px";
            setTheTranslate(elemArr[i], { y : translate.y - adjustment} );
          } else {
            elemArr[i].style.top = position.top + "px";
            setTheTranslate(elemArr[i], { y : translate.y + adjustment});
          }

        }      
        break;
      case "v":
        for (var i = 1; i < elemArrLength; i++) {
          let elemComputedStyle = getElementComputedStyle(elemArr[i])
            ,elemWidth = parseInt(elemComputedStyle("width"))
            ,adjustment = Math.abs(elemWidth - standardDomWidth) / 2;

          if (elemWidth > standardDomWidth) {
            elemArr[i].style.left = position.left + "px";
            setTheTranslate(elemArr[i], { x : translate.x - adjustment});
          } else {
            elemArr[i].style.left = position.left + "px";
            setTheTranslate(elemArr[i], { x : translate.x + adjustment});
          }
        }      
        break;
    }      
  }
}


export class Dragable {
  /*
   option {
     axis:x, y, all
     containment: selector
     translate:true/false   // 是否使用translate替代position
     handle: selector
     cancel:selector
     revert: true/false 
     frame: iframe dom  
   }
   范围选择
   自动滚动
   */  
  constructor(selector, option) {
    let defaultOption = {
      axis: "all"
      ,translate: true
      ,revert: false
      ,frame:{
        contentDocument:document
        ,contentWindow:window
      }     
    };
    
    this.target = getElement(selector);

    if (this.target === null) {
      console.error("drag target is null");
      return;
    }

    this.target.style.position = "relative";

    this.option = Object.assign(defaultOption, option);
    this.isTranslate = checkCss3Support("transform") && this.option.translate;
    this.mouseDownCoord = {x:0, y:0};
    this.targetOffsetInfo = {x:0, y:0};
    this.containment = getElement(this.option.containment);
    this.targetMoveRange = {left:0,top:0,right:0,bottom:0};
    this.isRangeLimit = this.containment !== void 0 ? true : false;
    this.handleSelector = this.option.handle !== void 0 ? (this.option.handle === "this" ? this.target : getElement(this.option.handle)) : null;
    this.cancelSelector = this.option.cancel !== void 0 ? getElement(this.option.cancel) : null;
    this.doc = this.option.frame.contentDocument;
    this.win = this.option.frame.contentWindow;
    this.execOnce = true;
    setFrame(this.option.frame);

    /*
      初始化样式，只执行一次。
     */
    if (Dragable.execOnce === void 0) {
      this._initCss();
      Dragable.execOnce = true;
    }

    if (this.option.handle !== void 0 && this.option.handle !== "this") {
      this.target.classList.add("dragCursorDefault");
      this.handleSelector.classList.add("dragCursorMove");
    } else {
      this.target.classList.add("dragCursorMove");
    }

    if (this.option.cancel !== void 0) {
      this.cancelSelector.classList.add("dragCursorDefault");
    } 

    this._mouseMove = this._mouseMoveHandle.bind(this);
    this._mouseUp = this._mouseUpHandle.bind(this);
    this.target.addEventListener("mousedown", this._mouseDownHandle.bind(this));
  };

  _mouseDownHandle(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if ((this.handleSelector!== null && this.handleSelector !== evt.target) || (this.cancelSelector !== null && this.cancelSelector === evt.target) || evt.button !== MouseButton.left) {
      return;
    }

    this.mouseDownCoord.x = evt.pageX;
    this.mouseDownCoord.y = evt.pageY;
    this.targetOffsetInfo = this._getTargetOffsetInfo();
    if (this.execOnce) {
      this.targetMoveRange = this._getTargetMoveRange();
      this.execOnce = false;
    }
    

    console.log(this.targetMoveRange);

    this.doc.addEventListener("mousemove", this._mouseMove);
    this.doc.addEventListener("mouseup", this._mouseUp);    

  }

  _getTargetOffsetInfo() {
    let result = {x:0, y:0};

    let targetComputedStyle = getElementComputedStyle(this.target);
    if (this.isTranslate) {
      let translate = getTheTranslate(targetComputedStyle);
      result.x = translate.x;
      result.y = translate.y;
    } else {
      let position = getPosition(targetComputedStyle);
      result.x = position.left;
      result.y = position.top;
    }

    return result;   
  };

  _mouseMoveHandle(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    let mouseMovePoint =  this._getMouseMovePoint(evt)

    if (this.isRangeLimit) {
      if (mouseMovePoint.x < this.targetMoveRange.left) {
        mouseMovePoint.x = this.targetMoveRange.left;
      }

      if (mouseMovePoint.x > this.targetMoveRange.right) {
        mouseMovePoint.x = this.targetMoveRange.right;
      }

      if (mouseMovePoint.y < this.targetMoveRange.top) {
        mouseMovePoint.y = this.targetMoveRange.top;
      }

      if (mouseMovePoint.y > this.targetMoveRange.bottom) {
        mouseMovePoint.y = this.targetMoveRange.bottom;
      }
    }      

    this._setAxis(mouseMovePoint); 
  }

  _getMouseMovePoint(evt) {
    let result = {x:0, y:0};
    result.x = this.targetOffsetInfo.x + evt.pageX - this.mouseDownCoord.x;
    result.y = this.targetOffsetInfo.y + evt.pageY - this.mouseDownCoord.y;
    return result;
  } 

  _setAxis(mouseMovePoint) {
    let x = mouseMovePoint.x
      ,y = mouseMovePoint.y;
    if (this.isTranslate) {
      switch (this.option.axis.toUpperCase()) {
        case "X":
          this.target.style.transform = `translate(${x}px, 0)`;
          break;
        case "Y":
          this.target.style.transform = `translate(0, ${y}px)`;
          break;
        case "ALL":
        default:
          this.target.style.transform = `translate(${x}px, ${y}px)`;
          break;
      }
    } else {
      switch (this.option.axis.toUpperCase()) {
        case "X":
          this.target.style.left = x + "px";
          break;
        case "Y":
          this.target.style.top = y + "px";
          break;
        case "ALL":
        default:
          this.target.style.left = x + "px";
          this.target.style.top = y + "px";
          break;
      }
    }    
  } 

  _mouseUpHandle(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    this.doc.removeEventListener("mousemove", this._mouseMove);
    this.doc.removeEventListener("mouseup", this._mouseUp);

    this._setRevert();
  }

  _setRevert() {
    if (this.option.revert) {
      this.target.style.transition = "transform 0.5s linear";
      this.target.addEventListener("transitionend", transitionendHandle);

      this.target.style.transform = `translate(${this.targetOffsetInfo.x}px, ${this.targetOffsetInfo.y}px)`;

      function transitionendHandle(evt) {
        evt.target.style.transition = "";
        evt.target.removeEventListener("transitionend", transitionendHandle);
      }
    }    
  }

  _getTargetMoveRange() {
    let result = {
      left:0
      ,top:0
      ,right:0
      ,bottom:0
    }
    if (this.containment !== void 0) {
      let distanceBetweenContainmentAndDoc = getElemBoundingClientRect(this.containment)
      // ,distanceBetweenTargeEleAndDoc = getElemBoundingClientRect(this.target.offsetParent)
      ,distanceBetweenTargeEleAndDoc = getElemBoundingClientRect(this.target)
      ,containmentPadding = getPadding(getElementComputedStyle(this.containment))
      ,targetMargin = getMargin(getElementComputedStyle(this.target));

      distanceBetweenTargeEleAndDoc.left += (this.targetOffsetInfo.x + targetMargin.left + containmentPadding.left);
      distanceBetweenTargeEleAndDoc.top += (this.targetOffsetInfo.y + targetMargin.left + containmentPadding.left);

      let distanceBeteenTargetAndContainment = {
        left: distanceBetweenTargeEleAndDoc.left - distanceBetweenContainmentAndDoc.left,
        top: distanceBetweenTargeEleAndDoc.top - distanceBetweenContainmentAndDoc.top
      };

      result = {
        left: 0 - distanceBeteenTargetAndContainment.left,
        top: 0 - distanceBeteenTargetAndContainment.top,
        right: 0 - distanceBeteenTargetAndContainment.left + this.containment.clientWidth - this.target.offsetWidth,
        bottom: 0 - distanceBeteenTargetAndContainment.top + this.containment.clientHeight - this.target.offsetHeight
      }    
    } 

    return result;
  };  

  _initCss() {
    let css = {
      id :"dragCss"
      , cssArr : [{
        className:".dragCursorMove:hover"
        ,classValue:`{
          cursor:move
        }
        `
      }
      ,{
        className:".dragCursorDefault:hover"
        ,classValue:`{
          cursor:default
        }
        `
      }]
    }
    insertStyle2Head(css, {isCheckRepeat:true});
  };

  removeMouseDownHandle() {
    this.target.removeEventListener("mousedown", this._mouseDownHandle);
  }
}



