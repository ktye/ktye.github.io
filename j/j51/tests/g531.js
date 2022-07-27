NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. }.y -----------------------------------------------------------------

behead =. 1&}.

NB. Boolean
(behead -: }.) 1=?2
(behead -: }.) 1=?4$2
(behead -: }.) 1=?3 4$2
(behead -: }.) 1=?2 3 4$2
(behead -: }.) 1=?0 3$2

NB. literal
(behead -: }.) 'a'
(behead -: }.) a.{~?4$256
(behead -: }.) a.{~?3 4$256
(behead -: }.) a.{~?2 3 4$256
(behead -: }.) 1=?0 3$256

NB. integer
(behead -: }.) 12345
(behead -: }.) ?4$123456
(behead -: }.) ?3 4$123456
(behead -: }.) ?2 3 4$123456
(behead -: }.) ?0 3$123456

NB. (behead -: }.)loating point
(behead -: }.) 123.45
(behead -: }.) o.?4$1236
(behead -: }.) o.?3 4$1256
(behead -: }.) o.?2 3 4$1456
(behead -: }.) 0 3$123.456

NB. complex
(behead -: }.) 123j45
(behead -: }.) ^0j1*?4$1236
(behead -: }.) ^0j1*?3 4$1256
(behead -: }.) ^0j1*?2 3 4$1456
(behead -: }.) 0 3$123j56

NB. boxed
t=.(+&.>i.5),;:'(raze a) -: }. a=. ^0j1*?3 4$1256'
(behead -: }.) <123j45
(behead -: }.) t{~?4$#t
(behead -: }.) t{~?3 4$#t
(behead -: }.) t{~?2 3 4$#t
(behead -: }.) 0 3$<123456


NB. x}.y ----------------------------------------------------------------

pi   =. 0&< @[ * 0&<.@-
ni   =. 0&>:@[ * 0&>.@+
di   =. ({.~ #@$) (pi + ni) $@]
drop =. (di {. ])"1 _

m=.?4 5 6$100
0  (}. -: drop) m
1  (}. -: drop) m
_1 (}. -: drop) m
2 0 _1 (}. -: drop) m
0 0 9  (}. -: drop) m
_9 _9 _9 (}. -: drop) m
