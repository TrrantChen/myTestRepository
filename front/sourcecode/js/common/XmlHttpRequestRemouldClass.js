/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-08-15 17:02:36
 * @version $Id$
 */

export class XmlHttpRequestRemould {
  constructor() {
    this.fnBeforeOpen = void 0;
    this.fnAfterOpen = void 0,
    this.fnBeforeDataReturn = void 0,
    this.fnAfterDataReturn = void 0;


    let open = XMLHttpRequest.prototype.open
      ,send = XMLHttpRequest.prototype.send
      ,onreadystatechangeDescriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "onreadystatechange")
      ,that = this;
    
    function replaceOpen() {
      let paras = Array.prototype.slice.call(arguments, 0);

      if (that.fnBeforeOpen != void 0) {
          that.fnBeforeOpen(paras, this);
      }

      open.apply(this, arguments);
    };


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
                if (that.fnBeforeDataReturn != void 0) {
                  that.fnBeforeDataReturn(this);
                }  
                value();                           
                if (that.fnAfterDataReturn != void 0) {
                  that.fnAfterDataReturn(this);
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

      if (that.fnAfterOpen != void 0) {
        that.fnAfterOpen(paras, this);
      }

      return send.apply(this, arguments);
    }   

    function replaceOnReadyChange() {;
      if (this.readyState == 4 && this.status.toString() == "200") {
        if (that.fnBeforeDataReturn != void 0) {
            that.fnBeforeDataReturn(this);
        }  
        console.log("onreadychange when readyState is 4");
      }

      var tmponreadystatechange = this.tmponreadystatechange.apply(this, arguments);

      if (this.readyState == 4 && this.status.toString() == "200") { 
        if (that.fnAfterDataReturn != void 0) {
            that.fnAfterDataReturn(this);
        }                
      }

      return tmponreadystatechange;
    }

    function replaceOnLoad() {
      if (that.fnBeforeDataReturn != void 0) {
        that.fnBeforeDataReturn(this);
      }  

      var tmponload = this.tmponload.apply(this, arguments);

      if (that.fnAfterDataReturn != void 0) {
        that.fnAfterDataReturn(this);
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

  setFnBeforeOpen(fn) {
    this.fnBeforeOpen = fn;
  };

  setFnAfterOpen(fn) {
    this.fnAfterOpen = fn;
  };

  setFnBeforeDataReturn(fn) {
    this.fnBeforeDataReturn = fn;
  };

  setFnAfterDataReturn(fn) {
    this.fnAfterDataReturn = fn
  };
}
