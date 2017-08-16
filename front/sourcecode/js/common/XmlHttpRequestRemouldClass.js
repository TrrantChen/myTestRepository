/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-08-15 17:02:36
 * @version $Id$
 */

export class XmlHttpRequestRemould {
  constructor() {
    this.fnBeforeOpen = [];
    this.fnAfterOpen = [],
    this.fnBeforeDataReturn = [],
    this.fnAfterDataReturn = [];


    let open = XMLHttpRequest.prototype.open
      ,send = XMLHttpRequest.prototype.send
      ,onreadystatechangeDescriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "onreadystatechange")
      ,that = this;
    
    function replaceOpen() {
      let paras = Array.prototype.slice.call(arguments, 0);

      if (that.fnBeforeOpen != void 0) {
        applyFun(that.fnBeforeOpen, this, [paras, this])
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
                  applyFun(that.fnBeforeDataReturn, this, this);
                }  
                value();                           
                if (that.fnAfterDataReturn != void 0) {
                  applyFun(that.fnAfterDataReturn, this, this);
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
        applyFun(that.fnAfterOpen, this, this);
      }

      return send.apply(this, arguments);
    }   

    function replaceOnReadyChange() {;
      if (this.readyState == 4 && this.status.toString() == "200") {
        if (that.fnBeforeDataReturn != void 0) {
          applyFun(that.fnBeforeDataReturn, this, this);
        }  
        console.log("onreadychange when readyState is 4");
      }

      var tmponreadystatechange = this.tmponreadystatechange.apply(this, arguments);

      if (this.readyState == 4 && this.status.toString() == "200") { 
        if (that.fnAfterDataReturn != void 0) {
          applyFun(that.fnAfterDataReturn, this, this);
        }                
      }

      return tmponreadystatechange;
    }

    function replaceOnLoad() {
      if (that.fnBeforeDataReturn != void 0) {
        applyFun(that.fnBeforeDataReturn, this, this);
      }  

      var tmponload = this.tmponload.apply(this, arguments);

      if (that.fnAfterDataReturn != void 0) {
        applyFun(that.fnAfterDataReturn, this, this);
      }      

      return tmponload
    }

    function replaceOnError() {
      var tmponerror = this.tmponerror.apply(this, arguments);
      return tmponerror
    }

    function applyFun(fnArr, that, paraArr) {
      paraArr = Array.isArray(paraArr) ? paraArr : [paraArr];
      if (Array.isArray(fnArr)) {
        let length = fnArr.length;
        for(var i = 0; i < length; i++) {
          let fn = fnArr[i];
          if (fn !== void 0) {
            fn.apply(that, paraArr);
          }
        }
      }
    }

    XMLHttpRequest.prototype.open = replaceOpen;
    XMLHttpRequest.prototype.send = replaceSend;
  }

  setFnBeforeOpen(fn) {
    this.fnBeforeOpen.push(fn);
  };

  setFnAfterOpen(fn) {
    this.fnAfterOpen.push(fn);
  };

  setFnBeforeDataReturn(fn) {
    this.fnBeforeDataReturn.push(fn);
  };

  setFnAfterDataReturn(fn) {
    this.fnAfterDataReturn.push(fn)
  };
}
