/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-03-13 11:05:43
 * @version $Id$
 */
const commonProcess = require('../common/commonProcess');
const classicArithmeticProcess = require('./classicArithmeticProcess');
const randomProcess = require("../common/randomProcess");
const util = require("../common/util");

/*
    sort的效果要比quicksort好
 */
function quickSortVsArraySort() {
    var randomArray = randomProcess.createRandomArray(10000000, 1, 100000000);
    console.time("arraySort");
    var arraySortResult = util.arraySort(randomArray);
    console.timeEnd("arraySort");

    console.time("quickSort");
    var quickSortResult = classicArithmeticProcess.quickSort(randomArray);
    console.timeEnd("quickSort");
}

/*
    var的效果要比let好
 */ 
function letVsVarInCirculate() {
    function letCirculate() {
        for(let i = 0; i <　99999; i++) {}
    }

    function varCirculate() {
        for(var i = 0; i < 99999; i++){}
    }

    commonProcess.calculateSpanTime(letCirculate, "letCirculate")();
    commonProcess.calculateSpanTime(varCirculate, "varCirculate")();
}

/*
    addEventListenerNoop > jqueryOnNoop = jqueryOn > addEventListener
 */
function jqueryOnVsAddEventListener() {
    require("jsdom").env("", function(err, window) {
        if (err) {
            console.error(err);
            return;
        }
        var $ = require("jquery")(window);
        $("body").append("<div><input id=\"myThrottleInputTest\" type=\"text\"></div>");
        var myThrottleInputTest =  window.document.querySelector("#myThrottleInputTest");
        var myThrottleInputTestQuery = $(myThrottleInputTest);

        function jqueryOnNoop() {
            for (var i = 0; i < 99; i++) {
                myThrottleInputTestQuery.on("click", commonProcess.noop);
            }  
        }

        function jqueryOn() {
            for (var i = 0; i < 99; i++) {
                myThrottleInputTestQuery.on("click", function(){});
            }  
        }

        function addEventListenerNoop() {
            for (var i = 0; i < 99; i++) {
                myThrottleInputTest.addEventListener("click", commonProcess.noop);
            }  
        }  

        function addEventListener() {
            for (var i = 0; i < 99; i++) {
                myThrottleInputTest.addEventListener("click", function(){});
            }  
        }  

        commonProcess.calculateSpanTime(addEventListener, "addEventListener")();  
        commonProcess.calculateSpanTime(jqueryOn, "jqueryOn")();
        commonProcess.calculateSpanTime(addEventListenerNoop, "addEventListenerNoop")();  
        commonProcess.calculateSpanTime(jqueryOnNoop, "jqueryOnNoop")();
                  
    });
}







