import $  from 'jquery';
import  * as util from '../../js/common/util'; 
// import * as objectSizeof  from '../../lib/sizeof/index';
import { getDomCount, action4EverySonDom, ButtonContent, setFrame, printDomTree} from '../../js/common/domoperation';
import { selectable, align, Align } from '../../js/common/interaction';
import * as named from '../../lib/commonjsTest';
import '../../../node_modules/babel-polyfill/browser'

// let container = document.querySelector(".container");
// $(() => {
//   // function containerClick(evt) {
//   //   console.log("event");
//   // }

//   // container.addEventListener("click", containerClick);
//   // container.removeEventListener("click", containerClick);

//   Object.prototype.myAddEventListener = function(eventName, fn) {
//     if (this.myEventObj === void 0) {
//       this.myEventObj = {};
//     }

//     this.myEventObj[eventName] = fn;
//   }

//   Object.prototype.myRemoveEventListener = function(eventName, fn) {
//     if (this.myEventObj !== void 0) {
//       delete this.myEventObj[eventName]
//     }
//   }

//   Object.prototype.myDispatchEvent = function(myEvent) {
//     if (this.myEventObj !== void 0) {
//       if (this.myEventObj[myEvent.eventType]) {
//         this.myEventObj[myEvent.eventType](myEvent);
//       }
//     }
//   }

//   function MyEvent(eventType) {
//     this.eventType = eventType;
//     this.eventData = "this is myEvent";
//   }

//   let obj = new Object();
//   let myEvent = new MyEvent("click");
  
//   function myEventCallBack(myEvent) {
//     console.log(myEvent.eventData);
//   }

//   obj.myAddEventListener("click", myEventCallBack);

//   obj.myDispatchEvent(myEvent);
// })
// 

$(() => {
  console.log("test");
})





































































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
