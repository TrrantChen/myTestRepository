import $ from 'jquery';
import * as util from '../../js/common/util'; 
import { getDomCount, action4EverySonDom } from '../../js/common/domoperation';

$(() => {
  let div = document.querySelector("#div")
    ,label = document.querySelector("#label")
    ,input = document.querySelector("#input")
    ,button = document.querySelector("#button")
    ,container = document.querySelector(".container")
    ,arr = [div, label, input, button]
    ,length = arr.length;
  for(var i = 0; i < length; i++) {
    console.log("=====================================");
    console.log(arr[i].valueOf());
    console.log("textContent " + arr[i].textContent);
    console.log("innerText " + arr[i].innerText);
    console.log("value " + arr[i].value); 
  }
  console.log("-----------------------------------")
  let jContainer = $(container);
  console.log("val " + jContainer.val());
  console.log("text " + jContainer.text());
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
