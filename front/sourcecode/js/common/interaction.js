import * as domoperation from './domoperation';
import _ from "../../lib/underscore.js";

export function dragable(selector, option) {
    // axis:x, y
    // containment: selector
    // translate:true/false 
    // todo
    // handle: selector
    // cancel:selector
    // revert: true/false
    // snap:

    option = option || {};
    let target = document.querySelector(selector),
        mouseDownPage = { x: 0, y: 0 },
        targetComputedStyle = null,
        defaultOption = {
            axis: "all",
            translate: false,
            revert: false
        },
        containment = void 0,
        containmentPositionRange = void 0,
        originTranslate = null,
        originPosition = null,
        targetPositionInfo = {},
        isRangeLimit = true,
        /*
            是否使用getBoundingClientRect去获取元素与边框的距离
         */
        isGetDistanceByBoundingClientRect = true,
        scrollParent = void 0,
        scrollParentBoundingClientRect = void 0,
        handleSelector = void 0,
        cancelSelector = void 0,
        scrollLeftAdd = 10,
        scrollTopAdd = 10;

    option = Object.assign(defaultOption, option);

    /*
        是否使用translate替代position
     */
    let isTranslate = domoperation.checkCss3Support("transform");

    /*
        指定可以拖拽的区域
     */
    if (option.handle !== void 0) {
        handleSelector = document.querySelector(option.handle === "this" ? selector : option.handle);
    }

    if (option.cancel !== void 0) {
        cancelSelector = document.querySelector(option.cancel);
    }

    updateTargetPositionInfo();

    if (option.containment !== void 0) {
        containment = document.querySelector(option.containment);
        // if (domoperation.getElementComputedStyle(containment)("overflow").toLowerCase() !== "visible"){
        //     isRangeLimit = false;
        // } else {
        //     isRangeLimit = true;
        // }
        containmentPositionRange = getContainmentPositionRange(containment);
    } else {
        isRangeLimit = false;
    }


    /*
        获取滚动的信息
     */
    scrollParent = domoperation.getScrollParent(target);
    if (scrollParent !== void 0) {

        if (scrollParent !== document) {
            scrollParentBoundingClientRect = getElemBoundingClientRect(scrollParent);
        } else {
            scrollParentBoundingClientRect = {
                left: window.scrollX,
                top: window.scrollY,
                right: document.body.scrollWidth,
                bottom: document.body.scrollHeight
            }
        }
    }
    let originPageX = 0;
    let scrollLeftAddFunc = _.throttle(function(scrollParent, event) {
        let distance = event.pageX - originPageX;
        scrollParent.scrollLeft += distance;
        originPageX = 0;
    }, 100);


    target.addEventListener("mousedown", mouseDownHandle);
    target.addEventListener("click", clickHandle);


    if (option.handle !== void 0 && option.handle !== "this") {
        domoperation.insertStyle2Head(`${selector}:hover{cursor:default}`);
        domoperation.insertStyle2Head(`${option.handle}:hover{cursor:move}`);
    } else {
        domoperation.insertStyle2Head(`${selector}:hover{cursor:move}`);
    }

    if (option.cancel !== void 0) {
        domoperation.insertStyle2Head(`${option.cancel}:hover{cursor:default}`);
    }

    function mouseDownHandle(event) {
        event.preventDefault();
        event.stopPropagation();
        if (option.handle !== void 0) {
            if (handleSelector !== event.target) {
                return;
            }
        }

        if (option.cancel !== void 0) {
            if (cancelSelector === event.target) {
                return;
            }
        }

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
        let x = 0,
            y = 0;
        if (isTranslate) {
            x = originTranslate.x + event.pageX - mouseDownPage.x,
                y = originTranslate.y + event.pageY - mouseDownPage.y;
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

        /*
            自动滚动，思路，
         */
        if (scrollParent !== void 0) {
            targetBoundingClientRect = getElemBoundingClientRect(target);
            distanceBetweenTargetAndScrollParent = {
                left: targetBoundingClientRect.left - scrollParentBoundingClientRect.left,
                top: targetBoundingClientRect.top - scrollParentBoundingClientRect.top,
                right: targetBoundingClientRect.right - scrollParentBoundingClientRect.right,
                bottom: targetBoundingClientRect.bottom - scrollParentBoundingClientRect.bottom
            }

            if (scrollParentBoundingClientRect.right - event.pageX < event.movementX) {
                scrollParent.scrollLeft += event.movementX
                console.log(scrollParent.scrollLeft);
            }

            // if (distanceBetweenTargetAndScrollParent.left > scrollParent.clientWidth - target.offsetWidth) {
            //     // scrollParent.scrollLeft = document.body.scrollWidth - document.body.clientWidth;
            //     // scrollParent.scrollLeft = scrollParent.scrollWidth - scrollParent.clientWidth;
            //     scrollParent.scrollLeft += 20;
            //     // scrollParent.scrollLeft = scrollParent.scrollLeft + event.movementX;
            //     // if (originPageX === 0) {
            //     //     originPageX = event.pageX;
            //     // }
            //     // scrollLeftAddFunc(scrollParent, event);
            // }

            if (distanceBetweenTargetAndScrollParent.left < 0) {
                scrollParent.scrollLeft -= scrollLeftAdd;
            }

            if (distanceBetweenTargetAndScrollParent.top > scrollParent.clientHeight - target.offsetHeight) {
                scrollParent.scrollTop += scrollTopAdd;
            }

            if (distanceBetweenTargetAndScrollParent.top < 0) {
                scrollParent.scrollTop -= scrollTopAdd;
            }
        }
    }

    // function autoScroll() {
    //     targetBoundingClientRect =  getElemBoundingClientRect(target);
    //     distanceBetweenTargetAndScrollParent = {
    //         left:targetBoundingClientRect.left - scrollParentBoundingClientRect.left,
    //         top:targetBoundingClientRect.top - scrollParentBoundingClientRect.top,
    //         right:targetBoundingClientRect.right - scrollParentBoundingClientRect.right,
    //         bottom:targetBoundingClientRect.bottom - scrollParentBoundingClientRect.bottom
    //     }

    //     if (distanceBetweenTargetAndScrollParent.left > scrollParent.clientWidth - target.offsetWidth) {
    //         // scrollParent.scrollLeft = document.body.scrollWidth - document.body.clientWidth;
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

    function mouseUpHandle(event) {
        event.preventDefault();
        event.stopPropagation();
        document.removeEventListener("mousemove", mouseMoveHandle);
        document.removeEventListener("mouseup", mouseUpHandle);

        if (option.revert) {
            target.style.transition = "transform 0.5s linear";
            target.addEventListener("transitionend", (e) => {
                target.style.transition = "";
            })
            target.style.transform = `translate(${originTranslate.x}px, ${originTranslate.y}px)`;
        }

    }

    function clickHandle(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function getContainmentPositionRange(containment) {
        let distanceBetweenContainmentAndDoc = isGetDistanceByBoundingClientRect ? getElemBoundingClientRect(containment) : calculateDistanceBetweenEleAndDoc(containment),
            distanceBetweenTargeEleAndDoc = isGetDistanceByBoundingClientRect ? getElemBoundingClientRect(target.offsetParent) : calculateDistanceBetweenEleAndDoc(target.offsetParent),
            containmentPadding = domoperation.getPadding(domoperation.getElementComputedStyle(containment))


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

        console.log("distanceBetweenContainmentAndDoc left " + distanceBetweenContainmentAndDoc.left + " distanceBetweenContainmentAndDoc top " + distanceBetweenContainmentAndDoc.top);
        console.log("distanceBetweenTargeEleAndDoc left " + distanceBetweenTargeEleAndDoc.left + " distanceBetweenTargeEleAndDoc top " + distanceBetweenTargeEleAndDoc.top);
        console.log("distanceBeteenTargetAndContainment left " + distanceBeteenTargetAndContainment.left + " distanceBeteenTargetAndContainment top " + distanceBeteenTargetAndContainment.top);


        return {
            left: 0 - distanceBeteenTargetAndContainment.left,
            top: 0 - distanceBeteenTargetAndContainment.top,
            right: 0 - distanceBeteenTargetAndContainment.left + containment.clientWidth - target.offsetWidth,
            bottom: 0 - distanceBeteenTargetAndContainment.top + containment.clientHeight - target.offsetHeight
        }
    }

    function calculateDistanceBetweenEleAndDoc(element) {
        let elementStyle = domoperation.getElementComputedStyle(element),
            elementTranslate = domoperation.getTheTranslate(elementStyle);
        if (element === document.body) {
            return { left: 0, top: 0 };
        } else {
            let result = calculateDistanceBetweenEleAndDoc(element.offsetParent);
            return {
                left: element.offsetLeft + result.left + element.clientLeft + elementTranslate.x,
                top: element.offsetTop + result.top + element.clientTop + elementTranslate.y
            }
        }
    }

    function getElemBoundingClientRect(element) {
        let boundingClientRect = element.getBoundingClientRect();
        return {
            left: boundingClientRect.left + window.scrollX,
            top: boundingClientRect.top + window.scrollY,
            right: boundingClientRect.right + window.scrollX,
            bottom: boundingClientRect.bottom + window.scrollY
        }
    }

    function updateTargetPositionInfo() {
        targetComputedStyle = domoperation.getElementComputedStyle(target);
        targetPositionInfo.position = domoperation.getPosition(targetComputedStyle);
        targetPositionInfo.translate = domoperation.getTheTranslate(targetComputedStyle);
        targetPositionInfo.margin = domoperation.getMargin(targetComputedStyle);
    }
}

export function drogable(element) {

}

export function resizable(element) {

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
