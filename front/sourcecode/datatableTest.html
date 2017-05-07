<!--  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        body, html {
            width:100%;
            height:100%;
        }
        #block {
            width: 100px;
            height: 100px;
            background-color: yellow;
            position: absolute;
        }

        .container {
            width: 100%;
            height:200%;
            background: #031634;
            position:relative;
            top:0;
            left:0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div id="block"></div>
    </div>
<script>
    /**
     * 拖动元素
     * @param elementId 元素id
     */
    function drag(elementId) {
        var element = document.getElementById(elementId);
        var position = {
            offsetX: 0, //点击处偏移元素的X
            offsetY: 0, //偏移Y值
            state: 0 //是否正处于拖拽状态，1表示正在拖拽，0表示释放
        };
        //获得兼容的event对象
        function getEvent(event) {
            return event || window.event;
        }
        //元素被鼠标拖住
        element.addEventListener('mousedown', function (event) {
            //获得偏移的位置以及更改状态
            var e = getEvent(event);
            position.offsetX = e.offsetX;
            position.offsetY = e.offsetY;
            position.state = 1;
        }, false);
        //元素移动过程中
        document.addEventListener('mousemove', function (event) {
            var e = getEvent(event);
            if (position.state) {
                position.endX = e.clientX;
                position.endY = e.clientY;
                // position.endX = e.pageX;
                // position.endY = e.pageY;                
                //设置绝对位置在文档中，鼠标当前位置-开始拖拽时的偏移位置
                element.style.position = 'absolute';
                element.style.top = position.endY - position.offsetY + 'px';
                element.style.left = position.endX - position.offsetX + 'px';
            }
        }, false);
        //释放拖拽状态
        element.addEventListener('mouseup', function (event) {
            position.state = 0;
        }, false);
    }
    drag('block');
</script>
</body>
</html> -->



<!-- <!DOCTYPE html>
<html>
    <head>
        <title>Test</title>
        <style type="text/css" >
            html,body
            {
                height:100%;
                width:100%;
                padding:0;
                margin:0;
            }
            
            .dialog
            {
                width:250px;
                height:250px;
                position:absolute;
                background-color:#ccc;
                -webkit-box-shadow:1px 1px 3px #292929;
                -moz-box-shadow:1px 1px 3px #292929;
                box-shadow:1px 1px 3px #292929;
                margin:10px;
            }
            
            .dialog-title
            {
                color:#fff;
                background-color:#404040;
                font-size:12pt;
                font-weight:bold;
                padding:4px 6px;
                cursor:move;
            }
            
            .dialog-content
            {
                padding:4px;
            }
        </style>
    </head>
    <body>
        <div id="dlgTest" class="dialog">
            <div class="dialog-title">Dialog</div>
            <div class="dialog-content">
                This is a draggable test.
            </div>
        </div>
        <script type="text/javascript">
            var Dragging=function(validateHandler){ //参数为验证点击区域是否为可移动区域，如果是返回欲移动元素，负责返回null
                var draggingObj=null; //dragging Dialog
                var diffX=0;
                var diffY=0;
                
                function mouseHandler(e){
                    switch(e.type){
                        case 'mousedown':
                            draggingObj=validateHandler(e);//验证是否为可点击移动区域
                            if(draggingObj!=null){
                                diffX=e.clientX-draggingObj.offsetLeft;
                                diffY=e.clientY-draggingObj.offsetTop;
                            }
                            break;
                        
                        case 'mousemove':
                            if(draggingObj){
                                draggingObj.style.left=(e.clientX-diffX)+'px';
                                draggingObj.style.top=(e.clientY-diffY)+'px';
                            }
                            break;
                        
                        case 'mouseup':
                            draggingObj =null;
                            diffX=0;
                            diffY=0;
                            break;
                    }
                };
                
                return {
                    enable:function(){
                        document.addEventListener('mousedown',mouseHandler);
                        document.addEventListener('mousemove',mouseHandler);
                        document.addEventListener('mouseup',mouseHandler);
                    },
                    disable:function(){
                        document.removeEventListener('mousedown',mouseHandler);
                        document.removeEventListener('mousemove',mouseHandler);
                        document.removeEventListener('mouseup',mouseHandler);
                    }
                }
            }

            function getDraggingDialog(e){
                var target=e.target;
                while(target && target.className.indexOf('dialog-title')==-1){
                    target=target.offsetParent;
                }
                if(target!=null){
                    return target.offsetParent;
                }else{
                    return null;
                }
            }
            
            Dragging(getDraggingDialog).enable();
        </script>
    </body>
</html> -->


<!-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>拖动滑块验证</title>
    <style type="text/css">
        #demo{
            height: 30px;
            width: 260px;
            color: #000;
            margin: 20px auto;
            font-size: 14px;
            border: 1px solid #ccc;
            line-height: 30px;
            position: relative;
        }
        #bar,#ban,p{
            position: absolute;
            left: 0px;
            top: 0px;
        }
        p{
            height: 30px;
            width: 260px;
            text-align: center;
        }
        #bar{
            width: 40px;
            height: 30px;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            left: -1px;
            text-align: center;
            cursor: pointer;
        }
        #ban{
            height: 30px;
            background-color: #7ac23c;
        }
    </style>
