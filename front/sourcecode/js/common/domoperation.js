import * as util from './util';
import { isClear } from './symbolManage';

let win = window,
  doc = document;

export function setFrame(frame) {
  if (frame !== void 0) {
    win = frame.contentWindow;
    doc = frame.contentDocument
  } else {
    win = window;
    doc = document;
  }
}

export function getWinAndDoc() {
  return {
    doc:doc
    ,win:win
  }
}

export function ctreateImg(imgUrl, callback) {
  var img = new Image();
  img.src = imgUrl;
  if (img.complete) {
    callback(img);
  } else {
    img.onload = function() {
      callback(img);
    };

    img.onerror = function() {
      console.error("load img fail!");
    }
  }
}

export function getImgCanvas(img) {
  var imgCanvas = doc.createElement("canvas");
  imgCanvas.width = acturalWidth
  imgCanvas.height = acturalHeight
  var myctx = imgCanvas.getContext("2d");
  myctx.drawImage(img, 0, 0, acturalWidth, acturalHeight);
  return imgCanvas
}

export function getBackgroundImageUrl(element) {
  if (element != undefined) {
    return (getElementComputedStyle(element)("background-image"))
      .match(/url\(([^)]+)\)/i)[0]
      .split(/[()'"]+/)[1];
  } else {
    return "";
  }
}

export function getElementComputedStyle(element) {
  let elementStyle = win.getComputedStyle(element)
  return function(style) {
    let value = elementStyle.getPropertyValue(style);
    return value;
  }
}

export function insertStyle2Head(cssString, isInsertFirst) {
  var style = doc.createElement("style"),
    head = doc.getElementsByTagName('head')[0],
    headChildren = head.children,
    isLinkExist = false,
    headLength = headChildren.length;

  style.type = "text/css";
  style.innerHTML = cssString;
  if (isInsertFirst) {
    for (var i = 0; i < headLength; i++) {
      if (headChildren[i] instanceof HTMLLinkElement) {
        isLinkExist = true;
        head.insertBefore(style, headChildren[i])
        break;
      }
    }

    if (!isLinkExist) {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
};

export function insertStr2Dom(htmlText, parentDom) {
  parentDom = parentDom || doc.body;
  var dom = str2dom(htmlText);
  parentDom.appendChild(dom);
  return dom;
}

export function createAndGetProgress() {
  var progressContainer = doc.querySelector(".progressContainer");
  if (progressContainer == void 0 || progressContainer == null) {
    var htmlStr = '<div class="progressContainer">' + '    <div class="progressStyle">' + '        <div class="progressBar"></div>' + '    </div>' + '    <div class="progressNum">0%</div>' + '</div>';
    insertStr2Dom(htmlStr);
  }
  return doc.querySelector(".progressContainer")
}

export function setAjaxWithProcess(option, isWithProcess) {
  var progressContainer = createAndGetProgress();
  option.onloadend = function() {
    console.log("end")
    if (isWithProcess) {
      progressContainer.style.display = "none"
    }
  };
  option.onloadstart = function() {
    console.log("start")
    if (isWithProcess) {
      progressContainer.style.display = "flex"
    }

  };
  option.onprogress = function(event) {
    if (isWithProcess) {
      var progressStyle = doc.querySelector(".progressStyle");
      var progressBar = doc.querySelector(".progressBar");
      var progressNum = doc.querySelector(".progressNum");
      var strLength = win.getComputedStyle(progressStyle).getPropertyValue("width").length;
      var totalWidth = win.getComputedStyle(progressStyle).getPropertyValue("width").slice(0, strLength - 2);
      progressBar.style.width = parseInt(totalWidth) * Math.round(event.loaded / event.total * 100) / 100 + "px";
      progressNum.innerText = Math.round(event.loaded / event.total * 100) + "%"
    }
  }
}

export function checkCss3Support(cssStr) {
  let prefixArr = ["webkit", "Moz", "ms", "o"],
    humpStrArr = [],
    div = doc.createElement("div"),
    styleArr = div.style,
    _2Hump = (str) => {
      return str.replace(/-(\w)/g, ($0, $1) => {
        return $1.toUpperCase();
      })
    };

  for (var i in prefixArr) {
    humpStrArr.push(_2Hump(prefixArr[i] + "-" + cssStr));
  };

  humpStrArr.push(_2Hump(cssStr));

  for (var i in humpStrArr) {
    return humpStrArr[i] in styleArr;
  };
}

export function getTheTranslate(elementComputedStyles) {
  let transformStr = elementComputedStyles("transform"),
    result = { x: 0, y: 0 };
  if (transformStr !== "none") {
    let transformArr = transformStr.replace(/matrix\(|\)|\s/g, "").split(",");
    result.x = util.getInt(transformArr[4]);
    result.y = util.getInt(transformArr[5]);
  }
  return result;
}

export function getBorderWidth(elementComputedStyles) {
  return getBox(elementComputedStyles, "border");
}

export function getPosition(elementComputedStyles) {
  return getBox(elementComputedStyles, "position");
}

export function getMargin(elementComputedStyles) {
  return getBox(elementComputedStyles, "margin");
}

export function getPadding(elementComputedStyles) {
  return getBox(elementComputedStyles, "padding");
}

function getBox(elementComputedStyles, style) {
  let prefix = style === "position" ? "" : style + "-",
    postfix = style === "border" ? "-width" : "";

  if (style === "position" && elementComputedStyles("position") === "static") {
    return {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
  }

  return {
    left: util.getInt(elementComputedStyles(prefix + "left" + postfix)),
    top: util.getInt(elementComputedStyles(prefix + "top" + postfix)),
    right: util.getInt(elementComputedStyles(prefix + "right" + postfix)),
    bottom: util.getInt(elementComputedStyles(prefix + "bottom" + postfix))
  }
}

export function getParents(elem) {
  let parentsArr = [];
  while ((elem = elem.parentNode) && elem.nodeType !== 9) {
    parentsArr.push(elem);
  }
  return parentsArr;
}

export function getParentsUntil(elem, elemUntil) {
  let parentArr = [];
  while ((elem = elem.parentNode) && elem.nodeType !== 9) {
    if (elem === elemUntil) {
      break;
    }
    parentArr.push(elem);
  }
  return parentArr;
}

/*
    获取最近的scroll父元素，需要注意的情况是如果元素的position为absolute
    而父元素为static，那父元素即使有scroll也会被忽略
    因为这个时候子元素相对的只会是设置了postion relative或者absolute的元素
    父元素的scroll对这个元素没有影响
 */
export function getScrollParent(elem) {
  let parents = getParents(elem),
    length = parents.length,
    isAbsolute = getElementComputedStyle(elem)("position") == "absolute";

  let scrollParents = parents.filter((parent) => {
    let parentStyle = getElementComputedStyle(parent);
    if (isAbsolute && parentStyle("position") == "static") {
      return false;
    }
    return /(auto|scroll|hidden)/.test(parentStyle("overflow") + parentStyle("overflow-x") + parentStyle("overflow-y"));
  });

  return !scrollParents.length ? (elem.ownerDocument.body || doc.body) : scrollParents[0];
}

/*
    如果不是visible，证明存在着滚动条。
 */
export function isScrollElem(elem) {
  let elemComputedStyle = getElementComputedStyle(elem);
  return elemComputedStyle("overflow") !== "visible";
}

export function onRead(fn) {
  var ready = doc.readyState;
  if (ready == "interactive" || ready == "complete") {
    fn();
  } else {
    win.addEventListener("DOMContentLoaded", fn);
  }
}

export function asyncOnReady(fn) {
  var ready = doc.readyState;
  if (ready == "interactive" || ready == "complete") {
    setTimeout(fn(), 0);
  } else {
    win.addEventListener("DOMContentLoaded", fn);
  }
}

export function onReadyPromise() {
  return new Promise(function(resolve, reject) {
    var readyState = doc.readyState;
    if (readyState === 'interactive' || readyState === 'complete') {
      resolve();
    } else {
      win.addEventListener('DOMContentLoaded', resolve);
    }
  });
}

export function autoDownloadUrl(downloadName, downloadContent) {
  var a = doc.createElement('a');
  var evt = doc.createEvent("HTMLEvents");
  evt.initEvent("click", false, false);
  a.download = downloadName;
  a.href = win.URL.createObjectURL(downloadContent);
  a.dispatchEvent(evt);
  a.click();
}

export function str2dom(str) {　　
  var objE = doc.createElement("div");　　
  objE.innerHTML = str;　　
  return objE.children[0];
}

export function getDomCount(dom, isOnlyElement) {
  if (isOnlyElement === void 0) {
    isOnlyElement = true;
  };

  if (dom === void 0 || dom === null) {
    return 0;
  } else {
    let domLst = isOnlyElement ? dom.children : dom.childNodes,
      domLstLength = domLst.length,
      result = 0;

    for (var i = 0; i < domLstLength; i++) {
      result = result + 1 + getDomCount(domLst[i], isOnlyElement);
    }

    return result;
  }
}

export function action4EverySonDom(dom, fn, paraArr) {
  if (dom !== void 0 && dom !== null) {
    let domLst = dom.children
        ,domLstLength = domLst.length
        ,newPara = [dom].concat(paraArr);
        fn.apply(null, newPara);
    for (var i = 0; i < domLstLength; i++) {
      action4EverySonDom(domLst[i], fn, paraArr);
    }
  }
}

/*
  去除节点的自定义事件
 */
export function removeElemDefaultEvent(id,addFn) {
  let originEventListener = EventTarget.prototype.addEventListener
  EventTarget.prototype.addEventListener = function() {
    let args = [].slice.call(arguments);
    if (this.id === id) {
      if (args.length >= 2) {
        let fn = args[1];
        if (!this.addEventListener[isClear]) {
          fn = function(){};
        } else {
          let oldFn = fn;
          fn = function() {
            if (addFn !== void 0) {
              addFn.apply(this, arguments);
            }
            oldFn.apply(this, arguments);
          }        
        }
        args[1] = fn;
      }
    }
    originEventListener.apply(this, args);    
  }
}


export function rainEffect(effectNum) {
  effectNum = effectNum || 1;
  let cssString = ""
  switch (effectNum) {
    case 1:
      cssString = `
        .outterDiv {
          width:0px;
          height:0px;
          border:solid 1px #111;
          position: absolute;
          border-radius: 100%;
          transition: all 1s  ease-in-out; 
          transition-delay:0.3s;
          opacity: 1;
        }

        .innerDiv {
          width:0px;
          height:0px;
          border:solid 1px #111;
          position: absolute;
          border-radius: 100%;
          transition: all 1s  ease-in-out;  
          opacity: 1;
        }  
      `;
      break;
    case 2:
      cssString = `
        .outterDiv {
          width:1px;
          height:1px;
          border:solid 1px #111;
          position: absolute;
          border-radius: 100%;
          opacity: 1;
          animation-name:circleExtend;
          animation-duration:1s;
          animation-timing-function:ease-in-out;
          animation-iteration-count:1;             
        }

        .innerDiv {
          width:1px;
          height:1px;
          border:solid 1px #111;
          position: absolute;
          border-radius: 100%;
          opacity: 1;
          animation-name:circleExtend;
          animation-duration:1s;
          animation-timing-function:ease-out;
          animation-delay:0.2s;
          animation-iteration-count:1;          
        } 

        @keyframes circleExtend {
          0% {
            transform:scale(0, 0);
          }

          50% {
            transform:scale(100, 100);
          }

          100% {
            transform:scale(150, 150);
            opacity:0;
          }
        }       
      `;
      break;
    case 3:
      cssString = `
        .outterDiv {
          width:50px;
          height:50px;
          border:solid 1px #111;
          position: absolute;
          border-radius: 100%;
          opacity: 1;
          animation-name:circleExtend;
          animation-duration:2s;
          animation-timing-function:ease-out;
          animation-iteration-count:1;
          transform: scale(0);             
        }

        .innerDiv {
          width:50px;
          height:50px;
          border:solid 1px #111;
          position: absolute;
          border-radius: 100%;
          opacity: 1;
          animation-name:circleExtend;
          animation-duration:2s;
          animation-timing-function:ease-out;
          animation-delay:0.2s;
          animation-iteration-count:1;
          transform: scale(0); 
       
        } 

        @keyframes circleExtend {
         to {
            transform:scale(var(--animation-scale), var(--animation-scale));
            /*transform:scale(3, 3);*/
            opacity:0;
          }
        } 

        :root {
          --animation-scale:3;
        }

      `;
    default:
      break;
  }

  insertStyle2Head(cssString);

  return function(container, startPositionX, startPositionY, radius) {
    switch (effectNum) {
      case 1:
        rainEffectRealizeOne(container, startPositionX, startPositionY, radius);
        break;
      case 2:
      case 3:
        rainEffectRealizeTwo(container, startPositionX, startPositionY, radius);
        break;
      default:
        break;
    }
  }
}

function rainEffectRealizeOne(container, startPositionX, startPositionY, radius) {
  if (container !== void 0 && container !== null) {
    radius = radius || 50;
    let outter = doc.createElement("div")

    outter.className = "outterDiv";
    outter.style.left = startPositionX + "px";
    outter.style.top = startPositionY + "px"; 
    container.append(outter);

    let computedStyleOutter = win.getComputedStyle(outter);

    outter.style.width = (parseInt(computedStyleOutter.getPropertyValue("width").replace("px", "")) + radius * 2) + "px";
    outter.style.height = (parseInt(computedStyleOutter.getPropertyValue("height").replace("px", "")) + radius * 2) + "px";
    outter.style.left = (parseInt(computedStyleOutter.getPropertyValue("left").replace("px", "")) - radius) + "px";
    outter.style.top = (parseInt(computedStyleOutter.getPropertyValue("top").replace("px", "")) - radius) + "px";
    outter.addEventListener('transitionend',transitionOutterFn) 
    outter.style.opacity = 0;

    function transitionOutterFn(evt) {
      outter.removeEventListener('transitionend', transitionOutterFn)
      outter.remove();
    }  

    let inner = doc.createElement("div");

    inner.className = "innerDiv";
    inner.style.left = startPositionX + "px";
    inner.style.top = startPositionY + "px";

    container.append(inner)

    let computedStyleInner = win.getComputedStyle(inner);
    inner.style.width = (parseInt(computedStyleInner.getPropertyValue("width").replace("px", "")) + radius * 2) + "px";
    inner.style.height = (parseInt(computedStyleInner.getPropertyValue("height").replace("px", "")) + radius * 2) + "px";
    inner.style.left = (parseInt(computedStyleInner.getPropertyValue("left").replace("px", "")) - radius) + "px";
    inner.style.top = (parseInt(computedStyleInner.getPropertyValue("top").replace("px", "")) - radius) + "px";
    inner.addEventListener('transitionend',transitionInnerFn) 
    inner.style.opacity = 0;

    function transitionInnerFn(evt) {
      inner.removeEventListener('transitionend', transitionInnerFn)
      inner.remove();
    }   
  }  
}

function rainEffectRealizeTwo(container, startPositionX, startPositionY) {
  if (container !== void 0 && container !== null) {
    let outter = doc.createElement("div")

    outter.className = "outterDiv";
    outter.style.left = startPositionX + "px";
    outter.style.top = startPositionY + "px"; 
    outter.addEventListener("animationend", animationOutterEnd);
    container.append(outter)

    function animationOutterEnd(evt) {
      outter.removeEventListener("animationend", animationOutterEnd);
      outter.remove();
    }

    let inner = doc.createElement("div");

    inner.className = "innerDiv";  
    inner.style.left = startPositionX + "px";
    inner.style.top = startPositionY + "px";   
    inner.addEventListener("animationend", animationInnerEnd);
    container.append(inner)  

    function animationInnerEnd(evt) {
      inner.removeEventListener("animationend", animationInnerEnd);
      inner.remove();
    }
  }
}
