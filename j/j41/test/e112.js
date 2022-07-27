NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. *:y -----------------------------------------------------------------

*: 'abc'                  NB. domain error
*: 3;4 5                  NB. domain error
*: <!.0?7$2               NB. domain error


NB. x*:y ----------------------------------------------------------------

0 1 *: 'ab'               NB. domain error
0 1 *:~'ab'               NB. domain error
0 1 *: 2                  NB. domain error
0 1 *:~2                  NB. domain error
0 1 *: 3.4  0             NB. domain error
0 1 *:~3.4  0             NB. domain error
0 1 *: 0j1  1             NB. domain error
0 1 *:~0j1  1             NB. domain error
1   *: <'asfd'            NB. domain error
1   *:~<'asfd'            NB. domain error

0 1 *: 0 1 0              NB. length error
0 1 *:~0 1 0              NB. length error
0 1 0 *: ?4 3$2           NB. length error
0 1 0 *:~?4 3$2           NB. length error
