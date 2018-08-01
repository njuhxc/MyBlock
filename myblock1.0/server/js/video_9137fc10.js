/*
 * @description : 该模块用于控制相关视频播放列表功能
 * @version     : 1.0.1
 *
 **/
define('video.pc.list',['F'], function (F) {
 
  
 
  var List = function (settings) {
    this.flag = this.paramInit(settings);
  };

  //================================== 参数层 =====================================
  List.prototype = {
    //标志位
    flag: false,
    //列表容器id
    conId: 'js_video_list',
    //播放列表容器id
    playInfoId: 'js_video_info',
    //上一页按钮id
    prevBtnId: 'js_prevAside',
    //下一页按钮id
    nextBtnId: 'js_nextAside',
    //内容列表id
    listId: 'js_playitem',
    //容器dom
    conDom: null,
    //上一页dom
    prevBtnDom: null,
    //下一页dom
    nextBtnDom: null,
    //数据
    data: null,
    //当前播放索引
    playIndex: 0,
    //当前正在播放内容的索引
    curPlayIndex: -1,
    //当前页
    cpage: 1,
    //总页数
    tpage: 1,
    //分页大小
    pageSize: 4,
    //单页移动距离
    sPageMoveDist: 0,
    //移动锁
    moveLock: false,
    //点击单条内容触发播放方法
    playVideo: function () {},

    //================================== 参数层 =====================================
    //用户配置参数初始化
    paramInit: function (settings) {

      if (typeof settings !== 'undefined') {

        if (typeof settings.data !== 'undefined') {
          this.data = settings.data;
        }
        if (typeof settings.conId !== 'undefined' && settings.conId !== '') {
          this.conId = settings.conId;
        }
        if (typeof settings.autoLoop !== 'undefined' && settings.autoLoop !== '') {
          this.autoLoop = settings.autoLoop;
        }
        if (typeof settings.playInfoId !== 'undefined' && settings.playInfoId !== '') {
          this.playInfoId = settings.playInfoId;
        }
        if (typeof settings.pageSize !== 'undefined' && settings.pageSize !== 0) {
          this.pageSize = settings.pageSize;
        }
        if (typeof settings.playIndex !== 'undefined' && settings.playIndex !== 0) {
          this.playIndex = settings.playIndex;
        }
        if (typeof settings.playVideo === 'function') {
          this.playVideo = settings.playVideo;
        }
      }
      this.conDom = F.query('#' + this.conId);
      var data = this.data;
      
      if (typeof data === 'undefined' || !(data instanceof Array) && data.length === 0) {
        return false;
      }
      return true;
    },

    //新生成dom初始化
    paramNewDomInit: function () {
      this.prevBtnDom = F.query('#' + this.prevBtnId);
      this.nextBtnDom = F.query('#' + this.nextBtnId);
    },

    //================================== 模型层 =====================================
    //获取单页移动距离
    modelGetPageMoveDist: function () {

      var getDist = function (dom, attr) {
        return parseInt(F.css(dom, attr).split('px')[0], 10);
      };

      var li = F.query('#' + this.listId + ' li')[0];
      var liWidth = 0;

      liWidth += F.width(li);
      liWidth += getDist(li, 'marginLeft');
      liWidth += getDist(li, 'marginRight');
      liWidth += getDist(li, 'paddingLeft');
      liWidth += getDist(li, 'paddingRight');

      return liWidth * this.pageSize;
    },
    //================================== 视图层 =====================================
    //整体模板初始化
    viewWhole: function () {
      var arr = [];

      //上一页
      arr.push('<div class="leftBtn" id="' + this.prevBtnId + '" style="cursor: default;">');
      arr.push('<img src="http://p0.ifengimg.com/fe/zx2/images/videoBtn_left.jpg" alt="上一页" width="28" height="28">');
      arr.push('</div>');
      //内容列表
      arr.push('<div class="photoBox">');
      arr.push('<div class="content" id="scrollAside">');
      arr.push('<ul class="smallPhoto" id="' + this.listId + '"></ul>');
      arr.push('</div>');
      arr.push('</div>');
      //下一页
      arr.push('<div class="rightBtn" id="' + this.nextBtnId + '" style="cursor: default;">');
      arr.push('<img src="http://p0.ifengimg.com/fe/zx2/images/videoBtn_right.jpg" alt="下一页" width="28" height="28">');
      arr.push('</div>');
      //未知div
      arr.push('<div class="clear"></div>');

      return arr.join('');
    },

    //内容列表模板
    viewList: function (items) {
      var arr = [],
          _this = this;
      
      F.each(items, function (index, item) {
        item.cName = (index === _this.curPlayIndex) ? 'current' : '';
        arr.push(_this.viewItem(item));
      });

      return arr.join('');
    },

    //单条内容模板
    viewItem: function (item) {
      var arr = [];
      
      arr.push('<li data-id="' + item.vid + '" class="' + item.cName + '">');
      arr.push('<img src="' + item.previewImg + '" width="104" height="74">');
      arr.push('<s><a style="cursor:pointer;">' + item.title + '</a></s>');
      arr.push('<div class="play">');
      arr.push('<img alt="' + item.title + '" src="http://p0.ifengimg.com/fe/zx2/images/video.png">');
      arr.push('</div>');
      arr.push('</li>');

      return arr.join('');
    },

    //显示当前播放视频集数信息
    viewInfo: function (info) {
      var arr = [];

      arr.push('正在看第<span>' + info.curPlayIndex + '</span>段  ');
      arr.push('共<span id="totalProgram">' + info.totalCounts + '</span>段');

      return arr.join('');
    },
    
    //================================== 控制层 =====================================
    //初始化分页信息
    ctrlInitPageInfo: function () {
      //初始化当前页
      this.cpage = 1;
      //初始化总页数
      var size = this.pageSize,
          len = this.data.length;

      if (len < size) {
        this.tpage = 1;
      
      } else {
        var rem = len % size;
        this.tpage = (rem === 0) ? (len / size) : ((len - rem) / size + 1);
      }
      //初始化单页移动的距离
      this.sPageMoveDist = this.modelGetPageMoveDist();
    },

    //更新翻页后的状态
    ctrlUpdateState: function () {
      var cursorStr = '',
          _this = this;

      //位置定位
      _this.moveLock = true;
      F.animate(F.query('#' + _this.listId), {'marginLeft': _this.sPageMoveDist * (_this.cpage - 1) * -1 + 'px'}, 300, {callback: function () {
        //删除移动锁
        _this.moveLock = false;
      }});
      

      //上一页按钮点击状态
      cursorStr = (_this.cpage === 1) ? 'default' : 'pointer';
      F.css(_this.prevBtnDom, 'cursor', cursorStr);
      cursorStr = (_this.cpage === _this.tpage) ? 'default' : 'pointer';
      F.css(_this.nextBtnDom, 'cursor', cursorStr);

      //播放内容
      if (_this.curPlayIndex !== _this.playIndex) {
        var items = F.query('#' + _this.listId + ' li');
        //重置当前播放内容索引位置
        _this.curPlayIndex = _this.playIndex;

        //显示播放集数信息
        var infoDom = F.query('#' + _this.playInfoId);

        if (infoDom.length > 0) {
          var info = {};
          info.curPlayIndex = _this.curPlayIndex + 1;
          info.totalCounts = items.length;
          F.html(infoDom, _this.viewInfo(info));
        }
        
        //获取内容id
        var vid = F.attr(items[_this.curPlayIndex], 'data-id');
        //播放
        _this.playVideo(vid);
        //焦点内容状态
        F.removeClass(items, 'current');this
        F.addClass(items[_this.curPlayIndex], 'current');
      }
    },

    //事件初始化
    ctrlEventInit: function () {
      var _this = this;
      
      //上一页
      F.on(_this.conDom, 'click', function () {
        
        if (!_this.moveLock) {
      
          if (_this.cpage > 1) {
            _this.cpage--;
            //更新翻页按钮可点击状态
            _this.ctrlUpdateState();
          }
        }
        return false;
      }, {
        delegate: '#' + _this.prevBtnId
      });

      //下一页
      F.on(_this.conDom, 'click', function () {

        if (!_this.moveLock) {
          
          if (_this.cpage < _this.tpage) {
            _this.cpage++;
            _this.ctrlUpdateState();
          }
        }
        return false;
      }, {
        delegate: '#' + _this.nextBtnId
      });

      //单条内容点击
      F.on(F.query('#' + _this.listId), 'click', function () {
        _this.ctrlPlayVideoByIndex(this);
        return false;
      }, {
        delegate: 'li'
      });
    },

    //通过节点来播放文件
    ctrlPlayVideoByIndex: function (dom) {
      var _this = this;
      var vid = F.attr(dom, 'data-id'),
          playIndex = -1;
      //定位当前li的playIndex
      F.each(F.query('#' + _this.listId + ' li'), function (index, li) {
        var id = F.attr(li, 'data-id');

        if (id === vid) {
          playIndex = index;
          return false;
        }
      });

      //如果点击与当前播放内容不同视频
      if (_this.curPlayIndex !== playIndex) {
        _this.playIndex = playIndex;
        //更新翻页按钮可点击状态
        _this.ctrlUpdateState();
      }
    },
    // regCallback : function(){
    //     window.swfplay = this.swfplay;  
    // },
    // swfplay : function(swfindex){
    //         if(this.autoLoop == 'true'||swfindex != (this.data.length-1)){
    //             this.playVideo(++swfindex);
    //         }
    // }

  };
  
  //============================= 外部调用接口 ===============================
  //初始化
  List.prototype.init = function () {

    if (this.flag) {

      if (this.data.length > 1) {
        //整体内容初始化
        F.html(this.conDom, this.viewWhole());
        //显示内容
        F.html(F.query('#' + this.listId), this.viewList(this.data));
        //新节点dom初始化
        this.paramNewDomInit();
        //分页信息初始化
        this.ctrlInitPageInfo();
        //初始化按钮状态
        this.ctrlUpdateState();
        //事件初始化
        this.ctrlEventInit();
      } else if (this.data.length === 1) {
        this.playVideo(this.data[0].vid);
      }
    }
  };

  //通过索引值播放内容 playIndex参数说明: number 当前播放内容在列表中的索引位置
  List.prototype.playVideByIndex = function (playIndex) {

    if (typeof this.data === 'undefined' || !(this.data instanceof Array) && this.data.length === 0) {
      return;
    }

    if (typeof playIndex === 'number' && playIndex >= 0 && playIndex < this.data.length) {
      this.ctrlPlayVideoByIndex(F.query('#' + this.listId + ' li')[playIndex]);
    }
  };

  return List;

});

