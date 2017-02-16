/**
 * Created by winso on 2016/6/6.
 */
//单屏采用缩放做适配
var main=document.querySelector("#main");
var winW=document.documentElement.clientWidth;
var winH=document.documentElement.clientHeight;
var desW=640;
var desH=1136;

function auto(winW,winH,desW,desH) {
    var ratio=null;
    if(winW/winH<=desW/desH){
        main.style.transform="scale("+winH/desH+")";
        main.style.webkitTransform="scale("+winH/desH+")";
    }else{
        main.style.transform="scale("+winW/desW+")";
        main.style.webkitTransform="scale("+winW/desW+")";
    }
}
auto(winW,winH,desW,desH);


var lis=document.querySelectorAll("#main>ul>li");
[].forEach.call(lis,function (curLi,index) {
    curLi.index=index;
    curLi.addEventListener("touchstart",start,false);
    curLi.addEventListener("touchmove",move,false);
    curLi.addEventListener("touchend",end,false);
});

function start(e) {
    this.startX=e.changedTouches[0].pageX;
    this.startY=e.changedTouches[0].pageY;
}
function move(e) {
    e.preventDefault();
    var moveX = e.changedTouches[0].pageX;
    var moveY = e.changedTouches[0].pageY;
    var direction = swipeDirec(this.startX, this.startY, moveX, moveY);
    var index = this.index;
    var movePos=moveY-this.startY;
//    判断是否滑动/判断滑动方向
    if (/^(Down|Up)$/.test(direction)) {
        //判断索引
        this.flag = true;
        [].forEach.call(lis, function (otherLi, otherIndex) {
            if (otherIndex !== index) {
                otherLi.style.display = "none";
            }
            otherLi.className = "";
        });
        if (direction == "Down") {
            this.prevIndex = index === 0 ? lis.length - 1 : index-1;
            var pos = -desH/2 + movePos;
        }else if(direction=="Up"){
            this.prevIndex = index === lis.length - 1 ? 0 : index+1;
            var pos = desH/2 + movePos;
        }
        lis[this.prevIndex].style.display = "block";
        lis[this.prevIndex].className = "zIndex";
        lis[this.prevIndex].style.webkitTransform = "translate(0," + pos + "px)";
        this.style.transform = "translate(0," + movePos + "px)";
    }
}
    function end(e) {
        if(this.flag){
            lis[this.prevIndex].style.webkitTransform="translate(0,0)";
            lis[this.prevIndex].style.webkitTransition="1s";
            //监听上一张/下一张是否结束了划动事件,保证当前张也要回到0，0
            var that=this;
            lis[this.prevIndex].addEventListener("webkitTransitionEnd",function (e) {
                console.log(1)
                this.style.webkitTransition="";
                that.style.webkitTransform="translate(0,0)";
                that.index
                this.classList.add("a");
            },false)
            this.flag=false;
        }
    }

function isSwipe(startX,startY,moveX,moveY) {
    var changeX=moveX-startX;
    var changeY=moveY-startY;
    return Math.abs(changeX)>30 || Math.abs(changeY)>30;
}

function swipeDirec(startX,startY,moveX,moveY) {
    var changeX=moveX-startX;
    var changeY=moveY-startY;
    return Math.abs(changeX) > Math.abs(changeY) ? ( changeX> 0 ? "Right" : "Left") : ( changeY> 0 ? "Down" : "Up");
}













