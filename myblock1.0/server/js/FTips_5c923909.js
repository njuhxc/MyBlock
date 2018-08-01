;(function($){
//弹层组件
// 
 // ********************
//        auth : qiyy
//        date : 201608
//        name : share 
//        FTips({
//            trigger : $(".js_share3").find(".js_weixin_share") , // 触发DOM 兼容页面内两组share不同触发弹层方式
//            dialog : "js_weixin_share_tips1", // 弹层的class name
//            type:"hover" // hover 鼠标浮动上去出现 鼠标离开隐藏； click 点击出现，点击弹层关闭按钮消失 关闭弹层按钮class 固定为 js_wx_close
//        });


 FTips = function(e){
    var typ = e.type;
    var trg  =  e.trigger , dlg = $('.' + e.dialog );
    var L = trg.offsetLeft,T = trg.offsetTop;
    var W = dlg.width,H = dlg.height;
    var pL = L - W / 2, pT  = T - H / 2 ;


    var  showDialog = function(e){
        var __this = e ;
        var __box = __this.parent();
        var __dialog = __box.find(dlg);
        if( __dialog.length == 0){
            dlg.appendTo(__box).css({"left":"pL","top":"T"}).fadeIn();
        }else{
            dlg.fadeIn();
        }
    };

    var hideDialog = function(e){
        var __this = e;
        var __box = __this.parent();
        var __dialog = __box.find(dlg);
        if( __dialog.length !== 0){
            __dialog.remove();
        }
    };

    if(typ == "click"){
//     点击出现弹层
        trg.click(function(){
            showDialog($(this));
        });

        dlg.delegate(".js_wx_close","click",function(){
          $(this).parents('.' + e.dialog).fadeOut();
        });

    }else {

//      鼠标浮上出现弹层
        trg.hover(function(){
            showDialog($(this));
        },function(){
            hideDialog($(this));
        });
    }

};
})(jQuery)          