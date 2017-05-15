import * as util from '../../js/common/util'


    <script src="../lib/requirejs/require.js" type="text/javascript"></script>
    <script src="../js/common/requireconfig.js" type="text/javascript"></script>
    <script type="text/javascript">
        require.config({
            paths: {
                "blobmodule":'../js/fileandajax/blobmodule',
                "arraybuffermodule":'../js/fileandajax/arraybuffermodule',
                "filemodule":'../js/fileandajax/filemodule',
                "othertestmodule":'../js/fileandajax/othertestmodule',
                "httpdatatransitionmodule":'../js/fileandajax/httpdatatransitionmodule'
            }
        })  

        require(["common", "blobmodule", "arraybuffermodule", "othertestmodule", "httpdatatransitionmodule", "jquery"], function(common, blobmodule, arraybuffermodule, othertestmodule, httpdatatransitionmodule){
            var path = common.getHost();

            $(function(){
                httpdatatransitionmodule.postMulFormFormData("multiparty");
            }) 

        })
    </script>
