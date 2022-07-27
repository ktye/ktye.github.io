NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. ^: ------------------------------------------------------------------

dr =. 5!:2

(o.^:(i.3 4)1) -: (o.1)^i.3 4
(o.^:p 1)      -: (o.1)^p=._7+?4 5$15

(+/^:4 i. 2 3 4 5) -: +/,i.2 3 4 5
(o.^:(6) 2)        -: 2*(o.1)^6

f  =. 2&-
g  =. *&3
h  =. f :. g f.
hi =. h f. ^: _1
(dr <'hi') -: |.dr <'h'

(f f^:_1 x) -: x=.?100
(f^:_1 f x) -: x
(g g^:_1 x) -: x=.?100
(g^:_1 g x) -: x


NB. ^: Newton's Method --------------------------------------------------

id  =. [.+

eps =. 1e_8&*@+ 0&=
Da  =. (-&) ([`(%~)`+`) (`]) \  NB. secant slope adverb with absolute diff.
D   =. Da~(`eps)\               NB. secant slope adverb with relative diff.
Nt  =. id (((-`)(`%))`D \)      NB. one iteration of Newton's method

*./ 1e_6 > | 3 - 3&* D 4 5 6
*./ 1e_6 > | (2&^ D 4 5 6) - (^.2)*2^4 5 6

6 -: '(y.^2)-36':'' Nt^:_ x=.12


NB. x f^:n y ------------------------------------------------------------

fib =. ('$.=.2,~(0>.<:y.)#1 [ t=.0 1'; 't=.t,+/_2{.t'; 'y.{.t') : ''

(fib 1)      -: 0+^:(,0)    1
(fib 2)      -: 0+^:(0 1)   1
(fib n)      -: 0+^:(i.n)   1 [ n=.?60
(4 5$fib 20) -: 0+^:(i.4 5) 1

f=.^
a=.0.125*1+?32
b=.0.125*1+?32
a -: a f^:0 b
b -: a f^:1 b
(a f b)     -: a f^:2 b
(b f a f b) -: a f^:3 b

*./ (?20$1000) (+. -: |~^:_"0) ?20$100


NB. ^:_1 ----------------------------------------------------------------

ar   =. 5!:1
inv  =. ^:_1
eq   =. '(ar <''x.'') -: ar <''y.''' : 2
test =. '(x. inv eq y.) *. (y. inv eq x.)' : 2
f_g  =. '(x. inv eq y.) +. (x. inv eq (y. :.x.))' : 2

<  test >
<: test >:
+  test +
+: test -:
-  test -
-. test -.
*: test %:
%  test %
%. test %.
^  test ^.
|. test |.
|: test |:
,: test {.
#. test #:
/: test /:
[  test [
]  test ]
". test ":
C. test C.
p. test p.

m&+  test (-&m)        [. m=.o.?10000
+&m  inv eq (-&m)      [. m=.^0j1*?1000
m&-  test (m&-)        [. m=.^0j1*?1000
-&m  inv eq (m&+)      [. m=.^0j1*?1000
m&*  test (%&m)        [. m=.o.?10000
*&m  inv eq (%&m)      [. m=.o.?10000
m&%  test (m&%)        [. m=.^0j1*?1000
%&m  inv eq (m&*)      [. m=.^0j1*?1000
m&o. test ((-m)&o.)    [. m=.o.?10000
m&|. test ((-m)&|.)    [. m=.o.?10000
m&^. test (m&^)        [. m=.o.?10000
^.&m test (%:&m)       [. m=.o.?10000
m&^  test (m&^.)       [. m=.o.?10000
^&m  test (m&%:)       [. m=.o.?10000
m&%: test (^&m)        [. m=.o.?10000
%:&m test (^.&m)       [. m=.o.?10000
m&#. test (m&#:)       [. m=.o.?10000
m&#: test (m&#.)       [. m=.o.?10000
p&|: test ((/:p)&|:)   [. p=.?~12
p&{  test ((/:p)&{ )   [. p=.?~13
{&m  inv eq (m&i.)     [. m=.?5 3$1000
m&i. inv eq ({&m@((#m)&|) :. (m&i.)) [. m=.?5 3$1000

+ /\  f_g (-    |.!.0 )
+ /\. f_g (- 1&(|.!.0))
* /\  f_g (%    |.!.1 )
* /\. f_g (% 1&(|.!.1))
= /\  f_g (=    |.!.1 )
= /\. f_g (= 1&(|.!.1))
~:/\  f_g (~:   |.!.0 )
~:/\. f_g (~:1&(|.!.0))
- /\  f_g ((-|.!.0) *"_1 $&1 _1@#)
- /\. f_g (+ 1&(|.!.0))
% /\  f_g ((%|.!.1) ^"_1 $&1 _1@#)
% /\. f_g (* 1&(|.!.1))
