;(function($){

//        ********************
//        auth : qiyy
//        date : 201608
//        name : share 

//        FShare('targetDomClassName', {
//            theme  :  ''  OR  'classname'
//            order :  ['sina','qq','qqzone','weixin','cof']  只能改变顺序 和减少数量，不能改变名称 
//            data: targetDomClassName上某个属性  属性内数据格式为 {'title': VALUE,'url':VALUE,'summery':VALUE,'pic':VALUE}
//        });


// 可配置项相同可使用同一targetDomClassName
// theme  自定义样式
// order  图标顺序  去掉一项则该项无
// data  分享所需数据存储对象

//        分享组件
         FShare = function (e, d) {
            var _target = $('.' + e), title = '', url = '', summery = '', picUrl = '';
            var DATA = '';
            var type = d.order;
            var btnHtml = '';
            $.each(type, function (n, v) {
                btnHtml += '<a href="javascript:;" class="js_' + v + '_share"></a>';
            });

            var getData = function (btn) {
                DATA = eval('(' + btn.parent('.' + e).attr(d.data) + ')');
                if (DATA !== '') {
                    title = DATA.title,
                            url = DATA.url,
                            summery = DATA.summery,
                            picUrl = DATA.pic;
                }
            };
            _target.addClass(d.theme);
            _target.html("").html(btnHtml);
            _target.on("click", '.js_sina_share', function () {
                getData($(this));
                //新浪微博分享
                href = 'http://service.weibo.com/share/share.php?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + '&summery=' + encodeURIComponent(summery) + '&pic=' + encodeURIComponent(picUrl);
                window.open(href);
            });
            _target.on("click", '.js_qqzone_share', function () {
                getData($(this));
                //qq空间分享
                href = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + '&pics=' + encodeURIComponent(picUrl);
                window.open(href);
            });

            _target.on("click", '.js_qq_share', function () {
                getData($(this));
                //qq分享
                href = 'http://connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + '&pics=' + encodeURIComponent(picUrl);


                window.open(href);
            });

        };

})(jQuery)