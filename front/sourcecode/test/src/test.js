<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style type="text/css">
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }
    
    body,
    input,
    select,
    button,
    textarea {
        font-size: 14px;
        font-family: 'Microsoft YaHei', Tahoma, Geneva, sans-serif;
    }
    
    button,
    input {
        border-width: 0px;
        outline: none;
    }
    
    body,
    html {
        width: 100%;
        height: 100%;
    }
    
    .container {
        width: 100%;
        height: 100%;
        background: #EFF3CD;
        overflow: hidden
    }
    
    :root {
        --main-bg-color: green;
    }
    
    .one {
        width: 100px;
        height: 100px;
        background-color: var(--main-bg-color);
    }
    
    .two {
        width: 100px;
        height: 100px;
        background-color: var(--main-bg-color);
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
        width: 100px;
        height: 30px;
        vertical-align: middle;
    }
    
    .readonly-input:focus {
        outline-offset: -2px;
        outline: -webkit-focus-ring-color auto 5px;
    }
    
    .btnStyle {
        background-color: #CDECCC;
        padding: 5px;
        border: solid 2px #321D2E;
    }
    
    .btnStyle:hover {
        background-color: #FAD089;
        border: solid 2px #FF9C5B;
        cursor: pointer;
    }
    
    .inputStyle {
        width: 200px;
        height: 35px;
        line-height: 35px;
    }
    
    .subContainer {
        margin: 5px 5px 0px 5px;
    }

    .testContainerStyle {
        width:200px;
        height:400px;
        border: solid 1px black;
        margin-left:10px;
        font-size: 0;
        display: flex;
        flex-wrap:wrap;
        justify-content:center;
        align-content:center;
    }

    .sonStyle {
        width:50px;
        height:50px;
        background: #FF9C97;
        display: inline-block;
        margin:5px 5px;       
    }

    </style>
</head>

<body>
    <div class="container">
        <div class="testContainerStyle">
            <div>
                <div class="sonStyle"></div>
                <div class="sonStyle"></div>
     <!--                <div class="sonStyle"></div>
                    <div class="sonStyle"></div>
                    <div class="sonStyle"></div>    -->               
            </div>        
        </div>
    </div>
    <script src="../lib/requirejs/require.js" type="text/javascript"></script>
    <script src="../js/common/requireconfig.js" type="text/javascript"></script>
    <script type="text/javascript">
    require.config({
        paths: {
            "othertestmodule": '../js/fileandajax/othertestmodule',
            "filemodule": "../js/fileandajax/filemodule",
            "peity": '../lib/peity-master/jquery.peity',
            "schememodule": '../js/module/schememodule',
        },
        shim: {
            "peity": {
                deps: ["jquery"],
                exports: "peity"
            }
        }
    })

    require(["common", "othertestmodule", "filemodule", "constant", "schememodule", "testmodule", "jquery", "underscore"], function(common, othertestmodule, filemodule, constant, schememodule, testmodule) {
        function Test() {
            this.print = () => {
                console.log("something");
            }
        }

        Test.testFunc= function() {
            console.log("this is testFunc");
        }

        Test.prototype = {
            protoValue:1,
            protoFunc:function() {
                console.log("this is protoFunc");
            }
        };
        var test = new Test();

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
        // console.time("cpy");
        $.extend(true,jqueryExtendObj, deepCpyObj);
        // common.copyPropertiesFromObj2Obj(jqueryExtendObj, deepCpyObj, true);
        // console.timeEnd("cpy");
        
        // function test() {}

        // var targetEqualCpy = test;
        // var sourceCpy = {
        //     a:test
        // }
        // $.extend(targetEqualCpy, sourceCpy);
    })
    </script>
</body>
