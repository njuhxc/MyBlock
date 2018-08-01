var dwBox = new Object();
HTMLElement.prototype.css = function(){
    var option;
    if (arguments.length > 0){
        option = arguments[0];
        if (2 === arguments.length) {
            option = {}, option[arguments[0]] = arguments[1];
        }

        if ('object' === typeof option) {
            for (var key in option) {
                if (option.hasOwnProperty(key)) {
                    this.style[key] = option[key];
                }
            }
        }
    }
    return this;
};
dwBox.$ = function(id){
	return document.getElementById(id);
};
dwBox.getByClass = function(oParent, sClass){
 	var aEle=oParent.getElementsByTagName('*');
   	var result=[];
   	var re=new RegExp('\\b'+sClass+'\\b','i');
   	for(var i=0;i<aEle.length;i++){
	  	if(re.test(aEle[i].className)){
		   	result.push(aEle[i]);
		}
	}
    return result;
};
dwBox.addEvent = function(el, type, fn){
	if(el.addEventListener){
		el.addEventListener(type, fn, false);
	}else{
		el.attachEvent('on' + type, fn);
	}
}

dwBox.isGo = 0;
dwBox.width = (typeof(adInfoTempDw.width)=="undefined")?1920:adInfoTempDw.width;
dwBox.height = (typeof(adInfoTempDw.height)=="undefined")?600:adInfoTempDw.height;
dwBox.src1 = (typeof(adInfoTempDw.src1)=="undefined")?0:adInfoTempDw.src1;
dwBox.src2 = (typeof(adInfoTempDw.src2)=="undefined")?0:adInfoTempDw.src2;
dwBox.url = (typeof(adInfoTempDw.url)=="undefined")?"http://www.163.com":adInfoTempDw.url;
dwBox.adBoxJs = (typeof(adInfoTempDw.adBoxJs)=="undefined")?"http://img2.126.net/ntesrich/auto/adbox/adbox-v1.1.2-120705.js":adInfoTempDw.adBoxJs;
dwBox.closeBtnImg = (typeof(adInfoTempDw.closeBtn1)=="undefined")?"http://img2.126.net/ntesrich/2015/0901/xt_close_ad.png":adInfoTempDw.closeBtnImg;
dwBox.topNum = (typeof(adInfoTempDw.topNum)=="undefined")?50:adInfoTempDw.topNum;
dwBox.winWidth = window.innerWidth || document.documentElement.clientWidth;
var main_width;
if(dwBox.winWidth>=1420){
	main_width = 1200;
	dwBox.src = dwBox.src1;
}else{
	main_width = 960;
	dwBox.src = dwBox.src2;
}
dwBox.createElement = function(){
	document.body.insertAdjacentHTML("afterBegin","<div id='dwMainDiv'style='height:"+this.topNum+"px;'></div>");
	this.dwMainDiv = document.getElementById("dwMainDiv");
	this.topDiv = adBox.createDiv(main_width,this.topNum);
	this.topDiv.innerHTML =  '<div id="dwTopDiv" style="height:'+this.topNum+'px;overflow:hidden;"><div style="height:'+this.topNum+'px;width:100%;background:#F00;cursor:pointer;filter:alpha(opacity=0);opacity:0;" onclick="dwBox.getURL()"></div><div id="dwCloseBtn" style="position:absolute;bottom:0px;right:-5px;cursor:pointer;width:70px;height:17px;background:url('+dwBox.closeBtnImg+') no-repeat;"onclick="dwBox.action(\'close\')"></div></div>';
	this.leftDiv = adBox.createDiv((adBox.getClientInfo("width") - (main_width+10))*0.5,this.height);
	this.rightDiv = adBox.createDiv((adBox.getClientInfo("width") - (main_width+10))*0.5,this.height);
	this.leftDiv.innerHTML = '<div id="dwLeftDiv" style="width:100%; height:'+this.height+'px; background:#00F; cursor:pointer; filter:alpha(opacity=0); opacity:0"; onclick="dwBox.getURL()"></div>';
	this.rightDiv.innerHTML = '<div id="dwRightDiv" style="width:100%; height:'+this.height+'px; background:#00F; cursor:pointer; filter:alpha(opacity=0); opacity:0"; onclick="dwBox.getURL()"></div>';
	
	this.flashWrap = document.createElement("div");
	this.topBar = dwBox.getByClass(document,"index2017_wrap")[0];
	document.body.insertBefore(this.flashWrap,this.topBar);
	this.flashBox = document.createElement("div");
	this.flashWrap.appendChild(	this.flashBox);
	var IndexFlashBg = adBox.createSwf("IndexFlashBg20140417",this.width,this.height,this.src);
	this.flashBox.innerHTML = IndexFlashBg;
}
dwBox.reSetPosition = function(){
	this.getByClass(document,"index2017_wrap")[0].css("position","relative");
	this.flashWrap.css({"width":"100%","height":this.height+"px","position":"absolute","top":"43px","overflow":"hidden"});
	this.flashBox.css({"width":this.width+"px","height":this.height+"px","position":"absolute","left":"50%","marginLeft":-this.width/2+"px","top":"0px","overflow":"hidden"});
	this.$("dwTopDiv").css({"width":main_width+"px"});
	this.topDiv.css({"position":"absolute","width":main_width+"px","left":"50%","marginLeft":-main_width/2+"px","top":"43px","z-index":10});
	this.leftDiv.css({"position":"absolute","overflow":"hidden","width":(adBox.getClientInfo("width")-(main_width+10))*0.5+"px","left":"0px","top":"43px","z-index":10});
	this.rightDiv.css({"position":"absolute","overflow":"hidden","width":(adBox.getClientInfo("width")-(main_width+10))*0.5+'px',"right":"0px","top":"43px","z-index":10});
};

