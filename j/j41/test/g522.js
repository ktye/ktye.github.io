NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. {:y -----------------------------------------------------------------

tail =. _1&{

NB. Boolean
(tail -: {:) 1=?2
(tail -: {:) 1=?4$2
(tail -: {:) 1=?3 4$2
(tail -: {:) 1=?2 3 4$2

NB. literal
(tail -: {:) 'a'
(tail -: {:) a.{~?4$256
(tail -: {:) a.{~?3 4$256
(tail -: {:) a.{~?2 3 4$256

NB. integer
(tail -: {:) 12345
(tail -: {:) ?4$123456
(tail -: {:) ?3 4$123456
(tail -: {:) ?2 3 4$123456

NB. floating point
(tail -: {:) 123.45
(tail -: {:) o.?4$1236
(tail -: {:) o.?3 4$1256
(tail -: {:) o.?2 3 4$1456

NB. complex
(tail -: {:) 123j45
(tail -: {:) ^0j1*?4$1236
(tail -: {:) ^0j1*?3 4$1256
(tail -: {:) ^0j1*?2 3 4$1456

NB. boxed
t=.(+&.>i.5),;:'(tail -: {:) ^0j1*?3 4$1256'
(tail -: {:) <123j45
(tail -: {:) t{~?4$#t
(tail -: {:) t{~?3 4$#t
(tail -: {:) t{~?2 3 4$#t
