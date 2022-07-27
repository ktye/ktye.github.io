NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. x o.y for x e.i.13 --------------------------------------------------

a =. (_4+?11$10) j. _4+?11$10
a =. 6 3$a,0 _ __,*/\4$0j1

cir0 =. -.&.(*~)
sin  =. (^ -:@- ^@-)&.j.
cos  =. (^ -:@+ ^@-)@j.
tan  =. %/&(1 2&(o./))
cir4 =. >:&.(*~)
sinh =. ^ -:@- ^@-
cosh =. ^ -:@+ ^@-
tanh =. %/&(5 6&(o./))
cir8 =. -&>:&.(*~)

1e_8 > >./|,(cir0 a) - 0 o.a

1e_8 > >./|,(sin a) - 1 o.a
1e_8 > | 0.841470984807896 - 1 o.1

1e_8 > >./|,(cos a) - 2 o.a
1e_8 > | 0.540302305868139 - 2 o.1

1e_8 > >./|,(tan a) - 3 o.a
1e_8 > >./| 0.54630249 1255.7655915 - 3 o.0.5 1.57

1e_8 > >./|,(cir4 a) - 4 o.a

1e_8 > >./|,(sinh a) - 5 o.a
1e_8 > | 1.601919080 - 5 o.1.25

1e_8 > >./|,(cosh a) - 6 o.a
1e_8 > | 1.543080635 - 6 o.1

1e_8 > >./|,(tanh a) - 7 o.a
1e_8 > | 0.86924933 - 7 o.1.33

1e_8 > >./|,(cir8 a) - 8 o.a

1e_8 > >./|,a - _9 _11 +/ . o.9 11 o./a

1e_8 > >./|,a - _10 _12 */ . o. 10 12 o./a


NB. x o.y for x e.-i.13 -------------------------------------------------

sin   =.  1&o.
asin  =. _1&o.
cos   =.  2&o.
acos  =. _2&o.
tan   =.  3&o.
atan  =. _3&o.
cir4m =. '(>:y.)*%:(<:y.)%(>:y.)+_1=y.':''
sinh  =.  5&o.
asinh =. _5&o.
cosh  =.  6&o.
acosh =. _6&o.
tanh  =.  7&o.
atanh =. _7&o.
cir8m =. %:&.-&>:&(*~)

a =. ^0j0.1*?11$100
a =. 6 3$a,0 _ __,*/\4$0j1

1e_8 > >./|,a - sin asin a
1e_8 > >./|,a - asin sin a
1e_8 > /| 0.789 - asin 0.7096490720426565

a =. a * _1^0>9 o.a=.^0j0.1*?11$100
a =. 6 3$a,0 _ __,*/\4$0j1

1e_8 > >./|, a - cos acos a
1e_8 > >./, (|a - acos cos a) <. | (-a) - acos cos -a
1e_8 > | 0.696 - acos 0.767412932432449

a =. 5 3$(r.?11$100),0 _ __,*/\4$0j1

1e_8 > >./|,a - tan atan a
1e_8 > >./|,a - atan tan a
1e_8 > | 0.572852247673 - atan 0.645

1e_8 > >./|,(cir4m a) - _4 o.a

1e_8 > >./|, a - sinh asinh a
1e_8 > >./|, a - asinh sinh a
1e_8 > >./| 3.9 5.9 - asinh 24.691103597 182.51736421

a =. 9 3$(r.?11$100),(i.9),0 _ __,*/\4$0j1
a =. a *_1^0>9 o.a

1e_8 > >./|, a - cosh acosh a
1e_8 > >./|, a - acosh cosh a
1e_8 > >./| 1.19 5.8 - acosh 1.795651236 165.151293732

a =. 6 3$(^0j0.1*?11$100),0 _ __,*/\4$0j1

1e_8 > >./|,a - tanh atanh a
1e_8 > >./|,a - atanh tanh a

