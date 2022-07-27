NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. +/ .* ---------------------------------------------------------------

(3 4$0)   +/ .* 4 5$'c'   NB. domain error
(3 4$'a') +/ .* 4 5$'c'   NB. domain error
(3 4$4)   +/ .* 4 5$'c'   NB. domain error
(3 4$4.5) +/ .* 4 5$'c'   NB. domain error
(3 4$4j5) +/ .* 4 5$'c'   NB. domain error

(3 4$'a') +/ .* 4 5$0     NB. domain error
(3 4$'a') +/ .* 4 5$'a'   NB. domain error
(3 4$'a') +/ .* 4 5$4     NB. domain error
(3 4$'a') +/ .* 4 5$4.5   NB. domain error
(3 4$'a') +/ .* 4 5$4j5   NB. domain error

(i.3 4)   +/ .* 5$6       NB. length error
(3 4$5.6) +/ .* i.3 4     NB. length error
(3 4$5)   +/ .* ,1        NB. length error
(3 4$5)   +/ .* i.1 4     NB. length error
(3 4$5)   +/ .* i.1 0 4   NB. length error
(3 4$5)   +/ .* i.0 4     NB. length error
(3 4$5)   +/ .* i.0       NB. length error

(i.0)     +/ .* i.3 4     NB. length error
(i.0)     +/ .* 3 4 5     NB. length error
(i.0)     +/ .* i.3 4 0   NB. length error
(i.0)     +/ .* ,3j4      NB. length error
(i.3 4 0) +/ .* i.3 4     NB. length error

(i.1)     +/ .* i.3 4     NB. length error
(i.1)     +/ .* 3 4 5     NB. length error
(i.1)     +/ .* i.3 4 0   NB. length error
(i.3 4 1) +/ .* i.3 4     NB. length error
(i.3 4 1) +/ .* i.3 0 0   NB. length error
