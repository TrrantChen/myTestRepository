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
/*                margin-left: 20px;
                margin-top:20px;*/
            }
        </style>
        

    </head>
    <body>
        <div class="container">
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