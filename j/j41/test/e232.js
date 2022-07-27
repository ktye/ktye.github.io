NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. x|:y ----------------------------------------------------------------

'abc'   |: i.3 4          NB. domain error
(<'abc')|: i.3 4          NB. domain error
0.5     |: i.3 4          NB. domain error
(<0.5)  |: i.3 4          NB. domain error
3j4     |: i.3 4          NB. domain error
(<3j4)  |: i.3 4          NB. domain error
(<<0)   |: i.3 4          NB. domain error
(0;<<1) |: i.3 4          NB. domain error
(0;'a') |: i.3 4          NB. domain error

0 0     |: i.3 4          NB. index error
(<0 0)  |: i.3 4          NB. index error
2       |: i.3 4          NB. index error
(<2 2)  |: i.3 4          NB. index error
