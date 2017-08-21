/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-08-15 17:02:36
 * @version $Id$
 */

import { AjaxAopFnType } from "./enum"
import { removeArrayItem, assignOption, } from "./util"
import { getProtocolAndHost } from "./domoperation"

/*
  todo
  externUrlArr 需要除外的url
 */
export class XmlHttpRequestRemould {
  constructor() {
    let defaultOption = {
      externUrlArr:[]
    }

    this.option = assignOption(defaultOption, {});
    this.fnBeforeOpenArr = [];
    this.fnAfterOpenArr = [];
    this.fnBeforeDataReturnArr = [];
    this.fnAfterDataReturnArr = [];
    this.fnArr = [
      this.fnBeforeOpenArr
      ,this.fnAfterOpenArr
      ,this.fnBeforeDataReturnArr
      ,this.fnAfterDataReturnArr
    ];
    this.protocolAndHost = getProtocolAndHost();

    if (XmlHttpRequestRemould.Single === void 0) {
      let open = XMLHttpRequest.prototype.open
        ,send = XMLHttpRequest.prototype.send
        ,onreadystatechangeDescriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "onreadystatechange")
        ,that = this;
  
      function replaceOpen() {
        let paras = Array.prototype.slice.call(arguments, 0);

        if (Array.isArray(that.fnBeforeOpenArr) && !that._isExternUrl(paras[1])) {
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
                  if (Array.isArray(that.fnBeforeDataReturnArr) && !that._isExternUrl(this.responseURL)) {
                    applyFun(that.fnBeforeDataReturnArr, this, this);
                  }  
                  value();                           
                  if (Array.isArray(that.fnAfterDataReturnArr) && !that._isExternUrl(this.responseURL)) {
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

        if (Array.isArray(that.fnAfterOpenArr) && !that._isExternUrl(this.responseURL)) {
          applyFun(that.fnAfterOpenArr, this, this);
        }

        return send.apply(this, arguments);
      }   

      function replaceOnReadyChange() {;
        if (this.readyState == 4 && this.status.toString() == "200") {
          if (Array.isArray(that.fnBeforeDataReturnArr) && !that._isExternUrl(this.responseURL)) {
            applyFun(that.fnBeforeDataReturnArr, this, this);
          }  
          console.log("onreadychange when readyState is 4");
        }

        var tmponreadystatechange = this.tmponreadystatechange.apply(this, arguments);

        if (this.readyState == 4 && this.status.toString() == "200") { 
          if (Array.isArray(that.fnAfterDataReturnArr) && !that._isExternUrl(this.responseURL)) {
            applyFun(that.fnAfterDataReturnArr, this, this);
          }                
        }

        return tmponreadystatechange;
      }

      function replaceOnLoad() {
        if (Array.isArray(that.fnBeforeDataReturnArr) && !that._isExternUrl(this.responseURL)) {
          applyFun(that.fnBeforeDataReturnArr, this, this);
        }  

        var tmponload = this.tmponload.apply(this, arguments);

        if (Array.isArray(that.fnAfterDataReturnArr) && !that._isExternUrl(this.responseURL)) {
          applyFun(that.fnAfterDataReturnArr, this, this);
        }      

        return tmponload
      }

      function replaceOnError() {
        if (Array.isArray(that.fnAfterDataReturnArr) && !that._isExternUrl(this.responseURL)) {
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

      XmlHttpRequestRemould.Single = this;
    } else {
      console.warn(" XmlHttpRequestRemould class has initializion");
    }

    return XmlHttpRequestRemould.Single;
  }

  setOption(option) {
    this.option = assignOption(this.option, option);
  }

  addFn2Arr(fn, ajaxAopFnType) {
    this.fnArr[ajaxAopFnType].push(fn);
  }

  clearFnArr(ajaxAopFnType) {
    this.fnArr[ajaxAopFnType] = [];
  }

  removeFnArrItem(fn, ajaxAopFnType) {
    removeArrayItem(this.fnArr[ajaxAopFnType] , fn);
  }

  _isExternUrl(url) {
    let filterUrl = url.split("?")[0].replace(this.protocolAndHost, "");
    return this.option.externUrlArr.indexOf(filterUrl) === -1 ? false : true;
  }
}

