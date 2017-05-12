<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
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
    
    button {
        border-width: 0px;
        outline: none;
    }
    
    body,
    html {
        width: 100%;
        height: 100%;
    }
    
    .leftContent {
        width: 50%;
        height: 100%;
        display: inline-block;
    }
    
    .rightContent {
        width: 50%;
        height: 100%;
        display: inline-block;
    }
    
    .container {
        width: 100%;
        height: 100%;
        font-size: 0px;
        background: #ADC0B4;
    }
    </style>
</head>

<body>
    <div class="container">
    </div>
</body>
<script src="../lib/jquery/jquery-1.11.2.js" type="text/javascript"></script>
<!-- <script src="../js/common/xmlHttpRequestRemould.js" type="text/javascript"></script> -->
<script src="../lib/requirejs/require.js" type="text/javascript"></script>
<script src="../js/common/requireconfig.js" type="text/javascript"></script>
<script type="text/javascript">
var isRequire = true;
if (isRequire) {
    require.config({
        paths: {
            "othertestmodule": '../js/fileandajax/othertestmodule',
            "filemodule": "../js/fileandajax/filemodule",
            "schememodule": '../js/module/schememodule',
        }
    })
    require(["common", "othertestmodule", "filemodule", "constant", "schememodule", "ajax", "ajaxtestmodule", "jquery", "underscore"], function(common, othertestmodule, filemodule, constant, schememodule, ajax, ajaxtestmodule) {
        var oldFetch = window.fetch;
        window.fetch = function() {
            console.log("before fetch");
            var arr = [].slice.call(arguments);
            return oldFetch.apply(this, arr);
        }
        common.promiseAop();

        ajaxtestmodule.fetchTest();
    })
} else {

}
</script>

</html>