/**
 * @description : 该模块用于控制相关视频播放列表功能
 *
 * @import:  1) F-amd.js
 *
 * @date : 2013-11-01
 *
 * @version : 1.0.1
 *
 * @updateTime : 2013-11-01
 *
 * @use example:
 *
 *                //下面配置参数都有默认值，如果不写都采用默认值
 *                var settings = {
 *                  conId: 'js_video_list',        //列表容器id
 *                  playInfoId: 'js_video_info',   //播放信息容器id
 *                  pageSize: 4,                   //分页大小
 *                  playIndex: 0,                  //当前播放索引
 *                  data: videoInfo,               //内容列表
 *                  playVideo: function (vid) {}   //播放单条内容触发的方法
 *                };
 *                var list = new List(settings);
 *
 *                //生成播放列表，该方法会调用settings.playVideo方法，自动生成settings.playIndex指定flash内容
 *                list.init();
 *
 *                //通过index指定播放列表中指定内容，该接口也是通过settings.playVideo参数实现
 *                list.playVideByIndex(index);
 *
 * @updateLog :
 *
 *      1.0.1 - 控制相关视频播放列表功能
 */
 //;
/**
 * @description : 该模块用于实现播放器代码功能。
 * @version     : 1.0.3
 *
 **/

define('video.pc.player',[], function () {

  

  /**
   * @description : 该模块用于实现播放器代码功能。
   *
   * @date : 2013-10-28
   *
   * @version : 1.0.3
   *
   * @updateTime : 2014-02-28
   *
   * @use example:
   *
   *               var settings = {
   *                 guid: vid,          //播放内容guid
   *                 width: '480',       //视频宽
   *                 height: '380',      //视频高
   *                 AutoPlay: 'false'   //是否自动播放
   *               };
   *               var player = new Player('js_videoBox', settings);  //js_videoBox是容器id
   *
   *               //添加标签方法
   *               player.addParam('src', 'http://img.ifeng.com/swf/zuheVplayer_v5.0.22.swf');
   *               player.addParam('width', '480');
   *               player.addParam('height', '380');
   *
   *               //添加回调方法
   *               player.addCallback('goPage', function (urlstr) {
   *                 window.open(urlstr);
   *               });
   *
   *               //播放内容
   *               player.play();
   *
   * @updateLog :
   *
   *      1.0.1 - 播放器代码功能
   *      1.0.2 - 更新了播放器版本
   *      1.0.3 - 修正了当设置flash版本时，在IE下无法播放的bug
   */

  //工具类
  var Util = {};
  //合并对象方法
  Util.merage = function (s, t) {

    if (!t) {
      return s;
    }

    for (var i in t) {
      s[i] = t[i];
    }

    return s;
  };

  //获取cookie
  Util.getCookie = function (name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            return (function(offset){
                var endstr = document.cookie.indexOf (";", offset);
                if (endstr == -1) {
                    endstr = document.cookie.length;
                }
                return decodeURIComponent(document.cookie.substring(offset, endstr));
            })(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break; 
    }
    return "";
  };

  //设置cookie
  Util.setCookie = function (name, value, params) {    
    var cStrArr = [];
    cStrArr.push(name + '=' + encodeURIComponent(value));
    
    if (typeof params === 'undefined') {
      params = {};
    }
    if (typeof params.expires !== 'undefined') {
      var date = new Date();
      date.setTime(date.getTime() + (params.expires) * 1000 * 60);
      cStrArr.push('; expires=' + date.toGMTString());
    }
    cStrArr.push((typeof params.path !== 'undefined') ? '; path=' + params.path : '');
    cStrArr.push((typeof params.domain !== 'undefined') ? '; domain=' + params.domain : '');
    cStrArr.push((typeof params.secure !== 'undefined') ? '; secure' : '');

    document.cookie = cStrArr.join('');
  };

  //业务函数
  var Service = {};

  //获取uid
  Service.getUid = function () {
    
    if (Util.getCookie('userid') === '') {
      var date = new Date().getTime(),
          uid = '',
          fn = '',
          sn = '';

      fn = ((Math.random() * 2147483648) | 0).toString(36);
      sn = Math.round(Math.random() * 10000);
      uid = date + '_' + fn + sn;
      Util.setCookie('userid', uid, {domain: '.ifeng.com', path: '/', expires: 60 * 24 * 360});
    }

    return Util.getCookie('userid');
  };

  //获取from
  Service.getFrom = function () {
    var from = '',
        url = window.location.href;
    var startIndex = url.indexOf('http://') + 'http://'.length,
        endIndex = url.indexOf('.ifeng.com');

    if (startIndex !== -1 && endIndex !== -1) {
      from = url.substr(startIndex, (endIndex - startIndex));
      return from;
    }

    return from;
  };

  //获取sid
  Service.getSid = function () {
    return Util.getCookie('sid');
  };

  //公共参数
  var COMMON_CONFIG = {
    width: '480',
    height: '380',
    version: [10, 0, 200]
  };
  //默认参数
  var PARAMS = {
    //默认flash播放参数
    DEF_FLASH_VARS: {
      from: Service.getFrom(),
      PlayerName: 'VZHPlayer',
      adType: '1',
      AutoPlay: 'false',
      adPlay: 'true',
      width: COMMON_CONFIG.width,
      height: COMMON_CONFIG.height,
      uid: Service.getUid(),
      sid: Service.getSid(),
      ADOrderFirst: 1
    },

    //object标签参数
    OBJECT_TAG_PARAMS: {
      classId: 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000',
      codeBase: 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0',
      width: COMMON_CONFIG.width,
      height: COMMON_CONFIG.height,
      id: 'fplay'
    },

    //object 默认标准param参数
    OBJECT_STD_PARAMS: {
      _cx: '12700',
      _cy: '10054',
      movie: 'http://img.ifeng.com/swf/zuheVplayer_v5.0.25.swf',
      src: 'http://img.ifeng.com/swf/zuheVplayer_v5.0.25.swf',
      wMode: 'Transparent',
      play: '0',
      loop: '-1',
      quality: 'High',
      sAlign: 'LT',
      menu: '-1',
      base: '',
      allowScriptAccess: 'always',
      scale: 'NoScale',
      deviceFont: '0',
      embedMovie: '0',
      bgColor: '',
      swRemote: '',
      movieData: '',
      seamlessTabbing: '1',
      profile: '0',
      profileAddress: '',
      profilePort: '0',
      allowNetworking: 'all',
      allowFullScreen: 'true',
      allowFullScreenInteractive: 'false',
      isDependent: 'value'
    },

    //embed默认标签参数
    EMBED_TAG_PARAMS: {
      src: '',
      width: COMMON_CONFIG.width,
      height: COMMON_CONFIG.height,
      allowfullscreen: 'true',
      wmode: 'transparent',
      allowscriptaccess: 'always',
      pluginspage: 'http://www.macromedia.com/go/getflashplayer',
      type: 'application/x-shockwave-flash',
      id: 'fplay'
    }
  };

  //播放器对象
  var Player = function (elmId, settings) {
    
    if (!elmId) {
      return;
    }
    //缓存flash参数
    this.variables = settings;
    //缓存dom
    this.el = document.getElementById(elmId);
    //标签参数
    this.params = {};
    //初始化回调函数
    this.initCallback();
  };

  Player.prototype = {
    //添加标签属性
    addParam: function (name, value) {
      this.params[name] = value;
    },
    
    //添加播放参数
    addVariable: function (name, value) {
      this.variables[name] = value;
    },

    //获取标签参数字符串
    getTagParamString: function (param) {
      var arr = [], i;
       //遍历合并
      for (i in param) {
        arr.push(i + '=' + param[i] + ' ');
      }

      return arr.join('');
    },
    
    //合并播放参数
    getVariableString: function () {
      var arr = [],
          vars = this.variables;

      //遍历合并
      for (var i in vars) {
        arr.push(i + '=' + vars[i]);
      }
      return arr.join('&');
    },

    //合并标签参数
    getParamString: function (isIE) {
      var arr = [], i,
          params = this.params;

      //合并设置播放参数
      this.variables = Util.merage(PARAMS.DEF_FLASH_VARS, this.variables);
      params.movie = params.src;

      if (isIE) {
        //合并object标准属性对象
        params = Util.merage(PARAMS.OBJECT_STD_PARAMS, params);
        //设置flash播放参数
        params.flashVars = this.getVariableString();
        //生成object标签参数字符串
        for (i in params) {
          arr.push('<param name="' + i + '" value="' + params[i] + '">');
        }

        return arr.join('');
      
      } else {
        //合并embed标签属性对象
        params = Util.merage(PARAMS.EMBED_TAG_PARAMS, params);
        //设置flash播放参数
        params.flashVars = this.getVariableString();
        //生成embed标签参数字符串
        return this.getTagParamString(params);
      }
    },

    //添加回调参数
    addCallback: function (callbackName, method, scope) {
      scope = scope || window;
      window[callbackName] = function () {
        return method.apply(scope, arguments);
      };
    },

    // 这个应该是调用扩展吧。
    callExternal : function (movieName, method, param, mathodCallback) {
      var o = navigator.appName.indexOf('Microsoft') !== -1 ? window[movieName] : document[movieName];
      o[method](param, mathodCallback);
    },

    //生成播放器代码
    play : function () {
      var fls = this.getVersion(),
          v = COMMON_CONFIG.version;
      
      // 如果当前浏览器flash版本号低于设置中规定的版本
      if (parseInt(fls[0], 10) < v[0] && parseInt(fls[1], 10) < v[1] && parseInt(fls[2], 10) < v[2]) {
        this.el.innerHTML = '<a style="display:block;height:31px;width:190px;line-height:31px;font-size:12px;text-decoration:none;text-align:center;position:absolute;top:100px;left:410px;border:2px outset #999;" href="http://get.adobe.com/flashplayer/" target="_blank">请下载最新版的flash播放器</a>';
        return;
      }
      var flash = [];
      
      if (!!window.ActiveXObject) {
        //拼接html代码
        flash.push('<object ');
        flash.push(this.getTagParamString(PARAMS.OBJECT_TAG_PARAMS) + '>');
        flash.push(this.getParamString(true));
        flash.push("</object>");
      
      } else {
        //拼接html代码
        flash.push('<embed ');
        flash.push(this.getParamString(false));
        flash.push('>');
      }


      this.el.innerHTML = flash.join('');

      if (PARAMS.DEF_FLASH_VARS.ADOrderFirst === 1) {
        PARAMS.DEF_FLASH_VARS.ADOrderFirst = 0;
      }
    },

    //获取flash插件版本
    getVersion : function () {
      var b = [0, 0, 0];
      var c, f;
      
      if (navigator.plugins && navigator.mimeTypes.length) {
        var plugins = navigator.plugins["Shockwave Flash"];
        
        if (plugins && plugins.description) {
          return plugins.description.replace(/^\D+/, "").replace(/\s*r/, ".").replace(/\s*[a-z]+\d*/, ".0").split(".");
        }
      }
      
      if (navigator.userAgent && navigator.userAgent.indexOf("Windows CE") !== -1) {
        c = 1;
        f = 3;
        
        while (c) {
          
          try {
            c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + (++f));
            return [f, 0, 0];
          
          } catch (d) {
            c = null;
          }
        }
      }
      
      try {
        c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
      
      } catch (d) {
        
        try {
          c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
          b = [6, 0, 21];
          c.AllowScriptAccess = "always";
        
        } catch (event) {
          
          if (b.major === 6) {
            return event;
          }
        }
        
        try {
          c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
        
        } catch (event) {}
      }

      if (c) {
        b = c.GetVariable("$version").split(" ")[1].split(",");
      }
      return b;
    },

    //初始化回调方法
    initCallback: function () {
      //命令播放器暂停播放
      this.addCallback('videoPause', function () {});
      //命令播放器开始播放
      this.addCallback('videoPlay', function () {});
      //打开新页面
      this.addCallback('goPage', function (url) {});
      //返回下一条guid
      this.addCallback('getNextGuid', function () {});
      //页面跳转到评论区
      this.addCallback('toTalkBox', function () {});
      //拉幕广告播放完调用
      this.addCallback('miniBarShow', function () {});
      //拉幕广告播放前调用
      this.addCallback('miniBarHide', function () {});
      
      //通知页面一条视频播放完毕
      this.addCallback('swfPlayOver', function (guid) {});
      //分享到各个网站
      this.addCallback('shareTo', function (site, pic, url, title, smallimg) {});
      //存储播放记录
      this.addCallback('writecookie', function (guid, param) {});
      //视频列表 获取页面同期视频列表
      this.addCallback('getRecommendData', function () {});
      //视频播放完调用 判断是不是最后一条视频
      this.addCallback('swfplay', function (swfindex) {});
      //通知页面当前播放那条视频
      this.addCallback('setGalleryCurrent', function () {});
      
      //通知播放器开灯状态
      this.addCallback('lightOn', function () {});
      //通知播放器关灯状态
      this.addCallback('lightOff', function () {});
      //指定视频的guid播放(牛视)
      this.addCallback('playGuid', function (guid) {});
    }
  };

  return Player;
});
//控制自动播放否
define('auto',[],function(){
     var checkbox = document.getElementById('autoplay');
     var Util = {};
     var checkBloone = checkbox.checked;
     Util.setCookie = function (name, value, params) {    
        var cStrArr = [];
        cStrArr.push(name + '=' + encodeURIComponent(value));
        
        if (typeof params === 'undefined') {
          params = {};
        }
        if (typeof params.expires !== 'undefined') {
          var date = new Date();
          date.setTime(date.getTime() + (params.expires) * 1000 * 60);
          cStrArr.push('; expires=' + date.toGMTString());
        }
        cStrArr.push((typeof params.path !== 'undefined') ? '; path=' + params.path : '');
        cStrArr.push((typeof params.domain !== 'undefined') ? '; domain=' + params.domain : '');
        cStrArr.push((typeof params.secure !== 'undefined') ? '; secure' : '');
        var cookieStr = cStrArr.join('');
        console.log(cookieStr);
        document.cookie = cookieStr;
        console.log(document.cookie);
     };
     Util.getCookie = function (name) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg) {
                return (function(offset){
                    var endstr = document.cookie.indexOf (";", offset);
                    if (endstr == -1) {
                        endstr = document.cookie.length;
                    }
                    return decodeURIComponent(document.cookie.substring(offset, endstr));
                })(j);
            }
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0) break; 
        }
        return "";
     };
     checkbox.onclick = function(){
        checkBloone = checkbox.checked + "";
        Util.setCookie('cookieBloone',checkBloone,{domain: '.ifeng.com', path: '/', expires: 60 * 24 * 360});
     };
     var setBloo = Util.getCookie('cookieBloone');
     var bloo;
     if (setBloo == 'true' ) {
         bloo = true;
     }else if (setBloo == 'false'){
         bloo = false;
     }else{
         bloo = true;
     }

     checkbox.checked = bloo;
     return {
        setStr : Util.getCookie('cookieBloone')
     }
})










