NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. ~.y -----------------------------------------------------------------

(,b)-:~.b=.0
(,b)-:~.b=.'a'
(,b)-:~.b=.243
(,b)-:~.b=.2.71828
(,b)-:~.b=.3j4.54e2
(,b)-:~.b=.<i.12

b-:~.b=.1 0
b-:~.b=.1 3 4$a.
b-:~.b=.i.1 2 3 4
b-:~.b=.o.i.1 2 3
b-:~.b=.^0j1*i.1 0 3
b-:~.b=.1 3 2$;:'Cogito, ergo sum.'

b-:~.b=.0$0
b-:~.b=.0 3 4$a.
b-:~.b=.i.0 2 3 4
b-:~.b=.o.i.0 2 3
b-:~.b=.^0j1*i.0 2 0 3
b-:~.b=.0 3 2$;:'Cogito, ergo sum.'

(1{.b)-:~.b=.5#1
(1{.b)-:~.b=.5#1 3 4$a.
(1{.b)-:~.b=.5#i.1 2 3 4
(1{.b)-:~.b=.5#o.i.1 2 3
(1{.b)-:~.b=.5#^0j1*i.1 0 3
(1{.b)-:~.b=.5#1 3 2$;:'Cogito, ergo sum.'

NB. Boolean
p=.1=?20 2$2
b=.~.p
($$p)=$$b
(}.$p)-:}.$b
(#b)<:#p
(#b)>>./b i.p
(b i.b)-:i.#b

NB. literal
p=.a.{~50+?20 2$3
b=.~.p
($$p)=$$b
(}.$p)-:}.$b
(#b)<:#p
(#b)>>./b i.p
(b i.b)-:i.#b

NB. integer
p=.?20 2$3
b=.~.p
($$p)=$$b
(}.$p)-:}.$b
(#b)<:#p
(#b)>>./b i.p
(b i.b)-:i.#b

NB. floating point
p=.o.?20 2$3
b=.~.p
($$p)=$$b
(}.$p)-:}.$b
(#b)<:#p
(#b)>>./b i.p
(b i.b)-:i.#b

NB. complex
p=.^0j1*?20 2$3
b=.~.p
($$p)=$$b
(}.$p)-:}.$b
(#b)<:#p
(#b)>>./b i.p
(b i.b)-:i.#b

NB. boxed
p=.('foo';'upon';'thee'){~?20 2$3
b=.~.p
($$p)=$$b
(}.$p)-:}.$b
(#b)<:#p
(#b)>>./b i.p
(b i.b)-:i.#b
