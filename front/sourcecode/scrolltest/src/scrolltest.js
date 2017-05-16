import * as util from '../../js/common/util'
import * as interaction from '../../js/common/interaction'

interaction.dragable("#dragDiv", {axis:"x"});
$("#dragDivJquery").draggable({axis:"x"});
console.log($("#dragDivJquery").scrollParent());

var dragDivJquery = document.querySelector("#dragDivJquery");
var outter = document.querySelector("#outter");

        






