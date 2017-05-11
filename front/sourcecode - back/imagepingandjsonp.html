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
            
            body, html {
                width:100%;
                height:100%;
            }            
        </style>
    </head>
    <body>
    </body>
    <script src="../lib/jquery/jquery-2.1.4.js" type="text/javascript"></script>
    <script src="../lib/angular/angular.js" type="text/javascript"></script>
    <script src="../lib/bootstrap/js/bootstrap.js" type="text/javascript"></script>
    <script type="text/javascript">
        jQuery( document ).ready(function() {
            useJqueryAjax();
        });

        function imgPing() {
            var img = new Image();
            img.onload = img.onerror = function() {
                alert("done");
            }
            img.src = "http://10.9.233.35:8080/demos/data?example=common/datasource/with_select/"            
        }

        function handleResponse(value) {
            var keys = Object.keys(value);
            for (var i = 0; i < keys.length; i++) {
                console.log(keys[i] + ":" + value[keys[i]]);
            }
        }

        function jsonpFunc() {
            var script = document.createElement("script");
            script.src = "http://10.9.235.47:8088/test4Jsonp?callback=handleResponse";
            document.body.insertBefore(script, document.body.firstChild);
        }

        function useJqueryAjax() {
           // 表面上是走ajax实际上用的还是jsonp，需要创建一个script，然后在里面插入代码，我只能说这个接口真是不怎么样
           $.ajax({
                url:"http://10.9.235.47:8088/test4Jsonp?callback=?",   
                dataType:"jsonp",
                jsonpCallback:"handleResponse",
                success:function(data){
                    alert(data);
                }
           });            
        }

    </script>  
</html>