/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-10-24 20:25:08
 * @version $Id$
 */
define(["common"], function(common){      
    function ctreateImg(imgUrl, callback) {
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
 

    function getImgCanvas(img) {  
        var imgCanvas = document.createElement("canvas");
        imgCanvas.width = acturalWidth
        imgCanvas.height = acturalHeight
        var myctx = imgCanvas.getContext("2d"); 
        myctx.drawImage(img, 0, 0, acturalWidth, acturalHeight);
        return imgCanvas          
    }   

    function getBackgroundImageUrl(element) {
        if (element != undefined) {
            return (getElementComputedStyle(element)("background-image"))
            .match(/url\(([^)]+)\)/i)[0]
            .split(/[()'"]+/)[1];
        }
        else  {
            return "";
        }        
    } 

    function getElementComputedStyle(element) {
            let elementStyle = window.getComputedStyle(element)
        return function(style) {
            let value = elementStyle.getPropertyValue(style);
            return value;
        }
    }

    // function createLinerAnimationSnippt(animationTime, css-attr, total) {
    //     var keyFrameStr = "";
    //     var intelval = Math.floor(parseInt(total) / parseInt(animationTime))
    //     for (var i = 0; i < animationTime - 1; i++) {
    //         var tmp = i * duartionInterval + "% {"
    //                  + css-attr + ":" + i * widthInterval + "px 0px;"
    //                  + "}"
    //                  + "\n"
    //         keyFrameStr += tmp
    //     }

    //     keyFrameStr += ("100% {"
    //          + css-attr + ":" + parseInt(total) + "px 0px;"
    //          + "}"
    //          + "\n")

    //     return keyFrameStr;
    // }

    function insertStyle2Head(cssString, isInsertFirst) {
        var style = document.createElement("style"),
            head = document.getElementsByTagName('head')[0],
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


    function insertStr2Dom(htmlText, parentDom) {
        parentDom =  parentDom || document.body;
        var dom = common.str2dom(htmlText);
        parentDom.appendChild(dom);
    }

    function createAndGetProgress() {
        var progressContainer = document.querySelector(".progressContainer");
        if (progressContainer == void 0 || progressContainer == null) {
            var htmlStr =  '<div class="progressContainer">'
                          +'    <div class="progressStyle">'
                          +'        <div class="progressBar"></div>'
                          +'    </div>'
                          +'    <div class="progressNum">0%</div>'
                          +'</div>';
            insertStr2Dom(htmlStr);            
        } 
        return document.querySelector(".progressContainer")        
    }

    function setAjaxWithProcess(option, isWithProcess) {
        var progressContainer = createAndGetProgress();
        option.onloadend = function(){
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
                var progressStyle = document.querySelector(".progressStyle");
                var progressBar = document.querySelector(".progressBar");
                var progressNum = document.querySelector(".progressNum");
                var strLength = window.getComputedStyle(progressStyle).getPropertyValue("width").length;
                var totalWidth = window.getComputedStyle(progressStyle).getPropertyValue("width").slice(0, strLength - 2);
                progressBar.style.width = parseInt(totalWidth) * Math.round(event.loaded / event.total * 100) / 100 + "px";
                progressNum.innerText =  Math.round(event.loaded / event.total * 100) + "%"  
            }               
        }       
    }    

    function checkCss3Support(cssStr) {
        let prefixArr = ["webkit", "Moz", "ms", "o"],
            humpStrArr = [],
            div = document.createElement("div"),
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


    function getTheTranslate(elementComputedStyles) {
        let transformStr = elementComputedStyles("transform"),
            result = {x:0, y:0};
        if (transformStr !== "none") {
            let transformArr = transformStr.replace(/matrix\(|\)|\s/g, "").split(",");     
            result.x = common.getInt(transformArr[4]);
            result.y = common.getInt(transformArr[5]);         
        }  
        return result;      
    }  

    function getBorderWidth(elementComputedStyles) {
        return getBox(elementComputedStyles, "border");
    }

    function getPosition(elementComputedStyles) {
        return getBox(elementComputedStyles, "position");
    }

    function getMargin(elementComputedStyles) {
        return getBox(elementComputedStyles, "margin");
    }

    function getPadding(elementComputedStyles) {
        return getBox(elementComputedStyles, "padding");      
    }

    function getBox(elementComputedStyles, style) {
        let prefix = style === "position" ? "" : style + "-",
            postfix = style === "border" ? "-width" : "";

        if (style === "position" && elementComputedStyles("position") === "static") {
            return {
                left:0,
                top:0,
                right:0,
                bottom:0
            }
        }

        return {
            left:common.getInt(elementComputedStyles(prefix + "left" + postfix)),
            top:common.getInt(elementComputedStyles(prefix + "top" + postfix)),
            right:common.getInt(elementComputedStyles(prefix + "right" + postfix)),
            bottom:common.getInt(elementComputedStyles(prefix + "bottom" + postfix))
        }          
    }

    function getParents(elem) {
        let parentsArr = [];
        while((elem = elem.parentNode) && elem.nodeType !== 9) {
            parentsArr.push(elem);
        }
        return parentsArr;
    }

    function getParentsUntil(elem, elemUntil) {
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
    function getScrollParent(elem) {
        let parents = getParents(elem),
            length = parents.length,
            isAbsolute = getElementComputedStyle(elem)("position") == "absolute";

        let scrollParents =  parents.filter((parent) => {
            let parentStyle =  getElementComputedStyle(parent);
            if (isAbsolute && parentStyle("position") == "static") {
                return false;
            }
            return /(auto|scroll|hidden)/.test(parentStyle("overflow") + parentStyle("overflow-x") + parentStyle("overflow-y"));
        });

        return !scrollParents.length ? (elem.ownerDocument.body || document.body) : scrollParents[0];
    }

    /*
        如果不是visible，证明存在着滚动条。
     */
    function isScrollElem(elem) {
        let elemComputedStyle = getElementComputedStyle(elem);
        return elemComputedStyle("overflow") !== "visible";
    }

    return {
       ctreateImg:ctreateImg,
       getImgCanvas:getImgCanvas,
       getBackgroundImageUrl:getBackgroundImageUrl,
       // createLinerAnimationSnippt:createLinerAnimationSnippt,
       insertStr2Dom:insertStr2Dom,
       createAndGetProgress:createAndGetProgress,
       setAjaxWithProcess:setAjaxWithProcess,
       getElementComputedStyle:getElementComputedStyle,
       checkCss3Support:checkCss3Support,
       insertStyle2Head:insertStyle2Head,
       getTheTranslate:getTheTranslate,
       getBorderWidth:getBorderWidth,
       getPosition:getPosition,
       getMargin:getMargin,
       getPadding:getPadding,
       getParents:getParents,
       getParentsUntil:getParentsUntil,
       getScrollParent:getScrollParent,
       isScrollElem:isScrollElem
    }  
})
