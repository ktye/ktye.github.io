NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. *y ------------------------------------------------------------------

qct  =. 2^_44
sgn  =. (%|) * >:!.0&qct@|
test =. sgn -: *

test 1=?2 5$2
test _20+?13$40
test o._20+?5 3$40
test ^0j1*_20+?3 5$40

s=._1 0 1

test s*  qct
test s*+:qct
test s*-:qct

test 0j1*s*  qct
test 0j1*s*+:qct
test 0j1*s*-:qct

s -: *!.0 s*qct

t -: * t=.1=i.0 0
t -: * t=.0j1*i.0 5

dr  =. 5!:2
rk  =. '>2{ dr <''f'' [. f=.+"x.' : 1

_ 0 0 -: * rk


NB. x*y -----------------------------------------------------------------

type =. 3!:0

4 = type 1234*5678
4 = type 1234*_5678
8 = type 123456*123456
8 = type 123456*_123456

(10^>:i.20)           -: */\20$10
((20$_1 1)*10^>:i.20) -: */\20$_10
