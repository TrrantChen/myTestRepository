/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-03-14 11:17:06
 * @version $Id$
 */
(function(global, factory) {
    global.xmlHttpRequestRemould = factory();
})(this, function() {
    function XmlHttpRequestRemould() {
        var fnBeforeAjaxSend = void 0,
        fnAfterAjaxSend = void 0,
        fnBeforeDone = void 0,
        fnAfterDone = void 0;

        this.setFnBeforeAjaxSend = function(fn) {
            fnBeforeAjaxSend = fn;
        };

        this.setFnAfterAjaxSend = function(fn) {
            fnAfterAjaxSend = fn;
        };

        this.setFnBeforeDone = function(fn) {
            fnBeforeDone = fn;
        };

        this.setFnAfterDone = function(fn) {
            fnAfterDone = fn
        };

        var open = XMLHttpRequest.prototype.open;
        var send = XMLHttpRequest.prototype.send;

        function replaceOpen() {
            console.log("selfOpen");
            var paras = Array.prototype.slice.call(arguments, 0);
            if (paras[1] != void 0) {
                console.log(paras[1] + " open");
            }

            /*
                self function here
             */
            open.apply(this, arguments);
        }

        function replaceSend() {
            console.log("selfSend");
            /*
                self function here
             */

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
                /*
                    self function here
                 */
                console.log("onreadychange when readyState is 4");
            }

            var tmponreadystatechange = this.tmponreadystatechange.apply(this, arguments);

            console.log("after onraedyChange");
            return tmponreadystatechange;
        }

        function replaceOnLoad() {
            console.log("onload ")
                /*
                    self function here
                 */
            var tmponload = this.tmponload.apply(this, arguments);

            console.log("after on load");
            return tmponload
        }

        function replaceOnError() {
            console.log("onError");
            /*
                self function here
             */
            var tmponerror = this.tmponerror.apply(this, arguments);
            console.log("after onError");
            return tmponerror
        }
        XMLHttpRequest.prototype.open = replaceOpen;
        XMLHttpRequest.prototype.send = replaceSend;
    }
    return new XmlHttpRequestRemould();
})
