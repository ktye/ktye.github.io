NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. >y ------------------------------------------------------------------

>(<'abc'),<12             NB. domain error
>(<'abc'),<<12            NB. domain error
>(<12),<<12               NB. domain error


NB. >!._ y --------------------------------------------------------------

>!._ (<5),<!.'ab' 12      NB. domain error
>!._ (<5),<!.(<'ab') 12   NB. domain error
>!._ (<!.'ab' 5),<!.(<'a') 12    NB. domain error


NB. x>y -----------------------------------------------------------------

'abc' >  3 4 5            NB. domain error
'abc' >~ 3 4 5            NB. domain error
'ab'  >  'cd'             NB. domain error
3     >  <3 4             NB. domain error
3     >~ <3 4             NB. domain error
3.4   > 1 2 3j4           NB. domain error
3.4   >~1 2 3j4           NB. domain error
3j4   > 1 2 3j4           NB. domain error
'abc' > 1 2 3j4           NB. domain error
'abc' >~1 2 3j4           NB. domain error
