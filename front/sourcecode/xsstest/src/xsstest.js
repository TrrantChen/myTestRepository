import * as util from '../../js/common/util'
    
    
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
