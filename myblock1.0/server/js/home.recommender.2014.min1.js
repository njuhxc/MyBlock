/**
 * Created by lulu15 on 17/9/25.
 */
/*!
 * sina.com.cn/license
 * svn:../ui/product/recommender/trunk
 * 20140814111122
 * [${p_id},${t_id},${d_id}] published at ${publishdate} ${publishtime}
 */

(function (con) {
    function dummy() {}
    for(var methods = ['error','info','log','warn','clear'], func; func = methods.pop();) {
        con[func] = con[func] || dummy;
    }
}(window.console=window.console || {}));
console = window.console;
/**
 * 璺ㄥ瓙鍩熷瓨鍌紝ie6,7浣跨敤user data瀛樺偍锛屽叾瀹冩祻瑙堝櫒浣跨敤localstorage
 * @example
 *      // sina.com.cn鍩�,鏁版嵁瀛樺湪news.sina.com.cn涓�
 *      var Store = window.___CrossDomainStorage___;
 *      Store..ready(function(st){
 *          st.set('key','value');
 *          var data = st.get('key');
 *      });
 *      // 濡傛灉鐢ㄤ簬闈瀞ina.com.cn鍩燂紝闇€瑕佽缃紝濡�
 *      Store.config({
 *          // 璁剧疆椤剁骇鍩�
 *          domain:'weibo.com',
 *          // 鍙戝竷鍜宧ttp://news.sina.com.cn/iframe/87/store.html涓€鏍风殑浠ｇ悊椤甸潰锛屼互鍚庢暟鎹兘瀛樺湪data.weibo.com涓�
 *          url:'data.weibo.com/xx/xx/store.html'
 *      }).ready(function(st){
 *          st.set('key','value');
 *          var data = st.get('key');
 *      });
 */
;(function(exports,name) {
    var fns = [];
    var isReady = 0;
    var iframeStore = null;
    var EXPORTNAME = name||'___CrossDomainStorage___';
    var HANDLE = EXPORTNAME + '.onReady';
    var opt = {
        domain: 'sina.com.cn',
        url: '//news.sina.com.cn/iframe/87/store.html'
    };
    var ERROR = {
        domain: 'fail to set domain!'
    };
    var loadStore = function() {
        if(iframeStore){
            return;
        }
        try {
            document.domain = opt.domain;
        } catch (e) {
            throw new Error(ERROR.domain);
            return;
        }
        var node = document.getElementById(EXPORTNAME);
        if(node){
            node.parentNode.removeChild(node);
        }
        var iframeWrap = document.createElement('div');
        var doc = document.body;
        var iframe = '<iframe src="' + opt.url + '?handle=' + HANDLE + '&domain=' + opt.domain + '" frameborder="0"></iframe>';
        var px = '-'+1e5+'em';
        iframeWrap.style.position = 'absolute';
        iframeWrap.style.left = px;
        iframeWrap.style.top = px;
        iframeWrap.className = 'hidden';
        iframeWrap.id = EXPORTNAME;
        iframeWrap.innerHTML = iframe;
        doc.insertBefore(iframeWrap, doc.childNodes[0]);
    };

    var checkReady = function() {
        if (!isReady) {
            loadStore();
        }
        return isReady;
    };
    var CrossDomainStorage = {};
    CrossDomainStorage.ready = function(fn) {
        if (!checkReady()) {
            //ifrmae杩樻病鍔犺浇
            fns.push(fn);
            return;
        }
        fn(iframeStore);
    };
    CrossDomainStorage.onReady = function(store) {
        if (isReady) {
            return
        }
        isReady = 1;
        iframeStore = store;
        if (fns) {
            while (fns.length) {
                fns.shift()(store);
            }
        }
        fns = null
    };
    CrossDomainStorage.config = function(o) {
        if (!o) {
            return
        }
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                opt[i] = o[i] || opt[i];
            }
        }
        return this;
    };
    exports[EXPORTNAME] = CrossDomainStorage;
})(window);