x=.   1.99188402916   2.22881178784
y=. 201.71315737028 201.71563612246
1e_8 > >./| 1.44 6 - atanh (%/x),%/y

1e_8 > >./|,(cir8m a) - _8 o.a


NB. circle functions of the form f&.j.  ---------------------------------

sin  =. 1&o.  [.  asin  =. _1&o.
cos  =. 2&o.  [.  acos  =. _2&o.
tan  =. 3&o.  [.  atan  =. _3&o.

sinh =. 5&o.  [.  asinh =. _5&o.
cosh =. 6&o.  [.  acosh =. _6&o.
tanh =. 7&o.  [.  atanh =. _7&o.

jsinh =. sin&.j.
jcosh =. cos@ j.
jasin =. asinh&.j.
jatan =. atanh&.j.

a=.6 3$(r.?11$1000),0 _ __,*/\4$0j1

(sinh -: jsinh) a
(cosh -: jcosh) a
(asin -: jasin) a
(atan -: jatan) a


NB. o. ------------------------------------------------------------------

a =. (_4+?11$10) j. _4+?11$10
a =. 6 3 $a,0 _ __,*/\4$0j1
(o.a) -: a*o.1

p =. (0 4+/1 2 3)o.0.35
q =. 0.3428978074554513492 0.93937271284737892 0.36502849
q =. q,: 0.357189729 1.061877819 0.33637554
1e_8 > >./|, p - q

x =. 0.01*(+ 0j1&*)/_400+?2$900
(2 3 o. x) -: (}.3j4 2 3) o. x
(1 2 o. x) -: (}.3.5 1 2) o. x
(5 o. x)   -: ({:3j4 5) o. x
(6 o. x)   -: ({:3.7 6) o. x
(1 o. a)   -: (4-3) o. a


NB. model of x o. y  ----------------------------------------------------
NB. See Chapter 4 of Abramowitz and Stegun [1964].

pi     =. o.1
sin    =. 1&o.   NB. a function in the C library
cos    =. 2&o.   NB. a function in the C library
sinh   =. 5&o.   NB. a function in the C library
cosh   =. 6&o.   NB. a function in the C library

cir0   =. 1&+   %:@* 1&-
zp4    =. -&0j1 %:@* +&0j1
zp8    =. 0j1&+ %:@* 0j1&-
zm4    =. +&1 * -&1 %:@% +&1
real   =. -:@(++)
imag   =. %&0j2@(-+)
zarc   =. 0j_1&*@^.@*`0: @. (0&=)

zsin   =. ((sin@[ * cosh@]) j. (  cos@[ * sinh@]))/@+.
zcos   =. ((cos@[ * cosh@]) j. (-@sin@[ * sinh@]))/@+.
ztan   =. zsin % zcos
zsinh  =. zsin&.j.
zcosh  =. zcos@j.
ztanh  =. ztan&.j.

zasin  =. zasinh&.j.
zacos  =. (-:pi)&-@zasin
zatan  =. zatanh&.j.
zasinh =. (^.@+ zp4)`($:&.-) @. (0&>@real)
zacosh =. ]`(j.@|@imag)@.(0&>@real) @ (^.@+ zm4)
zatanh =. 1&+ -:@^.@% 1&-

cirp   =. (cir0@])`(zsin@])`(zcos@])`(ztan@])`(zp4@])`(zsinh@])`(zcosh@])`(ztanh@])`(zp8@])`(real@])`(|@])`(imag@])`(zarc@]) @. [
cirm   =. (cir0@])`(zasin@])`(zacos@])`(zatan@])`(zm4@])`(zasinh@])`(zacosh@])`(zatanh@])`(-@zp8@])`]`(+@])`(j.@])`(r.@]) @. (|@[)
circle =. cirp`cirm @. (0&>@[) " 0

a =. 6 3$(r.?11$1000),0 0j1 _1 0j_1 1 _ __
( i.13) (o./ -: circle/) a
(-i.13) (o./ -: circle/) a
