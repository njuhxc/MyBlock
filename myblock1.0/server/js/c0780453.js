function logMMRichHover(n,t,i){var f=null,e=null,r=t.firstChild,u,o,s,h,c;r&&r.classList&&r.classList.contains("b_linkComponent")&&(r=r.firstChild);r&&r.tagName.toUpperCase()=="A"&&(u=r.getAttribute("onmousedown")||r.getAttribute("inst")||r.getAttribute("h"),u=String(u),u&&(o=u.match(/ID=[a-zA-Z0-9\.]+,[0-9]+\.[0-9]+/),o&&(s=o[0].substr(3).split(","),e=s[0],f=s[1])));f&&e&&(i||(i="h"),h=['{"T":"CI.Hover","AppNS":"',e,'","K":"',f,'","Name":"',n,'","HType":"',i,'","TS":',sb_gt(),"}"].join(""),c=new Image,c.src=["/fd/ls/ls.gif?IG=",_G.IG,"&Type=Event.ClientInst&DATA=",h,"&log=UserEvent"].join(""))}