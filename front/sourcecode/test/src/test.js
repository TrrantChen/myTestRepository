import $ from 'jquery';
import * as util from '../../js/common/util'; 
import { getDomCount, action4EverySonDom } from '../../js/common/domoperation';

$(() => {
  let container = document.querySelector(".container");
  let currentDiv = document.querySelector("#currentDiv");
  action4EverySonDom(container, (dom)=> {
    dom.addEventListener("mouseenter", (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      let targetDom = evt.target
      ,boundingClientRect = targetDom.getBoundingClientRect();
      console.log(targetDom);
      console.log(`width:${boundingClientRect.width} height:${boundingClientRect.height} left:${boundingClientRect.left + window.scrollX} top:${boundingClientRect.top + window.scrollY}`)
      // currentDiv.style.width = boundingClientRect.width + "px";
      // currentDiv.style.height = boundingClientRect.height + "px";
      // currentDiv.style.transform = `translate(${boundingClientRect.left}px, ${boundingClientRect.top}px)`
    });
  })
  // let test11 = document.querySelector(".test11");
  // test11.addEventListener("mouseenter", (evt) => {
  //   evt.preventDefault();
  //   console.log("this is target");
  //   console.log(evt.target);
  //   console.log("this is currentTarget")
  //   console.log(evt.currentTarget);
  // }, false);

  // let test111 = document.querySelector(".test111");
  // test111.addEventListener("mouseenter", (evt) => {
  //   evt.preventDefault();
  //   console.log("this is target");
  //   console.log(evt.target);
  //   console.log("this is currentTarget")
  //   console.log(evt.currentTarget);
  // }, false);
  // 
  // document.addEventListener("mouseenter", (evt) => {
  //   console.log("================")
  //   console.log(evt.currentTarget);
  //   console.log(evt.target);
  // })
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
