NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. b. ------------------------------------------------------------------

'b' b.                    NB. domain error
16  b.                    NB. index error
_17 b.                    NB. index error
3.4 b.                    NB. domain error
3j4 b.                    NB. domain error
(<1)b.                    NB. domain error

f =. (?16) b.

'a' f 1                   NB. domain error
2   f 1                   NB. domain error
3.4 f 1                   NB. domain error
3j4 f 1                   NB. domain error
(<1)f 1                   NB. domain error

f 'a'                     NB. domain error
f 2                       NB. domain error
f 3.4                     NB. domain error
f 3j4                     NB. domain error
f<1                       NB. domain error
