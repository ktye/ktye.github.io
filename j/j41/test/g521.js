NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. {.y -----------------------------------------------------------------

head =. }.&$ $ ,

NB. Boolean
(head -: {.) 1=?2
(head -: {.) 1=?4$2
(head -: {.) 1=?3 4$2
(head -: {.) 1=?2 3 4$2

NB. literal
(head -: {.) 'a'
(head -: {.) a.{~?4$256
(head -: {.) a.{~?3 4$256
(head -: {.) a.{~?2 3 4$256

NB. integer
(head -: {.) 12345
(head -: {.) ?4$123456
(head -: {.) ?3 4$123456
(head -: {.) ?2 3 4$123456

NB. floating point
(head -: {.) 123.45
(head -: {.) o.?4$1236
(head -: {.) o.?3 4$1256
(head -: {.) o.?2 3 4$1456

NB. complex
(head -: {.) 123j45
(head -: {.) ^0j1*?4$1236
(head -: {.) ^0j1*?3 4$1256
(head -: {.) ^0j1*?2 3 4$1456

NB. boxed
t=.(+&.>i.5),;:'(head -: {.) ^0j1*?3 4$1256'
(head -: {.) <123j45
(head -: {.) t{~?4$#t
(head -: {.) t{~?3 4$#t
(head -: {.) t{~?2 3 4$#t


NB. x{.y ----------------------------------------------------------------

type  =. 3!:0
mt    =. 0&e.@$
fill  =. > @ ({&(' ';(<$0);(<$0);0)) @ (2 32 64&i.) @ (type*-.@mt)
pad   =. fill@] $~ (|@[ - #@]) 0} $@]
ti    =. i.@-@[ + [ + #@]
case  =. 0&<:@[ #.@, |@[ > #@]
itake =. (ti{])`(],~pad)`(i.@[{])`(],pad) @. case
taker =. '':'({.x.) itake"({:x.) y.'
raise =. (1"0@[ $ ])`]@.(*@#@$@])
larg  =. <@,"(0) _&(0})@-@i.@#
targ  =. larg@[,<@raise
take  =. >@(taker&.>/)@targ " 1 _

f =. {. -: take

3     f 1
_3    f 1
0     f 5
3 4   f 'a'
_3 4  f 'a'
3 _4  f <'foo'
_3 _4 f <'foo'

2   3  4 f 3j4
2   3 _4 f 3.4
2  _3  4 f 324
2  _3 _4 f '3'
2   3  4 f <!.(i.4) 'Cogito'
_2  3  4 f 0
_2  3 _4 f _24
_2 _3  4 f _1.23e_34j_5.67e_28
_2 _3 _4 f <7

3  f ?12$100
_3 f ?12$123
3  f 'abafasfkjsadf'
_3 f 'abasdfasdfasf'
3  f +&.>i.12
_3 f +&.>i.12

3     f ?5 6 4$100
_3    f ?5 6 4$100
5     f ?5 6 4$100
3 4   f ?5 6 4$100
3 6   f ?5 6 4$100
3 _6  f ?5 6 4$100
_3 _6 f ?5 6 4$100
5 6   f ?5 6 4$100
5 6 4 f ?5 6 4$100
1 _4  f +&.>?6 7$100

3 f ''
3 f i.0
3 f 0 0$<''
3 4 f i.0 0
3 4 f 4 0 3$' '
_3 4 f 0 0 5$<''


NB. x{.!.f y ------------------------------------------------------------

(4 5$0)   -: 4 5{.     0
(4 5$0)   -: 4 5{.!.'' 0
(4 5$' ') -: 4 5{.!.'' ' '
(4 5$9)   -: 4 5{.!.9  [ 9

(7 3$(,i.2 3),15$o.1)  -: 7{.!.(o.1) i.2 3
(7 3$(,o.i.2 3),15$_9) -: 7{.!._9 o.i.2 3

(7 3$(<"0,i.2 3),15$<!.'abc' _9 5) -: 7{.!.(<!.'abc' _9 5) <"0 i.2 3
(7 3$(<!.'aff'"0,i.2 3),15$<'dab') -: 7{.!.(<'dab') <!.'aff'"0 i.2 3

(i.5 0  ) -: 5 0 {.!.'a'  i. 4 3
(i.5 0 3) -: 5 0 {.!.(<9) i.5 4 3


NB. fills ---------------------------------------------------------------

ec  =. ''
en  =. $0
eb  =. 0$<0
jot =. <''

0 0 0 -: 3{.ec
0 0 0 -: 3{.en
0 0 0 -: 3{.eb

((s,_3{.t)$0) -:   s {.(t=.?8$2)$' ' [ s=.1+?5$2
((s,_3{.t)$0) -:   s {.(t=.?8$2)$0   [ s=.1+?5$2
((s,_3{.t)$0) -:   s {.(t=.?8$2)$jot [ s=.1+?5$2

((s,_3{.t)$0) -: (-s){.(t=.?8$2)$' ' [ s=.1+?5$2
((s,_3{.t)$0) -: (-s){.(t=.?8$2)$0   [ s=.1+?5$2
((s,_3{.t)$0) -: (-s){.(t=.?8$2)$jot [ s=.1+?5$2

s -: $  s {.' ' [ s=.?8$2
s -: $  s {.0   [ s=.?8$2
s -: $  s {.jot [ s=.?8$2

s -: $(-s){.' ' [ s=.?8$2
s -: $(-s){.0   [ s=.?8$2
s -: $(-s){.jot [ s=.?8$2

a=.1 3$'a'
(a,' ') -: a,ec
(a,' ') -: a,en
(a,' ') -: a,eb
(' ',a) -: ec,a
(' ',a) -: en,a
(' ',a) -: eb,a

a=.i.1 3
(a,0) -: a,ec
(a,0) -: a,en
(a,0) -: a,eb
(0,a) -: ec,a
(0,a) -: en,a
(0,a) -: eb,a

a=.,:1;2;'abc'
(a,jot) -: a,ec
(a,jot) -: a,en
(a,jot) -: a,eb
(jot,a) -: ec,a
(jot,a) -: en,a
(jot,a) -: eb,a

(0 0 1 0{' ',:a) -: >ec;en;a;eb [ a=.'abc'
(0 0 1 0{0  ,:a) -: >ec;en;a;eb [ a=.3 4 5
(0 0 1 0{jot,:a) -: >ec;en;a;eb [ a=.4;5;i.3 4