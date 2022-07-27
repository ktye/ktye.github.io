NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. m}y and u}y ---------------------------------------------------------

'a' } 2 3 4               NB. domain error
(<0)} 2 3 4               NB. domain error
2.1 } 2 3 4               NB. domain error
2j1 } 2 3 4               NB. domain error

3} 2 3 4                  NB. index error

2 3}i.4 3                 NB. length error
2 3}i.4 1                 NB. length error


NB. x m}y and x u}y -----------------------------------------------------

1     i.@#@]}'abc'        NB. domain error
(<'a')i.@#@]}'abc'        NB. domain error
'a'   i.@#@]}2 3 4        NB. domain error
(<12) i.@#@]}2 3 4        NB. domain error
1     i.@#@]}2;3 4        NB. domain error
'ab'  i.@#@]}2;3 4        NB. domain error

7  'a'} 2 3 4             NB. domain error
7 (<0)} 2 3 4             NB. domain error
7 (2.1)} 2 3 4            NB. domain error
7 (2j1)} 2 3 4            NB. domain error

7 (3)} 2 3 4              NB. index error

2 3 i.@#@]}i.3            NB. length error
(i.2 3) i.@$@]}i.4 3 2    NB. length error

(i.2 3 4)i.@#@]}i.3 4     NB. rank error
