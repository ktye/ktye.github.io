
(ERROR) @err

(nb) @nb
;(kv (v) @v)

(dap v: (op) @do) (dam v: (op) @do)
(map f: (op) @mo)
(map f: (avd f: (op)) @mavo) (dap v: (avd f: (op)) @do)
(ass f: (op)* @sym ":" @sym)  (ass v: (lit (var) @vass))
(pass f: (op)* @sym ":" @sym) (pass v: (lit (var) @vass))


;(ass v: (lit (var) @gvass (#is-not? local)))
(io) @io

(pdap v: (op) @do) ;;(pdap v: (kv) @part) (pdap z: (v) @part)

(pmap f: (op) @mo) (pmap v: (op) @mo)

(a) @a ;;(avd f: (kt) @advf)
(int1) @i (intv) @I (flt1) @f (fltv) @F (sym1) @n (symv) @N (chr1) @c (chrv) @C


(parn "(" @pare (k (exp)) ")" @pare)
(parn "(" @par ")" @par) (list "(" @parl (seq (SEMI) @parl) ")" @parl)

(lam "{[" @parm v:(args (var) @lv) "]" @parm "}" @parm)
(lam "{[" @parm v:(args ";" @parm)?  "]" @parm "}" @parm)
(exp ":" @pare) 
(ap "[" @abrk "]" @abrk) (ap "[" @abrk (seq (SEMI) @abrk) "]" @abrk)
(ap ;f: (ke (kt (kv))) @abrk
    "[" @abrk "]" @abrk) (ap "[" @abrk (seq (SEMI) @abrk) "]" @abrk)

(dict "{" @pard "}" @pard) (kv) @kv

;(lit (var) @var (#is-not? local))
(lit (var) @var)
(op) @op

(SEMI) @SEMI

