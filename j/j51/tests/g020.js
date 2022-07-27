NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. >y ------------------------------------------------------------------

type   =. 3!:0
rank   =. #@$

mt     =. 0&e.@$
mrk    =. >./@:(rank&>)
crk    =. mrk (-@[{.$&1@[,$@])&.> ]
crank  =. crk ($,)&.> ]
msh    =. >./@:($&>)
cshape =. <@msh {.&.> ]
mtp    =. >./@:((type*-.@mt)&>)
fill   =. >@({&(' ';(<$0);0))@(2 32&i.)
ctype  =. (msh <@$ fill@mtp) (]`[@.(mt@]))&.> ]
ope    =. > @ cshape @ ctype @ crank

f =. > -: ope

f i.&.>i.7
f 1 2;i.2 3 4
f 'ab';2 3$'wxyz'
f (<<'Now'),<]&.>i.2 3

f '';3 4 5
f 'abc';''
f (<2;3);''

f '';'a';'b';'c'
f 'a';'b';$0
f 3;'';4

f '';($0);0$<''
f (<0 3 4)$&.>' ';(<$0);0

f =. {:@:>@($&0@[ ; ])
b (f -: {.) i.>:?b=.>:?4$6
b (f -: {.) i.>:?b=.>:?4$6
b (f -: {.) i.>:?b=.>:?4$6

t -: ><"0 t=.?100$20
(4 6$'Cogito,     ergo  sum.  ') -: >;:'Cogito, ergo sum.'

2 1 1 1 -: $ >(i.0 0 0);4
2 1 1 2 -: $ >(i.0 0 2);4
2 1 1 2 -: $ >(i.0 0 2);i.0
2 1 1 3 -: $ >(i.0 0 2);i.3
2 1 0 3 -: $ >(i.0 0 2);i.0 3
2 0 0 3 -: $ >(i.0 0 2);i.0 0 3
