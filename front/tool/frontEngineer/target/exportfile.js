define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.print = print;

  exports.default = function () {
    console.log("this is a default function");
  };

  /**
   * 
   * @authors Your Name (you@example.org)
   * @date    2017-05-06 17:36:46
   * @version $Id$
   */

  function print() {
    console.log("this is print from exprotfile");
  }

  ;
});