dwBox.flag1 = false;
dwBox.flag2 = false;
dwBox.addEvent(window,"resize",function(){
	dwBox.reSetPosition();
    var winWidth = window.innerWidth || document.documentElement.clientWidth;
    if(winWidth < 1420){
    	dwBox.flag2 = false;
    	if(dwBox.flag1){
    		return;
    	}
		dwBox.flag1 = true;
		main_width = 960;
		dwBox.src = dwBox.src2;
		dwBox.flashBox.innerHTML = "";
		dwBox.flashBox.innerHTML = adBox.createSwf("IndexFlashBg20140417",dwBox.width,dwBox.height,dwBox.src);
    }else{
    	dwBox.flag1 = false;
    	if(dwBox.flag2){
    		return;
    	}
    	dwBox.flag2 = true;
	  	main_width = 1200;
		dwBox.src = dwBox.src1;
		dwBox.flashBox.innerHTML = "";
		dwBox.flashBox.innerHTML = adBox.createSwf("IndexFlashBg20140417",dwBox.width,dwBox.height,dwBox.src);
    }
    dwBox.reSetPosition();
});
dwBox.action = function(code){
	if(code == "close"){
		this.dwMainDiv.style.display = "none";
		this.topDiv.style.display = "none";
		this.rightDiv.style.display = "none";
		this.leftDiv.style.display = "none";
		this.flashWrap.style.display = "none";
	}else if(code == "show"){
		this.dwMainDiv.style.display = "block";
		this.topDiv.style.display = "block";
		this.rightDiv.style.display = "block";
		this.leftDiv.style.display = "block";
		this.flashWrap.style.display = "block";
	}
}
dwBox.getURL = function(){
	window.open(this.url,"_blank");
}
dwBox.createAD = function(){
	if(dwBox.isGo == 0){
		this.createElement();
		this.reSetPosition();
		dwBox.isGo=1;
	}else{
		this.action("show");
	}
};
dwBox.go = function(){
	if(typeof(adBox) == "undefined"){
		document.write("<script language=\"JavaScript\" src=\""+dwBox.adBoxJs+"\"></script>");
		this.check = function(){
			if(typeof(adBox)=="undefined"){
				dwBox.checkNum = setTimeout("dwBox.check()",1000);
			}else{
				clearTimeout(dwBox.checkNum);
			}
		}
		this.check();
	}else{
		this.createAD();
	}
}
// dwBox.go();