</head>
<body>
    <div id="demo">
        <div id="ban">
        </div>
        <p>拖动滑块验证</p>
        <div id="bar">
            >>
        </div>
    </div>
    <script type="text/javascript">
        window.onload = function (){
            var ban = document.getElementById("ban");
            var bar = document.getElementById('bar');
            isMove = false;//是否可以移动 默认值false 当滑块点击就可以移动了
            var oldX = 0;// 鼠标的初始位置
            var isTrue = false //是否移动成功
            bar.onmousedown = function (event){
                var event = event || window.event;
                oldX = event.clientX;
                isMove = true;// 按下之后可以滑动了
                return false;
            }
            bar.onmouseout = bar.onmouseup = function (){
                isMove = false;
                // 如果 失败就会回到初始位置
                if (!isTrue) {
                    goMoren();
                }
                return false;
            }
            function goMoren(){
                var timer = setInterval(function (){
                    var speed = (bar.offsetLeft - (-1))/5;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    bar.style.left = ban.style.width = bar.offsetLeft - speed + "px";
                    if (bar.offsetLeft == -1) {
                        clearInterval(timer);
                    }
                },30)
            }
            document.onmousemove = function (event){
                var event = event || window.event;
                // 鼠标在窗口中滑动 且isMove 为true 确认滑动
                if (isMove) {
                    var dirX =  event.clientX - oldX;
                    console.log(dirX);
                    bar.style.left = bar.offsetLeft + dirX + 'px';
                    //越界处理
                    if (bar.offsetLeft <= -1) {
                        bar.style.left = '-1px';
                    }
                    if (bar.offsetLeft + bar.offsetWidth >= 261) {
                        bar.style.left = 261 - bar.offsetWidth + 'px';
                        bar.innerHTML = "√";
                        bar.style.color = "#7ac23c";
                        isTrue = true;
                    }
                    ban.style.width = bar.offsetLeft + "px";
                    oldX = event.clientX;
                }
                return false;
            }
        }
    </script>
</body>
</html> -->
<!-- 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        #block {
            width: 200px;
            height: 200px;
            background-color: yellow;
            position: absolute;
        }
    </style>
