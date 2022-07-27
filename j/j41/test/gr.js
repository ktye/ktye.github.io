NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. r. ------------------------------------------------------------------

rdot =. ^@j. : (* ^@j.)

(r. -: rdot) 0.1*_500+?10 20$1000
(r. -: rdot) (?40$100)*^j.?40$100

a =. 0.1 * _500 + ?10 20$1000
b =. 0.1 * _500 + ?10 20$1000
a (r. -: rdot) b
(j.a) (r. -: rdot) j.b
(3 r. b ) -: 3*^0j1*b
(a r. _4) -: a*^0j1*_4

1e_8 > >./| c-[&.r. c=.(o._1)+0.01*?200$100*<.o.2
