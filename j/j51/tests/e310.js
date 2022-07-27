NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. : -------------------------------------------------------------------

0     : 'x.'              NB. domain error
2     : 'x.'              NB. domain error
3.5   : 'x.'              NB. domain error
3j4   : 'x.'              NB. domain error
1 2   : 'x.'              NB. domain error
(,:1) : 'x.'              NB. domain error

'y.' : 0                  NB. domain error
'y.' : 3                  NB. domain error
'y.' : 3.5                NB. domain error
'y.' : 3j4                NB. domain error

(2 3 4$'a') : 'x.'        NB. rank error
(2 3$<'a')  : 'x.'        NB. rank error
'y.'        : 3 4         NB. rank error
'y.'        : (2 3 4$'a') NB. rank error
'y.'        : (2 3$<'a')  NB. rank error

f =. ''   : ''
g =. ($0) : ($0)
f 4                       NB. domain error
3 f 4                     NB. domain error
g 4                       NB. domain error
3 g 4                     NB. domain error


NB. : monadic-only fns --------------------------------------------------

f =. '' : +
f\0 1 0                   NB. domain error
f;._1 (0 1 0)             NB. domain error
f/. 0 1 0                 NB. domain error
0 1 ,&f 1 0               NB. domain error
0 1 f@* 1 0               NB. domain error
(- * f) 1 0               NB. domain error
(+ f) 1 0                 NB. domain error

~./0 1 0                  NB. domain error
0 1 ~./ 1 0               NB. domain error
0 1 ~.&* 1 0              NB. domain error
0 1 *@~. 1 0              NB. domain error
(+ ~. -) 1 0              NB. domain error
(~. -) 1 0                NB. domain error

f1 =. + : ''
g1 =. + : ($0)
f2 =. ''   : +
g2 =. ($0) : +
3 f1 4                    NB. domain error
3 g1 4                    NB. domain error
f2 4                      NB. domain error
g2 4                      NB. domain error


NB. : labels ------------------------------------------------------------

'1 2 3)4 5':'' 5          NB. syntax error
'+)4 5':'' 5              NB. syntax error
'))':'' 5                 NB. syntax error

4 '':'+)4 5' 5            NB. syntax error
4 '':'1 2 3)4 5' 5        NB. syntax error
4 '':'))' 5               NB. syntax error

'a b)':'' 5               NB. syntax error
4 '':'a b)' 5             NB. syntax error
