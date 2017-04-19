/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-04-17 09:46:22
 * @version $Id$
 */

define(["common", "domoperation"], function(common, domoperation){      
    function dragable(selector, option) {
        // axis:x, y
        // todo
        // containment: selector
        // handle: selector
        // revert: true/false
        // snap: 
        option = option || {};
        let ele = document.querySelector(selector),
            mouseStartOffset = { x: 0, y: 0 },
            eleComputedStyle = domoperation.getElementComputedStyle(ele),
            defaultOption = {axis:"all"},
            downEleWay = null,
            moveEleWay = null,
            upEleWay = null,
            originTranslate = {};
            
        option = Object.assign(defaultOption, option);

        let containment = (option.containment !== void 0) ? document.querySelector(option.containment) : void 0;

         


        domoperation.insertStyle2Head(`${selector}:hover{cursor:move}`);
        if (domoperation.checkCss3Support("transform")) {
            downEleWay = function(event) {
                mouseStartOffset.x = event.pageX;
                mouseStartOffset.y = event.pageY;
                originTranslate = domoperation.getTheTranslate(ele);
            };
            moveEleWay = function(event) {
                switch(option.axis.toUpperCase()) {
                    case "X":
                        ele.style.transform = `translate(${originTranslate.x + event.pageX - mouseStartOffset.x  - parseInt(eleComputedStyle("border-left-width"))}px, 0)`;
                        break;
                    case "Y":
                        ele.style.transform = `translate(0, ${originTranslate.y + event.pageY - mouseStartOffset.y - parseInt(eleComputedStyle("border-top-width"))}px)`;
                        break;
                    case "ALL":               
                    default:
                        ele.style.transform = `translate(${originTranslate.x + event.pageX - mouseStartOffset.x  - parseInt(eleComputedStyle("border-left-width"))}px, ${originTranslate.y + event.pageY - mouseStartOffset.y - parseInt(eleComputedStyle("border-top-width"))}px)`;
                        break;
                }                                   
            };
            // upEleWay = function(event) {
            //     mouseStartOffset.x = event.pageX;
            //     mouseStartOffset.y = event.pageY;
            // };
        } else {
            downEleWay = function(event) {
                mouseStartOffset.x = event.pageX;
                mouseStartOffset.y = event.pageY;
                originPosition = {left:parseInt(eleComputedStyle("left")), top:parseInt(eleComputedStyle("top"))};
            };
            moveEleWay = function(event) {
                switch(option.axis.toUpperCase()) {
                    case "X":
                        ele.style.left = originPosition.left + event.pageX - mouseStartOffset.x - 2 * parseInt(eleComputedStyle("border-left-width")) + "px";
                        break;
                    case "Y":
                        ele.style.top = originPosition.top + event.pageY - mouseStartOffset.y - 2 * parseInt(eleComputedStyle("border-top-width")) + "px";  
                        break;
                    case "ALL":                 
                    default:
                        ele.style.left = originPosition.left + event.pageX - mouseStartOffset.x - 2 * parseInt(eleComputedStyle("border-left-width")) + "px";
                        ele.style.top =  originPosition.top + event.pageY - mouseStartOffset.y - 2 * parseInt(eleComputedStyle("border-top-width")) + "px";                    
                        break;
                }  
            };
            // upEleWay = function(event) {
            // };
        }

        ele.addEventListener("mousedown", mouseDownHandle);
        ele.addEventListener("click", clickHandle);

        function mouseDownHandle(event) {
            event.preventDefault();
            event.stopPropagation();
            downEleWay(event);
            document.addEventListener("mousemove", mouseMoveHandle);
            document.addEventListener("mouseup", mouseUpHandle);            
        }

        function mouseMoveHandle(event) {
            event.preventDefault();
            event.stopPropagation();
            moveEleWay(event); 
        }

        function mouseUpHandle(event) {
            event.preventDefault();
            event.stopPropagation();
            // upEleWay(event);
            document.removeEventListener("mousemove", mouseMoveHandle);
            document.removeEventListener("mouseup", mouseUpHandle);
        }

        function clickHandle(event) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    function drogable(selector) {

    }

    function resizable(selector) {

    }
    return {
       dragable:dragable,
       drogable:drogable,
       resizable:resizable
    }  
})