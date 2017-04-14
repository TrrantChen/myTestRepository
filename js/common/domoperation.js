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
            return (window.getComputedStyle(element).getPropertyValue("background-image"))
            .match(/url\(([^)]+)\)/i)[0]
            .split(/[()'"]+/)[1];
        }
        else  {
            return "";
        }        
    } 

    function getElementComputedStyle(element) {
        return function(style) {
            let value = window.getComputedStyle(element).getPropertyValue(style);
            return value !== void 0 ? parseInt(value) : 0;
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

    return {
       ctreateImg:ctreateImg,
       getImgCanvas:getImgCanvas,
       getBackgroundImageUrl:getBackgroundImageUrl,
       // createLinerAnimationSnippt:createLinerAnimationSnippt,
       insertStr2Dom:insertStr2Dom,
       createAndGetProgress:createAndGetProgress,
       setAjaxWithProcess:setAjaxWithProcess
    }  
})
