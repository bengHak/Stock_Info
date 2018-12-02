!function (e) {
    var n = {};

    function t(r) {
        if (n[r]) return n[r].exports;
        var a = n[r] = {i: r, l: !1, exports: {}};
        return e[r].call(a.exports, a, a.exports, t), a.l = !0, a.exports
    }

    t.m = e, t.c = n, t.d = function (e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {enumerable: !0, get: r})
    }, t.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, t.t = function (e, n) {
        if (1 & n && (e = t(e)), 8 & n) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (t.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & n && "string" != typeof e) for (var a in e) t.d(r, a, function (n) {
            return e[n]
        }.bind(null, a));
        return r
    }, t.n = function (e) {
        var n = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function (e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }, t.p = "", t(t.s = 1)
}([function (e, n) {
    window.wl = window.wl || {}, window.wl.RuntimeMessage = window.wl.RuntimeMessage || function () {
        "use strict";
        let e = {};
        return whale.runtime.onMessage.addListener(function (n, t, r) {
            n.namespace && Array.isArray(e[n.namespace]) && e[n.namespace].forEach(e => {
                e(n.message, t, r)
            });
            return !0
        }), {
            broadcast: function (e, n) {
                if (!whale.tabs) return new Promise((e, n) => {
                    n()
                });
                let t = [];
                return whale.tabs.query({}, r => {
                    r.forEach(r => {
                        t.push(new Promise(t => {
                            whale.tabs.sendMessage(r.id, {namespace: e, message: n}, e => {
                                t(e)
                            })
                        }))
                    })
                }), Promise.all(t)
            }, listen: function (n, t) {
                e[n] = e[n] || [], e[n].push(t)
            }, send: function (e, n, t, r) {
                return new Promise(a => {
                    void 0 !== t && t > -1 ? whale.tabs.sendMessage(t, {
                        namespace: e,
                        message: n
                    }, void 0 !== r && r > -1 ? {frameId: r} : {}, e => {
                        a(e)
                    }) : whale.runtime.sendMessage({namespace: e, message: n}, e => {
                        a(e)
                    })
                })
            }
        }
    }()
}, function (e, n, t) {
    e.exports = t(0)
}]);