</head>
<body>
<div id="block"></div>
<script>
    /**
     * 拖动元素
     * @param elementId 元素id
     */
    function drag(elementId) {
        var element = document.getElementById(elementId);
        var position = {
            offsetX: 0, //点击处偏移元素的X
            offsetY: 0, //偏移Y值
            state: 0 //是否正处于拖拽状态，1表示正在拖拽，0表示释放
        };
        //获得兼容的event对象
        function getEvent(event) {
            return event || window.event;
        }
        //元素被鼠标拖住
        element.addEventListener('mousedown', function (event) {
            //获得偏移的位置以及更改状态
            var e = getEvent(event);
            position.offsetX = e.offsetX;
            position.offsetY = e.offsetY;
            position.state = 1;
        }, false);
        //元素移动过程中
        document.addEventListener('mousemove', function (event) {
            var e = getEvent(event);
            if (position.state) {
                position.endX = e.clientX;
                position.endY = e.clientY;
                //设置绝对位置在文档中，鼠标当前位置-开始拖拽时的偏移位置
                element.style.position = 'absolute';
                element.style.top = position.endY - position.offsetY + 'px';
                element.style.left = position.endX - position.offsetX + 'px';
            }
        }, false);
        //释放拖拽状态
        element.addEventListener('mouseup', function (event) {
            position.state = 0;
        }, false);
    }
    drag('block');
</script>
</body>
</html> -->

<!-- <html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=gbk">
        <title>拉框</title>
    </head>
    <body>
        <div id='lay1'
            onmousedown='down(event)'
            onmouseup='up(event)'
            onmousemove='move(event)'
            style='top:30px;left:30px;width:400px;height:400px;visibility:visible;border:solid 1px blue;'
        >            
            <div id='rect'
                style='position:absolute;background-color: #FF99FF'            
            >            
        </div>    
    </div>
        <script language="javascript">
            
            // 是否需要(允许)处理鼠标的移动事件,默认识不处理
            var select = false;
            
            var rect = document.getElementById("rect");
            // 设置默认值,目的是隐藏图层
            rect.style.width = 0;
            rect.style.height = 0;
            rect.style.visibility = 'hidden';
            //让你要画的图层位于最上层
            rect.style.zIndex = 1000;
            
            // 记录鼠标按下时的坐标
            var downX = 0;
            var downY = 0;
            // 记录鼠标抬起时候的坐标
            var mouseX2=downX;
            var mouseY2=downY;
            
            //处理鼠标按下事件
            function down(event){
                // 鼠标按下时才允许处理鼠标的移动事件
                select = true;
                //让你要画框的那个图层显示出来
                //rect.style.visibility = 'visible';
                // 取得鼠标按下时的坐标位置
                downX = event.clientX;
                downY = event.clientY; 
                
                //设置你要画的矩形框的起点位置
                rect.style.left = downX;
                rect.style.top = downY;
            }
            
            //鼠标抬起事件
            function up(event){
                //鼠标抬起,就不允许在处理鼠标移动事件
                select = false;
                //隐藏图层
                rect.style.visibility = 'hidden';
            }
            
            //鼠标移动事件,最主要的事件
            function move(event){
                
                // 取得鼠标移动时的坐标位置
                mouseX2 = event.clientX;
                mouseY2 = event.clientY;
                
                // 设置拉框的大小    
                rect.style.width = Math.abs( mouseX2 - downX );
                rect.style.height = Math.abs( mouseY2 - downY );    
                
                /*
                
                这个部分,根据你鼠标按下的位置,和你拉框时鼠标松开的位置关系,可以把区域分为四个部分,根据四个部分的不同,
                我们可以分别来画框,否则的话,就只能向一个方向画框,也就是点的右下方画框.
                
                */
                if(select){
                     
                   rect.style.visibility = 'visible';
    
                    // A part
                    if( mouseX2 < downX && mouseY2 < downY ){
                        rect.style.left = mouseX2;
                        rect.style.top = mouseY2 ;    
                    }
                    
                    // B part
                    if( mouseX2 > downX && mouseY2 < downY){
                        rect.style.left = downX ;
                        rect.style.top = mouseY2;    
                    }
                    
                    // C part
                    if( mouseX2 < downX && mouseY2 > downY){
                        rect.style.left = mouseX2;
                        rect.style.top = downY ;    
                    }
                    
                    // D part
                    if( mouseX2 > downX && mouseY2 > downY ){
                        rect.style.left = downX ;
                        rect.style.top = downY;
                    }            
            
                }
                /*
                    这两句代码是最重要的时候,没有这两句代码,你的拉框,就只能拉框,在鼠标松开的时候,
                    拉框停止,但是不能相应鼠标的mouseup事件.那么你想做的处理就不能进行.
                    这两句的作用是使当前的鼠标事件不在冒泡,也就是说,不向其父窗口传递,所以才可以相应鼠标抬起事件,
                    这个部分我也理解的不是特别的清楚,如果你需要的话,你可以查资料.但是这两句话确实最核心的部分,
                    为了这两句话,为了实现鼠标拉框,我搞了几天的时间.
                */
          window.event.cancelBubble = true;
          window.event.returnValue = false;    
                
                function getDivOffsetLeft(){
                    var lay1 = document.getElementById("lay1");
                    //var rect = document.getElementById("rect");
                    return lay1.offsetLeft;
                }
                function getDivOffsetTop(){
                    var lay1 = document.getElementById("lay1");
                    //var rect = document.getElementById("rect");
                    return lay1.offsetTop;
                }
            
            }
            
            
            
        </script>

    </body>

