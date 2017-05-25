import $ from '../../lib/jquery/jquery-2.2.3';
// import '../../lib/jquery-ui-1.12.1/jquery-ui';
import * as util from '../../js/common/util'; 
import * as domoperation from '../../js/common/domoperation';
import * as interaction from '../../js/common/interaction';

window.onload = function() {
  // let sonframe = document.querySelector("#sonframe");
  // let sonDoc = sonframe.contentDocument;
  // let sonWin = sonframe.contentWindow;
  // let control1 = document.querySelector("#control1");
  // var id = 0;
  // let sonFrameMain = sonDoc.querySelector("#sonFrameMain");
  // domoperation.setFrame(sonframe);
  // control1.addEventListener("click", (event) => {
  //   ++id;   
  //   let date =  new Date();
  //   let insertStr = '<div id="test' + id + '" style="width:100px;height:100px;background:#D9D5A7;"></div>'
  //   domoperation.insertStr2Dom(insertStr, sonFrameMain)
  // })

  // control2.addEventListener("click", (event) => {
  //   console.log(sonDoc.querySelector("#test" + id));
  // })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (min == max) {
        return min;
    } else {
        return Math.floor(Math.random() * (max - min)) + min;
    }   
}
