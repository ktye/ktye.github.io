NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. handling -0 (-0 on some systems) ------------------------------------

z =. _1e_307 0 1e_307 % 1e307

NB. The internal representation of z reveals that it is  -0, 0, 0

1 1 1 -: 0=z
1 1 1 -: z=0
(3 3$1) -: =/~ z
(3 3$1) -: =!.0/~ z
0 0 0 -: z
0 0 0 -: i.~ z
1 1 1 -: z e. 0
'' -: z -. 0


NB. 0: to 9: ------------------------------------------------------------

0 -: 0: 1=?2 3 4$2
0 -: 0: a.{~? 10##a.
0 -: 0: _20+?3 2$40
0 -: 0: o. _20+?13$40
0 -: 0: r.?13$40

0 -: (1=?2 3 4$2   ) 0: 1=?2 3 4$2
0 -: (1=?2 3 4$2   ) 0: a.{~? 10##a.
0 -: (1=?2 3 4$2   ) 0: _20+?3 2$40
0 -: (1=?2 3 4$2   ) 0: o. _20+?13$40
0 -: (1=?2 3 4$2   ) 0: r.?13$40

0 -: (a.{~? 10##a. ) 0: 1=?2 3 4$2
0 -: (a.{~? 10##a. ) 0: a.{~? 10##a.
0 -: (a.{~? 10##a. ) 0: _20+?3 2$40
0 -: (a.{~? 10##a. ) 0: o. _20+?13$40
0 -: (a.{~? 10##a. ) 0: r.?13$40

0 -: (_20+?3 2$40  ) 0: 1=?2 3 4$2
0 -: (_20+?3 2$40  ) 0: a.{~? 10##a.
0 -: (_20+?3 2$40  ) 0: _20+?3 2$40
0 -: (_20+?3 2$40  ) 0: o. _20+?13$40
0 -: (_20+?3 2$40  ) 0: r.?13$40

0 -: (o. _20+?13$40) 0: 1=?2 3 4$2
0 -: (o. _20+?13$40) 0: a.{~? 10##a.
0 -: (o. _20+?13$40) 0: _20+?3 2$40
0 -: (o. _20+?13$40) 0: o. _20+?13$40
0 -: (o. _20+?13$40) 0: r.?13$40

0 -: (r.?13$40     ) 0: 1=?2 3 4$2
0 -: (r.?13$40     ) 0: a.{~? 10##a.
0 -: (r.?13$40     ) 0: _20+?3 2$40
0 -: (r.?13$40     ) 0: o. _20+?13$40
0 -: (r.?13$40     ) 0: r.?13$40

1 -: 1: 1=?2 3 4$2
1 -: 1: a.{~? 10##a.
1 -: 1: _20+?3 2$40
1 -: 1: o. _20+?13$40
1 -: 1: r.?13$40

1 -: (1=?2 3 4$2   ) 1: 1=?2 3 4$2
1 -: (1=?2 3 4$2   ) 1: a.{~? 10##a.
1 -: (1=?2 3 4$2   ) 1: _20+?3 2$40
1 -: (1=?2 3 4$2   ) 1: o. _20+?13$40
1 -: (1=?2 3 4$2   ) 1: r.?13$40

1 -: (a.{~? 10##a. ) 1: 1=?2 3 4$2
1 -: (a.{~? 10##a. ) 1: a.{~? 10##a.
1 -: (a.{~? 10##a. ) 1: _20+?3 2$40
1 -: (a.{~? 10##a. ) 1: o. _20+?13$40
1 -: (a.{~? 10##a. ) 1: r.?13$40

1 -: (_20+?3 2$40  ) 1: 1=?2 3 4$2
1 -: (_20+?3 2$40  ) 1: a.{~? 10##a.
1 -: (_20+?3 2$40  ) 1: _20+?3 2$40
1 -: (_20+?3 2$40  ) 1: o. _20+?13$40
1 -: (_20+?3 2$40  ) 1: r.?13$40

1 -: (o. _20+?13$40) 1: 1=?2 3 4$2
1 -: (o. _20+?13$40) 1: a.{~? 10##a.
1 -: (o. _20+?13$40) 1: _20+?3 2$40
1 -: (o. _20+?13$40) 1: o. _20+?13$40
1 -: (o. _20+?13$40) 1: r.?13$40

1 -: (r.?13$40     ) 1: 1=?2 3 4$2
1 -: (r.?13$40     ) 1: a.{~? 10##a.
1 -: (r.?13$40     ) 1: _20+?3 2$40
1 -: (r.?13$40     ) 1: o. _20+?13$40
1 -: (r.?13$40     ) 1: r.?13$40

2 -: 2: 1=?2 3 4$2
2 -: 2: a.{~? 10##a.
2 -: 2: _20+?3 2$40
2 -: 2: o. _20+?13$40
2 -: 2: r.?13$40

2 -: (1=?2 3 4$2   ) 2: 1=?2 3 4$2
2 -: (1=?2 3 4$2   ) 2: a.{~? 10##a.
2 -: (1=?2 3 4$2   ) 2: _20+?3 2$40
2 -: (1=?2 3 4$2   ) 2: o. _20+?13$40
2 -: (1=?2 3 4$2   ) 2: r.?13$40

2 -: (a.{~? 10##a. ) 2: 1=?2 3 4$2
2 -: (a.{~? 10##a. ) 2: a.{~? 10##a.
2 -: (a.{~? 10##a. ) 2: _20+?3 2$40
2 -: (a.{~? 10##a. ) 2: o. _20+?13$40
2 -: (a.{~? 10##a. ) 2: r.?13$40

2 -: (_20+?3 2$40  ) 2: 1=?2 3 4$2
2 -: (_20+?3 2$40  ) 2: a.{~? 10##a.
2 -: (_20+?3 2$40  ) 2: _20+?3 2$40
2 -: (_20+?3 2$40  ) 2: o. _20+?13$40
2 -: (_20+?3 2$40  ) 2: r.?13$40

2 -: (o. _20+?13$40) 2: 1=?2 3 4$2
2 -: (o. _20+?13$40) 2: a.{~? 10##a.
2 -: (o. _20+?13$40) 2: _20+?3 2$40
2 -: (o. _20+?13$40) 2: o. _20+?13$40
2 -: (o. _20+?13$40) 2: r.?13$40

2 -: (r.?13$40     ) 2: 1=?2 3 4$2
2 -: (r.?13$40     ) 2: a.{~? 10##a.
2 -: (r.?13$40     ) 2: _20+?3 2$40
2 -: (r.?13$40     ) 2: o. _20+?13$40
2 -: (r.?13$40     ) 2: r.?13$40

9 -: 9: 1=?2 3 4$2
9 -: 9: a.{~? 10##a.
9 -: 9: _20+?3 2$40
9 -: 9: o. _20+?13$40
9 -: 9: r.?13$40

9 -: (1=?2 3 4$2   ) 9: 1=?2 3 4$2
9 -: (1=?2 3 4$2   ) 9: a.{~? 10##a.
9 -: (1=?2 3 4$2   ) 9: _20+?3 2$40
9 -: (1=?2 3 4$2   ) 9: o. _20+?13$40
9 -: (1=?2 3 4$2   ) 9: r.?13$40

9 -: (a.{~? 10##a. ) 9: 1=?2 3 4$2
9 -: (a.{~? 10##a. ) 9: a.{~? 10##a.
9 -: (a.{~? 10##a. ) 9: _20+?3 2$40
9 -: (a.{~? 10##a. ) 9: o. _20+?13$40
9 -: (a.{~? 10##a. ) 9: r.?13$40

9 -: (_20+?3 2$40  ) 9: 1=?2 3 4$2
9 -: (_20+?3 2$40  ) 9: a.{~? 10##a.
9 -: (_20+?3 2$40  ) 9: _20+?3 2$40
9 -: (_20+?3 2$40  ) 9: o. _20+?13$40
9 -: (_20+?3 2$40  ) 9: r.?13$40

9 -: (o. _20+?13$40) 9: 1=?2 3 4$2
9 -: (o. _20+?13$40) 9: a.{~? 10##a.
9 -: (o. _20+?13$40) 9: _20+?3 2$40
9 -: (o. _20+?13$40) 9: o. _20+?13$40
9 -: (o. _20+?13$40) 9: r.?13$40

9 -: (r.?13$40     ) 9: 1=?2 3 4$2
9 -: (r.?13$40     ) 9: a.{~? 10##a.
9 -: (r.?13$40     ) 9: _20+?3 2$40
9 -: (r.?13$40     ) 9: o. _20+?13$40
9 -: (r.?13$40     ) 9: r.?13$40

f=.3: 4: 5:
4 -: 'abc' f ?3 4$1000


NB. 0: to 9: encore -----------------------------------------------------

dr  =. 5!:2
rk  =. '>2{ dr <''f'' [. f=.+"x.' : 1

_ _ _ -: 0: rk
_ _ _ -: 1: rk
_ _ _ -: 2: rk
_ _ _ -: 3: rk
_ _ _ -: 4: rk
_ _ _ -: 5: rk
_ _ _ -: 6: rk
_ _ _ -: 7: rk
_ _ _ -: 8: rk
_ _ _ -: 9: rk

fx =. 5!:0
ar =. 5!:1
dr =. 5!:2
sr =. 5!:3
tr =. 5!:4
lr =. 5!:5

eq =. '''x.'' -:&ar&< ''y.''' : 2

(,&':'@":&.>i.10) -: 0:`1:`2:`3:`4:`5:`6:`7:`8:`9:

f =. 'dr <''x.''' : 1

(,<'0:') -: 0: f
(,<'1:') -: 1: f
(,<'2:') -: 2: f
(,<'3:') -: 3: f
(,<'4:') -: 4: f
(,<'5:') -: 5: f
(,<'6:') -: 6: f
(,<'7:') -: 7: f
(,<'8:') -: 8: f
(,<'9:') -: 9: f

(sr <'zero' ) fx eq zero  =. 0:
(sr <'one'  ) fx eq one   =. 1:
(sr <'two'  ) fx eq two   =. 2:
(sr <'three') fx eq three =. 3:
(sr <'four' ) fx eq four  =. 4:
(sr <'five' ) fx eq five  =. 5:
(sr <'six'  ) fx eq six   =. 6:
(sr <'seven') fx eq seven =. 7:
(sr <'eight') fx eq eight =. 8:
(sr <'nine' ) fx eq nine  =. 9:

f =. 'lr <''x.''' : 1

'0:' -: 0: f
'1:' -: 1: f
'2:' -: 2: f
'3:' -: 3: f
'4:' -: 4: f
'5:' -: 5: f
'6:' -: 6: f
'7:' -: 7: f
'8:' -: 8: f
'9:' -: 9: f

g =. 3: 4: 5:
('3:';'4:';'5:') -: dr <'g'
'3: 4: 5:' -: lr <'g'