NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 4!:0 ----------------------------------------------------------------

nc =. 4!:0

'abc' nc 3                NB. domain error


NB. 4!:1 ----------------------------------------------------------------

nl =. 4!:1

nl 'abc'                  NB. domain error
nl 2 3j4                  NB. domain error
nl 1 1.5                  NB. domain error
nl <1 2                   NB. domain error

2 3      nl 3             NB. domain error
2.5      nl 3             NB. domain error
3j54     nl 3             NB. domain error
(<'abc') nl 3             NB. domain error


NB. 4!:55 ---------------------------------------------------------------

ex =. 4!:55

ex 'abc'                  NB. domain error
ex 1                      NB. domain error
ex 1 2                    NB. domain error
ex 3 3.5                  NB. domain error
ex 3j4                    NB. domain error
ex 'a';1                  NB. domain error
ex 'a';1 2                NB. domain error
ex 'a';3 3.5              NB. domain error
ex 'a';3j4                NB. domain error
ex <<'ab'                 NB. domain error

ex <3 4$'a'               NB. rank error
