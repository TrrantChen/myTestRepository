import util from '../common/util.js';
import ajax from '../common/ajax.js';
import $ from '../../lib/_jquery.js';
     
export function objAndArrDeepCpy() {
    var deepCpyObj = {
        num:1,
        func:function() {
            console.log("this is obj func");
        },
        str:"str",
        arr:[2, "arr", {
            arrObjNum:4,
            arrObjFunc:function() {
                console.log("this is arr obj func");
            },
            arrObjObj:{
                arrObjObjNum:5
            }  
        }],
        innerObj:{
            innernum:2,
            innerstr:"innerstr",
            innerFunc:function() {
                console.log("this is inner obj func");
            },
            deepObj:{
                deepnum:3,
                deepstr:"deepstr",
                deepFunc:function() {
                    console.log("this is deep obj func");
                }
            }
        }
    };

    var jqueryExtendObj = {};
    $.extend(true,jqueryExtendObj, deepCpyObj);
    console.log("deepCpyObj.arr[2].arrObjObj.arrObjObjNum " + deepCpyObj.arr[2].arrObjObj.arrObjObjNum);
    console.log("jqueryExtendObj.arr[2].arrObjObj.arrObjObjNum " + jqueryExtendObj.arr[2].arrObjObj.arrObjObjNum);
    deepCpyObj.func();
    jqueryExtendObj.func();
    deepCpyObj.innerObj.innerFunc();
    jqueryExtendObj.innerObj.innerFunc();
    console.log("deepCpyObj.innerObj.innerstr " + deepCpyObj.innerObj.innerstr);
    console.log("jqueryExtendObj.innerObj.innerstr " + jqueryExtendObj.innerObj.innerstr);
    console.log("deepCpyObj.str " + deepCpyObj.str);
    console.log("jqueryExtendObj.str " + jqueryExtendObj.str);        
    console.log("--------------------")
    deepCpyObj.arr[2].arrObjObj.arrObjObjNum = 14;
    deepCpyObj.func = function() {
        console.log("this is extned func");
    }
    deepCpyObj.innerObj.innerFunc = function() {
        console.log("this is extend innerFunc");
    }
    deepCpyObj.innerObj.innerstr = "test";
    deepCpyObj.str = "fh";

    console.log("deepCpyObj.arr[2].arrObjObj.arrObjObjNum " + deepCpyObj.arr[2].arrObjObj.arrObjObjNum);
    console.log("jqueryExtendObj.arr[2].arrObjObj.arrObjObjNum " + jqueryExtendObj.arr[2].arrObjObj.arrObjObjNum);
    deepCpyObj.func();
    jqueryExtendObj.func();
    deepCpyObj.innerObj.innerFunc();
    jqueryExtendObj.innerObj.innerFunc();
    console.log("deepCpyObj.innerObj.innerstr " + deepCpyObj.innerObj.innerstr);
    console.log("jqueryExtendObj.innerObj.innerstr " + jqueryExtendObj.innerObj.innerstr);
    console.log("deepCpyObj.str " + deepCpyObj.str);
    console.log("jqueryExtendObj.str " + jqueryExtendObj.str);  

    console.log("=======================");
    var myExtendObj = {};
    util.copyPropertiesFromObj2Obj(myExtendObj, deepCpyObj, true);
    console.log("deepCpyObj.arr[2].arrObjObj.arrObjObjNum " + deepCpyObj.arr[2].arrObjObj.arrObjObjNum);
    console.log("myExtendObj.arr[2].arrObjObj.arrObjObjNum " + myExtendObj.arr[2].arrObjObj.arrObjObjNum);
    deepCpyObj.func();
    myExtendObj.func();
    deepCpyObj.innerObj.innerFunc();
    myExtendObj.innerObj.innerFunc();
    console.log("deepCpyObj.innerObj.innerstr " + deepCpyObj.innerObj.innerstr);
    console.log("myExtendObj.innerObj.innerstr " + myExtendObj.innerObj.innerstr);  
    console.log("deepCpyObj.str " + deepCpyObj.str);
    console.log("myExtendObj.str " + myExtendObj.str);  

    console.log("--------------------")
    deepCpyObj.arr[2].arrObjObj.arrObjObjNum = 17;
    deepCpyObj.func = function() {
        console.log("this is extend func again");
    }
    deepCpyObj.innerObj.innerFunc = function() {
        console.log("this is innerFunc haha");
    }
    deepCpyObj.innerObj.innerstr = "test2";
    deepCpyObj.str = "ffff";
    console.log("deepCpyObj.arr[2].arrObjObj.arrObjObjNum " + deepCpyObj.arr[2].arrObjObj.arrObjObjNum);
    console.log("myExtendObj.arr[2].arrObjObj.arrObjObjNum " + myExtendObj.arr[2].arrObjObj.arrObjObjNum); 
    deepCpyObj.func();
    myExtendObj.func(); 
    deepCpyObj.innerObj.innerFunc();
    myExtendObj.innerObj.innerFunc();       
    console.log("deepCpyObj.innerObj.innerstr " + deepCpyObj.innerObj.innerstr);
    console.log("myExtendObj.innerObj.innerstr " + myExtendObj.innerObj.innerstr); 
    console.log("deepCpyObj.str " + deepCpyObj.str);
    console.log("myExtendObj.str " + myExtendObj.str);          
}

