NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. #y ------------------------------------------------------------------

tally =. {.@(,&1)@$
f     =. # -: tally

0 -: #''
0 -: #$0

1 -: #0
1 -: #'a'
1 -: #4
1 -: #3.5
1 -: #123j_45
1 -: #<'abc'

NB. Boolean
f (?5$4)$0
0 -: #0 5$0

NB. literal
f (?5$4)$'abc'
0 -: #0 5$'abc'

NB. integer
f (?5$4)$34
0 -: #0 5$34

NB. floating point
f (?5$4)$3.14
0 -: #0 5$3.14

NB. complex
f (?5$4)$3j4
0 -: #0 5$3j4

NB. boxed
f (?5$4)$<'asdf'
0 -: #0 5$<'asdf'


NB. x#y -----------------------------------------------------------------

copy =. ; @ (<@($ ,:)"_1)
f    =. # -: copy

3 f 'a'
3 f 'abcd'
1 2 3 4 f 'a'
1 2 3 4 f 'abcd'

0 f 12
0 f 21 13 14 15
0 0 0 0 f 12
0 0 0 0 f 21 13 14 15

m=.o.?4 5$100
3 f m
1 2 0 3 f m
0 2 3 0 f m
