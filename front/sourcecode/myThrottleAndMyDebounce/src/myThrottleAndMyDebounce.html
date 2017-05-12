<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style type="text/css">
        * {
            margin:0px;
            padding:0px;
            box-sizing: border-box;
        }

        body, input, select, button, textarea {
            font-size: 14px;
            font-family: 'Microsoft YaHei',Tahoma, Geneva, sans-serif;
        }
        
        button, input {
            border-width: 0px;
            outline: none;
        }  


        
        body, html {
            width:100%;
            height:100%;
        } 

        .container {
            width:100%;
            height:100%;
            background: #EFF3CD;
            overflow:hidden
        }

        :root {
          --main-bg-color: green;
        }

        .one {
          width:100px;
          height:100px;
          background-color: var(--main-bg-color);
        }

        .two {
          width:100px;
          height:100px;                
          background-color:var(--main-bg-color);
        }

        .readonly-input {
          -webkit-appearance: textfield;
          background-color: white;
          -webkit-rtl-ordering: logical;
          user-select: text;
          cursor: auto;
          padding: 1px;
          border-width: 2px;
          border-style: inset;
          border-color: initial;
          border-image: initial;
          text-rendering: auto;
          color: initial;
          letter-spacing: normal;
          word-spacing: normal;
          text-transform: none;
          text-indent: 0px;
          text-shadow: none;
          display: inline-block;
          text-align: start;
          margin: 0em 0em 0em 0em;
          font: 11px BlinkMacSystemFont;
          -webkit-writing-mode: horizontal-tb;
          width:100px;
          height:30px;
          vertical-align: middle;
        }

        .readonly-input:focus {
          outline-offset: -2px;
          outline: -webkit-focus-ring-color auto 5px;
        }

        .btnStyle {
          background-color: #CDECCC;
          padding: 5px;
          border:solid 2px #321D2E;
        }

        .btnStyle:hover {
          background-color: #FAD089;
          border:solid 2px #FF9C5B;
          cursor: pointer;
        }

        .inputStyle {
          width:200px;
          height:35px;
          line-height:35px;
        }

        .subContainer {
          margin:5px 5px 0px 5px;
        }
    </style>
<body>
    <div class="container">
      <div class="subContainer" id="btnContainer">
        <button id="myThrottleBtnTest" class="btnStyle">myThrottleBtnTest</button>
        <button id="underscoreThrottleBtnTest" class="btnStyle">scoreThrottleBtnTest</button>
        <button id="myDebounceBtnTest" class="btnStyle">myDebounceBtnTest</button>
        <button id="underscoreDebounceBtnTest" class="btnStyle">underscoreDebounceBtnTest</button>          
      </div>
      <div class="subContainer" id="inputContainer">
        <input id="myThrottleInputTest" class="inputStyle" type="text">
        <input id="underscoreThrottleInputTest" class="inputStyle" type="text">
        <input id="myDebounceInputTest" class="inputStyle" type="text">
        <input id="underscoreDebounceInputTest" class="inputStyle" type="text">            
      </div>
    </div> 
    <script src="../lib/requirejs/require.js" type="text/javascript"></script>
    <script src="../js/common/requireconfig.js" type="text/javascript"></script>
    <script type="text/javascript">
        require.config({
            paths: {
                "othertestmodule":'../js/fileandajax/othertestmodule',
                "filemodule":"../js/fileandajax/filemodule",
                "peity":'../lib/peity-master/jquery.peity'
            },
            shim:{
              "peity":{
                deps:["jquery"],
                exports:"peity"
              }
            }
        })  

        require(["common", "othertestmodule", "filemodule", "constant", "jquery", "underscore"], function(common, othertestmodule, filemodule, constant){
          function btnFunc() {
            console.log("btnFunc apply time " + new Date())
          } 

          function inputFunc(domName) {
            console.log($("#" + domName).val());
          }

          var delayTime = 5000;
          var myThrottleBtnFunc = common.myThrottle(btnFunc, delayTime);
          var underscoreThrottleBtnFunc = _.throttle(btnFunc, delayTime);
          var myDebounceBtnFunc = common.myDebounce(btnFunc, delayTime);
          var underscoreDebounceBtnFunc = _.debounce(btnFunc, delayTime);

          var myThrottleInputFunc = common.myThrottle(inputFunc, delayTime);
          var underscoreThrottleInputFunc = _.throttle(inputFunc, delayTime);
          var myDebounceInputFunc = common.myDebounce(inputFunc, delayTime);
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

        })
    </script>     
</body>