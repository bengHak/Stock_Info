!function (e) {
    var t = {};

    function n(c) {
        if (t[c]) return t[c].exports;
        var i = t[c] = {i: c, l: !1, exports: {}};
        return e[c].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }

    n.m = e, n.c = t, n.d = function (e, t, c) {
        n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: c})
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var c = Object.create(null);
        if (n.r(c), Object.defineProperty(c, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var i in e) n.d(c, i, function (t) {
            return e[t]
        }.bind(null, i));
        return c
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 3)
}([, , function (e, t) {
    !function () {
        let e, t, n, c, i, M, o, k = null, I = null;

        function l(e) {
            if (0 !== o.value.length) if (o.value.length > 5e4) p("$utils.common.alert({'title': '메모 최대 입력 글자수는 50000자 입니다.', 'desc': '현재 입력한 글자수 : " + o.value.length + "'});"); else {
                var t = {addedImages: "[]", deletedImages: "[]", content: o.value}, n = new XMLHttpRequest;
                n.open("POST", "/memos", !0), n.setRequestHeader("Content-type", "application/json"), n.onload = function () {
                    let e = JSON.parse(this.responseText);
                    void 0 !== e.content ? location.reload() : $utils.common.alert({title: e.message})
                }, n.send(JSON.stringify(t)), whale.storage.local.set({quickMemo: "", url: ""})
            }
        }

        function a(e) {
            d(), whale.storage.local.set({quickMemo: "", url: ""})
        }

        function O(e) {
            !function () {
                let e = o.parentNode;
                o.style.height = "104px", e.querySelectorAll("button").forEach(e => {
                    e.style.display = "block"
                }), e.style.padding = "22px 20px 25px"
            }(), I = setInterval(r, 500)
        }

        function T(e) {
            0 === e.currentTarget.value.length && d(), clearInterval(I), I = null
        }

        function r() {
            const e = document.querySelector(".quickeditor textarea").value;
            whale.storage.local.set({quickMemo: e})
        }

        function d() {
            let e = o.parentNode;
            o.value = "", o.style.height = "22px", e.querySelectorAll("button").forEach(e => {
                e.style.display = "none"
            }), e.style.padding = "22px 20px 21px"
        }

        function N(e, t, n) {
            console.log(e)
        }

        function g(e) {
            return e.stopPropagation(), !1
        }

        function u() {
            let e = document.querySelector("._content");
            "" === e.value && ("url" === k ? e.value = "링크" : "screenshot" === k ? e.value = "화면캡쳐" : "pasteImage" === k && (e.value = "사진")), k = null
        }

        function y(e) {
            let t = "A" === e.target.tagName ? e.target : e.target.closest("a");
            if (t && (t.href.includes("whale:") || "_blank" === t.target)) return e.stopPropagation(), e.preventDefault(), wl.RuntimeMessage.send("navermemo", {
                msg: "openPage",
                url: t.href
            }).then(function () {
            }), !1
        }

        function s() {
            "visible" === document.visibilityState && o.focus()
        }

        function j(t) {
            if (!1 === e.classList.contains("list_edit_mode")) return;
            let n = t.target.closest(".memo_cover");
            if (n) {
                let e = n.querySelector("._chk_memo");
                e && (!0 === e.checked ? n.classList.add("selected") : n.classList.remove("selected"))
            }
        }

        function z(e) {
            document.querySelectorAll(".memo_cover").forEach(t => {
                !0 === e ? t.classList.add("selected") : t.classList.remove("selected")
            })
        }

        function D() {
            z(!1)
        }

        function m() {
            !0 === t.classList.contains("unselected") ? z(!0) : z(!1)
        }

        function p(e) {
            let t = "_scriptinjection", n = document.getElementById(t);
            n && document.body.removeChild(n);
            let c = document.createElement("script");
            c.id = t, c.innerHTML = e, document.body.appendChild(c)
        }

        function A() {
            wl.RuntimeMessage.send("navermemo", {msg: "capture"}).then(function (e) {
                k = "screenshot", p('memo.editor.addImage("' + e.result + '");')
            })
        }

        function b() {
            location.reload()
        }

        function x(e) {
            let t = e.clipboardData ? e.clipboardData : window.clipboardData, n = null;
            if ("Files" === t.types[0] ? n = t.items[0].getAsFile() : t.types.length > 1 && "Files" === t.types[1] && (n = t.items[1].getAsFile()), n) {
                var c = new FileReader;
                c.onload = function (e) {
                    wl.RuntimeMessage.send("navermemo", {msg: "pasteImage", data: e.target.result}).then(function (e) {
                        k = "pasteImage", p('memo.editor.addImage("' + e.result + '");')
                    })
                }, c.readAsDataURL(n)
            }
        }

        function L() {
            wl.RuntimeMessage.send("navermemo", {msg: "getUrl"}).then(function (e) {
                k = "url", p('memo.editor.addLink({linkUrl: "' + e.url + '"});')
            })
        }

        window.addEventListener("load", function () {
            !function (e) {
                document.querySelector(".wrap").style.cssText += `\n      animation-name: fadein;\n      animation-duration: 500ms;\n      animation-fill-mode: forwards;\n      animation-delay: ${e}ms;\n    `
            }(0);
            let k = navigator.userAgent;
            k.includes("Whale") && k.includes("sidebar") && (document.body.classList.add("_whale"), e = document.querySelector(".wrap"), t = document.querySelector(".edit_task"), document.getElementById("_list").addEventListener("click", j, !1), document.querySelector(".edit_task ._btn_close").addEventListener("click", D, !1), document.querySelector(".edit_task ._btn_all_select").addEventListener("click", m, !1), function () {
                let e = document.getElementById("_container"), t = document.createElement("DIV"),
                    n = document.createElement("DIV"), c = document.createElement("BUTTON"),
                    i = document.createElement("BUTTON");
                t.style.cssText = "\n      position:relative;\n      width: 100%;\n      padding: 8px;\n      box-sizing: border-box;\n      background-color: #f4f4f4;\n      border-bottom: 1px solid #e5e5e5;\n      z-index: 9;\n    ", t.className = "quickeditor", n.style.cssText = "\n      position:relative;\n      width: 100%;\n      padding: 22px 20px 21px;\n      border: 1px solid #d6d6d6;\n      background-color: #fff;\n      box-sizing: border-box;\n    ", (o = document.createElement("TEXTAREA")).placeholder = "간단한 메모는 여기에", o.spellcheck = !1, o.style.cssText = "\n      width: 100%;\n      height: 22px;\n      border: none;\n      box-sizing: border-box;\n      font-size: 16px;\n      transition-property:height;\n      transition-duration:200ms;\n      resize: none;\n    ", c.innerHTML = "저장하기", c.style.cssText = "\n      border:none;\n      background:transparent;\n      font-size: 11px;\n      width: 55px;\n      height: 15px;\n      position:absolute;\n      bottom: 8px;\n      right: 60px;\n      color: #b8b8b8;\n      border-right: 1px solid #b8b8b8;\n      display: none;\n    ", i.innerHTML = "취소하기", i.style.cssText = "\n      border:none;\n      background:transparent;\n      font-size: 11px;\n      width: 55px;\n      height: 15px;\n      position:absolute;\n      bottom: 8px;\n      right: 5px;\n      color: #b8b8b8;\n      display: none;\n    ", n.appendChild(o), n.appendChild(c), n.appendChild(i), t.appendChild(n), o.addEventListener("focus", O, !1), o.addEventListener("blur", T, !1), c.addEventListener("click", l, !1), i.addEventListener("click", a, !1), e.insertBefore(t, e.childNodes[0])
            }(), (c = document.createElement("BUTTON")).type = "button", c.style.cssText = "\n      display: inline-block;\n      height: 23px;\n      width: 23px;\n      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAQCAYAAAD9L+QYAAAAqUlEQVQ4T92Uuw0CMRBEb5wS0w8ZCWX4JiMkRNRAQOJ1A3RBCbRxIiVmkAMji3+wEugcrWTrrfaNtSC5kbQCMOmcjqQBwA4kB0lzMzs6sbsY4yyEsEff9xczC17gyincEcFJqoyWUip5PNR17HJf6vZNq/aplk/wV01rs7fOfwr/Xy1tSDXY++C+CXpk/9xrDVQtZ0mLnPPBC3xbXCTXkpYApl5wSScA2yvi7N2/Mq1A+gAAAABJRU5ErkJggg==);\n      background-repeat: no-repeat;\n      background-position: center;\n      background-size: 23px 16px;\n      vertical-align:middle;\n      margin-top: 5px;\n     ", (i = document.createElement("BUTTON")).type = "button", i.style.cssText = "\n      width: 23px;\n      height: 23px;\n      background-image: url(data:image/svg+xml;base64,PHN2ZyBpZD0iU3ZnanNTdmcxMDUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iMjMiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyMyAxNiI+PHRpdGxlPlNoYXBlIDI4MDwvdGl0bGU+PGRlc2M+Q3JlYXRlZCB3aXRoIEF2b2NvZGUuPC9kZXNjPjxkZWZzIGlkPSJTdmdqc0RlZnMxMDUxIj48Y2xpcFBhdGggaWQ9IlN2Z2pzQ2xpcFBhdGgxMDU3Ij48cGF0aCBpZD0iU3ZnanNQYXRoMTA1NiIgZD0iTTc3MyAyMjlINzg2Qzc4Ny4xMDQgMjI5IDc4OCAyMjkuODk1IDc4OCAyMzFWMjM5Qzc4OCAyNDAuMTA1IDc4Ny4xMDQgMjQxIDc4NiAyNDFINzczQzc3MS44OTUgMjQxIDc3MSAyNDAuMTA1IDc3MSAyMzlWMjMxQzc3MSAyMjkuODk1IDc3MS44OTUgMjI5IDc3MyAyMjlaICIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvY2xpcFBhdGg+PC9kZWZzPjxwYXRoIGlkPSJTdmdqc1BhdGgxMDUyIiBkPSJNNzcyIDI0MEw3NzYgMjM2TDc3OSAyMzhMNzgyIDIzNEw3ODcgMjQwWiAiIGZpbGw9IiM2NjY2NjYiIGZpbGwtb3BhY2l0eT0iMSIgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwtNzY4LC0yMjcpIj48L3BhdGg+PHBhdGggaWQ9IlN2Z2pzUGF0aDEwNTMiIGQ9Ik03NjguNSAyMjdDNzY4Ljc3NiAyMjcgNzY5IDIyNy4yMjQgNzY5IDIyNy41VjIzMC41Qzc2OSAyMzAuNzc2IDc2OC43NzYgMjMxIDc2OC41IDIzMUM3NjguMjI0IDIzMSA3NjggMjMwLjc3NiA3NjggMjMwLjVWMjI3LjVDNzY4IDIyNy4yMjQgNzY4LjIyNCAyMjcgNzY4LjUgMjI3Wk03NjguNSAyMjdINzcxLjVDNzcxLjc3NiAyMjcgNzcyIDIyNy4yMjQgNzcyIDIyNy41Qzc3MiAyMjcuNzc2IDc3MS43NzYgMjI4IDc3MS41IDIyOEg3NjguNUM3NjguMjI0IDIyOCA3NjggMjI3Ljc3NiA3NjggMjI3LjVDNzY4IDIyNy4yMjQgNzY4LjIyNCAyMjcgNzY4LjUgMjI3Wk03OTAuNSAyMjdDNzkwLjc3NiAyMjcgNzkxIDIyNy4yMjQgNzkxIDIyNy41VjIzMC41Qzc5MSAyMzAuNzc2IDc5MC43NzYgMjMxIDc5MC41IDIzMUM3OTAuMjI0IDIzMSA3OTAgMjMwLjc3NiA3OTAgMjMwLjVWMjI3LjVDNzkwIDIyNy4yMjQgNzkwLjIyNCAyMjcgNzkwLjUgMjI3Wk03ODcuNSAyMjdINzkwLjVDNzkwLjc3NiAyMjcgNzkxIDIyNy4yMjQgNzkxIDIyNy41Qzc5MSAyMjcuNzc2IDc5MC43NzYgMjI4IDc5MC41IDIyOEg3ODcuNUM3ODcuMjI0IDIyOCA3ODcgMjI3Ljc3NiA3ODcgMjI3LjVDNzg3IDIyNy4yMjQgNzg3LjIyNCAyMjcgNzg3LjUgMjI3Wk03NjguNSAyMzlDNzY4Ljc3NiAyMzkgNzY5IDIzOS4yMjQgNzY5IDIzOS41VjI0Mi41Qzc2OSAyNDIuNzc2IDc2OC43NzYgMjQzIDc2OC41IDI0M0M3NjguMjI0IDI0MyA3NjggMjQyLjc3NiA3NjggMjQyLjVWMjM5LjVDNzY4IDIzOS4yMjQgNzY4LjIyNCAyMzkgNzY4LjUgMjM5Wk03NjguNSAyNDJINzcxLjVDNzcxLjc3NiAyNDIgNzcyIDI0Mi4yMjQgNzcyIDI0Mi41Qzc3MiAyNDIuNzc2IDc3MS43NzYgMjQzIDc3MS41IDI0M0g3NjguNUM3NjguMjI0IDI0MyA3NjggMjQyLjc3NiA3NjggMjQyLjVDNzY4IDI0Mi4yMjQgNzY4LjIyNCAyNDIgNzY4LjUgMjQyWk03OTAuNSAyMzlDNzkwLjc3NiAyMzkgNzkxIDIzOS4yMjQgNzkxIDIzOS41VjI0Mi41Qzc5MSAyNDIuNzc2IDc5MC43NzYgMjQzIDc5MC41IDI0M0M3OTAuMjI0IDI0MyA3OTAgMjQyLjc3NiA3OTAgMjQyLjVWMjM5LjVDNzkwIDIzOS4yMjQgNzkwLjIyNCAyMzkgNzkwLjUgMjM5Wk03ODcuNSAyNDJINzkwLjVDNzkwLjc3NiAyNDIgNzkxIDI0Mi4yMjQgNzkxIDI0Mi41Qzc5MSAyNDIuNzc2IDc5MC43NzYgMjQzIDc5MC41IDI0M0g3ODcuNUM3ODcuMjI0IDI0MyA3ODcgMjQyLjc3NiA3ODcgMjQyLjVDNzg3IDI0Mi4yMjQgNzg3LjIyNCAyNDIgNzg3LjUgMjQyWiAiIGZpbGw9IiM2NjY2NjYiIGZpbGwtb3BhY2l0eT0iMSIgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSwtNzY4LC0yMjcpIj48L3BhdGg+PHBhdGggaWQ9IlN2Z2pzUGF0aDEwNTQiIGQ9Ik03NzggMjMyQzc3OC41NTIgMjMyIDc3OSAyMzIuNDQ4IDc3OSAyMzNDNzc5IDIzMy41NTIgNzc4LjU1MiAyMzQgNzc4IDIzNEM3NzcuNDQ3IDIzNCA3NzcgMjMzLjU1MiA3NzcgMjMzQzc3NyAyMzIuNDQ4IDc3Ny40NDcgMjMyIDc3OCAyMzJaICIgZmlsbD0iIzY2NjY2NiIgZmlsbC1vcGFjaXR5PSIxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLC03NjgsLTIyNykiPjwvcGF0aD48cGF0aCBpZD0iU3ZnanNQYXRoMTA1NSIgZD0iTTc3MyAyMjlINzg2Qzc4Ny4xMDQgMjI5IDc4OCAyMjkuODk1IDc4OCAyMzFWMjM5Qzc4OCAyNDAuMTA1IDc4Ny4xMDQgMjQxIDc4NiAyNDFINzczQzc3MS44OTUgMjQxIDc3MSAyNDAuMTA1IDc3MSAyMzlWMjMxQzc3MSAyMjkuODk1IDc3MS44OTUgMjI5IDc3MyAyMjlaICIgZmlsbC1vcGFjaXR5PSIwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2UtZGFzaGFycmF5PSIwIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZT0iIzY2NjY2NiIgc3Ryb2tlLW1pdGVybGltaXQ9IjUwIiBzdHJva2Utd2lkdGg9IjIiIGNsaXAtcGF0aD0idXJsKCZxdW90OyNTdmdqc0NsaXBQYXRoMTA1NyZxdW90OykiIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsLTc2OCwtMjI3KSI+PC9wYXRoPjwvc3ZnPg==);\n      background-repeat: no-repeat;\n      background-position: center;\n      background-size: 23px 16px;\n      margin-right: 14px;\n      vertical-align:middle;\n      margin-top: 5px;\n      ", (n = document.querySelector("#_memoForm .task_cover")).appendChild(c), n.appendChild(i), n.insertBefore(c, n.childNodes[0]), n.insertBefore(i, n.childNodes[0]), c.addEventListener("click", L, !1), i.addEventListener("click", A, !1), (M = document.createElement("BUTTON")).type = "button", M.style.cssText = "\n      display:inline-block;\n      width: 18px;\n      height: 18px;\n      background-image: url(data:image/svg+xml;base64,PHN2ZyBpZD0iU3ZnanNTdmcxMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCI+PHRpdGxlPlNoYXBlIDI4NCBjb3B5PC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggQXZvY29kZS48L2Rlc2M+PGRlZnMgaWQ9IlN2Z2pzRGVmczEwMDEiPjwvZGVmcz48cGF0aCBpZD0iU3ZnanNQYXRoMTAwNyIgZD0iTTM5OTkuOCAyMzYuMjAxTDM5OTguNTMgMjM3LjQ2Njk5OTk5OTk5OTk4QzM5OTcuNTkgMjM2LjUyMyAzOTk2LjM0IDIzNS45OTk5OTk5OTk5OTk5NyAzOTk1IDIzNS45OTk5OTk5OTk5OTk5N0MzOTkyLjI0IDIzNS45OTk5OTk5OTk5OTk5NyAzOTkwIDIzOC4yNDI5OTk5OTk5OTk5NyAzOTkwIDI0MC45OTk5OTk5OTk5OTk5N0MzOTkwIDI0My43NTY5OTk5OTk5OTk5OCAzOTkyLjI0IDI0NS45OTk5OTk5OTk5OTk5NyAzOTk1IDI0NS45OTk5OTk5OTk5OTk5N0MzOTk3LjM1IDI0NS45OTk5OTk5OTk5OTk5NyAzOTk5LjMyIDI0NC4zNzE5OTk5OTk5OTk5OSAzOTk5Ljg1IDI0Mi4xODc5OTk5OTk5OTk5NkgzOTk4LjU0OTk5OTk5OTk5OTdDMzk5OC4wNiAyNDMuNjczOTk5OTk5OTk5OTUgMzk5Ni42NDk5OTk5OTk5OTk2IDI0NC43NDk5OTk5OTk5OTk5NyAzOTk0Ljk5OTk5OTk5OTk5OTUgMjQ0Ljc0OTk5OTk5OTk5OTk3QzM5OTIuOTI5OTk5OTk5OTk5NCAyNDQuNzQ5OTk5OTk5OTk5OTcgMzk5MS4yNDk5OTk5OTk5OTk1IDI0My4wNjc5OTk5OTk5OTk5OCAzOTkxLjI0OTk5OTk5OTk5OTUgMjQwLjk5OTk5OTk5OTk5OTk3QzM5OTEuMjQ5OTk5OTk5OTk5NSAyMzguOTMxOTk5OTk5OTk5OTYgMzk5Mi45Mjk5OTk5OTk5OTk0IDIzNy4yNDk5OTk5OTk5OTk5NyAzOTk0Ljk5OTk5OTk5OTk5OTUgMjM3LjI0OTk5OTk5OTk5OTk3QzM5OTYuMDA5OTk5OTk5OTk5OCAyMzcuMjQ5OTk5OTk5OTk5OTcgMzk5Ni45Mzk5OTk5OTk5OTk2IDIzNy42NDE5OTk5OTk5OTk5NyAzOTk3LjY0OTk5OTk5OTk5OTYgMjM4LjM1MDk5OTk5OTk5OTk3TDM5OTYuMzg5OTk5OTk5OTk5NCAyMzkuNjExOTk5OTk5OTk5OTdDMzk5Ni4zMDk5OTk5OTk5OTk1IDIzOS42ODU5OTk5OTk5OTk5OCAzOTk2LjM2OTk5OTk5OTk5OTQgMjM5LjgxMjk5OTk5OTk5OTk2IDM5OTYuNDY5OTk5OTk5OTk5MyAyMzkuODEyOTk5OTk5OTk5OTZIMzk5OS44Nzk5OTk5OTk5OTlDMzk5OC45NTk5OTk5OTk5OTkgMjQwLjIwMjk5OTk5OTk5OTk1IDM5OTkuOTk5OTk5OTk5OTk5IDIzOS43NTk5OTk5OTk5OTk5NiAzOTk5Ljk5OTk5OTk5OTk5OSAyMzkuNjk0OTk5OTk5OTk5OTZWMjM2LjI4NDk5OTk5OTk5OTk3QzM5OTkuOTk5OTk5OTk5OTk5IDIzNi4xNzk5OTk5OTk5OTk5OCAzOTk5Ljg2OTk5OTk5OTk5OSAyMzYuMTI2OTk5OTk5OTk5OTggMzk5OS43OTk5OTk5OTk5OTkzIDIzNi4yMDA5OTk5OTk5OTk5NlogIiBmaWxsPSIjOGQ4ZDhkIiBmaWxsLW9wYWNpdHk9IjEiIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsLTM5OTAsLTIzNikiPjwvcGF0aD48cGF0aCBpZD0iU3ZnanNQYXRoMTAwOCIgZD0iTTM5OTcgMjQwVjIzOUg0MDAwVjI0MFogIiBmaWxsPSIjOGQ4ZDhkIiBmaWxsLW9wYWNpdHk9IjEiIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsLTM5OTAsLTIzNikiPjwvcGF0aD48L3N2Zz4=);\n      background-repeat: no-repeat;\n      background-position: center;\n      background-size: 10px 10px;\n      border: 1px solid #939393;\n      border-radius: 2px;\n      margin-left: 8px;\n      margin-top: 13px;\n      vertical-align:middle;\n      ", document.querySelector("._title_cover").appendChild(M), M.addEventListener("click", b, !1), c.title = "현재 페이지 웹주소 넣기", i.title = "보이는화면 캡처하여 넣기", document.querySelectorAll("label.btn_move").forEach(e => {
                e.title = "폴더 이동하기"
            }), document.querySelector("._btn_add_image").title = "사진 첨부하기", document.querySelector("._btn_save").title = "저장하기", document.querySelector("._write_memo").innerHTML = "메모쓰기", function () {
                let e = document.querySelector("._bi_naver");
                e.href = "http://www.naver.com", e.target = "_blank";
                let t = document.querySelector("._link_cs");
                t.href = "https://help.naver.com/support/service/main.nhn?serviceNo=639", t.target = "_blank", t.addEventListener("click", g, !0), document.querySelector("._btn_save").addEventListener("mousedown", u, !0), document.querySelector("._content").addEventListener("paste", x, !0), document.addEventListener("click", y, !0), document.addEventListener("visibilitychange", s, !0), wl.RuntimeMessage.listen("navermemo.contextmenu", N)
            }(), whale.storage.local.get("quickMemo", e => {
                e.quickMemo && (o.innerHTML = e.quickMemo, setTimeout(() => {
                    o.focus()
                }, 100))
            }))
        }, !1)
    }()
}, function (e, t, n) {
    e.exports = n(2)
}]);