var VTI=typeof VTI=="undefined"?{}:VTI,VT;(function(n){function p(f,o,s,c,p,w,b){var k,rt,tt,nt,ft;if(o!=""&&o!=n.lp&&(n.destroyAfterPlay===!0&&i&&i("Error"),t&&e(),n.destroyAfterPlay=!!w,i=b,k=f.firstChild,rt=new RegExp(r,"g"),k&&!rt.test(k.className)&&(tt=sj_ce("span",null,r),f.insertBefore(tt,k),k=tt),!k.firstChild||k.firstChild.className!=h)){f.cv!=1&&(k.className=l);var d=f.getAttributeNode(a),g=f.getAttributeNode(v),ut=f.getElementsByTagName("img")[0].getAttributeNode("src").value;d&&g?(d=d.value,g=g.value):(nt=new Image,nt.src=ut,d=nt.width,g=nt.height);VTI.mov&&VTI.mov(f);ft=r+y++;it(ft,ut,o,d,g,p);k.insertBefore(t,k.firstChild);sj_so(t,0);t&&(n.destroyAfterPlay==!0?sj_ue(k.parentNode,"mouseout",u):(sj_be(k.parentNode,"mouseout",u),sj_be(t,"mouseout",u)));n.lp=o}}function u(r){r=sj_ev(r);var f=sj_mo(r),o=typeof HoverUtils!="undefined"&&HoverUtils!=null&&typeof HoverUtils.getClassName=="function"?HoverUtils.getClassName(f):"";f&&o.match(/^(vol cont)|volMute|(vt_(vph|fp|povl_c|pt|pts))$/)||(t&&t.parentNode&&sj_ue(t.parentNode,"mouseout",u),i&&i("stop"),n.lp=null,e())}function w(n){n=="Mute"&&c()}function c(){n.m=!n.m;t&&(t.muted=n.m);sj_cook.set(f,o,n.m?"1":"0",!0)}function b(i){i>=0&&i<=100&&i!=n.v&&(n.v=i,t&&(t.volume=n.v/100),sj_cook.set(f,s,n.v.toString(),!0))}function k(){if(typeof i!="undefined"&&i!=null&&i("Start"),t){var n=t.parentElement;n&&(n.className=r,n.style.backgroundColor="black");t.style.height=t.style.width="100%";sj_so(t,100);VTI.vs&&VTI.vs();_G.TestEnv&&sj_evt.fire("Vi.Hover.Display")}}function e(){var u,f;typeof i!="undefined"&&i!=null&&i("Stop");t&&(d(t),u=t.parentElement,u&&(u.className=r,u.style.backgroundColor="transparent",u.innerHTML=""),t=null,n.destroyAfterPlay&&(f=u.parentNode,f&&f.removeChild&&f.removeChild(u),n.lp=null));n.destroyAfterPlay=!1;VTI.mot&&VTI.mot()}function d(n){n&&(n.style.display="none",n.autoplay=!1,n.removeAttribute("src"),n.load())}function g(){typeof i!="undefined"&&i!=null&&i("Error");e()}function nt(){n.v=parseInt(sj_cook.get(f,s));n.v>=0&&n.v<=100||(n.v=50);t.volume=n.v/100}function tt(i){n.m=sj_cook.get(f,o)=="1";typeof i!="undefined"&&i=="1"&&(n.m=!0);t.muted=n.m}function it(n,i,r,u,f,e){t=sj_ce("video",n,h);t.setAttribute("type","video/mp4");ut();t.style.width=u+"px";t.style.height=f+"px";t.poster=i;tt(e);nt();t.autoplay=!0;t.src=r}function rt(){var n=navigator?navigator.userAgent:"";return n.indexOf("Firefox")>=0}function ut(){t&&(sj_be(t,rt()?"play":"playing",k),sj_be(t,"ended",e),sj_be(t,"error",g))}var f="SRCHHPGUSR",o="VMUTE",s="VOLUME",r="vt_vp",l="vt_vph",h="vt_fp",a="tw",v="th",y=0,t=null,i=null;n.m=null;n.v=0;n.lp=null;n.destroyAfterPlay=!1;n.hover=p;n.unhover=u;n.status=w;n.toggleMute=c;n.setVolume=b})(VT||(VT={}))