define(['exports', './a.js'], function (exports, _a) {
  'use strict';

  var a = _interopRequireWildcard(_a);

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

  console.log('b starting'); /**
                              * 
                              * @authors Your Name (you@example.org)
                              * @date    2017-05-07 17:19:55
                              * @version $Id$
                              */

  exports.done = false;
  // const a = require('./a.js');
  console.log('in b, a.done = %j', a.done);
  exports.done = true;
  console.log('b done');
});