</html> -->


<!-- <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" 
"http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>鼠标框选效果</title>
<style>
  *{
  padding:0;
  margin:0;
  }
  #bottom{
  position:absolute;
  bottom:0px;
  width:100%;
  height:40px;
  border:1px solid #000;
  background:#000;
  color:#fff;
  }
  .tempDiv{
  border:1px dashed blue;
  background:#5a72f8;
  position:absolute;
  width:0;
  height:0;
  filter:alpha(opacity:10);
  opacity:0.1
  }
</style>
<script type = "text/javascript">
  window.onload = function(){
  var stateBar = document.getElementById("bottom");
  document.onmousedown = function(e){
   var posx = e.clientX;
   var posy = e.clientY;
   var div = document.createElement("div");
   div.className = "tempDiv";
   div.style.left = e.clientX+"px";
   div.style.top = e.clientY+"px";
   document.body.appendChild(div);
   document.onmousemove = function(ev){
    div.style.left = Math.min(ev.clientX, posx) + "px";
    div.style.top = Math.min(ev.clientY, posy) + "px";
    div.style.width = Math.abs(posx - ev.clientX)+"px";
    div.style.height = Math.abs(posy - ev.clientY)+"px";
    stateBar.innerHTML = "MouseX: " + ev.clientX + "<br/>MouseY: " + ev.clientY;
    document.onmouseup = function(){
     div.parentNode.removeChild(div);
     document.onmousemove = null;
     document.onmouseup = null;
    }
   }
  }
}
</script>
</head>
<body>
   <div id = "bottom"></div>
</body>
</html> -->

<!-- <!DOCTYPE html>
<html>
<head>
    <title>Example</title>
    <style>
        #notice {
          display: inline-block;
          margin-bottom: 12px;
          border-radius: 5px;
          width: 600px;
          padding: 5px;
          border: 2px #7FDF55 solid;
        }

        #rules {
          width: 600px;
          height: 130px;
          padding: 5px;
          border: #2A9F00 solid 2px;
          border-radius: 5px;
        }
    </style>
</head>

