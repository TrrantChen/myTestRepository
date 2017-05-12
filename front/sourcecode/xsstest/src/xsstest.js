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

            input {
                border:0;
            }
            
            input:focus {
                    outline-offset: 0px;
                    outline:0px;
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
                height:100%;
                background: #26251C;
            }         

            .inputStyle {
                margin-left:10px;
                margin-top:10px;
                width:200px;
                height:40px;
                border-radius: 50px;
                background: rgba(255, 255, 255, 0.4);
                padding-left:25px;
                color: #ffffff;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <input id="input1" type="text" class="inputStyle">
            <button id="btnTest">test</button>
        </div>
    </body>
 <script src="../lib/requirejs/require.js" type="text/javascript"></script>
    <script src="../js/common/requireconfig.js" type="text/javascript"></script>
    <script type="text/javascript">
        require.config({
            paths: {
                "othertestmodule":'../js/fileandajax/othertestmodule',
                "filemodule":"../js/fileandajax/filemodule"
            }
        })  

        require(["common", "othertestmodule", "filemodule", "jquery", "underscore"], function(common, othertestmodule, filemodule){
            var path = common.getHost();
            $("#btnTest").click(function(){
                var input1 = document.querySelector("#input1");
                var input = document.createElement("input");
                input.classList.add("inputStyle");
                input.setAttribute("type", "text")
                // input.value = input1.value;
                input.setAttribute("value", input1.value)
                var container = document.querySelector(".container");
                container.appendChild(input);
                // debugger



            })
        })        
    </script>  
</html>