/*
 * @description : 该模块用于控制相关视频播放列表和播放器生成功能
 * @version     : 1.0.1
 *
 **/

define('video.pc',['F',
        'video.pc.list',
        'video.pc.player','auto'], function (F, List, Player,auto) {

  
  
  var Video = function (settings) {

    if (typeof settings !== 'undefined') {
      this.conId = (typeof settings.videoListId !== 'undefined') ? settings.videoListId : 'js_video_list';
      this.playInfoId = (typeof settings.videoInfoId !== 'undefined') ? settings.videoInfoId : 'js_video_info';
      this.data = (typeof settings.videoListData !== 'undefined') ? settings.videoListData : videoInfo;
      this.pageSize = (typeof settings.videoListPageSize !== 'undefined') ? settings.videoListPageSize : 4;
      this.playIndex = (typeof settings.playIndex !== 'undefined') ? settings.playIndex : 0;
      this.swf = (typeof settings.flashSWF !== 'undefined') ? settings.flashSWF : 'http://img.ifeng.com/swf/zuheVplayer_v5.0.22.swf';
      this.width = (typeof settings.flashWidth !== 'undefined') ? '' + settings.flashWidth : '480';
      this.height = (typeof settings.flashHeight !== 'undefined') ? '' + settings.flashHeight : '380';
      this.autoLoop = (typeof settings.autoLoopInput !== 'undefined') ? settings.autoLoopInput  : 'true';
    }
  };

  Video.prototype.init = function (flag) {

    var _this = this;
    //播放列表
    var listParams = {
      //列表容器id
      conId: _this.conId,
      //播放信息容器id
      autoLoop: _this.autoLoop,

      playInfoId: _this.playInfoId,
      //分页大小
      pageSize: _this.pageSize,
      //当前播放索引
      playIndex: _this.playIndex,
      //内容列表
      data: _this.data,
      //播放单条内容触发的方法
      playVideo: function (vid) {        //视频播放
        var settings = {
            guid: vid,
            width: '480',
            height: '380',
            AutoPlay: flag || auto.setStr
          };
        var player = new Player('js_videoBox', settings);
        player.addParam('src', _this.swf);
        player.addParam('width', _this.width);
        player.addParam('height', _this.height);
        
        //跳转方法
        player.addCallback('goPage', function (urlstr) {
          window.open(urlstr);
        });

        //视频播放完调用 判断是不是最后一条视频
        player.addCallback('swfplay', function () {

          if (typeof list !== 'undefined') {
            if (list.data.length > 1) {
              var constnum = list.playIndex
              var source = constnum + 1;
              var playindex = parseInt(source) % list.data.length;
              list.playVideByIndex(playindex);
            }
          }
        });

        //分享到各个网站
        player.addCallback('shareTo', function (site, pic, url, title, smallimg) {
          var videoinfo = videoinfo || {url: document.location.href, title: document.title};
          var e = encodeURIComponent;
          var vlink = url || videoinfo.url;//'http://v.ifeng.com/news/world/201101/57b5bddb-36b4-4178-90d3-0f96bad889af.shtml';
          var _url = e(vlink);
          var vtitle = title || videoinfo.title;
          var _title = e(vtitle);
          /*if (eval("_oFlv_c.Content != null")) {
              _content = encodeURIComponent(_oFlv_c.Content);
          }*/
          switch (site) {
            
          case "ifengkuaibo" :
            break;

          case "ifengteew" :
            var t = _title, z = _url, id = "凤凰视频", type = 1, s = screen;
            var f = "http://t.ifeng.com/interface.php?_c=share&_a=share&", pa = ["sourceUrl=", _url, "&title=", _title, "&pic=", e(smallimg || ""), "&source=", e(id || ""), "&type=", e(type || 0)].join("");
            
            var a = function () {
              if (!window.open([f, pa].join(""), "", ["toolbar=0,status=0,resizable=1,width=640,height=481,left=", (s.width - 640) / 2, ",top=", (s.height - 480) / 2].join(""))) {
                location.href = [f, pa].join("");
              }
            }

            if (/Firefox/.test(navigator.userAgent)) {
              setTimeout(a, 0);
            
            } else {
              a();
            }
            break;

          case "kaixin" :
            window.open("http://www.kaixin001.com/repaste/share.php?rurl=" + _url + "&rtitle=" + _title);
            break;

          case "renren":
            window.open("http://share.renren.com/share/buttonshare.do?link=" + _url + "&title=" + _title);
            break;

          case "sinateew" :
            var l = (screen.width - 440) / 2;
            var t = (screen.height - 430) / 2;
            var smallimg = smallimg || "";

            F.ajax({
              url: 'http://api.t.sina.com.cn/friendships/create/1806128454.xml?source=168486312',
              dataType: 'script',
              success: function () {}  //没有回调
            });
            window.open("http://v.t.sina.com.cn/share/share.php?appkey=168486312&url=" + _url + "&title=" + _title + "&source=ifeng&sourceUrl=http://v.ifeng.com/&content=utf8&pic=" + smallimg + "&ralateUid=1806128454", "_blank", "toolbar=0,status=0,resizable=1,width=440,height=430,left=" + l + ",top=" + t);
            break;

          case "qqzone" :
            window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + _url);
            break;
          
          case "qqteew" :
            var _appkey = encodeURI("f8ca1cd768da4529ab190fae9f1bf21d"), _pic = encodeURI(smallimg || ""), _site = "http://v.ifeng.com";
            var _u = "http://v.t.qq.com/share/share.php?title=" + _title + "&url=" + _url + "&appkey=" + _appkey + "&site=" + _site + "&pic=" + _pic;
            window.open(_u, "\u8F6C\u64AD\u5230\u817E\u8BAF\u5FAE\u535A", "width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no");
            break;

          case "163" :
            var url = "link=http://www.ifeng.com&source=" + encodeURIComponent("凤凰网") + "&info=" + _title + " " + _url;
            window.open("http://t.163.com/article/user/checkLogin.do?" + url + "&" + new Date().getTime(), "newwindow", "height=330,width=550,top=" + (screen.height - 280) / 2 + ",left=" + (screen.width - 550) / 2 + ", toolbar=no, menubar=no, scrollbars=no,resizable=yes,location=no, status=no");
            break;

          case "feixin" :
            var u = "http://space.fetion.com.cn/api/share?Source=" + encodeURIComponent("凤凰视频") + "&Title=" + _title + "&url=" + _url + "&IsEditTitle=false";
            window.open(u, "newwindow", "top=" + (screen.height - 280) / 2 + ",left=" + (screen.width - 550) / 2 + ", toolbar=no, menubar=no, scrollbars=no,resizable=yes,location=no, status=no");
            break;

          case "sohuteew" :
            var s = screen, z = vlink, t = vtitle;
            var f = "http://t.sohu.com/third/post.jsp?", p = ["&url=", e(z), "&title=", e(t), "&content=utf-8", "&pic=", e(smallimg || "")].join("");
            var b = function () {
              if (!window.open([f, p].join(""), "mb", ["toolbar=0,status=0,resizable=1,width=660,height=470,left=", (s.width - 660) / 2, ",top=", (s.height - 470) / 2].join(""))) {
                location.href = [f, p].join("");
              }
            }

            if (/Firefox/.test(navigator.userAgent)) {
              setTimeout(b, 0);
            } else {
              b();
            }
            break;

          case "51com" :
            var u = "http://share.51.com/share/out_share_video.php?from=" + encodeURIComponent("凤凰视频") + "&title=" + _title + "&vaddr=" + _url + "&IsEditTitle=false&charset=utf-8";
            window.open(u, "newwindow", "top=" + (screen.height - 280) / 2 + ",left=" + (screen.width - 550) / 2 + ", toolbar=no, menubar=no, scrollbars=no,resizable=yes,location=no, status=no");
            break;

          case "baiduI":
            var u = 'http://tieba.baidu.com/i/app/open_share_api?link=' + _url,
                o = function () {
                  if (!window.open(u)) {
                    location.href = u;
                  }
                };

            if (/Firefox/.test(navigator.userAgent)) {
              setTimeout(o, 0);

            } else {
              o();
            }
            
            return false;

          default:
            return false;
          }
        });

        player.play();
      }
    };
    var list = new List(listParams);
    list.init();
  };

  return Video;

});

/**
 * @description : 该模块用于控制相关视频播放列表和播放器生成功能
 *
 * @import:  1) F-amd.js
 *
 * @date : 2013-11-02
 *
 * @version : 1.0.1
 *
 * @updateTime : 2013-11-02
 *
 * @use example:
 *
 *              //下面配置参数都有默认值，如果不写都采用默认值
 *              var settings = {
 *                videoListPageSize: 4,                                            //播放列表单页内容最大数
 *                playIndex: 0,                                                    //当前播放内容索引值
 *                flashSWF: 'http://img.ifeng.com/swf/zuheVplayer_v5.0.22.swf',    //falsh文件
 *                flashWidth: 480,                                                 //flash宽
 *                flashHeight: 380,                                                //flash高
 *                videoListId: 'js_video_list',                                    //列表容器id
 *                videoInfoId: 'js_video_info',                                    //播放信息容器id
 *                videoListData: videoInfo                                         //内容列表
 *              };
 *
 *              var video = new Video(settings);
 *              video.init();
 *
 * @updateLog :
 *
 *      1.0.1 - 控制相关视频播放列表功能
 */
 //;