import { setOption } from './util'
import { AjaxAopFnType } from "./enum"
import { insertStyle2Head, insertStr2Dom} from './domoperation'
import { XmlHttpRequestRemould } from './XmlHttpRequestRemouldClass'


/*
 option:{
  minTimeSpan
  ,maxTimeSpan
  ,execOnce // 是否只执行一次，对应场景为需要轮询的监控场景
  ,externUrlArr // 需要除外的url
 }
 */
export class Loading {
  constructor(option) {
    let defaultOption = {
      minTimeSpan:0
      ,maxTimeSpan:3000
      ,execOnce:true
    };

    this.option = setOption(defaultOption, option);
    if (this.option.minTimeSpan > this.option.maxTimeSpan) {
      console.warn("minTimeSpan is larger than maxTimeSpan");
      this.option.maxTimeSpan = this.option.minTimeSpan + 1000;
    }
    this.count = 0;
    this.isShow = false;
    this.autoHideLoading = null;
    this.startTime = null;
    this.xmlHttpRequestRemould = new XmlHttpRequestRemould();

    if (Loading.runOnce === void 0) {
      Loading.runOnce = true;
      let css = `
                .loadingContent { 
                  position: fixed; 
                  top:   0; 
                  left: 0; 
                  right: 0; 
                  bottom: 0; 
                  margin: auto; 
                  z-index: 9999; 
                  width: 100%; 
                  height: 100%; 
                  background: rgba(0, 0, 0, 0.572549); 
                  display:none; 
                } 
                .loadingProcess { 
                  position: absolute; 
                  top:   0; 
                  left: 0; 
                  right: 0; 
                  bottom: 0; 
                  margin: auto; 
                  z-index: 9999; 
                  width: 140px; 
                  height: 140px; 
                  transform: rotate(-90deg); 
                  animation-name: loadingContainerRotate; 
                  animation-duration: 1.2s; 
                  animation-timing-function: linear; 
                  animation-direction: reverse; 
                  animation-iteration-count: infinite; 
                } 
                @keyframes loadingContainerRotate { 
                  0% { transform: rotate(-90deg); } 
                  100% { transform: rotate(270deg); } 
                } 
                .circleContainer { 
                  width: 100%; 
                  height: 100%; 
                } 
                .circle { 
                  transition: all .4s; 
                  fill: none; 
                  stroke-width: 3.5; 
                  stroke-linecap: round; 
                  stroke-dasharray: 20, 300; 
                  stroke-dashoffset: 0; 
                  animation-duration: 0.6s; 
                  animation-direction: alternate; 
                  animation-iteration-count: infinite; 
                } 
                .circleWhite { 
                  stroke: #ffffff; 
                  animation-name: circleWhiteMotion; 
                  animation-timing-function: linear; 
                } 
                @keyframes circleWhiteMotion { 
                  0% { stroke-dasharray: 15, 300; } 
                  100% { stroke-dasharray: 40, 300; } 
                } 
                .circleYellow { 
                  stroke: #ffcc66; 
                  animation-name: circleYellowMotion; 
                  animation-timing-function: cubic-bezier(0.7, 0.4, 0.4, 0.7); 
                }
                @keyframes circleYellowMotion { 
                  0% { stroke-dasharray: 15, 300; } 
                  100% { stroke-dasharray: 60, 300; } 
                } 
                .circleGreen { 
                  stroke: #99cc66; 
                  animation-name: circleGreenMotion; 
                  animation-timing-function: cubic-bezier(0.8, 0.7, 0.45, 0.6); 
                } 
                @keyframes circleGreenMotion { 
                  0% { stroke-dasharray: 15, 300; } 
                  100% { stroke-dasharray: 80, 300; } 
                }`;
      insertStyle2Head(css);
      let insertStr = `
        <div class="loadingContent">
          <div class="loadingProcess">
            <svg class="circleContainer" viewBox="0 0 100 100">
              <circle class="circle circleGreen"  cx="50" cy="50" r="25"></circle>
              <circle class="circle circleYellow" cx="50" cy="50" r="25"></circle>
              <circle class="circle circleWhite"  cx="50" cy="50" r="25"></circle>
            </svg>
          </div>      
        </div>`
      insertStr2Dom(insertStr);
    }

    this.showBindThis = this.show.bind(this)
    this.hideOnceBindThis = this.hideOnce.bind(this) 
    this.xmlHttpRequestRemould.addFn2Arr(this.showBindThis, AjaxAopFnType.fnBeforeOpen);
    this.xmlHttpRequestRemould.addFn2Arr(this.hideOnceBindThis, AjaxAopFnType.fnAfterDataReturn);
    this._showLoading();        
  }

  show() {
    this.count++;
    console.log("show " + this.count);
    if (!this.isShow && this.count > 1) {
      this._showLoading();
    }
  }

  hideOnce() {
    this.count--;
    console.log("hide " + this.count);
    if (this.count <= 0 && this.isShow) {
      this._hideLoading();
    }
  }

  hide() {
    this._hideLoading();
  }

  _showLoading() {
    console.log("show");
    this.startTime = new Date().getTime();
    this.isShow = true;
    document.querySelector(".loadingContent").style.display = "block";
    this.autoHideLoading = setTimeout(this._hideLoading.bind(this), this.option.maxTimeSpan);
  }

  _hideLoading() {
    console.log("hide outter")
    let endTime = parseInt(new Date().getTime());
    if (endTime - this.startTime > this.option.minTimeSpan) {
      console.log("hide inner")
      this.count = 0;
      this.isShow = false;
      document.querySelector(".loadingContent").style.display = "none";
      clearTimeout(this.autoHideLoading);

      if (this.option.execOnce) { 
        this.xmlHttpRequestRemould.removeFnArrItem(this.showBindThis, AjaxAopFnType.fnBeforeOpen);
        this.xmlHttpRequestRemould.removeFnArrItem(this.hideOnceBindThis, AjaxAopFnType.fnAfterDataReturn);         
      }
    }
  }
}
