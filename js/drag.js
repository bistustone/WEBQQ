//document.getElementByClassName在IE10之前的浏览器是不支持的
function getByClass(clsName,parent){
    var oParent=parent?document.getElementById(parent):document,
        eles=[],
        elements=oParent.getElementsByTagName('*');

    for(var i=0,l=elements.length;i<l;i++){
        if(elements[i].className==clsName){
            eles.push(elements[i]);
        }
    }
    return eles;
}

window.onload=drag;

function drag() {
    var oTitle=getByClass('login_logo_webqq','loginPanel')[0];
    //拖曳
    oTitle.onmousedown=fnDown;
    //关闭
    var oClose=document.getElementById('ui_boxyClose');
    oClose.onclick=function () {
        document.getElementById('loginPanel').style.display='none';
    };
    // 切换状态
    var loginState = document.getElementById('loginState'),
        stateList = document.getElementById('loginStatePanel'),
        lis = stateList.getElementsByTagName('li'),
        stateTxt = document.getElementById('login2qq_state_txt'),
        loginStateShow=document.getElementById('loginStateShow');

    loginState.onclick = function (e) {
        e = window.event || e;
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }//阻止发生冒泡
        stateList.style.display = "block";
    }

    // 鼠标滑过、离开和点击状态列表时
    for(var i=0;i<lis.length;i++){
        lis[i].onmouseover = function () {
            this.style.backgroundColor = '#567';
        }
        lis[i].onmouseout = function () {
            this.style.backgroundColor = '#FFF';
        }
        lis[i].onclick = function(e) {
            e = window.event || e;
            if(e.stopPropagation){
                e.stopPropagation();
            }else{
                e.cancelBubble = true;
            }//阻止发生冒泡
            var id = this.id;
            stateList.style.display = 'none';//点击后，stateList面板消失
            stateTxt.innerHTML = getByClass('stateSelect_text',id)[0].innerHTML;//stateTxt的内容被复制为选中元素的内容
            loginStateShow.className = '';//清空类名便于下一步的重写
            loginStateShow.className = 'login-state-show ' + id;//一定要有login-state-show
        }

    }
    //鼠标在任何空白地方点击，状态选择面板隐藏
    document.onclick = function () {
        stateList.style.display = 'none';
    }
}

function fnDown(event) {
    event = event||window.event;
    var oDrag=document.getElementById('loginPanel'),
        // 光标按下时光标和面板之间的距离
        disX=event.clientX-oDrag.offsetLeft,
        disY=event.clientY-oDrag.offsetTop;
    //移动
    document.onmousemove=function (event) {
        event = event || window.event;
        fnMove(event,disX,disY);
    };
    //释放
    document.onmouseup=function () {
        document.onmousemove=null;
        document.onmouseup=null;
    }
}

function fnMove(e,posX,posY) {
    var oDrag=document.getElementById('loginPanel'),
        l=e.clientX-posX,//面板到网页左边的距离
        t=e.clientY-posY,//面板到网页顶端的距离
        winW=document.documentElement.clientWidth || document.body.clientWidth,//网页宽度
        winH=document.documentElement.clientHeight || document.body.clientHeight,//网页高度
        maxW=winW-oDrag.offsetWidth-10,//最大横向移动距离，10是关闭按钮的宽度
        maxH=winH-oDrag.offsetHeight;//最大纵向移动距离
    if(l<0){
        l=0;
    }else if(l>maxW){
        l=maxW;
    }
    if(t<0){
        t=10;
    }else if(t>maxH){
        t=maxH;
    }
    oDrag.style.left=l+'px';
    oDrag.style.top=t+'px';
}