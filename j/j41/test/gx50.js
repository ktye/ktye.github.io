NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 5!:0 ----------------------------------------------------------------

fx =. 5!:0
ar =. 5!:1

((ar <'a') fx) -: a =. 2=?20$2
((ar <'a') fx) -: a =. a.{~?2 3 4$#a.
((ar <'a') fx) -: a =. ?2 3$2000
((ar <'a') fx) -: a =. o.?20$100
((ar <'a') fx) -: a =. ^0j1*?3 4 5$100
((ar <'a') fx) -: a =. +&.>?4 3$100

((ar <'a') fx) -: a =. 0 4 5 $ 2=?20$2
((ar <'a') fx) -: a =. 0 0   $ a.{~?2 3 4$#a.
((ar <'a') fx) -: a =. 4 0 0 $ ?2 3$2000
((ar <'a') fx) -: a =. 0     $ o.?20$100
((ar <'a') fx) -: a =. 4 0 5 $ ^0j1*?3 4 5$100
((ar <'a') fx) -: a =. 5 0   $ +&.>?4 3$100

tv   =. '=/(ar<''x.'') fx `(x.f.)' : 1
eq   =. ar&<@[ -: ar&<@]
each =. 'x.f.&.>' : 1
pow  =. ('$.=.1,y.#2'; 't=.]'; 't=.x.&t f.') : 2

+             tv
+/ . *        tv
+/ pow 4      tv
|. each       tv

+/ : *        tv
+/ : 'x.+y.'  tv
+/ : ''       tv
'2*y.' : *    tv
'2*y.' : *    tv
'2*y.' : ''   tv
'' : (3&*)    tv
'' : 'x.+y.'  tv
'' : ''       tv

(+%)          tv
(=<.)         tv
(+,-)         tv
(0&<: *. <.)  tv

f =. \.
g =. (ar <'f') fx
'f' eq 'g'

f =. :
g =. (ar <'f') fx
'f' eq 'g'

f =. eq
g =. (ar <'f') fx
'f' eq 'g'

f =. each
g =. (ar <'f') fx
'f' eq 'g'

f =. pow
g =. (ar <'f') fx
'f' eq 'g'

a. -: (<'a.') fx
=/ (<'+') fx ` +
(+/a) -: + (<'/') fx a=.?20$100

f =. +&.^.
g =. + ((<'&.') fx) ^.
'f' eq 'g'

f =. +/.
g =. (<'/.';<''`+) fx
'f' eq 'g'

f =. /.
g =. (<'/.';'') fx
'f' eq 'g'

f =. &
g =. (<'&';'') fx
'f' eq 'g'


NB. 5!:0 on string representations --------------------------------------

fx   =. 5!:0
ar   =. 5!:1
sr   =. 5!:3!.16
nc   =. 4!:0
ex   =. 4!:55

NB. Boolean
((sr <'a') fx) -: a =. 0
((sr <'a') fx) -: a =. 1=?3 2 3$2
((sr <'a') fx) -: a =. 0 2 3$0
((sr <'a') fx) -: a =. 0$0

NB. literal
((sr <'a') fx) -: a =. 'a'
((sr <'a') fx) -: a =. ' '
((sr <'a') fx) -: a =. 0{a.
((sr <'a') fx) -: a =. a.
((sr <'a') fx) -: a =. (?3 2 3$#a.){a.
((sr <'a') fx) -: a =. 0 2 3$'a'
((sr <'a') fx) -: a =. ''

NB. integer
((sr <'a') fx) -: a =. 4
((sr <'a') fx) -: a =. _20+?3 2 3$40
((sr <'a') fx) -: a =. 0 2 3$12
((sr <'a') fx) -: a =. 0$12

NB. floating point
((sr <'a') fx) -: a =. 3.4
((sr <'a') fx) -: a =. o._20+?3 2 3$40
((sr <'a') fx) -: a =. ^ 0.01*_2000+?3 2 3$4000
((sr <'a') fx) -: a =. 0 2 3$3.4
((sr <'a') fx) -: a =. 0$3.4

NB. complex
((sr <'a') fx) -: a =. 3j4
((sr <'a') fx) -: a =. r._200+?3 2 4$400
((sr <'a') fx) -: a =. 0 2 3$3j4
((sr <'a') fx) -: a =. 0$3j4

NB. boxed
((sr <'a') fx) -: a =. <3j4
((sr <'a') fx) -: a =. <<<<3j4
((sr <'a') fx) -: a =. 4 3$;:'Cogito, ergo sum.'
((sr <'a') fx) -: a =. 0 2 3$<4
((sr <'a') fx) -: a =. 0$<4

NB. boxed with key
((sr <'a') fx) -: a =. <!.3j4 'abcd'
((sr <'a') fx) -: a =. (?3 4$1e6) '':'<!.x. y.' " 1 0 o.?3 4$123
((sr <'a') fx) -: a =. 4 3$(<!._69 i.7),;:'Cogito, ergo sum.'
((sr <'a') fx) -: a =. 0 2 3$<!.4 ''
((sr <'a') fx) -: a =. 0$<!.'' 4

=/ ((sr <'f') fx) ` f =. +
=/ ((sr <'f') fx) ` f =. *
=/ ((sr <'f') fx) ` f =. +.
=/ ((sr <'f') fx) ` f =. +/
=/ ((sr <'f') fx) ` f =. +/\
=/ ((sr <'f') fx) ` f =. +/ . *
=/ ((sr <'f') fx) ` f =. +/ . *
=/ ((sr <'f') fx) ` f =. 3 & +
=/ ((sr <'f') fx) ` f =. e.&(i.3 4)
=/ ((sr <'f') fx) ` f =. +%
=/ ((sr <'f') fx) ` f =. +,*
=/ ((sr <'f') fx) ` f =. +,*
=/ ((sr <'f') fx) ` f =. + : *
=/ ((sr <'f') fx) ` f =. + : 'x.*y.'
=/ ((sr <'f') fx) ` f =. ('y.=.>:y.'; '>:y.') : *
=/ ((sr <'f') fx) ` f =. ('y.=.>:y.'; '>:y.') : 'x.*y.'

slash=./
(+/i.69) -: + ((sr <'slash') fx) i.69

f=. /.
g=. (sr <'f') fx
(ar <'f') -: ar <'g'

f=. :
g=. (sr <'f') fx
(ar <'f') -: ar <'g'

f=. &
g=. (sr <'f') fx
(ar <'f') -: ar <'g'

abc=.aaa=.'boustrophedonic'
t=.sr <'abc'
ex <'abc'
0 = nc <'abc'
aaa -: t fx
aaa -: abc

wd  =.;:'Cogito, ergo sum.'
sum =. +/
t =. sr <'wd'
x =. sr <'sum'
3 2 -: nc 'sum';'wd'
ex 'sum';'wd'
0 0 -: nc 'sum';'wd'
wd -: (x,t) fx
3 2 -: nc 'sum';'wd'
wd -: (x,'   ',t) fx

'abc' -:    '12cxyz 1 3 abc' fx
'abc' -: '   12cxyz 1 3 abc' fx
x. -: '11cx. 1 3 abc' fx
y. -: '11cy. 1 3 xyz' fx
