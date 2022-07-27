NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. x%y -----------------------------------------------------------------

% 'abc'                   NB. domain error
% ;:'Opposable Thumbs'    NB. domain error
% <!.0?2 3                NB. domain error


NB. x%y -----------------------------------------------------------------

'abc' % 4                 NB. domain error
'abc' %~4                 NB. domain error
4 % <'abc'                NB. domain error
4 %~<'abc'                NB. domain error

3 4 % 5 6 7               NB. length error
3 4 %~5 6 7               NB. length error
3 4 % i.5 6               NB. length error
3 4 %~i.5 6               NB. length error
3 4 % ?4 2$183164         NB. length error
3 4 %~?4 2$183164         NB. length error
