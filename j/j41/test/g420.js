NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. f/y for atomic verbs ------------------------------------------------

insert =. ({.`) (`($:@}.)) \ ({.`) (@.(1&<@#))     NB. one or more items

(= /t) -: = insert t=.?20$2
(< /t) -: < insert t=.?20$2
(<./t) -: <.insert t=.?20$2
(<:/t) -: <:insert t=.?20$2
(> /t) -: > insert t=.?20$2
(>./t) -: >.insert t=.?20$2
(>:/t) -: >:insert t=.?20$2
(+ /t) -: + insert t=.?20$2
(+./t) -: +.insert t=.?20$2
(+:/t) -: +:insert t=.?20$2
(* /t) -: * insert t=.?20$2
(*./t) -: *.insert t=.?20$2
(*:/t) -: *:insert t=.?20$2
(- /t) -: - insert t=.?20$2
(% /t) -: % insert t=.?20$2
(^ /t) -: ^ insert t=.?20$2
(~:/t) -: ~:insert t=.?20$2
(| /t) -: | insert t=.?20$2
(! /t) -: ! insert t=.?20$2

(= /"1 t) -: = insert"1 t=.#:i.16
(< /"1 t) -: < insert"1 t=.#:i.16
(<./"1 t) -: <.insert"1 t=.#:i.16
(<:/"1 t) -: <:insert"1 t=.#:i.16
(> /"1 t) -: > insert"1 t=.#:i.16
(>./"1 t) -: >.insert"1 t=.#:i.16
(>:/"1 t) -: >:insert"1 t=.#:i.16
(+ /"1 t) -: + insert"1 t=.#:i.16
(+./"1 t) -: +.insert"1 t=.#:i.16
(+:/"1 t) -: +:insert"1 t=.#:i.16
(* /"1 t) -: * insert"1 t=.#:i.16
(*./"1 t) -: *.insert"1 t=.#:i.16
(*:/"1 t) -: *:insert"1 t=.#:i.16
(- /"1 t) -: - insert"1 t=.#:i.16
(% /"1 t) -: % insert"1 t=.#:i.16
(^ /"1 t) -: ^ insert"1 t=.#:i.16
(~:/"1 t) -: ~:insert"1 t=.#:i.16
(| /"1 t) -: | insert"1 t=.#:i.16
(! /"1 t) -: ! insert"1 t=.#:i.16

(= /t) -: = insert t=.?10 17$2
(< /t) -: < insert t=.?10 17$2
(<./t) -: <.insert t=.?10 17$2
(<:/t) -: <:insert t=.?10 17$2
(> /t) -: > insert t=.?10 17$2
(>./t) -: >.insert t=.?10 17$2
(>:/t) -: >:insert t=.?10 17$2
(+ /t) -: + insert t=.?10 17$2
(+./t) -: +.insert t=.?10 17$2
(+:/t) -: +:insert t=.?10 17$2
(* /t) -: * insert t=.?10 17$2
(*./t) -: *.insert t=.?10 17$2
(*:/t) -: *:insert t=.?10 17$2
(- /t) -: - insert t=.?10 17$2
(% /t) -: % insert t=.?10 17$2
(^ /t) -: ^ insert t=.?10 17$2
(~:/t) -: ~:insert t=.?10 17$2
(| /t) -: | insert t=.?10 17$2
(! /t) -: ! insert t=.?10 17$2

(= /t) -: = insert t=.?10 1 1 1$2
(< /t) -: < insert t=.?10 1 1 1$2
(<./t) -: <.insert t=.?10 1 1 1$2
(<:/t) -: <:insert t=.?10 1 1 1$2
(> /t) -: > insert t=.?10 1 1 1$2
(>./t) -: >.insert t=.?10 1 1 1$2
(>:/t) -: >:insert t=.?10 1 1 1$2
(+ /t) -: + insert t=.?10 1 1 1$2
(+./t) -: +.insert t=.?10 1 1 1$2
(+:/t) -: +:insert t=.?10 1 1 1$2
(* /t) -: * insert t=.?10 1 1 1$2
(*./t) -: *.insert t=.?10 1 1 1$2
(*:/t) -: *:insert t=.?10 1 1 1$2
(- /t) -: - insert t=.?10 1 1 1$2
(% /t) -: % insert t=.?10 1 1 1$2
(^ /t) -: ^ insert t=.?10 1 1 1$2
(~:/t) -: ~:insert t=.?10 1 1 1$2
(| /t) -: | insert t=.?10 1 1 1$2
(! /t) -: ! insert t=.?10 1 1 1$2

(<./t) -: <.insert t=.?20$1e6
(>./t) -: >.insert t=.?20$1e6
(+ /t) -: + insert t=.?20$1e6
(+./t) -: +.insert t=.?20$1e6
(* /t) -: * insert t=.?20$1e6
(*./t) -: *.insert t=.?20$1e6
(- /t) -: - insert t=.?20$1e6
(% /t) -: % insert t=.?20$1e6

(<./t) -: <.insert t=.?10 17$1e6
(>./t) -: >.insert t=.?10 17$1e6
(+ /t) -: + insert t=.?10 17$1e6
(+./t) -: +.insert t=.?10 17$1e6
(* /t) -: * insert t=.?10 17$1e6
(*./t) -: *.insert t=.?10 17$1e6
(- /t) -: - insert t=.?10 17$1e6
(% /t) -: % insert t=.?10 17$1e6

(<./t) -: <.insert t=.o.?20$1e6
(>./t) -: >.insert t=.o.?20$1e6
(+ /t) -: + insert t=.o.?20$1e6
(+./t) -: +.insert t=.o.?20$1e6
(* /t) -: * insert t=.o.?20$1e6
(*./t) -: *.insert t=.o.?20$1e6
(- /t) -: - insert t=.o.?20$1e6
(% /t) -: % insert t=.o.?20$1e6

(<./t) -: <.insert t=.o.?10 17$1e6
(>./t) -: >.insert t=.o.?10 17$1e6
(+ /t) -: + insert t=.o.?10 17$1e6
(+./t) -: +.insert t=.o.?10 17$1e6
(* /t) -: * insert t=.o.?10 17$1e6
(*./t) -: *.insert t=.o.?10 17$1e6
(- /t) -: - insert t=.o.?10 17$1e6
(% /t) -: % insert t=.o.?10 17$1e6


NB. ,/ ------------------------------------------------------------------

insert =. ({.`) (`($:@}.)) \ ({.`) (@.(1&<@#))     NB. one or more items

(,/t) -: ,insert t=.7
(,/t) -: ,insert t=.'abc'
(,/t) -: ,insert t=.?7 0$1000
(,/t) -: ,insert t=.?7 1$1000
(,/t) -: ,insert t=.?7 9$1000
(,/t) -: ,insert t=.?1 7$1000
(,/t) -: ,insert t=.7 2$;:'Cogito, ergo sum.'
(,/t) -: ,insert t=.o.?2 7 3$1000
(,/t) -: ,insert t=.?2 0 7 3$1000
(,/t) -: ,insert t=.r.?7 2 3 1 1$10000


NB. f/ identity functions -----------------------------------------------

(s$0) -:  +/i.0,s           [ s=.?(?5)$10
(s$0) -:  -/i.0,s           [ s=.?(?5)$10
(s$1) -:  */i.0,s           [ s=.?(?5)$10
(s$1) -:  %/i.0,s           [ s=.?(?5)$10
(s$1) -: %:/i.0,s           [ s=.?(?5)$10
(s$1) -:  =/i.0,s           [ s=.?(?5)$10
(s$0) -: ~:/i.0,s           [ s=.?(?5)$10
(s$0) -:  </i.0,s           [ s=.?(?5)$10
(s$0) -:  >/i.0,s           [ s=.?(?5)$10
(s$1) -: >:/i.0,s           [ s=.?(?5)$10
(s$1) -: <:/i.0,s           [ s=.?(?5)$10
(s$1) -:  ^/i.0,s           [ s=.?(?5)$10
(s$0) -:  |/i.0,s           [ s=.?(?5)$10
(s$1) -:  !/i.0,s           [ s=.?(?5)$10
(s$1) -: *./i.0,s           [ s=.?(?5)$10
(s$0) -: +./i.0,s           [ s=.?(?5)$10

(s$1) -:  1 b./i.0,s        [ s=.?(?5)$10
(s$0) -:  2 b./i.0,s        [ s=.?(?5)$10
(s$0) -:  4 b./i.0,s        [ s=.?(?5)$10
(s$0) -:  6 b./i.0,s        [ s=.?(?5)$10
(s$0) -:  7 b./i.0,s        [ s=.?(?5)$10
(s$1) -:  9 b./i.0,s        [ s=.?(?5)$10
(s$1) -: 11 b./i.0,s        [ s=.?(?5)$10
(s$1) -: 13 b./i.0,s        [ s=.?(?5)$10

-.0 e.(s$_1e50) >: >./i.0,s [ s=.?(?5)$10
-.0 e.(s$ 1e50) <: <./i.0,s [ s=.?(?5)$10
(<./'')        -: ->./''

(i.0,}.s) -: ,/i.0,s        [ s=.?(?5)$10

f =. =@i.@{.@(,&0)
(f s) -: + / .* /i.0,s      [ s=.?(?5)$10
(f s) -: +./ .*./i.0,s      [ s=.?(?5)$10
(f s) -: ~:/ .*./i.0,s      [ s=.?(?5)$10
(f s) -:      %./i.0,s      [ s=.?(?5)$10

f =. i.&{.@(,&0)
(f s) -:  {/i.0,s           [ s=.?(?5)$10
(f s) -:  {/i.s             [ s=.0
(f s) -: C./i.0,s           [ s=.?(?5)$10
(f s) -: C./i.s             [ s=.0

(s$1)   -: +&.^./i.0,s      [ s=.?(?5)$10
(s$<$0) -: ,&.>/i.0,s       [ s=.?(?5)$10
(<$0)   -: ,&.>/''
(s$5)   -: *&.(_4&+)/i.0,s  [ s=.?(?5)$10

(4 5$0) -: +     /i.0 4 5
0       -: +/    /i.0 4 5
(4 5$0) -: *&.^  /i.0 4 5
0       -: *&.^/ /i.0 4 5
(4 5$1) -: *     /i.0 4 5
1       -: */    /i.0 4 5
(4 5$1) -: +&.^. /i.0 4 5
1       -: +&.^.//i.0 4 5


NB. x f/y ---------------------------------------------------------------

p =. ?(>:?20)$100
q =. ?(>:?20)$100

(p+"0 99 q) -: p+/q
(p*"0/q)    -: p*/q
({p;q)      -: p,&.>/q
({p;q)      -: p<@,"0/q

iota =. > @ (+/&.>/) @ (i.&.> *&.> */\.@}.@(,&1))
(i. -: iota) 2 3 4
(i. -: iota) >:?(?5)$6
(i. -: iota) $0