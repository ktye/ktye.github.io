NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. x$y -----------------------------------------------------------------

'abc'$'abc'               NB. domain error
3.5$'abc'                 NB. domain error
3j4$'abc'                 NB. domain error
(<5)$'abc'                NB. domain error
_3$'abc'                  NB. domain error

3 4$''                    NB. length error
3 4$i.0 1 2               NB. length error
