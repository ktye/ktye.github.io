NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. e.y -----------------------------------------------------------------

y =. 'abc';'dc';'a'
(e.y) -: 1 1 1 0 1 1,0 0 1 1 1 0,:1 0 0 0 0 1

x =. 1 0 0 1 0 1 (<;.1) 3#"1,.'abcdca'
(e.x) -: e.y

(e.'') -: i.0 0


NB. x e.y ---------------------------------------------------------------

1 0 0 -: 'foo' e.'f'
0 0 0 -: 'foo' e.'x'
0 0 0 -: 'foo' e.4
1 0 0 -: 1 0 0 e.1
1 0 0 -: 2 1 4 e.2
1 0 0 -: (o.3 1 2)e.o.3


NB. x E.y ---------------------------------------------------------------

1 0 1 0 0 -: 'co' E. 'cocoa'
1 1 1 1 0 -: 'aa' E. 5$'a'
1 0 0 0 0 -: E.~ 'abcde'
0 0 0 0 0 -: 'xy' E. 'asfdd'

(($j)$0)  -: (a.{~j,j) E. a.{~j=.?(?100)$256
(($j)$0)  -: (a.{~j,j) E. a.{~j=.?(?100)$256
(($j)$0)  -: (a.{~j,j) E. a.{~j=.?(?100)$256
(($j)$0)  -: (a.{~j,j) E. a.{~j=.?(?100)$256
(($j)$0)  -: (a.{~j,j) E. a.{~j=.?(?100)$256

((m*n)$n{.1) *./ . <: s E. (m*n)$s=.a.{~?n$256 [ m=.?20 [ n=.?20
((m*n)$n{.1) *./ . <: s E. (m*n)$s=.a.{~?n$256 [ m=.?20 [ n=.?20
((m*n)$n{.1) *./ . <: s E. (m*n)$s=.a.{~?n$256 [ m=.?20 [ n=.?20
((m*n)$n{.1) *./ . <: s E. (m*n)$s=.a.{~?n$256 [ m=.?20 [ n=.?20
((m*n)$n{.1) *./ . <: s E. (m*n)$s=.a.{~?n$256 [ m=.?20 [ n=.?20