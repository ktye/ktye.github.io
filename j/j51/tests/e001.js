NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. =. and =: -----------------------------------------------------------

2 3         =. 9          NB. domain error
3.5         =. 9          NB. domain error
3j4         =. 9          NB. domain error
_abc        =. 9          NB. ill-formed number
'p+9'       =. 9          NB. ill-formed name
' '         =. 9          NB. ill-formed name
'3ab'       =. 9          NB. ill-formed name
' ab'       =. 9          NB. ill-formed name

('p';2 3  ) =. 9          NB. domain error
('p';3.5  ) =. 9          NB. domain error
('p';3j4  ) =. 9          NB. domain error
('p';'p+9') =. 9          NB. ill-formed name
('p';' '  ) =. 9          NB. ill-formed name
('p';''   ) =. 9          NB. ill-formed name
('p';'3ab') =. 9          NB. ill-formed name
('p';'_ab') =. 9          NB. ill-formed name

(<3 4$'a')    =. i.3 4    NB. rank error
('p';3 4$'a') =. 9        NB. rank error

'pqr'         =. 4 5      NB. length error
('p';'q';'r') =. 4 5      NB. length error
