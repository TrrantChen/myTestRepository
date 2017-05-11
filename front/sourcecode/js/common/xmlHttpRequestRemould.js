(function(global, factory) {
    global.xmlHttpRequestRemould = factory();
})(this, function() {
    function XmlHttpRequestRemould() {
        var that = this;
        var fnBeforeOpen = void 0,
        fnAfterOpen = void 0,
        fnBeforeDataReturn = void 0,
        fnAfterDataReturn = void 0;

        this.tmpObj = {};

        this.setFnBeforeOpen = function(fn) {
            fnBeforeOpen = fn;
        };

        this.setFnAfterOpen = function(fn) {
            fnAfterOpen = fn;
        };

        this.setFnBeforeDataReturn = function(fn) {
            fnBeforeDataReturn = fn;
        };

        this.setFnAfterDataReturn = function(fn) {
            fnAfterDataReturn = fn
        };

        var open = XMLHttpRequest.prototype.open;
        var send = XMLHttpRequest.prototype.send;

        var onreadystatechangeDescriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "onreadystatechange");

        function replaceOpen() {
            var paras = Array.prototype.slice.call(arguments, 0);

            if (fnBeforeOpen != void 0) {
                fnBeforeOpen(paras, this);
            }

            open.apply(this, arguments);
        }

        function replaceSend() {
            if (this.onload) {
                this.tmponload = this.onload;
                this.onload = replaceOnLoad;
            }

            if (this.onreadystatechange) {
                this.tmponreadystatechange = this.onreadystatechange;
                this.onreadystatechange = replaceOnReadyChange;
            } else {
                Object.defineProperty(this, "onreadystatechange", {
                    set:function(value) {
                            function closure() {
                                if (this.readyState == 4 && this.status.toString() == "200") {
                                    if (fnBeforeDataReturn != void 0) {
                                        fnBeforeDataReturn(this);
                                    }  
                                    value();                           
                                    if (fnAfterDataReturn != void 0) {
                                        fnAfterDataReturn(this);
                                    } 
                                }                                                     
                            }
                            onreadystatechangeDescriptor.set.call(this, closure);           
                    }
                    /*
                    似乎可以不加
                     */
                    // ,
                    // get:function() {
                    //     return onreadystatechangeDescriptor.get.call(this);
                    // }
                }) 
            }

            if (this.onerror) {
                this.tmponerror = this.onerror;
                this.onerror = replaceOnError;
            }

            if (fnAfterOpen != void 0) {
                fnAfterOpen(paras, this);
            }

            return send.apply(this, arguments);
        }

        function replaceOnReadyChange() {;
            if (this.readyState == 4 && this.status.toString() == "200") {
                if (fnBeforeDataReturn != void 0) {
                    fnBeforeDataReturn(this);
                }  
                console.log("onreadychange when readyState is 4");
            }

            var tmponreadystatechange = this.tmponreadystatechange.apply(this, arguments);

            if (this.readyState == 4 && this.status.toString() == "200") { 
                if (fnAfterDataReturn != void 0) {
                    fnAfterDataReturn(this);
                }                
            }

            return tmponreadystatechange;
        }

        function replaceOnLoad() {
            if (fnBeforeDataReturn != void 0) {
                fnBeforeDataReturn(this);
            }  

            var tmponload = this.tmponload.apply(this, arguments);

            if (fnAfterDataReturn != void 0) {
                fnAfterDataReturn(this);
            }      

            return tmponload
        }

        function replaceOnError() {
            var tmponerror = this.tmponerror.apply(this, arguments);
            return tmponerror
        }
        XMLHttpRequest.prototype.open = replaceOpen;
        XMLHttpRequest.prototype.send = replaceSend;
    }
    return new XmlHttpRequestRemould();
})


