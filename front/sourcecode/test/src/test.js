// import $ from 'jquery';
import * as util from '../../js/common/util'; 

let originEventListener = EventTarget.prototype.addEventListener
EventTarget.prototype.addEventListener = function() {
  let args = [].slice.call(arguments);
  if (this.id === 'firstChild') {
    console.log(arguments);
    if (args.length >= 2) {
      let fn = args[1];

      if (!this.addEventListener.isClear) {
        fn = function(){};
      } else {
        let oldFn = fn;
        fn = function() {
          console.log("i am click");
          console.log(this);
          oldFn.apply(this, arguments);
        }        
      }
      args[1] = fn;
    }
  }
  originEventListener.apply(this, args);    
}

// $(function() {
  // let firstContainer = document.querySelector('#firstContainer')
  //     ,firstChild = document.querySelector("#firstChild")
  //     ,secondContainer = document.querySelector('#secondContainer')
  
  let firstChild = document.querySelector("#firstChild");
  firstChild.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log("this is button attack fn");
  });

  firstChild.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log("this is another button attack fn");
  });

  firstChild.addEventListener.isClear = true;

  firstChild.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log("this is the only call fn");
  });



  // let result = firstContainer.removeChild(firstChild);
  // secondContainer.appendChild(result);
  
  // firstContainer.remove();
// })

// function Test() {
//     this.print = () => {
//         console.log("something");
//     }
// }

// Test.testFunc= function() {
//     console.log("this is testFunc");
// }

// Test.prototype = {
//     protoValue:1,
//     protoFunc:function() {
//         console.log("this is protoFunc");
//     }
// };
// var test = new Test();

// var deepCpyObj = {
//     num:1,
//     func:function() {
//         console.log("this is obj func");
//     },
//     str:"str",
//     arr:[2, "arr", {
//         arrObjNum:4,
//         arrObjFunc:function() {
//             console.log("this is arr obj func");
//         },
//         arrObjObj:{
//             arrObjObjNum:5
//         }  
//     }],
//     innerObj:{
//         innernum:2,
//         innerstr:"innerstr",
//         innerFunc:function() {
//             console.log("this is inner obj func");
//         },
//         deepObj:{
//             deepnum:3,
//             deepstr:"deepstr",
//             deepFunc:function() {
//                 console.log("this is deep obj func");
//             }
//         }
//     }
// };

// var jqueryExtendObj = {};
// // console.time("cpy");
// $.extend(true,jqueryExtendObj, deepCpyObj);

// console.log(jqueryExtendObj);
// // common.copyPropertiesFromObj2Obj(jqueryExtendObj, deepCpyObj, true);
// // console.timeEnd("cpy");

// // function test() {}

// // var targetEqualCpy = test;
// // var sourceCpy = {
// //     a:test
// // }
// // $.extend(targetEqualCpy, sourceCpy);
