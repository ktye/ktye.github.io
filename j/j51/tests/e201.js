NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. ^. ------------------------------------------------------------------

^. 'abc'                  NB. domain error
^.<'abc'                  NB. domain error

3 ^. 'abc'                NB. domain error
3 ^.~'abc'                NB. domain error
2 ^. 2;4 5                NB. domain error
2 ^.~2;4 5                NB. domain error

2 3 ^. 4 5 6              NB. length error
2 3 ^.~4 5 6              NB. length error
2 3 ^. i.4 5              NB. length error
2 3 ^.~i.4 5              NB. length error
