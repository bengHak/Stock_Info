!function (e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {i: r, l: !1, exports: {}};
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }

    n.m = e, n.c = t, n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r})
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var o in e) n.d(r, o, function (t) {
            return e[t]
        }.bind(null, o));
        return r
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 7)
}({
    6: function (e, t) {
        !function () {
            "use strict";
            let e = !1, t = {};
            const n = [{id: "SEND", title: whale.i18n.getMessage("ADD_TO_SIDEBAR")}];

            function r(n) {
                let r = n.id !== whale.tabs.TAB_ID_NONE && t[n.id], a = !r || r && r.startsWith("text/");
                n.url.startsWith("http") && a ? o() : function () {
                    if (!e) return;
                    e = !1, whale.contextMenus.removeAll()
                }()
            }

            function o() {
                e || (e = !0, whale.contextMenus.removeAll(() => {
                    n.forEach(e => {
                        whale.contextMenus.create({
                            id: e.id,
                            title: e.title,
                            contexts: ["selection"],
                            onclick: a
                        }, () => {
                            whale.runtime.lastError
                        })
                    })
                }))
            }

            function a(e, t) {
                !function (e) {
                    let t = (e.text || "").trim();
                    if (!t) return !1;
                    if (!e.tab || !e.tab.id) return !1;
                    whale.storage.local.get(["quickMemo", "url"], n => {
                        let r = "";
                        r = n.url === e.tab.url ? n.quickMemo + "\n\n" + t : t, whale.storage.local.set({
                            quickMemo: r,
                            url: e.tab.url
                        }, () => {
                            whale.sidebarAction.show({reload: !0, url: "http://m.memo.naver.com"})
                        })
                    })
                }({action: e.menuItemId, text: e.selectionText, tab: t})
            }

            whale.tabs.onActivated.addListener(e => {
                whale.tabs.get(e.tabId, e => {
                    r(e)
                })
            }), whale.tabs.onUpdated.addListener((e, t, n) => {
                n.active && r(n)
            }), whale.tabs.onCreated.addListener(e => {
                e.active && r(e)
            }), whale.tabs.onRemoved.addListener(e => {
                delete t[e]
            }), whale.webRequest.onHeadersReceived.addListener(e => {
                if (e.tabId !== whale.tabs.TAB_ID_NONE) {
                    let n = e.responseHeaders.find(e => "content-type" === e.name.toLowerCase());
                    t[e.tabId] = n && n.value.split(";", 1)[0]
                }
            }, {urls: ["*://*/*"], types: ["main_frame"]}, ["responseHeaders"]), o()
        }()
    }, 7: function (e, t, n) {
        e.exports = n(6)
    }
});