NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. !y ------------------------------------------------------------------

!'abc'                    NB. domain error
!<'abc'                   NB. domain error


NB. x!y -----------------------------------------------------------------

3.5  ! _5                 NB. domain error
_3.5 ! _5                 NB. domain error
'abc' ! 3 4 5             NB. domain error
'abc' !~3 4 5             NB. domain error
3 4 5 ! <'abc'            NB. domain error
3 4 5 !~<'abc'            NB. domain error

3 4 ! 4 5 6               NB. length error
3 4 !~4 5 6               NB. length error
