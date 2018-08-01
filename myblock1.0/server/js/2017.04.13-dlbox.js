(function(){
	if(typeof(adInfoTempDL)=="undefined"){
		return;
	}
	window.dlBox = new Object();
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
	dlBox.$ = function(id){
		return document.getElementById(id);
	};
	dlBox.isShow = false;
	dlBox.createElement = function(obj){
		return document.createElement(obj);
	};
	dlBox.addEnterLeaveEvent = function(ele,type,func){
		if(window.document.all) {
			ele.attachEvent('on'+type,func);
		}else{
			if(type==='mouseenter'){
				ele.addEventListener('mouseover',this.withoutChildFunction(func),false);
			}else if(type==='mouseleave'){
				ele.addEventListener('mouseout',this.withoutChildFunction(func),false);
			}else{
				ele.addEventListener(type,func,false);   
			}
		}
	};
	dlBox.withoutChildFunction=function(func){
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
	dlBox.addEvent = function(el, type, fn){
		if(el.addEventListener){
			el.addEventListener(type, fn, false);
		}else{
			el.attachEvent('on' + type, fn);
		}
	}

	dlBox.src1_L = (typeof(adInfoTempDL.src1_L)=="undefined")?0:adInfoTempDL.src1_L;
	dlBox.src1_R = (typeof(adInfoTempDL.src1_R)=="undefined")?0:adInfoTempDL.src1_R;
	dlBox.src2_L = (typeof(adInfoTempDL.src2_L)=="undefined")?0:adInfoTempDL.src2_L;
	dlBox.src2_R = (typeof(adInfoTempDL.src2_R)=="undefined")?0:adInfoTempDL.src2_R;
	dlBox.url = (typeof(adInfoTempDL.url)=="undefined")?"http://www.163.com":adInfoTempDL.url;
	dlBox.top = (typeof(adInfoTempDL.top)=="undefined")?80:adInfoTempDL.top;
	dlBox.isIFrame = (typeof(adInfoTempDL.isIFrame)=="undefined")?false:adInfoTempDL.isIFrame;
	dlBox.isClose = false;
	var winWidth = window.innerWidth || document.documentElement.clientWidth;
	if(winWidth>=1680){
		dlBox.width = 150;
		dlBox.height = 450;
	}else if(winWidth>=1420 && winWidth<1680){
		dlBox.width = 100;
		dlBox.height = 300;
	}else if(winWidth>=1360 && winWidth<1420){
		dlBox.width = 130;
		dlBox.height = 390;
	}else if(winWidth>=1280 && winWidth<1366){
		dlBox.width = 130;
		dlBox.height = 390;
	}else{
		dlBox.width = 70;
		dlBox.height = 210;
	}

	dlBox.width2 = 20;
	dlBox.height2 = 210;
	dlBox.createElement = function(){		
		this.leftDiv = document.createElement("div");
		document.body.appendChild(this.leftDiv);
		this.leftStr = '<div id="dlFrame_l"></div><div id="dlClickL" onclick="dlBox.getURL()"></div><div id="dlCloseL"><img style="background:none;" src="http://img1.126.net/channel7/js/couplet/x.png" height="18" width="18" border="0"/></div><img id="left_ad" style="background:none;" src="http://img2.126.net/ntesrich/2015/0902/duilian_left.png" />';
		this.leftDiv.innerHTML = this.leftStr;
		this.frame_l = this.$("dlFrame_l");
		this.frame_l.innerHTML = dlBox.isIFrame ? '<iframe src="'+this.src1_L+'" width="100%" height="100%" scrolling="no" border="0" style="border:0 none;overflow:hidden"></iframe>':adBox.createSwf("dlbMovieL",'100%','100%',this.src1_L);

		this.leftSmallDiv = document.createElement("div");
		document.body.appendChild(this.leftSmallDiv);
		this.leftSmallStr = '<div id="dlSmallFrame_l"></div><img id="leftSmall_ad" style="background:none;" src="http://img2.126.net/ntesrich/2015/0902/duilian_left.png" />';
		this.leftSmallDiv.innerHTML = this.leftSmallStr;
		this.frameSmall_l = this.$("dlSmallFrame_l");
		this.frameSmall_l.innerHTML = dlBox.isIFrame ? '<iframe src="'+this.src2_L+'" width="100%" height="100%" scrolling="no" border="0" style="border:0 none;overflow:hidden"></iframe>':adBox.createSwf("dlSmallbMovieL",'100%','100%',this.src2_L);

		this.rightDiv = document.createElement("div");
		document.body.appendChild(this.rightDiv);
		this.rightStr = '<div id="dlFrame_R"></div><div id="dlClickR" onclick="dlBox.getURL()"></div><div id="dlCloseR"><img style="background:none;" src="http://img1.126.net/channel7/js/couplet/x.png" height="18" width="18" border="0"/></div><img id="right_ad" style="background:none;" src="http://img2.126.net/ntesrich/2015/0902/duilian_right.png" />';
		this.rightDiv.innerHTML = this.rightStr;
		this.frame_r = this.$("dlFrame_R");
		this.frame_r.innerHTML = dlBox.isIFrame ? '<iframe src="'+this.src1_R+'" width="100%" height="100%" scrolling="no" border="0" style="border:0 none;overflow:hidden"></iframe>':adBox.createSwf("dlbMovieR",'100%','100%',this.src1_R);

		this.rightSmallDiv = document.createElement("div");
		document.body.appendChild(this.rightSmallDiv);
		this.rightSmallStr = '<div id="dlSmallFrame_R"></div><img id="rightSmall_ad" style="background:none;" src="http://img2.126.net/ntesrich/2015/0902/duilian_right.png" />';
		this.rightSmallDiv.innerHTML = this.rightSmallStr;
		this.frameSmall_R = this.$("dlSmallFrame_R");
		this.frameSmall_R.innerHTML = dlBox.isIFrame ? '<iframe src="'+this.src2_R+'" width="100%" height="100%" scrolling="no" border="0" style="border:0 none;overflow:hidden"></iframe>':adBox.createSwf("dlSmallbMovieR",'100%','100%',this.src2_R);

		this.$('dlCloseL').onclick = function() {
			dlBox.action('close');
		}
		this.$('dlCloseR').onclick = function() {
			dlBox.action('close');
		}
		if(winWidth<1280){
			this.leftDiv.css("display","none");
			this.rightDiv.css("display","none");
			this.leftSmallDiv.css("display","block");
			this.rightSmallDiv.css("display","block");
		}else{
			this.leftDiv.css("display","block");
			this.rightDiv.css("display","block");
			this.leftSmallDiv.css("display","none");
			this.rightSmallDiv.css("display","none");
		}
		this.addEnterLeaveEvent(dlBox.leftSmallDiv,"mouseenter",function(){
			if(winWidth<1280){
				dlBox.action('show');
			}
		});
		this.addEnterLeaveEvent(dlBox.rightSmallDiv,"mouseenter",function(){
			if(winWidth<1280){
				dlBox.action('show');
			}
		});
		this.addEnterLeaveEvent(dlBox.leftDiv,"mouseleave",function(){
			if(winWidth<1280){
				dlBox.action('show_h');
			}
		});
		this.addEnterLeaveEvent(dlBox.rightDiv,"mouseleave",function(){
			if(winWidth<1280){
				dlBox.action('show_h');
			}
		});
	}

	dlBox.addEvent(window,"resize",function(){
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		if(winWidth>=1680){
			dlBox.width = 150;
			dlBox.height = 450;
		}else if(winWidth>=1440 && winWidth<1680){
			dlBox.width = 100;
			dlBox.height = 300;
		}else if(winWidth>=1360 && winWidth<1440){
			dlBox.width = 130;
			dlBox.height = 390;
		}else if(winWidth>=1280 && winWidth<1366){
			dlBox.width = 130;
			dlBox.height = 390;
		}else{
			dlBox.width = 70;
			dlBox.height = 210;
		}
		if(!dlBox.isClose){
			if(winWidth<1280){
				dlBox.leftDiv.css("display","none");
				dlBox.rightDiv.css("display","none");
				dlBox.leftSmallDiv.css("display","block");
				dlBox.rightSmallDiv.css("display","block");
			}else{
				dlBox.leftDiv.css("display","block");
				dlBox.rightDiv.css("display","block");
				dlBox.leftSmallDiv.css("display","none");
				dlBox.rightSmallDiv.css("display","none");
			}
		}
	    dlBox.reSetPosition();
	});

	dlBox.reSetPosition = function(){
		if(this.isIFrame){
			this.$("dlClickL").css({"display":"none"});
			this.$("dlClickR").css({"display":"none"});
		}
		this.leftDiv.css({"position":"fixed","top":this.top+"px","left":"0px","width":this.width+"px","height":this.height+"px","z-index":"999"});
		this.$("dlClickL").css({"position":"absolute","left":"0px","top":"0px","width":"100%","height":"100%","z-index":"10","cursor":"pointer", "background":"#fff","opacity":0,"filter":"alpha(opacity=0)"});
		this.$("dlCloseL").css({"position":"absolute","left":"0px","top":"0px","z-index":"12","cursor":"pointer"});
		this.$("left_ad").css({"position":"absolute","left":"0px","bottom":"0px","z-index":"12"});
		this.frame_l.css({"position":"absolute","left":"0px","top":"0px","height":this.height+"px","width":this.width+"px","z-index":1});

		this.leftSmallDiv.css({"position":"fixed","top":this.top+"px","left":"0px","width":this.width2+"px","height":this.height2+"px","z-index":"99","cursor":"pointer"});
		this.$("leftSmall_ad").css({"position":"absolute","left":"0px","bottom":"0px","z-index":"12","width":"20px"});
		this.frameSmall_l.css({"position":"absolute","left":"0px","top":"0px","height":this.height2+"px","width":this.width2+"px"});

		this.rightDiv.css({"position":"fixed","top":this.top+"px","right":"0px","width":this.width+"px","height":this.height+"px","z-index":"999"});
		this.$("dlClickR").css({"position":"absolute","left":"0px","top":"0px","width":"100%","height":"100%","z-index":"10","cursor":"pointer","background":"#fff","opacity":0,"filter":"alpha(opacity=0)"});
		this.$("dlCloseR").css({"position":"absolute","right":"0px","top":"0px","z-index":"12","cursor":"pointer"});
		this.$("right_ad").css({"position":"absolute","right":"0px","bottom":"0px","z-index":"12"});
		this.frame_r.css({"position":"absolute","left":"0px","top":"0px","height":this.height+"px","width":this.width+"px","z-index":1});

		this.rightSmallDiv.css({"position":"fixed","top":this.top+"px","right":"0px","width":this.width2+"px","height":this.height2+"px","z-index":"99","cursor":"pointer"});
		this.$("rightSmall_ad").css({"position":"absolute","left":"0px","bottom":"0px","z-index":"12","width":"20px"});
		this.frameSmall_R.css({"position":"absolute","left":"0px","top":"0px","height":this.height2+"px","width":this.width2+"px"});

		if(adBox.getClientInfo("top") >= this.top){	
			this.leftDiv.css({"position":"fixed","top":80+"px"});
			this.rightDiv.css({"position":"fixed","top":80+"px"});
			this.leftSmallDiv.css({"position":"fixed","top":80+"px"});
			this.rightSmallDiv.css({"position":"fixed","top":80+"px"});
		}else{
			this.leftDiv.css({"position":"absolute","top":this.top +"px"});
			this.rightDiv.css({"position":"absolute","top":this.top +"px"});
			this.leftSmallDiv.css({"position":"absolute","top":this.top +"px"});
			this.rightSmallDiv.css({"position":"absolute","top":this.top +"px"});
		}
	}
	dlBox.action = function(code){
		if(code=="close"){
			this.isClose = true; 
			this.leftDiv.css("display","none");
			this.rightDiv.css("display","none");
			this.leftSmallDiv.css("display","none");
			this.rightSmallDiv.css("display","none");
		}else if(code=="show"){
			this.leftDiv.css("display","block");
			this.rightDiv.css("display","block");
		}else if(code=="show_h"){
			this.leftDiv.css("display","none");
			this.rightDiv.css("display","none");
		}
	}

	dlBox.getURL = function(){
		window.open(this.url,"_blank");
	}

	dlBox.go = function(){
		if(!this.isShow){
			this.createElement();
			this.reSetPosition();
			this.addEvent(window, "resize",function(){
				dlBox.reSetPosition();
			});
			this.addEvent(window, "scroll",function(){
				dlBox.reSetPosition();
			});
		}
		this.isShow = true;
	};
})();