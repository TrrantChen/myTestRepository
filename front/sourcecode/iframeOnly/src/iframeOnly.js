<!DOCTYPE html>
<script>
    console.log("start")
</script>
<html lang="en">
    <script>
        var startTime = new Date().getTime();
    </script>
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
                height:100%;
                font-size: 0;
            }
            .framestyle {
                width:50%;
                height:90%;
                display: inline-block;
            }  

            .spanStyle {
                font-size: 16px;
            } 

        </style>
    </head>
    <body>
        <div class="container">
            <iframe id ="iframe1"  src="iframeWithSelfFunction.html" frameborder="0" class="framestyle"></iframe>
<!--             <iframe id ="iframe2" src="iframeWithSelfFunction2.html" frameborder="0" class="framestyle"></iframe> -->
            <span class="spanStyle"></span>         
        </div>
    </body>
    <script src="../lib/requirejs/require.js" type="text/javascript"></script>
    <script src="../js/common/requireconfig.js" type="text/javascript"></script>
    <script src="../lib/jquery/jquery-1.11.3.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        // require.config({
        //     paths: {
        //         "othertestmodule": '../js/fileandajax/othertestmodule',
        //         "jquery": '../lib/jquery/jquery-1.11.3.min'
        //     }
        // })

        // require(["common", "othertestmodule", "jquery"], function(common, othertestmodule) {

        // })
        
        // var container = document.querySelector(".container");
        // container.innerHTML = '<iframe id ="iframe1"  src="iframeWithSelfFunction.html" frameborder="0" class="framestyle"></iframe>';    
        // var iframe = document.querySelector("#iframe1");
        // var script = document.createElement("script");
        // script.innerHTML = 'setTimeout(function(){console.log(this)}, 500)';
        // // iframe.contentDocument.appendChild(script);
        // iframe.appendChild(script);
        // // iframe.contentDocument.head.appendChild(script);
        // iframe.onload = function() {
        //     console.log("this is parent");
        // }
        // window.onload = function() {
        //     console.log("loadeddata");
        // }
    </script>    
</html>