<body>
    <form name="registration">
      <p>
        <textarea id="rules">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at laoreet magna. 
    Aliquam erat volutpat. Praesent molestie, dolor ut eleifend aliquam, mi ligula ultrices sapien, quis cursus 
    neque dui nec risus. Duis tincidunt lobortis purus eu aliquet. Quisque in dignissim magna. Aenean ac lorem at 
    velit ultrices consequat. Nulla luctus nisi ut libero cursus ultrices. Pellentesque nec dignissim enim. Phasellus 
    ut quam lacus, sed ultricies diam. Vestibulum convallis rutrum dolor, sit amet egestas velit scelerisque id. 
    Proin non dignissim nisl. Sed mi odio, ullamcorper eget mattis id, malesuada vitae libero. Integer dolor lorem, 
    mattis sed dapibus a, faucibus id metus. Duis iaculis dictum pulvinar. In nisi nibh, dapibus ac blandit at, porta 
    at arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent 
    dictum ipsum aliquet erat eleifend sit amet sollicitudin felis tempus. Aliquam congue cursus venenatis. Maecenas 
    luctus pellentesque placerat. Mauris nisl odio, condimentum sed fringilla a, consectetur id ligula. Praesent sem 
    sem, aliquet non faucibus vitae, iaculis nec elit. Nullam volutpat, lectus et blandit bibendum, nulla lorem congue 
    turpis, ac pretium tortor sem ut nibh. Donec vel mi in ligula hendrerit sagittis. Donec faucibus viverra fermentum. 
    Fusce in arcu arcu. Nullam at dignissim massa. Cras nibh est, pretium sit amet faucibus eget, sollicitudin in 
    ligula. Vivamus vitae urna mauris, eget euismod nunc. Aenean semper gravida enim non feugiat. In hac habitasse 
    platea dictumst. Cras eleifend nisl volutpat ante condimentum convallis. Donec varius dolor malesuada erat 
    consequat congue. Donec eu lacus ut sapien venenatis tincidunt. Quisque sit amet tellus et enim bibendum varius et 
    a orci. Donec aliquet volutpat scelerisque. Proin et tortor dolor. Ut aliquet, dolor a mattis sodales, odio diam 
    pulvinar sem, egestas pretium magna eros vitae felis. Nam vitae magna lectus, et ornare elit. Morbi feugiat, ipsum 
    ac mattis congue, quam neque mollis tortor, nec mollis nisl dolor a tortor. Maecenas varius est sit amet elit 
    interdum quis placerat metus posuere. Duis malesuada justo a diam vestibulum vel aliquam nisi ornare. Integer 
    laoreet nisi a odio ornare non congue turpis eleifend. Cum sociis natoque penatibus et magnis dis parturient montes, 
    nascetur ridiculus mus. Cras vulputate libero sed arcu iaculis nec lobortis orci fermentum.
        </textarea>
      </p>
      <p>
        <input type="checkbox" id="agree" name="accept" />
        <label for="agree">I agree</label>
        <input type="submit" id="nextstep" value="Next" />
      </p>
    </form>
</body>
<script>
    function checkReading () {
      if (checkReading.read) {
        return; 
      }
      checkReading.read = this.scrollHeight - this.scrollTop === this.clientHeight;
      document.registration.accept.disabled = document.getElementById("nextstep").disabled = !checkReading.read;
      checkReading.noticeBox.innerHTML = checkReading.read ? "Thank you." : "Please, scroll and read the following text.";
    }

    window.onload = function () {
      var oToBeRead = document.getElementById("rules");
      checkReading.noticeBox = document.createElement("span");
      document.registration.accept.checked = false;
      checkReading.noticeBox.id = "notice";
      oToBeRead.parentNode.insertBefore(checkReading.noticeBox, oToBeRead);
      oToBeRead.parentNode.insertBefore(document.createElement("br"), oToBeRead);
      oToBeRead.onscroll = checkReading;
      checkReading.call(oToBeRead);
    }
</script>
</html> -->

<!-- <!DOCTYPE html>
<html>
<head>
    <meta charset=" utf-8">
    <meta name="author" />
    <style type="text/css">
    * {
        margin: 0px;
        padding: 0px;
    }
    
    body {
        padding: 50px;
    }
    
    #box {
        width: 350px;
        height: 250px;
        background: red;
        overflow: hidden;
        position: relative;
    }
    
    #drag {
        width: 50px;
        height: 50px;
        background: green;
        position: absolute;
    }
    </style>
</head>
<body>
    <div id="box">
        <div id="drag"></div>
    </div>
