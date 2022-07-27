NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. A. ------------------------------------------------------------------

A. 'abcd'                 NB. domain error
A. 3 4;'abc'              NB. domain error
A. 3.4 5                  NB. domain error
A. 3j4 5                  NB. domain error

'ab' A. i.4               NB. domain error
3.5  A. i.4               NB. domain error
3j5  A. i.4               NB. domain error
(<5) A. i.4               NB. domain error

24   A. 'abcd'            NB. index error
_25  A. 'abcd'            NB. index error
