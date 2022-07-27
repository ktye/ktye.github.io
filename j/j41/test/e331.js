NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. ;.n -----------------------------------------------------------------

[;.'2'                    NB. domain error
[;.4                      NB. domain error
+/;.3.4                   NB. domain error
<;.3j4                    NB. domain error

<;.1 2                    NB. rank error


NB. f;.0 ----------------------------------------------------------------

'abc'   [;.0 i.3 4        NB. domain error
(3;4 5) [;.0 i.3 4        NB. domain error
3j4 5j6 [;.0 i.3 4        NB. domain error


NB. f;.1 and f;._1 ------------------------------------------------------

1 0 0 <;.1 'abcde'        NB. length error
1 0 0 <;.1 'ab'           NB. length error
1 <;.1 'abcd'             NB. length error
1 0 0 1 <;.1 (4)          NB. length error

'abc' <;.1 i.3            NB. domain error
2 0 0 <;.1 'abc'          NB. domain error
3j4 1 1 <;._1 i.3         NB. domain error
(2;3 4) <;.1 'ab'         NB. domain error


NB. f;.1 and f;._1 ------------------------------------------------------

1 0 0 <;.2 'abcde'        NB. length error
1 0 0 <;.2 'ab'           NB. length error
1 <;.2 'abcd'             NB. length error
1 0 0 1 <;.2 (4)          NB. length error

'abc' <;.2 i.3            NB. domain error
2 0 0 <;.2 'abc'          NB. domain error
3j4 1 1 <;._2 i.3         NB. domain error
(2;3 4) <;.2 'ab'         NB. domain error
