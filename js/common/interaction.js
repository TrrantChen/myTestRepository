/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-04-17 09:46:22
 * @version $Id$
 */

define(["common", "domoperation"], function(common, domoperation){      
    function dragable(selector, option) {
        // axis:x, y
        // containment: selector
        // translate:true/false 
        // todo
        // handle: selector
        // revert: true/false
        // snap:
        
        option = option || {};
        let target = document.querySelector(selector),
            mouseDownPage = { x: 0, y: 0 },
            targetComputedStyle = null,
            defaultOption = {
                axis:"all", 
                translate:false
            },
            containment = void 0,
            containmentPositionRange = void 0,
            originTranslate = null,
            originPosition = null,
            targetPositionInfo = {},
            isRangeLimit = false,
            /*
                是否使用getBoundingClientRect去获取元素与边框的距离
             */           
            isGetDistanceByBoundingClientRect = false;
            
        option = Object.assign(defaultOption, option);

        /*
            是否使用translate替代position
         */ 
        let isTranslate = option.translate && domoperation.checkCss3Support("transform");
        updateTargetPositionInfo();
        isTranslate = false;

        if (option.containment !== void 0) {
            containment = document.querySelector(option.containment);
            if (domoperation.getElementComputedStyle(containment)("overflow").toLowerCase() !== "visible"){
                isRangeLimit = false;
            } else {
                isRangeLimit = true;
            }
            containmentPositionRange = getContainmentPositionRange(containment);
            console.log(containmentPositionRange);
        }  

        target.addEventListener("mousedown", mouseDownHandle);
        target.addEventListener("click", clickHandle);
        domoperation.insertStyle2Head(`${selector}:hover{cursor:move}`);

        function mouseDownHandle(event) {
            event.preventDefault();
            event.stopPropagation();
            mouseDownPage.x = event.pageX;
            mouseDownPage.y = event.pageY; 
            updateTargetPositionInfo();
            if (isTranslate) {
                originTranslate = targetPositionInfo.translate;                
            } else {
                originPosition = targetPositionInfo.position;                
            }                               
            document.addEventListener("mousemove", mouseMoveHandle);
            document.addEventListener("mouseup", mouseUpHandle);    
        }

        function mouseMoveHandle(event) {
            event.preventDefault();
            event.stopPropagation();
            let x = 0, y = 0;

            if (isTranslate) {
                x = originTranslate.x + event.pageX - mouseDownPage.x  - target.clientLeft,
                y = originTranslate.y + event.pageY - mouseDownPage.y - target.clientTop;
                if (isRangeLimit) {
                    if (x < containmentPositionRange.left) {
                        x = containmentPositionRange.left;
                    }

                    if (x > containmentPositionRange.right) {
                        x = containmentPositionRange.right;
                    }

                    if (y < containmentPositionRange.top) {
                        y = containmentPositionRange.top;
                    }

                    if (y > containmentPositionRange.bottom) {
                        y = containmentPositionRange.bottom;
                    } 
                }

                switch(option.axis.toUpperCase()) {
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

                x = originPosition.left + event.pageX - mouseDownPage.x;
                y = originPosition.top + event.pageY - mouseDownPage.y;

                if (isRangeLimit) {
                    if (x < containmentPositionRange.left) {
                        x = containmentPositionRange.left;
                    }

                    if (x > containmentPositionRange.right) {
                        x = containmentPositionRange.right;
                    }

                    if (y < containmentPositionRange.top) {
                        y = containmentPositionRange.top;
                    }

                    if (y > containmentPositionRange.bottom) {
                        y = containmentPositionRange.bottom;
                    }                               
                }

                switch(option.axis.toUpperCase()) {
                    case "X":
                        target.style.left = x + "px";
                        break;
                    case "Y":
                        target.style.top = y + "px";  
                        break;
                    case "ALL":                 
                    default:
                        target.style.left = x + "px";
                        target.style.top =  y + "px";                    
                        break;
                }   
            }         
        }

        function mouseUpHandle(event) {
            event.preventDefault();
            event.stopPropagation();
            document.removeEventListener("mousemove", mouseMoveHandle);
            document.removeEventListener("mouseup", mouseUpHandle);
        }

        function clickHandle(event) {
            event.preventDefault();
            event.stopPropagation();
        }

        function getContainmentPositionRange(containment) {
            let distanceBetweenContainmentAndDoc = isGetDistanceByBoundingClientRect ? calculateDistanceBetweenEleAndDocByBoundingClientRect(containment) : calculateDistanceBetweenEleAndDoc(containment),
                distanceBetweenTargeEleAndDoc = isGetDistanceByBoundingClientRect ? calculateDistanceBetweenEleAndDocByBoundingClientRect(target.offsetParent) : calculateDistanceBetweenEleAndDoc(target.offsetParent),
                containmentPadding = domoperation.getPadding(domoperation.getElementComputedStyle(containment));      

            if (isTranslate) {
                distanceBetweenTargeEleAndDoc.left +=  (targetPositionInfo.position.left + targetPositionInfo.margin.left + containmentPadding.left);
                distanceBetweenTargeEleAndDoc.top +=  (targetPositionInfo.position.top + targetPositionInfo.margin.left + containmentPadding.left); 
            } else {
                distanceBetweenTargeEleAndDoc.left += (targetPositionInfo.translate.x + targetPositionInfo.margin.left + containmentPadding.left);
                distanceBetweenTargeEleAndDoc.top += (targetPositionInfo.translate.y + targetPositionInfo.margin.top + containmentPadding.top); 
            }                 

            let distanceBeteenTargetAndContainment = {
                left:distanceBetweenTargeEleAndDoc.left - distanceBetweenContainmentAndDoc.left,
                top:distanceBetweenTargeEleAndDoc.top - distanceBetweenContainmentAndDoc.top
            };

            console.log("distanceBetweenContainmentAndDoc left " + distanceBetweenContainmentAndDoc.left + " distanceBetweenContainmentAndDoc top " + distanceBetweenContainmentAndDoc.top);
            console.log("distanceBetweenTargeEleAndDoc left " + distanceBetweenTargeEleAndDoc.left + " distanceBetweenTargeEleAndDoc top " + distanceBetweenTargeEleAndDoc.top);
            console.log("distanceBeteenTargetAndContainment left " + distanceBeteenTargetAndContainment.left + " distanceBeteenTargetAndContainment top " + distanceBeteenTargetAndContainment.top);

            
            return {
                left: 0 - distanceBeteenTargetAndContainment.left,
                top: 0 - distanceBeteenTargetAndContainment.top,
                right:0 - distanceBeteenTargetAndContainment.left + containment.clientWidth - target.offsetWidth,
                bottom:0 - distanceBeteenTargetAndContainment.top + containment.clientHeight - target.offsetHeight
            }      
        }

        function calculateDistanceBetweenEleAndDoc(element) {
            let elementStyle = domoperation.getElementComputedStyle(element),
                elementTranslate = domoperation.getTheTranslate(elementStyle);
            if (element === document.body) {
                return {left:0, top:0};
            } else {
                let result = calculateDistanceBetweenEleAndDoc(element.offsetParent);
                return {
                    left:element.offsetLeft + result.left + element.clientLeft + elementTranslate.x,
                    top:element.offsetTop + result.top +  element.clientTop + elementTranslate.y               
                }
            }
        }

        function calculateDistanceBetweenEleAndDocByBoundingClientRect(element) {
            let boundingClientRect = element.getBoundingClientRect();
            return {
                left:boundingClientRect.left + window.scrollX,
                top:boundingClientRect.top + window.scrollY
            }
        }

        function updateTargetPositionInfo() {
            targetComputedStyle = domoperation.getElementComputedStyle(target);
            targetPositionInfo.position = domoperation.getPosition(targetComputedStyle);
            targetPositionInfo.translate = domoperation.getTheTranslate(targetComputedStyle);
            targetPositionInfo.margin = domoperation.getMargin(targetComputedStyle);
        }   
    }

    function drogable(element) {

    }

    function resizable(element) {

    }
    return {
       dragable:dragable,
       drogable:drogable,
       resizable:resizable
    }  
})

