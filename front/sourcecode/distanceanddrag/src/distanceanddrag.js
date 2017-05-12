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
            
            button {
                border-width: 0px;
                outline: none;
            }            
            
            body, html {
                width:100%;
                height:100%;
            }  

            .container {
                width:100%;
                height:150%;
                background: #F5ECB7;
                position: relative;
                left: 0;
                top:0;
            }   

            .testDivStyle {
                width:50px;
                height:50px;
                background: #2E0D23;
                position: relative;
                /*left:100px;*/
                /*margin-left: 100px; */
                /*padding: 100px;*/
                /*border: solid 10px #6BACBF;*/
                /*transform: translate(10px, 10px);*/
            }  

            .positionParentDivStyle {
                position:relative;
                background: #FFB238;
                left:50px;
                top:50px;
                /*left:300px;*/
                /*margin-left:300px;*/
                height:400px;
                width: 400px;
                /*overflow-y: auto;*/
            }   

            .testDivByJqueryuiStyle {
                width:50px;
                height:50px;
                background: red;
            } 

            #block {
                width: 50px;
                height: 50px;
                background-color: yellow;
                position: absolute;
            }  

            .outDivStyle {
                width:600px;
                height:600px;
                background: #E5F04C;
                position:relative;
                left:50px;
                top:50px;
            }   




            .marginStyle {
                width:300px;
                height:300px;
                /*border:solid 20px black;*/
                border:solid 2px black;
                /*margin-top:50px;*/
                margin-left:50px;
                position:relative;
            }   

            .absulteStyle {
                width:200px;
                height:200px;
                border:solid 2px black;
                /*border:solid 5px black;*/
                /*position:absolute;*/
                position:static;
                left:80px;
                top:50px;
                overflow-x: auto;
                margin-top:30px;
                margin-left:30px;
            }

            .relativeStyle {
                width:400px;
                /*overflow-x: scroll;*/
                /*width:100px;*/
                height:100px;
                border:solid 2px black;
                position:relative;
                /*position:static;*/
                left:30px;
                top:40px;
                margin-top:20px;
                margin-left:20px;
                /*padding:10px;*/

            }

            .divStyle {
                width:30px;
                height:30px;
                border:solid 1px black;
                position:relative;
                /*position:absolute;*/
                left:50px;
                top:50px;
                /*margin-left:30px;*/
                /*transform: translate(30px, 0);*/

            }

            .handcontent {                 
                display: inline-flex; 
                justify-content:center;
                align-items:center;
            }

            .test4handleStyle {
                width:150px;
                height:150px;
                border:solid 1px black;
                background: #604848;
                display: inline-block;
                vertical-align: top;
                padding:50px 10px 10px 10px;
            }

            .test4cancelStyle {
                width:150px;
                height:150px;
                border:solid 1px black;
                background: #F0F0D8;
                display: inline-block;
                vertical-align: top;
                padding: 100px 10px 0px 10px;
            }

            .test4OnlyCancelStyle {
                width:150px;
                height:150px;
                border:solid 1px black;
                background: #F0B49E;
                display: inline-block;
                vertical-align: top;
                padding: 100px 10px 0px 10px;
            }

        </style>


    </head>
    <body>
        <div class="container">
   <!--          <div id="outDiv" class="outDivStyle">
                <div id="positionParentDiv" class="positionParentDivStyle">
                    <div id="testDiv" class="testDivStyle">
                        
                    </div>  
                    <div id="testDivByJqueryui" class="testDivByJqueryuiStyle">
                        
                    </div>
                        p<br />                                                                 
                </div>                
            </div> -->
            <div id="margin" class="marginStyle">
                <div id="absolute" class="absulteStyle">
                    <div id="relative" class="relativeStyle">
                        <div id="testDivByJqueryui" class="divStyle"> 
                        </div>
                    </div>
                </div>
            </div>
            <div id="scrollDiv" style="width:50px;height:50px;background: #DBD8A2;border: solid 5px;position:relative;-webkit-user-drag: element;">
            </div>
            <!-- <div class="handcontent"> -->
                <div id="test4handle" class="test4handleStyle">
                    <p id="canP" style="font-size: 16px;border: solid 1px black;background: #C8C8A9;">I can be handle and drag</p>
                </div>
                <div id="test4cancel" class="test4cancelStyle">
                    <p id="canP2" style="font-size:16px;border:solid 1px black;">I can be handle</p>
                    <p id="noCanP" style="font-size: 16px;border:solid 1px black;background:#FF8A00;">I can not be handle</p>
                </div> 
                <div id="test4OnlyCancel" class="test4OnlyCancelStyle">
                    <p id="noCanP2" style="font-size:16px;border:solid 1px black;background:#DFECE6;">I can not be  handle</p>
                </div>                    
            <!-- </div> -->

        </div>
    </body>
    <script src="../lib/requirejs/require.js" type="text/javascript"></script>
    <script src="../js/common/requireconfig.js" type="text/javascript"></script>
    <script type="text/javascript">
        require.config({
            paths: {
                "jqueryui": '../lib/jquery-ui-1.12.1.custom/jquery-ui',
                "interaction":'../js/common/interaction'
            },
            shim: {
                "jqueryui": {
                    deps: ["jquery"],
                    exports: "jqueryui"
                }
            }
        })

        require(["common", "othertestmodule", "filemodule", "constant", "schememodule","ajax", "ajaxtestmodule","domoperation","interaction", "jqueryui", "jquery", "underscore"], function(common, othertestmodule, filemodule, constant, schememodule, ajax, ajaxtestmodule, domoperation, interaction){         
        
            function dragByJqueryUi() {
                var testDivByJqueryui = $("#testDivByJqueryui");
                testDivByJqueryui.draggable({containment: "#absolute"});
                // // testDivByJqueryui.draggable();
                var scrollDiv = $("#scrollDiv");
                // scrollDiv.draggable();

                console.log(testDivByJqueryui.scrollParent());
                // debugger
                // console.log( scrollDiv.scrollParent());
            }

            function dragInterationTest() {
                interaction.dragable("#testDivByJqueryui", {containment: "#relative"});
                // interaction.dragable("#testDivByJqueryui", {containment: "#absolute", revert:false});
                // interaction.dragable("#testDivByJqueryui");
                // interaction.dragable("#scrollDiv");
                
                // let testDivByJqueryui = document.querySelector("#testDivByJqueryui");
                // testDivByJqueryui.addEventListener("transitionrun", function(e){
                //     console.log("transitionrun")
                // })

                // testDivByJqueryui.addEventListener("transitionstart", function(e){
                //     console.log("transitionstart")
                // })  

                // testDivByJqueryui.addEventListener("transitionend", function(e){
                //     console.log("transitionend")
                // })   
                
                 interaction.dragable("#test4handle", {handle:"#canP"});
                 interaction.dragable("#test4cancel", {handle:"#canP2", cancel:"#noCanP"});
                 interaction.dragable("#test4OnlyCancel", {handle:"this", cancel:"#noCanP2"});                                
            }

            dragInterationTest();
            // dragByJqueryUi();
        })

        let testDivByJqueryui = document.querySelector("#testDivByJqueryui"),
            relative = document.querySelector("#relative"),
            absolute = document.querySelector("#absolute"),
            margin = document.querySelector("#margin"),
            scrollDiv = document.querySelector("#scrollDiv");

    </script>    
</html>



