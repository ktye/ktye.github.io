NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. ":y on non-empty numeric array y ------------------------------------

sprintf =. ":
type    =. 3!:0
real    =. {.@+.
imag    =. {:@+.

minus   =. $&'_'@('-'&=@{.)
ubar    =. >@({&(<;._1 ' _ _ _. _.'))@('iInN'&i.@{.)
afte    =. minus , (i.&0@(e.&'-+0') }. ])
efmt    =. >:@(i.&'e') ({. , afte@}.) ]
finite  =. ]`efmt@.('e'&e.)
massage =. finite`ubar@.(e.&'iInN'@{.)
fmtD    =. (minus,massage@(e.&'-+'@{.}.])) @ sprintf

fmtB    =. {&'01'
fmtI    =. sprintf
fmtZ    =. fmtD@real , 'j'&,@fmtD@imag
fmt     =. (fmtB&.>)`(fmtI&.>)`(fmtD&.>)`(fmtZ&.>) @. (1 4 8&i.@type)

sh      =. (*/@}:,{:@(1&,))@$ ($,) ]
width   =. (<:@{. 0} ])@>:@(>./)@sh@:(#&>)
th      =. (-@width ;@:({.&.>)"1 ]) @ fmt

f =. ": -: th

f 1=?2 3 4$2
f _50+?2 3 4$100
f o._50+?2 3 4$100
f r.?4 3 2$100

f 1=?2
f _50+?100
f o._50+?100
f r.?100

f _3.1415e_76 _3.1415e76
f _3.1415e_76j_3.1415e76

f _
f __
f _.
f 3 7$ _ 3 __ 4 _. 6

(":_3.1415e_76) -: fmtD '-3.1415e-76'
(":_3.1415e76 ) -: fmtD '-3.1415e+076'
(": _) -: fmtD 'INF'
(": _) -: fmtD 'inf'
(":__) -: fmtD '-INF'
(":__) -: fmtD '-inf'
(":_.) -: fmtD 'NAN'
(":_.) -: fmtD 'nan'
(":_.) -: fmtD '+NAN01'
(":_.) -: fmtD '+nan01'


NB. ":y print precision -------------------------------------------------

pi=.o.1
'3.14159' -: ":pi
'3.14159' -: ":!.6 pi
'3.141592653589793' -: ":!.16 pi


NB. ":y on boxed array y ------------------------------------------------

type    =. 3!:0
boxed   =. 32&= @ type
mt      =. 0&e.@$
boxc    =. 9!:6 ''
tcorn   =. 2  0{boxc
tint    =. 1 10{boxc
bcorn   =. 8  6{boxc
bint    =. 7 10{boxc

sh      =. (*/@}: , {:)@(1&,)@$ $ ,
rows    =. */\.@}:@$
bl      =. }.@(,&0)@(+/)@(0&=)@(|/ i.@{.@(,&1))
mask    =. 1&,. #&, ,.&0@>:@i.@#
mat     =. mask@bl@rows { ' '&,@sh

edge    =. ,@(1&,.)@[ }.@# +:@#@[ $ ]
left    =. edge&(3 9{boxc)@>@(0&{)@[ , "0 1"2 ]
right   =. edge&(5 9{boxc)@>@(0&{)@[ ,~"0 1"2 ]
top     =. 1&|.@(tcorn&,)@(edge&tint)@>@(1&{)@[ ,"2  ]
bot     =. 1&|.@(bcorn&,)@(edge&bint)@>@(1&{)@[ ,"2~ ]
perim   =. [ top [ bot [ left [ right ]

topleft =. (4{boxc)&(0}) @ ((_2{boxc)&,.) @ ((_1{boxc)&,)
inside  =. 1 1&}. @ ; @: (,.&.>/"1) @: (topleft&.>)
take    =. [ {. ]`(]&' ')@.mt@]
frame   =. [ perim {@[ inside@:(take&.>)"2 ,:^:(1&=@#@$)@]
rc      =. (>./@sh&.>) @: (,.@|:"2@:(0&{"1);1&{"1) @: ($&>)

thorn1  =. ":`thbox @. boxed
thbox   =. (rc frame ]) @: (mat@thorn1&.>)

f =. ": -: thorn1

y =. 2 3$(i.2 3);'abc';(i.4 1);(2 2$'ussr');12;<+&.>i.2 2 3
f y

f <'abc'
f <''
f <2 0 3$'abc'
f <2 3 4 2$'abc'

f ;:'Cogito, ergo sum.'
f (?3$20)?&.>30

f <i.2 3
f 3;<o.i.2 3
f <<3;<r.?1 1 2 3$100
f <<'';i.2 0 3 4 2
f +&.>i.2 3 4
f (<i.3 4) 0} +.&.>i.2 3 4


NB. x":y ----------------------------------------------------------------

fmtexp   =. {&'++-'@* , _3&{.@('00'&,)@":@|
cexp     =. >:@(i.&'e') ({. , fmtexp@".@}.) ]
cminus   =. '-'&((e.&'_' # i.@#)@]})
larg     =. (+_20&*@(0&=))@-@(1&|)@|@".@(-.&' %e')
nsprintf =. larg@[ cexp@cminus@": ]
psprintf =. ".@(-.&' %f')@[ ($&' '@(0&=)@<.@[ , cminus@":) ]
sprintf  =. nsprintf`psprintf@.('f'&e.@[)

wd       =. <.@|
npstr    =. ' %- '&,@(,&'e')@(0.1&":)@(-1&<)@|
ppstr    =. *@wd }. ' %'&,@(,&'f')@(0.1&":)
pstr     =. npstr`ppstr@.(0&<:)

jexp     =. >:@(i.&'e') ({. , ":@".@(-.&' +')@}.) ]
jminus   =. '_'&((e.&'-' # i.@#)@]})
stars    =. ]`{.@.(*@[)`($&'*'@[)@.(*@[*.(<#))
c2j      =. stars ]`jexp@.('e'&e.)@jminus

lb       =. (0&=@wd *. 0&<:)@{.
thcell   =. (wd@[ <@c2j pstr@[ sprintf ])"0
thorn2   =. (lb@[ }. ;@:thcell) " 1

f =. *./@:(": -: thorn2)

0.2  f ^i.3 4
7.2  f ^i.3 4
_0.2 f -^i.3 4
_7.2 f -^i.3 4

6 7 8 9 f ^-i.3 4
(-6 7 8 9) f ^-i.3 4
_20 f ^&.-i.3 4
(x=.10%~200-~?3 4$400) f y=.^i.3 4

0 f  ^ i.3 4
0 f  ^-i.3 4
0 f -^ i.3 4
0 f -^-i.3 4


NB. x":y ----------------------------------------------------------------

sp =. 0&>@[ >:@*. 0&<:@]
f0 =. (-.&' ') @ ((* * 20&+@|)@[ ": ])
f  =. '' : '((0<:x.)*x. sp {.y.)}. ; ((x. sp y.)$&.>'' '') ,&.> x. <@f0"0 y.'

NB. Boolean
t=.(,.15+0.1*i.10) <@": 0
t -: (1+(*k)+k=.i.10) <&(_15&{.)@{."0 1 '0.',9$'0'
t=.(,.-15+0.1*i.10) <@": 0
t -: (3+(*k)+k=.i.10) <&(15&{.)&(,&'e0')@{."0 1 '  0.',9$'0'
( 0.4 f t) -:  0.4 ": t=.1=?9$2
(_0.4 f t) -: _0.4 ": t=.1=?9$2
'*****' -: 5.6":0

NB. integer
t=.(,.15+0.1*i.10) <@": 3
t -: (1+(*k)+k=.i.10) <&(_15&{.)@{."0 1 '3.',9$'0'
t=.(,.15+0.1*i.10) <@": _3
t -: (2+(*k)+k=.i.10) <&(_15&{.)@{."0 1 '_3.',9$'0'
t=.(,.-15+0.1*i.10) <@": 3
t -: (3+(*k)+k=.i.10) <&(15&{.)&(,&'e0')@{."0 1 '  3.',9$'0'
t=.(,.-15+0.1*i.10) <@": _3
t -: (3+(*k)+k=.i.10) <&(15&{.)&(,&'e0')@{."0 1 ' _3.',9$'0'
( 0.4 f t) -:  0.4 ": t=._50+?9$100
(_0.4 f t) -: _0.4 ": t=._50+?9$100
'*****' -: 5.3":12

NB. floating point
t=.(,.15+0.1*i.10) <@": 3.2
t -: (1+(*k)+k=.i.10) <&(_15&{.)@{."0 1 '3.2',8$'0'
t=.(,.15+0.1*i.10) <@": _3.2
t -: (2+(*k)+k=.i.10) <&(_15&{.)@{."0 1 '_3.2',8$'0'
t=.(,.-15+0.1*i.10) <@": 3.2
t -: (3+(*k)+k=.i.10) <&(15&{.)&(,&'e0')@{."0 1 '  3.2',8$'0'
t=.(,.-15+0.1*i.10) <@": _3.2
t -: (3+(*k)+k=.i.10) <&(15&{.)&(,&'e0')@{."0 1 ' _3.2',8$'0'
( 0.4 f t) -:  0.4 ": t=.o._50+?9$100
(_0.4 f t) -: _0.4 ": t=.o._50+?9$100
'*****' -: 5.3":_1.2

NB. complex
t=.(,.15+0.1*i.10) <@": 3.2j4
t -: (1+(*k)+k=.i.10) <&(_15&{.)@{."0 1 '3.2',8$'0'
t=.(,.15+0.1*i.10) <@": _3.2j4
t -: (2+(*k)+k=.i.10) <&(_15&{.)@{."0 1 '_3.2',8$'0'
t=.(,.-15+0.1*i.10) <@": 3.2j4
t -: (3+(*k)+k=.i.10) <&(15&{.)&(,&'e0')@{."0 1 '  3.2',8$'0'
t=.(,.-15+0.1*i.10) <@": _3.2j4
t -: (3+(*k)+k=.i.10) <&(15&{.)&(,&'e0')@{."0 1 ' _3.2',8$'0'
'*****' -: 5.3":_1.2j4

(;_1 _2 _3<@{."0 t{'01') -: 1 2 3": t=.1=?3$2
(;_1 _2 _3<@{."0 t{'01') -: 1 2 3": t=.1=?2
(;_1 _2 _3<@{."0 t{'0123456789') -: 1 2 3": t=.?3$10
(;_1 _2 _3<@{."0 t{'0123456789') -: 1 2 3": t=.?10
