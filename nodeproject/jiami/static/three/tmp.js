function makeNoCaptcha(module_nc, opt, inn_vars, nc_events, Scale, onNCEvent, _) {
    function _upResetIndex(e) {
        return upResetIndex(e, nc_index)
    }
    function _getToken() {
        return opt.token || UA_Opt.Token || umx.getToken()
    }
    function showError(e, t) {
        var n, o = t ? '<span class="nc-errcode"> (' + t + ")</span>" : "";
        n = e ? language[opt.language]._errorNetwork + o : language[opt.language]._errorLOADING + o,
            n = n.replace("%TOKEN", opt.token),
            n = _upResetIndex(n),
            _.id(opt.renderTo).innerHTML = '<div class="errloading"><i class="nc_iconfont icon_warn">' + icon_warn + "</i>" + n + "</div>",
        el_render_to && util.removeClass(el_render_to, "show-click-captcha")
    }
    function NoCaptcha() {}
    var nc_index = inn_vars.index, nc_prefix = inn_vars.prefix, scale_btn = nc_prefix + "n1z", scale_bar = nc_prefix + "n1t", TEXTELEM, gErrTimes = 0, ajaxURL, clsCheckCode = m_checkcode.init(inn_vars, _, onNCEvent), objCheckCode, tpl = makeTemplate({
        idx: nc_index,
        prefix: nc_prefix
    }), glog = __webpack_require__(49).makeLog(opt.foreign ? mmstat_base.gj : mmstat_base.gm), report = glog.report, reportLoadJSError = function(e, t) {
        report2.log({
            a: opt.appkey,
            t: _getToken(),
            scene: opt.scene,
            ns: "",
            jsv: inn_vars.v,
            usa: navigator.userAgent,
            p: "",
            jsType: "pc",
            os: "",
            em: t,
            ec: e
        })
    }, el_render_to, showHelp = makeShowHelp(opt, _, inn_vars), loading_circle_html = '\n        <div id="nc-loading-circle" class="nc-loading-circle">\n          <div class="sk-circle1 sk-circle"></div>\n          <div class="sk-circle2 sk-circle"></div>\n          <div class="sk-circle3 sk-circle"></div>\n          <div class="sk-circle4 sk-circle"></div>\n          <div class="sk-circle5 sk-circle"></div>\n          <div class="sk-circle6 sk-circle"></div>\n          <div class="sk-circle7 sk-circle"></div>\n          <div class="sk-circle8 sk-circle"></div>\n          <div class="sk-circle9 sk-circle"></div>\n          <div class="sk-circle10 sk-circle"></div>\n          <div class="sk-circle11 sk-circle"></div>\n          <div class="sk-circle12 sk-circle"></div>\n        </div>\n    ', isIE8 = util.isIEX(8), isIE9 = util.isIEX(9);
    (isIE8 || isIE9) && (loading_circle_html = "");
    var supportDataURI = new Promise(function(e, t) {
            return isIE8 ? void t() : void util.imageLoaded("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==").then(function(n) {
                1 === n.width && 1 === n.height ? e() : t()
            }, t)
        }
    );
    return NoCaptcha.prototype = {
        init: function(e) {
            win.__nc = this,
                module_nc.nc = this;
            var t = default_opt.language;
            if (e.foreign && (t = "en",
                default_opt.language = t),
                _.objUpdate(opt, default_opt),
                _.objUpdate(opt, e),
            opt.token || (opt.token = default_opt.token),
                this.opt = opt,
            language[opt.language] || (opt.language = t),
                e.upLang)
                for (var n in e.upLang)
                    _upLang(n, e.upLang[n]);
            this.render_to = opt.renderTo,
            this.render_to && (el_render_to = _.id(this.render_to)),
            el_render_to && util.addClass(el_render_to, "nc-container"),
            opt.is_tbLogin && (tb_login = __webpack_require__(117).makeTBLogin(inn_vars)),
                ajaxURL = URL_MAP[opt.foreign] || URL_MAP[0],
                ajaxURL = util.mix(ajaxURL, opt.apimap),
                ajaxURL.awsc_Url = opt.uaUrl || ajaxURL.awsc_Url;
            try {
                this.initializationReport()
            } catch (o) {}
            var i;
            if (opt.renderTo && opt.appkey && opt.token) {
                i = _.id(opt.renderTo);
                var r = Math.min(i.offsetWidth, i.parentNode.offsetWidth);
                !opt.customWidth && r > 300 && (opt.customWidth = 300),
                    this.updateWidth(opt.customWidth),
                    i.setAttribute("data-nc-idx", inn_vars.index.toString()),
                i && (i.innerHTML = '<div id="' + nc_prefix + 'nocaptcha"><div id="' + nc_prefix + 'wrapper" class="nc_wrapper"><div id="' + nc_prefix + '_n1t_loading" class="nc_scale"><div id="' + nc_prefix + '_bg" class="nc_bg" style="width: 0;"></div><div id="' + nc_prefix + '_scale_text_loading" class="scale_text">' + language[opt.language]._Loading + loading_circle_html + "</div></div></div></div>"),
                    UA_Opt.LogVal = "_n",
                    this.loadJS()
            }
            if (opt.logo && css.insertCSS(".nc-container .nc_scale .scale_text {background-image: url(" + NC_LOGO_URL + "); background-repeat: repeat-x;}"),
                opt.cssUrl)
                if (doc.createStyleSheet)
                    doc.createStyleSheet(opt.cssUrl);
                else {
                    var a = doc.createElement("link");
                    a.type = "text/css",
                        a.rel = "stylesheet",
                        a.className = "nc-custom-style-" + nc_index,
                        a.href = inn_vars.has_pointman ? util.addHourStamp(opt.cssUrl) : opt.cssUrl;
                    var c = doc.getElementsByTagName("script")[0];
                    c.parentNode.insertBefore(a, c)
                }
            onNCEvent(event_names.init)
        },
        on: function(e, t) {
            var n = window.console
                , o = event_deprecated[e];
            o && n && n.warn && n.warn("NC: Event '" + e + "' will be deprecated, use '" + o + "' instead."),
                nc_events[e] = nc_events[e] || [],
                nc_events[e].push(t)
        },
        initializationReport: function() {
            var e = ("initializeJsonp_" + Math.random()).replace(".", "")
                , t = ajaxURL.initialize + "?a=" + encodeURIComponent(opt.appkey) + "&t=" + encodeURIComponent(opt.token) + "&scene=" + encodeURIComponent(opt.scene) + "&lang=" + opt.language + "&v=v1.2.17&href=" + encodeURIComponent(location.href.split("?")[0]) + "&comm={}&callback=" + e
                , n = document.createElement("script")
                , o = document.getElementsByTagName("script")[0];
            o.parentNode.insertBefore(n, o),
                window[e] = function(e) {}
                ,
                n.src = t
        },
        updateWidth: function(e, t) {
            if (e) {
                var n, o, i = "undefined" == typeof e ? "undefined" : _typeof(e);
                "number" == i ? n = e : o = "string" == i ? _.id(e) : e,
                o && (n = o.offsetWidth),
                n && (this.c_width = n,
                    this.__is_c_width_setted = 1,
                    this.try2setWidth(nc_prefix + "wrapper"),
                    this.updateCSS(nc_prefix, n, t))
            }
        },
        updateCSS: function(e, t, n) {
            var o = util.isIEX(6)
                , i = util.isIEX(7)
                , r = o || i ? " !important" : "";
            css.insertCSS((n ? "" : ".nc-container #" + e + "wrapper,.nc-container.tb-login #" + e + "wrapper{width:" + t + "px}\n") + [".nc-container .imgCaptcha", ".nc-container .clickCaptcha"].join(",") + "{width:" + (t - 2) + "px" + r + ";}\n" + [".nc-container.tb-login .imgCaptcha", ".nc-container.tb-login .clickCaptcha"].join(",") + "{width:" + t + "px" + r + ";}\n" + [".nc-container.tb-login .imgCaptcha .captcha-error", ".nc-container.tb-login .clickCaptcha .captcha-error"].join(",") + "{width:" + (t - 8) + "px" + r + ";}\n.nc-container.tb-login .errloading, .nc-container .errloading {width:" + (t - 10) + "px;}")
        },
        updateAudioBoxWidth: function(e, t, n) {
            var o = _.id(e + "omeo-refresh-audio").offsetWidth
                , i = _.id(e + "_voice_close").offsetWidth
                , r = _.id(e + "omeo-code-key").offsetWidth
                , a = t - o - i - r - n;
            _.id(e + "omeo-code-audiobox").style.width = a + "px"
        },
        try2setWidth: function(e, t) {
            "string" == typeof e && (e = _.id(e)),
                t = t || this.c_width || (el_render_to ? el_render_to.offsetWidth : 0),
            t && e && e.style && (e.style.width = t + "px")
        },
        loadJS: function() {
            // todo
            var e = this;
            // https://g.alicdn.com/AWSC/AWSC/awsc.js
            window.AWSC ?
                (e.loadUAB(), e.loadUM())
                :
                _.loadjs(
                    util.addHourStamp(ajaxURL.awsc_Url),
                    function(t) {
                        t ?
                            (showError(!0, ERR_CODE_AWSCTIMEOUT), report("load awsc failed"), reportLoadJSError(LOAD_JS_TIMEOUT, "awsc.js timeout"))
                            :
                            (e.loadUAB(), e.loadUM())
                    },
                    "nc-required-js-" + nc_index + " nc-awsc-script",
                    100)
        },
        jsReady: function() {
            // todo
            var e = this;
            !e.ready && e.__uab && e.__um && (e.ready = !0,
                e.reload(),
                onNCEvent(event_names.ready))
        },
        loadUAB: function() {
            // todo
            var e = this;
            UA_Opt.Token = (new Date).getTime() + ":" + opt.token,
                e.__uab ? e.jsReady() : (e.initUaParam(),
                    AWSC.use("uab", function(t, n) {
                        "loaded" === t ? (e.__uab = n,
                            e.jsReady()) : (showError(!0, ERR_CODE_UABTIMEOUT),
                            report("load uab failed"),
                            reportLoadJSError(LOAD_JS_TIMEOUT, "uab.js timeout"))
                    }))
        },
        initUaParam: function() {
            function e(e, t) {
                UA_Opt[e] = "undefined" != typeof UA_Opt[e] && UA_Opt[e] > 0 ? UA_Opt[e] : t
            }
            function t(e, t) {
                n.__uaoption[e] = "undefined" != typeof UA_Opt[e] && UA_Opt[e] > 0 ? UA_Opt[e] : t
            }
            opt.is_Opt ? (e("MPInterval", 4),
                e("MaxMCLog", 12),
                e("MaxKSLog", 14),
                e("MaxMPLog", 5),
                e("MaxFocusLog", 6),
                e("SendInterval", 5),
                e("SendMethod", 8),
                e("GPInterval", 50),
                e("MaxGPLog", 1),
                e("MaxTCLog", 12),
                e("Flag", 2980046)) : (UA_Opt.SendInterval = 5,
                UA_Opt.SendMethod = 8,
                UA_Opt.MaxMCLog = 12,
                UA_Opt.MaxKSLog = 14,
                UA_Opt.MaxMPLog = 5,
                UA_Opt.MaxGPLog = 1,
                UA_Opt.MaxTCLog = 12,
                UA_Opt.GPInterval = 50,
                UA_Opt.MPInterval = 4,
                UA_Opt.MaxFocusLog = 6,
                UA_Opt.isSendError = 1,
                UA_Opt.Flag = 2980046),
                this.__uaoption = new Object;
            var n = this;
            opt.is_Opt ? (t("SendInterval", 5),
                t("SendMethod", 8),
                t("MaxMCLog", 12),
                t("MaxKSLog", 14),
                t("MaxMPLog", 5),
                t("MaxGPLog", 1),
                t("MaxTCLog", 12),
                t("GPInterval", 50),
                t("MPInterval", 4),
                t("MaxFocusLog", 6),
                t("Flag", 2980046),
                t("OnlyHost", 1),
                t("MaxMTLog", 500),
                t("MinMTDwnLog", 30),
                t("MaxNGPLog", 1),
                t("sIDs", ["_n1t|_n1z|nocaptcha|-stage-1"]),
                t("hook", 1),
                t("font", 1),
                t("api", 1)) : (n.__uaoption.SendInterval = 5,
                n.__uaoption.SendMethod = 8,
                n.__uaoption.isSendError = 1,
                n.__uaoption.MaxMCLog = 12,
                n.__uaoption.MaxKSLog = 14,
                n.__uaoption.MaxMPLog = 5,
                n.__uaoption.MaxGPLog = 1,
                n.__uaoption.MaxTCLog = 12,
                n.__uaoption.GPInterval = 50,
                n.__uaoption.MPInterval = 4,
                n.__uaoption.MaxFocusLog = 6,
                n.__uaoption.Flag = 2980046,
                n.__uaoption.OnlyHost = 1,
                n.__uaoption.MaxMTLog = 500,
                n.__uaoption.MinMTDwnLog = 30,
                n.__uaoption.MaxNGPLog = 1,
                n.__uaoption.sIDs = ["_n1t|_n1z|nocaptcha|-stage-1"],
                n.__uaoption.mIDs = ["nc-canvas", "click2slide-btn"],
                n.__uaoption.hook = 1,
                n.__uaoption.font = 1,
                n.__uaoption.api = 1),
                n.__uaoption.Flag |= 2097152
        },
        loadUM: function() {
            // todo
            var e = this;
            window._umopt_npfp = .05,
                window._umopt_cris = .2,
                e.__um ? e.jsReady() : AWSC.use("um", function(t, n) {
                    if ("loaded" === t) {
                        var o = function r() {
                            var t = location.href || "";
                            t = t.length < 128 ? t : t.substring(0, 128),
                                i++,
                                e.umidToken = "defaultToken3_init_callback_not_called@@" + t + "@@" + (new Date).getTime(),
                                n.init({
                                    timeout: opt.timeout,
                                    serviceUrl: ajaxURL.umid_serUrl,
                                    appName: opt.appkey,
                                    enableFY: 1,
                                    jf: 1,
                                    wtac: 1
                                }, function(n, o) {
                                    "success" === n ? e.umidToken = o.tn : (e.umidToken = "defaultToken4_init_failed with " + n + "@@" + t + "@@" + (new Date).getTime(),
                                    i < 3 && r())
                                })
                        };
                        e.__um = n,
                            e.jsReady();
                        var i = 0;
                        o()
                    } else
                        showError(!0, ERR_CODE_UMTIMEOUT),
                            report("load um failed"),
                            reportLoadJSError(LOAD_JS_TIMEOUT, "um.js timeout")
                })
        },
        __reload_voicebtn: function() {
            var e, t = _.id(nc_prefix + "_voicebtn"), n = this;
            _.addHandler(t, "keydown", function o(e) {
                var n = e || window.event;
                13 != n.keyCode && 13 != n.which || (_.removeEvt(t, "keydown", o),
                    t.click())
            }),
                t.onclick = function() {
                    function t() {
                        r || n.umidToken.indexOf("defaultToken") ? (clearInterval(c),
                            _.jsonp({
                                url: ajaxURL.analyze,
                                callback: "callback",
                                data: {
                                    a: opt.appkey,
                                    t: opt.token,
                                    n: n.__uab.getUA && n.__uab.getUA(n.__uaoption) || win._n || (UA_Opt.LogVal ? win[UA_Opt.LogVal] : "") || "",
                                    _a: "audio",
                                    p: _.obj2str(opt.trans),
                                    lang: opt.language,
                                    scene: opt.scene,
                                    v: inn_vars.v
                                },
                                success: o,
                                fail: function() {
                                    e && report("audio fail")
                                }
                            })) : a++ > 100 && (showError(!0, ERR_CODE_UMXRETRYLIMIT),
                            clearInterval(c))
                    }
                    function o(t) {
                        function o(e) {
                            if (e.success)
                                if (100 == e.result.code)
                                    n.userCallback(objCheckCode.config.sessionid, e.result.value, e.result.sig);
                                else if (900 == e.result.code) {
                                    UA_Opt.reload && UA_Opt.reload();
                                    var t = _.id(nc_prefix + "_captcha_text")
                                        , o = language[opt.language]._errorClickTEXT;
                                    ++gErrTimes > MAX_ERR_TIME && (o = language[opt.language]._errorTooMuch.replace("%TOKEN", opt.token)),
                                        t.innerHTML = '<i class="nc_iconfont icon_close">' + icon_close + "</i>" + o,
                                        t.style.visibility = "visible"
                                } else
                                    300 != e.result.code && 69634 != e.result.code || (report("block"),
                                        _.id(opt.renderTo).innerHTML = '<div class="errloading"><i class="nc_iconfont icon_warn">' + icon_warn + "</i>" + _upResetIndex(language[opt.language]._error300) + "</div>",
                                        onNCEvent(event_names.error),
                                        onNCEvent(event_names.error300));
                            else
                                n.errorCallback()
                        }
                        if (e) {
                            var r = t.result;
                            r && (objCheckCode || (objCheckCode = new clsCheckCode({
                                a: opt.appkey,
                                t: opt.token,
                                n: n.__uab.getUA && n.__uab.getUA(n.__uaoption) || win._n || (UA_Opt.LogVal ? win[UA_Opt.LogVal] : "") || "",
                                type: "150_40",
                                identity: opt.appkey,
                                sessionid: r.csessionid,
                                element: i,
                                codeType: "audio",
                                lang: opt.language,
                                scene: opt.scene,
                                p: _.obj2str(opt.trans)
                            }),
                                objCheckCode.check(function(e) {
                                    "success" != e.message && (objCheckCode.playErrAudio(),
                                        setTimeout(function() {
                                            var e = _.id(nc_prefix + "omeo-refresh-audio");
                                            e && e.click()
                                        }, 5e3)),
                                    "success" == e.message && _.jsonp({
                                        url: ajaxURL.checkcode,
                                        callback: "callback",
                                        data: {
                                            csessionid: r.csessionid,
                                            checkcode: function() {
                                                var e = {};
                                                return e.answer = objCheckCode.cache.lastCheckCode,
                                                    _.obj2str(e)
                                            }(),
                                            a: opt.appkey,
                                            t: opt.token,
                                            n: n.__uab.getUA && n.__uab.getUA(n.__uaoption) || win._n || "",
                                            p: "{}",
                                            r: Math.random(),
                                            lang: opt.language,
                                            v: inn_vars.v
                                        },
                                        success: o,
                                        fail: function(e) {
                                            n.errorCallback(e)
                                        }
                                    })
                                }),
                                objCheckCode.render(),
                                onNCEvent(event_names.switchevent, {
                                    from: "scale",
                                    to: "audio"
                                }),
                                objCheckCode.switchCode({
                                    type: "audio"
                                })))
                        }
                    }
                    var i = _.id(nc_prefix + "_voice");
                    if (_.id(nc_prefix + "imgCaptcha").style.display = "none",
                        _.id(nc_prefix + "clickCaptcha").style.display = "none",
                        e)
                        return e = !1,
                            i.style.display = "none",
                        objCheckCode && objCheckCode.stopAudio(),
                            clearInterval(win.__progtid),
                            n.reset(),
                            !1;
                    e = !0,
                        i.style.display = "block",
                    objCheckCode && (objCheckCode.resetPlayer({
                        state: "end"
                    }),
                        objCheckCode.switchCode({
                            type: "audio"
                        }));
                    var r, a = 0;
                    setTimeout(function() {
                        r = !0
                    }, 1e3);
                    var c = setInterval(t, 100);
                    t()
                }
        },
        reload: function() {
            objCheckCode = null,
                clearInterval(win.__progtid);
            var e = _.id(opt.renderTo);
            e && (e.innerHTML = tpl,
                util.addClass(el_render_to, "nc-container")),
            opt.audio && (_.id(nc_prefix + "_voicebtn").style.display = "block",
                util.addClass(_.id(nc_prefix + "n1t"), "is_audio")),
            tb_login && tb_login.init(this.render_to, el_render_to, opt.customFloatHeight),
                this.__reload_voicebtn();
            var t = _.id(nc_prefix + "_helpbtn");
            t && (navigator.userAgent.indexOf("MSIE 6.0") >= 0 && (t.style.display = "none"),
                    t.innerHTML = language[opt.language]._learning,
                    t.onclick = function() {
                        setTimeout(showHelp, 100)
                    }
            ),
                TEXTELEM = _.tag(scale_bar + " div")[1],
                inn_vars.TEXTELEM = TEXTELEM,
            opt.isEnabled && new Scale(scale_btn,scale_bar,this)
        },
        reset: function() {
            var e = this;
            e.ready = !1,
            win.UA_Opt && (UA_Opt.Token = (new Date).getTime() + ":" + opt.token);
            var t;
            opt.renderTo && opt.appkey && opt.token && (t = _.id(opt.renderTo),
            t && util.addClass(el_render_to, "nc-container"),
                t.innerHTML = '<div id="' + nc_prefix + 'nocaptcha"><div id="' + nc_prefix + 'wrapper" class="nc_wrapper"><div id="' + nc_prefix + '_n1t_loading" class="nc_scale"><div id="' + nc_prefix + '_bg" class="nc_bg" style="width: 0;"></div><div id="' + nc_prefix + '_scale_text_loading" class="scale_text">' + language[opt.language]._Loading + loading_circle_html + "</div></div></div></div>",
                e.loadJS())
        },
        show: function() {
            el_render_to && (el_render_to.style.display = "block",
            tb_login && tb_login.adjustPosition(opt.customFloatHeight),
                this.is_show = !0)
        },
        hide: function() {
            el_render_to && (el_render_to.style.display = "none",
                this.is_show = !1)
        },
        getTrans: function() {
            return opt.trans
        },
        setTrans: function(e) {
            return e && (opt.trans = e),
                opt.trans
        },
        enabled: function() {
            return new Scale(scale_btn,scale_bar,this)
        },
        errorCallback: function(e) {
            var t = _.id(scale_bar)
                , n = this
                , o = t.getElementsByTagName("span")
                , i = t.getElementsByTagName("div");
            if (onNCEvent(event_names.fail),
            0 !== o.length && 0 !== i.length) {
                var r = o[0]
                    , a = i[0];
                showError(e),
                    util.addClass(a, "orange"),
                    util.addClass(r, "reload"),
                    _.addHandler(t, "click", function() {
                        UA_Opt.Token = (new Date).getTime() + ":" + opt.token,
                        UA_Opt.reload && UA_Opt.reload(),
                            n.reload(),
                            _.removeEvt(t, "click")
                    }),
                e && opt.error && opt.error(language[opt.language]._errorServer)
            }
        },
        getElementLeft: function(e) {
            for (var t = e.offsetLeft, n = e.offsetParent; null !== n; )
                t += n.offsetLeft,
                    n = n.offsetParent;
            return t
        },
        getElementTop: function(e) {
            for (var t = e.offsetTop, n = e.offsetParent; null !== n; )
                t += n.offsetTop,
                    n = n.offsetParent;
            return t
        },
        getNcSession: function(e) {
            return parseInt(e.offsetWidth + "a" + e.offsetHeight + "a" + this.getElementLeft(e) + "a" + this.getElementTop(e), 11).toString(16)
        },
        onScaleReady: function onScaleReady(elem) {
            function waitForUmx() {
                if (is_umx_getStatus_timeout || me.umidToken.indexOf("defaultToken")) {
                    clearInterval(timer);
                    try {
                        UA_Opt.sendSA()
                    } catch (e) {}
                    trans.umidToken = me.umidToken;
                    var t = {
                        url: ajaxURL.analyze,
                        callback: "callback",
                        data: {
                            a: opt.appkey,
                            t: opt.token,
                            n: me.__uab.getUA && me.__uab.getUA(me.__uaoption) || win[UA_Opt.LogVal || "_n"] || "",
                            p: _.obj2str(trans),
                            scene: opt.scene || (inn_vars.has_pointman ? pointman.config.common.scene : "") || "",
                            asyn: 0,
                            lang: opt.language,
                            v: inn_vars.v
                        },
                        success: function(e) {
                            me.onScaleReadyCallback(e, elem)
                        },
                        fail: function(e) {
                            report("onScaleReady"),
                                showError(!0, ERR_CODE_ANALYZETIMEOUT)
                        }
                    };
                    opt.replaceCallback ? opt.replaceCallback(t) : _.jsonp(t)
                } else
                    retry++ > 100 && (showError(!0, ERR_CODE_UMXRETRYLIMIT),
                        clearInterval(timer))
            }
            var trans = opt.trans || {};
            "string" == typeof trans && (trans = eval("0," + trans));
            for (var arr = opt.elementID || [], i = 0; i < arr.length; i++) {
                var id = arr[i]
                    , el = doc.getElementById(id);
                el && (trans[id] = el.value)
            }
            try {
                trans.ncSessionID = this.getNcSession(document.getElementById("nc_" + this._index + "_n1t"))
            } catch (e) {
                trans.ncSessionID = "0"
            }
            var me = this;
            TEXTELEM.innerHTML = language[opt.language]._Loading + loading_circle_html,
                util.addClass(inn_vars.TEXTELEM, "nc-align-center"),
                util.addClass(TEXTELEM, "scale_text2");
            var retry = 0, is_umx_getStatus_timeout;
            setTimeout(function() {
                is_umx_getStatus_timeout = !0
            }, 1e3);
            var timer = setInterval(waitForUmx, 100);
            waitForUmx()
        },
        onScaleReadyCallback: function(e, t) {
            if (e.success) {
                var n = e.result
                    , o = n.code;
                if (0 === o)
                    _.id(scale_btn).className = "nc_iconfont btn_ok",
                        _.id(scale_btn).innerHTML = icon_ok_sign,
                        TEXTELEM.innerHTML = language[opt.language]._yesTEXT,
                        util.removeClass(t.btn.parentNode, "nc_err"),
                        this.userCallback(n.csessionid, "pass", n.value);
                else if (UA_Opt.reload && (UA_Opt.Token = (new Date).getTime() + ":" + opt.token,
                UA_Opt.reload && UA_Opt.reload()),
                    util.addClass(t.btn, "nc_iconfont btn_warn"),
                    util.addClass(t.btn.parentNode, "nc_err"),
                    t.btn.innerHTML = icon_warn,
                    t.bar = _.tag(scale_bar + " div")[0],
                    TEXTELEM.innerHTML = language[opt.language]._Loading + loading_circle_html,
                "function" == typeof opt.verifycallback && 300 != o && opt.verifycallback(n),
                100 == o)
                    this.__inn = 1,
                        this.onScale100(n.csessionid, n.value);
                else if (200 == o)
                    this.__inn = 1,
                        this.onScale200(n.csessionid, n.value);
                else if (260 == o)
                    this.onScale260(n.csessionid, n.value);
                else if (300 == o || 69634 == o) {
                    var i = function(e, t, n) {
                        for (var o = 0, i = t, r = e.length; i < r; )
                            o <<= 3,
                                o += e.charCodeAt(i),
                                i += n;
                        o < 0 && (o = 0 - o);
                        for (var a = "0123456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ", c = ""; o >= 58; ) {
                            var s = o % 58;
                            c = a[s] + c,
                                o = (o - s) / 58
                        }
                        c += a[(new Date).getDate()];
                        var l = c.length;
                        return l > 6 && (c = c.substr(l - 6, l - 1)),
                            c
                    };
                    report("block"),
                        util.removeClass(inn_vars.TEXTELEM, "nc-align-center"),
                        _.id(opt.renderTo).innerHTML = '<div class="errloading"><i class="nc_iconfont icon_warn">' + icon_warn + "</i>" + _upResetIndex(language[opt.language]._error300) + "(error:" + i(opt.token, 0, 1) + ")</div>",
                        onNCEvent(event_names.error),
                        onNCEvent(event_names.error300)
                }
            } else
                this.errorCallback()
        },
        onScale100: function e(t, n, o) {
            var i = e
                , r = o || this
                , a = this
                , c = _.tag(nc_prefix + "clickCaptcha div");
            this.__inn && (this.__inn = 0,
                _.addHandler(_.id(nc_prefix + "_btn_2"), "click", function() {
                    i.call(r, t, n)
                }));
            var s, l = setTimeout(function() {
                l = -1,
                s || (showError(!0, ERR_CODE_UABTIMEOUT),
                    report("captcha timeout"))
            }, 5e3);
            onNCEvent(event_names.beforeverify),
                onNCEvent(event_names.before_code),
                supportDataURI.then(function() {
                    return ajaxURL.get_captcha
                }, function() {
                    return ajaxURL.get_captcha_pre
                }).then(function(e) {
                    _.jsonp({
                        url: e,
                        callback: "callback",
                        data: {
                            sessionid: t,
                            identity: opt.appkey,
                            style: n,
                            lang: opt.language,
                            v: inn_vars.v
                        },
                        success: function(e) {
                            if (e.result.question && (e.result.question = e.result.question.replace(/<span[^>]+?>/g, "<i>"),
                                e.result.question = e.result.question.replace(/<\/span[^>]*?>/g, "</i>"),
                                r.captchaToken = e.result.captchaToken),
                                s = !0,
                            l != -1) {
                                if (clearTimeout(l),
                                    !e.result.tags)
                                    return report("no tag"),
                                        void showError(!0, ERR_CODE_CAPTCHA_NOTAG);
                                var o = _.id(nc_prefix + "clickCaptcha");
                                o && (o.style.display = "block",
                                r.__is_c_width_setted || r.updateWidth(_.id(nc_prefix + "wrapper"), 1)),
                                el_render_to && util.addClass(el_render_to, "show-click-captcha");
                                var d = opt.appkey + "&sessionid"
                                    , u = e.result.question.split(e.result.tags[0])
                                    , p = u.shift();
                                util.removeClass(inn_vars.TEXTELEM, "nc-align-center"),
                                _.id(nc_prefix + "_scale_text") && (e.result.question.indexOf("<i>") == -1 ? _.id(nc_prefix + "_scale_text").innerHTML = p + "<i>\u201c" + e.result.tags[0] + "\u201d</i>" + u.join(e.result.tags[0]) : _.id(nc_prefix + "_scale_text").innerHTML = e.result.question),
                                tb_login && tb_login.getInform(_.id(nc_prefix + "clickCaptcha"), module_nc.nc),
                                    c[1].innerHTML = '<img src="' + e.result.data + '" >';
                                var f, g = c[1].getElementsByTagName("img")[0];
                                g.onload = function() {
                                    f = !0,
                                    h != -1 && clearTimeout(h)
                                }
                                    ,
                                    g.onerror = function() {
                                        report("captcha onerror"),
                                            showError()
                                    }
                                ;
                                var h = setTimeout(function() {
                                    h = -1,
                                    f || (showError(!0, ERR_CODE_IMAGE_TIMEOUT),
                                        report("captcha timeout"))
                                }, 5e3);
                                _.addHandler(g, "click", function(e) {
                                    util.addClass(inn_vars.TEXTELEM, "nc-align-center"),
                                        TEXTELEM.innerHTML = language[opt.language]._Loading + loading_circle_html,
                                        _.jsonp({
                                            url: ajaxURL.checkcode,
                                            callback: "callback",
                                            data: {
                                                csessionid: t,
                                                checkcode: function() {
                                                    var t = {};
                                                    return t.imgid = d,
                                                        t.w = g.width.toString(),
                                                        t.h = g.height.toString(),
                                                        t.x = void 0 === e.offsetX ? util.getOffset(e).offsetX : e.offsetX,
                                                        t.y = void 0 === e.offsetY ? util.getOffset(e).offsetY : e.offsetY,
                                                        t.x = parseInt(t.x).toString(),
                                                        t.y = parseInt(t.y).toString(),
                                                        t.captchaToken = r.captchaToken,
                                                        _.obj2str(t)
                                                }(),
                                                a: opt.appkey,
                                                t: opt.token,
                                                n: a.__uab.getUA && a.__uab.getUA(a.__uaoption) || win._n || (UA_Opt.LogVal ? win[UA_Opt.LogVal] : "") || "",
                                                p: "{}",
                                                r: Math.random(),
                                                lang: opt.language,
                                                v: inn_vars.v
                                            },
                                            success: function(e) {
                                                var o = _.id(scale_btn);
                                                if (e.success)
                                                    if (100 == e.result.code)
                                                        o.className = "nc_iconfont btn_ok",
                                                            o.innerHTML = icon_ok_sign,
                                                            util.addClass(inn_vars.TEXTELEM, "nc-align-center"),
                                                            _.tag(scale_bar + " div")[0].className = "nc_bg",
                                                            TEXTELEM.innerHTML = language[opt.language]._yesTEXT,
                                                            util.removeClass(o.parentNode, "nc_err"),
                                                            _.toggle(nc_prefix + "clickCaptcha"),
                                                        el_render_to && util.removeClass(el_render_to, "show-click-captcha"),
                                                        r.userCallback && r.userCallback(t, n, e.result.sig);
                                                    else if (900 == e.result.code) {
                                                        UA_Opt.reload && UA_Opt.reload(),
                                                            i.call(r, t, n, r);
                                                        var a = _.id(nc_prefix + "_captcha_text")
                                                            , c = language[opt.language]._errorClickTEXT;
                                                        ++gErrTimes > MAX_ERR_TIME && (c = language[opt.language]._errorTooMuchClick.replace("%TOKEN", opt.token)),
                                                            a.innerHTML = '<i class="nc_iconfont icon_close">' + icon_close + "</i>" + c,
                                                            a.style.visibility = "visible"
                                                    } else
                                                        300 != e.result.code && 69634 != e.result.code || (report("block"),
                                                            _.id(opt.renderTo).innerHTML = '<div class="errloading"><i class="nc_iconfont icon_warn">' + icon_warn + "</i>" + _upResetIndex(language[opt.language]._error300) + "</div>",
                                                            onNCEvent(event_names.error),
                                                            onNCEvent(event_names.error300));
                                                else
                                                    r.errorCallback()
                                            },
                                            fail: function(e) {
                                                r.errorCallback(e)
                                            }
                                        })
                                }),
                                    onNCEvent(event_names.afterverify),
                                    onNCEvent(event_names.after_code)
                            }
                        },
                        fail: function() {
                            _.id(opt.renderTo).innerHTML = '<div class="errloading"><i class="nc_iconfont icon_warn">' + icon_warn + "</i>" + _upResetIndex(language[opt.language]._errorLOADING) + "</div>",
                                r.errorCallback(!0)
                        }
                    })
                })
        },
        onScale200: function t(e, n) {
            function o(e) {
                var t = _.id(nc_prefix + "captcha_input");
                return (g = t.value.replace(/[^\w\/]/gi, "")) ? (g.length > f.length ? p.push(g.slice(f.length)) : g.length < f.length ? p.push("bsp") : p.push("oth"),
                    void (f = g)) : (f = "",
                    void p.push("oth"))
            }
            function i() {
                var t = _.tag(nc_prefix + "imgCaptcha input")[0].value;
                if (t) {
                    var o = {
                        ksl: p.slice(0, 20)
                    };
                    _.jsonp({
                        url: ajaxURL.checkcode,
                        callback: "callback",
                        data: {
                            csessionid: e,
                            checkcode: function() {
                                var e = {};
                                return e.answer = t,
                                    e.captchaToken = s.captchaToken,
                                    _.obj2str(e)
                            }(),
                            a: opt.appkey,
                            t: opt.token,
                            n: r.__uab.getUA && r.__uab.getUA(r.__uaoption) || win._n || (UA_Opt.LogVal ? win[UA_Opt.LogVal] : "") || "",
                            p: _.obj2str(o),
                            lang: opt.language,
                            v: inn_vars.v
                        },
                        success: function(t) {
                            if (t.success) {
                                var o = _.id(scale_btn)
                                    , i = _.tag(nc_prefix + "imgCaptcha div")[2];
                                if (100 == t.result.code)
                                    o.className = "nc_iconfont btn_ok",
                                        o.innerHTML = icon_ok_sign,
                                        _.tag(scale_bar + " div")[0].className = "nc_bg",
                                        TEXTELEM.innerHTML = language[opt.language]._yesTEXT,
                                        util.addClass(inn_vars.TEXTELEM, "nc-align-center"),
                                        util.removeClass(o.parentNode, "nc_err"),
                                        i.style.borderTopColor = "#e5e5e5",
                                        _.toggle(nc_prefix + "imgCaptcha"),
                                        s.userCallback.call(this, e, n, t.result.sig);
                                else if (900 == t.result.code) {
                                    var r = _.tag(nc_prefix + "imgCaptcha input")[0];
                                    r && (r.value = ""),
                                    UA_Opt.reload && UA_Opt.reload(),
                                        c.call(s, e, n);
                                    var a = language[opt.language]._errorTEXT;
                                    ++gErrTimes > MAX_ERR_TIME && (a = language[opt.language]._errorTooMuch.replace("%TOKEN", opt.token));
                                    var l = _.id(nc_prefix + "_captcha_img_text");
                                    l.innerHTML = '<i class="nc_iconfont icon_close">' + icon_close + "</i>" + a,
                                        l.style.display = "block",
                                        l.style.visibility = "visible",
                                        i.style.borderTopColor = "red"
                                } else
                                    300 != t.result.code && 69634 != t.result.code || (report("block"),
                                        _.id(opt.renderTo).innerHTML = '<div class="errloading"><i class="nc_iconfont icon_warn">' + icon_warn + "</i>" + _upResetIndex(language[opt.language]._error300) + "</div>",
                                        onNCEvent(event_names.error),
                                        onNCEvent(event_names.error300))
                            } else
                                s.errorCallback();
                            p = [],
                                f = ""
                        },
                        fail: function(e) {
                            s.errorCallback(e)
                        }
                    })
                }
            }
            onNCEvent(event_names.beforeverify),
                onNCEvent(event_names.before_code);
            var r = this
                , a = _.id(nc_prefix + "imgCaptcha");
            a && (this.__is_c_width_setted || this.updateWidth(_.id(nc_prefix + "wrapper"), 1));
            var c = t
                , s = this
                , l = _.tag(nc_prefix + "imgCaptcha div")
                , d = supportDataURI.then(function() {
                return ajaxURL.get_img
            }, function() {
                return ajaxURL.get_img_pre
            }).then(function(t) {
                var o = opt;
                return util.request({
                    url: t,
                    data: {
                        sessionid: e,
                        identity: o.appkey,
                        token: opt.token,
                        style: n
                    }
                })
            }).then(function(e) {
                return e.success && 0 === e.result.resultCode ? (s.captchaToken = e.result.captchaToken,
                    util.imageLoaded(e.result.data[0])) : Promise.reject({
                    type: "request",
                    code: e.result.resultCode,
                    msg: e.result.message
                })
            }).then(function(t) {
                a.style.display = "block",
                    l[1].innerHTML = "",
                    l[1].appendChild(t);
                var o = l[1].getElementsByTagName("img")[0];
                _.addHandler(o, "click", function() {
                    c.call(s, e, n)
                }),
                    TEXTELEM.innerHTML = language[opt.language]._noTEXT,
                tb_login && tb_login.getInform(_.id(nc_prefix + "imgCaptcha"), module_nc.nc),
                    util.removeClass(inn_vars.TEXTELEM, "nc-align-center"),
                    _.id(nc_prefix + "scale_submit").innerHTML = language[opt.language]._submit
            });
            d["catch"](function(e) {
                /^(request)$/.test(e.type) ? showError(!0, ERR_CODE_IMAGE_REQUEST_ERROR) : /^(img)$/.test(e.type) && showError()
            });
            var u, p = [], f = "", g = "";
            this.__inn && (this.__inn = 0,
                _.addHandler(_.id(nc_prefix + "scale_submit"), "click", i),
                _.addHandler(_.id(nc_prefix + "_btn_2"), "click", function() {
                    c.call(this, e, n)
                }),
                window.addEventListener ? _.id(nc_prefix + "captcha_input").addEventListener("input", o) : _.id(nc_prefix + "captcha_input").attachEvent("onpropertychange", function(e) {
                    "value" === e.propertyName && o()
                }),
                u = _.id(nc_prefix + "imgCaptcha"),
            u && (u = u.getElementsByTagName("input")[0]) && _.addHandler(u, "keydown", function(e) {
                if (e = e || window.event,
                13 == e.keyCode || 13 == e.which)
                    return i(),
                        e.preventDefault ? e.preventDefault() : window.event.returnValue = !1,
                        !1
            })),
                onNCEvent(event_names.afterverify),
                onNCEvent(event_names.after_code)
        },
        onScale260: function(e, t) {
            var n = this;
            onNCEvent(event_names.beforeverify),
                onNCEvent(event_names.before_code),
                TEXTELEM.innerHTML = language[opt.language]._cc_select,
                this.imgCategoryCaptcha = new ImgCategoryCaptcha(util.mix({
                    nc: this,
                    prefix: nc_prefix,
                    $wrapper: _.id(nc_prefix + "wrapper"),
                    csessionid: e,
                    value: t,
                    onfail: function() {
                        onNCEvent(event_names.fail)
                    },
                    onerror: function() {
                        onNCEvent(event_names.error),
                            onNCEvent(event_names.error300)
                    },
                    onsuccess: function(o) {
                        var i = _.id(scale_btn);
                        i.className = "nc_iconfont btn_ok",
                            i.innerHTML = icon_ok_sign,
                            TEXTELEM.innerHTML = language[opt.language]._yesTEXT,
                            util.removeClass(i.parentNode, "nc_err");
                        try {
                            n.userCallback(e, t, o)
                        } catch (r) {
                            throw r
                        }
                    }
                }, opt),{
                    v: inn_vars.v,
                    obj2str: _.obj2str
                }),
                onNCEvent(event_names.afterverify),
                onNCEvent(event_names.after_code)
        },
        userCallback: function(e, t, n) {
            var o = {
                csessionid: e || null,
                value: t || null,
                sig: n || null,
                token: _getToken()
            };
            opt.callback && opt.callback.call(this, o),
                onNCEvent(event_names.success, o)
        },
        upLang: function(e, t) {
            return _upLang(e, t)
        },
        getToken: function() {
            return _getToken()
        },
        destroy: function() {
            el_render_to.innerHTML = "";
            var e, t, n, o = util.getElementsByClassName("nc-custom-style-" + nc_index);
            if (util.getElementsByClassName("nc-required-js-" + nc_index),
                e = o.length,
            e > 0)
                for (t = 0; t < e; t++)
                    n = o[0].parentNode,
                    n && n.removeChild(o[0])
        }
    },
        NoCaptcha
}