;(function(exports){
    var Util = {
        byId: function(id) {
            return document.getElementById(id);
        },
        byAttr:function(node, attname, attvalue){
            var nodes = [];
            attvalue = attvalue||'';
            var getAttr = function(node){
                return node.getAttribute(attname);
            };
            for(var i = 0, l = node.childNodes.length; i < l; i ++){
                if(node.childNodes[i].nodeType == 1){
                    var fit = false;
                    if(attvalue){
                        fit = (getAttr(node.childNodes[i]) == attvalue);
                    }else{
                        fit = (getAttr(node.childNodes[i]) !='')
                    }
                    if(fit){
                        nodes.push(node.childNodes[i]);
                    }
                    if(node.childNodes[i].childNodes.length > 0){
                        nodes = nodes.concat(arguments.callee.call(null, node.childNodes[i], attname, attvalue));
                    }
                }
            }
            return nodes;
        },
        bindEvent: function(o, s, fn) {
            if (o.attachEvent) {
                o.attachEvent('on' + s, fn);
            } else {
                o.addEventListener(s, fn, false);
            }
            return o;
        },
        builder:function(wrap, type) {
            var list, nodes;
            nodes = this.byAttr(wrap,type);

            list = {};
            for(var i = 0, len = nodes.length; i < len; i++) {
                var j = nodes[i].getAttribute(type);
                if(!j){
                    continue;
                }
                list[j] || (list[j] = []);
                list[j].push(nodes[i])
            }
            return {
                box: wrap,
                list: list
            }
        },
        strLeft2:(function(){
            var byteLen = function(str){
                if(typeof str == "undefined"){
                    return 0;
                }
                var aMatch = str.match(/[^\x00-\x80]/g);
                return (str.length + (!aMatch ? 0 : aMatch.length));
            };
            return function(str,len){
                var s = str.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
                str = str.slice(0, s.slice(0, len).replace(/\*\*/g, " ").replace(/\*/g, "").length);
                if(byteLen(str) > len) str = str.slice(0,str.length -1);
                return str;
            };
        })(),
        isArray:function(o){
            return Object.prototype.toString.call(o) === '[object Array]';
        },
        getGuid:function(){
            return Math.abs((new Date()).getTime()) + '_' + Math.round(Math.random() * 1e8);
        },
        extend: function(target, source, deep) {
            target = target || {};
            var sType = typeof source,
                i = 1,
                options;
            if (sType === 'undefined' || sType === 'boolean') {
                deep = sType === 'boolean' ? source : false;
                source = target;
                target = this;
            }
            if (typeof source !== 'object' && Object.prototype.toString.call(source) !== '[object Function]') {
                source = {};
            }
            while (i <= 2) {
                options = i === 1 ? target : source;
                if (options !== null) {
                    for (var name in options) {
                        var src = target[name],
                            copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        if (deep && copy && typeof copy === 'object' && !copy.nodeType) {
                            target[name] = this.extend(src || (copy.length !== null ? [] : {}), copy, deep);
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
                i++;
            }
            return target;
        },
        cookie: (function() {
            /**
             * 璇诲彇cookie,娉ㄦ剰cookie鍚嶅瓧涓笉寰楀甫濂囨€殑瀛楃锛屽湪姝ｅ垯琛ㄨ揪寮忕殑鎵€鏈夊厓瀛楃涓紝鐩墠 .[]$ 鏄畨鍏ㄧ殑銆�
             * @param {Object} cookie鐨勫悕瀛�
             * @return {String} cookie鐨勫€�
             * @example
             * var value = co.getCookie(name);
             */
            var co = {};
            co.getCookie = function(name) {
                name = name.replace(/([\.\[\]\$])/g, '\\\$1');
                var rep = new RegExp(name + '=([^;]*)?;', 'i');
                var co = document.cookie + ';';
                var res = co.match(rep);
                if (res) {
                    return unescape(res[1]) || "";
                } else {
                    return "";
                }
            };

            /**
             * 璁剧疆cookie
             * @param {String} name cookie鍚�
             * @param {String} value cookie鍊�
             * @param {Number} expire Cookie鏈夋晥鏈燂紝鍗曚綅锛氬皬鏃�
             * @param {String} path 璺緞
             * @param {String} domain 鍩�
             * @param {Boolean} secure 瀹夊叏cookie
             * @example
             * co.setCookie('name','sina',null,"")
             */
            co.setCookie = function(name, value, expire, path, domain, secure) {
                var cstr = [];
                cstr.push(name + '=' + escape(value));
                if (expire) {
                    var dd = new Date();
                    var expires = dd.getTime() + expire * 3600000;
                    dd.setTime(expires);
                    cstr.push('expires=' + dd.toGMTString());
                }
                if (path) {
                    cstr.push('path=' + path);
                }
                if (domain) {
                    cstr.push('domain=' + domain);
                }
                if (secure) {
                    cstr.push(secure);
                }
                document.cookie = cstr.join(';');
            };

            /**
             * 鍒犻櫎cookie
             * @param {String} name cookie鍚�
             */
            co.deleteCookie = function(name) {
                document.cookie = name + '=;' + 'expires=Fri, 31 Dec 1999 23:59:59 GMT;';
            };
            return co;
        })(),

        // Util.jsonp(url, 'dpc=1', loadedFnName, true);
        jsonp: function(url, params, cb, fix) {
            var head = document.getElementsByTagName('head')[0];
            var idStr = url + '&' + params;
            var ojs = Util.byId(idStr);
            ojs && head.removeChild(ojs);
            var fun = '';
            var js = document.createElement('script');
            fix = fix || false;
            if (fix) {
                if (typeof cb == 'string') {
                    fun = cb;
                }
            } else {
                //娣诲姞鏃堕棿鎴�
                url = url + ((url.indexOf('?') == -1) ? '?' : '&') + '_t=' + Math.random();
                //娣诲姞鍥炶皟
                if (typeof cb == 'function') {
                    fun = 'fun_' + Util.getGuid();
                    eval(fun + '=function(res){cb(res)}');
                }
            }
            url = url + '&callback=' + fun;
            //娣诲姞鍙傛暟,鏀惧湪鏈€鍚庯紝dpc=1涓€鑸斁鍦ㄦ渶鍚�
            url = url + '&' + params;
            js.src = url;
            js.id = idStr;
            js.type = 'text/javascript';
            js.language = 'javascript';
            head.appendChild(js);

        },
        jsLoad: function(url, cb) {
            var head = document.getElementsByTagName('head')[0];
            var js = document.createElement('script'),
                isLoaded = false;
            js.onload = js.onreadystatechange = function() {
                if (!isLoaded && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                    isLoaded = true;
                    js.onload = js.onreadystatechange = null;
                    typeof cb == 'function' && cb();
                }
            };
            js.src = url;
            try {
                head.appendChild(js);
            } catch (e) {}
        },

        uaTrack : function(key,val){
            if(typeof _S_uaTrack == 'function'){
                try{
                    _S_uaTrack(key, val);
                }catch(e){}
            }
        },
        timeoutHandle:(function(){
            // events = {
            //     'id':{
            //         timer:null,
            //         time:10,
            //         isSuccess:false,
            //         timeout:function(){}
            //     }
            // };
            var events = [];
            var handle = {
                success:function(id){
                    var eve = events[id];
                    if(!eve){
                        return;
                    }
                    eve.isSuccess = true;
                    clearTimeout(eve.timer);

                },
                timeout: function(id, fn) {
                    var eve = events[id];
                    if (!eve) {
                        return;
                    }
                    eve.timer = setTimeout(function() {
                        if (eve.isSuccess) {
                            return;
                        }
                        if (typeof fn == 'function') {
                            fn.call(this);
                        }
                    }, eve.time);
                }
            };
            return function(id, fn, time) {
                if (events[id]) {
                    throw new Error(id + '宸茬粡琚崰鐢�');
                    return;
                }
                events[id] = {};
                events[id].time = time || 5e3;
                events[id].isSuccess = false;
                if (typeof fn == 'function') {
                    fn.call(this, handle);
                }
            }
        })(),
        queryToJson:function(query, isDecode){
            var qList = query.split("&");
            var json  = {};
            for(var i = 0, len = qList.length; i < len; i++){
                if(qList[i]){
                    hash = qList[i].split("=");
                    key = hash[0];
                    val = hash[1];
                    // 濡傛灉鍙湁key娌℃湁value,value璁剧疆涓�''
                    if(hash.length < 2){
                        val = '';
                    }
                    // 濡傛灉缂撳瓨鍫嗘爤涓病鏈夎繖涓暟鎹�
                    if(!json[key]) {
                        json[key] = val;
                    }
                }
            }
            return json;
        }
    };
    Util.app = {

        /**
         * 杩囨护鏈〉鍙娾€滃凡璇烩€濇暟鎹�
         * @param  {Array}   data 闇€瑕佽繃婊ょ殑鏁版嵁
         * @param  {Function} fn   杩囨护瀹屾暟鎹悗鐨勫洖璋冿紝杩囨护鍚庣殑鏁版嵁涓哄弬鏁�
         */
        filter:function(data,fn){
            var self = this;
            // 杩囨护鏁版嵁 浼氳繃婊ゆ帀鏈〉闈㈠強闃呰鍘嗗彶
            // 鎶婃湰椤垫坊鍔犲埌宸茶鏁扮粍閲岋紝鏂逛究缁熶竴杩囨护
            var addItSelf = (function(){
                var url = encodeURIComponent(location.href);
                var oUrl = decodeURIComponent((url.split('?')[0]).split('#')[0]);
                return function(arr){
                    arr.push(oUrl);
                    return arr;
                };
            })();

        }
    };
    var Clz = function(parent) {var klass = function() {this.init.apply(this, arguments); }; if(parent) {var subclass = function() {}; subclass.prototype = parent.prototype; klass.prototype = new subclass; }; klass.prototype.init = function() {}; klass.fn = klass.prototype; klass.fn.parent = klass; klass._super = klass.__proto__; klass.extend = function(obj) {var extended = obj.extended; for(var i in obj) {klass[i] = obj[i]; } if(extended) extended(klass) }; klass.include = function(obj) {var included = obj.included; for(var i in obj) {klass.fn[i] = obj[i]; } if(included) included(klass) }; return klass; };
    Util.Clz = Clz;
    /**
     * 鍏磋叮鏁版嵁鍔犺浇鍣�
     * @param {String} api 鎺ュ彛鍦板潃
     * @param {String} 鏁版嵁绫诲瀷 鍙€� '','video','slide','blog','news',榛樿涓�''
     * @param {Function} loadComplete 鍔犺浇瀹屾垚鍚庡洖璋冿紝鍔犺浇鍒版暟鎹负鍙傛暟
     */
    var Loader = new Clz;
    Loader.include({
        /**
         * 鍒濆鍖�
         */
        init:function(opt){
            var self = this;
            // 璁剧疆鐘舵€�
            self.setStat();
            // 璁剧疆閫夐」
            self.setOpt(opt);
            // 鑾峰彇鏁版嵁
            self.getData();
        },
        /**
         * 璁剧疆鐢ㄦ埛鑷畾涔夐€夐」
         * @param {Object} opt 鑷畾涔夐€夐」
         */
        setOpt:function(opt){
            var self = this;
            self.opt = self.opt || {
                    // 鏁版嵁鍦板潃
                    api: '//interest.mix.sina.com.cn/api/cate/get',
                    // 鏁版嵁绫诲瀷
                    type: '',
                    dpc:'',
                    // 鍔犺浇瀹屾垚鍚�
                    loadComplete: function() {},
                    // 瓒呮椂鏃堕棿
                    time:3e3,
                    // 瓒呮椂澶勭悊
                    error:function(msg){}
                };
            var selfOpt = self.opt;
            if(opt||''){
                selfOpt = Util.extend(selfOpt,opt,true);
            }
        },
        setStat:function(){
            var self = this;
            self._data = null;
        },
        /**
         * 鑾峰彇guid,濡備綍涓嶅瓨鍦紝鍒欑妞嶈cookie鍚庤繑鍥�
         * @return {String} guid
         */
        getGuid:function(){
            // 妫€娴媍ookie鏄惁鏈塯uid鍙奼uid鍚堟硶鎬�
            var isVaild = function(guid){
                guid = parseInt(guid||'0');
                if(guid<=0){
                    return false;
                }
                return true;
            };
            // 鐢熸垚鏂扮殑guid
            var genGuid = function(){
                return Util.getGuid();
            };
            var cookie = Util.cookie;
            var guid = cookie.getCookie('SGUID');
            // 闈炴硶guid闇€瑕侀噸鏂扮敓鎴愶紝骞跺瓨鍌ㄥ埌cookie閲�
            if(!isVaild(guid)){
                guid = genGuid();
                // 5骞�
                cookie.setCookie('SGUID', guid, 43800, '/', 'sina.com.cn');
            }
            return guid;
        },
        /**
         * 鑾峰彇鍏磋叮鏁版嵁
         */
        getData:function(){
            var self = this;
            var opt = self.opt;

            var loadedFnName = 'cb_'+Util.getGuid();
            var TIMEOUT_NAME = 'loadrecommenderdata'+Util.getGuid();
            var guid = self.getGuid();
            var api = self.opt.api;
            var dpcParam = opt.dpc?'dpc=1':'';
            if(api.indexOf('?')!=-1){
                api = api+'&';
            }else{
                api = api+'?';
            }
            var url = api + 'rnd=' + Util.getGuid();
            Util.timeoutHandle(TIMEOUT_NAME, function(handle) {
                // 鍥炶皟
                exports[loadedFnName] = function(msg) {
                    handle.success(TIMEOUT_NAME);
                    self._data = msg;
                    // 瀛樺湪鏁版嵁
                    if(msg.data&&msg.data.length>0){
                        self._loadComplete(msg);
                        opt.loadComplete(msg);
                    }else{
                        opt.error({
                            type:'invaild-data',
                            msg:'invail data'
                        });
                    }

                };
                // 瓒呮椂澶勭悊
                handle.timeout(TIMEOUT_NAME,function(){
                    opt.error({
                        type:'timeout',
                        msg:TIMEOUT_NAME+' '+opt.time+' timeout'
                    });
                });
                // 璇锋眰鏁版嵁
                Util.jsonp(url, dpcParam, loadedFnName, true);
            },opt.time);
        },
        _loadComplete: function(m) {}
    });
    /**
     * 鑾峰彇鍏磋叮鏁版嵁锛屽悗鎸変竴瀹氶€昏緫鍒嗛〉锛岄€氳繃pageComplete鍥炶皟杩斿洖鍒嗛〉鍚庣殑鏁版嵁
     * @param {Function} pageComplete 鍒嗛〉鍚庡洖璋冿紝鍒嗛〉鏁版嵁涓哄弬鏁�
     */
    var PageLoader = new Clz(Loader);
    PageLoader.include({
        /**
         * 鍒濆鍖�
         */
        init:function(opt){
            var self = this;
            // 璁剧疆閫夐」
            self.setOpt(opt);
            // 鑾峰彇鏁版嵁
            self.getData();
        },
        /**
         * 璁剧疆鐢ㄦ埛鑷畾涔夐€夐」
         * @param {Object} opt 鑷畾涔夐€夐」
         */
        setOpt:function(opt){
            var self = this;
            self.opt = self.opt || {
                    // 鏁版嵁鍦板潃
                    api: '//interest.mix.sina.com.cn/api/cate/get',
                    // 鏁版嵁绫诲瀷
                    type: '',
                    listNum: 10,
                    pageNum: 10,
                    handleData:function(){},
                    // 鍔犺浇瀹屾垚鍚�
                    loadComplete: function() {},
                    // 鍒嗛〉瀹屾垚鍚�
                    pageComplete: function(){},
                    // 瓒呮椂鏃堕棿
                    time:3e3,
                    // 瓒呮椂澶勭悊
                    error:function(msg){}
                };
            var selfOpt = self.opt;
            if(opt||''){
                selfOpt = Util.extend(selfOpt,opt,true);
            }

        },
        _loadComplete: function(msg) {
            var dataHandled = this.opt.handleData(msg);
            if (typeof dataHandled !== 'undefined' && dataHandled) {
                msg = dataHandled;
            }
            this.page(msg);
        },
        /**
         * 鍒嗛〉
         * @param  {Object} msg 鍒嗛〉鍓嶆暟鎹�
         */
        page: function(msg) {
            var arraySlice = function(data, listNum, pageNum) {
                var len = data.length,
                    index = 0,
                    to, i, pages = [];
                pageNum = pageNum || Infinity;
                listNum = listNum || len;
                for (i = 0; i < pageNum; i++) {
                    to = index + listNum;
                    if (to > len) {
                        break;
                    }
                    pages.push(data.slice(index, to));
                    index += listNum;
                }
                return pages;
            };
            var self = this;
            var data = [];
            if (msg) {
                if (msg.data) {
                    data = msg.data;
                }
                if (msg.top) {
                    data = data.concat(msg.top);
                }
            }
            var pages = arraySlice(data, parseInt(self.opt.listNum, 10), parseInt(self.opt.pageNum, 10));
            self.opt.pageComplete(pages);
        }
    });

    var Recommender = {};
    Recommender.register = function(namespace, method) {
        var i   = 0,
            un  = Recommender,
            ns  = namespace.split('.'),
            len = ns.length,
            upp = len - 1,
            key;
        while(i<len){
            key = ns[i];
            if(i==upp){
                if(un[key] !== undefined){
                    throw ns + ':: has registered';
                }
                un[key] = method;
            }
            if(un[key]===undefined){
                un[key] = {}
            }
            un = un[key];
            i++;
        }
    };
    Recommender.register('util',Util);
    Recommender.register('Clz',Clz);
    Recommender.register('Loader',Loader);
    Recommender.register('PageLoader',PageLoader);
    var EXPORTS_NAME = 'SinaRecommender';
    var UGLIFY_NAME = '___'+EXPORTS_NAME+'___';
    exports[UGLIFY_NAME] = Recommender;
    if(exports[EXPORTS_NAME]){
        throw '涓€у寲鎺ㄨ崘鍏ㄥ眬鍙橀噺鍚�"'+EXPORTS_NAME+'"宸茬粡琚崰鐢紝鍙娇鐢�'+UGLIFY_NAME;
    }else{
        exports[EXPORTS_NAME] = Recommender;
    }

})(window);

SHM.register('home.guess.init', function($) {
    var byId = $.dom.byId;
    var loaded = false;
    var PageLoader = null;
    var Scroller = null;
    var o = {};
    var uaTrack = function(key,val){
        if(typeof _S_uaTrack == 'function'){
            try{
                _S_uaTrack(key, val);
            }catch(e){}
        }
    };
    o.init = function() {
        var hasTouch = (typeof(window.ontouchstart) !== 'undefined');
        var viewCollect = (function(){
            var attr = 'page-data';
            var collected = {};
            var inited = false;
            var data = null;
            var collect = function(page){
                if(collected[page]){
                    return;
                }
                page = parseInt(page,10);
                var urls = (function(){
                    var urls = [];
                    var pageData = data[page];
                    for (var i = 0, len = pageData.length; i < len; i++) {
                        var item = pageData[i];
                        urls.push(encodeURIComponent(item.url));
                    }
                    return urls.join(',');
                })();
                uaTrack('recmd_news_view', urls);
                collected[page] = 1;
            };
            return function(wrap,pages){
                data = pages;
                if(inited){
                    return;
                }
                $.evt.addEvent(wrap,'click',function(e){
                    e = e||window.event;
                    var target = e.target || e.srcElement;
                    var page = target.getAttribute(attr);
                    if(page){
                        collect(page);
                    }
                });
            };

        })();
        var getGuessData = function() {
            var wrap = byId('SI_Guess_Wrap');
            if (!wrap) {
                return;
            }
            var pageLen = wrap.getAttribute('page-length') || Infinity;
            var listLen = wrap.getAttribute('list-length') || Infinity;
            var itemLen = wrap.getAttribute('item-length') || Infinity;
            var changeBtn = document.getElementById(wrap.getAttribute('change-btn')) || null;
            var byteLen = function(str) {
                var m = str.match(/[^\x00-\x80]/g);
                return (str.length + (!m ? 0 : m.length));
            };
            var strLeft2 = function(str, len) {
                var s = str.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
                str = str.slice(0, s.slice(0, len).replace(/\*\*/g, " ").replace(/\*/g, "").length);
                if (byteLen(str) > len) str = str.slice(0, str.length - 1);
                return str;
            };

            var cutTitle = function(title, type) {
                if (itemLen == Infinity) {
                    return title;
                }
                switch (type) {
                    case 'slide':
                        title = strLeft2(title, (itemLen - 1) * 2);
                        break;
                    case 'video':
                        title = strLeft2(title, (itemLen - 1) * 2);
                        break;
                    default:
                        title = strLeft2(title, itemLen * 2);
                        break;
                }
                return title;
            };

            var bindEvent = function() {
                var pages = wrap.getElementsByTagName('ul');
                var len = pages.length;
                if (len < 2) {
                    return;
                }
                // 鍒犻櫎涔嬪墠鍒濆鍖栨坊鍔犵殑浜嬩欢
                var control = byId('SI_Guess_Control');
                control && (control.style.display = '');
                if (control || Scroller) {
                    control.innerHTML = '<a class="mod-guess-prev" href="javascript:;" title="涓婁竴甯�" id="SI_Guess_Prev" hidefocus="true">涓婁竴甯�</a> <span class="mod-guess-dots" id="SI_Guess_Dots"> </span> <a class="mod-guess-next" href="javascript:;" title="涓嬩竴甯�" id="SI_Guess_Next" hidefocus="true">涓嬩竴甯�</a>';
                }
                var SC = new ScrollPic();
                SC.scrollContId = 'SI_Guess_Wrap';
                SC.dotListId = 'SI_Guess_Dots';
                SC.dotOnClassName = 'current';
                SC.listType = '';
                SC.listEvent = 'onmouseover';
                SC.frameWidth = 360;
                SC.pageWidth = 360;
                SC.upright = false;
                SC.speed = 20;
                SC.space = 25;
                SC.autoPlay = true;
                SC.autoPlayTime = 25;
                SC.circularly = true;
                SC.arrLeftId = 'SI_Guess_Prev';
                SC.arrRightId = 'SI_Guess_Next';
                SC.initialize();

                byId('SI_Guess_Prev').onmousedown = function() {
                    uaTrack('index_new_guess','change');
                }
                byId('SI_Guess_Next').onmousedown = function() {
                    uaTrack('index_new_guess','change');
                }
                Scroller = SC;
            };
            var html = '';
            var pageComplete = function(data){
                var pages = data,
                    list, item ,title,
                    html = '';
                var typeClz = {
                    '3':'videoNewsLeft',
                    '2':'slideNewsLeft'
                };
                var getType = function(t){
                    var type = typeClz[t];
                    return typeof type == 'undefined'?'':type;
                };
                var guess = function(item,i,linkProStr){
                    title = item.stitle ? item.stitle.replace(/<\/?[^>]*>/g, ''): item.title.replace(/<\/?[^>]*>/g, '');
                    var urls_param = item.url + "?cre=sinapc&mod=g";
                    var url = item.url;
                    if(url.indexOf('slide') > 0)
                    {
                        var url1 = url.replace(/(http:\/\/)|(https:\/\/)/,'');
                        url = window.url+url1;
                    }
                    var s = url.substring(url.length - 4);
                    var src = item.thumb;
                    var viewCollectStr = dataVersion == 'c' ? ' page-data="' + i + '" ' : '';
                    if(item.thumb){
                        if (s == "html") {
                            html += '<a ' + viewCollectStr + ' class="guess guess_pic ' + getType(item.type) + '" '+ linkProStr + '"href="' + urls_param + '" title="' + title + '">' + '<img src="' + src + '" alt=""><span>' + title + '</span></a>';
                        } else {
                            if(i==0){
                                html += '<a ' + viewCollectStr + ' class="guess guess_pic ' + getType(item.type) + '" '+ linkProStr + '"href="' + url + '" title="' + title + '"style="margin-right:14px;"><img src="' + src + '"><span>' + title + '</span></a>';
                            }
                            else{
                                html += '<a ' + viewCollectStr + ' class="guess guess_pic ' + getType(item.type) + '" '+ linkProStr + '"href="' + url + '" title="' + title + '"><img src="' + src + '"><span>' + title + '</span></a>';
                            }
                        }
                    }
                }
                var linkProStr = ' target="_blank" suda-uatrack="key=index_new_guess&value=' + dataVersion + '_click';

                var length = pages.length < pageLen ? pages.length : pageLen;
                for (var i = 0; i < length ; i++) {
                    list = pages[i];
                    var len = list.length;
                    var viewCollectStr = dataVersion == 'c'?' page-data="'+i+'" ':'';
                    if (len < listLen) {
                        // alert('break');
                        break;
                    }
                    if(i<length-1){
                        html += '<ul class="list-a list-a-201406121603">';
                        for (var j = 0; j < len; j++) {
                            item = list[j];
                            //杩囨护html鏍囩锛屽 <font color="#ff0000">浜氬啝-8024鐖嗗皠绌嗛噷濂囧崟鍒€鏂�</font>
                            title =  item.title.replace(/<\/?[^>]*>/g, '');
                            if(title.length>25){
                                title =  item.stitle ? item.stitle.replace(/<\/?[^>]*>/g, '') : title;
                            }
                            var urls_param = item.url + "?cre=sinapc&mod=g";
                            var url = item.url;
                            var s = url.substring(url.length - 4);
                            if(s == "html") {
                                html += '<li>' + '<a '+viewCollectStr+' class="' + getType(item.type) + '" ' + linkProStr + '" href="' + urls_param + '" title="' + title + '">' + cutTitle(title, item.type) + '</a></li>';
                            } else {
                                html += '<li>' + '<a '+viewCollectStr+' class="' + getType(item.type) + '" ' + linkProStr + '" href="' + item.url + '" title="' + title + '">' + cutTitle(title, item.type) + '</a></li>';
                            }
                        }
                        html += '</ul>';
                    }else{
                        var len1 = 2;
                        html += '<ul class="list-a list-a-201406121603">';
                        if(SHM.dom.byClass('guess_pic').length == 0){
                            html += '<div class="guess_slide_scroll">';
                            if(!window.pic1.pic){
                                guess(list[0],0,linkProStr);
                            }else{
                                html += '<a  class="guess guess_pic" href="' + window.pic1.url + '"'+ linkProStr + 'title="' + window.pic1.title + '"style="margin-right:14px;"><img src="' + window.pic1.pic + '"><span>' + window.pic1.title + '</span></a>';
                            }
                            if(!window.pic2.pic){
                                guess(list[1],1,linkProStr);
                            }else{
                                html += '<a  class="guess guess_pic" href="' + window.pic2.url + '"'+ linkProStr+ 'title="' + window.pic2.title + '"><img src="' + window.pic2.pic + '"><span>' + window.pic2.title + '</span></a>';
                            }
                            html += '</div>';

                        }

                        for (var j = 2; j < 5; j++) {
                            item = list[j];
                            //杩囨护html鏍囩锛屽 <font color="#ff0000">浜氬啝-8024鐖嗗皠绌嗛噷濂囧崟鍒€鏂�</font>
                            title =  item.title.replace(/<\/?[^>]*>/g, '');
                            if(title.length>25){
                                title =  item.stitle ? item.stitle.replace(/<\/?[^>]*>/g, '') : title;
                            }
                            var urls_param = item.url + "?cre=sinapc&mod=g";
                            var url = item.url;
                            var s = url.substring(url.length - 4);
                            if (s == "html") {
                                html += '<li>' + '<a ' + viewCollectStr + ' class="' + getType(item.type) + '" '+ linkProStr + '"href="' + urls_param + '" title="' + title + '">' + cutTitle(title, item.type) + '</a></li>';
                            } else {
                                html += '<li>' + '<a ' + viewCollectStr + ' class="' + getType(item.type) + '" '+ linkProStr + '"href="' + item.url + '" title="' + title + '">' + cutTitle(title, item.type) + '</a></li>';
                            }
                        }
                        html += '</ul>';
                    }
                }
                wrap.innerHTML = html;
                bindEvent();
                loaded = true;
                SHMUATrack('guess', dataVersion+'_pageview');
                viewCollect(wrap,data);
            };
            var SinaRecommender = window.___SinaRecommender___;
            var Util = SinaRecommender.util;

            var dataVersion = 'c';
            PageLoader = new SinaRecommender.PageLoader({
                api: "//cre.mix.sina.com.cn/api/v3/get?cateid=sina_all&fields=url,title,stitle,tags,type,thumb&length=" + listLen * pageLen + "&cre=sinapc&mod=g&statics=1&merge=3",
                listNum: listLen,
                pageNum: pageLen,
                // suda 缁熻5绉掔畻瓒呮椂
                time: 5e3,
                pageComplete: pageComplete,
                error: function(error) {
                    Loader = PageLoader;
                    if (error.type == 'timeout'||error.type == 'invaild-data') {
                        if(error.type == 'timeout'){
                            SHMUATrack('guess', dataVersion+'_timeout');
                        }
                        var getTDate = function() {
                            var curDate = new Date(),
                                year = curDate.getFullYear(),
                                month = curDate.getMonth() + 1,
                                day = curDate.getDate();
                            if (month < 10) {
                                month = '0' + month;
                            }
                            if (day < 10) {
                                day = '0' + day;
                            }
                            return year + '' + month + day;
                        };

                        var url = '//top.news.sina.com.cn/ws/GetTopDataList.php?top_type=day&top_cat=www_www_all_suda_12_suda&top_time=' + getTDate() + '&top_show_num=' + (Loader.opt.listNum * Loader.opt.pageNum) + '&top_order=ASC&format=json&__app_key=ls';

                        var loadedFnName = 'cb_' + Util.getGuid();
                        // 鍥炶皟
                        window[loadedFnName] = function(msg) {
                            dataVersion = 'c_hotlist';
                            msg = msg.result;
                            Loader._data = msg;
                            Loader._loadComplete(msg);
                            Loader.opt.loadComplete(msg);
                        };
                        // 璇锋眰鎺掕鏁版嵁
                        Util.jsonp(url, 'dpc=1', loadedFnName, true);
                    }
                }
            });

        };
        getGuessData();

        var loginBtn = $.E('SI_Guess_Login_Btn');
        if (!loginBtn) {
            return;
        }
        var loginLayer = window.SINA_OUTLOGIN_LAYER;
        var custAdd = $.evt.custEvent.add;
        var custRemove = $.evt.custEvent.remove;
        //鐩存帴鎷縞ookie鍒ゆ柇棰勯槻loginSuccess澶辨晥
        var cookie = sinaSSOController.get51UCCookie();
        if (cookie && loginBtn) {
            loginBtn.style.display = 'none';
        }
        custAdd($, 'loginSuccess', function() {
            if (loginBtn) {
                loginBtn.style.display = 'none';
            }
        });
        custAdd($, 'logoutSuccess', function() {
            if (loginBtn) {
                loginBtn.style.display = 'none';
            }
        });
        $.evt.addEvent(loginBtn, 'click', function() {
            // suda 鐚滀綘鍠滄 鐧诲綍
            SHMUATrack('guess', 'weibo_hotshow_signin');
            // if(!loginLayer.isLogin()){
            // loginLayer.setMode('simple');
            // loginLayer.set('plugin', {
            //     mode : 'simple'
            // })
            loginLayer.set('plugin', {
                    position: 'top,right',
                    parentNode: null,
                    relatedNode: loginBtn
                })
                .set('drag', {
                    enable: true,
                    dragarea: 'page'
                })
                .set('styles', {
                    'marginLeft': 0,
                    'marginTop': '40px'
                })
                .show();
            custAdd($, 'loginSuccess', function() {
                if (PageLoader) {
                    PageLoader.getData();
                } else {
                    getGuessData();
                }
            });
        });
    };
    o.isLoaded = function() {
        return loaded;
    };
    o.init();
    return o;
});
SHM.register('home.guess.isLoaded', function($) {
    return function(){
        return $.home.guess.init.isLoaded();
    };
});