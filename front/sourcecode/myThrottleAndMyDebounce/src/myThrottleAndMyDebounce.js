import * as util from '../../js/common/util'

function btnFunc() {
  console.log("btnFunc apply time " + new Date())
} 

function inputFunc(domName) {
  console.log($("#" + domName).val());
}

var delayTime = 5000;
var myThrottleBtnFunc = util.myThrottle(btnFunc, delayTime);
var underscoreThrottleBtnFunc = _.throttle(btnFunc, delayTime);
var myDebounceBtnFunc = util.myDebounce(btnFunc, delayTime);
var underscoreDebounceBtnFunc = _.debounce(btnFunc, delayTime);

var myThrottleInputFunc = util.myThrottle(inputFunc, delayTime);
var underscoreThrottleInputFunc = _.throttle(inputFunc, delayTime);
var myDebounceInputFunc = util.myDebounce(inputFunc, delayTime);
var underscoreDebounceInputFunc = _.debounce(inputFunc, delayTime);            

$("#btnContainer").on("click", function(event) {
  var domName = event.target.id;
  switch (domName) {
    case "myThrottleBtnTest":
      myThrottleBtnFunc();
      break;
    case "underscoreThrottleBtnTest":
      underscoreThrottleBtnFunc();
      break; 
    case "myDebounceBtnTest":
      myDebounceBtnFunc();
      break;
    case "underscoreDebounceBtnTest":
      underscoreDebounceBtnFunc();
      break;                                               
  }
}) 

$("#inputContainer").on("keydown", function(event) {
  var domName = event.target.id;
  switch (domName) {
    case "myThrottleInputTest":
      myThrottleInputFunc(domName);
      break;
    case "underscoreThrottleInputTest":
      underscoreThrottleInputFunc(domName);
      break; 
    case "myDebounceInputTest":
      myDebounceInputFunc(domName);
      break;
    case "underscoreDebounceInputTest":
      underscoreDebounceInputFunc(domName);
      break;                                               
  }
})