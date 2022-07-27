NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. f. ------------------------------------------------------------------

ar =. 5!:1

mat =. ?3 4$1e5
mat -: 'mat' f.

slash =. /
plus  =. +
v     =. plus slash
f     =. 'v' f.
g     =. +/
(ar<'f') -: ar<'g'
(+/y)    -: 'v' f. y=._1e7+?12$2e7

each =. &.>
f    =. 'each' f.
g    =. &.>
(ar<'f') -: ar<'g'
(|.&.>y) -: |. 'each' f. y=.;:'Cogito, ergo sum.'

slash =. /
ip    =. slash @ ("1 _)
f     =. 'ip' f.
g     =. / @ ("1 _)
(ar<'f')  -: ar<'g'
(a+/ .*b) -: a +'ip' f.*b [ a=.?3 4$1e5 [ b=.?4 5 6$1e5
