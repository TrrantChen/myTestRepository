import $ from 'jquery';
import  * as util from '../../js/common/util'; 
// import * as objectSizeof  from '../../lib/sizeof/index';
import { getDomCount, action4EverySonDom, ButtonContent, setFrame} from '../../js/common/domoperation';
import { selectable } from '../../js/common/interaction';
interaction
import * as named from '../../lib/commonjsTest';
import '../../../node_modules/babel-polyfill/browser'

let container = document.querySelector(".container");
// $(() => {
//   let sonDiv = document.querySelector(".sonDiv");
//   sonDiv.addEventListener("mousedown", (evt) => {
//     evt.stopPropagation();
//     evt.preventDefault();
//     console.log("this is mousedown");
//   })

//   document.body.addEventListener("keydown", (evt) => {
//     console.log("this is keydown");
//   })
// })

window.onload = () => {

  let sonframe = document.querySelector("#sonframe");
  let sonDoc = sonframe.contentDocument;
  let sonWin = sonframe.contentWindow;
  let sonFrameMain = sonDoc.querySelector("#sonFrameMain");
  setFrame(sonframe);

  // selectable(sonFrameMain, {
  //   frame:sonframe
  // })  

  // sonFrameMain.addEventListener("mousedown", (evt) => {
  //   evt.stopPropagation();
  //   evt.preventDefault();
  //   console.log("this is mousedown");
  //   console.log(evt);
  // })
  
  $(sonFrameMain).on("mousedown", (evt) => {
    evt.preventDefault();
    console.log("this is mousedown");
  })

  $(sonDoc.body).on("keyup", (evt) => {
    console.log("this is keypress")
  })
  
  // sonDoc.body.addEventListener("keydown", (evt) => {
  //   console.log("this is keydown")
  // })

}




































































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
