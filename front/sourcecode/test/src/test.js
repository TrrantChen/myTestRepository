import $ from 'jquery';
import  * as util from '../../js/common/util'; 
// import * as objectSizeof  from '../../lib/sizeof/index';
import { getDomCount, action4EverySonDom, ButtonContent, setFrame} from '../../js/common/domoperation';
import { selectable, align, Align } from '../../js/common/interaction';
import * as named from '../../lib/commonjsTest';
import '../../../node_modules/babel-polyfill/browser'

let container = document.querySelector(".container");
$(() => {
  // for (var i = 0; i < 10000; i++) {
  //   var div = document.createElement("div");
  //   container.appendChild(div);
  // }
  remove1();
})

function remove1() {
  console.time("remove1");
  while(container.firstChild) {
    container.removeChild(container.firstChild);
  }
  console.timeEnd("remove1");
}

function remove2() {
  console.time("remove2");
  container.innerHTML = "";
  console.timeEnd("remove2");
}




  // 备用
  function clearChessByCanvas(i, j) {
    let ctx = canvas.getContext("2d")
      ,x = (parseInt(lastChessCoordinate.j) + 1) * dis
      ,y = (parseInt(lastChessCoordinate.i) + 1) * dis;

    clearArc(x, y, 20, 1, ctx);
    ctx.beginPath();
    ctx.closePath();
    ctx.moveTo(x - dis / 2, y);
    ctx.lineTo(x + dis / 2, y);
    ctx.stroke();
    ctx.moveTo(x, y - dis / 2);
    ctx.lineTo(x, y + dis / 2);
    ctx.stroke();
  }

  // 备用
  function clearArc(x, y, radius, stepClear, ctx){//圆心(x,y)，半径radius  
      var calcWidth=radius-stepClear;  
      var calcHeight=Math.sqrt(radius*radius-calcWidth*calcWidth);  
        
      var posX=x-calcWidth;  
      var posY=y-calcHeight;  
        
      var widthX=2*calcWidth;  
      var heightY=2*calcHeight;  
        
      if(stepClear<=radius){  
          ctx.clearRect(posX, posY, widthX, heightY);  
          stepClear+=1;  
          clearArc(x, y, radius, stepClear, ctx);  
      }  
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