</body>
<script type="text/javascript">
window.onload = function() {
    var obox = document.getElementById("box");
    var odrag = document.getElementById("drag");
    var isDrag = false;
    var x, y;

    odrag.onmousedown = down;
    document.onmousemove = move;
    document.onmouseup = up;

    function down(ev) {
        var ev = window.event || ev;
        x = ev.clientX - this.offsetLeft;
        y = ev.clientY - this.offsetTop;
        this.style.cursor = "move";
        isDrag = true;
    }

    function move(ev) {
        if (isDrag) {
            var ev = window.event || ev;
            odrag.style.left = (ev.clientX - x) + "px";
            odrag.style.top = (ev.clientY - x) + "px";
            if (parseInt(odrag.style.left) < 0) {
                odrag.style.left = 0;
            }
            if (parseInt(odrag.style.top) < 0) {
                odrag.style.top = 0;
            }
            if (parseInt(odrag.style.left) > obox.clientWidth - odrag.clientWidth) {
                odrag.style.left = (obox.clientWidth - odrag.clientWidth) + "px";
            }
            if (parseInt(odrag.style.top) > obox.clientHeight - odrag.clientHeight) {
                odrag.style.top = (obox.clientHeight - odrag.clientHeight) + "px";
            }
        }
    }

    function up() {
        isDrag = false;
        odrag.style.cursor = "pointer";
    }
}
</script>

</html> -->

<!-- <!DOCTYPE html>
<html>
    <head>
        <title></title>
    </head>
    <style>
        *{margin:0;padding:0;}
        html,body{overflow:hidden;}
        #box{
            width:700px;
            height:400px;
            margin:100px auto;
            position:relative;
        }
        #box span{
            position:absolute;
            transform:perspective(800px) translate(0,0) rotateX(0deg) rotateY(0deg) scale(1);
        }
    </style>
    <script>
        function rnd(m,n){
            return parseInt(m+Math.random()*(n-m));
        }
        document.addEventListener('DOMContentLoaded',function(){
            var oBox=document.getElementById('box');
            var C=7;
            var R=4;
            for(var r=0;r<R;r++){
                for(var c=0;c<C;c++){
                    var oSpan=document.createElement('span');
                    var w=oBox.offsetWidth/C;
                    var h=oBox.offsetHeight/R;
                    oSpan.style.width=w+'px';
                    oSpan.style.height=h+'px';
                    oSpan.style.left = w*c+'px';
                                    oSpan.style.top = h*r+'px';
                    oBox.appendChild(oSpan);
                    oSpan.style.backgroundPosition=-oSpan.offsetLeft+'px  -'+oSpan.offsetTop+'px';
                }
            }
            var aSpan=oBox.children;
            var iNow=0;
            var bReady=true;
            iNow++;
            oBox.onclick=function(){
                if(bReady==false)return;
                bReady=false;
                iNow++;
                for(var i=0;i<aSpan.length;i++){
                    var x=aSpan[i].offsetLeft+aSpan[i].offsetWidth/2-oBox.offsetWidth/2;
                    var y=aSpan[i].offsetTop+aSpan[i].offsetHeight/2-oBox.offsetHeight/2;
                    aSpan[i].style.transition='1s all ease';
                    aSpan[i].style.transform='perspective(800px) translate('+x+'px,'+y+'px) rotateX('+rnd(-180,180)+'deg) rotateY('+rnd(-180,180)+'deg) scale(1.4)';
                    aSpan[i].style.opacity=0;
                }
            };
            aSpan[0].addEventListener('transitionend',function(){
                bReady=true;
                for(var i=0;i<aSpan.length;i++){
                    aSpan[i].style.transition='none';
                    aSpan[i].style.transform='perspective(800px)  translate(0,0) rotateX(0deg) rotateY(0deg) scale(1)';
                    aSpan[i].style.opacity = 1;
                    //换图
                    aSpan[i].style.backgroundImage = 'url("img/'+iNow%3+'.jpg")';
                        oBox.style.backgroundImage = 'url("img/'+((iNow+1)%3)+'.jpg")';           
                }
            },false)
        },false);        
    </script>
    <body>
        <div id="box"></div>
    </body>
