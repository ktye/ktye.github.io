NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 5!:4 ----------------------------------------------------------------

ar      =. 5!:1
type    =. 3!:0
boxed   =. 32&= @ type
mt      =. 0&e.@$
oarg    =. >@(1&{)
shr     =. |.!.''
shl     =. 1&(|.!.'')
mat     =. (1 1&}.)@(_1 _1&}.)@":@<
boxc    =. 9!:6 ''
dash    =. 10{boxc

extent  =. (+./\ *. +./\.) @ (' '&~:) @: ({."1)
limb1   =. 1&|.@$ 1&~: }. (10 6 0{boxc)&,@($&(9{boxc))
limb    =. -@(i.&1)@[ |. #@[ {. limb1@]
pfx     =. (limb +/)@extent ,. ]
pad     =. [ {. ] ,. dash&=@({:"1)@] {  ' '&,:@($&dash)@(-&{: $)
take    =. pad`($&' '@[) @. (mt@])
rc      =. #@>@{."1 ; >./@:({:@$@>)
kernt   =. (0{boxc)&=@shl@[ *. ' '&~:@]
kernb   =. (6{boxc)&=@] *. ' '&~:@shl@[
kern    =. (<0 0)&{&>"2 (kernt +./"1@:+. kernb) (<_1 0)&{&>"2
gap     =. ,&.>"_1 {&((0 1$' ');1 1$' ')@kern
graft   =. (pfx&.>@{. 0} ]) @ (,&.>/) @ gap @ ({@rc take&.> ])

lab     =. ,: @ (2&|.) @ ((' ',dash,dash,' ')&,)
label   =. lab`((,.dash)&[) @. (e.&'0123456789'@{.)
center  =. ((i.&1) -@+ <.@-:@(+/))@] |. #@] {. [
root    =. label@[ center extent@>@{.@]

leaf    =. ,@<@(((,:dash,' ')&[ center $&1@#) ,. ])@mat@":

trx     =. >@{. (root ; ]) graft@:(tr@>)@oarg
trgl    =. >@{. (root ; ]) graft@:(trx@>@{. , tr @>@}.)@oarg
trgr    =. >@{. (root ; ]) graft@:(tr @>@{. , trx@>@}.)@oarg
trg     =. trgr`trgl`trx @. (i.&(<,'`')@oarg)
trtil   =. trx`(leaf@oarg@>@{.@oarg) @. ((<,'0')&=@{.@>@{.@oarg)
trcase  =. (leaf@oarg)`trgl`trgl`trg`trtil`trx @. ((;:'0@.`:4~')&i.@{.)
tr      =. leaf`trcase @. boxed

rep     =. [. & (((# i.@#)@,@) (@])})
right   =. (5{boxc) rep (e.&(9{boxc) *. shr"1@(e.&dash))
cross   =. (4{boxc) rep (e.&(5{boxc) *. shl"1@(e.&dash))
left    =. (3{boxc) rep (e.&(9{boxc) *. shl"1@(e.&dash))
bot     =. (7{boxc) rep (e.&(6{boxc) *. shr"1@(e.&dash))
connect =. bot @ left @ cross @ right

tree    =. connect @ > @ (,.&.>/) @ (> (root ; ]) tr@>@ar)


jtr  =. 5!:4

(jtr -: tree) <'f' [. f=.+
(jtr -: tree) <'f' [. f=.+.
(jtr -: tree) <'f' [. f=.i.
(jtr -: tree) <'f' [. f=.0:
(jtr -: tree) <'f' [. f=.-

(jtr -: tree) <'f' [. f=.1 2 3&+
(jtr -: tree) <'f' [. f=.+&(i.10 2)
(jtr -: tree) <'f' [. f=.+&(i.11 1)
(jtr -: tree) <'f' [. f=.,&'abcd'
(jtr -: tree) <'f' [. f=.(<"0 i.7)&e.

(jtr -: tree) <'f' [. f=.+/ % #
(jtr -: tree) <'f' [. f=.+ %

(jtr -: tree) <'f' [. f=.+/
(jtr -: tree) <'f' [. f=.+./
(jtr -: tree) <'f' [. f=.+./ .*
(jtr -: tree) <'f' [. f=.+/ .*
(jtr -: tree) <'f' [. f=.+`*@.<
(jtr -: tree) <'f' [. f=.+`-`*`:0

(jtr -: tree) <'ger' [. ger =. +/`%`#
(jtr -: tree) <'a'   [. a =.<"0 i.7
(jtr -: tree) <'a'   [. a =. ''
(jtr -: tree) <'a'   [. a =. i.10 1
(jtr -: tree) <'a'   [. a =. i.11 1

(jtr -: tree) <'graft'
(jtr -: tree) <'root'
(jtr -: tree) <'leaf'
(jtr -: tree) <'cross'
(jtr -: tree) <'trcase'
(jtr -: tree) <'tree'

a =. /
(jtr -: tree) <'a'
a =. /\
(jtr -: tree) <'a'
inv =. ^: _
(jtr -: tree) <'inv'

c =. &
(jtr -: tree) <'c'
ip =. [. @ ("1 _)
(jtr -: tree) <'ip'
