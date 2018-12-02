!function (e) {
    var t = {};

    function r(n) {
        if (t[n]) return t[n].exports;
        var o = t[n] = {i: n, l: !1, exports: {}};
        return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
    }

    r.m = e, r.c = t, r.d = function (e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: n})
    }, r.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, r.t = function (e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var o in e) r.d(n, o, function (t) {
            return e[t]
        }.bind(null, o));
        return n
    }, r.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 9)
}({
    8: function (e, t) {
        !function () {
            function e(e, t) {
                var r = e.split(",")[1], n = atob(r), o = "http://apis.naver.com/whale/memoapi/v1/images";
                (function (e, t) {
                    let r = e.split("."), n = t.split(".");
                    for (let e = 0; e < 3; e++) {
                        if (1 * r[e] > 1 * n[e]) return 1;
                        if (1 * r[e] < 1 * n[e]) return -1
                    }
                    return 0
                })(navigator.userAgent.split("Whale/")[1].split(" ")[0], "0.7.32") <= 0 && (o = "http://apis.naver.com/sling/memoapi/v1/images"), whale.utility.getHmacURL(o, e => {
                    var r = new XMLHttpRequest, o = "";
                    o += "--blob\r\n", o += "content-disposition: form-data; ", o += 'name="image"; ', o += 'filename="whale.jpg"\r\n', o += "Content-Type: image/jpeg\r\n", o += "\r\n", o += n + "\r\n", o += "--blob--", r.addEventListener("load", e => {
                        4 === e.currentTarget.readyState && 200 === e.currentTarget.status && t({result: e.currentTarget.responseText.replace(/\"/g, "")})
                    }), r.open("POST", e), r.setRequestHeader("Content-Type", "multipart/form-data; boundary=blob"), r.sendAsBinary(o)
                })
            }

            XMLHttpRequest.prototype.sendAsBinary || (XMLHttpRequest.prototype.sendAsBinary = function (e) {
                for (var t = e.length, r = new Uint8Array(t), n = 0; n < t; n++) r[n] = 255 & e.charCodeAt(n);
                this.send(r)
            }), whale.commands.onCommand.addListener(function (e) {
                "toggle-navermemo" === e && whale.sidebarAction.show({
                    url: "https://m.memo.naver.com",
                    reload: !0
                }, () => {
                })
            }), wl.RuntimeMessage.listen("navermemo", function (t, r, n) {
                return "capture" === t.msg ? chrome.tabs.captureVisibleTab(null, {}, t => {
                    e(t, n)
                }) : "pasteImage" === t.msg ? e(t.data, n) : "getUrl" === t.msg ? chrome.tabs.query({
                    currentWindow: !0,
                    active: !0
                }, function (e) {
                    n({url: e[0].url.replace("chrome:", "whale:")})
                }) : "openPage" === t.msg && chrome.tabs.create({url: t.url}), !0
            })
        }()
    }, 9: function (e, t, r) {
        e.exports = r(8)
    }
});