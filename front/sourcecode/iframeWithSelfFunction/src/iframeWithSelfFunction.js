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

            .content {
                width:100%;
                height:100%;
                background: #C5E65C;
            }     

            .spanStyle {
                font-size: 16px;
            }      
        </style>
    </head>
    <body>
        <div class="content">
            <span class="spanStyle">ux</span>
            <img id="imgLink" src="http://pic1.win4000.com/wallpaper/6/4fcec17f08ec4.jpg" alt="">
        </div>
    </body>
    <script src="../lib/requirejs/require.js" type="text/javascript"></script>
    <script src="../js/common/requireconfig.js" type="text/javascript"></script>
    <script type="text/javascript">
        // function iframeFun() {
        //     var span = document.querySelector(".spanStyle");
        //     var img = document.querySelector("#imgLink");
        //     var a = new Date()
        //     return window.getComputedStyle(img).getPropertyValue("width"); 
        // }
        // 
        // window.onload = function() {
        //     var startTime = parent.startTime;
        //     var spanTime = new Date().getTime() - parseInt(startTime);
        //     console.log(spanTime)
        // }
        
        window.onload = function() {
            console.log(document.documentElement);
        }
    </script>    
</html>