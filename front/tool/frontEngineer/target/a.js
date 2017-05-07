define(['exports', './b.js'], function (exports, _b) {
  'use strict';

  var b = _interopRequireWildcard(_b);

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

  console.log('a starting'); /**
                              * 
                              * @authors Your Name (you@example.org)
                              * @date    2017-05-07 17:19:36
                              * @version $Id$
                              */

  exports.done = false;
  // const b = require('./b.js');
  console.log('in a, b.done = %j', b.done);
  exports.done = true;
  console.log('a done');
});