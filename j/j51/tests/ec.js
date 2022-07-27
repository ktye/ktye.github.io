NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. C. ------------------------------------------------------------------

C. 'abcde'                NB. domain error
C. 3j4 5                  NB. domain error
C. 3 4;'abc'              NB. domain error

0 1 24  C. i.4            NB. index error
0 1 _24 C. i.4            NB. index error

3 4j5   C. i.4            NB. domain error
'abc'   C. i.4            NB. domain error
3 4;'a' C. i.4            NB. domain error
