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
        let left = elementComputedStyles("border-left-width"),
            top = elementComputedStyles("border-top-width"),
            right = elementComputedStyles("border-right-width"),
            bottom = elementComputedStyles("border-bottom-width");
        return {
            left:common.getInt(left),
            top:common.getInt(top),
            right:common.getInt(right),
            bottom:common.getInt(bottom)
        }
    }

    function getPosition(elementComputedStyles) {
        let left = parseInt(elementComputedStyles("left")),
            top = parseInt(elementComputedStyles("top")),
            right = parseInt(elementComputedStyles("right")),
            bottom = parseInt(elementComputedStyles("bottom"));
        return {
            left:common.getInt(left),
            top:common.getInt(top),
            right:common.getInt(right),
            bottom:common.getInt(bottom)
        }
    }

    function getMargin(elementComputedStyles) {
        let left = parseInt(elementComputedStyles("margin-left")),
            top = parseInt(elementComputedStyles("margin-top")),
            right = parseInt(elementComputedStyles("margin-right")),
            bottom = parseInt(elementComputedStyles("margin-bottom"));
        return {
            left:common.getInt(left),
            top:common.getInt(top),
            right:common.getInt(right),
            bottom:common.getInt(bottom)
        }
    }

    function setTransform() {
        
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
       setTransform:setTransform
    }  
})