</html> -->


<!-- <html>
    <head>
        <title>nav测试</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style type="text/css">
            *{margin:0; padding:0}
            body{width:960px; height:2000px; margin:0 auto; border: 1px dotted #432432;}
            ul,li{list-style-type: none;}
            a{text-decoration: none;}
            .nav{border:1px solid #000; 
                 height:30px; 
                 z-index:9999; 
                position:fixed ; 
                top:0px;
                _position:absolute;
                _top:expression(documentElement.scrollTop + "px");
            }
            .nav ul li{
                float:left;
                font-size: 16px;
                line-height: 30px;
                padding:0px 63px;
            }
            .nav ul li:hover{
                background: #23ded3;
            }
            #main{
                height:1000px; 
                border:1px solid #f00;
                margin-top:30px;
            }
            #div1{
                height:400px;
                border: 1px solid #ccc;
            }
             #div2{
                height:400px;
                border: 1px solid #ccc;
            }
             #div3{
                height:400px;
                border: 1px solid #ccc;
            }
        </style>
    </head>
    <body>
        <div id="headr">
            <div class="nav">
                <ul>
                    <li><a>首页</a></li>
                    <li><a onclick="onc()">你好</a></li>
                    <li><a>很好</a></li>
                    <li><a>他好</a></li>
                    <li><a>真的</a></li>
                    <li><a>哦哦</a></li>
                </ul>
            </div>
        </div>
        <div id ="main" style="width:960px; height: auto;">
            <div id="div1">
                <p>我是ｄｉｖ１的内容</p>
            </div>
            <div id="div2">
                <p>我是ｄｉｖ2的内容</p>
            </div>
            <div id="div3">
                <p>我是ｄｉｖ3的内容</p>
            </div>
        </div>
        <div id ="footr"></div>
    </body>
    <script type="text/javascript">
        var dHeight = document.documentElement.clientHeight;
        var div1 = document.getElementById("div1");
        var div2 = document.getElementById("div2");
        var div3 = document.getElementById("div3");
        div1.style.height = dHeight - 30 + "px";        //通过一个js动态的来确定每个div的高度,还可以通过循环来实现，这里就不加了，各位自己可尝试
        div2.style.height = dHeight -30 + "px";
        div3.style.height = dHeight -30 + "px";
            var li = document.getElementsByTagName("li");
            li[0].onclick = function(){
                div1.scrollIntoView(false);       //这里不能给true不然会将会与导航条重叠
            }
            li[1].onclick = function(){
                div2.scrollIntoView(false);
            }
            li[2].onclick = function(){
                div3.scrollIntoView(false);
            }
    </script>
</html>
 -->

<!--  <html>
    <head>
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <a onClick="onc()">dasdasd</a>
        <div style="width:400px; height:400px; border: 1px solid #f00;"></div>
            <div id="nn" style="border:1px solid #666">
                <div style="height:900px;">sadasdasd</div>  
            </div>
    </body>
    <script type="text/javascript">
        function onc () {
        var dd = document.getElementById("nn").scrollIntoView({block:"end", behavior: "smooth"});    
    }
    </script>
</html> -->


