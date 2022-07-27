NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. <: ------------------------------------------------------------------

<: 'abc'                  NB. domain error
<: <'abc'                 NB. domain error

'abc' <: 3 4 5            NB. domain error
'abc' <:~3 4 5            NB. domain error
3j4   <: 3 4 5            NB. domain error
3j4   <:~3 4 5            NB. domain error
(<34) <: 3 4 5            NB. domain error
(<34) <:~3 4 5            NB. domain error

3 4 <: 5 6 7              NB. length error
3 4 <:~5 6 7              NB. length error
(i.3 4) <: i.5 4          NB. length error
(i.3 4) <:~i.5 4          NB. length error
