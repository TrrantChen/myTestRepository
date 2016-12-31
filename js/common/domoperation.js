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

    return {
       ctreateImg:ctreateImg,
       getImgCanvas:getImgCanvas,
       getBackgroundImageUrl:getBackgroundImageUrl,
       // createLinerAnimationSnippt:createLinerAnimationSnippt,
       insertStr2Dom:insertStr2Dom
    }  
})
