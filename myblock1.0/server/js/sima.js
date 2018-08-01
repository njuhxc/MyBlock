(function() {
    var sinaglobalCookieName = 'SINAGLOBAL',
        sinaglobal,
        prtl = 'https:' == window.location.protocol ? 'https://' : 'http://',
        domain = 'https:' == window.location.protocol ? 'sbeacon.sina.com.cn' : 'beacon.sina.com.cn',
        channel = window.location.href.match(/\w+\.sina\.com\.cn/) || '',
        channelStr,
        suda_hash = '',
        stringifyFn;

    if (window.SIMA) {
        return;
    }

    sinaglobal = getSinaGlobal(sinaglobalCookieName);

    channelStr = channel ? ('pc_' + channel[0].split('.')[0]) : '',

    stringifyFn = JSON.stringify || stringify;

    function stringify(val) {
        var stringifyRes = '',
            curVal;
        if (val === null) {
            return String(val);
        }
        switch (typeof val) {
            case 'number':
            case 'boolean':
                return String(val);

            case 'string':
                return '"' + val + '"';

            case 'undefined':
            case 'function':
                return undefined;
        }
        switch (Object.prototype.toString.call(val)) {
            case '[object Array]':
                stringifyRes += '[';
                for (var i = 0, len = val.length - 1; i < len; i++) {
                    curVal = stringify(val[i]);
                    stringifyRes += (curVal === undefined ? null : curVal) + ',';
                }
                stringifyRes += stringify(val[i]);

                stringifyRes += ']';
                return stringifyRes;
            case '[object Date]':
                return '"' + (val.toJSON ? val.toJSON() : val.toString()) + '"';

            case '[object RegExp]':
                return '{}';

            case '[object Object]':
                stringifyRes += '{';
                for (var i in val) {
                    if (val.hasOwnProperty(i)) {
                        curVal = stringify(val[i]);
                        if (curVal !== undefined) {
                            stringifyRes += '"' + i + '":' + curVal + ',';
                        }
                    }
                }
                stringifyRes = stringifyRes.slice(0, -1);
                stringifyRes += '}';
                return stringifyRes;
        }
    }

    /*
     * url处理,去掉"#"
     */
    function getRealUrl(pUrl, changeHash) {

        var ps = 0;
        ps = pUrl.indexOf("#");
        if (ps > 0) {
            if (changeHash) suda_hash = pUrl.substring(ps);
            return pUrl.substring(0, ps);
        } else {
            if (changeHash) suda_hash = '';
            return pUrl;
        }
    }

    function filter(pUrl) {
        var ps = 0;
        ps = pUrl.indexOf("#");
        if (ps > 0) {
            if (changeHash) suda_hash = pUrl.substring(ps);
            return pUrl.substring(0, ps);
        } else {
            if (changeHash) suda_hash = '';
            return pUrl;
        }
    }

    /*
     * 获取cookie
     */
    function getCookie(ckName) {
        var start = document.cookie.indexOf(ckName + "=");
        if (-1 == start) {
            return "";
        }
        start = document.cookie.indexOf("=", start) + 1;
        var end = document.cookie.indexOf(";", start);
        if (0 >= end) {
            end = document.cookie.length;
        }
        ckValue = document.cookie.substring(start, end);
        return ckValue;
    }

    function platform() {
        var ua = window.navigator.userAgent.toLowerCase();
        return {
            os : /mac/.test(ua) ? "mac" : "pc",
            ua : ua
        };
    }

    function getUid(fn) {
        var uid = '';
        if (window.sinaSSOController && window.sinaSSOController.getSinaCookie() && window.sinaSSOController.getSinaCookie().uid) {
            uid = window.sinaSSOController.getSinaCookie().uid;
        } else {
            uid = 'unknown';
        }
        return uid;
    }

    function getRK() {
        var time = new Date().getTime();
        var random = Math.random();
        return "" + time + "_" + random;
    }

    // post版本
    // function createRequest(dataStr) {
    //     el_input.value = dataStr;
    //     el_form.submit();
    // }

    function createRequest (url, onLoad) {
        var img = new Image();
        document.body.appendChild(img)
        if (typeof onLoad === 'function') {
            img.onload = function () {
                debugger;
                onLoad.call(window);
                this.onload = null;
            }
        }
        img.src = url;
    }

    function getAccesstype() {
        return '';
    }

    function getSinaGlobal() {
        var guid, uid;
        guid = getCookie(sinaglobalCookieName) || '';
        return guid;
    }

    function filter(data) {
        for (var i in data) {
            if (typeof data[i] == 'string') {
                data[i] = data[i].replace(/(\r\n)|(\n)|(\t)|(\<)|(\>)/gmi, "");
            }
        }
        return data;
    }

    window.SIMA = function(logData) {
        if (!logData || !logData.action || !logData.data) {
            return false;
        }
        var prtl = 'https:' == window.location.protocol ? 'https://' : 'http://';
        var domain = 'https:' == window.location.protocol ? 'sbeacon.sina.com.cn' : 'beacon.sina.com.cn';
        var mrt_gif = prtl + domain + '/mrt.gif?';
        var platformInfo = platform(),
            os = platformInfo.os,
            ua = platformInfo.ua,
            rk = getRK(),
            accesstype = getAccesstype(),
            uid = getUid();

        if (!logData.pk) {
            if (logData.data.cre || logData.data.mod) {
                logData.pk = '187522';
            } else {
                logData.pk = '187523';
            }
        }

        logData.data.subp = getCookie('SUBP');

        var json = {
            "_pk": logData.pk, //表id
            "_uk": logData.uk, //表id
            "_src": 'web', //web 标识浏览器 app server
            "_rk": rk, //日志唯一标识
            "_v": '1.0',
            "_cp": {
                "os": os, //操作系统
                "ua": ua,
                "device_id": sinaglobal, //uid
                "uid" : uid,
                "accesstype": accesstype //网络类型 手浪取不到
            },
            "_ep": [{
                "attribute": filter(logData.data), //日志主体 arr OR   json
                "channel": channelStr, //频道
                "ek": logData.action || '', //事件名
                "ref": encodeURIComponent(getRealUrl(window.document.referrer.indexOf('baidu') == -1 ? window.document.referrer : 'baidu.com')) || '',
                "et": 'custom', //事件主体 
                "src": logData.src || encodeURIComponent(getRealUrl(window.location.href)) || '',
                // "method": getMethod(logData.action), //针对主体的方法
                "method": logData.action, //针对主体的方法
                "timestamp": (new Date()).getTime() //时间
            }]
        };
        createRequest(mrt_gif + stringifyFn(json), logData.onLoad);
    }
})();

//use
/*SIMA({
        action: 'exposure',
        data: {
            cre: 'tianyi',
            info: 'ca61fcf8be263ceb9c2e106d943a3db5|25|1|0|69|none|1493109679|0|25|0|0|19Dvt|1|1;acbdc87bd604370eac83ba0497ae5c5b|25|2|0|69|none|1493109679|0|25|0|0|kQMP|1|1',
            mod: 'wfin'
        },
        pk: '187522',
        uk: 'ty',
        onLoad: function() {
            alert('loaded');
        }
});*/