<!-- <!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <style type="text/css">
            * {
              font-family: 'Segoe UI';
            }
            li {
              list-style: none;
              padding: 5px;
              background: #f5f5f5;
              border-radius: 5px;
              margin: 0 0 5px;
            }
            ul {
              border: 1px solid #ccc;
              border-radius: 5px;
              padding: 10px;
              width: 30%;
              margin: 0 0.5%;
              display: inline-block;
              vertical-align: top;
            }
            ul.over {
              padding-bottom: 55px;
            }
            ul.over li {
              background: #fff;
            }

            #board div h3 {display: inline-block; width: 30%; margin: 1%; text-align: center;}                
        </style>
    </head>
    <body>
        <h1>Planning board using HTML 5 Drag & Drop</h1>
        <div id="board">
            <div>
              <h3>ToDo</h3><h3>In Progress</h3><h3>Done</h3>
            </div>
            <ul id="todo">
                <li id="item1" draggable="true">Task 1</li>
                <li id="item2" draggable="true">Task 2</li>
            </ul>
            <ul id="inprogress">
            </ul>
            <ul id="done">
            </ul>
        </div>
    </body>
    <script src="../lib/requirejs/require.js" type="text/javascript"></script>
    <script src="../js/common/requireconfig.js" type="text/javascript"></script>
    <script type="text/javascript">
        require(["common", "othertestmodule", "filemodule", "constant", "schememodule","ajax", "ajaxtestmodule", "jquery", "underscore"], function(common, othertestmodule, filemodule, constant, schememodule, ajax, ajaxtestmodule){  
            $(document).ready(function(){
              $('li').bind('dragstart', function(event) {
                event.originalEvent.dataTransfer.setData("text/plain",  event.target.getAttribute('id'));
              });

              $('ul').bind('dragover', function(event) {
                event.preventDefault();
              });

              $('ul').bind('dragenter', function(event) {
                $(this).addClass("over");
              });

              $('ul').bind('dragleave drop', function(event) {
                $(this).removeClass("over");
              });

              $('li').bind('drop', function(event) {
                return false;
              });

              $('ul').bind('drop', function(event) {
                var listitem = event.originalEvent.dataTransfer.getData("text/plain");
                event.target.appendChild(document.getElementById(listitem));
                event.preventDefault();
              });
            });
             
        })
    </script>    
</html> -->




<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <style type="text/css">
              #draggable {
                width: 200px;
                height: 20px;
                text-align: center;
                background: white;
              }

              .dropzone {
                width: 200px;
                height: 20px;
                background: blueviolet;
                margin-bottom: 10px;
                padding: 10px;
              }     
        </style>
    </head>
    <body>
        <div class="dropzone"> 
          <div id="draggable" draggable="true" ondragstart="event.dataTransfer.setData('text/plain',null)"> 
            This div is draggable 
          </div> 
        </div> 
        <div class="dropzone"></div>
        <div class="dropzone"></div> 
        <div class="dropzone"></div>    
    </body>
    <script src="../lib/requirejs/require.js" type="text/javascript"></script>
    <script src="../js/common/requireconfig.js" type="text/javascript"></script>
    <script type="text/javascript">
        require(["common", "othertestmodule", "filemodule", "constant", "schememodule","ajax", "ajaxtestmodule", "jquery", "underscore"], function(common, othertestmodule, filemodule, constant, schememodule, ajax, ajaxtestmodule){  
             var dragged;

              document.addEventListener("drag", function( event ) {

              }, false);

              document.addEventListener("dragstart", function( event ) {
                  dragged = event.target;
                  event.target.style.opacity = .5;
              }, false);

              document.addEventListener("dragend", function( event ) {
                  event.target.style.opacity = "";
              }, false);

              document.addEventListener("dragover", function( event ) {
                  event.preventDefault();
              }, false);

              document.addEventListener("dragenter", function( event ) {
                  if ( event.target.className == "dropzone" ) {
                      event.target.style.background = "purple";
                  }

              }, false);

              document.addEventListener("dragleave", function( event ) {
                  if ( event.target.className == "dropzone" ) {
                      event.target.style.background = "";
                  }

              }, false);

              document.addEventListener("drop", function( event ) {
                  event.preventDefault();
                  if ( event.target.className == "dropzone" ) {
                      event.target.style.background = "";
                      dragged.parentNode.removeChild( dragged );
                      event.target.appendChild( dragged );
                      console.log(dragged);
                  }
                
              }, false);             
        })
    </script>    
</html>














  














  




  












