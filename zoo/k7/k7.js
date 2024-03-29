
//var kpc = (function () {
    var e = "undefined" != typeof document && document.currentScript ? document.currentScript.src : void 0;
    return function (t) {
        var r;
        (t = t || {}),
            r || (r = void 0 !== t ? t : {}),
            r.expectedDataFileDownloads || ((r.expectedDataFileDownloads = 0), (r.finishedDataFileDownloads = 0)),
            r.expectedDataFileDownloads++,
            (function (e) {
                function t(){} 
                r.calledRun ? t() : (r.preRun || (r.preRun = []), r.preRun.push(t));
            })();
        var n,
            o = {};
        for (n in r) r.hasOwnProperty(n) && (o[n] = r[n]);
        var a,
            i,
            s,
            u = [],
            c = function (e, t) {
                throw t;
            },
            d = !1,
            l = !1;
        if (
            ((d = "object" == typeof window),
            (l = "function" == typeof importScripts),
            (i = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node),
            (a = i && !d && !l),
            (s = !d && !a && !l),
            r.ENVIRONMENT)
        )
            throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
        var f,
            p,
            m,
            E,
            h = "";
        if (a)
            (h = __dirname + "/"),
                (f = function (e, t) {
                    var r;
                    return m || (m = require("fs")), E || (E = require("path")), (e = E.normalize(e)), (r = m.readFileSync(e)), t ? r : r.toString();
                }),
                (p = function (e) {
                    var t = f(e, !0);
                    return t.buffer || (t = new Uint8Array(t)), N(t.buffer), t;
                }),
                process.argv.length > 1 && process.argv[1].replace(/\\/g, "/"),
                (u = process.argv.slice(2)),
                process.on("uncaughtException", function (e) {
                    if (!(e instanceof ir)) throw e;
                }),
                process.on("unhandledRejection", cr),
                (c = function (e) {
                    process.exit(e);
                }),
                (r.inspect = function () {
                    return "[Emscripten Module object]";
                });
        else if (s)
            "undefined" != typeof read &&
                (f = function (e) {
                    return read(e);
                }),
                (p = function (e) {
                    var t;
                    return "function" == typeof readbuffer ? new Uint8Array(readbuffer(e)) : (N("object" == typeof (t = read(e, "binary"))), t);
                }),
                "undefined" != typeof scriptArgs ? (u = scriptArgs) : void 0 !== arguments && (u = arguments),
                "function" == typeof quit &&
                    (c = function (e) {
                        quit(e);
                    }),
                "undefined" != typeof print && ("undefined" == typeof console && (console = {}), (console.log = print), (console.warn = console.error = "undefined" != typeof printErr ? printErr : print));
        else {
            if (!d && !l) throw new Error("environment detection error");
            l ? (h = self.location.href) : document.currentScript && (h = document.currentScript.src),
                e && (h = e),
                (h = 0 !== h.indexOf("blob:") ? h.substr(0, h.lastIndexOf("/") + 1) : ""),
                (f = function (e) {
                    var t = new XMLHttpRequest();
                    return t.open("GET", e, !1), t.send(null), t.responseText;
                }),
                l &&
                    (p = function (e) {
                        var t = new XMLHttpRequest();
                        return t.open("GET", e, !1), (t.responseType = "arraybuffer"), t.send(null), new Uint8Array(t.response);
                    }),
                function (e, t, r) {
                    var n = new XMLHttpRequest();
                    n.open("GET", e, !0),
                        (n.responseType = "arraybuffer"),
                        (n.onload = function () {
                            200 == n.status || (0 == n.status && n.response) ? t(n.response) : r();
                        }),
                        (n.onerror = r),
                        n.send(null);
                },
                function (e) {
                    document.title = e;
                };
        }
        var w = r.print || console.log.bind(console),
            y = r.printErr || console.warn.bind(console);
        for (n in o) o.hasOwnProperty(n) && (r[n] = o[n]);
        function g(e) {
            N(Q);
            var t = C[Q >> 2],
                r = (t + e + 15) & -16;
            return r > ze() && cr("failure to dynamicAlloc - memory growth etc. is not supported there, call malloc/sbrk directly"), (C[Q >> 2] = r), t;
        }
        function v(e) {
            v.shown || (v.shown = {}), v.shown[e] || ((v.shown[e] = 1), y(e));
        }
        (o = null),
            r.arguments && (u = r.arguments),
            Object.getOwnPropertyDescriptor(r, "arguments") ||
                Object.defineProperty(r, "arguments", {
                    get: function () {
                        cr("Module.arguments has been replaced with plain arguments_");
                    },
                }),
            r.thisProgram && r.thisProgram,
            Object.getOwnPropertyDescriptor(r, "thisProgram") ||
                Object.defineProperty(r, "thisProgram", {
                    get: function () {
                        cr("Module.thisProgram has been replaced with plain thisProgram");
                    },
                }),
            r.quit && (c = r.quit),
            Object.getOwnPropertyDescriptor(r, "quit") ||
                Object.defineProperty(r, "quit", {
                    get: function () {
                        cr("Module.quit has been replaced with plain quit_");
                    },
                }),
            N(void 0 === r.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"),
            N(void 0 === r.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"),
            N(void 0 === r.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"),
            N(void 0 === r.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead"),
            N(void 0 === r.read, "Module.read option was removed (modify read_ in JS)"),
            N(void 0 === r.readAsync, "Module.readAsync option was removed (modify readAsync in JS)"),
            N(void 0 === r.readBinary, "Module.readBinary option was removed (modify readBinary in JS)"),
            N(void 0 === r.setWindowTitle, "Module.setWindowTitle option was removed (modify setWindowTitle in JS)"),
            Object.getOwnPropertyDescriptor(r, "read") ||
                Object.defineProperty(r, "read", {
                    get: function () {
                        cr("Module.read has been replaced with plain read_");
                    },
                }),
            Object.getOwnPropertyDescriptor(r, "readAsync") ||
                Object.defineProperty(r, "readAsync", {
                    get: function () {
                        cr("Module.readAsync has been replaced with plain readAsync");
                    },
                }),
            Object.getOwnPropertyDescriptor(r, "readBinary") ||
                Object.defineProperty(r, "readBinary", {
                    get: function () {
                        cr("Module.readBinary has been replaced with plain readBinary");
                    },
                }),
            (nr = ar = or = function () {
                cr("cannot use the stack before compiled code is ready to run, and has provided stack access");
            });
        var _,
            T,
            b = 0,
            O = function (e) {
                b = e;
            };
        r.wasmBinary && (_ = r.wasmBinary),
            Object.getOwnPropertyDescriptor(r, "wasmBinary") ||
                Object.defineProperty(r, "wasmBinary", {
                    get: function () {
                        cr("Module.wasmBinary has been replaced with plain wasmBinary");
                    },
                }),
            "object" != typeof WebAssembly && cr("No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead.");
        var k = !1;
        function N(e, t) {
            e || cr("Assertion failed: " + t);
        }
        function R(e, t, n, o, a) {
            var i = {
                string: function (e) {
                    var t = 0;
                    if (null !== e && void 0 !== e && 0 !== e) {
                        var r = 1 + (e.length << 2);
                        A(e, (t = or(r)), r);
                    }
                    return t;
                },
                array: function (e) {
                    var t,
                        r,
                        n = or(e.length);
                    return (r = n), N((t = e).length >= 0, "writeArrayToMemory array must have a length (should be an array or typed array)"), U.set(t, r), n;
                },
            };
            var s = (function (e) {
                    var t = r["_" + e];
                    return N(t, "Cannot call unknown function " + e + ", make sure it is exported"), t;
                })(e),
                u = [],
                c = 0;
            if ((N("array" !== t, 'Return type should not be "array".'), o))
                for (var d = 0; d < o.length; d++) {
                    var l = i[n[d]];
                    l ? (0 === c && (c = nr()), (u[d] = l(o[d]))) : (u[d] = o[d]);
                }
            var f = s.apply(null, u);
            return (
                N(!(a && a.async), "async call is only supported with Emterpretify for now, see #9029"),
                (f = (function (e) {
                    return "string" === t ? I(e) : "boolean" === t ? Boolean(e) : e;
                })(f)),
                0 !== c && ar(c),
                f
            );
        }
        function D(e) {
            for (var t = ""; ; ) {
                var r = X[e++ >> 0];
                if (!r) return t;
                t += String.fromCharCode(r);
            }
        }
        var M = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
        function S(e, t, r) {
            for (var n = t + r, o = t; e[o] && !(o >= n); ) ++o;
            if (o - t > 16 && e.subarray && M) return M.decode(e.subarray(t, o));
            for (var a = ""; t < o; ) {
                var i = e[t++];
                if (128 & i) {
                    var s = 63 & e[t++];
                    if (192 != (224 & i)) {
                        var u = 63 & e[t++];
                        if (
                            (224 == (240 & i)
                                ? (i = ((15 & i) << 12) | (s << 6) | u)
                                : (240 != (248 & i) && v("Invalid UTF-8 leading byte 0x" + i.toString(16) + " encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!"),
                                  (i = ((7 & i) << 18) | (s << 12) | (u << 6) | (63 & e[t++]))),
                            i < 65536)
                        )
                            a += String.fromCharCode(i);
                        else {
                            var c = i - 65536;
                            a += String.fromCharCode(55296 | (c >> 10), 56320 | (1023 & c));
                        }
                    } else a += String.fromCharCode(((31 & i) << 6) | s);
                } else a += String.fromCharCode(i);
            }
            return a;
        }
        function I(e, t) {
            return e ? S(X, e, t) : "";
        }
        function x(e, t, r, n) {
            if (!(n > 0)) return 0;
            for (var o = r, a = r + n - 1, i = 0; i < e.length; ++i) {
                var s = e.charCodeAt(i);
                if (s >= 55296 && s <= 57343) s = (65536 + ((1023 & s) << 10)) | (1023 & e.charCodeAt(++i));
                if (s <= 127) {
                    if (r >= a) break;
                    t[r++] = s;
                } else if (s <= 2047) {
                    if (r + 1 >= a) break;
                    (t[r++] = 192 | (s >> 6)), (t[r++] = 128 | (63 & s));
                } else if (s <= 65535) {
                    if (r + 2 >= a) break;
                    (t[r++] = 224 | (s >> 12)), (t[r++] = 128 | ((s >> 6) & 63)), (t[r++] = 128 | (63 & s));
                } else {
                    if (r + 3 >= a) break;
                    s >= 2097152 && v("Invalid Unicode code point 0x" + s.toString(16) + " encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF)."),
                        (t[r++] = 240 | (s >> 18)),
                        (t[r++] = 128 | ((s >> 12) & 63)),
                        (t[r++] = 128 | ((s >> 6) & 63)),
                        (t[r++] = 128 | (63 & s));
                }
            }
            return (t[r] = 0), r - o;
        }
        function A(e, t, r) {
            return N("number" == typeof r, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"), x(e, X, t, r);
        }
        function P(e) {
            for (var t = 0, r = 0; r < e.length; ++r) {
                var n = e.charCodeAt(r);
                n >= 55296 && n <= 57343 && (n = (65536 + ((1023 & n) << 10)) | (1023 & e.charCodeAt(++r))), n <= 127 ? ++t : (t += n <= 2047 ? 2 : n <= 65535 ? 3 : 4);
            }
            return t;
        }
        "undefined" != typeof TextDecoder && new TextDecoder("utf-16le");
        var F,
            U,
            X,
            L,
            C,
            j,
            B,
            H = 16384;
        var z = 44304,
            Q = 44288;
        N(!0, "stack must start aligned"), N(!0, "heap must start aligned");
        r.TOTAL_STACK && N(5242880 === r.TOTAL_STACK, "the stack size can no longer be determined at runtime");
        var q = r.TOTAL_MEMORY || 268435456;
        function W() {
            var e = j[1 + (z >> 2)],
                t = j[2 + (z >> 2)];
            (34821223 == e && 2310721022 == t) || cr("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x" + t.toString(16) + " " + e.toString(16)),
                1668509029 !== C[0] && cr("Runtime error: The application has corrupted its heap memory area (address zero)!");
        }
        if (
            (Object.getOwnPropertyDescriptor(r, "TOTAL_MEMORY") ||
                Object.defineProperty(r, "TOTAL_MEMORY", {
                    get: function () {
                        cr("Module.TOTAL_MEMORY has been replaced with plain INITIAL_TOTAL_MEMORY");
                    },
                }),
            N(q >= 5242880, "TOTAL_MEMORY should be larger than TOTAL_STACK, was " + q + "! (TOTAL_STACK=5242880)"),
            N("undefined" != typeof Int32Array && "undefined" != typeof Float64Array && void 0 !== Int32Array.prototype.subarray && void 0 !== Int32Array.prototype.set, "JS engine does not provide full typed array support"),
            (T = r.wasmMemory ? r.wasmMemory : new WebAssembly.Memory({ initial: q / 65536, maximum: q / 65536 })) && (F = T.buffer),
            N((q = F.byteLength) % 65536 == 0),
            (r.HEAP8 = U = new Int8Array(F)),
            (r.HEAP16 = L = new Int16Array(F)),
            (r.HEAP32 = C = new Int32Array(F)),
            (r.HEAPU8 = X = new Uint8Array(F)),
            (r.HEAPU16 = new Uint16Array(F)),
            (r.HEAPU32 = j = new Uint32Array(F)),
            (r.HEAPF32 = new Float32Array(F)),
            (r.HEAPF64 = B = new Float64Array(F)),
            (C[Q >> 2] = 5287184),
            (C[0] = 1668509029),
            (L[1] = 25459),
            115 !== X[2] || 99 !== X[3])
        )
            throw "Runtime error: expected the system to be little-endian!";
        function G(e) {
            for (; e.length > 0; ) {
                var t = e.shift();
                if ("function" != typeof t) {
                    var n = t.func;
                    "number" == typeof n ? (void 0 === t.arg ? r.dynCall_v(n) : r.dynCall_vi(n, t.arg)) : n(void 0 === t.arg ? null : t.arg);
                } else t();
            }
        }
        var V = [],
            Y = [],
            K = [],
            J = [],
            Z = [],
            $ = !1,
            ee = !1;
        N(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"),
            N(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"),
            N(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"),
            N(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
        var te = Math.abs,
            re = Math.ceil,
            ne = Math.floor,
            oe = Math.min,
            ae = 0,
            ie = null,
            se = null,
            ue = {};
        function ce(e) {
            ae++,
                r.monitorRunDependencies && r.monitorRunDependencies(ae),
                e
                    ? (N(!ue[e]),
                      (ue[e] = 1),
                      null === ie &&
                          "undefined" != typeof setInterval &&
                          (ie = setInterval(function () {
                              if (k) return clearInterval(ie), void (ie = null);
                              var e = !1;
                              for (var t in ue) e || ((e = !0), y("still waiting on run dependencies:")), y("dependency: " + t);
                              e && y("(end of list)");
                          }, 1e4)))
                    : y("warning: run dependency added without ID");
        }
        function de(e) {
            if ((ae--, r.monitorRunDependencies && r.monitorRunDependencies(ae), e ? (N(ue[e]), delete ue[e]) : y("warning: run dependency removed without ID"), 0 == ae && (null !== ie && (clearInterval(ie), (ie = null)), se))) {
                var t = se;
                (se = null), t();
            }
        }
        (r.preloadedImages = {}), (r.preloadedAudios = {});
        var le = "data:application/octet-stream;base64,";
        function fe(e) {
            return String.prototype.startsWith ? e.startsWith(le) : 0 === e.indexOf(le);
        }
        var pe,
            me,
            Ee,
            he = "./k7/k.wasm";
        function we() {
            try {
                if (_) return new Uint8Array(_);
                if (p) return p(he);
                throw "both async and sync fetching of the wasm failed";
            } catch (e) {
                cr(e);
            }
        }
        function ye(e) {
            var t = { env: e };
            function n(e, t) {
                var n = e.exports;
                (r.asm = n), de("wasm-instantiate");
            }
            ce("wasm-instantiate");
            var o = r;
            function a(e) {
                N(r === o, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"), (o = null), n(e.instance);
            }
            function i(e) {
                return (_ || (!d && !l) || "function" != typeof fetch
                    ? new Promise(function (e, t) {
                          e(we());
                      })
                    : fetch(he, { credentials: "same-origin" })
                          .then(function (e) {
                              if (!e.ok) throw "failed to load wasm binary file at '" + he + "'";
                              return e.arrayBuffer();
                          })
                          .catch(function () {
                              return we();
                          })
                )
                    .then(function (e) {
                        return WebAssembly.instantiate(e, t);
                    })
                    .then(e, function (e) {
                        y("failed to asynchronously prepare wasm: " + e), cr(e);
                    });
            }
            if (r.instantiateWasm)
                try {
                    return r.instantiateWasm(t, n);
                } catch (e) {
                    return y("Module.instantiateWasm callback failed with error: " + e), !1;
                }
            return (
                (function () {
                    if (_ || "function" != typeof WebAssembly.instantiateStreaming || fe(he) || "function" != typeof fetch) return i(a);
                    fetch(he, { credentials: "same-origin" }).then(function (e) {
                        return WebAssembly.instantiateStreaming(e, t).then(a, function (e) {
                            y("wasm streaming compile failed: " + e), y("falling back to ArrayBuffer instantiation"), i(a);
                        });
                    });
                })(),
                {}
            );
        }
        fe(he) || ((pe = he), (he = r.locateFile ? r.locateFile(pe, h) : h + pe)),
            (r.asm = function (e, t, r) {
                (t.memory = T), (t.table = new WebAssembly.Table({ initial: 285, maximum: 285, element: "anyfunc" }));
                var n = ye(t);
                return N(n, "binaryen setup failed (no wasm support?)"), n;
            });
        var ge = [
            function () {
                return new Date().getTime();
            },
            function () {
                return "undefined" == typeof window ? 23 : window.L2 || 20;
            },
            function () {
                return "undefined" == typeof window ? require("os").cpus().length : navigator.hardwareConcurrency || 1;
            },
            function (e) {
                return wsm.evl(e);
            },
        ];
        function ve(e) {
            return e.replace(/_Z[\w\d_]+/g, function (e) {
                var t,
                    r = ((t = e), v("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling"), t);
                return e === r ? e : r + " [" + e + "]";
            });
        }
        function _e() {
            var e = (function () {
                var e = new Error();
                if (!e.stack) {
                    try {
                        throw new Error(0);
                    } catch (t) {
                        e = t;
                    }
                    if (!e.stack) return "(no stack trace available)";
                }
                return e.stack.toString();
            })();
            return r.extraStackTrace && (e += "\n" + r.extraStackTrace()), ve(e);
        }
        Y.push({
            func: function () {
                Jt();
            },
        });
        var Te = {
            splitPath: function (e) {
                return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1);
            },
            normalizeArray: function (e, t) {
                for (var r = 0, n = e.length - 1; n >= 0; n--) {
                    var o = e[n];
                    "." === o ? e.splice(n, 1) : ".." === o ? (e.splice(n, 1), r++) : r && (e.splice(n, 1), r--);
                }
                if (t) for (; r; r--) e.unshift("..");
                return e;
            },
            normalize: function (e) {
                var t = "/" === e.charAt(0),
                    r = "/" === e.substr(-1);
                return (
                    (e = Te.normalizeArray(
                        e.split("/").filter(function (e) {
                            return !!e;
                        }),
                        !t
                    ).join("/")) ||
                        t ||
                        (e = "."),
                    e && r && (e += "/"),
                    (t ? "/" : "") + e
                );
            },
            dirname: function (e) {
                var t = Te.splitPath(e),
                    r = t[0],
                    n = t[1];
                return r || n ? (n && (n = n.substr(0, n.length - 1)), r + n) : ".";
            },
            basename: function (e) {
                if ("/" === e) return "/";
                var t = e.lastIndexOf("/");
                return -1 === t ? e : e.substr(t + 1);
            },
            extname: function (e) {
                return Te.splitPath(e)[3];
            },
            join: function () {
                var e = Array.prototype.slice.call(arguments, 0);
                return Te.normalize(e.join("/"));
            },
            join2: function (e, t) {
                return Te.normalize(e + "/" + t);
            },
        };
        function be(e) {
            return r.___errno_location ? (C[r.___errno_location() >> 2] = e) : y("failed to set errno from JS"), e;
        }
        var Oe = {
                resolve: function () {
                    for (var e = "", t = !1, r = arguments.length - 1; r >= -1 && !t; r--) {
                        var n = r >= 0 ? arguments[r] : xe.cwd();
                        if ("string" != typeof n) throw new TypeError("Arguments to path.resolve must be strings");
                        if (!n) return "";
                        (e = n + "/" + e), (t = "/" === n.charAt(0));
                    }
                    return (
                        (e = Te.normalizeArray(
                            e.split("/").filter(function (e) {
                                return !!e;
                            }),
                            !t
                        ).join("/")),
                        (t ? "/" : "") + e || "."
                    );
                },
                relative: function (e, t) {
                    function r(e) {
                        for (var t = 0; t < e.length && "" === e[t]; t++);
                        for (var r = e.length - 1; r >= 0 && "" === e[r]; r--);
                        return t > r ? [] : e.slice(t, r - t + 1);
                    }
                    (e = Oe.resolve(e).substr(1)), (t = Oe.resolve(t).substr(1));
                    for (var n = r(e.split("/")), o = r(t.split("/")), a = Math.min(n.length, o.length), i = a, s = 0; s < a; s++)
                        if (n[s] !== o[s]) {
                            i = s;
                            break;
                        }
                    var u = [];
                    for (s = i; s < n.length; s++) u.push("..");
                    return (u = u.concat(o.slice(i))).join("/");
                },
            },
            ke = {
                ttys: [],
                init: function () {},
                shutdown: function () {},
                register: function (e, t) {
                    (ke.ttys[e] = { input: [], output: [], ops: t }), xe.registerDevice(e, ke.stream_ops);
                },
                stream_ops: {
                    open: function (e) {
                        var t = ke.ttys[e.node.rdev];
                        if (!t) throw new xe.ErrnoError(19);
                        (e.tty = t), (e.seekable = !1);
                    },
                    close: function (e) {
                        e.tty.ops.flush(e.tty);
                    },
                    flush: function (e) {
                        e.tty.ops.flush(e.tty);
                    },
                    read: function (e, t, r, n, o) {
                        if (!e.tty || !e.tty.ops.get_char) throw new xe.ErrnoError(6);
                        for (var a = 0, i = 0; i < n; i++) {
                            var s;
                            try {
                                s = e.tty.ops.get_char(e.tty);
                            } catch (e) {
                                throw new xe.ErrnoError(5);
                            }
                            if (void 0 === s && 0 === a) throw new xe.ErrnoError(11);
                            if (null === s || void 0 === s) break;
                            a++, (t[r + i] = s);
                        }
                        return a && (e.node.timestamp = Date.now()), a;
                    },
                    write: function (e, t, r, n, o) {
                        if (!e.tty || !e.tty.ops.put_char) throw new xe.ErrnoError(6);
                        try {
                            for (var a = 0; a < n; a++) e.tty.ops.put_char(e.tty, t[r + a]);
                        } catch (e) {
                            throw new xe.ErrnoError(5);
                        }
                        return n && (e.node.timestamp = Date.now()), a;
                    },
                },
                default_tty_ops: {
                    get_char: function (e) {
                        if (!e.input.length) {
                            var t = null;
                            if (a) {
                                var r = Buffer.alloc ? Buffer.alloc(256) : new Buffer(256),
                                    n = 0,
                                    o = "win32" != process.platform,
                                    i = process.stdin.fd;
                                if (o) {
                                    var s = !1;
                                    try {
                                        (i = Ge.openSync("/dev/stdin", "r")), (s = !0);
                                    } catch (e) {}
                                }
                                try {
                                    n = Ge.readSync(i, r, 0, 256, null);
                                } catch (e) {
                                    if (-1 == e.toString().indexOf("EOF")) throw e;
                                    n = 0;
                                }
                                s && Ge.closeSync(i), (t = n > 0 ? r.slice(0, n).toString("utf-8") : null);
                            } else "undefined" != typeof window && "function" == typeof window.prompt ? null !== (t = window.prompt("Input: ")) && (t += "\n") : "function" == typeof readline && null !== (t = readline()) && (t += "\n");
                            if (!t) return null;
                            e.input = Ye(t, !0);
                        }
                        return e.input.shift();
                    },
                    put_char: function (e, t) {
                        null === t || 10 === t ? (w(S(e.output, 0)), (e.output = [])) : 0 != t && e.output.push(t);
                    },
                    flush: function (e) {
                        e.output && e.output.length > 0 && (w(S(e.output, 0)), (e.output = []));
                    },
                },
                default_tty1_ops: {
                    put_char: function (e, t) {
                        null === t || 10 === t ? (y(S(e.output, 0)), (e.output = [])) : 0 != t && e.output.push(t);
                    },
                    flush: function (e) {
                        e.output && e.output.length > 0 && (y(S(e.output, 0)), (e.output = []));
                    },
                },
            },
            Ne = {
                ops_table: null,
                mount: function (e) {
                    return Ne.createNode(null, "/", 16895, 0);
                },
                createNode: function (e, t, r, n) {
                    if (xe.isBlkdev(r) || xe.isFIFO(r)) throw new xe.ErrnoError(1);
                    Ne.ops_table ||
                        (Ne.ops_table = {
                            dir: {
                                node: {
                                    getattr: Ne.node_ops.getattr,
                                    setattr: Ne.node_ops.setattr,
                                    lookup: Ne.node_ops.lookup,
                                    mknod: Ne.node_ops.mknod,
                                    rename: Ne.node_ops.rename,
                                    unlink: Ne.node_ops.unlink,
                                    rmdir: Ne.node_ops.rmdir,
                                    readdir: Ne.node_ops.readdir,
                                    symlink: Ne.node_ops.symlink,
                                },
                                stream: { llseek: Ne.stream_ops.llseek },
                            },
                            file: {
                                node: { getattr: Ne.node_ops.getattr, setattr: Ne.node_ops.setattr },
                                stream: { llseek: Ne.stream_ops.llseek, read: Ne.stream_ops.read, write: Ne.stream_ops.write, allocate: Ne.stream_ops.allocate, mmap: Ne.stream_ops.mmap, msync: Ne.stream_ops.msync },
                            },
                            link: { node: { getattr: Ne.node_ops.getattr, setattr: Ne.node_ops.setattr, readlink: Ne.node_ops.readlink }, stream: {} },
                            chrdev: { node: { getattr: Ne.node_ops.getattr, setattr: Ne.node_ops.setattr }, stream: xe.chrdev_stream_ops },
                        });
                    var o = xe.createNode(e, t, r, n);
                    return (
                        xe.isDir(o.mode)
                            ? ((o.node_ops = Ne.ops_table.dir.node), (o.stream_ops = Ne.ops_table.dir.stream), (o.contents = {}))
                            : xe.isFile(o.mode)
                            ? ((o.node_ops = Ne.ops_table.file.node), (o.stream_ops = Ne.ops_table.file.stream), (o.usedBytes = 0), (o.contents = null))
                            : xe.isLink(o.mode)
                            ? ((o.node_ops = Ne.ops_table.link.node), (o.stream_ops = Ne.ops_table.link.stream))
                            : xe.isChrdev(o.mode) && ((o.node_ops = Ne.ops_table.chrdev.node), (o.stream_ops = Ne.ops_table.chrdev.stream)),
                        (o.timestamp = Date.now()),
                        e && (e.contents[t] = o),
                        o
                    );
                },
                getFileDataAsRegularArray: function (e) {
                    if (e.contents && e.contents.subarray) {
                        for (var t = [], r = 0; r < e.usedBytes; ++r) t.push(e.contents[r]);
                        return t;
                    }
                    return e.contents;
                },
                getFileDataAsTypedArray: function (e) {
                    return e.contents ? (e.contents.subarray ? e.contents.subarray(0, e.usedBytes) : new Uint8Array(e.contents)) : new Uint8Array();
                },
                expandFileStorage: function (e, t) {
                    var r = e.contents ? e.contents.length : 0;
                    if (!(r >= t)) {
                        (t = Math.max(t, (r * (r < 1048576 ? 2 : 1.125)) | 0)), 0 != r && (t = Math.max(t, 256));
                        var n = e.contents;
                        (e.contents = new Uint8Array(t)), e.usedBytes > 0 && e.contents.set(n.subarray(0, e.usedBytes), 0);
                    }
                },
                resizeFileStorage: function (e, t) {
                    if (e.usedBytes != t) {
                        if (0 == t) return (e.contents = null), void (e.usedBytes = 0);
                        if (!e.contents || e.contents.subarray) {
                            var r = e.contents;
                            return (e.contents = new Uint8Array(new ArrayBuffer(t))), r && e.contents.set(r.subarray(0, Math.min(t, e.usedBytes))), void (e.usedBytes = t);
                        }
                        if ((e.contents || (e.contents = []), e.contents.length > t)) e.contents.length = t;
                        else for (; e.contents.length < t; ) e.contents.push(0);
                        e.usedBytes = t;
                    }
                },
                node_ops: {
                    getattr: function (e) {
                        var t = {};
                        return (
                            (t.dev = xe.isChrdev(e.mode) ? e.id : 1),
                            (t.ino = e.id),
                            (t.mode = e.mode),
                            (t.nlink = 1),
                            (t.uid = 0),
                            (t.gid = 0),
                            (t.rdev = e.rdev),
                            xe.isDir(e.mode) ? (t.size = 4096) : xe.isFile(e.mode) ? (t.size = e.usedBytes) : xe.isLink(e.mode) ? (t.size = e.link.length) : (t.size = 0),
                            (t.atime = new Date(e.timestamp)),
                            (t.mtime = new Date(e.timestamp)),
                            (t.ctime = new Date(e.timestamp)),
                            (t.blksize = 4096),
                            (t.blocks = Math.ceil(t.size / t.blksize)),
                            t
                        );
                    },
                    setattr: function (e, t) {
                        void 0 !== t.mode && (e.mode = t.mode), void 0 !== t.timestamp && (e.timestamp = t.timestamp), void 0 !== t.size && Ne.resizeFileStorage(e, t.size);
                    },
                    lookup: function (e, t) {
                        throw xe.genericErrors[2];
                    },
                    mknod: function (e, t, r, n) {
                        return Ne.createNode(e, t, r, n);
                    },
                    rename: function (e, t, r) {
                        if (xe.isDir(e.mode)) {
                            var n;
                            try {
                                n = xe.lookupNode(t, r);
                            } catch (e) {}
                            if (n) for (var o in n.contents) throw new xe.ErrnoError(39);
                        }
                        delete e.parent.contents[e.name], (e.name = r), (t.contents[r] = e), (e.parent = t);
                    },
                    unlink: function (e, t) {
                        delete e.contents[t];
                    },
                    rmdir: function (e, t) {
                        var r = xe.lookupNode(e, t);
                        for (var n in r.contents) throw new xe.ErrnoError(39);
                        delete e.contents[t];
                    },
                    readdir: function (e) {
                        var t = [".", ".."];
                        for (var r in e.contents) e.contents.hasOwnProperty(r) && t.push(r);
                        return t;
                    },
                    symlink: function (e, t, r) {
                        var n = Ne.createNode(e, t, 41471, 0);
                        return (n.link = r), n;
                    },
                    readlink: function (e) {
                        if (!xe.isLink(e.mode)) throw new xe.ErrnoError(22);
                        return e.link;
                    },
                },
                stream_ops: {
                    read: function (e, t, r, n, o) {
                        var a = e.node.contents;
                        if (o >= e.node.usedBytes) return 0;
                        var i = Math.min(e.node.usedBytes - o, n);
                        if ((N(i >= 0), i > 8 && a.subarray)) t.set(a.subarray(o, o + i), r);
                        else for (var s = 0; s < i; s++) t[r + s] = a[o + s];
                        return i;
                    },
                    write: function (e, t, r, n, o, a) {
                        if (!n) return 0;
                        var i = e.node;
                        if (((i.timestamp = Date.now()), t.subarray && (!i.contents || i.contents.subarray))) {
                            if (a) return N(0 === o, "canOwn must imply no weird position inside the file"), (i.contents = t.subarray(r, r + n)), (i.usedBytes = n), n;
                            if (0 === i.usedBytes && 0 === o) return (i.contents = new Uint8Array(t.subarray(r, r + n))), (i.usedBytes = n), n;
                            if (o + n <= i.usedBytes) return i.contents.set(t.subarray(r, r + n), o), n;
                        }
                        if ((Ne.expandFileStorage(i, o + n), i.contents.subarray && t.subarray)) i.contents.set(t.subarray(r, r + n), o);
                        else for (var s = 0; s < n; s++) i.contents[o + s] = t[r + s];
                        return (i.usedBytes = Math.max(i.usedBytes, o + n)), n;
                    },
                    llseek: function (e, t, r) {
                        var n = t;
                        if ((1 === r ? (n += e.position) : 2 === r && xe.isFile(e.node.mode) && (n += e.node.usedBytes), n < 0)) throw new xe.ErrnoError(22);
                        return n;
                    },
                    allocate: function (e, t, r) {
                        Ne.expandFileStorage(e.node, t + r), (e.node.usedBytes = Math.max(e.node.usedBytes, t + r));
                    },
                    mmap: function (e, t, r, n, o, a, i) {
                        if (!xe.isFile(e.node.mode)) throw new xe.ErrnoError(19);
                        var s,
                            u,
                            c = e.node.contents;
                        if (2 & i || (c.buffer !== t && c.buffer !== t.buffer)) {
                            (o > 0 || o + n < e.node.usedBytes) && (c = c.subarray ? c.subarray(o, o + n) : Array.prototype.slice.call(c, o, o + n)), (u = !0);
                            var d = t.buffer == U.buffer;
                            if (!(s = er(n))) throw new xe.ErrnoError(12);
                            (d ? U : t).set(c, s);
                        } else (u = !1), (s = c.byteOffset);
                        return { ptr: s, allocated: u };
                    },
                    msync: function (e, t, r, n, o) {
                        if (!xe.isFile(e.node.mode)) throw new xe.ErrnoError(19);
                        if (2 & o) return 0;
                        Ne.stream_ops.write(e, t, 0, n, r, !1);
                        return 0;
                    },
                },
            },
            Re = {
                dbs: {},
                indexedDB: function () {
                    if ("undefined" != typeof indexedDB) return indexedDB;
                    var e = null;
                    return "object" == typeof window && (e = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB), N(e, "IDBFS used, but indexedDB not supported"), e;
                },
                DB_VERSION: 21,
                DB_STORE_NAME: "FILE_DATA",
                mount: function (e) {
                    return Ne.mount.apply(null, arguments);
                },
                syncfs: function (e, t, r) {
                    Re.getLocalSet(e, function (n, o) {
                        if (n) return r(n);
                        Re.getRemoteSet(e, function (e, n) {
                            if (e) return r(e);
                            var a = t ? n : o,
                                i = t ? o : n;
                            Re.reconcile(a, i, r);
                        });
                    });
                },
                getDB: function (e, t) {
                    var r,
                        n = Re.dbs[e];
                    if (n) return t(null, n);
                    try {
                        r = Re.indexedDB().open(e, Re.DB_VERSION);
                    } catch (e) {
                        return t(e);
                    }
                    if (!r) return t("Unable to connect to IndexedDB");
                    (r.onupgradeneeded = function (e) {
                        var t,
                            r = e.target.result,
                            n = e.target.transaction;
                        (t = r.objectStoreNames.contains(Re.DB_STORE_NAME) ? n.objectStore(Re.DB_STORE_NAME) : r.createObjectStore(Re.DB_STORE_NAME)).indexNames.contains("timestamp") ||
                            t.createIndex("timestamp", "timestamp", { unique: !1 });
                    }),
                        (r.onsuccess = function () {
                            (n = r.result), (Re.dbs[e] = n), t(null, n);
                        }),
                        (r.onerror = function (e) {
                            t(this.error), e.preventDefault();
                        });
                },
                getLocalSet: function (e, t) {
                    var r = {};
                    function n(e) {
                        return "." !== e && ".." !== e;
                    }
                    function o(e) {
                        return function (t) {
                            return Te.join2(e, t);
                        };
                    }
                    for (var a = xe.readdir(e.mountpoint).filter(n).map(o(e.mountpoint)); a.length; ) {
                        var i,
                            s = a.pop();
                        try {
                            i = xe.stat(s);
                        } catch (e) {
                            return t(e);
                        }
                        xe.isDir(i.mode) && a.push.apply(a, xe.readdir(s).filter(n).map(o(s))), (r[s] = { timestamp: i.mtime });
                    }
                    return t(null, { type: "local", entries: r });
                },
                getRemoteSet: function (e, t) {
                    var r = {};
                    Re.getDB(e.mountpoint, function (e, n) {
                        if (e) return t(e);
                        try {
                            var o = n.transaction([Re.DB_STORE_NAME], "readonly");
                            (o.onerror = function (e) {
                                t(this.error), e.preventDefault();
                            }),
                                (o.objectStore(Re.DB_STORE_NAME).index("timestamp").openKeyCursor().onsuccess = function (e) {
                                    var o = e.target.result;
                                    if (!o) return t(null, { type: "remote", db: n, entries: r });
                                    (r[o.primaryKey] = { timestamp: o.key }), o.continue();
                                });
                        } catch (e) {
                            return t(e);
                        }
                    });
                },
                loadLocalEntry: function (e, t) {
                    var r, n;
                    try {
                        (n = xe.lookupPath(e).node), (r = xe.stat(e));
                    } catch (e) {
                        return t(e);
                    }
                    return xe.isDir(r.mode)
                        ? t(null, { timestamp: r.mtime, mode: r.mode })
                        : xe.isFile(r.mode)
                        ? ((n.contents = Ne.getFileDataAsTypedArray(n)), t(null, { timestamp: r.mtime, mode: r.mode, contents: n.contents }))
                        : t(new Error("node type not supported"));
                },
                storeLocalEntry: function (e, t, r) {
                    try {
                        if (xe.isDir(t.mode)) xe.mkdir(e, t.mode);
                        else {
                            if (!xe.isFile(t.mode)) return r(new Error("node type not supported"));
                            xe.writeFile(e, t.contents, { canOwn: !0 });
                        }
                        xe.chmod(e, t.mode), xe.utime(e, t.timestamp, t.timestamp);
                    } catch (e) {
                        return r(e);
                    }
                    r(null);
                },
                removeLocalEntry: function (e, t) {
                    try {
                        xe.lookupPath(e);
                        var r = xe.stat(e);
                        xe.isDir(r.mode) ? xe.rmdir(e) : xe.isFile(r.mode) && xe.unlink(e);
                    } catch (e) {
                        return t(e);
                    }
                    t(null);
                },
                loadRemoteEntry: function (e, t, r) {
                    var n = e.get(t);
                    (n.onsuccess = function (e) {
                        r(null, e.target.result);
                    }),
                        (n.onerror = function (e) {
                            r(this.error), e.preventDefault();
                        });
                },
                storeRemoteEntry: function (e, t, r, n) {
                    var o = e.put(r, t);
                    (o.onsuccess = function () {
                        n(null);
                    }),
                        (o.onerror = function (e) {
                            n(this.error), e.preventDefault();
                        });
                },
                removeRemoteEntry: function (e, t, r) {
                    var n = e.delete(t);
                    (n.onsuccess = function () {
                        r(null);
                    }),
                        (n.onerror = function (e) {
                            r(this.error), e.preventDefault();
                        });
                },
                reconcile: function (e, t, r) {
                    var n = 0,
                        o = [];
                    Object.keys(e.entries).forEach(function (r) {
                        var a = e.entries[r],
                            i = t.entries[r];
                        (!i || a.timestamp > i.timestamp) && (o.push(r), n++);
                    });
                    var a = [];
                    if (
                        (Object.keys(t.entries).forEach(function (r) {
                            t.entries[r];
                            e.entries[r] || (a.push(r), n++);
                        }),
                        !n)
                    )
                        return r(null);
                    var i = !1,
                        s = ("remote" === e.type ? e.db : t.db).transaction([Re.DB_STORE_NAME], "readwrite"),
                        u = s.objectStore(Re.DB_STORE_NAME);
                    function c(e) {
                        if (e && !i) return (i = !0), r(e);
                    }
                    (s.onerror = function (e) {
                        c(this.error), e.preventDefault();
                    }),
                        (s.oncomplete = function (e) {
                            i || r(null);
                        }),
                        o.sort().forEach(function (e) {
                            "local" === t.type
                                ? Re.loadRemoteEntry(u, e, function (t, r) {
                                      if (t) return c(t);
                                      Re.storeLocalEntry(e, r, c);
                                  })
                                : Re.loadLocalEntry(e, function (t, r) {
                                      if (t) return c(t);
                                      Re.storeRemoteEntry(u, e, r, c);
                                  });
                        }),
                        a
                            .sort()
                            .reverse()
                            .forEach(function (e) {
                                "local" === t.type ? Re.removeLocalEntry(e, c) : Re.removeRemoteEntry(u, e, c);
                            });
                },
            },
            De = {
                isWindows: !1,
                staticInit: function () {
                    De.isWindows = !!process.platform.match(/^win/);
                    var e = process.binding("constants");
                    e.fs && (e = e.fs), (De.flagsForNodeMap = { 1024: e.O_APPEND, 64: e.O_CREAT, 128: e.O_EXCL, 0: e.O_RDONLY, 2: e.O_RDWR, 4096: e.O_SYNC, 512: e.O_TRUNC, 1: e.O_WRONLY });
                },
                bufferFrom: function (e) {
                    return Buffer.alloc ? Buffer.from(e) : new Buffer(e);
                },
                mount: function (e) {
                    return N(i), De.createNode(null, "/", De.getMode(e.opts.root), 0);
                },
                createNode: function (e, t, r, n) {
                    if (!xe.isDir(r) && !xe.isFile(r) && !xe.isLink(r)) throw new xe.ErrnoError(22);
                    var o = xe.createNode(e, t, r);
                    return (o.node_ops = De.node_ops), (o.stream_ops = De.stream_ops), o;
                },
                getMode: function (e) {
                    var t;
                    try {
                        (t = Ge.lstatSync(e)), De.isWindows && (t.mode = t.mode | ((292 & t.mode) >> 2));
                    } catch (e) {
                        if (!e.code) throw e;
                        throw new xe.ErrnoError(-e.errno);
                    }
                    return t.mode;
                },
                realPath: function (e) {
                    for (var t = []; e.parent !== e; ) t.push(e.name), (e = e.parent);
                    return t.push(e.mount.opts.root), t.reverse(), Te.join.apply(null, t);
                },
                flagsForNode: function (e) {
                    (e &= -2097153), (e &= -2049), (e &= -32769), (e &= -524289);
                    var t = 0;
                    for (var r in De.flagsForNodeMap) e & r && ((t |= De.flagsForNodeMap[r]), (e ^= r));
                    if (e) throw new xe.ErrnoError(22);
                    return t;
                },
                node_ops: {
                    getattr: function (e) {
                        var t,
                            r = De.realPath(e);
                        try {
                            t = Ge.lstatSync(r);
                        } catch (e) {
                            if (!e.code) throw e;
                            throw new xe.ErrnoError(-e.errno);
                        }
                        return (
                            De.isWindows && !t.blksize && (t.blksize = 4096),
                            De.isWindows && !t.blocks && (t.blocks = ((t.size + t.blksize - 1) / t.blksize) | 0),
                            { dev: t.dev, ino: t.ino, mode: t.mode, nlink: t.nlink, uid: t.uid, gid: t.gid, rdev: t.rdev, size: t.size, atime: t.atime, mtime: t.mtime, ctime: t.ctime, blksize: t.blksize, blocks: t.blocks }
                        );
                    },
                    setattr: function (e, t) {
                        var r = De.realPath(e);
                        try {
                            if ((void 0 !== t.mode && (Ge.chmodSync(r, t.mode), (e.mode = t.mode)), void 0 !== t.timestamp)) {
                                var n = new Date(t.timestamp);
                                Ge.utimesSync(r, n, n);
                            }
                            void 0 !== t.size && Ge.truncateSync(r, t.size);
                        } catch (e) {
                            if (!e.code) throw e;
                            throw new xe.ErrnoError(-e.errno);
                        }
                    },
                    lookup: function (e, t) {
                        var r = Te.join2(De.realPath(e), t),
                            n = De.getMode(r);
                        return De.createNode(e, t, n);
                    },
                    mknod: function (e, t, r, n) {
                        var o = De.createNode(e, t, r, n),
                            a = De.realPath(o);
                        try {
                            xe.isDir(o.mode) ? Ge.mkdirSync(a, o.mode) : Ge.writeFileSync(a, "", { mode: o.mode });
                        } catch (e) {
                            if (!e.code) throw e;
                            throw new xe.ErrnoError(-e.errno);
                        }
                        return o;
                    },
                    rename: function (e, t, r) {
                        var n = De.realPath(e),
                            o = Te.join2(De.realPath(t), r);
                        try {
                            Ge.renameSync(n, o);
                        } catch (e) {
                            if (!e.code) throw e;
                            throw new xe.ErrnoError(-e.errno);
                        }
                    },
                    unlink: function (e, t) {
                        var r = Te.join2(De.realPath(e), t);
                        try {
                            Ge.unlinkSync(r);
                        } catch (e) {
                            if (!e.code) throw e;
                            throw new xe.ErrnoError(-e.errno);
                        }
                    },
                    rmdir: function (e, t) {
                        var r = Te.join2(De.realPath(e), t);
                        try {
                            Ge.rmdirSync(r);
                        } catch (e) {
                            if (!e.code) throw e;
                            throw new xe.ErrnoError(-e.errno);
                        }
                    },
                    readdir: function (e) {
                        var t = De.realPath(e);
                        try {
                            return Ge.readdirSync(t);
                        } catch (e) {
                            if (!e.code) throw e;
                            throw new xe.ErrnoError(-e.errno);
                        }
                    },
                    symlink: function (e, t, r) {
                        var n = Te.join2(De.realPath(e), t);
                        try {
                            Ge.symlinkSync(r, n);
                        } catch (e) {
                            if (!e.code) throw e;
                            throw new xe.ErrnoError(-e.errno);
                        }
                    },
                    readlink: function (e) {
                        var t = De.realPath(e);
                        try {
                            return (t = Ge.readlinkSync(t)), (t = Ve.relative(Ve.resolve(e.mount.opts.root), t));
                        } catch (e) {
                            if (!e.code) throw e;
                            throw new xe.ErrnoError(-e.errno);
                        }
                    },
                },
                stream_ops: {
                    open: function (e) {
                        var t = De.realPath(e.node);
                        try {
                            xe.isFile(e.node.mode) && (e.nfd = Ge.openSync(t, De.flagsForNode(e.flags)));
                        } catch (e) {
                            if (!e.code) throw e;
                            throw new xe.ErrnoError(-e.errno);
                        }
                    },
                    close: function (e) {
                        try {
                            xe.isFile(e.node.mode) && e.nfd && Ge.closeSync(e.nfd);
                        } catch (e) {
                            if (!e.code) throw e;
                            throw new xe.ErrnoError(-e.errno);
                        }
                    },
                    read: function (e, t, r, n, o) {
                        if (0 === n) return 0;
                        try {
                            return Ge.readSync(e.nfd, De.bufferFrom(t.buffer), r, n, o);
                        } catch (e) {
                            throw new xe.ErrnoError(-e.errno);
                        }
                    },
                    write: function (e, t, r, n, o) {
                        try {
                            return Ge.writeSync(e.nfd, De.bufferFrom(t.buffer), r, n, o);
                        } catch (e) {
                            throw new xe.ErrnoError(-e.errno);
                        }
                    },
                    llseek: function (e, t, r) {
                        var n = t;
                        if (1 === r) n += e.position;
                        else if (2 === r && xe.isFile(e.node.mode))
                            try {
                                n += Ge.fstatSync(e.nfd).size;
                            } catch (e) {
                                throw new xe.ErrnoError(-e.errno);
                            }
                        if (n < 0) throw new xe.ErrnoError(22);
                        return n;
                    },
                },
            },
            Me = {
                DIR_MODE: 16895,
                FILE_MODE: 33279,
                reader: null,
                mount: function (e) {
                    N(l), Me.reader || (Me.reader = new FileReaderSync());
                    var t = Me.createNode(null, "/", Me.DIR_MODE, 0),
                        r = {};
                    function n(e) {
                        for (var n = e.split("/"), o = t, a = 0; a < n.length - 1; a++) {
                            var i = n.slice(0, a + 1).join("/");
                            r[i] || (r[i] = Me.createNode(o, n[a], Me.DIR_MODE, 0)), (o = r[i]);
                        }
                        return o;
                    }
                    function o(e) {
                        var t = e.split("/");
                        return t[t.length - 1];
                    }
                    return (
                        Array.prototype.forEach.call(e.opts.files || [], function (e) {
                            Me.createNode(n(e.name), o(e.name), Me.FILE_MODE, 0, e, e.lastModifiedDate);
                        }),
                        (e.opts.blobs || []).forEach(function (e) {
                            Me.createNode(n(e.name), o(e.name), Me.FILE_MODE, 0, e.data);
                        }),
                        (e.opts.packages || []).forEach(function (e) {
                            e.metadata.files.forEach(function (t) {
                                var r = t.filename.substr(1);
                                Me.createNode(n(r), o(r), Me.FILE_MODE, 0, e.blob.slice(t.start, t.end));
                            });
                        }),
                        t
                    );
                },
                createNode: function (e, t, r, n, o, a) {
                    var i = xe.createNode(e, t, r);
                    return (
                        (i.mode = r),
                        (i.node_ops = Me.node_ops),
                        (i.stream_ops = Me.stream_ops),
                        (i.timestamp = (a || new Date()).getTime()),
                        N(Me.FILE_MODE !== Me.DIR_MODE),
                        r === Me.FILE_MODE ? ((i.size = o.size), (i.contents = o)) : ((i.size = 4096), (i.contents = {})),
                        e && (e.contents[t] = i),
                        i
                    );
                },
                node_ops: {
                    getattr: function (e) {
                        return {
                            dev: 1,
                            ino: void 0,
                            mode: e.mode,
                            nlink: 1,
                            uid: 0,
                            gid: 0,
                            rdev: void 0,
                            size: e.size,
                            atime: new Date(e.timestamp),
                            mtime: new Date(e.timestamp),
                            ctime: new Date(e.timestamp),
                            blksize: 4096,
                            blocks: Math.ceil(e.size / 4096),
                        };
                    },
                    setattr: function (e, t) {
                        void 0 !== t.mode && (e.mode = t.mode), void 0 !== t.timestamp && (e.timestamp = t.timestamp);
                    },
                    lookup: function (e, t) {
                        throw new xe.ErrnoError(2);
                    },
                    mknod: function (e, t, r, n) {
                        throw new xe.ErrnoError(1);
                    },
                    rename: function (e, t, r) {
                        throw new xe.ErrnoError(1);
                    },
                    unlink: function (e, t) {
                        throw new xe.ErrnoError(1);
                    },
                    rmdir: function (e, t) {
                        throw new xe.ErrnoError(1);
                    },
                    readdir: function (e) {
                        var t = [".", ".."];
                        for (var r in e.contents) e.contents.hasOwnProperty(r) && t.push(r);
                        return t;
                    },
                    symlink: function (e, t, r) {
                        throw new xe.ErrnoError(1);
                    },
                    readlink: function (e) {
                        throw new xe.ErrnoError(1);
                    },
                },
                stream_ops: {
                    read: function (e, t, r, n, o) {
                        if (o >= e.node.size) return 0;
                        var a = e.node.contents.slice(o, o + n),
                            i = Me.reader.readAsArrayBuffer(a);
                        return t.set(new Uint8Array(i), r), a.size;
                    },
                    write: function (e, t, r, n, o) {
                        throw new xe.ErrnoError(5);
                    },
                    llseek: function (e, t, r) {
                        var n = t;
                        if ((1 === r ? (n += e.position) : 2 === r && xe.isFile(e.node.mode) && (n += e.node.size), n < 0)) throw new xe.ErrnoError(22);
                        return n;
                    },
                },
            },
            Se = {
                0: "Success",
                1: "Not super-user",
                2: "No such file or directory",
                3: "No such process",
                4: "Interrupted system call",
                5: "I/O error",
                6: "No such device or address",
                7: "Arg list too long",
                8: "Exec format error",
                9: "Bad file number",
                10: "No children",
                11: "No more processes",
                12: "Not enough core",
                13: "Permission denied",
                14: "Bad address",
                15: "Block device required",
                16: "Mount device busy",
                17: "File exists",
                18: "Cross-device link",
                19: "No such device",
                20: "Not a directory",
                21: "Is a directory",
                22: "Invalid argument",
                23: "Too many open files in system",
                24: "Too many open files",
                25: "Not a typewriter",
                26: "Text file busy",
                27: "File too large",
                28: "No space left on device",
                29: "Illegal seek",
                30: "Read only file system",
                31: "Too many links",
                32: "Broken pipe",
                33: "Math arg out of domain of func",
                34: "Math result not representable",
                35: "File locking deadlock error",
                36: "File or path name too long",
                37: "No record locks available",
                38: "Function not implemented",
                39: "Directory not empty",
                40: "Too many symbolic links",
                42: "No message of desired type",
                43: "Identifier removed",
                44: "Channel number out of range",
                45: "Level 2 not synchronized",
                46: "Level 3 halted",
                47: "Level 3 reset",
                48: "Link number out of range",
                49: "Protocol driver not attached",
                50: "No CSI structure available",
                51: "Level 2 halted",
                52: "Invalid exchange",
                53: "Invalid request descriptor",
                54: "Exchange full",
                55: "No anode",
                56: "Invalid request code",
                57: "Invalid slot",
                59: "Bad font file fmt",
                60: "Device not a stream",
                61: "No data (for no delay io)",
                62: "Timer expired",
                63: "Out of streams resources",
                64: "Machine is not on the network",
                65: "Package not installed",
                66: "The object is remote",
                67: "The link has been severed",
                68: "Advertise error",
                69: "Srmount error",
                70: "Communication error on send",
                71: "Protocol error",
                72: "Multihop attempted",
                73: "Cross mount point (not really error)",
                74: "Trying to read unreadable message",
                75: "Value too large for defined data type",
                76: "Given log. name not unique",
                77: "f.d. invalid for this operation",
                78: "Remote address changed",
                79: "Can   access a needed shared lib",
                80: "Accessing a corrupted shared lib",
                81: ".lib section in a.out corrupted",
                82: "Attempting to link in too many libs",
                83: "Attempting to exec a shared library",
                84: "Illegal byte sequence",
                86: "Streams pipe error",
                87: "Too many users",
                88: "Socket operation on non-socket",
                89: "Destination address required",
                90: "Message too long",
                91: "Protocol wrong type for socket",
                92: "Protocol not available",
                93: "Unknown protocol",
                94: "Socket type not supported",
                95: "Not supported",
                96: "Protocol family not supported",
                97: "Address family not supported by protocol family",
                98: "Address already in use",
                99: "Address not available",
                100: "Network interface is not configured",
                101: "Network is unreachable",
                102: "Connection reset by network",
                103: "Connection aborted",
                104: "Connection reset by peer",
                105: "No buffer space available",
                106: "Socket is already connected",
                107: "Socket is not connected",
                108: "Can't send after socket shutdown",
                109: "Too many references",
                110: "Connection timed out",
                111: "Connection refused",
                112: "Host is down",
                113: "Host is unreachable",
                114: "Socket already connected",
                115: "Connection already in progress",
                116: "Stale file handle",
                122: "Quota exceeded",
                123: "No medium (in tape drive)",
                125: "Operation canceled",
                130: "Previous owner died",
                131: "State not recoverable",
            },
            Ie = {
                EPERM: 1,
                ENOENT: 2,
                ESRCH: 3,
                EINTR: 4,
                EIO: 5,
                ENXIO: 6,
                E2BIG: 7,
                ENOEXEC: 8,
                EBADF: 9,
                ECHILD: 10,
                EAGAIN: 11,
                EWOULDBLOCK: 11,
                ENOMEM: 12,
                EACCES: 13,
                EFAULT: 14,
                ENOTBLK: 15,
                EBUSY: 16,
                EEXIST: 17,
                EXDEV: 18,
                ENODEV: 19,
                ENOTDIR: 20,
                EISDIR: 21,
                EINVAL: 22,
                ENFILE: 23,
                EMFILE: 24,
                ENOTTY: 25,
                ETXTBSY: 26,
                EFBIG: 27,
                ENOSPC: 28,
                ESPIPE: 29,
                EROFS: 30,
                EMLINK: 31,
                EPIPE: 32,
                EDOM: 33,
                ERANGE: 34,
                ENOMSG: 42,
                EIDRM: 43,
                ECHRNG: 44,
                EL2NSYNC: 45,
                EL3HLT: 46,
                EL3RST: 47,
                ELNRNG: 48,
                EUNATCH: 49,
                ENOCSI: 50,
                EL2HLT: 51,
                EDEADLK: 35,
                ENOLCK: 37,
                EBADE: 52,
                EBADR: 53,
                EXFULL: 54,
                ENOANO: 55,
                EBADRQC: 56,
                EBADSLT: 57,
                EDEADLOCK: 35,
                EBFONT: 59,
                ENOSTR: 60,
                ENODATA: 61,
                ETIME: 62,
                ENOSR: 63,
                ENONET: 64,
                ENOPKG: 65,
                EREMOTE: 66,
                ENOLINK: 67,
                EADV: 68,
                ESRMNT: 69,
                ECOMM: 70,
                EPROTO: 71,
                EMULTIHOP: 72,
                EDOTDOT: 73,
                EBADMSG: 74,
                ENOTUNIQ: 76,
                EBADFD: 77,
                EREMCHG: 78,
                ELIBACC: 79,
                ELIBBAD: 80,
                ELIBSCN: 81,
                ELIBMAX: 82,
                ELIBEXEC: 83,
                ENOSYS: 38,
                ENOTEMPTY: 39,
                ENAMETOOLONG: 36,
                ELOOP: 40,
                EOPNOTSUPP: 95,
                EPFNOSUPPORT: 96,
                ECONNRESET: 104,
                ENOBUFS: 105,
                EAFNOSUPPORT: 97,
                EPROTOTYPE: 91,
                ENOTSOCK: 88,
                ENOPROTOOPT: 92,
                ESHUTDOWN: 108,
                ECONNREFUSED: 111,
                EADDRINUSE: 98,
                ECONNABORTED: 103,
                ENETUNREACH: 101,
                ENETDOWN: 100,
                ETIMEDOUT: 110,
                EHOSTDOWN: 112,
                EHOSTUNREACH: 113,
                EINPROGRESS: 115,
                EALREADY: 114,
                EDESTADDRREQ: 89,
                EMSGSIZE: 90,
                EPROTONOSUPPORT: 93,
                ESOCKTNOSUPPORT: 94,
                EADDRNOTAVAIL: 99,
                ENETRESET: 102,
                EISCONN: 106,
                ENOTCONN: 107,
                ETOOMANYREFS: 109,
                EUSERS: 87,
                EDQUOT: 122,
                ESTALE: 116,
                ENOTSUP: 95,
                ENOMEDIUM: 123,
                EILSEQ: 84,
                EOVERFLOW: 75,
                ECANCELED: 125,
                ENOTRECOVERABLE: 131,
                EOWNERDEAD: 130,
                ESTRPIPE: 86,
            },
            xe = {
                root: null,
                mounts: [],
                devices: {},
                streams: [],
                nextInode: 1,
                nameTable: null,
                currentPath: "/",
                initialized: !1,
                ignorePermissions: !0,
                trackingDelegate: {},
                tracking: { openFlags: { READ: 1, WRITE: 2 } },
                ErrnoError: null,
                genericErrors: {},
                filesystems: null,
                syncFSRequests: 0,
                handleFSError: function (e) {
                    if (!(e instanceof xe.ErrnoError)) throw e + " : " + _e();
                    return be(e.errno);
                },
                lookupPath: function (e, t) {
                    if (((e = Oe.resolve(xe.cwd(), e)), (t = t || {}), !e)) return { path: "", node: null };
                    var r = { follow_mount: !0, recurse_count: 0 };
                    for (var n in r) void 0 === t[n] && (t[n] = r[n]);
                    if (t.recurse_count > 8) throw new xe.ErrnoError(40);
                    for (
                        var o = Te.normalizeArray(
                                e.split("/").filter(function (e) {
                                    return !!e;
                                }),
                                !1
                            ),
                            a = xe.root,
                            i = "/",
                            s = 0;
                        s < o.length;
                        s++
                    ) {
                        var u = s === o.length - 1;
                        if (u && t.parent) break;
                        if (((a = xe.lookupNode(a, o[s])), (i = Te.join2(i, o[s])), xe.isMountpoint(a) && (!u || (u && t.follow_mount)) && (a = a.mounted.root), !u || t.follow))
                            for (var c = 0; xe.isLink(a.mode); ) {
                                var d = xe.readlink(i);
                                if (((i = Oe.resolve(Te.dirname(i), d)), (a = xe.lookupPath(i, { recurse_count: t.recurse_count }).node), c++ > 40)) throw new xe.ErrnoError(40);
                            }
                    }
                    return { path: i, node: a };
                },
                getPath: function (e) {
                    for (var t; ; ) {
                        if (xe.isRoot(e)) {
                            var r = e.mount.mountpoint;
                            return t ? ("/" !== r[r.length - 1] ? r + "/" + t : r + t) : r;
                        }
                        (t = t ? e.name + "/" + t : e.name), (e = e.parent);
                    }
                },
                hashName: function (e, t) {
                    for (var r = 0, n = 0; n < t.length; n++) r = ((r << 5) - r + t.charCodeAt(n)) | 0;
                    return ((e + r) >>> 0) % xe.nameTable.length;
                },
                hashAddNode: function (e) {
                    var t = xe.hashName(e.parent.id, e.name);
                    (e.name_next = xe.nameTable[t]), (xe.nameTable[t] = e);
                },
                hashRemoveNode: function (e) {
                    var t = xe.hashName(e.parent.id, e.name);
                    if (xe.nameTable[t] === e) xe.nameTable[t] = e.name_next;
                    else
                        for (var r = xe.nameTable[t]; r; ) {
                            if (r.name_next === e) {
                                r.name_next = e.name_next;
                                break;
                            }
                            r = r.name_next;
                        }
                },
                lookupNode: function (e, t) {
                    var r = xe.mayLookup(e);
                    if (r) throw new xe.ErrnoError(r, e);
                    for (var n = xe.hashName(e.id, t), o = xe.nameTable[n]; o; o = o.name_next) {
                        var a = o.name;
                        if (o.parent.id === e.id && a === t) return o;
                    }
                    return xe.lookup(e, t);
                },
                createNode: function (e, t, r, n) {
                    if (!xe.FSNode) {
                        (xe.FSNode = function (e, t, r, n) {
                            e || (e = this), (this.parent = e), (this.mount = e.mount), (this.mounted = null), (this.id = xe.nextInode++), (this.name = t), (this.mode = r), (this.node_ops = {}), (this.stream_ops = {}), (this.rdev = n);
                        }),
                            (xe.FSNode.prototype = {});
                        Object.defineProperties(xe.FSNode.prototype, {
                            read: {
                                get: function () {
                                    return 365 == (365 & this.mode);
                                },
                                set: function (e) {
                                    e ? (this.mode |= 365) : (this.mode &= -366);
                                },
                            },
                            write: {
                                get: function () {
                                    return 146 == (146 & this.mode);
                                },
                                set: function (e) {
                                    e ? (this.mode |= 146) : (this.mode &= -147);
                                },
                            },
                            isFolder: {
                                get: function () {
                                    return xe.isDir(this.mode);
                                },
                            },
                            isDevice: {
                                get: function () {
                                    return xe.isChrdev(this.mode);
                                },
                            },
                        });
                    }
                    var o = new xe.FSNode(e, t, r, n);
                    return xe.hashAddNode(o), o;
                },
                destroyNode: function (e) {
                    xe.hashRemoveNode(e);
                },
                isRoot: function (e) {
                    return e === e.parent;
                },
                isMountpoint: function (e) {
                    return !!e.mounted;
                },
                isFile: function (e) {
                    return 32768 == (61440 & e);
                },
                isDir: function (e) {
                    return 16384 == (61440 & e);
                },
                isLink: function (e) {
                    return 40960 == (61440 & e);
                },
                isChrdev: function (e) {
                    return 8192 == (61440 & e);
                },
                isBlkdev: function (e) {
                    return 24576 == (61440 & e);
                },
                isFIFO: function (e) {
                    return 4096 == (61440 & e);
                },
                isSocket: function (e) {
                    return 49152 == (49152 & e);
                },
                flagModes: { r: 0, rs: 1052672, "r+": 2, w: 577, wx: 705, xw: 705, "w+": 578, "wx+": 706, "xw+": 706, a: 1089, ax: 1217, xa: 1217, "a+": 1090, "ax+": 1218, "xa+": 1218 },
                modeStringToFlags: function (e) {
                    var t = xe.flagModes[e];
                    if (void 0 === t) throw new Error("Unknown file open mode: " + e);
                    return t;
                },
                flagsToPermissionString: function (e) {
                    var t = ["r", "w", "rw"][3 & e];
                    return 512 & e && (t += "w"), t;
                },
                nodePermissions: function (e, t) {
                    return xe.ignorePermissions ? 0 : (-1 === t.indexOf("r") || 292 & e.mode) && (-1 === t.indexOf("w") || 146 & e.mode) && (-1 === t.indexOf("x") || 73 & e.mode) ? 0 : 13;
                },
                mayLookup: function (e) {
                    var t = xe.nodePermissions(e, "x");
                    return t || (e.node_ops.lookup ? 0 : 13);
                },
                mayCreate: function (e, t) {
                    try {
                        xe.lookupNode(e, t);
                        return 17;
                    } catch (e) {}
                    return xe.nodePermissions(e, "wx");
                },
                mayDelete: function (e, t, r) {
                    var n;
                    try {
                        n = xe.lookupNode(e, t);
                    } catch (e) {
                        return e.errno;
                    }
                    var o = xe.nodePermissions(e, "wx");
                    if (o) return o;
                    if (r) {
                        if (!xe.isDir(n.mode)) return 20;
                        if (xe.isRoot(n) || xe.getPath(n) === xe.cwd()) return 16;
                    } else if (xe.isDir(n.mode)) return 21;
                    return 0;
                },
                mayOpen: function (e, t) {
                    return e ? (xe.isLink(e.mode) ? 40 : xe.isDir(e.mode) && ("r" !== xe.flagsToPermissionString(t) || 512 & t) ? 21 : xe.nodePermissions(e, xe.flagsToPermissionString(t))) : 2;
                },
                MAX_OPEN_FDS: 4096,
                nextfd: function (e, t) {
                    (e = e || 0), (t = t || xe.MAX_OPEN_FDS);
                    for (var r = e; r <= t; r++) if (!xe.streams[r]) return r;
                    throw new xe.ErrnoError(24);
                },
                getStream: function (e) {
                    return xe.streams[e];
                },
                createStream: function (e, t, r) {
                    xe.FSStream ||
                        ((xe.FSStream = function () {}),
                        (xe.FSStream.prototype = {}),
                        Object.defineProperties(xe.FSStream.prototype, {
                            object: {
                                get: function () {
                                    return this.node;
                                },
                                set: function (e) {
                                    this.node = e;
                                },
                            },
                            isRead: {
                                get: function () {
                                    return 1 != (2097155 & this.flags);
                                },
                            },
                            isWrite: {
                                get: function () {
                                    return 0 != (2097155 & this.flags);
                                },
                            },
                            isAppend: {
                                get: function () {
                                    return 1024 & this.flags;
                                },
                            },
                        }));
                    var n = new xe.FSStream();
                    for (var o in e) n[o] = e[o];
                    e = n;
                    var a = xe.nextfd(t, r);
                    return (e.fd = a), (xe.streams[a] = e), e;
                },
                closeStream: function (e) {
                    xe.streams[e] = null;
                },
                chrdev_stream_ops: {
                    open: function (e) {
                        var t = xe.getDevice(e.node.rdev);
                        (e.stream_ops = t.stream_ops), e.stream_ops.open && e.stream_ops.open(e);
                    },
                    llseek: function () {
                        throw new xe.ErrnoError(29);
                    },
                },
                major: function (e) {
                    return e >> 8;
                },
                minor: function (e) {
                    return 255 & e;
                },
                makedev: function (e, t) {
                    return (e << 8) | t;
                },
                registerDevice: function (e, t) {
                    xe.devices[e] = { stream_ops: t };
                },
                getDevice: function (e) {
                    return xe.devices[e];
                },
                getMounts: function (e) {
                    for (var t = [], r = [e]; r.length; ) {
                        var n = r.pop();
                        t.push(n), r.push.apply(r, n.mounts);
                    }
                    return t;
                },
                syncfs: function (e, t) {
                    "function" == typeof e && ((t = e), (e = !1)), xe.syncFSRequests++, xe.syncFSRequests > 1 && console.log("warning: " + xe.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
                    var r = xe.getMounts(xe.root.mount),
                        n = 0;
                    function o(e) {
                        return N(xe.syncFSRequests > 0), xe.syncFSRequests--, t(e);
                    }
                    function a(e) {
                        if (e) return a.errored ? void 0 : ((a.errored = !0), o(e));
                        ++n >= r.length && o(null);
                    }
                    r.forEach(function (t) {
                        if (!t.type.syncfs) return a(null);
                        t.type.syncfs(t, e, a);
                    });
                },
                mount: function (e, t, r) {
                    var n,
                        o = "/" === r,
                        a = !r;
                    if (o && xe.root) throw new xe.ErrnoError(16);
                    if (!o && !a) {
                        var i = xe.lookupPath(r, { follow_mount: !1 });
                        if (((r = i.path), (n = i.node), xe.isMountpoint(n))) throw new xe.ErrnoError(16);
                        if (!xe.isDir(n.mode)) throw new xe.ErrnoError(20);
                    }
                    var s = { type: e, opts: t, mountpoint: r, mounts: [] },
                        u = e.mount(s);
                    return (u.mount = s), (s.root = u), o ? (xe.root = u) : n && ((n.mounted = s), n.mount && n.mount.mounts.push(s)), u;
                },
                unmount: function (e) {
                    var t = xe.lookupPath(e, { follow_mount: !1 });
                    if (!xe.isMountpoint(t.node)) throw new xe.ErrnoError(22);
                    var r = t.node,
                        n = r.mounted,
                        o = xe.getMounts(n);
                    Object.keys(xe.nameTable).forEach(function (e) {
                        for (var t = xe.nameTable[e]; t; ) {
                            var r = t.name_next;
                            -1 !== o.indexOf(t.mount) && xe.destroyNode(t), (t = r);
                        }
                    }),
                        (r.mounted = null);
                    var a = r.mount.mounts.indexOf(n);
                    N(-1 !== a), r.mount.mounts.splice(a, 1);
                },
                lookup: function (e, t) {
                    return e.node_ops.lookup(e, t);
                },
                mknod: function (e, t, r) {
                    var n = xe.lookupPath(e, { parent: !0 }).node,
                        o = Te.basename(e);
                    if (!o || "." === o || ".." === o) throw new xe.ErrnoError(22);
                    var a = xe.mayCreate(n, o);
                    if (a) throw new xe.ErrnoError(a);
                    if (!n.node_ops.mknod) throw new xe.ErrnoError(1);
                    return n.node_ops.mknod(n, o, t, r);
                },
                create: function (e, t) {
                    return (t = void 0 !== t ? t : 438), (t &= 4095), (t |= 32768), xe.mknod(e, t, 0);
                },
                mkdir: function (e, t) {
                    return (t = void 0 !== t ? t : 511), (t &= 1023), (t |= 16384), xe.mknod(e, t, 0);
                },
                mkdirTree: function (e, t) {
                    for (var r = e.split("/"), n = "", o = 0; o < r.length; ++o)
                        if (r[o]) {
                            n += "/" + r[o];
                            try {
                                xe.mkdir(n, t);
                            } catch (e) {
                                if (17 != e.errno) throw e;
                            }
                        }
                },
                mkdev: function (e, t, r) {
                    return void 0 === r && ((r = t), (t = 438)), (t |= 8192), xe.mknod(e, t, r);
                },
                symlink: function (e, t) {
                    if (!Oe.resolve(e)) throw new xe.ErrnoError(2);
                    var r = xe.lookupPath(t, { parent: !0 }).node;
                    if (!r) throw new xe.ErrnoError(2);
                    var n = Te.basename(t),
                        o = xe.mayCreate(r, n);
                    if (o) throw new xe.ErrnoError(o);
                    if (!r.node_ops.symlink) throw new xe.ErrnoError(1);
                    return r.node_ops.symlink(r, n, e);
                },
                rename: function (e, t) {
                    var r,
                        n,
                        o = Te.dirname(e),
                        a = Te.dirname(t),
                        i = Te.basename(e),
                        s = Te.basename(t);
                    try {
                        (r = xe.lookupPath(e, { parent: !0 }).node), (n = xe.lookupPath(t, { parent: !0 }).node);
                    } catch (e) {
                        throw new xe.ErrnoError(16);
                    }
                    if (!r || !n) throw new xe.ErrnoError(2);
                    if (r.mount !== n.mount) throw new xe.ErrnoError(18);
                    var u,
                        c = xe.lookupNode(r, i),
                        d = Oe.relative(e, a);
                    if ("." !== d.charAt(0)) throw new xe.ErrnoError(22);
                    if ("." !== (d = Oe.relative(t, o)).charAt(0)) throw new xe.ErrnoError(39);
                    try {
                        u = xe.lookupNode(n, s);
                    } catch (e) {}
                    if (c !== u) {
                        var l = xe.isDir(c.mode),
                            f = xe.mayDelete(r, i, l);
                        if (f) throw new xe.ErrnoError(f);
                        if ((f = u ? xe.mayDelete(n, s, l) : xe.mayCreate(n, s))) throw new xe.ErrnoError(f);
                        if (!r.node_ops.rename) throw new xe.ErrnoError(1);
                        if (xe.isMountpoint(c) || (u && xe.isMountpoint(u))) throw new xe.ErrnoError(16);
                        if (n !== r && (f = xe.nodePermissions(r, "w"))) throw new xe.ErrnoError(f);
                        try {
                            xe.trackingDelegate.willMovePath && xe.trackingDelegate.willMovePath(e, t);
                        } catch (r) {
                            console.log("FS.trackingDelegate['willMovePath']('" + e + "', '" + t + "') threw an exception: " + r.message);
                        }
                        xe.hashRemoveNode(c);
                        try {
                            r.node_ops.rename(c, n, s);
                        } catch (e) {
                            throw e;
                        } finally {
                            xe.hashAddNode(c);
                        }
                        try {
                            xe.trackingDelegate.onMovePath && xe.trackingDelegate.onMovePath(e, t);
                        } catch (r) {
                            console.log("FS.trackingDelegate['onMovePath']('" + e + "', '" + t + "') threw an exception: " + r.message);
                        }
                    }
                },
                rmdir: function (e) {
                    var t = xe.lookupPath(e, { parent: !0 }).node,
                        r = Te.basename(e),
                        n = xe.lookupNode(t, r),
                        o = xe.mayDelete(t, r, !0);
                    if (o) throw new xe.ErrnoError(o);
                    if (!t.node_ops.rmdir) throw new xe.ErrnoError(1);
                    if (xe.isMountpoint(n)) throw new xe.ErrnoError(16);
                    try {
                        xe.trackingDelegate.willDeletePath && xe.trackingDelegate.willDeletePath(e);
                    } catch (t) {
                        console.log("FS.trackingDelegate['willDeletePath']('" + e + "') threw an exception: " + t.message);
                    }
                    t.node_ops.rmdir(t, r), xe.destroyNode(n);
                    try {
                        xe.trackingDelegate.onDeletePath && xe.trackingDelegate.onDeletePath(e);
                    } catch (t) {
                        console.log("FS.trackingDelegate['onDeletePath']('" + e + "') threw an exception: " + t.message);
                    }
                },
                readdir: function (e) {
                    var t = xe.lookupPath(e, { follow: !0 }).node;
                    if (!t.node_ops.readdir) throw new xe.ErrnoError(20);
                    return t.node_ops.readdir(t);
                },
                unlink: function (e) {
                    var t = xe.lookupPath(e, { parent: !0 }).node,
                        r = Te.basename(e),
                        n = xe.lookupNode(t, r),
                        o = xe.mayDelete(t, r, !1);
                    if (o) throw new xe.ErrnoError(o);
                    if (!t.node_ops.unlink) throw new xe.ErrnoError(1);
                    if (xe.isMountpoint(n)) throw new xe.ErrnoError(16);
                    try {
                        xe.trackingDelegate.willDeletePath && xe.trackingDelegate.willDeletePath(e);
                    } catch (t) {
                        console.log("FS.trackingDelegate['willDeletePath']('" + e + "') threw an exception: " + t.message);
                    }
                    t.node_ops.unlink(t, r), xe.destroyNode(n);
                    try {
                        xe.trackingDelegate.onDeletePath && xe.trackingDelegate.onDeletePath(e);
                    } catch (t) {
                        console.log("FS.trackingDelegate['onDeletePath']('" + e + "') threw an exception: " + t.message);
                    }
                },
                readlink: function (e) {
                    var t = xe.lookupPath(e).node;
                    if (!t) throw new xe.ErrnoError(2);
                    if (!t.node_ops.readlink) throw new xe.ErrnoError(22);
                    return Oe.resolve(xe.getPath(t.parent), t.node_ops.readlink(t));
                },
                stat: function (e, t) {
                    var r = xe.lookupPath(e, { follow: !t }).node;
                    if (!r) throw new xe.ErrnoError(2);
                    if (!r.node_ops.getattr) throw new xe.ErrnoError(1);
                    return r.node_ops.getattr(r);
                },
                lstat: function (e) {
                    return xe.stat(e, !0);
                },
                chmod: function (e, t, r) {
                    var n;
                    "string" == typeof e ? (n = xe.lookupPath(e, { follow: !r }).node) : (n = e);
                    if (!n.node_ops.setattr) throw new xe.ErrnoError(1);
                    n.node_ops.setattr(n, { mode: (4095 & t) | (-4096 & n.mode), timestamp: Date.now() });
                },
                lchmod: function (e, t) {
                    xe.chmod(e, t, !0);
                },
                fchmod: function (e, t) {
                    var r = xe.getStream(e);
                    if (!r) throw new xe.ErrnoError(9);
                    xe.chmod(r.node, t);
                },
                chown: function (e, t, r, n) {
                    var o;
                    "string" == typeof e ? (o = xe.lookupPath(e, { follow: !n }).node) : (o = e);
                    if (!o.node_ops.setattr) throw new xe.ErrnoError(1);
                    o.node_ops.setattr(o, { timestamp: Date.now() });
                },
                lchown: function (e, t, r) {
                    xe.chown(e, t, r, !0);
                },
                fchown: function (e, t, r) {
                    var n = xe.getStream(e);
                    if (!n) throw new xe.ErrnoError(9);
                    xe.chown(n.node, t, r);
                },
                truncate: function (e, t) {
                    if (t < 0) throw new xe.ErrnoError(22);
                    var r;
                    "string" == typeof e ? (r = xe.lookupPath(e, { follow: !0 }).node) : (r = e);
                    if (!r.node_ops.setattr) throw new xe.ErrnoError(1);
                    if (xe.isDir(r.mode)) throw new xe.ErrnoError(21);
                    if (!xe.isFile(r.mode)) throw new xe.ErrnoError(22);
                    var n = xe.nodePermissions(r, "w");
                    if (n) throw new xe.ErrnoError(n);
                    r.node_ops.setattr(r, { size: t, timestamp: Date.now() });
                },
                ftruncate: function (e, t) {
                    var r = xe.getStream(e);
                    if (!r) throw new xe.ErrnoError(9);
                    if (0 == (2097155 & r.flags)) throw new xe.ErrnoError(22);
                    xe.truncate(r.node, t);
                },
                utime: function (e, t, r) {
                    var n = xe.lookupPath(e, { follow: !0 }).node;
                    n.node_ops.setattr(n, { timestamp: Math.max(t, r) });
                },
                open: function (e, t, n, o, a) {
                    if ("" === e) throw new xe.ErrnoError(2);
                    var i;
                    if (((t = "string" == typeof t ? xe.modeStringToFlags(t) : t), (n = void 0 === n ? 438 : n), (n = 64 & t ? (4095 & n) | 32768 : 0), "object" == typeof e)) i = e;
                    else {
                        e = Te.normalize(e);
                        try {
                            i = xe.lookupPath(e, { follow: !(131072 & t) }).node;
                        } catch (e) {}
                    }
                    var s = !1;
                    if (64 & t)
                        if (i) {
                            if (128 & t) throw new xe.ErrnoError(17);
                        } else (i = xe.mknod(e, n, 0)), (s = !0);
                    if (!i) throw new xe.ErrnoError(2);
                    if ((xe.isChrdev(i.mode) && (t &= -513), 65536 & t && !xe.isDir(i.mode))) throw new xe.ErrnoError(20);
                    if (!s) {
                        var u = xe.mayOpen(i, t);
                        if (u) throw new xe.ErrnoError(u);
                    }
                    512 & t && xe.truncate(i, 0), (t &= -641);
                    var c = xe.createStream({ node: i, path: xe.getPath(i), flags: t, seekable: !0, position: 0, stream_ops: i.stream_ops, ungotten: [], error: !1 }, o, a);
                    c.stream_ops.open && c.stream_ops.open(c), !r.logReadFiles || 1 & t || (xe.readFiles || (xe.readFiles = {}), e in xe.readFiles || ((xe.readFiles[e] = 1), console.log("FS.trackingDelegate error on read file: " + e)));
                    try {
                        if (xe.trackingDelegate.onOpenFile) {
                            var d = 0;
                            1 != (2097155 & t) && (d |= xe.tracking.openFlags.READ), 0 != (2097155 & t) && (d |= xe.tracking.openFlags.WRITE), xe.trackingDelegate.onOpenFile(e, d);
                        }
                    } catch (t) {
                        console.log("FS.trackingDelegate['onOpenFile']('" + e + "', flags) threw an exception: " + t.message);
                    }
                    return c;
                },
                close: function (e) {
                    if (xe.isClosed(e)) throw new xe.ErrnoError(9);
                    e.getdents && (e.getdents = null);
                    try {
                        e.stream_ops.close && e.stream_ops.close(e);
                    } catch (e) {
                        throw e;
                    } finally {
                        xe.closeStream(e.fd);
                    }
                    e.fd = null;
                },
                isClosed: function (e) {
                    return null === e.fd;
                },
                llseek: function (e, t, r) {
                    if (xe.isClosed(e)) throw new xe.ErrnoError(9);
                    if (!e.seekable || !e.stream_ops.llseek) throw new xe.ErrnoError(29);
                    if (0 != r && 1 != r && 2 != r) throw new xe.ErrnoError(22);
                    return (e.position = e.stream_ops.llseek(e, t, r)), (e.ungotten = []), e.position;
                },
                read: function (e, t, r, n, o) {
                    if (n < 0 || o < 0) throw new xe.ErrnoError(22);
                    if (xe.isClosed(e)) throw new xe.ErrnoError(9);
                    if (1 == (2097155 & e.flags)) throw new xe.ErrnoError(9);
                    if (xe.isDir(e.node.mode)) throw new xe.ErrnoError(21);
                    if (!e.stream_ops.read) throw new xe.ErrnoError(22);
                    var a = void 0 !== o;
                    if (a) {
                        if (!e.seekable) throw new xe.ErrnoError(29);
                    } else o = e.position;
                    var i = e.stream_ops.read(e, t, r, n, o);
                    return a || (e.position += i), i;
                },
                write: function (e, t, r, n, o, a) {
                    if (n < 0 || o < 0) throw new xe.ErrnoError(22);
                    if (xe.isClosed(e)) throw new xe.ErrnoError(9);
                    if (0 == (2097155 & e.flags)) throw new xe.ErrnoError(9);
                    if (xe.isDir(e.node.mode)) throw new xe.ErrnoError(21);
                    if (!e.stream_ops.write) throw new xe.ErrnoError(22);
                    1024 & e.flags && xe.llseek(e, 0, 2);
                    var i = void 0 !== o;
                    if (i) {
                        if (!e.seekable) throw new xe.ErrnoError(29);
                    } else o = e.position;
                    var s = e.stream_ops.write(e, t, r, n, o, a);
                    i || (e.position += s);
                    try {
                        e.path && xe.trackingDelegate.onWriteToFile && xe.trackingDelegate.onWriteToFile(e.path);
                    } catch (t) {
                        console.log("FS.trackingDelegate['onWriteToFile']('" + e.path + "') threw an exception: " + t.message);
                    }
                    return s;
                },
                allocate: function (e, t, r) {
                    if (xe.isClosed(e)) throw new xe.ErrnoError(9);
                    if (t < 0 || r <= 0) throw new xe.ErrnoError(22);
                    if (0 == (2097155 & e.flags)) throw new xe.ErrnoError(9);
                    if (!xe.isFile(e.node.mode) && !xe.isDir(e.node.mode)) throw new xe.ErrnoError(19);
                    if (!e.stream_ops.allocate) throw new xe.ErrnoError(95);
                    e.stream_ops.allocate(e, t, r);
                },
                mmap: function (e, t, r, n, o, a, i) {
                    if (0 != (2 & a) && 0 == (2 & i) && 2 != (2097155 & e.flags)) throw new xe.ErrnoError(13);
                    if (1 == (2097155 & e.flags)) throw new xe.ErrnoError(13);
                    if (!e.stream_ops.mmap) throw new xe.ErrnoError(19);
                    return e.stream_ops.mmap(e, t, r, n, o, a, i);
                },
                msync: function (e, t, r, n, o) {
                    return e && e.stream_ops.msync ? e.stream_ops.msync(e, t, r, n, o) : 0;
                },
                munmap: function (e) {
                    return 0;
                },
                ioctl: function (e, t, r) {
                    if (!e.stream_ops.ioctl) throw new xe.ErrnoError(25);
                    return e.stream_ops.ioctl(e, t, r);
                },
                readFile: function (e, t) {
                    if ((((t = t || {}).flags = t.flags || "r"), (t.encoding = t.encoding || "binary"), "utf8" !== t.encoding && "binary" !== t.encoding)) throw new Error('Invalid encoding type "' + t.encoding + '"');
                    var r,
                        n = xe.open(e, t.flags),
                        o = xe.stat(e).size,
                        a = new Uint8Array(o);
                    return xe.read(n, a, 0, o, 0), "utf8" === t.encoding ? (r = S(a, 0)) : "binary" === t.encoding && (r = a), xe.close(n), r;
                },
                writeFile: function (e, t, r) {
                    (r = r || {}).flags = r.flags || "w";
                    var n = xe.open(e, r.flags, r.mode);
                    if ("string" == typeof t) {
                        var o = new Uint8Array(P(t) + 1),
                            a = x(t, o, 0, o.length);
                        xe.write(n, o, 0, a, void 0, r.canOwn);
                    } else {
                        if (!ArrayBuffer.isView(t)) throw new Error("Unsupported data type");
                        xe.write(n, t, 0, t.byteLength, void 0, r.canOwn);
                    }
                    xe.close(n);
                },
                cwd: function () {
                    return xe.currentPath;
                },
                chdir: function (e) {
                    var t = xe.lookupPath(e, { follow: !0 });
                    if (null === t.node) throw new xe.ErrnoError(2);
                    if (!xe.isDir(t.node.mode)) throw new xe.ErrnoError(20);
                    var r = xe.nodePermissions(t.node, "x");
                    if (r) throw new xe.ErrnoError(r);
                    xe.currentPath = t.path;
                },
                createDefaultDirectories: function () {
                    xe.mkdir("/tmp"), xe.mkdir("/home"), xe.mkdir("/home/web_user");
                },
                createDefaultDevices: function () {
                    var e;
                    if (
                        (xe.mkdir("/dev"),
                        xe.registerDevice(xe.makedev(1, 3), {
                            read: function () {
                                return 0;
                            },
                            write: function (e, t, r, n, o) {
                                return n;
                            },
                        }),
                        xe.mkdev("/dev/null", xe.makedev(1, 3)),
                        ke.register(xe.makedev(5, 0), ke.default_tty_ops),
                        ke.register(xe.makedev(6, 0), ke.default_tty1_ops),
                        xe.mkdev("/dev/tty", xe.makedev(5, 0)),
                        xe.mkdev("/dev/tty1", xe.makedev(6, 0)),
                        "object" == typeof crypto && "function" == typeof crypto.getRandomValues)
                    ) {
                        var t = new Uint8Array(1);
                        e = function () {
                            return crypto.getRandomValues(t), t[0];
                        };
                    } else if (a)
                        try {
                            var r = require("crypto");
                            e = function () {
                                return r.randomBytes(1)[0];
                            };
                        } catch (e) {}
                    e ||
                        (e = function () {
                            cr(
                                "no cryptographic support found for random_device. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };"
                            );
                        }),
                        xe.createDevice("/dev", "random", e),
                        xe.createDevice("/dev", "urandom", e),
                        xe.mkdir("/dev/shm"),
                        xe.mkdir("/dev/shm/tmp");
                },
                createSpecialDirectories: function () {
                    xe.mkdir("/proc"),
                        xe.mkdir("/proc/self"),
                        xe.mkdir("/proc/self/fd"),
                        xe.mount(
                            {
                                mount: function () {
                                    var e = xe.createNode("/proc/self", "fd", 16895, 73);
                                    return (
                                        (e.node_ops = {
                                            lookup: function (e, t) {
                                                var r = +t,
                                                    n = xe.getStream(r);
                                                if (!n) throw new xe.ErrnoError(9);
                                                var o = {
                                                    parent: null,
                                                    mount: { mountpoint: "fake" },
                                                    node_ops: {
                                                        readlink: function () {
                                                            return n.path;
                                                        },
                                                    },
                                                };
                                                return (o.parent = o), o;
                                            },
                                        }),
                                        e
                                    );
                                },
                            },
                            {},
                            "/proc/self/fd"
                        );
                },
                createStandardStreams: function () {
                    r.stdin ? xe.createDevice("/dev", "stdin", r.stdin) : xe.symlink("/dev/tty", "/dev/stdin"),
                        r.stdout ? xe.createDevice("/dev", "stdout", null, r.stdout) : xe.symlink("/dev/tty", "/dev/stdout"),
                        r.stderr ? xe.createDevice("/dev", "stderr", null, r.stderr) : xe.symlink("/dev/tty1", "/dev/stderr");
                    var e = xe.open("/dev/stdin", "r"),
                        t = xe.open("/dev/stdout", "w"),
                        n = xe.open("/dev/stderr", "w");
                    N(0 === e.fd, "invalid handle for stdin (" + e.fd + ")"), N(1 === t.fd, "invalid handle for stdout (" + t.fd + ")"), N(2 === n.fd, "invalid handle for stderr (" + n.fd + ")");
                },
                ensureErrnoError: function () {
                    xe.ErrnoError ||
                        ((xe.ErrnoError = function (e, t) {
                            (this.node = t),
                                (this.setErrno = function (e) {
                                    for (var t in ((this.errno = e), Ie))
                                        if (Ie[t] === e) {
                                            this.code = t;
                                            break;
                                        }
                                }),
                                this.setErrno(e),
                                (this.message = Se[e]),
                                this.stack && Object.defineProperty(this, "stack", { value: new Error().stack, writable: !0 }),
                                this.stack && (this.stack = ve(this.stack));
                        }),
                        (xe.ErrnoError.prototype = new Error()),
                        (xe.ErrnoError.prototype.constructor = xe.ErrnoError),
                        [2].forEach(function (e) {
                            (xe.genericErrors[e] = new xe.ErrnoError(e)), (xe.genericErrors[e].stack = "<generic error, no stack>");
                        }));
                },
                staticInit: function () {
                    xe.ensureErrnoError(),
                        (xe.nameTable = new Array(4096)),
                        xe.mount(Ne, {}, "/"),
                        xe.createDefaultDirectories(),
                        xe.createDefaultDevices(),
                        xe.createSpecialDirectories(),
                        (xe.filesystems = { MEMFS: Ne, IDBFS: Re, NODEFS: De, WORKERFS: Me });
                },
                init: function (e, t, n) {
                    N(!xe.init.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)"),
                        (xe.init.initialized = !0),
                        xe.ensureErrnoError(),
                        (r.stdin = e || r.stdin),
                        (r.stdout = t || r.stdout),
                        (r.stderr = n || r.stderr),
                        xe.createStandardStreams();
                },
                quit: function () {
                    xe.init.initialized = !1;
                    var e = r._fflush;
                    e && e(0);
                    for (var t = 0; t < xe.streams.length; t++) {
                        var n = xe.streams[t];
                        n && xe.close(n);
                    }
                },
                getMode: function (e, t) {
                    var r = 0;
                    return e && (r |= 365), t && (r |= 146), r;
                },
                joinPath: function (e, t) {
                    var r = Te.join.apply(null, e);
                    return t && "/" == r[0] && (r = r.substr(1)), r;
                },
                absolutePath: function (e, t) {
                    return Oe.resolve(t, e);
                },
                standardizePath: function (e) {
                    return Te.normalize(e);
                },
                findObject: function (e, t) {
                    var r = xe.analyzePath(e, t);
                    return r.exists ? r.object : (be(r.error), null);
                },
                analyzePath: function (e, t) {
                    try {
                        e = (n = xe.lookupPath(e, { follow: !t })).path;
                    } catch (e) {}
                    var r = { isRoot: !1, exists: !1, error: 0, name: null, path: null, object: null, parentExists: !1, parentPath: null, parentObject: null };
                    try {
                        var n = xe.lookupPath(e, { parent: !0 });
                        (r.parentExists = !0),
                            (r.parentPath = n.path),
                            (r.parentObject = n.node),
                            (r.name = Te.basename(e)),
                            (n = xe.lookupPath(e, { follow: !t })),
                            (r.exists = !0),
                            (r.path = n.path),
                            (r.object = n.node),
                            (r.name = n.node.name),
                            (r.isRoot = "/" === n.path);
                    } catch (e) {
                        r.error = e.errno;
                    }
                    return r;
                },
                createFolder: function (e, t, r, n) {
                    var o = Te.join2("string" == typeof e ? e : xe.getPath(e), t),
                        a = xe.getMode(r, n);
                    return xe.mkdir(o, a);
                },
                createPath: function (e, t, r, n) {
                    e = "string" == typeof e ? e : xe.getPath(e);
                    for (var o = t.split("/").reverse(); o.length; ) {
                        var a = o.pop();
                        if (a) {
                            var i = Te.join2(e, a);
                            try {
                                xe.mkdir(i);
                            } catch (e) {}
                            e = i;
                        }
                    }
                    return i;
                },
                createFile: function (e, t, r, n, o) {
                    var a = Te.join2("string" == typeof e ? e : xe.getPath(e), t),
                        i = xe.getMode(n, o);
                    return xe.create(a, i);
                },
                createDataFile: function (e, t, r, n, o, a) {
                    var i = t ? Te.join2("string" == typeof e ? e : xe.getPath(e), t) : e,
                        s = xe.getMode(n, o),
                        u = xe.create(i, s);
                    if (r) {
                        if ("string" == typeof r) {
                            for (var c = new Array(r.length), d = 0, l = r.length; d < l; ++d) c[d] = r.charCodeAt(d);
                            r = c;
                        }
                        xe.chmod(u, 146 | s);
                        var f = xe.open(u, "w");
                        xe.write(f, r, 0, r.length, 0, a), xe.close(f), xe.chmod(u, s);
                    }
                    return u;
                },
                createDevice: function (e, t, r, n) {
                    var o = Te.join2("string" == typeof e ? e : xe.getPath(e), t),
                        a = xe.getMode(!!r, !!n);
                    xe.createDevice.major || (xe.createDevice.major = 64);
                    var i = xe.makedev(xe.createDevice.major++, 0);
                    return (
                        xe.registerDevice(i, {
                            open: function (e) {
                                e.seekable = !1;
                            },
                            close: function (e) {
                                n && n.buffer && n.buffer.length && n(10);
                            },
                            read: function (e, t, n, o, a) {
                                for (var i = 0, s = 0; s < o; s++) {
                                    var u;
                                    try {
                                        u = r();
                                    } catch (e) {
                                        throw new xe.ErrnoError(5);
                                    }
                                    if (void 0 === u && 0 === i) throw new xe.ErrnoError(11);
                                    if (null === u || void 0 === u) break;
                                    i++, (t[n + s] = u);
                                }
                                return i && (e.node.timestamp = Date.now()), i;
                            },
                            write: function (e, t, r, o, a) {
                                for (var i = 0; i < o; i++)
                                    try {
                                        n(t[r + i]);
                                    } catch (e) {
                                        throw new xe.ErrnoError(5);
                                    }
                                return o && (e.node.timestamp = Date.now()), i;
                            },
                        }),
                        xe.mkdev(o, a, i)
                    );
                },
                createLink: function (e, t, r, n, o) {
                    var a = Te.join2("string" == typeof e ? e : xe.getPath(e), t);
                    return xe.symlink(r, a);
                },
                forceLoadFile: function (e) {
                    if (e.isDevice || e.isFolder || e.link || e.contents) return !0;
                    var t = !0;
                    if ("undefined" != typeof XMLHttpRequest)
                        throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
                    if (!f) throw new Error("Cannot load without read() or XMLHttpRequest.");
                    try {
                        (e.contents = Ye(f(e.url), !0)), (e.usedBytes = e.contents.length);
                    } catch (e) {
                        t = !1;
                    }
                    return t || be(5), t;
                },
                createLazyFile: function (e, t, r, n, o) {
                    function a() {
                        (this.lengthKnown = !1), (this.chunks = []);
                    }
                    if (
                        ((a.prototype.get = function (e) {
                            if (!(e > this.length - 1 || e < 0)) {
                                var t = e % this.chunkSize,
                                    r = (e / this.chunkSize) | 0;
                                return this.getter(r)[t];
                            }
                        }),
                        (a.prototype.setDataGetter = function (e) {
                            this.getter = e;
                        }),
                        (a.prototype.cacheLength = function () {
                            var e = new XMLHttpRequest();
                            if ((e.open("HEAD", r, !1), e.send(null), !((e.status >= 200 && e.status < 300) || 304 === e.status))) throw new Error("Couldn't load " + r + ". Status: " + e.status);
                            var t,
                                n = Number(e.getResponseHeader("Content-length")),
                                o = (t = e.getResponseHeader("Accept-Ranges")) && "bytes" === t,
                                a = (t = e.getResponseHeader("Content-Encoding")) && "gzip" === t,
                                i = 1048576;
                            o || (i = n);
                            var s = this;
                            s.setDataGetter(function (e) {
                                var t = e * i,
                                    o = (e + 1) * i - 1;
                                if (
                                    ((o = Math.min(o, n - 1)),
                                    void 0 === s.chunks[e] &&
                                        (s.chunks[e] = (function (e, t) {
                                            if (e > t) throw new Error("invalid range (" + e + ", " + t + ") or no bytes requested!");
                                            if (t > n - 1) throw new Error("only " + n + " bytes available! programmer error!");
                                            var o = new XMLHttpRequest();
                                            if (
                                                (o.open("GET", r, !1),
                                                n !== i && o.setRequestHeader("Range", "bytes=" + e + "-" + t),
                                                "undefined" != typeof Uint8Array && (o.responseType = "arraybuffer"),
                                                o.overrideMimeType && o.overrideMimeType("text/plain; charset=x-user-defined"),
                                                o.send(null),
                                                !((o.status >= 200 && o.status < 300) || 304 === o.status))
                                            )
                                                throw new Error("Couldn't load " + r + ". Status: " + o.status);
                                            return void 0 !== o.response ? new Uint8Array(o.response || []) : Ye(o.responseText || "", !0);
                                        })(t, o)),
                                    void 0 === s.chunks[e])
                                )
                                    throw new Error("doXHR failed!");
                                return s.chunks[e];
                            }),
                                (!a && n) || ((i = n = 1), (n = this.getter(0).length), (i = n), console.log("LazyFiles on gzip forces download of the whole file when length is accessed")),
                                (this._length = n),
                                (this._chunkSize = i),
                                (this.lengthKnown = !0);
                        }),
                        "undefined" != typeof XMLHttpRequest)
                    ) {
                        if (!l) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                        var i = new a();
                        Object.defineProperties(i, {
                            length: {
                                get: function () {
                                    return this.lengthKnown || this.cacheLength(), this._length;
                                },
                            },
                            chunkSize: {
                                get: function () {
                                    return this.lengthKnown || this.cacheLength(), this._chunkSize;
                                },
                            },
                        });
                        var s = { isDevice: !1, contents: i };
                    } else s = { isDevice: !1, url: r };
                    var u = xe.createFile(e, t, s, n, o);
                    s.contents ? (u.contents = s.contents) : s.url && ((u.contents = null), (u.url = s.url)),
                        Object.defineProperties(u, {
                            usedBytes: {
                                get: function () {
                                    return this.contents.length;
                                },
                            },
                        });
                    var c = {};
                    return (
                        Object.keys(u.stream_ops).forEach(function (e) {
                            var t = u.stream_ops[e];
                            c[e] = function () {
                                if (!xe.forceLoadFile(u)) throw new xe.ErrnoError(5);
                                return t.apply(null, arguments);
                            };
                        }),
                        (c.read = function (e, t, r, n, o) {
                            if (!xe.forceLoadFile(u)) throw new xe.ErrnoError(5);
                            var a = e.node.contents;
                            if (o >= a.length) return 0;
                            var i = Math.min(a.length - o, n);
                            if ((N(i >= 0), a.slice)) for (var s = 0; s < i; s++) t[r + s] = a[o + s];
                            else for (s = 0; s < i; s++) t[r + s] = a.get(o + s);
                            return i;
                        }),
                        (u.stream_ops = c),
                        u
                    );
                },
                createPreloadedFile: function (e, t, n, o, a, i, s, u, c, d) {
                    Browser.init();
                    var l = t ? Oe.resolve(Te.join2(e, t)) : e,
                        f = (function (e) {
                            for (var t = e; ; ) {
                                if (!ue[e]) return e;
                                e = t + Math.random();
                            }
                            return e;
                        })("cp " + l);
                    function p(n) {
                        function p(r) {
                            d && d(), u || xe.createDataFile(e, t, r, o, a, c), i && i(), de(f);
                        }
                        var m = !1;
                        r.preloadPlugins.forEach(function (e) {
                            m ||
                                (e.canHandle(l) &&
                                    (e.handle(n, l, p, function () {
                                        s && s(), de(f);
                                    }),
                                    (m = !0)));
                        }),
                            m || p(n);
                    }
                    ce(f),
                        "string" == typeof n
                            ? Browser.asyncLoad(
                                  n,
                                  function (e) {
                                      p(e);
                                  },
                                  s
                              )
                            : p(n);
                },
                indexedDB: function () {
                    return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                },
                DB_NAME: function () {
                    return "EM_FS_" + window.location.pathname;
                },
                DB_VERSION: 20,
                DB_STORE_NAME: "FILE_DATA",
                saveFilesToDB: function (e, t, r) {
                    (t = t || function () {}), (r = r || function () {});
                    var n = xe.indexedDB();
                    try {
                        var o = n.open(xe.DB_NAME(), xe.DB_VERSION);
                    } catch (e) {
                        return r(e);
                    }
                    (o.onupgradeneeded = function () {
                        console.log("creating db"), o.result.createObjectStore(xe.DB_STORE_NAME);
                    }),
                        (o.onsuccess = function () {
                            var n = o.result.transaction([xe.DB_STORE_NAME], "readwrite"),
                                a = n.objectStore(xe.DB_STORE_NAME),
                                i = 0,
                                s = 0,
                                u = e.length;
                            function c() {
                                0 == s ? t() : r();
                            }
                            e.forEach(function (e) {
                                var t = a.put(xe.analyzePath(e).object.contents, e);
                                (t.onsuccess = function () {
                                    ++i + s == u && c();
                                }),
                                    (t.onerror = function () {
                                        i + ++s == u && c();
                                    });
                            }),
                                (n.onerror = r);
                        }),
                        (o.onerror = r);
                },
                loadFilesFromDB: function (e, t, r) {
                    (t = t || function () {}), (r = r || function () {});
                    var n = xe.indexedDB();
                    try {
                        var o = n.open(xe.DB_NAME(), xe.DB_VERSION);
                    } catch (e) {
                        return r(e);
                    }
                    (o.onupgradeneeded = r),
                        (o.onsuccess = function () {
                            var n = o.result;
                            try {
                                var a = n.transaction([xe.DB_STORE_NAME], "readonly");
                            } catch (e) {
                                return void r(e);
                            }
                            var i = a.objectStore(xe.DB_STORE_NAME),
                                s = 0,
                                u = 0,
                                c = e.length;
                            function d() {
                                0 == u ? t() : r();
                            }
                            e.forEach(function (e) {
                                var t = i.get(e);
                                (t.onsuccess = function () {
                                    xe.analyzePath(e).exists && xe.unlink(e), xe.createDataFile(Te.dirname(e), Te.basename(e), t.result, !0, !0, !0), ++s + u == c && d();
                                }),
                                    (t.onerror = function () {
                                        s + ++u == c && d();
                                    });
                            }),
                                (a.onerror = r);
                        }),
                        (o.onerror = r);
                },
            },
            Ae = {
                DEFAULT_POLLMASK: 5,
                mappings: {},
                umask: 511,
                calculateAt: function (e, t) {
                    if ("/" !== t[0]) {
                        var r;
                        if (-100 === e) r = xe.cwd();
                        else {
                            var n = xe.getStream(e);
                            if (!n) throw new xe.ErrnoError(9);
                            r = n.path;
                        }
                        t = Te.join2(r, t);
                    }
                    return t;
                },
                doStat: function (e, t, r) {
                    try {
                        var n = e(t);
                    } catch (e) {
                        if (e && e.node && Te.normalize(t) !== Te.normalize(xe.getPath(e.node))) return -20;
                        throw e;
                    }
                    return (
                        (C[r >> 2] = n.dev),
                        (C[(r + 4) >> 2] = 0),
                        (C[(r + 8) >> 2] = n.ino),
                        (C[(r + 12) >> 2] = n.mode),
                        (C[(r + 16) >> 2] = n.nlink),
                        (C[(r + 20) >> 2] = n.uid),
                        (C[(r + 24) >> 2] = n.gid),
                        (C[(r + 28) >> 2] = n.rdev),
                        (C[(r + 32) >> 2] = 0),
                        (Ee = [n.size >>> 0, ((me = n.size), +te(me) >= 1 ? (me > 0 ? (0 | oe(+ne(me / 4294967296), 4294967295)) >>> 0 : ~~+re((me - +(~~me >>> 0)) / 4294967296) >>> 0) : 0)]),
                        (C[(r + 40) >> 2] = Ee[0]),
                        (C[(r + 44) >> 2] = Ee[1]),
                        (C[(r + 48) >> 2] = 4096),
                        (C[(r + 52) >> 2] = n.blocks),
                        (C[(r + 56) >> 2] = (n.atime.getTime() / 1e3) | 0),
                        (C[(r + 60) >> 2] = 0),
                        (C[(r + 64) >> 2] = (n.mtime.getTime() / 1e3) | 0),
                        (C[(r + 68) >> 2] = 0),
                        (C[(r + 72) >> 2] = (n.ctime.getTime() / 1e3) | 0),
                        (C[(r + 76) >> 2] = 0),
                        (Ee = [n.ino >>> 0, ((me = n.ino), +te(me) >= 1 ? (me > 0 ? (0 | oe(+ne(me / 4294967296), 4294967295)) >>> 0 : ~~+re((me - +(~~me >>> 0)) / 4294967296) >>> 0) : 0)]),
                        (C[(r + 80) >> 2] = Ee[0]),
                        (C[(r + 84) >> 2] = Ee[1]),
                        0
                    );
                },
                doMsync: function (e, t, r, n) {
                    var o = new Uint8Array(X.subarray(e, e + r));
                    xe.msync(t, o, 0, r, n);
                },
                doMkdir: function (e, t) {
                    return "/" === (e = Te.normalize(e))[e.length - 1] && (e = e.substr(0, e.length - 1)), xe.mkdir(e, t, 0), 0;
                },
                doMknod: function (e, t, r) {
                    switch (61440 & t) {
                        case 32768:
                        case 8192:
                        case 24576:
                        case 4096:
                        case 49152:
                            break;
                        default:
                            return -22;
                    }
                    return xe.mknod(e, t, r), 0;
                },
                doReadlink: function (e, t, r) {
                    if (r <= 0) return -22;
                    var n = xe.readlink(e),
                        o = Math.min(r, P(n)),
                        a = U[t + o];
                    return A(n, t, r + 1), (U[t + o] = a), o;
                },
                doAccess: function (e, t) {
                    if (-8 & t) return -22;
                    var r;
                    if (!(r = xe.lookupPath(e, { follow: !0 }).node)) return -2;
                    var n = "";
                    return 4 & t && (n += "r"), 2 & t && (n += "w"), 1 & t && (n += "x"), n && xe.nodePermissions(r, n) ? -13 : 0;
                },
                doDup: function (e, t, r) {
                    var n = xe.getStream(r);
                    return n && xe.close(n), xe.open(e, t, 0, r, r).fd;
                },
                doReadv: function (e, t, r, n) {
                    for (var o = 0, a = 0; a < r; a++) {
                        var i = C[(t + 8 * a) >> 2],
                            s = C[(t + (8 * a + 4)) >> 2],
                            u = xe.read(e, U, i, s, n);
                        if (u < 0) return -1;
                        if (((o += u), u < s)) break;
                    }
                    return o;
                },
                doWritev: function (e, t, r, n) {
                    for (var o = 0, a = 0; a < r; a++) {
                        var i = C[(t + 8 * a) >> 2],
                            s = C[(t + (8 * a + 4)) >> 2],
                            u = xe.write(e, U, i, s, n);
                        if (u < 0) return -1;
                        o += u;
                    }
                    return o;
                },
                varargs: 0,
                get: function (e) {
                    return (Ae.varargs += 4), C[(Ae.varargs - 4) >> 2];
                },
                getStr: function () {
                    return I(Ae.get());
                },
                getStreamFromFD: function () {
                    var e = xe.getStream(Ae.get());
                    if (!e) throw new xe.ErrnoError(9);
                    return e;
                },
                get64: function () {
                    var e = Ae.get(),
                        t = Ae.get();
                    return N(e >= 0 ? 0 === t : -1 === t), e;
                },
                getZero: function () {
                    N(0 === Ae.get());
                },
            };
        var Pe = {
            mount: function (e) {
                return (
                    (r.websocket = r.websocket && "object" == typeof r.websocket ? r.websocket : {}),
                    (r.websocket._callbacks = {}),
                    (r.websocket.on = function (e, t) {
                        return "function" == typeof t && (this._callbacks[e] = t), this;
                    }),
                    (r.websocket.emit = function (e, t) {
                        "function" == typeof this._callbacks[e] && this._callbacks[e].call(this, t);
                    }),
                    xe.createNode(null, "/", 16895, 0)
                );
            },
            createSocket: function (e, t, r) {
                r && N((1 == t) == (6 == r));
                var n = { family: e, type: t, protocol: r, server: null, error: null, peers: {}, pending: [], recv_queue: [], sock_ops: Pe.websocket_sock_ops },
                    o = Pe.nextname(),
                    a = xe.createNode(Pe.root, o, 49152, 0);
                a.sock = n;
                var i = xe.createStream({ path: o, node: a, flags: xe.modeStringToFlags("r+"), seekable: !1, stream_ops: Pe.stream_ops });
                return (n.stream = i), n;
            },
            getSocket: function (e) {
                var t = xe.getStream(e);
                return t && xe.isSocket(t.node.mode) ? t.node.sock : null;
            },
            stream_ops: {
                poll: function (e) {
                    var t = e.node.sock;
                    return t.sock_ops.poll(t);
                },
                ioctl: function (e, t, r) {
                    var n = e.node.sock;
                    return n.sock_ops.ioctl(n, t, r);
                },
                read: function (e, t, r, n, o) {
                    var a = e.node.sock,
                        i = a.sock_ops.recvmsg(a, n);
                    return i ? (t.set(i.buffer, r), i.buffer.length) : 0;
                },
                write: function (e, t, r, n, o) {
                    var a = e.node.sock;
                    return a.sock_ops.sendmsg(a, t, r, n);
                },
                close: function (e) {
                    var t = e.node.sock;
                    t.sock_ops.close(t);
                },
            },
            nextname: function () {
                return Pe.nextname.current || (Pe.nextname.current = 0), "socket[" + Pe.nextname.current++ + "]";
            },
            websocket_sock_ops: {
                createPeer: function (e, t, n) {
                    var o;
                    if (("object" == typeof t && ((o = t), (t = null), (n = null)), o))
                        if (o._socket) (t = o._socket.remoteAddress), (n = o._socket.remotePort);
                        else {
                            var i = /ws[s]?:\/\/([^:]+):(\d+)/.exec(o.url);
                            if (!i) throw new Error("WebSocket URL must be in the format ws(s)://address:port");
                            (t = i[1]), (n = parseInt(i[2], 10));
                        }
                    else
                        try {
                            var s = r.websocket && "object" == typeof r.websocket,
                                u = "ws:#".replace("#", "//");
                            if ((s && "string" == typeof r.websocket.url && (u = r.websocket.url), "ws://" === u || "wss://" === u)) {
                                var c = t.split("/");
                                u = u + c[0] + ":" + n + "/" + c.slice(1).join("/");
                            }
                            var l = "binary";
                            s && "string" == typeof r.websocket.subprotocol && (l = r.websocket.subprotocol), (l = l.replace(/^ +| +$/g, "").split(/ *, */));
                            var f = a ? { protocol: l.toString() } : l;
                            s && null === r.websocket.subprotocol && ((l = "null"), (f = void 0)), ((o = new (a ? require("ws") : d ? window.WebSocket : WebSocket)(u, f)).binaryType = "arraybuffer");
                        } catch (e) {
                            throw new xe.ErrnoError(Ie.EHOSTUNREACH);
                        }
                    var p = { addr: t, port: n, socket: o, dgram_send_queue: [] };
                    return (
                        Pe.websocket_sock_ops.addPeer(e, p),
                        Pe.websocket_sock_ops.handlePeerEvents(e, p),
                        2 === e.type && void 0 !== e.sport && p.dgram_send_queue.push(new Uint8Array([255, 255, 255, 255, "p".charCodeAt(0), "o".charCodeAt(0), "r".charCodeAt(0), "t".charCodeAt(0), (65280 & e.sport) >> 8, 255 & e.sport])),
                        p
                    );
                },
                getPeer: function (e, t, r) {
                    return e.peers[t + ":" + r];
                },
                addPeer: function (e, t) {
                    e.peers[t.addr + ":" + t.port] = t;
                },
                removePeer: function (e, t) {
                    delete e.peers[t.addr + ":" + t.port];
                },
                handlePeerEvents: function (e, t) {
                    var n = !0,
                        o = function () {
                            r.websocket.emit("open", e.stream.fd);
                            try {
                                for (var n = t.dgram_send_queue.shift(); n; ) t.socket.send(n), (n = t.dgram_send_queue.shift());
                            } catch (e) {
                                t.socket.close();
                            }
                        };
                    function i(o) {
                        if ((N("string" != typeof o && void 0 !== o.byteLength), 0 != o.byteLength)) {
                            o = new Uint8Array(o);
                            var a = n;
                            if (
                                ((n = !1),
                                a && 10 === o.length && 255 === o[0] && 255 === o[1] && 255 === o[2] && 255 === o[3] && o[4] === "p".charCodeAt(0) && o[5] === "o".charCodeAt(0) && o[6] === "r".charCodeAt(0) && o[7] === "t".charCodeAt(0))
                            ) {
                                var i = (o[8] << 8) | o[9];
                                return Pe.websocket_sock_ops.removePeer(e, t), (t.port = i), void Pe.websocket_sock_ops.addPeer(e, t);
                            }
                            e.recv_queue.push({ addr: t.addr, port: t.port, data: o }), r.websocket.emit("message", e.stream.fd);
                        }
                    }
                    a
                        ? (t.socket.on("open", o),
                          t.socket.on("message", function (e, t) {
                              t.binary && i(new Uint8Array(e).buffer);
                          }),
                          t.socket.on("close", function () {
                              r.websocket.emit("close", e.stream.fd);
                          }),
                          t.socket.on("error", function (t) {
                              (e.error = Ie.ECONNREFUSED), r.websocket.emit("error", [e.stream.fd, e.error, "ECONNREFUSED: Connection refused"]);
                          }))
                        : ((t.socket.onopen = o),
                          (t.socket.onclose = function () {
                              r.websocket.emit("close", e.stream.fd);
                          }),
                          (t.socket.onmessage = function (e) {
                              i(e.data);
                          }),
                          (t.socket.onerror = function (t) {
                              (e.error = Ie.ECONNREFUSED), r.websocket.emit("error", [e.stream.fd, e.error, "ECONNREFUSED: Connection refused"]);
                          }));
                },
                poll: function (e) {
                    if (1 === e.type && e.server) return e.pending.length ? 65 : 0;
                    var t = 0,
                        r = 1 === e.type ? Pe.websocket_sock_ops.getPeer(e, e.daddr, e.dport) : null;
                    return (
                        (e.recv_queue.length || !r || (r && r.socket.readyState === r.socket.CLOSING) || (r && r.socket.readyState === r.socket.CLOSED)) && (t |= 65),
                        (!r || (r && r.socket.readyState === r.socket.OPEN)) && (t |= 4),
                        ((r && r.socket.readyState === r.socket.CLOSING) || (r && r.socket.readyState === r.socket.CLOSED)) && (t |= 16),
                        t
                    );
                },
                ioctl: function (e, t, r) {
                    switch (t) {
                        case 21531:
                            var n = 0;
                            return e.recv_queue.length && (n = e.recv_queue[0].data.length), (C[r >> 2] = n), 0;
                        default:
                            return Ie.EINVAL;
                    }
                },
                close: function (e) {
                    if (e.server) {
                        try {
                            e.server.close();
                        } catch (e) {}
                        e.server = null;
                    }
                    for (var t = Object.keys(e.peers), r = 0; r < t.length; r++) {
                        var n = e.peers[t[r]];
                        try {
                            n.socket.close();
                        } catch (e) {}
                        Pe.websocket_sock_ops.removePeer(e, n);
                    }
                    return 0;
                },
                bind: function (e, t, r) {
                    if (void 0 !== e.saddr || void 0 !== e.sport) throw new xe.ErrnoError(Ie.EINVAL);
                    if (((e.saddr = t), (e.sport = r), 2 === e.type)) {
                        e.server && (e.server.close(), (e.server = null));
                        try {
                            e.sock_ops.listen(e, 0);
                        } catch (e) {
                            if (!(e instanceof xe.ErrnoError)) throw e;
                            if (e.errno !== Ie.EOPNOTSUPP) throw e;
                        }
                    }
                },
                connect: function (e, t, r) {
                    if (e.server) throw new xe.ErrnoError(Ie.EOPNOTSUPP);
                    if (void 0 !== e.daddr && void 0 !== e.dport) {
                        var n = Pe.websocket_sock_ops.getPeer(e, e.daddr, e.dport);
                        if (n) throw n.socket.readyState === n.socket.CONNECTING ? new xe.ErrnoError(Ie.EALREADY) : new xe.ErrnoError(Ie.EISCONN);
                    }
                    var o = Pe.websocket_sock_ops.createPeer(e, t, r);
                    throw ((e.daddr = o.addr), (e.dport = o.port), new xe.ErrnoError(Ie.EINPROGRESS));
                },
                listen: function (e, t) {
                    if (!a) throw new xe.ErrnoError(Ie.EOPNOTSUPP);
                    if (e.server) throw new xe.ErrnoError(Ie.EINVAL);
                    var n = require("ws").Server,
                        o = e.saddr;
                    (e.server = new n({ host: o, port: e.sport })),
                        r.websocket.emit("listen", e.stream.fd),
                        e.server.on("connection", function (t) {
                            if (1 === e.type) {
                                var n = Pe.createSocket(e.family, e.type, e.protocol),
                                    o = Pe.websocket_sock_ops.createPeer(n, t);
                                (n.daddr = o.addr), (n.dport = o.port), e.pending.push(n), r.websocket.emit("connection", n.stream.fd);
                            } else Pe.websocket_sock_ops.createPeer(e, t), r.websocket.emit("connection", e.stream.fd);
                        }),
                        e.server.on("closed", function () {
                            r.websocket.emit("close", e.stream.fd), (e.server = null);
                        }),
                        e.server.on("error", function (t) {
                            (e.error = Ie.EHOSTUNREACH), r.websocket.emit("error", [e.stream.fd, e.error, "EHOSTUNREACH: Host is unreachable"]);
                        });
                },
                accept: function (e) {
                    if (!e.server) throw new xe.ErrnoError(Ie.EINVAL);
                    var t = e.pending.shift();
                    return (t.stream.flags = e.stream.flags), t;
                },
                getname: function (e, t) {
                    var r, n;
                    if (t) {
                        if (void 0 === e.daddr || void 0 === e.dport) throw new xe.ErrnoError(Ie.ENOTCONN);
                        (r = e.daddr), (n = e.dport);
                    } else (r = e.saddr || 0), (n = e.sport || 0);
                    return { addr: r, port: n };
                },
                sendmsg: function (e, t, r, n, o, a) {
                    if (2 === e.type) {
                        if (((void 0 !== o && void 0 !== a) || ((o = e.daddr), (a = e.dport)), void 0 === o || void 0 === a)) throw new xe.ErrnoError(Ie.EDESTADDRREQ);
                    } else (o = e.daddr), (a = e.dport);
                    var i,
                        s = Pe.websocket_sock_ops.getPeer(e, o, a);
                    if (1 === e.type) {
                        if (!s || s.socket.readyState === s.socket.CLOSING || s.socket.readyState === s.socket.CLOSED) throw new xe.ErrnoError(Ie.ENOTCONN);
                        if (s.socket.readyState === s.socket.CONNECTING) throw new xe.ErrnoError(Ie.EAGAIN);
                    }
                    if ((ArrayBuffer.isView(t) && ((r += t.byteOffset), (t = t.buffer)), (i = t.slice(r, r + n)), 2 === e.type && (!s || s.socket.readyState !== s.socket.OPEN)))
                        return (s && s.socket.readyState !== s.socket.CLOSING && s.socket.readyState !== s.socket.CLOSED) || (s = Pe.websocket_sock_ops.createPeer(e, o, a)), s.dgram_send_queue.push(i), n;
                    try {
                        return s.socket.send(i), n;
                    } catch (e) {
                        throw new xe.ErrnoError(Ie.EINVAL);
                    }
                },
                recvmsg: function (e, t) {
                    if (1 === e.type && e.server) throw new xe.ErrnoError(Ie.ENOTCONN);
                    var r = e.recv_queue.shift();
                    if (!r) {
                        if (1 === e.type) {
                            var n = Pe.websocket_sock_ops.getPeer(e, e.daddr, e.dport);
                            if (n) {
                                if (n.socket.readyState === n.socket.CLOSING || n.socket.readyState === n.socket.CLOSED) return null;
                                throw new xe.ErrnoError(Ie.EAGAIN);
                            }
                            throw new xe.ErrnoError(Ie.ENOTCONN);
                        }
                        throw new xe.ErrnoError(Ie.EAGAIN);
                    }
                    var o = r.data.byteLength || r.data.length,
                        a = r.data.byteOffset || 0,
                        i = r.data.buffer || r.data,
                        s = Math.min(t, o),
                        u = { buffer: new Uint8Array(i, a, s), addr: r.addr, port: r.port };
                    if (1 === e.type && s < o) {
                        var c = o - s;
                        (r.data = new Uint8Array(i, a + s, c)), e.recv_queue.unshift(r);
                    }
                    return u;
                },
            },
        };
        function Fe(e) {
            for (var t = e.split("."), r = 0; r < 4; r++) {
                var n = Number(t[r]);
                if (isNaN(n)) return null;
                t[r] = n;
            }
            return (t[0] | (t[1] << 8) | (t[2] << 16) | (t[3] << 24)) >>> 0;
        }
        function Ue(e) {
            var t,
                r,
                n,
                o,
                a = [];
            if (!/^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i.test(e)) return null;
            if ("::" === e) return [0, 0, 0, 0, 0, 0, 0, 0];
            for (
                (e = 0 === e.indexOf("::") ? e.replace("::", "Z:") : e.replace("::", ":Z:")).indexOf(".") > 0
                    ? (((t = (e = e.replace(new RegExp("[.]", "g"), ":")).split(":"))[t.length - 4] = parseInt(t[t.length - 4]) + 256 * parseInt(t[t.length - 3])),
                      (t[t.length - 3] = parseInt(t[t.length - 2]) + 256 * parseInt(t[t.length - 1])),
                      (t = t.slice(0, t.length - 2)))
                    : (t = e.split(":")),
                    n = 0,
                    o = 0,
                    r = 0;
                r < t.length;
                r++
            )
                if ("string" == typeof t[r])
                    if ("Z" === t[r]) {
                        for (o = 0; o < 8 - t.length + 1; o++) a[r + o] = 0;
                        n = o - 1;
                    } else a[r + n] = Zt(parseInt(t[r], 16));
                else a[r + n] = t[r];
            return [(a[1] << 16) | a[0], (a[3] << 16) | a[2], (a[5] << 16) | a[4], (a[7] << 16) | a[6]];
        }
        var Xe = {
            address_map: { id: 1, addrs: {}, names: {} },
            lookup_name: function (e) {
                var t,
                    r = Fe(e);
                if (null !== r) return e;
                if (null !== (r = Ue(e))) return e;
                if (Xe.address_map.addrs[e]) t = Xe.address_map.addrs[e];
                else {
                    var n = Xe.address_map.id++;
                    N(n < 65535, "exceeded max address mappings of 65535"), (t = "172.29." + (255 & n) + "." + (65280 & n)), (Xe.address_map.names[t] = e), (Xe.address_map.addrs[e] = t);
                }
                return t;
            },
            lookup_addr: function (e) {
                return Xe.address_map.names[e] ? Xe.address_map.names[e] : null;
            },
        };
        function Le(e) {
            return (255 & e) + "." + ((e >> 8) & 255) + "." + ((e >> 16) & 255) + "." + ((e >> 24) & 255);
        }
        function Ce(e, t) {
            var r,
                n = L[e >> 1],
                o = $t(L[(e + 2) >> 1]);
            switch (n) {
                case 2:
                    if (16 !== t) return { errno: 22 };
                    r = Le((r = C[(e + 4) >> 2]));
                    break;
                case 10:
                    if (28 !== t) return { errno: 22 };
                    r = (function (e) {
                        var t = "",
                            r = 0,
                            n = 0,
                            o = 0,
                            a = 0,
                            i = 0,
                            s = 0,
                            u = [65535 & e[0], e[0] >> 16, 65535 & e[1], e[1] >> 16, 65535 & e[2], e[2] >> 16, 65535 & e[3], e[3] >> 16],
                            c = !0,
                            d = "";
                        for (s = 0; s < 5; s++)
                            if (0 !== u[s]) {
                                c = !1;
                                break;
                            }
                        if (c) {
                            if (((d = Le(u[6] | (u[7] << 16))), -1 === u[5])) return (t = "::ffff:"), (t += d);
                            if (0 === u[5]) return (t = "::"), "0.0.0.0" === d && (d = ""), "0.0.0.1" === d && (d = "1"), (t += d);
                        }
                        for (r = 0; r < 8; r++) 0 === u[r] && (r - o > 1 && (i = 0), (o = r), i++), i > n && (a = r - (n = i) + 1);
                        for (r = 0; r < 8; r++) n > 1 && 0 === u[r] && r >= a && r < a + n ? r === a && ((t += ":"), 0 === a && (t += ":")) : ((t += Number($t(65535 & u[r])).toString(16)), (t += r < 7 ? ":" : ""));
                        return t;
                    })((r = [C[(e + 8) >> 2], C[(e + 12) >> 2], C[(e + 16) >> 2], C[(e + 20) >> 2]]));
                    break;
                default:
                    return { errno: 97 };
            }
            return { family: n, addr: r, port: o };
        }
        function je(e, t, r, n) {
            switch (t) {
                case 2:
                    (r = Fe(r)), (L[e >> 1] = t), (C[(e + 4) >> 2] = r), (L[(e + 2) >> 1] = Zt(n));
                    break;
                case 10:
                    (r = Ue(r)), (C[e >> 2] = t), (C[(e + 8) >> 2] = r[0]), (C[(e + 12) >> 2] = r[1]), (C[(e + 16) >> 2] = r[2]), (C[(e + 20) >> 2] = r[3]), (L[(e + 2) >> 1] = Zt(n)), (C[(e + 4) >> 2] = 0), (C[(e + 24) >> 2] = 0);
                    break;
                default:
                    return { errno: 97 };
            }
            return {};
        }
        function Be(e, t, r, n, o, a) {
            var i;
            a <<= 12;
            var s = !1;
            if (0 != (16 & n) && e % H != 0) return -22;
            if (0 != (32 & n)) {
                if (!(i = rr(H, t))) return -12;
                !(function (e, t, r) {
                    t |= 0;
                    var n,
                        o = 0,
                        a = 0,
                        i = 0;
                    if (((n = ((e |= 0) + (r |= 0)) | 0), (t &= 255), (0 | r) >= 67)) {
                        for (; 0 != (3 & e); ) (U[e >> 0] = t), (e = (e + 1) | 0);
                        for (i = t | (t << 8) | (t << 16) | (t << 24), a = ((o = (-4 & n) | 0) - 64) | 0; (0 | e) <= (0 | a); )
                            (C[e >> 2] = i),
                                (C[(e + 4) >> 2] = i),
                                (C[(e + 8) >> 2] = i),
                                (C[(e + 12) >> 2] = i),
                                (C[(e + 16) >> 2] = i),
                                (C[(e + 20) >> 2] = i),
                                (C[(e + 24) >> 2] = i),
                                (C[(e + 28) >> 2] = i),
                                (C[(e + 32) >> 2] = i),
                                (C[(e + 36) >> 2] = i),
                                (C[(e + 40) >> 2] = i),
                                (C[(e + 44) >> 2] = i),
                                (C[(e + 48) >> 2] = i),
                                (C[(e + 52) >> 2] = i),
                                (C[(e + 56) >> 2] = i),
                                (C[(e + 60) >> 2] = i),
                                (e = (e + 64) | 0);
                        for (; (0 | e) < (0 | o); ) (C[e >> 2] = i), (e = (e + 4) | 0);
                    }
                    for (; (0 | e) < (0 | n); ) (U[e >> 0] = t), (e = (e + 1) | 0);
                })(i, 0, t),
                    (s = !0);
            } else {
                var u = xe.getStream(o);
                if (!u) return -9;
                var c = xe.mmap(u, X, e, t, a, r, n);
                (i = c.ptr), (s = c.allocated);
            }
            return (Ae.mappings[i] = { malloc: i, len: t, allocated: s, fd: o, flags: n }), i;
        }
        var He = { ppid: 1, pid: 42, sid: 42, pgid: 42 };
        function ze() {
            return U.length;
        }
        var Qe = te,
            qe = ne;
        function We(e) {
            cr(
                "Cannot enlarge memory arrays to size " +
                    e +
                    " bytes (OOM). Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " +
                    U.length +
                    ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 "
            );
        }
        if (
            (xe.staticInit(),
            (r.FS_createFolder = xe.createFolder),
            (r.FS_createPath = xe.createPath),
            (r.FS_createDataFile = xe.createDataFile),
            (r.FS_createPreloadedFile = xe.createPreloadedFile),
            (r.FS_createLazyFile = xe.createLazyFile),
            (r.FS_createLink = xe.createLink),
            (r.FS_createDevice = xe.createDevice),
            (r.FS_unlink = xe.unlink),
            i)
        ) {
            var Ge = require("fs"),
                Ve = require("path");
            De.staticInit();
        }
        function Ye(e, t, r) {
            var n = r > 0 ? r : P(e) + 1,
                o = new Array(n),
                a = x(e, o, 0, o.length);
            return t && (o.length = a), o;
        }
        var Ke = {
                D: function () {},
                u: function (e, t) {
                    Ae.varargs = t;
                    try {
                        var r = Ae.getStr();
                        return xe.unlink(r), 0;
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                d: function (e, t) {
                    Ae.varargs = t;
                    try {
                        var r = Ae.get(),
                            n = Ae.get();
                        Ae.varargs = n;
                        var o = function () {
                                var e = Pe.getSocket(Ae.get());
                                if (!e) throw new xe.ErrnoError(9);
                                return e;
                            },
                            a = function (e) {
                                var t = Ae.get(),
                                    r = Ae.get();
                                if (e && 0 === t) return null;
                                var n = Ce(t, r);
                                if (n.errno) throw new xe.ErrnoError(n.errno);
                                return (n.addr = Xe.lookup_addr(n.addr) || n.addr), n;
                            };
                        switch (r) {
                            case 1:
                                var i = Ae.get(),
                                    s = Ae.get(),
                                    u = Ae.get();
                                return N((c = Pe.createSocket(i, s, u)).stream.fd < 64), c.stream.fd;
                            case 2:
                                var c = o(),
                                    d = a();
                                return c.sock_ops.bind(c, d.addr, d.port), 0;
                            case 3:
                                return (c = o()), (d = a()), c.sock_ops.connect(c, d.addr, d.port), 0;
                            case 4:
                                c = o();
                                var l = Ae.get();
                                return c.sock_ops.listen(c, l), 0;
                            case 5:
                                c = o();
                                var f = Ae.get(),
                                    p = (Ae.get(), c.sock_ops.accept(c));
                                return f && N(!je(f, p.family, Xe.lookup_name(p.daddr), p.dport).errno), p.stream.fd;
                            case 6:
                                return (c = o()), (f = Ae.get()), Ae.get(), N(!je(f, c.family, Xe.lookup_name(c.saddr || "0.0.0.0"), c.sport).errno), 0;
                            case 7:
                                return (c = o()), (f = Ae.get()), Ae.get(), c.daddr ? (N(!je(f, c.family, Xe.lookup_name(c.daddr), c.dport).errno), 0) : -107;
                            case 11:
                                c = o();
                                var m = Ae.get(),
                                    E = Ae.get(),
                                    h = (Ae.get(), a(!0));
                                return h ? c.sock_ops.sendmsg(c, U, m, E, h.addr, h.port) : xe.write(c.stream, U, m, E);
                            case 12:
                                c = o();
                                var w = Ae.get(),
                                    y = Ae.get();
                                return Ae.get(), (f = Ae.get()), Ae.get(), (L = c.sock_ops.recvmsg(c, y)) ? (f && N(!je(f, c.family, Xe.lookup_name(L.addr), L.port).errno), X.set(L.buffer, w), L.buffer.byteLength) : 0;
                            case 14:
                                return -92;
                            case 15:
                                c = o();
                                var g = Ae.get(),
                                    v = Ae.get(),
                                    _ = Ae.get(),
                                    T = Ae.get();
                                return 1 === g && 4 === v ? ((C[_ >> 2] = c.error), (C[T >> 2] = 4), (c.error = null), 0) : -92;
                            case 16:
                                (c = o()), (m = Ae.get()), Ae.get();
                                var b,
                                    O = C[(m + 8) >> 2],
                                    k = C[(m + 12) >> 2],
                                    R = C[m >> 2],
                                    D = C[(m + 4) >> 2];
                                if (R) {
                                    if ((d = Ce(R, D)).errno) return -d.errno;
                                    (b = d.port), (f = Xe.lookup_addr(d.addr) || d.addr);
                                }
                                for (var M = 0, S = 0; S < k; S++) M += C[(O + (8 * S + 4)) >> 2];
                                var I = new Uint8Array(M),
                                    x = 0;
                                for (S = 0; S < k; S++) for (var A = C[(O + (8 * S + 0)) >> 2], P = C[(O + (8 * S + 4)) >> 2], F = 0; F < P; F++) I[x++] = U[(A + F) >> 0];
                                return c.sock_ops.sendmsg(c, I, 0, M, f, b);
                            case 17:
                                for (c = o(), m = Ae.get(), Ae.get(), O = C[(m + 8) >> 2], k = C[(m + 12) >> 2], M = 0, S = 0; S < k; S++) M += C[(O + (8 * S + 4)) >> 2];
                                var L;
                                if (!(L = c.sock_ops.recvmsg(c, M))) return 0;
                                (R = C[m >> 2]) && N(!je(R, c.family, Xe.lookup_name(L.addr), L.port).errno);
                                var j = 0,
                                    B = L.buffer.byteLength;
                                for (S = 0; B > 0 && S < k; S++) (A = C[(O + (8 * S + 0)) >> 2]), (P = C[(O + (8 * S + 4)) >> 2]) && ((E = Math.min(P, B)), (w = L.buffer.subarray(j, j + E)), X.set(w, A + j), (j += E), (B -= E));
                                return j;
                            default:
                                cr("unsupported socketcall syscall " + r);
                        }
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                A: function (e, t) {
                    Ae.varargs = t;
                    try {
                        var r = Ae.getStr();
                        return xe.chdir(r), 0;
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                I: function (e, t) {
                    Ae.varargs = t;
                    try {
                        var r = Ae.get();
                        if (!r) return -14;
                        var n = { sysname: 0, nodename: 65, domainname: 325, machine: 260, version: 195, release: 130, __size__: 390 },
                            o = function (e, t) {
                                !(function (e, t, r) {
                                    for (var n = 0; n < e.length; ++n) N((e.charCodeAt(n) == e.charCodeAt(n)) & 255), (U[t++ >> 0] = e.charCodeAt(n));
                                    r || (U[t >> 0] = 0);
                                })(t, r + n[e]);
                            };
                        return o("sysname", "Emscripten"), o("nodename", "emscripten"), o("release", "1.0"), o("version", "#1"), o("machine", "x86-JS"), 0;
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                x: function (e, t) {
                    Ae.varargs = t;
                    try {
                        var r = Ae.get(),
                            n = Ae.get();
                        if (0 === n) return -22;
                        var o = xe.cwd();
                        return n < P(o) + 1 ? -34 : (A(o, r, n), r);
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                H: function (e, t) {
                    Ae.varargs = t;
                    try {
                        return Be(Ae.get(), Ae.get(), Ae.get(), Ae.get(), Ae.get(), Ae.get());
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                y: function (e, t) {
                    Ae.varargs = t;
                    try {
                        var r = Ae.get(),
                            n = (Ae.getZero(), Ae.get64());
                        return xe.ftruncate(r, n), 0;
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                j: function (e, t) {
                    Ae.varargs = t;
                    try {
                        var r = Ae.getStr(),
                            n = Ae.get();
                        return Ae.doStat(xe.stat, r, n);
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                F: function (e, t) {
                    Ae.varargs = t;
                    try {
                        var r = Ae.getStreamFromFD(),
                            n = Ae.get();
                        return Ae.doStat(xe.stat, r.path, n);
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                w: function (e, t) {
                    Ae.varargs = t;
                    try {
                        return He.pid;
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                K: function (e, t) {
                    Ae.varargs = t;
                    try {
                        var r = Ae.getStreamFromFD(),
                            n = Ae.get(),
                            o = Ae.get();
                        r.getdents || (r.getdents = xe.readdir(r.path));
                        for (var a = 0, i = xe.llseek(r, 0, 1), s = Math.floor(i / 280); s < r.getdents.length && a + 280 <= o; ) {
                            var u,
                                c,
                                d = r.getdents[s];
                            if ("." === d[0]) (u = 1), (c = 4);
                            else {
                                var l = xe.lookupNode(r.node, d);
                                (u = l.id), (c = xe.isChrdev(l.mode) ? 2 : xe.isDir(l.mode) ? 4 : xe.isLink(l.mode) ? 10 : 8);
                            }
                            (Ee = [u >>> 0, ((me = u), +te(me) >= 1 ? (me > 0 ? (0 | oe(+ne(me / 4294967296), 4294967295)) >>> 0 : ~~+re((me - +(~~me >>> 0)) / 4294967296) >>> 0) : 0)]),
                                (C[(n + a) >> 2] = Ee[0]),
                                (C[(n + a + 4) >> 2] = Ee[1]),
                                (Ee = [(280 * (s + 1)) >>> 0, ((me = 280 * (s + 1)), +te(me) >= 1 ? (me > 0 ? (0 | oe(+ne(me / 4294967296), 4294967295)) >>> 0 : ~~+re((me - +(~~me >>> 0)) / 4294967296) >>> 0) : 0)]),
                                (C[(n + a + 8) >> 2] = Ee[0]),
                                (C[(n + a + 12) >> 2] = Ee[1]),
                                (L[(n + a + 16) >> 1] = 280),
                                (U[(n + a + 18) >> 0] = c),
                                A(d, n + a + 19, 256),
                                (a += 280),
                                (s += 1);
                        }
                        return xe.llseek(r, 280 * s, 0), a;
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                k: function (e, t) {
                    Ae.varargs = t;
                    try {
                        var r = Ae.getStreamFromFD();
                        switch (Ae.get()) {
                            case 0:
                                return (n = Ae.get()) < 0 ? -22 : xe.open(r.path, r.flags, 0, n).fd;
                            case 1:
                            case 2:
                                return 0;
                            case 3:
                                return r.flags;
                            case 4:
                                var n = Ae.get();
                                return (r.flags |= n), 0;
                            case 12:
                                return (n = Ae.get()), (L[(n + 0) >> 1] = 2), 0;
                            case 13:
                            case 14:
                                return 0;
                            case 16:
                            case 8:
                                return -22;
                            case 9:
                                return be(22), -1;
                            default:
                                return -22;
                        }
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                v: function (e, t) {
                    Ae.varargs = t;
                    try {
                        var r = Ae.getStreamFromFD(),
                            n = Ae.get(),
                            o = Ae.get();
                        return xe.read(r, U, n, o);
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                E: function (e, t) {
                    Ae.varargs = t;
                    try {
                        var r = Ae.getStr(),
                            n = Ae.get();
                        return Ae.doMkdir(r, n);
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                t: function (e, t) {
                    Ae.varargs = t;
                    try {
                        var r = Ae.getStreamFromFD(),
                            n = Ae.get(),
                            o = Ae.get();
                        return xe.write(r, U, n, o);
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                J: function (e, t) {
                    Ae.varargs = t;
                    try {
                        var r = Ae.getStr(),
                            n = Ae.get(),
                            o = Ae.get();
                        return xe.open(r, n, o).fd;
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                z: function (e, t) {
                    Ae.varargs = t;
                    try {
                        var r = Ae.getStreamFromFD();
                        return xe.close(r), 0;
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                G: function (e, t) {
                    Ae.varargs = t;
                    try {
                        return (function (e, t) {
                            if (-1 === e || 0 === t) return -22;
                            var r = Ae.mappings[e];
                            if (!r) return 0;
                            if (t === r.len) {
                                var n = xe.getStream(r.fd);
                                Ae.doMsync(e, n, t, r.flags), xe.munmap(n), (Ae.mappings[e] = null), r.allocated && tr(r.malloc);
                            }
                            return 0;
                        })(Ae.get(), Ae.get());
                    } catch (e) {
                        return (void 0 !== xe && e instanceof xe.ErrnoError) || cr(e), -e.errno;
                    }
                },
                C: function () {},
                e: function (e, t, r) {
                    for (
                        var n = D(t),
                            o = [],
                            a = function (e, t) {
                                return (e + t - 1) & ~(t - 1);
                            },
                            i = r,
                            s = 0;
                        s < n.length;
                        s++
                    ) {
                        var u = n[s];
                        "d" == u || "f" == u ? ((i = a(i, 8)), o.push(B[i >> 3]), (i += 8)) : "i" == u && ((i = a(i, 4)), o.push(C[i >> 2]), (i += 4));
                    }
                    return ge[e].apply(null, o);
                },
                h: function (e, t, r) {
                    for (
                        var n = D(t),
                            o = [],
                            a = function (e, t) {
                                return (e + t - 1) & ~(t - 1);
                            },
                            i = r,
                            s = 0;
                        s < n.length;
                        s++
                    ) {
                        var u = n[s];
                        "d" == u || "f" == u ? ((i = a(i, 8)), o.push(B[i >> 3]), (i += 8)) : "i" == u && ((i = a(i, 4)), o.push(C[i >> 2]), (i += 4));
                    }
                    return ge[e].apply(null, o);
                },
                a: a
                    ? function () {
                          var e = process.hrtime();
                          return 1e3 * e[0] + e[1] / 1e6;
                      }
                    : "undefined" != typeof dateNow
                    ? dateNow
                    : "object" == typeof performance && performance && "function" == typeof performance.now
                    ? function () {
                          return performance.now();
                      }
                    : Date.now,
                r: function (e, t, r) {
                    X.set(X.subarray(t, t + r), e);
                },
                f: function (e) {
                    !(function (e, t) {
                        (t && r.noExitRuntime && 0 === e) ||
                            (r.noExitRuntime
                                ? t ||
                                  y(
                                      "exit(" +
                                          e +
                                          ") called, but noExitRuntime is set due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)"
                                  )
                                : ((k = !0), e, W(), G(J), xe.quit(), ke.shutdown(), (ee = !0), r.onExit && r.onExit(e)),
                            c(e, new ir(e)));
                    })(e);
                },
                B: Qe,
                s: qe,
                i: function () {
                    return be(11), -1;
                },
                L: function (e) {
                    e = I(e);
                    var t = er(20),
                        r = er(e.length + 1);
                    A(e, r, e.length + 1), (C[t >> 2] = r);
                    var n = er(4);
                    (C[n >> 2] = 0), (C[(t + 4) >> 2] = n), (C[(t + 8) >> 2] = 2), (C[(t + 12) >> 2] = 4);
                    var o = er(12);
                    return (C[o >> 2] = o + 8), (C[(o + 4) >> 2] = 0), (C[(o + 8) >> 2] = Fe(Xe.lookup_name(e))), (C[(t + 16) >> 2] = o), t;
                },
                q: function (e, t) {
                    return y("Calling stub instead of kill()"), be(Ie.EPERM), -1;
                },
                o: function (e) {
                    return 0;
                },
                m: function () {
                    return 11;
                },
                c: function (e) {
                    var t, r, n, o;
                    return (
                        (e |= 0),
                        (n = 0 | ze()),
                        (((0 | e) > 0) & ((0 | (r = ((t = 0 | C[Q >> 2]) + e) | 0)) < (0 | t))) | ((0 | r) < 0) ? (We(0 | r), be(12), -1) : (0 | r) > (0 | n) && !(0 | ((o = 0 | r), void We(o))) ? (be(12), -1) : ((C[Q >> 2] = 0 | r), 0 | t)
                    );
                },
                n: function () {},
                g: function () {},
                l: function () {},
                b: function (e) {
                    O(0 | e);
                },
                p: function () {
                    return function (e) {
                        return be(10), -1;
                    }.apply(null, arguments);
                },
            },
            Je = r.asm({}, Ke, F),
            Ze = Je.M;
        Je.M = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Ze.apply(null, arguments);
        };
        var $e = Je.N;
        Je.N = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), $e.apply(null, arguments);
        };
        var et = Je.O;
        Je.O = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), et.apply(null, arguments);
        };
        var tt = Je.P;
        Je.P = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), tt.apply(null, arguments);
        };
        var rt = Je.Q;
        Je.Q = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), rt.apply(null, arguments);
        };
        var nt = Je.R;
        Je.R = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), nt.apply(null, arguments);
        };
        var ot = Je.S;
        Je.S = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ot.apply(null, arguments);
        };
        var at = Je.T;
        Je.T = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), at.apply(null, arguments);
        };
        var it = Je.U;
        Je.U = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), it.apply(null, arguments);
        };
        var st = Je.V;
        Je.V = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), st.apply(null, arguments);
        };
        var ut = Je.W;
        Je.W = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ut.apply(null, arguments);
        };
        var ct = Je.X;
        Je.X = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ct.apply(null, arguments);
        };
        var dt = Je.Y;
        Je.Y = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), dt.apply(null, arguments);
        };
        var lt = Je.Z;
        Je.Z = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), lt.apply(null, arguments);
        };
        var ft = Je._;
        Je._ = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ft.apply(null, arguments);
        };
        var pt = Je.$;
        Je.$ = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), pt.apply(null, arguments);
        };
        var mt = Je.aa;
        Je.aa = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), mt.apply(null, arguments);
        };
        var Et = Je.ba;
        Je.ba = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Et.apply(null, arguments);
        };
        var ht = Je.ca;
        Je.ca = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), ht.apply(null, arguments);
        };
        var wt = Je.da;
        Je.da = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), wt.apply(null, arguments);
        };
        var yt = Je.ea;
        Je.ea = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), yt.apply(null, arguments);
        };
        var gt = Je.fa;
        Je.fa = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), gt.apply(null, arguments);
        };
        var vt = Je.ga;
        Je.ga = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), vt.apply(null, arguments);
        };
        var _t = Je.ha;
        Je.ha = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), _t.apply(null, arguments);
        };
        var Tt = Je.ia;
        Je.ia = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Tt.apply(null, arguments);
        };
        var bt = Je.ja;
        Je.ja = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), bt.apply(null, arguments);
        };
        var Ot = Je.ka;
        Je.ka = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Ot.apply(null, arguments);
        };
        var kt = Je.la;
        Je.la = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), kt.apply(null, arguments);
        };
        var Nt = Je.ma;
        Je.ma = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Nt.apply(null, arguments);
        };
        var Rt = Je.na;
        Je.na = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Rt.apply(null, arguments);
        };
        var Dt = Je.oa;
        Je.oa = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Dt.apply(null, arguments);
        };
        var Mt = Je.pa;
        Je.pa = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Mt.apply(null, arguments);
        };
        var St = Je.qa;
        Je.qa = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), St.apply(null, arguments);
        };
        var It = Je.ra;
        Je.ra = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), It.apply(null, arguments);
        };
        var xt = Je.sa;
        Je.sa = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), xt.apply(null, arguments);
        };
        var At = Je.ta;
        Je.ta = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), At.apply(null, arguments);
        };
        var Pt = Je.ua;
        Je.ua = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Pt.apply(null, arguments);
        };
        var Ft = Je.va;
        Je.va = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Ft.apply(null, arguments);
        };
        var Ut = Je.wa;
        Je.wa = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Ut.apply(null, arguments);
        };
        var Xt = Je.xa;
        Je.xa = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Xt.apply(null, arguments);
        };
        var Lt = Je.ya;
        Je.ya = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Lt.apply(null, arguments);
        };
        var Ct = Je.za;
        Je.za = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Ct.apply(null, arguments);
        };
        var jt = Je.Aa;
        Je.Aa = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), jt.apply(null, arguments);
        };
        var Bt = Je.Ba;
        Je.Ba = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Bt.apply(null, arguments);
        };
        var Ht = Je.Ca;
        Je.Ca = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Ht.apply(null, arguments);
        };
        var zt = Je.Da;
        Je.Da = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), zt.apply(null, arguments);
        };
        var Qt = Je.Ea;
        Je.Ea = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Qt.apply(null, arguments);
        };
        var qt = Je.Fa;
        Je.Fa = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), qt.apply(null, arguments);
        };
        var Wt = Je.Ga;
        Je.Ga = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Wt.apply(null, arguments);
        };
        var Gt = Je.Ha;
        Je.Ha = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Gt.apply(null, arguments);
        };
        var Vt = Je.Ia;
        Je.Ia = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Vt.apply(null, arguments);
        };
        var Yt = Je.Ja;
        Je.Ja = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Yt.apply(null, arguments);
        };
        var Kt = Je.Ka;
        (Je.Ka = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), Kt.apply(null, arguments);
        }),
            (r.asm = Je);
        var Jt = (r.___wasm_call_ctors = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.M.apply(null, arguments);
            }),
            Zt =
                ((r._TN = function () {
                    return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.N.apply(null, arguments);
                }),
                (r._r1 = function () {
                    return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.O.apply(null, arguments);
                }),
                (r._vv = function () {
                    return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.P.apply(null, arguments);
                }),
                (r._kp = function () {
                    return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.Q.apply(null, arguments);
                }),
                (r._r0 = function () {
                    return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.R.apply(null, arguments);
                }),
                (r._va = function () {
                    return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.S.apply(null, arguments);
                }),
                (r._pn = function () {
                    return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.T.apply(null, arguments);
                }),
                (r._os = function () {
                    return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.U.apply(null, arguments);
                }),
                (r.___errno_location = function () {
                    return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.V.apply(null, arguments);
                }),
                (r._a1 = function () {
                    return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.W.apply(null, arguments);
                }),
                (r._ex = function () {
                    return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.X.apply(null, arguments);
                }),
                (r._v0 = function () {
                    return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.Y.apply(null, arguments);
                }),
                (r._uj = function () {
                    return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.Z.apply(null, arguments);
                }),
                (r._tn = function () {
                    return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm._.apply(null, arguments);
                }),
                (r._D = function () {
                    return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.$.apply(null, arguments);
                }),
                (r._mx = function () {
                    return (
                        N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.aa.apply(null, arguments)
                    );
                }),
                (r._vx = function () {
                    return (
                        N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.ba.apply(null, arguments)
                    );
                }),
                (r._pv = function () {
                    return (
                        N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.ca.apply(null, arguments)
                    );
                }),
                (r._T = function () {
                    return (
                        N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.da.apply(null, arguments)
                    );
                }),
                (r._ux = function () {
                    return (
                        N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.ea.apply(null, arguments)
                    );
                }),
                (r._t1 = function () {
                    return (
                        N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.fa.apply(null, arguments)
                    );
                }),
                (r._init = function () {
                    return (
                        N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.ga.apply(null, arguments)
                    );
                }),
                (r._kpc_M = function () {
                    return (
                        N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.ha.apply(null, arguments)
                    );
                }),
                (r._kpc_w0 = function () {
                    return (
                        N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.ia.apply(null, arguments)
                    );
                }),
                (r._htonl = function () {
                    return (
                        N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.ja.apply(null, arguments)
                    );
                }),
                (r._htons = function () {
                    return (
                        N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.ka.apply(null, arguments)
                    );
                })),
            $t = (r._ntohs = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.la.apply(null, arguments);
            }),
            er =
                ((r._fflush = function () {
                    return (
                        N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.ma.apply(null, arguments)
                    );
                }),
                (r._malloc = function () {
                    return (
                        N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.na.apply(null, arguments)
                    );
                })),
            tr = (r._free = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.oa.apply(null, arguments);
            }),
            rr = (r._memalign = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.pa.apply(null, arguments);
            }),
            nr =
                ((r._emscripten_builtin_free = function () {
                    return (
                        N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.qa.apply(null, arguments)
                    );
                }),
                (r._emscripten_builtin_memalign = function () {
                    return (
                        N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.ra.apply(null, arguments)
                    );
                }),
                (r._setThrew = function () {
                    return (
                        N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.sa.apply(null, arguments)
                    );
                }),
                (r.stackSave = function () {
                    return (
                        N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.ta.apply(null, arguments)
                    );
                })),
            or = (r.stackAlloc = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.ua.apply(null, arguments);
            }),
            ar = (r.stackRestore = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.va.apply(null, arguments);
            });
        (r.__growWasmMemory = function () {
            return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.wa.apply(null, arguments);
        }),
            (r.dynCall_iiii = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.xa.apply(null, arguments);
            }),
            (r.dynCall_jj = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.ya.apply(null, arguments);
            }),
            (r.dynCall_jjjj = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.za.apply(null, arguments);
            }),
            (r.dynCall_jjj = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.Aa.apply(null, arguments);
            }),
            (r.dynCall_ji = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.Ba.apply(null, arguments);
            }),
            (r.dynCall_vi = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.Ca.apply(null, arguments);
            }),
            (r.dynCall_vj = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.Da.apply(null, arguments);
            }),
            (r.dynCall_jij = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.Ea.apply(null, arguments);
            }),
            (r.dynCall_dd = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.Fa.apply(null, arguments);
            }),
            (r.dynCall_jjii = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.Ga.apply(null, arguments);
            }),
            (r.dynCall_jjjjj = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.Ha.apply(null, arguments);
            }),
            (r.dynCall_ij = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.Ia.apply(null, arguments);
            }),
            (r.dynCall_vjjj = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.Ja.apply(null, arguments);
            }),
            (r.dynCall_iidiiii = function () {
                return N($, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)"), N(!ee, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), r.asm.Ka.apply(null, arguments);
            });
        function ir(e) {
            (this.name = "ExitStatus"), (this.message = "Program terminated with exit(" + e + ")"), (this.status = e);
        }
        function sr(e) {
            function t() {
                r.calledRun ||
                    ((r.calledRun = !0),
                    k ||
                        (W(),
                        N(!$),
                        ($ = !0),
                        r.noFSInit || xe.init.initialized || xe.init(),
                        ke.init(),
                        (Pe.root = xe.mount(Pe, {}, null)),
                        G(Y),
                        W(),
                        (xe.ignorePermissions = !1),
                        G(K),
                        r.onRuntimeInitialized && r.onRuntimeInitialized(),
                        N(!r._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'),
                        (function () {
                            if ((W(), r.postRun)) for ("function" == typeof r.postRun && (r.postRun = [r.postRun]); r.postRun.length; ) (e = r.postRun.shift()), Z.unshift(e);
                            var e;
                            G(Z);
                        })()));
            }
            (e = e || u),
                ae > 0 ||
                    (N(0 == (3 & z)),
                    (j[1 + (z >> 2)] = 34821223),
                    (j[2 + (z >> 2)] = 2310721022),
                    (function () {
                        if (r.preRun) for ("function" == typeof r.preRun && (r.preRun = [r.preRun]); r.preRun.length; ) (e = r.preRun.shift()), V.unshift(e);
                        var e;
                        G(V);
                    })(),
                    ae > 0 ||
                        r.calledRun ||
                        (r.setStatus
                            ? (r.setStatus("Running..."),
                              setTimeout(function () {
                                  setTimeout(function () {
                                      r.setStatus("");
                                  }, 1),
                                      t();
                              }, 1))
                            : t(),
                        W()));
        }
        (r.asm = Je),
            Object.getOwnPropertyDescriptor(r, "intArrayFromString") ||
                (r.intArrayFromString = function () {
                    cr("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "intArrayToString") ||
                (r.intArrayToString = function () {
                    cr("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            (r.ccall = R),
            (r.cwrap = function (e, t, r, n) {
                return function () {
                    return R(e, t, r, arguments, n);
                };
            }),
            Object.getOwnPropertyDescriptor(r, "setValue") ||
                (r.setValue = function () {
                    cr("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "getValue") ||
                (r.getValue = function () {
                    cr("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "allocate") ||
                (r.allocate = function () {
                    cr("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            (r.getMemory = function (e) {
                return $ ? er(e) : g(e);
            }),
            Object.getOwnPropertyDescriptor(r, "AsciiToString") ||
                (r.AsciiToString = function () {
                    cr("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "stringToAscii") ||
                (r.stringToAscii = function () {
                    cr("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "UTF8ArrayToString") ||
                (r.UTF8ArrayToString = function () {
                    cr("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            (r.UTF8ToString = I),
            Object.getOwnPropertyDescriptor(r, "stringToUTF8Array") ||
                (r.stringToUTF8Array = function () {
                    cr("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "stringToUTF8") ||
                (r.stringToUTF8 = function () {
                    cr("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "lengthBytesUTF8") ||
                (r.lengthBytesUTF8 = function () {
                    cr("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "UTF16ToString") ||
                (r.UTF16ToString = function () {
                    cr("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "stringToUTF16") ||
                (r.stringToUTF16 = function () {
                    cr("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "lengthBytesUTF16") ||
                (r.lengthBytesUTF16 = function () {
                    cr("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "UTF32ToString") ||
                (r.UTF32ToString = function () {
                    cr("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "stringToUTF32") ||
                (r.stringToUTF32 = function () {
                    cr("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "lengthBytesUTF32") ||
                (r.lengthBytesUTF32 = function () {
                    cr("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "allocateUTF8") ||
                (r.allocateUTF8 = function () {
                    cr("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "stackTrace") ||
                (r.stackTrace = function () {
                    cr("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "addOnPreRun") ||
                (r.addOnPreRun = function () {
                    cr("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "addOnInit") ||
                (r.addOnInit = function () {
                    cr("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "addOnPreMain") ||
                (r.addOnPreMain = function () {
                    cr("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "addOnExit") ||
                (r.addOnExit = function () {
                    cr("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "addOnPostRun") ||
                (r.addOnPostRun = function () {
                    cr("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "writeStringToMemory") ||
                (r.writeStringToMemory = function () {
                    cr("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "writeArrayToMemory") ||
                (r.writeArrayToMemory = function () {
                    cr("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "writeAsciiToMemory") ||
                (r.writeAsciiToMemory = function () {
                    cr("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            (r.addRunDependency = ce),
            (r.removeRunDependency = de),
            Object.getOwnPropertyDescriptor(r, "ENV") ||
                (r.ENV = function () {
                    cr("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "FS") ||
                (r.FS = function () {
                    cr("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            (r.FS_createFolder = xe.createFolder),
            (r.FS_createPath = xe.createPath),
            (r.FS_createDataFile = xe.createDataFile),
            (r.FS_createPreloadedFile = xe.createPreloadedFile),
            (r.FS_createLazyFile = xe.createLazyFile),
            (r.FS_createLink = xe.createLink),
            (r.FS_createDevice = xe.createDevice),
            (r.FS_unlink = xe.unlink),
            Object.getOwnPropertyDescriptor(r, "GL") ||
                (r.GL = function () {
                    cr("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "dynamicAlloc") ||
                (r.dynamicAlloc = function () {
                    cr("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "warnOnce") ||
                (r.warnOnce = function () {
                    cr("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "loadDynamicLibrary") ||
                (r.loadDynamicLibrary = function () {
                    cr("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "loadWebAssemblyModule") ||
                (r.loadWebAssemblyModule = function () {
                    cr("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "getLEB") ||
                (r.getLEB = function () {
                    cr("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "getFunctionTables") ||
                (r.getFunctionTables = function () {
                    cr("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "alignFunctionTables") ||
                (r.alignFunctionTables = function () {
                    cr("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "registerFunctions") ||
                (r.registerFunctions = function () {
                    cr("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "addFunction") ||
                (r.addFunction = function () {
                    cr("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "removeFunction") ||
                (r.removeFunction = function () {
                    cr("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "getFuncWrapper") ||
                (r.getFuncWrapper = function () {
                    cr("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "prettyPrint") ||
                (r.prettyPrint = function () {
                    cr("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "makeBigInt") ||
                (r.makeBigInt = function () {
                    cr("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "dynCall") ||
                (r.dynCall = function () {
                    cr("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "getCompilerSetting") ||
                (r.getCompilerSetting = function () {
                    cr("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "stackSave") ||
                (r.stackSave = function () {
                    cr("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "stackRestore") ||
                (r.stackRestore = function () {
                    cr("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "stackAlloc") ||
                (r.stackAlloc = function () {
                    cr("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "establishStackSpace") ||
                (r.establishStackSpace = function () {
                    cr("'establishStackSpace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "print") ||
                (r.print = function () {
                    cr("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "printErr") ||
                (r.printErr = function () {
                    cr("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            (r.getTempRet0 = function () {
                return b;
            }),
            Object.getOwnPropertyDescriptor(r, "setTempRet0") ||
                (r.setTempRet0 = function () {
                    cr("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "callMain") ||
                (r.callMain = function () {
                    cr("'callMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "Pointer_stringify") ||
                (r.Pointer_stringify = function () {
                    cr("'Pointer_stringify' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "writeStackCookie") ||
                (r.writeStackCookie = function () {
                    cr("'writeStackCookie' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "checkStackCookie") ||
                (r.checkStackCookie = function () {
                    cr("'checkStackCookie' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "abortStackOverflow") ||
                (r.abortStackOverflow = function () {
                    cr("'abortStackOverflow' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                }),
            Object.getOwnPropertyDescriptor(r, "ALLOC_NORMAL") ||
                Object.defineProperty(r, "ALLOC_NORMAL", {
                    get: function () {
                        cr("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                    },
                }),
            Object.getOwnPropertyDescriptor(r, "ALLOC_STACK") ||
                Object.defineProperty(r, "ALLOC_STACK", {
                    get: function () {
                        cr("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                    },
                }),
            Object.getOwnPropertyDescriptor(r, "ALLOC_DYNAMIC") ||
                Object.defineProperty(r, "ALLOC_DYNAMIC", {
                    get: function () {
                        cr("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                    },
                }),
            Object.getOwnPropertyDescriptor(r, "ALLOC_NONE") ||
                Object.defineProperty(r, "ALLOC_NONE", {
                    get: function () {
                        cr("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
                    },
                }),
            (r.then = function (e) {
                if (r.calledRun) e(r);
                else {
                    var t = r.onRuntimeInitialized;
                    r.onRuntimeInitialized = function () {
                        t && t(), e(r);
                    };
                }
                return r;
            }),
            (se = function e() {
                r.calledRun || sr(), r.calledRun || (se = e);
            }),
            (r.run = sr);
        var ur = [];
        function cr(e) {
            r.onAbort && r.onAbort(e), w((e += "")), y(e), (k = !0), 1;
            var t = "abort(" + e + ") at " + _e();
            throw (
                (ur &&
                    ur.forEach(function (r) {
                        t = r(t, e);
                    }),
                t)
            );
        }
        if (((r.abort = cr), r.preInit)) for ("function" == typeof r.preInit && (r.preInit = [r.preInit]); r.preInit.length > 0; ) r.preInit.pop()();
        return sr(), t;
    };
//})();
