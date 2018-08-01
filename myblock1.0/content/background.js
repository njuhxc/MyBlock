//"use strict";

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        var is_needed=false;
        //To Do:add step 1 blacklist and whitelist
       if(details.url.endsWith(".js")&&details.url.indexOf("json") == -1&&details.url.indexOf("jquery") == -1)
        {
            var xmlhttp;
            if (window.XMLHttpRequest)
            {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp=new XMLHttpRequest();
            }
            else
            {// code for IE6, IE5
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            var newurl="http://127.0.0.1:3001/"+details.url;
            //alert(newurl);
            xmlhttp.open("GET",newurl,false);
            xmlhttp.send();
            //alert(xmlhttp.responseText);
            var restext=xmlhttp.responseText;
            if(restext=="ad")
                is_needed=true;
            else
                is_needed=false;
            //alert(details.url+" is "+xmlhttp.responseText);
        }
        if(details.url.indexOf("leju")!=-1){
            is_needed=true;}
            //console.log(details.url);}
        if(is_needed)
            return {cancel:true};
    },
    {urls: ["http://*/*","https://*/*"]},
    ["blocking"]);
