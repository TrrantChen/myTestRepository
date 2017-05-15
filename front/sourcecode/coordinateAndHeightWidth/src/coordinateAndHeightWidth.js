import * as util from '../../js/common/util'
    
    
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





