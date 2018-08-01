var fcBox = new Object();
fcBox.width1 = (typeof(adInfoTempFc.width1)=="undefined")?960:adInfoTempFc.width;
fcBox.height1 = (typeof(adInfoTempFc.height1)=="undefined")?400:adInfoTempFc.height;
if(!adInfoTempFc.index)
{
	fcBox.width2 = (typeof(adInfoTempFc.width2)=="undefined")?20:adInfoTempFc.width2;
	fcBox.height2 = (typeof(adInfoTempFc.height2)=="undefined")?270:adInfoTempFc.height2;
}else{
	fcBox.width2 = (typeof(adInfoTempFc.width2)=="undefined")?20:adInfoTempFc.width2;
	fcBox.height2 = (typeof(adInfoTempFc.height2)=="undefined")?120:adInfoTempFc.height2;
}
fcBox.src1 = (typeof(adInfoTempFc.src1)=="undefined")?0:adInfoTempFc.src1;
fcBox.src2 = (typeof(adInfoTempFc.src2)=="undefined")?0:adInfoTempFc.src2;
fcBox.url = (typeof(adInfoTempFc.url)=="undefined")?"http://163.com":adInfoTempFc.url;
fcBox.key = (typeof(adInfoTempFc.key)=="undefined")?"fckey":adInfoTempFc.key;
fcBox.time = (typeof(adInfoTempFc.time)=="undefined")?8000:adInfoTempFc.time;
fcBox.replayTopNum = (typeof(adInfoTempFc.top)=="undefined")?40:adInfoTempFc.top;
fcBox.cookieTime = 2;
fcBox.addEvent = function(el, type, fn){
	if(el.addEventListener){
		el.addEventListener(type, fn, false);
	}else{
		el.attachEvent('on' + type, fn);
	}
}

fcBox.winWidth = window.innerWidth || document.documentElement.clientWidth;
if(fcBox.winWidth>=1420){
	fcBox.width1 = 1200;
}else{
	fcBox.width1 = 960;
}
fcBox.createElement = function()
{
	this.mainDiv = adBox.createDiv(this.width1,this.height1);
	this.mainStr = "<div style=\"height:400px; width:"+this.width1+"px;position:relative;overflow:hidden; \"><div id=\"fcMovieFrame\" style=\"height:400px; width:1200px; position:absolute;left:50%;margin-left:-600px;top:0;\"></div><div id=\"fcClick\" onclick=\"fcBox.getURL()\" style=\"height:100%; width:100%; background:#FC6; cursor:pointer; position:absolute; top:0;left:0; filter:alpha(opacity=0); opacity:0;\"></div><div id=\"fcClose\" onclick=\"fcBox.action('close')\" style=\"height:18px; width:75px; position:absolute; top:0px;right:0;z-index:10;cursor:pointer;\"><img style=\"background:none;\" src=\"http://img2.126.net/ntesrich/2015/0831/fc_close.png\"  border=\"0\" /></div></div>"
	this.mainDiv.innerHTML = this.mainStr;
	this.mainFrame = document.getElementById("fcMovieFrame");
	this.mainFrame.innerHTML = adBox.createSwf("fcMainMovie",1200,this.height1,this.src1);
	this.mainDiv.style.display = "none";

	this.replayDivR = adBox.createDiv(this.width2,this.height2);
	this.replayStrR = "<div id=\"fcReplayFrameR\" style=\"width:"+this.width2+"px; height:"+this.height2+"px;\"></div><div id=\"fcClickR\" onclick=\"fcBox.getURL()\" style=\"width:"+this.width2+"px; height:"+this.height2+"px; background:#0CC; position:relative; left:0; top:-"+this.height2+"px; cursor:pointer; filter:alpha(opacity=0); opacity:0;\"></div><div id=\"fcReplayR\" onclick=\"fcBox.action('show')\" style=\"width:20px; height:40px; background:#C99; position:relative; left:0; top:-"+(this.height2+this.replayTopNum)+"px; cursor:pointer; filter:alpha(opacity=0); opacity:0;\"></div>";
	this.replayDivR.innerHTML = this.replayStrR;
	this.replayFrameR = document.getElementById("fcReplayFrameR");
	this.replayFrameR.innerHTML = adBox.createSwf("fcReplayMovieR",this.width2,this.height2,this.src2);
	this.replayDivR.style.display = "none";
	if(adInfoTempFc.index){
		this.replayDivL = adBox.createDiv(this.width2,this.height2);
		this.replayStrL = "<div id=\"fcReplayFrameL\" style=\"width:"+this.width2+"px; height:"+this.height2+"px;\"></div><div id=\"fcClickL\" onclick=\"fcBox.getURL()\" style=\"width::"+this.width2+"px; height:"+this.height2+"px; background:#0CC; position:relative; left:0; top:-"+this.height2+"px; cursor:pointer; filter:alpha(opacity=0); opacity:0;\"></div><div id=\"fcReplayL\" onclick=\"fcBox.action('show')\" style=\"width:20px; height:40px; background:#C99; position:relative; left:0; top:-"+(this.height2+this.replayTopNum)+"px; cursor:pointer; filter:alpha(opacity=0); opacity:0;\"></div>";
		this.replayDivL.innerHTML = this.replayStrL;
		this.replayFrameL = document.getElementById("fcReplayFrameL");
		this.replayFrameL.innerHTML = adBox.createSwf("fcReplayMovieL",this.width2,this.height2,this.src2);
		this.replayDivL.style.display = "none";
	}
}

