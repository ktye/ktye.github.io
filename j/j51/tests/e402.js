NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. #:y -----------------------------------------------------------------

#:'abc'                   NB. domain error
#:123;45 6                NB. domain error


NB. x#:y ----------------------------------------------------------------

2 3 4#:'abc'              NB. domain error
4 3 2#:123;45 6           NB. domain error
'abc'#: 7                 NB. domain error
(123;4 5 6)#:_12          NB. domain error
