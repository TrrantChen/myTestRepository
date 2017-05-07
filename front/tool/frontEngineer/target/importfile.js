define(["./exportfile"], function (_exportfile) {
  "use strict";

  var exportfile = _interopRequireWildcard(_exportfile);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  exportfile.print(); /**
                       * 
                       * @authors Your Name (you@example.org)
                       * @date    2017-05-06 17:39:40
                       * @version $Id$
                       */

  console.log("ll");
});