fcBox.reSetPosition = function()
{	
	this.mainDiv.style.position = this.replayDivR.style.position = "fixed";
	this.mainDiv.style.left = "50%";
	this.mainDiv.style.zIndex = 9999;
	this.mainDiv.style.marginLeft = -this.width1/2+"px";
	this.mainDiv.style.top = "32%";

	this.replayDivR.style.right = "0px";
	this.replayDivR.style.bottom = "0px";
	this.replayDivR.style.zIndex = 9999;
	
	if(adInfoTempFc.index)
	{
		this.replayDivL.style.position = "fixed";
		this.replayDivL.style.left = "0px";
		this.replayDivL.style.bottom = "0px";
		this.replayDivL.style.zIndex = 9999;
		
	}
}
fcBox.addEvent(window,"resize",function(){
	fcBox.reSetPosition();
});

fcBox.action = function(code)
{
	if(typeof(this.isFirst)=="undefined")
	{
		this.isFirst = 1;
		this.cookie = adBox.cookieCount(this.key);
	}
	if(((code == "first")&&((this.cookie<=this.cookieTime)))||(code=="show"))
	{
		if(code=="show"){
			if(typeof(dwBox) != "undefined"){
				dwBox.action('close');
			}
		}
		this.mainDiv.innerHTML = this.mainStr;
		this.mainFrame = document.getElementById("fcMovieFrame");
		this.mainFrame.innerHTML = adBox.createSwf("fcMainMovie",1200,this.height1,this.src1);
		this.mainDiv.style.display = "block";
		this.replayDivR.innerHTML = "";
		this.replayDivR.style.display = "none";
		if(adInfoTempFc.index)
		{
			this.replayDivL.innerHTML = "";
			this.replayDivL.style.display = "none";
		}
		this.time8Num = setTimeout("fcBox.action('close')",this.time);
	}else if(((code == "first")&&((this.cookie>this.cookieTime)))||(code=="close"))
	{
		this.mainDiv.innerHTML = "";
		this.mainDiv.style.display = "none";
		this.replayDivR.innerHTML = this.replayStrR;
		this.replayFrameR = document.getElementById("fcReplayFrameR");
		this.replayFrameR.innerHTML = adBox.createSwf("fcReplayMovieR",this.width2,this.height2,this.src2);
		this.replayDivR.style.display = "block";
		if(adInfoTempFc.index)
		{
			this.replayDivL.innerHTML = this.replayStrL;
			this.replayFrameL = document.getElementById("fcReplayFrameL");
			this.replayFrameL.innerHTML = adBox.createSwf("replayMovieL",this.width2,this.height2,this.src2);
			this.replayDivL.style.display = "block";
		}
		clearTimeout(this.time8Num);
		if(typeof(adCindex) != "undefined"){
			adCindex.go(2);
		}
	}
}

fcBox.checkPross = function()
{
	if((this.broswer == "ff")||(this.broswer == "chr"))
	{
		this.checkPorssNum = setTimeout("fcBox.action('first')",1000);
	}else if(adBox.swfLoadPross(["fcMainMovie","fcReplayMovieR"]))
	{
		this.action("first");
	}else
	{
		this.checkPorssNum = setTimeout("fcBox.checkPross()",1000);
	}
}

fcBox.getURL = function()
{
	window.open(this.url,"_blank");
}

fcBox.createAD = function()
{
	this.createElement();
	this.reSetPosition();
	this.checkPross();
}

fcBox.go = function()
{
	if(typeof(adBox) == "undefined")
	{
		
		this.check = function()
		{
			if(typeof(adBox)=="undefined")
			{
				fcBox.checkNum = setTimeout("fcBox.check()",1000);
			}else
			{
				
				clearTimeout(fcBox.checkNum);
				fcBox.createAD();
			}
		}
		this.check();
	}else
	{
		this.createAD();
	}
}
// fcBox.go();