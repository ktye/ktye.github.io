NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. ;y ------------------------------------------------------------------

raze =. (1&#)&>&(,&.>/)&,

(; -: raze) 1 2 3 4;5 6 7 8;i.3 4
(; -: raze) (i.3 4);1 2 3 4;5 6 7 8

NB. Boolean
(; -: raze) 0 1 0;1 0;0
(; -: raze) 0  ;1=?3 4$2
(; -: raze) 0 1;1=?3 4$2
(; -: raze) t=.1=?2 3 4 2$2
(; -: raze) <"0 t
(; -: raze) <"1 t
(; -: raze) <"2 t
(; -: raze) <"3 t
(; -: raze) <"4 t

NB. literal
(; -: raze) 'abc';'dc';'a'
(; -: raze) 'a' ;3 4$'abc'
(; -: raze) 'ad';3 4$'abc'
(; -: raze) t=.(?2 3 4 2$#a.){a.
(; -: raze) <"0 t
(; -: raze) <"1 t
(; -: raze) <"2 t
(; -: raze) <"3 t
(; -: raze) <"4 t

NB. integer
(; -: raze) 0 1 2;3 4;2
(; -: raze) 2  ;?3 4$100000
(; -: raze) 2 3;?3 4$100000
(; -: raze) t=.?2 3 4 2$100000
(; -: raze) <"0 t
(; -: raze) <"1 t
(; -: raze) <"2 t
(; -: raze) <"3 t
(; -: raze) <"4 t

NB. floating point
(; -: raze) 1.2 3.4 5.6;_12.6 17;o.1
(; -: raze) 2.5  ;o.?3 4$100000
(; -: raze) 2.5 6;o.?3 4$100000
(; -: raze) t=.o.?2 3 4 2$100000
(; -: raze) <"0 t
(; -: raze) <"1 t
(; -: raze) <"2 t
(; -: raze) <"3 t
(; -: raze) <"4 t

NB. complex
(; -: raze) 1j2 3j4 5j6;_12j6 17;0j1
(; -: raze) 2j5  ;^0j1*?3 4$100000
(; -: raze) 2j5 6;^0j1*?3 4$100000
(; -: raze) t=.^0j1*?2 3 4 2$100000
(; -: raze) <"0 t
(; -: raze) <"1 t
(; -: raze) <"2 t
(; -: raze) <"3 t
(; -: raze) <"4 t
(; -: raze) 0 1 0; 123 45; 3.4 _5.67e8; 6j7

NB. boxed
(; -: raze) (1;'two';'drei');(3 4;3 4$6);<<i.2 3 4
(; -: raze) (<123)       ;<<"0?3 4$100
(; -: raze) ((<123),<'a');<<"0?3 4$100
(; -: raze) t=.(?2 3 4 2$#x){x=.<&.>(<"0?30$100),;:'(; -: raz)^0j1*?2 3$10'
(; -: raze) <"0 t
(; -: raze) <"1 t
(; -: raze) <"2 t
(; -: raze) <"3 t
(; -: raze) <"4 t

($0)   -: ;''
($0)   -: ;i.0 4 5
(,0)   -: ;0
(,0)   -: ;<0
(,'a') -: ;'a'
(,'a') -: ;<'a'
(,9)   -: ;9
(,9)   -: ;<9
(,3.4) -: ;3.4
(,3.4) -: ;<3.4
(,3j4) -: ;3j4
(,3j4) -: ;<3j4


NB. x;y -----------------------------------------------------------------

type  =. 3!:0
boxed =. e.&32 64@type
mt    =. 0&e.@$
link  =. <@[ , <`]@.(boxed *. -.@mt)@]

1 2          (; -: link) 3 4 5
''           (; -: link) ''
'abc'        (; -: link) +&.>i.3 4
(+&.>i.3 4)  (; -: link) 'abc'
''           (; -: link) 0$<''
(0$<'')      (; -: link) ''
1 2 3        (; -: link) <!.4 'abc'
(<!.4 'abc') (; -: link) 1 2 3
(<!.3j4 i.9) (; -: link) <!.(i.3 4) i.5 6
