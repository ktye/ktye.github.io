NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. x":y ----------------------------------------------------------------

9.2  ": '3 4'             NB. domain error
9.2  ": <123              NB. domain error
'ab' ": 4 5               NB. domain error
1j2  ": 4 5               NB. domain error
(<21)": 4 5               NB. domain error

1 2  ": 4 5 6             NB. length error

9999.5 ": 4 5 6           NB. limit error
_9999.5 ": 4 5 6          NB. limit error
( ^25)  ": 4 5 6          NB. limit error
(-^25)  ": 4 5 6          NB. limit error
( ^99)  ": 4 5 6          NB. limit error
(-^99)  ": 4 5 6          NB. limit error
( 1e99) ": 4 5 6          NB. limit error
(_1e99) ": 4 5 6          NB. limit error
