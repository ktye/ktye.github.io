NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. +y ------------------------------------------------------------------

t -: +t=.1=?100$2
t -: +t=.  _1e9+?100$2e9
t -: +t=.o.1e_9+?100$2e9

f    =. |@*~ % ]
test =. f -: +
test j./_1e9+?2 100$2e9
test r./_1e9+?2 100$2e9
test 0 3j4

3j_4 -: +3j4


NB. x+y -----------------------------------------------------------------

type =.3!:0

4 = type 1234+5678
4 = type _1234+_5678
4 = type 2e9
8 = type 2e9+3e8
4 = type _2e9
8 = type _2e9+_3e8
4 = type 2147483647
8 = type 2147483647+1

( 2e8*>:i.20) -: +/\20$ 2e8
(_2e8*>:i.20) -: +/\20$_2e8

4 -: 2 + 2
3 -: 7 + _4

2147483648  -:  1+ 2147483647
_2147483649 -: _1+_2147483648

t -: 3+t=.i.?7$2
t -: (t=.i.?7$2)+4
t -: (i.3 4)+t=.i.3 4,?7$2
t -: (t=.i.3 4,?7$2)+i.3 4


NB. complex numbers -----------------------------------------------------

type =.3!:0

16 -: type 3j4 5j6

(2 3$1 0) -: =3j4 5j6 3j4
1 0 1 -: 3j4 = 3j4 3j_4 3j4
a=.3j4
3j4 -: a
b=:3j4
3j4 -: b

(3j4;5j6;7j8) -: (<3j4),(<5j6),<7j8
0 0j1 1 1 -: <. 0.2j0.2 0.2j0.8 0.8j0.2 0.8j0.8
2j4 -: <:3j4

3j4 -: ><3j4
(<.&.-t) -: >.t=.0.2j0.2 0.2j0.8 0.8j0.2 0.8j0.8
4j4 -: >:3j4

4 -: #3j4 _ __ _.
_ -: _: 3j4
_ -: 3j4 _: 5
_ -: 3j4 _: 5j6

3j_4 -: +3j4
8j10 -: 3j4+5j6
3 4 -: +.3j4
1j1 -: 5j11 +. 3j7