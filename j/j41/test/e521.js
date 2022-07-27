NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. {.y -----------------------------------------------------------------

{.0 3$1                   NB. index error
{.0 3$'a'                 NB. index error
{.0 3$12345               NB. index error
{.0 3$123.45              NB. index error
{.0 3$123j45              NB. index error
{.0 3$<45                 NB. index error


NB. x{.y ----------------------------------------------------------------

'abc'     {.i.2 3 4       NB. domain error
3.4 5     {.i.2 3 4       NB. domain error
3j4       {.i.2 3 4       NB. domain error
(3;4)     {.i.2 3 4       NB. domain error
(<!.8 'a'){.i.2 3 4       NB. domain error

3 4 5{.  1 2              NB. length error
3 4 5{.i.1 2              NB. length error


NB. x{.!.f y ------------------------------------------------------------

45{.!.0     'abc'         NB. domain error
45{.!.0     +&.>i.3 4     NB. domain error
45{.!.1     <!.9 i.3 4    NB. domain error

4 5{.!.'a'  0             NB. domain error
4 5{.!.'a'  i.3 4         NB. domain error
4 5{.!.'a'  o.i.2 8       NB. domain error
4 5{.!.'a'  r.i.2 8       NB. domain error
4 5{.!.'a'  +&.>i.3 4     NB. domain error
4 5{.!.'a'  <!.9 i.3 4    NB. domain error

45{.!.5     'abc'         NB. domain error
45{.!._6    +&.>i.3 4     NB. domain error
45{.!.121   <!.9 i.3 4    NB. domain error

45{.!.3.5   'abc'         NB. domain error
45{.!._6.89 +&.>i.3 4     NB. domain error
45{.!.1.21  <!.9 i.3 4    NB. domain error

45{.!.3j5   'abc'         NB. domain error
45{.!._6j89 +&.>i.3 4     NB. domain error
45{.!.1j21  <!.9 i.3 4    NB. domain error
