NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. o.y -----------------------------------------------------------------

o. 'Opposable Thumbs'     NB. domain error
o. ;:'sui generis'        NB. domain error
o. <!.2 i.2 3             NB. domain error


NB. x o.y ---------------------------------------------------------------

'a' o. 3.4                NB. domain error
3.5 o. 3.4                NB. domain error
3j5 o. 3.4                NB. domain error
(<4) o. 3.4               NB. domain error
17 o. 2                   NB. domain error
_17 o. 2                  NB. domain error

1 o. 'abc'                NB. domain error
1 o. <'abc'               NB. domain error

2 3 o. 0.5 0.4 0.3        NB. length error
