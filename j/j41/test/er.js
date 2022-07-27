NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. r.y. ----------------------------------------------------------------

r. 'abc'                  NB. domain error
r. <'abc'                 NB. domain error


NB. x.r.y. --------------------------------------------------------------

'abc' r. 3                NB. domain error
'abc' r.~3                NB. domain error
4 r. <'abc'               NB. domain error
4 r.~<'abc'               NB. domain error

3 4 r. 5 6 7              NB. length error
3 4 r.~5 6 7              NB. length error
3 4 r. i.3 4              NB. length error
3 4 r.~i.3 4              NB. length error
