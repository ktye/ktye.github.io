NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. f/\y ----------------------------------------------------------------

< /\'abc'                 NB. domain error
<./\'abc'                 NB. domain error
<:/\'abc'                 NB. domain error
> /\'abc'                 NB. domain error
>./\'abc'                 NB. domain error
>:/\'abc'                 NB. domain error

+ /\'abc'                 NB. domain error
+./\'abc'                 NB. domain error
+:/\'abc'                 NB. domain error
* /\'abc'                 NB. domain error
*./\'abc'                 NB. domain error
*:/\'abc'                 NB. domain error
- /\'abc'                 NB. domain error
% /\'abc'                 NB. domain error
%:/\'abc'                 NB. domain error

^ /\'abc'                 NB. domain error
^./\'abc'                 NB. domain error
| /\'abc'                 NB. domain error
! /\'abc'                 NB. domain error
? /\'abc'                 NB. domain error

< /\2 3;'abc'             NB. domain error
<./\2 3;'abc'             NB. domain error
<:/\2 3;'abc'             NB. domain error
> /\2 3;'abc'             NB. domain error
>./\2 3;'abc'             NB. domain error
>:/\2 3;'abc'             NB. domain error

+ /\2 3;'abc'             NB. domain error
+./\2 3;'abc'             NB. domain error
+:/\2 3;'abc'             NB. domain error
* /\2 3;'abc'             NB. domain error
*./\2 3;'abc'             NB. domain error
*:/\2 3;'abc'             NB. domain error
- /\2 3;'abc'             NB. domain error
% /\2 3;'abc'             NB. domain error
%:/\2 3;'abc'             NB. domain error

^ /\2 3;'abc'             NB. domain error
^./\2 3;'abc'             NB. domain error
| /\2 3;'abc'             NB. domain error
! /\2 3;'abc'             NB. domain error
? /\2 3;'abc'             NB. domain error


NB. x f\y ---------------------------------------------------------------

'a' <\ i.12               NB. domain error
3.5 <\ i.12               NB. domain error
3j4 <\ i.12               NB. domain error
(<9)<\ i.12               NB. domain error
