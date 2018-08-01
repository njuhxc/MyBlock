//单选按钮
		  $('.radio_item a').on('click', function(){
		    var _type = $(this).attr('data-type');
		    var _val = $(this).attr('data-val');
		    var $parent = $(this).parent();
		    var $input = $parent.find('input[name=' + _type + ']');
		 
		    $(this).addClass('active').siblings().removeClass('active');
		    $parent.find('a').removeClass('error');
		    $input.val(_val);
		  });
		  //下拉框插件
		    (function($){
		       $.fn.extend({
		          dropDown: function(options){
		            return this.each(function(){
		              var obj     = $(this);
		              var $title  = obj.find('.title');
		              var content = obj.find('.content');
		              var item    = content.find('span');
		              var _input  = obj.find('input[type=hidden]');
		              var txtObj  = obj.find('.title span');

		              obj.on('mouseover', function(){
		                $(this).addClass('active');
		              });
		              obj.on('mouseout', function(){
		                hide(obj);
		              });

		              item.on('click', function(){
		                txtObj.removeClass('gray');
		                _input.val($(this).attr('value'));
		                txtObj.html($(this).html());
		                $title.removeClass('error');
		                hide(obj);
		              })
		            });
		            function hide(obj){
		              obj.removeClass('active');
		            }
		          }
		        });
		    })(jQuery);
		    $('.select_item').dropDown();


		    (function($){
       $.fn.extend({
        calculator: function(){
          return this.each(function(){
            var obj         = $(this);
            var $inputs     = obj.find('input');
            var $city       = obj.find('.city');
            var $cityDd     = $city.parents('dd');
            var $hideCity   = obj.find('input[name=select_city]');

            var codeState   = false;
            var _sms        = new GetSms();
            var $mobile     = obj.find('input[name=mobile]');
            var $getCode    = obj.find('.btn_get_sms');
            var $codeBox    = obj.find('.chief_img_code');
            var $closePop   = $codeBox.find('.close');
            var $getSmsBtn  = obj.find('.code_submit');
            var $imgCodeBox = obj.find('.img_code');
            var $changeCode = obj.find('.change_code');
            var $imgInput   = obj.find('.img_input');
            //获取隐藏input
            var $isNew      = obj.find('input[name=is_new]');
            var $houseType  = obj.find('input[name=house_type]');
            var $parlor     = obj.find('input[name=parlor]');
            var $kitchen    = obj.find('input[name=kitchen]');
            var $toilet     = obj.find('input[name=toilet]');
            var $area       = obj.find('input[name=area]');
            var $regNum     = obj.find('input[name=reg_num]');
            var $cityInput  = $('input[name=city_value]');
            var countTimer  = 0;

            var $formSubBtn = obj.find('.btn_count');

            $(window).on('click', function(){
              $('.get_city').remove();
            });
            $city.on('input propertychange', function(){
              var _this = $(this);

              var _data = {
                name: $(this).val()
              };

               $.ajax({
                type: 'POST',
                url: 'http://www.7gz.com/Outside/cityName',
                data: _data,
                success: function(data){
                  var res = data;
                  $('.get_city').remove();
                  var text = '<div class="get_city">';
                  if(res.errCode == 1000 && res.data){
                    for(var i=0; i<res.data.length; i++){
                      text += '<a href="javascript:;" value="' + res.data[i].code + '">' + res.data[i].name + '</a>';
                    }
                  }else{
                    text += '<a href="javascript:;" value="">该城市超出服务范围</a>';
                  }
                  text += '</div>';

                  $cityDd.append(text);

                  $('.get_city a').on('click', function(){
                    if($(this).html() == '该城市超出服务范围') return;
                    $hideCity.val($(this).attr('value'));
                    _this.val($(this).html());
                    $('.get_city').remove();
                  });
                }
              });
            });

            $getCode.on('click', function(){
              var mobile = $mobile.val();
              if(!mobile){
                $mobile.parent().addClass('error');
                return false;
              }

              if(!(/^1(3|4|5|7|8)\d{9}$/.test(mobile))){
                $mobile.parent().addClass('error');
                return false;
              }
              
              getImgCode();
              $codeBox.show();
            });
            $closePop.on('click', function(){
              $codeBox.hide();
            });
            $inputs.on('input propertychange', function(){
              $(this).parent().removeClass('error');
            });

            $getSmsBtn.on('click', function(){

            });
            $changeCode.on('click', function(){
              getImgCode();
            });
            $getSmsBtn.on('click', function(){
              var mobile = $mobile.val();
              var vcode = $imgInput.val();

              if(codeState) return;

              if(!vcode || (vcode.length != 4)){
                $imgInput.parent().addClass('error');
                $imgInput.val('');
                $imgInput.attr('placeholder','4位验证码');

                return false;
              }

              sendSmsAjax(mobile,vcode);
            });

            $formSubBtn.on('click', function(){
              var status = true;
              var sub_status = false;

              if(!$isNew.val()){
                $isNew.siblings('a').addClass('error');
                status = false;
              }
              if(!$mobile.val() || !(/^1(3|4|5|7|8)\d{9}$/.test($mobile.val()))){
                $mobile.parent().addClass('error');
                status = false;
              }
              if(!$houseType.val()){
                $houseType.prev().find('.title').addClass('error');
                status = false;
              }

              if(!$area.val() || isNaN($area.val()) || (parseFloat($area.val()) > 999)){
                $area.parent().addClass('error');
                $area.val('').attr('placeholder','面积为数字且最大为999');
                status = false;
              }
              if(!$regNum.val()){
                $regNum.parent().addClass('error');
                status = false;
              }
              if(!$cityInput.val()){
                $cityInput.parent().addClass('error');
                status = false;
              }

              if(!status) return;

              if(sub_status){
                alert('请勿重复点击，智能报价计算中，请稍候。。。');
                return;
              }

              sub_status = true;

	              var _data = {
					is_new: $isNew.val(),
					area: $area.val(),
					house_type: $houseType.val(),
					parlor: $parlor.val(),
					kitchen: $kitchen.val(),
					toilet: $toilet.val(),
					mobile: $mobile.val(),
                    sms: $regNum.val(),
					select_city: $cityInput.val(),
                    mode: 1832,
                    sign: 1,
                    plat: 0
				};

                _sms.enCodeMobile(_data.mobile, function(enMobile){
                    _sms.doLogin(_data.mobile,_data.sms,enMobile,function(data){
                         $.ajax({  
                            type:'GET',  
                            url : 'http://www.7gz.com/Api/Budget/activity_budget',
                            data: _data,
                            dataType : 'jsonp', 
                            success  : function(data) {
                               
                                if(data.code == 1){
                                    $('#popUpBox').show();
                                    $('#successPrice').html(data.info.bud_price);
                                }else{
                                    alert(data.message)
                                }
                                
                                status = false;
                                sub_status = false;
                            },  
                            error : function() {  
                                status = false;
                                sub_status = false;
                            }  
                        });  
                    },function(data){
                        alert(data.msg);
                        sub_status = false;
                    })
                });
            });
            function checkvalue(){

            };
            function getImgCode(){
              var _src = _sms.RandomImg();
              $imgCodeBox.find('img').attr('src','').attr('src',_src);
              };

            function sendSmsAjax(mobile,vcode,fn){

                codeState = !codeState;

                //请求发送验证码接口
                  _sms.enCodeMobile(mobile, function(enCode){
                    _sms.getMobileCode(enCode, vcode, function(res){
                      if(res.errCode == 1000){
                          $codeBox.hide();
                          countDown(60,function(t){
                            if(t < 1){
                                codeState = false;
                                $getCode.removeClass('active');
                                $getCode.html('重新发送');
                            }else{
                                $getCode.addClass('active');
                                $getCode.html(t + 's重发送');
                            }
                          });
                          fn && fn();
                      }else{
                        codeState = false;
                        getImgCode();
                        alert(res.errMsg);
                      }
                    });
                  });
              };

              function countDown(t,callback){
              var _t = t;

              clearInterval(countTimer);
              callback && callback(_t);

              countTimer = setInterval(function(){
                if(_t <= 0){
                  clearInterval(countTimer);
                }
                _t --;
                callback && callback(_t);
              },1000);
            };
          });
        }
      });
    })($);
    $('#pageForm').calculator();
    $('.pop_close').on('click', function(){
    	$('#popUpBox').hide();
    });

    (function(){
         $.ajax({  
            url:'http://www.7gz.com/Api/City/getCityAll',
            dataType :'jsonp',
            success  : function(data) {
                
                var str = '';
                
                if(data.data){
                    for(var item in data.data){
                        str+= '<a href="javascript:;" data-val="'+item+'">'+data.data[item]+'</a>'
                    }
                }
                $('.city_box').html(str);

                $('.city_box a').on('click', function(){
                    $('.city_text').html($(this).html());
                    $('input[name=city_value]').val($(this).attr('data-val'));
                    $('.select_city').removeClass('active');
                    $('.select_city').removeClass('error');
                });
            },  
            error : function() {  

            }  
        });  
    })();
    $('.city_text').on('click', function(){
        var $parent = $(this).parent();
        if($parent.hasClass('active')){
            $parent.removeClass('active');  
        }else {
            $parent.addClass('active');
        }
    });