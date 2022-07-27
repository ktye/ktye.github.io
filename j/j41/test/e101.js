NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. +.y -----------------------------------------------------------------

+. 'abc'                  NB. domain error
+.<'abc'                  NB. domain error
+.<!.2 (3 4 5)            NB. domain error


NB. x+.y ----------------------------------------------------------------

'abc' +. 4                NB. domain error
'abc' +.~4                NB. domain error
4 +. <'abc'               NB. domain error
4 +.~<'abc'               NB. domain error
'j' +. <'abc'             NB. domain error
'j' +.~<'abc'             NB. domain error

0 1 +. 0 1 0              NB. length error
0 1 +.~5 6 7              NB. length error
0 1 +. i.5 6              NB. length error
0 1 +.~i.5 6              NB. length error
0 1 1 +. ?4 3$2           NB. length error
3 4 5 +.~?4 3$2           NB. length error
