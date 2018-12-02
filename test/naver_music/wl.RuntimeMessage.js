!function (e) {
    var n = {};

    function s(r) {
        if (n[r]) return n[r].exports;
        var a = n[r] = {i: r, l: !1, exports: {}};
        return e[r].call(a.exports, a, a.exports, s), a.l = !0, a.exports
    }

    s.m = e, s.c = n, s.d = function (e, n, r) {
        s.o(e, n) || Object.defineProperty(e, n, {configurable: !1, enumerable: !0, get: r})
    }, s.r = function (e) {
        Object.defineProperty(e, "__esModule", {value: !0})
    }, s.n = function (e) {
        var n = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return s.d(n, "a", n), n
    }, s.o = function (e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }, s.p = "", s(s.s = 4)
}({
    "./src/wl.RuntimeMessage.js": function (module, exports) {
        eval("/**\n * Copyright 2016 NAVER Corp. All Rights reserved.\n * All rights, including but not limited to, copyrights,\n * and intellectual property rights of this source code are owned by NAVER Corp.\n *\n * You may not use, reproduce, modify, or distribute this source code\n * without prior written permission from NAVER Corp.\n *\n * @author Kim Jihan <kim.jihan@navercorp.com>\n */\nwindow.wl = window.wl || {};\nwindow.wl.RuntimeMessage = window.wl.RuntimeMessage || (function () {\n    `use strict`;\n\n    const listeners = {};\n    whale.runtime.onMessage.addListener(onMessageReceived);\n\n    function onMessageReceived(message, sender, sendResponse) {\n        if (message.namespace && Array.isArray(listeners[message.namespace])) {\n            listeners[message.namespace].forEach(listener => {\n                listener(message.message, sender, sendResponse);\n            });\n        }\n\n        return true;\n    }\n\n    function addListener(namespace, listener) {\n        listeners[namespace] = listeners[namespace] || [];\n        listeners[namespace].push(listener);\n    }\n\n    function sendMessage(namespace, message, tabId, frameId) {\n        return new Promise(resolve => {\n            if (typeof tabId !== `undefined` && tabId > -1) {\n                whale.tabs.sendMessage(tabId, {\n                    namespace: namespace,\n                    message: message\n                },\n                (typeof frameId !== `undefined` && frameId > -1) ? { frameId: frameId } : {},\n                response => {\n                    resolve(response);\n                });\n            } else {\n                whale.runtime.sendMessage({\n                    namespace: namespace,\n                    message: message\n                }, response => {\n                    resolve(response);\n                });\n            }\n        });\n    }\n\n    function broadcast(namespace, message) {\n        // broadcasting available only in background\n        if (!whale.tabs) {\n            return new Promise((resolve, reject) => {\n                reject();\n            });\n        }\n\n        const promised = [];\n        whale.tabs.query({}, tabs => {\n            tabs.forEach(tab => {\n                promised.push(new Promise(resolve => {\n                    whale.tabs.sendMessage(tab.id, {\n                        namespace: namespace,\n                        message: message\n                    }, response => {\n                        resolve(response);\n                    });\n                }));\n            });\n        });\n\n        return Promise.all(promised);\n    }\n\n    return {\n        broadcast: broadcast,\n        listen: addListener,\n        send: sendMessage\n    };\n})();\n\n\n//# sourceURL=webpack:///./src/wl.RuntimeMessage.js?")
    }, 4: function (module, exports, __webpack_require__) {
        eval('module.exports = __webpack_require__(/*! ./src/wl.RuntimeMessage.js */"./src/wl.RuntimeMessage.js");\n\n\n//# sourceURL=webpack:///multi_./src/wl.RuntimeMessage.js?')
    }
});