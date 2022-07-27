NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. %. ------------------------------------------------------------------

%. 4 4$'abc'              NB. domain error
%. 4 4$<123               NB. domain error
'abcd' %. ?4 4$100        NB. domain error

%. ?3 5$123               NB. length error
3 4 5 %. ?7 4$100         NB. length error
