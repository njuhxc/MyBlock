var top_banner_big = new Object();
top_banner_big.getByClass = function(oParent, sClass){
    var aEle=oParent.getElementsByTagName('*');
    var aResult=[];
    var i=0;
    for(i=0;i<aEle.length;i++)
    {
        if(aEle[i].className==sClass)
        {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
};

top_banner_big.src1 = (typeof(top_banner_v.src1)=="undefined")?0:top_banner_v.src1;
top_banner_big.src2 = (typeof(top_banner_v.src2)=="undefined")?0:top_banner_v.src2;
top_banner_big.url = (typeof(top_banner_v.url)=="undefined")?0:top_banner_v.url;
top_banner_big.time = (typeof(top_banner_v.time)=="undefined")?8000:top_banner_v.time;
top_banner_big.cookieTime = 2;

top_banner_big.createElement = function(){
    this.headW = top_banner_big.getByClass(document,"head_ad")[0];
    this.headW.style.position = "relative";
    this.getByClass(document,"hd")[0].style.overflow="visible";
    this.top_banner_big_con = '<div class="head-ad-con" style="position:absolute;top:-26px;left:0px;width:450px;height:150px;" id="js_HeadAdCon"><a style="position:absolute;width:100%;z-index:10;height:100%;top:0;left:0;background:#0CC;cursor:pointer; filter:alpha(opacity=0); opacity:0;" href="'+this.url+'" target="_blank"></a><span class="head-ad-btn" id="js_headAdBtn" style="width:20px;height:20px;background: url(http://img1.126.net/channel7/js/couplet/x.png) 50% 50% no-repeat;font-size: 14px;position: absolute;right: 0px;top:0px;text-align: center;z-index:11;cursor: pointer;"></span><object id="FlashID654648746465" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0" width="450" height="150"><param name="movie" value="'+this.src2+'" /><param name="quality" value="high" /><param name="wmode" value="transparent"/><embed name="FlashID654648746465" src="'+this.src2+'" width="450" height="150" quality="high" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" wmode="transparent"></embed></object><img src="http://img2.126.net/ntesrich/2015/0902/duilian_left.png" style="position: absolute; bottom: 0px; left: 0px;background:none;"></div>';
    this.headW.innerHTML = '<div style="width:450px;height:40px;position:relative;"><a href="'+this.url+'" target="_blank"><img src="'+this.src1+'" width="450" height="40"></a><img src="http://img2.126.net/ntesrich/2015/0902/duilian_left.png" style="position: absolute; background:none;bottom: 0px; left: 0px;width:25px;height:15px;"></div>'+this.top_banner_big_con;
    this.headC = document.getElementById("js_HeadAdCon");
    this.headBtn = document.getElementById("js_headAdBtn");
    this.headC.style.display = "none";
}
top_banner_big.eventListener = function(){
    var timer,timer0,timeCount = 1000,
    timeCount0 = 2000;
    var addEnterLeaveEvent = function(ele,type,func){
        if(window.document.all) {
            ele.attachEvent('on'+type,func);
        }else{
            if(type==='mouseenter'){
                ele.addEventListener('mouseover',withoutChildFunction(func),false);
            }else if(type==='mouseleave'){
                ele.addEventListener('mouseout',withoutChildFunction(func),false);
            }else{
                ele.addEventListener(type,func,false);   
            }
        }
    }
    var withoutChildFunction=function(func){
        return function(e){
            var parent=e.relatedTarget;
            while(parent!=this && parent){
                try{
                    parent=parent.parentNode;
                }
                catch(e){
                    break;
                }
            }
            if(parent!=this){
                func(e)
            }
        }
    };

    addEnterLeaveEvent(top_banner_big.headW,"mouseenter",function(){
        clearTimeout(timer0);
        clearTimeout(timer);
        timer = setTimeout(function(){
            top_banner_big.headC.style.display = "block";
        },timeCount);
    });

    addEnterLeaveEvent(top_banner_big.headW,"mouseleave",function(){
        clearTimeout(timer0);
        clearTimeout(timer);
        timer0 = setTimeout(function(){
           top_banner_big.headC.style.display = "none";
        },timeCount0);
    });
    this.headBtn.onclick = function(){
        top_banner_big.headC.style.display = "none";
    }
}
top_banner_big.createElement();
top_banner_big.eventListener();
top_banner_big.createAD = function(){
     this.cookie = adBox.cookieCount("top_banner_big");
    if(this.cookie<=this.cookieTime){
        top_banner_big.headC.style.display = "block";
        var top_banner_frist_close = setTimeout(function(){
            top_banner_big.headC.style.display = "none";
            clearTimeout(top_banner_frist_close);
        }, 8000);
    }
};