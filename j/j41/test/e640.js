NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. ?y ------------------------------------------------------------------

? 0 0                     NB. domain error
?'abc'                    NB. domain error
?2 3 _4                   NB. domain error
?2 3.4 5                  NB. domain error
?2 3j4 5                  NB. domain error
?2 3;4 5                  NB. domain error


NB. x?y -----------------------------------------------------------------

2? 1                      NB. domain error
4? 0                      NB. domain error
4? 3                      NB. domain error
3? 'abc'                  NB. domain error
3?~'abc'                  NB. domain error
1? 2 3 _4                 NB. domain error
5?~2 3 _4                 NB. domain error
2? 2 3.4 5                NB. domain error
5?~2 3.4 5                NB. domain error
2? 2 3j4 5                NB. domain error
5?~2 3j4 5                NB. domain error
2? 2 3;4 5                NB. domain error
2?~2 3;4 5                NB. domain error

2 3 ? 4 5 6               NB. length error
