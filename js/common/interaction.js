/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-04-17 09:46:22
 * @version $Id$
 */

define(["common", "domoperation"], function(common, domoperation){      
    function dragable(element, option) {
        // axis:x, y
        // todo
        // containment: selector
        // handle: selector
        // revert: true/false
        // snap:
        // translate:true/false 
        option = option || {};
        let target = document.querySelector(element),
            mouseDownPage = { x: 0, y: 0 },
            targetComputedStyle = null,
            defaultOption = {
                axis:"all", 
                translate:false
            },
            downEleWay = null,
            moveEleWay = null,
            upEleWay = null,
            containment = void 0,
            containmentPositionRange = void 0,
            originTranslate = null,
            targetPositionInfo = {};
            
        option = Object.assign(defaultOption, option);

        let isTranslate = option.translate && domoperation.checkCss3Support("transform");

        // targetComputedStyle = domoperation.getElementComputedStyle(target);
        // targetPositionInfo.position = domoperation.getPosition(targetComputedStyle);
        // targetPositionInfo.border = domoperation.getBorderWidth(targetComputedStyle);
        // targetPositionInfo.margin = domoperation.getMargin(targetComputedStyle);
        // targetPositionInfo.translate = tion.getTheTranslate(targetComputedStyle);
        updateTargetPositionInfo();

        if (option.containment !== void 0) {
            containment = document.querySelector(option.containment);
            containmentPositionRange = getContainmentPositionRange(containment);
        } 

        isTranslate = false;

        target.addEventListener("mousedown", mouseDownHandle);
        target.addEventListener("click", clickHandle);
        domoperation.insertStyle2Head(`${element}:hover{cursor:move}`);
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

            if (isTranslate) {
                switch(option.axis.toUpperCase()) {
                    case "X":
                        target.style.transform = `translate(${originTranslate.x + event.pageX - mouseDownPage.x  - target.clientLeft}px, 0)`;
                        break;
                    case "Y":
                        target.style.transform = `translate(0, ${originTranslate.y + event.pageY - mouseDownPage.y - target.clientTop}px)`;
                        break;
                    case "ALL":               
                    default:
                        target.style.transform = `translate(${originTranslate.x + event.pageX - mouseDownPage.x  - target.clientLeft}px, ${originTranslate.y + event.pageY - mouseDownPage.y - target.clientTop}px)`;
                        break;
                } 
            } else {
                switch(option.axis.toUpperCase()) {
                    case "X":
                        target.style.left = originPosition.left + event.pageX - mouseDownPage.x - 0 * target.clientLeft + "px";
                        break;
                    case "Y":
                        target.style.top = originPosition.top + event.pageY - mouseDownPage.y - 0 * target.clientTop + "px";  
                        break;
                    case "ALL":                 
                    default:
                        target.style.left = originPosition.left + event.pageX - mouseDownPage.x - 0 * target.clientLeft + "px";
                        target.style.top =  originPosition.top + event.pageY - mouseDownPage.y - 0 * target.clientTop + "px";                    
                        break;
                }                
            }

            console.log("arget.style.left " + target.style.left);
            console.log("containmentPositionRange.right " + containmentPositionRange.right);
            console.log("target.style.top " + target.style.top );
            console.log("containmentPositionRange.bottom " + containmentPositionRange.bottom );
            //----------------------------------------------
            if (containmentPositionRange !== void 0) {
                if (parseInt(target.style.left) < containmentPositionRange.left) {
                    target.style.left = containmentPositionRange.left + "px";
                }

                if (parseInt(target.style.left) > containmentPositionRange.right) {
                    target.style.left = containmentPositionRange.right + "px";
                }

                if (parseInt(target.style.top) < containmentPositionRange.top) {
                    target.style.top = containmentPositionRange.top + "px";
                }

                if (parseInt(target.style.top) > containmentPositionRange.bottom) {
                    target.style.top = containmentPositionRange.bottom + "px";
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
            // todo 
            // 检查translate也需要递归来
            // 获取left，top
            //      需要考虑transform，使用递归来获取
            // 获取长宽
            //      需要考虑，有没有滚动条，有没有border
            // let positionAndTranslate = getElementPositionAndTranslate(containment),
            //     containmentStyle = domoperation.getElementComputedStyle(containment),
            //     containmentBorder = domoperation.getBorderWidth(containmentStyle);
            // return {
            //     left: positionAndTranslate.left + containmentBorder.left,
            //     top: positionAndTranslate.top + containmentBorder.top,
            //     right:positionAndTranslate.left + containmentBorder.left + containment.scrollWidth,
            //     bottom:positionAndTranslate.top + containmentBorder.top + containment.scrollHeight
            // }
            let distanceBetweenContainmentAndDoc = calculateDistanceBetweenContainmentAndDoc(containment),
            // distanceBeteenTargetAndContainment = {
            //     left:distanceBetweenTargeEleAndDoc.left - distanceBetweenContainmentAndDoc.left,
            //     top:distanceBetweenTargeEleAndDoc.top - distanceBetweenContainmentAndDoc.top
            // },
            distanceBetweenTargeEleAndDoc = calculateDistanceBetweenTargetAndDoc(target.offsetParent);
            
            distanceBetweenTargeEleAndDoc.left += (targetPositionInfo.translate.x + target.offsetLeft);
            distanceBetweenTargeEleAndDoc.top += (targetPositionInfo.translate.y + target.offsetTop);

            let distanceBeteenTargetAndContainment = {
                // left:distanceBetweenTargeEleAndDoc.left - distanceBetweenContainmentAndDoc.left - containment.clientLeft,
                // top:distanceBetweenTargeEleAndDoc.top - distanceBetweenContainmentAndDoc.top - containment.clientTop
                left:distanceBetweenTargeEleAndDoc.left - distanceBetweenContainmentAndDoc.left,
                top:distanceBetweenTargeEleAndDoc.top - distanceBetweenContainmentAndDoc.top

            };


            // 在containment是parent的时候的默认的定位。需要除去，margin和translate
            // let elementOriginExcursion = {
            //     left:0 - targetPositionInfo.margin.left - targetPositionInfo.translate.left,
            //     top:0 - targetPositionInfo.margin.top - targetPositionInfo.translate.top
            // }
            
            console.log("distanceBetweenContainmentAndDoc " + distanceBetweenContainmentAndDoc.left);
            console.log("distanceBetweenTargeEleAndDoc " + distanceBetweenTargeEleAndDoc.left);
            console.log("distanceBeteenTargetAndContainment " + distanceBeteenTargetAndContainment.left);
            
            return {
                left: 0 - distanceBeteenTargetAndContainment.left,
                top: 0 - distanceBeteenTargetAndContainment.top,
                right:0 - distanceBeteenTargetAndContainment.left + containment.scrollWidth - target.offsetWidth,
                bottom:0 - distanceBeteenTargetAndContainment.top + containment.scrollHeight - target.offsetHeight
            }
        }

        /*
            计算父容器到文档的间距，Containment的border需要另外计算
         */
        function calculateDistanceBetweenContainmentAndDoc(element) {
            let elementStyle = domoperation.getElementComputedStyle(element);
                // elementTranslate = domoperation.getTheTranslate(elementStyle),   
                // elementBorder = domoperation.getBordserWidth(elementStyle);

            if (element === document.body) {
                // let documentStyle = domoperation.getElementComputedStyle(document.documentElement),
                //     documentTranslate = domoperation.getTheTranslate(documentStyle),
                //     documentBorder = domoperation.getBorderWidth(documentStyle),
                //     documentOffset = {left:document.documentElement.offsetLeft, top:document.documentElement.offsetTop};

                // return {
                //     left:documentTranslate.x + documentBorder.left + documentOffset.letf + elementTranslate.x + elementBorder.left + elementOffset.letf,
                //     top:documentTranslate.y + documentBorder.top + documentOffset.top + elementTranslate.y + elementBorder.top + elementOffset.top
                // }
                return {left:0, top:0};
            } else {
                let result = calculateDistanceBetweenContainmentAndDoc(element.offsetParent);
                return {
                    // left:elementTranslate.x + elementBorder.left + elementOffset.letf + result.left,
                    // top:elementTranslate.y + elementBorder.top + elementOffset.top + result.top
                    // left:elementTranslate.x + elementOffset.left + result.left,
                    // top:elementTranslate.y + elementOffset.top + result.top
                    left:element.offsetLeft + result.left + element.clientLeft,
                    top:element.offsetTop + result.top + element.clientTop
                }
            }
        }

        // function calculateDistanceBetweenTargetAndDoc(event) {
        //     let marigin = domoperation.getMargin(targetComputedStyle),
        //         position = domoperation.getPosition(targetComputedStyle),
        //         translate = domoperation.getTheTranslate(targetComputedStyle);
        //         console.log("event.pageX " + common.getInt(event.pageX));
        //         console.log("event.offsetX " + common.getInt(event.offsetX));
        //     return {
        //         left:common.getInt(event.pageX) - common.getInt(event.offsetX) - translate.x - marigin.left - position.left,
        //         top:common.getInt(event.pageY) - common.getInt(event.offsetY) - translate.y - marigin.top - position.top
        //         // left:common.getInt(event.pageX) - common.getInt(event.offsetX) - marigin.left - position.left,
        //         // top:common.getInt(event.pageY) - common.getInt(event.offsetY) - marigin.top - position.top
        //     }                                                                                                                                                                                                                                                                                                                                                                                              
        // }

        function calculateDistanceBetweenTargetAndDoc(element) {
            let elementStyle = domoperation.getElementComputedStyle(element);
                // elementTranslate = domoperation.getTheTranslate(elementStyle),   
                // elementBorder = domoperation.getBorderWidth(elementStyle);

            if (element === document.body) {
                return {left:0, top:0};
            } else {
                let result = calculateDistanceBetweenTargetAndDoc(element.offsetParent);
                return {
                    // left:elementTranslate.x + elementOffset.left + result.left + elementBorder.left,
                    // top:elementTranslate.y + elementOffset.top + result.top + elementBorder.top 
                    left:element.offsetLeft + result.left + element.clientLeft,
                    top:element.offsetTop + result.top +  element.clientTop
                }
            }
        }

        function updateTargetPositionInfo() {
            targetComputedStyle = domoperation.getElementComputedStyle(target);
            targetPositionInfo.position = domoperation.getPosition(targetComputedStyle);
            targetPositionInfo.border = domoperation.getBorderWidth(targetComputedStyle);
            targetPositionInfo.margin = domoperation.getMargin(targetComputedStyle);
            targetPositionInfo.translate = domoperation.getTheTranslate(targetComputedStyle);            
        }

        // /*
        //     递归计算元素的translate和position,需要考虑body还有document的position和translate
        //  */
        // function getElementPositionAndTranslate(element) {
        //     let elementStyle = domoperation.getElementComputedStyle(element),
        //         elementTranslate = domoperation.getTheTranslate(elementStyle),   
        //         elementPosition = domoperation.getPostion(elementStyle);

        //     if (element === document.body) {
        //         let documentStyle = domoperation.getElementComputedStyle(document.documentElement),
        //             documentTranslate = domoperation.getTheTranslate(documentStyle),
        //             documentPosition = domoperation.getPostion(documentStyle);
        //         return {left:documentTranslate.x + documentPosition.left + elementTranslate.x + elementPosition.left,
        //             top:documentTranslate.y + documentPosition.top + elementTranslate.y + elementPosition.top}
        //     } else {
        //         let position = getElementPositionAndTranslate(element.offsetParent);
        //         return {left:elementTranslate.x + elementPosition.left + position.left, 
        //             top:elementTranslate.y + elementPosition.top + position.top};
        //     }
        // }
    

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