NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. i.y -----------------------------------------------------------------

iota =. '+/&>{(}.*/\.|y.,1)*&.>((0>y.)*|>:y.)+&.>(*y.)*&.>i.&.>|y.' : ''

a =. i.?50
1 = $$a
0 = 0{a
_1 *./ . = 2-/\a
((#a)$(0{a)+_1{a) -: a+|.a

p =. i.q=._5+?10 10 10
($p) -: |q
p -: iota q


NB. x i.y ---------------------------------------------------------------

NB. Boolean
a=.1=?10 5$2
a-:(i.~a){a
(i.~a)-:i.~<"_1 a
a-:(a i.0+a){a
a-:(a i.[&.o.a){a
a-:(a i.[&.(0j1&*)a){a
0=a i.0{a
(#a)=a i.4
(#a)=a i.'ab'

NB. literal
a=.a.{~32+?10 5$95
a-:(i.~a){a
(i.~a)-:i.~<"_1 a
0=a i.0{a
(#a)=a i.4
(#a)=a i.4 5 6 7 8

NB. integer
a=.?10 5$100
a-:(i.~a){a
(i.~a)-:i.~<"_1 a
a-:(a i.[&.o.a){a
a-:(a i.[&.(0j1&*)a){a
0=a i.0{a
(#a)=a i.4
(#a)=a i.'abcde'

NB. floating point
a=.o._40+?10 5$100
a-:(i.~a){a
a-:(a i.[&.(0j1&*)a){a
(i.~a)-:i.~<"_1 a
0=a i.0{a
(#a)=a i.4
(#a)=a i.'abcde'

NB. complex
a=.r.?10 5$1000
a-:(i.~a){a
(i.~a)-:i.~<"_1 a
0=a i.0{a
(#a)=a i.4
(#a)=a i.'abcde'

NB. boxed
t=.(1=?70$3)<;.1 ?70$100
a=.t{~?10 5$#t
a-:(i.~a){a
(i.~a)-:i.~<"_1 a
0=a i.0{a
(#a)=a i.4
(#a)=a i.4 5 6 7 8
(20$0) -: i.~(?20$3){'';($0);(0$<'')
(20$0) -: i.~(?20$3){3 4;([&.o.3 4);[&.(0j1&*)3 4
((i.~x){x) -: x=.;:'i.~(?20$3){3 4;([&.o.3 4);[&.(0j1&*)3 4'


NB. x i.y encore --------------------------------------------------------

a =. 1=?100 4$2
j =. i.~a
j -: a i.0+a
j -: (0+a)i.a
a -: j{a
(#a)   -: a i.'ab'
(2$#a) -: a i.2 3$0

0         -: (i.6 2 3)i.i.2 3
6         -: (i.6 2 3)i.2 3$9
(6 2 3$6) -: (i.6 2 3)i.6 2 3 1 1$5

($0)      -: (6 2 3$9)i.0 2 3$5
(5 0 4$0) -: (6 2 3$9)i.5 0 4 2 3$5

0         -: (6 2 0$9)i.2 0$0
6         -: (6 2 0$9)i.0 2$0
(3$0)     -: (6 2 0$9)i.3 2 0$0
(3$0)     -: (6 2 0$0.5)i.3 2 0$'a'
(3$0)     -: (6 2 0$0.5)i.3 2 0$<''
(3$6)     -: (6 2 0$9)i.3 0 2$9

(($b)$0)  -: ''i.b=.'abc'
(($b)$0)  -: ($0)i.b=.i.3 4
(($b)$0)  -: (0$<'')i.b=.+&.>i.3 4
0 0       -: (i.0 3 4)i.b=.i.2 3 4


NB. x i.y for strings x and y -------------------------------------------

map  =. '(i.-#y.) (a.i.|.y.)}256$#y.' : ''
ciof =. a.&i.@] { map@[

f =. i. -: ciof

((?3000$256){a.) f (?4 80$256){a.
((?3000$256){a.) f (? 300$256){a.