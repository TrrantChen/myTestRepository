/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-08-15 17:02:36
 * @version $Id$
 */

import { AjaxAopFn } from "./enum"
import { removeArrayItem } from "./util"

export class XmlHttpRequestRemould {
  constructor() {
    this.fnBeforeOpenArr = [];
    this.fnAfterOpenArr = [],
    this.fnBeforeDataReturnArr = [],
    this.fnAfterDataReturnArr = [];


    let open = XMLHttpRequest.prototype.open
      ,send = XMLHttpRequest.prototype.send
      ,onreadystatechangeDescriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "onreadystatechange")
      ,that = this;
    
    function replaceOpen() {
      let paras = Array.prototype.slice.call(arguments, 0);

      if (Array.isArray(that.fnBeforeOpenArr)) {
        applyFun(that.fnBeforeOpenArr, this, [paras, this])
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
                if (Array.isArray(that.fnBeforeDataReturnArr)) {
                  applyFun(that.fnBeforeDataReturnArr, this, this);
                }  
                value();                           
                if (Array.isArray(that.fnAfterDataReturnArr)) {
                  applyFun(that.fnAfterDataReturnArr, this, this);
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

      if (Array.isArray(that.fnAfterOpenArr)) {
        applyFun(that.fnAfterOpenArr, this, this);
      }

      return send.apply(this, arguments);
    }   

    function replaceOnReadyChange() {;
      if (this.readyState == 4 && this.status.toString() == "200") {
        if (Array.isArray(that.fnBeforeDataReturnArr)) {
          applyFun(that.fnBeforeDataReturnArr, this, this);
        }  
        console.log("onreadychange when readyState is 4");
      }

      var tmponreadystatechange = this.tmponreadystatechange.apply(this, arguments);

      if (this.readyState == 4 && this.status.toString() == "200") { 
        if (!Array.isArray(that.fnAfterDataReturnArr)) {
          applyFun(that.fnAfterDataReturnArr, this, this);
        }                
      }

      return tmponreadystatechange;
    }

    function replaceOnLoad() {
      if (Array.isArray(that.fnBeforeDataReturnArr)) {
        applyFun(that.fnBeforeDataReturnArr, this, this);
      }  

      var tmponload = this.tmponload.apply(this, arguments);

      if (Array.isArray(that.fnAfterDataReturnArr)) {
        applyFun(that.fnAfterDataReturnArr, this, this);
      }      

      return tmponload
    }

    function replaceOnError() {
      if (Array.isArray(that.fnAfterDataReturnArr)) {
        applyFun(that.fnAfterDataReturnArr, this, this);
      }  
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
    this.fnBeforeOpenArr.push(fn);
  };

  setFnAfterOpen(fn) {
    this.fnAfterOpenArr.push(fn);
  };

  setFnBeforeDataReturn(fn) {
    this.fnBeforeDataReturnArr.push(fn);
  };

  setFnAfterDataReturn(fn) {
    this.fnAfterDataReturnArr.push(fn)
  };

  clearFnBeforeOpen() {
    this.fnBeforeOpenArr = [];
  }

  clearFnAfterOpen() {
    this.fnAfterOpenArr = [];
  };

  clearFnBeforeDataReturn() {
    this.fnBeforeDataReturnArr = [];
  };

  clearFnAfterDataReturn() {
    this.fnAfterDataReturnArr = [];
  };  
}
