!function (n) {
    var e = {};

    function r(o) {
        if (e[o]) return e[o].exports;
        var t = e[o] = {i: o, l: !1, exports: {}};
        return n[o].call(t.exports, t, t.exports, r), t.l = !0, t.exports
    }

    r.m = n, r.c = e, r.d = function (n, e, o) {
        r.o(n, e) || Object.defineProperty(n, e, {configurable: !1, enumerable: !0, get: o})
    }, r.r = function (n) {
        Object.defineProperty(n, "__esModule", {value: !0})
    }, r.n = function (n) {
        var e = n && n.__esModule ? function () {
            return n.default
        } : function () {
            return n
        };
        return r.d(e, "a", e), e
    }, r.o = function (n, e) {
        return Object.prototype.hasOwnProperty.call(n, e)
    }, r.p = "", r(r.s = 3)
}({
    "./src/wl.Storage.js": function (module, exports) {
        eval("/**\n * Copyright 2016 NAVER Corp. All Rights reserved.\n * All rights, including but not limited to, copyrights,\n * and intellectual property rights of this source code are owned by NAVER Corp.\n *\n * You may not use, reproduce, modify, or distribute this source code\n * without prior written permission from NAVER Corp.\n *\n */\nwindow.wl = window.wl || {};\nwindow.wl.Storage = window.wl.Storage || (function () {\n    `use strict`;\n\n    const prefix = whale.extension.inIncognitoContext ? `incognito_` : `normal_`;\n    const listeners = {};\n\n    function get(key) {\n        return new Promise(resolve => {\n            key = prefix + key;\n            whale.storage.local.get(key, result => {\n                const clone = {};\n                for (const key in result) {\n                    clone[key.split(prefix)[1]] = result[key];\n                }\n                resolve(clone);\n            });\n        });\n    }\n\n    function set(param) {\n        const clone = {};\n        return new Promise(resolve => {\n            for (const key in param) {\n                clone[prefix + key] = param[key];\n            }\n            whale.storage.local.set(clone, resolve);\n        });\n    }\n\n    function listen(param, callback) {\n        if (typeof param === `string`) {\n            listeners[prefix + param] = callback;\n        } else {\n            param.forEach(key => {\n                listeners[prefix + key] = callback;\n            });\n        }\n    }\n\n    function onStorageChange(result) {\n        for (const key in result) {\n            if (listeners[key]) {\n                listeners[key](result[key].newValue);\n            }\n        }\n    }\n\n    whale.storage.onChanged.addListener(onStorageChange);\n\n    return {\n        get, set, listen\n    };\n})();\n\n\n//# sourceURL=webpack:///./src/wl.Storage.js?")
    }, 3: function (module, exports, __webpack_require__) {
        eval('module.exports = __webpack_require__(/*! ./src/wl.Storage.js */"./src/wl.Storage.js");\n\n\n//# sourceURL=webpack:///multi_./src/wl.Storage.js?')
    }
});