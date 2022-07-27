NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. ;y ------------------------------------------------------------------

;  1 2; 'abc'             NB. domain error
;  1 2;~'abc'             NB. domain error
;  1 2; <<'abc'           NB. domain error
;  1 2;~<<'abc'           NB. domain error
; 'ab'; <<'a'             NB. domain error
; 'ab';~<<'a'             NB. domain error


NB. x;y -----------------------------------------------------------------

>'abc'; 2 3 4             NB. domain error
>'abc';~2 3 4             NB. domain error
>'abc'; 2;3;4             NB. domain error
>'abc';~2;3;4             NB. domain error
>2 3 4; 2;3;'1234'        NB. domain error
>2 3 4;~2;3;'1234'        NB. domain error
