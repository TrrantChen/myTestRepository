define(['./a.js', './b.js'], function (_a, _b) {
  'use strict';

  var a = _interopRequireWildcard(_a);

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

  /**
   * 
   * @authors Your Name (you@example.org)
   * @date    2017-05-07 17:20:09
   * @version $Id$
   */
  console.log('main starting');
  // const a = require('./a.js');
  // const b = require('./b.js');
  console.log('in main, a.done=%j, b.done=%j', a.done, b.done);
});