/**
 * 
 * @authors xuemei 
 * @date    2017-09-01 15:57:35
 * @version $1.0$
 * @name 发布系统统计专用
 */

//截取url
function getQueryString(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var r = window.location.search.substr(1).match(reg);  
    if (r != null) return unescape(r[2]);  
    return null;  
}  

var username=document.cookie.split(";")[0].split("=")[1];
//JS操作cookies方法!
//写cookies
function setCookie(name,value,expiresHours){
	var cookieString=name+"="+escape(value); 
	//判断是否设置过期时间 
	if(expiresHours>0){ 
		var date=new Date(); 
		date.setTime(date.getTime+expiresHours*3600*1000); 
		cookieString=cookieString+"; expires="+date.toGMTString();
	}
	document.cookie=cookieString+";path=/;domain=.7gz.com"; 
}


//读取cookie
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}

if(!getCookie("gz_from_utm_source") || getCookie("gz_from_utm_source")=="null"){
	setCookie("gz_from_utm_source",getQueryString("utm_source"),0);
}

if(!getCookie("gz_from_utm_medium") || getCookie("gz_from_utm_medium")=="null"){
	setCookie("gz_from_utm_medium",getQueryString("utm_medium"),0);
}

if(!getCookie("gz_from_utm_campaign") || getCookie("gz_from_utm_campaign")=="null"){
	setCookie("gz_from_utm_campaign",getQueryString("utm_campaign"),0);
}

if(!getCookie("gz_from_utm_term") || getCookie("gz_from_utm_term")=="null"){
	setCookie("gz_from_utm_term",getQueryString("utm_term"),0);
}