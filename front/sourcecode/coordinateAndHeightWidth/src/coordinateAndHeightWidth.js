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
                width:100px;
                height:100px;
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
                left:100px;
            }   

            .testDivByJqueryuiStyle {
                width:100px;
                height:100px;
                background: red;
            } 

            #block {
                width: 200px;
                height: 200px;
                background-color: yellow;
                position: absolute;
            }  

            .scrollTopTestContentStyle {
                width:100px;
                height:100px;
                border:solid 5px black;
                overflow-y: auto;
            }  

            .scrollTopTestStyle {
                width:100%;
                height:300px;
                background: #FECEA8;
            }         
            
            .scrollWidthAndClientWidth {
                width:100%;
                border: solid 1px black;
            }

            .aDivStyle {
                width:100px;
                overflow-x: hidden;
            }

            .bDivStyle {
                width:100%;
                overflow-x: hidden;
            }

            .scrollHeightDivStyle {
                width:100px;
                height:100px;
                border:solid 1px black;
                overflow-y: hidden;
            }

            .clientHeightDivStyle {
                width:100px;
                height:100px;
                border:solid 1px black;
                overflow-y: hidden;
            }

            .scrollHeightAndClientHeightStyle {

            }
            
            .positionAndscrollStyle {
                width:400px;
                height:300px;
                overflow:auto;
                border:solid 5px black;
            }

            .testPositionDivStyle {
                width:100px;
                height:100px;
                background: #BAC9A9;
            }

            .offsetTestStyle {
                width:300px;
                height:300px;
                background:#FAD3B2;
                border: solid 1px #FF9C97;
            }

            .offsetDivStyle {
                width:50px;
                height:50px;
                background: #FFE181;
                margin-left: 20px;
                margin-top:20px;
            }
        </style>
        

    </head>
    <body>
        <div class="container">
            <div id="testDiv" class="testDivStyle">
                
            </div>                
            <div id="testDivByJqueryui" class="testDivByJqueryuiStyle">
                
            </div>

            <div id="scrollTopTestContent" class="scrollTopTestContentStyle">
                <div id="scrollTopTest" class="scrollTopTestStyle">
                    
                </div>
            </div>
            
            <div class="scrollWidthAndClientWidth">
                <div id="aDiv" class="aDivStyle">
                    ppppppppppppppppppppppppppppppppppppp
                </div>

                <div id="bDiv" class="bDivStyle">
                    ppppppppppppppppppppppppppppppppppppp
                </div>                     
            </div>  

            <div class="scrollHeightAndClientHeightStyle">
                <div id="scrollHeightDiv" class="scrollHeightDivStyle">
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                </div>
                <div id="clientHeightDiv" class="clientHeightDivStyle">
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                    p<br />
                </div>
            </div>

            <div id="positionAndscroll" class="positionAndscrollStyle">
                <div id="testPositionDiv" class="testPositionDivStyle">
                    
                </div>
            </div>

            <div id="offsetTest" class="offsetTestStyle">
                <div id="offsetDiv" class="offsetDivStyle">
                    
                </div>
            </div>
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
            
            
        })
    </script>    
</html>




