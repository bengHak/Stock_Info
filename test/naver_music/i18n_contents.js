!function (n) {
    var e = {};

    function t(o) {
        if (e[o]) return e[o].exports;
        var r = e[o] = {i: o, l: !1, exports: {}};
        return n[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports
    }

    t.m = n, t.c = e, t.d = function (n, e, o) {
        t.o(n, e) || Object.defineProperty(n, e, {configurable: !1, enumerable: !0, get: o})
    }, t.r = function (n) {
        Object.defineProperty(n, "__esModule", {value: !0})
    }, t.n = function (n) {
        var e = n && n.__esModule ? function () {
            return n.default
        } : function () {
            return n
        };
        return t.d(e, "a", e), e
    }, t.o = function (n, e) {
        return Object.prototype.hasOwnProperty.call(n, e)
    }, t.p = "", t(t.s = 2)
}({
    "./src/i18n_contents.js": function (module, exports) {
        eval("(function () {\n    `use strict`;\n\n    const content = document.querySelectorAll(`[i18n-content]`);\n    if (content) {\n        content.forEach(node => {\n            const key = node.getAttribute(`i18n-content`);\n            const value = whale.i18n.getMessage(key);\n            node.innerHTML = value;\n        });\n    }\n})();\n\n\n//# sourceURL=webpack:///./src/i18n_contents.js?")
    }, 2: function (module, exports, __webpack_require__) {
        eval('module.exports = __webpack_require__(/*! ./src/i18n_contents.js */"./src/i18n_contents.js");\n\n\n//# sourceURL=webpack:///multi_./src/i18n_contents.js?')
    }
});