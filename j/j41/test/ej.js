NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. j. ------------------------------------------------------------------

j. 'abc'                  NB. domain error
j. <'abc'                 NB. domain error
'abc' j. 3                NB. domain error
'abc' j.~3                NB. domain error
4 j. <'abc'               NB. domain error
4 j.~<'abc'               NB. domain error

3 4 j. 5 6 7              NB. length error
3 4 j.~5 6 7              NB. length error
3 4 j. i.3 4              NB. length error
3 4 j.~i.3 4              NB. length error
