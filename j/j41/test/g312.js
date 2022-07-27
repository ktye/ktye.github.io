NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. :: ------------------------------------------------------------------

f =. o. :: ('err'"0)

(o.y)         -: f y=._20+?4 5$50
(4 5 3$'err') -: f y=.(?4 5$256){a.

(1 o.y)       -: 1 f y=.0.1*_10+?4 5$20
(4 5 3$'err') -: 1 f y=.(?4 5$256){a.

g =. 3&+ :: ('err'"_)

(3+y) -: g y=._20+?4 5$50
'err' -: g y=.(?4 5$256){a.
