NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. {y ------------------------------------------------------------------

{1 2 3; 'ab'              NB. domain error
{1 2 3;~'ab'              NB. domain error
{1 2 3; <<4 5             NB. domain error
{1 2 3;~<<4 5             NB. domain error
{'abc'; <<4 5             NB. domain error
{'abc';~<<4 5             NB. domain error


NB. x{y -----------------------------------------------------------------

3.5{i.12                  NB. domain error
'abc'{i.12                NB. domain error
(<3.5){i.12               NB. domain error
(<0;'abc'){i.3 4          NB. domain error
(<0;3.5){i.3 4            NB. domain error

(<0 2){i.12               NB. length error
(<0;2){i.12               NB. length error

2{a=.1=?2 3 4$2           NB. index error
_3{a                      NB. index error
(<0 _4 0){a               NB. index error
(<2 0){a                  NB. index error

2{a=.(?2 3 4$#a.){a.      NB. index error
_3{a                      NB. index error
(<0 _4 0){a               NB. index error
(<2 0){a                  NB. index error

2{a=.?2 3 4$333           NB. index error
_3{a                      NB. index error
(<0 _4 0){a               NB. index error
(<2 0){a                  NB. index error

2{a=.o.?2 3 4$333         NB. index error
_3{a                      NB. index error
(<0 _4 0){a               NB. index error
(<2 0){a                  NB. index error

2{a=.^0j1*?2 3 4$33       NB. index error
_3{a                      NB. index error
(<0 _4 0){a               NB. index error
(<2 0){a                  NB. index error

2{a=.2 3 4$3;'abc'        NB. index error
_3{a                      NB. index error
(<0 _4 0){a               NB. index error
(<2 0){a                  NB. index error


NB. x{y complementary indexing ------------------------------------------

(<<<'a'){i.12             NB. domain error
(<<<3.5){i.12             NB. domain error

(<0;<<_2){i.12            NB. length error

(<<<2){a=.1=?2 3 4$2      NB. index error
(<0;<<_4 2){a             NB. index error
(<<<2){a=.(?2 3 4$#a.){a. NB. index error
(<0;<<_4 2){a             NB. index error
(<<<2){a=.?2 3 4$1234     NB. index error
(<0;<<_4 2){a             NB. index error
(<<<2){a=.o.?2 3 4$124    NB. index error
(<0;<<_4 2){a             NB. index error
(<<<2){a=.r.?2 3 4$124    NB. index error
(<0;<<_4 2){a             NB. index error
(<<<2){a=.2 3 4$'Mary';4  NB. index error
(<0;<<_4 2){a             NB. index error
