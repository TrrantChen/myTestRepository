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
        // translate:true/false 
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
            targetPositionInfo = {};
            
        option = Object.assign(defaultOption, option);

        let isTranslate = option.translate && domoperation.checkCss3Support("transform");
        isTranslate = true;

        updateTargetPositionInfo();

        if (option.containment !== void 0) {
            containment = document.querySelector(option.containment);
            containmentPositionRange = getContainmentPositionRange(containment);
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

                if (containmentPositionRange !== void 0) {
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

                if (containmentPositionRange !== void 0) {
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
            let distanceBetweenContainmentAndDoc = calculateDistanceBetweenEleAndDoc(containment),
            distanceBetweenTargeEleAndDoc = calculateDistanceBetweenEleAndDoc(target.offsetParent);
            distanceBetweenTargeEleAndDoc.left += (targetPositionInfo.translate.x + target.offsetLeft);
            distanceBetweenTargeEleAndDoc.top += (targetPositionInfo.translate.y + target.offsetTop);                

            let distanceBeteenTargetAndContainment = {
                left:distanceBetweenTargeEleAndDoc.left - distanceBetweenContainmentAndDoc.left,
                top:distanceBetweenTargeEleAndDoc.top - distanceBetweenContainmentAndDoc.top
            };
            
            return {
                left: 0 - distanceBeteenTargetAndContainment.left,
                top: 0 - distanceBeteenTargetAndContainment.top,
                right:0 - distanceBeteenTargetAndContainment.left + containment.scrollWidth - target.offsetWidth,
                bottom:0 - distanceBeteenTargetAndContainment.top + containment.scrollHeight - target.offsetHeight
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

        function updateTargetPositionInfo() {
            targetComputedStyle = domoperation.getElementComputedStyle(target);
            targetPositionInfo.position = domoperation.getPosition(targetComputedStyle);
            targetPositionInfo.translate = domoperation.getTheTranslate(targetComputedStyle);            
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

/*
    方案0
  叠加计算margin，translate，position, border
  left 就用0 - 以上的margin,translate,border 还有其他parent的margin, translate,border以及position
  往上直接找parentElement

    方案1
  从元素本身开始，一层一层往外扩散，直到找到parent=containment为止
  计算每个parent的margin，translate，border还有position，

    方案2
  首先，在鼠标点击事件中计算，div距离body的边界，
  然后从containment开始，计算他的offsetLeft + border + translate,然后递归计算他的offsetParent，
  计算offsetLeft + border + translate，直到body为止
  然后计算两者的差值，就是边界。

  方案3

  首先，计算出目标在parent上的position为0时的范围
  为0 - margin -translate 
  0 - margin -translate + scrollWidth
    

    如果迭代求每个parent的offset，如果某个parent为absolute，会发生offset发生计算重复的状况。

    获取contaner与body的距离，需要迭代计算，b
    container的boder需要另外计算 c

    计算公式为
    点击的时候获取目标的位置，计算目标到body 的距离 a
    然后
    a - b - c就是需要移动的距离
 */