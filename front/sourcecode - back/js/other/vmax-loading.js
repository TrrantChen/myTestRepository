/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-11-28 14:33:34
 * @version $Id$
 */
(function(global, factory) {
    var loading = factory();
    global.loading = loading;
}(this, function() {
    function Loading() {
        var loadingNum = 0,
            isShow = false,
            autoHideLoading = null,
            _timeInterval = 20000,
            startTime = null,
            minSpan = 1500,
            that = this;

        this.show = function() {
            loadingNum++;
            if (!isShow && loadingNum > 1) {
                showloading();
            }
        };

        this.setTimeInterval = function(timeInterval) {
            _timeInterval = timeInterval
            clearTimeout(autoHideLoading);
            autoHideLoading = setTimeout(hideLoading, _timeInterval);
        };

        this.hideOnce = function() {
            loadingNum--;
            if (loadingNum <= 0 && isShow) {
                hideLoading();
            }
        };

        this.hide = function() {
            hideLoading();
        };

        function showloading() {
            startTime = new Date().getTime();
            isShow = true;
            document.querySelector(".loadingContent").style.display = "block";
            autoHideLoading = setTimeout(hideLoading, _timeInterval)
        };

        function hideLoading() {
            var endTime = parseInt(new Date().getTime())
            if (endTime - startTime > minSpan) {
                loadingNum = 0;
                isShow = false;
                document.querySelector(".loadingContent").style.display = "none";
                clearTimeout(autoHideLoading);
            } else {
                clearTimeout(autoHideLoading);
                autoHideLoading = setTimeout(hideLoading, 1200);
            }
        };

        /*------------create loading------------*/
        function insertStyle2Head() {
            var cssString = ".loadingContent {" + "    position: fixed;" + "    top:   0;" + "    left: 0;" + "    right: 0;" + "    bottom: 0;" + "    margin: auto;" + "    z-index: 9999;" + "    width: 100%;" + "    height: 100%;" + "    background: rgba(0, 0, 0, 0.572549);" + "    display:none;" + "}" + ".loadingProcess {" + "    position: absolute;" + "    top:   0;" + "    left: 0;" + "    right: 0;" + "    bottom: 0;" + "    margin: auto;" + "    z-index: 9999;" + "    width: 140px;" + "    height: 140px;" + "    transform: rotate(-90deg);" + "    animation-name: loadingContainerRotate;" + "    animation-duration: 1.2s;" + "    animation-timing-function: linear;" + "    animation-direction: reverse;" + "    animation-iteration-count: infinite;" + "}" + "@keyframes loadingContainerRotate {" + "    0% { transform: rotate(-90deg); }" + "    100% { transform: rotate(270deg); }" + "}" + ".circleContainer {" + "    width: 100%;" + "    height: 100%;" + "}" + ".circle {" + "    transition: all .4s;" + "    fill: none;" + "    stroke-width: 3.5;" + "    stroke-linecap: round;" + "    stroke-dasharray: 20, 300;" + "    stroke-dashoffset: 0;" + "    animation-duration: 0.6s;" + "    animation-direction: alternate;" + "    animation-iteration-count: infinite;" + "}" + ".circleWhite {" + "    stroke: #ffffff;" + "    animation-name: circleWhiteMotion;" + "    animation-timing-function: linear;" + "}" + "@keyframes circleWhiteMotion {" + "    0% { stroke-dasharray: 15, 300; }" + "    100% { stroke-dasharray: 40, 300; }" + "}" + ".circleYellow {" + "    stroke: #ffcc66;" + "    animation-name: circleYellowMotion;" + "    animation-timing-function: cubic-bezier(0.7, 0.4, 0.4, 0.7);" + "}" + "@keyframes circleYellowMotion {" + "    0% { stroke-dasharray: 15, 300; }" + "    100% { stroke-dasharray: 60, 300; }" + "}" + ".circleGreen {" + "    stroke: #99cc66;" + "    animation-name: circleGreenMotion;" + "    animation-timing-function: cubic-bezier(0.8, 0.7, 0.45, 0.6);" + "}" + "@keyframes circleGreenMotion {" + "    0% { stroke-dasharray: 15, 300; }" + "    100% { stroke-dasharray: 80, 300; }" + "}"
            var style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = cssString;
            var head = document.getElementsByTagName('head')[0]
            var headChildren = head.children;
            var isLinkExist = false;
            var headLength = headChildren.length;

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
        };

        function insertLoading2Body() {
            var insertDom = '<div class="loadingProcess">' + '<svg class="circleContainer" viewBox="0 0 100 100">' + '<circle class="circle circleGreen"  cx="50" cy="50" r="25"></circle>' + '<circle class="circle circleYellow" cx="50" cy="50" r="25"></circle>' + '<circle class="circle circleWhite"  cx="50" cy="50" r="25"></circle>' + '</svg>' + '</div>';
            var loadingContent = document.createElement('div');
            loadingContent.classList.add("loadingContent");
            loadingContent.innerHTML = insertDom;
            var body = document.body;
            body.appendChild(loadingContent);
        };

        function createLoading() {
            insertStyle2Head();
            insertLoading2Body();
        }
        /*------------create loading------------*/

        /*------------xmlhttprequest------------*/
        function xmlHttpRequestRemould() {
            var open = window.XMLHttpRequest.prototype.open;
            var send = window.XMLHttpRequest.prototype.send;

            function replaceOpen() {
                var paras = Array.prototype.slice.call(arguments, 0);
                if (paras[1] != void 0) {
                    console.log(paras[1] + " open");
                }
                open.apply(this, arguments);
            }

            function replaceSend() {
                console.log("selfSend");
                that.show();

                if (this.onload) {
                    this.tmponload = this.onload;
                    this.onload = replaceOnLoad;
                }

                if (this.onreadystatechange) {
                    this.tmponreadystatechange = this.onreadystatechange;
                    this.onreadystatechange = replaceOnReadyChange;
                }

                if (this.onerror) {
                    this.tmponerror = this.onerror;
                    this.onerror = replaceOnError;
                }

                return send.apply(this, arguments);
            }

            function replaceOnReadyChange() {
                console.log("onreadychange " + this.readyState);
                if (this.readyState == 4) {
                    that.hideOnce();
                }
                return this.tmponreadystatechange.apply(this, arguments);
            }

            function replaceOnLoad() {
                console.log("onload ")
                that.hideOnce();
                return this.tmponload.apply(this, arguments);
            }

            function replaceOnError() {
                console.log("onError");
                that.hideOnce();
                return this.tmponerror.apply(this, arguments);
            }
            XMLHttpRequest.prototype.open = replaceOpen;
            XMLHttpRequest.prototype.send = replaceSend;
        };
        /*------------xmlhttprequest------------*/

        /*------------iframe------------*/
        function iframeRemould() {

        }
        /*------------iframe------------*/

        function init() {
            createLoading();
            xmlHttpRequestRemould();
            iframeRemould();
            showloading();
        };

        init();
    }
    return new Loading();
}));
