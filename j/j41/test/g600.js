NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. " -------------------------------------------------------------------

a =. ?(1+?(1+?5)#4)$100
b =. ?(($a),1+?(1+?3)#4)$100
c =. a.{~?(1+?(1+?3)#4)$#a.

(b+a) -: a +"(-#$a) b
(a+b) -: a +"(-#$a) b
(a+b) -: a +"0 b
(a+b) -: b + (<(#$a)}.$b)$&><"0 a

($c,"0 'x')   -: ($c),2
($c,"1 0 'x') -: ($c)+(-$$c){.1
( c,"1 'x')   -: c,"1 0 'x'
($c,"1 'xyz') -: ($c)+(-$$c){.3
($c,"1 'xyz') -: $c,"(#"1) 'xyz'

(#a) = $<"_1 a
(#b) = $<"_1 b
(#c) = $<"_1 c

'xyz'              -: 'xyz'"99 b
'xyz'              -: 'xyz'"_  b
'xyz'              -: 'xyz'"#  b
(((#b),3)$'xyz')   -: 'xyz'"_1 b
((($b),3)$'xyz')   -: 'xyz'"0 b

'xyz'              -: a 'xyz'"99 b
'xyz'              -: a 'xyz'"_  b
((($a),3)$'xyz')   -: a 'xyz'"0 _ b
(((#a),3)$'xyz')   -: a 'xyz'"_1 _ b
(((}:$b),3)$'xyz') -: a 'xyz'"1 b

dr =. 5!:2
rk =. '>2{dr<''f'' [. f=.+"x.' : 1

_ 0 0 -: + rk
2 _ 2 -: %. rk
_ 1 _ -: $ rk
1 2 3 -: +"1 2 3 rk
3 3 3 -: +"3     rk
3 2 3 -: +"2 3   rk
_ _ _ -: +"1e20 1e30 1e40 rk


NB. " on atomic verbs ---------------------------------------------------

(a="2 0 b) -: a=($a)$b               [ a=.o.?2 3 4 5$1e6 [ b=.  ?        1e6
(a="0 2 b) -: (4 5$"1 0 a)=2 3$,:b   [ a=.  ?2 3    $1e6 [ b=.r.?    4 5$1e6
(a="2 0 b) -: (2 3$,:a)=4 5$"1 0 b   [ a=.o.?    4 5$1e6 [ b=.  ?2 3    $2
(a="0 2 b) -: (($b)$a)=b             [ a=.  ?        2   [ b=.  ?2 3 4 5$16

(a="2 1 b) -: a=3&#@,:"2[5#"0 b      [ a=.  ?2 3 4 5$2   [ b=.  ?2   4  $16
(a="1 2 b) -: (5#"0 a)=3&#@,:"2 b    [ a=.  ?2 3 4  $16  [ b=.  ?2   4 5$16
(a="2 1 b) -: (3&#@,:"2 a)=5#"0 b    [ a=.o.?2   4 5$16  [ b=.o.?2 3 4  $16
(a="1 2 b) -: (3&#@,:"2[5#"0 a)=b    [ a=.r.?2   4  $1e6 [ b=.r.?2 3 4 5$2

(a<"2 0 b) -: a<($a)$b               [ a=.?2 3 4 5$1e6 [ b=.?        1e6
(a<"0 2 b) -: (4 5$"1 0 a)<2 3$,:b   [ a=.?2 3    $1e6 [ b=.?    4 5$1e6
(a<"2 0 b) -: (2 3$,:a)<4 5$"1 0 b   [ a=.?    4 5$1e6 [ b=.?2 3    $1e6
(a<"0 2 b) -: (($b)$a)<b             [ a=.?        1e6 [ b=.?2 3 4 5$1e6

(a<"2 1 b) -: a<3&#@,:"2[5#"0 b      [ a=.?2 3 4 5$1e6 [ b=.?2   4  $1e6
(a<"1 2 b) -: (5#"0 a)<3&#@,:"2 b    [ a=.?2 3 4  $1e6 [ b=.?2   4 5$1e6
(a<"2 1 b) -: (3&#@,:"2 a)<5#"0 b    [ a=.?2   4 5$1e6 [ b=.?2 3 4  $1e6
(a<"1 2 b) -: (3&#@,:"2[5#"0 a)<b    [ a=.?2   4  $1e6 [ b=.?2 3 4 5$1e6

(a<."2 0 b) -: a<.($a)$b             [ a=.?2 3 4 5$1e6 [ b=.?        1e6
(a<."0 2 b) -: (4 5$"1 0 a)<.2 3$,:b [ a=.?2 3    $1e6 [ b=.?    4 5$1e6
(a<."2 0 b) -: (2 3$,:a)<.4 5$"1 0 b [ a=.?    4 5$1e6 [ b=.?2 3    $1e6
(a<."0 2 b) -: (($b)$a)<.b           [ a=.?        1e6 [ b=.?2 3 4 5$1e6

(a<."2 1 b) -: a<.3&#@,:"2[5#"0 b    [ a=.?2 3 4 5$1e6 [ b=.?2   4  $1e6
(a<."1 2 b) -: (5#"0 a)<.3&#@,:"2 b  [ a=.?2 3 4  $1e6 [ b=.?2   4 5$1e6
(a<."2 1 b) -: (3&#@,:"2 a)<.5#"0 b  [ a=.?2   4 5$1e6 [ b=.?2 3 4  $1e6
(a<."1 2 b) -: (3&#@,:"2[5#"0 a)<.b  [ a=.?2   4  $1e6 [ b=.?2 3 4 5$1e6

(a<:"2 0 b) -: a<:($a)$b             [ a=.?2 3 4 5$1e6 [ b=.?        1e6
(a<:"0 2 b) -: (4 5$"1 0 a)<:2 3$,:b [ a=.?2 3    $1e6 [ b=.?    4 5$1e6
(a<:"2 0 b) -: (2 3$,:a)<:4 5$"1 0 b [ a=.?    4 5$1e6 [ b=.?2 3    $1e6
(a<:"0 2 b) -: (($b)$a)<:b           [ a=.?        1e6 [ b=.?2 3 4 5$1e6

(a<:"2 1 b) -: a<:3&#@,:"2[5#"0 b    [ a=.?2 3 4 5$1e6 [ b=.?2   4  $1e6
(a<:"1 2 b) -: (5#"0 a)<:3&#@,:"2 b  [ a=.?2 3 4  $1e6 [ b=.?2   4 5$1e6
(a<:"2 1 b) -: (3&#@,:"2 a)<:5#"0 b  [ a=.?2   4 5$1e6 [ b=.?2 3 4  $1e6
(a<:"1 2 b) -: (3&#@,:"2[5#"0 a)<:b  [ a=.?2   4  $1e6 [ b=.?2 3 4 5$1e6

(a>"2 0 b) -: a>($a)$b               [ a=.?2 3 4 5$1e6 [ b=.?        1e6
(a>"0 2 b) -: (4 5$"1 0 a)>2 3$,:b   [ a=.?2 3    $1e6 [ b=.?    4 5$1e6
(a>"2 0 b) -: (2 3$,:a)>4 5$"1 0 b   [ a=.?    4 5$1e6 [ b=.?2 3    $1e6
(a>"0 2 b) -: (($b)$a)>b             [ a=.?        1e6 [ b=.?2 3 4 5$1e6

(a>"2 1 b) -: a>3&#@,:"2[5#"0 b      [ a=.?2 3 4 5$1e6 [ b=.?2   4  $1e6
(a>"1 2 b) -: (5#"0 a)>3&#@,:"2 b    [ a=.?2 3 4  $1e6 [ b=.?2   4 5$1e6
(a>"2 1 b) -: (3&#@,:"2 a)>5#"0 b    [ a=.?2   4 5$1e6 [ b=.?2 3 4  $1e6
(a>"1 2 b) -: (3&#@,:"2[5#"0 a)>b    [ a=.?2   4  $1e6 [ b=.?2 3 4 5$1e6

(a>."2 0 b) -: a>.($a)$b             [ a=.?2 3 4 5$1e6 [ b=.?        1e6
(a>."0 2 b) -: (4 5$"1 0 a)>.2 3$,:b [ a=.?2 3    $1e6 [ b=.?    4 5$1e6
(a>."2 0 b) -: (2 3$,:a)>.4 5$"1 0 b [ a=.?    4 5$1e6 [ b=.?2 3    $1e6
(a>."0 2 b) -: (($b)$a)>.b           [ a=.?        1e6 [ b=.?2 3 4 5$1e6

(a>."2 1 b) -: a>.3&#@,:"2[5#"0 b    [ a=.?2 3 4 5$1e6 [ b=.?2   4  $1e6
(a>."1 2 b) -: (5#"0 a)>.3&#@,:"2 b  [ a=.?2 3 4  $1e6 [ b=.?2   4 5$1e6
(a>."2 1 b) -: (3&#@,:"2 a)>.5#"0 b  [ a=.?2   4 5$1e6 [ b=.?2 3 4  $1e6
(a>."1 2 b) -: (3&#@,:"2[5#"0 a)>.b  [ a=.?2   4  $1e6 [ b=.?2 3 4 5$1e6

(a>:"2 0 b) -: a>:($a)$b             [ a=.?2 3 4 5$1e6 [ b=.?        1e6
(a>:"0 2 b) -: (4 5$"1 0 a)>:2 3$,:b [ a=.?2 3    $1e6 [ b=.?    4 5$1e6
(a>:"2 0 b) -: (2 3$,:a)>:4 5$"1 0 b [ a=.?    4 5$1e6 [ b=.?2 3    $1e6
(a>:"0 2 b) -: (($b)$a)>:b           [ a=.?        1e6 [ b=.?2 3 4 5$1e6

(a>:"2 1 b) -: a>:3&#@,:"2[5#"0 b    [ a=.?2 3 4 5$1e6 [ b=.?2   4  $1e6
(a>:"1 2 b) -: (5#"0 a)>:3&#@,:"2 b  [ a=.?2 3 4  $1e6 [ b=.?2   4 5$1e6
(a>:"2 1 b) -: (3&#@,:"2 a)>:5#"0 b  [ a=.?2   4 5$1e6 [ b=.?2 3 4  $1e6
(a>:"1 2 b) -: (3&#@,:"2[5#"0 a)>:b  [ a=.?2   4  $1e6 [ b=.?2 3 4 5$1e6

(a+"2 0 b) -: a+($a)$b               [ a=.?2 3 4 5$1e6 [ b=.?        1e6
(a+"0 2 b) -: (4 5$"1 0 a)+2 3$,:b   [ a=.?2 3    $1e6 [ b=.?    4 5$1e6
(a+"2 0 b) -: (2 3$,:a)+4 5$"1 0 b   [ a=.?    4 5$1e6 [ b=.?2 3    $1e6
(a+"0 2 b) -: (($b)$a)+b             [ a=.?        1e6 [ b=.?2 3 4 5$1e6

(a+"2 1 b) -: a+3&#@,:"2[5#"0 b      [ a=.?2 3 4 5$1e6 [ b=.?2   4  $1e6
(a+"1 2 b) -: (5#"0 a)+3&#@,:"2 b    [ a=.?2 3 4  $1e6 [ b=.?2   4 5$1e6
(a+"2 1 b) -: (3&#@,:"2 a)+5#"0 b    [ a=.?2   4 5$1e6 [ b=.?2 3 4  $1e6
(a+"1 2 b) -: (3&#@,:"2[5#"0 a)+b    [ a=.?2   4  $1e6 [ b=.?2 3 4 5$1e6

(a*"2 0 b) -: a*($a)$b               [ a=.?2 3 4 5$1e6 [ b=.?        1e6
(a*"0 2 b) -: (4 5$"1 0 a)*2 3$,:b   [ a=.?2 3    $1e6 [ b=.?    4 5$1e6
(a*"2 0 b) -: (2 3$,:a)*4 5$"1 0 b   [ a=.?    4 5$1e6 [ b=.?2 3    $1e6
(a*"0 2 b) -: (($b)$a)*b             [ a=.?        1e6 [ b=.?2 3 4 5$1e6

(a*"2 1 b) -: a*3&#@,:"2[5#"0 b      [ a=.?2 3 4 5$1e6 [ b=.?2   4  $1e6
(a*"1 2 b) -: (5#"0 a)*3&#@,:"2 b    [ a=.?2 3 4  $1e6 [ b=.?2   4 5$1e6
(a*"2 1 b) -: (3&#@,:"2 a)*5#"0 b    [ a=.?2   4 5$1e6 [ b=.?2 3 4  $1e6
(a*"1 2 b) -: (3&#@,:"2[5#"0 a)*b    [ a=.?2   4  $1e6 [ b=.?2 3 4 5$1e6

(a-"2 0 b) -: a-($a)$b               [ a=.?2 3 4 5$1e6 [ b=.?        1e6
(a-"0 2 b) -: (4 5$"1 0 a)-2 3$,:b   [ a=.?2 3    $1e6 [ b=.?    4 5$1e6
(a-"2 0 b) -: (2 3$,:a)-4 5$"1 0 b   [ a=.?    4 5$1e6 [ b=.?2 3    $1e6
(a-"0 2 b) -: (($b)$a)-b             [ a=.?        1e6 [ b=.?2 3 4 5$1e6

(a-"2 1 b) -: a-3&#@,:"2[5#"0 b      [ a=.?2 3 4 5$1e6 [ b=.?2   4  $1e6
(a-"1 2 b) -: (5#"0 a)-3&#@,:"2 b    [ a=.?2 3 4  $1e6 [ b=.?2   4 5$1e6
(a-"2 1 b) -: (3&#@,:"2 a)-5#"0 b    [ a=.?2   4 5$1e6 [ b=.?2 3 4  $1e6
(a-"1 2 b) -: (3&#@,:"2[5#"0 a)-b    [ a=.?2   4  $1e6 [ b=.?2 3 4 5$1e6

(a%"2 0 b) -: a%($a)$b               [ a=.?2 3 4 5$1e6 [ b=.?        1e6
(a%"0 2 b) -: (4 5$"1 0 a)%2 3$,:b   [ a=.?2 3    $1e6 [ b=.?    4 5$1e6
(a%"2 0 b) -: (2 3$,:a)%4 5$"1 0 b   [ a=.?    4 5$1e6 [ b=.?2 3    $1e6
(a%"0 2 b) -: (($b)$a)%b             [ a=.?        1e6 [ b=.?2 3 4 5$1e6

(a%"2 1 b) -: a%3&#@,:"2[5#"0 b      [ a=.?2 3 4 5$1e6 [ b=.?2   4  $1e6
(a%"1 2 b) -: (5#"0 a)%3&#@,:"2 b    [ a=.?2 3 4  $1e6 [ b=.?2   4 5$1e6
(a%"2 1 b) -: (3&#@,:"2 a)%5#"0 b    [ a=.?2   4 5$1e6 [ b=.?2 3 4  $1e6
(a%"1 2 b) -: (3&#@,:"2[5#"0 a)%b    [ a=.?2   4  $1e6 [ b=.?2 3 4 5$1e6

(a%:"2 0 b) -: a%:($a)$b             [ a=.?2 3 4 5$20  [ b=.?        1e6
(a%:"0 2 b) -: (4 5$"1 0 a)%:2 3$,:b [ a=.?2 3    $20  [ b=.?    4 5$1e6
(a%:"2 0 b) -: (2 3$,:a)%:4 5$"1 0 b [ a=.?    4 5$20  [ b=.?2 3    $1e6
(a%:"0 2 b) -: (($b)$a)%:b           [ a=.?        20  [ b=.?2 3 4 5$1e6

(a%:"2 1 b) -: a%:3&#@,:"2[5#"0 b    [ a=.?2 3 4 5$20  [ b=.?2   4  $1e6
(a%:"1 2 b) -: (5#"0 a)%:3&#@,:"2 b  [ a=.?2 3 4  $20  [ b=.?2   4 5$1e6
(a%:"2 1 b) -: (3&#@,:"2 a)%:5#"0 b  [ a=.?2   4 5$20  [ b=.?2 3 4  $1e6
(a%:"1 2 b) -: (3&#@,:"2[5#"0 a)%:b  [ a=.?2   4  $20  [ b=.?2 3 4 5$1e6

(a~:"2 0 b) -: a~:($a)$b             [ a=.o.?2 3 4 5$16 [ b=.  ?        16
(a~:"0 2 b) -: (4 5$"1 0 a)~:2 3$,:b [ a=.  ?2 3    $16 [ b=.r.?    4 5$16
(a~:"2 0 b) -: (2 3$,:a)~:4 5$"1 0 b [ a=.o.?    4 5$16 [ b=.  ?2 3    $2
(a~:"0 2 b) -: (($b)$a)~:b           [ a=.  ?        2  [ b=.  ?2 3 4 5$16

(a~:"2 1 b) -: a~:3&#@,:"2[5#"0 b    [ a=.  ?2 3 4 5$2   [ b=.  ?2   4  $16
(a~:"1 2 b) -: (5#"0 a)~:3&#@,:"2 b  [ a=.  ?2 3 4  $16  [ b=.  ?2   4 5$16
(a~:"2 1 b) -: (3&#@,:"2 a)~:5#"0 b  [ a=.o.?2   4 5$16  [ b=.o.?2 3 4  $16
(a~:"1 2 b) -: (3&#@,:"2[5#"0 a)~:b  [ a=.r.?2   4  $16  [ b=.r.?2 3 4 5$2

(a-"2 0 b) -: i.2 0 4 5   [ a=.?2 0 4 5$16 [ b=.?        16
(a-"0 2 b) -: i.2 0 4 5   [ a=.?2 0    $16 [ b=.?    4 5$16
(a-"2 0 b) -: i.2 0 4 5   [ a=.?    4 5$16 [ b=.?2 0    $16
(a-"0 2 b) -: i.2 0 4 5   [ a=.?        16 [ b=.?2 0 4 5$16

(a-"2 1 b) -: i.2 0 0 5   [ a=.?2 0 0 5$16 [ b=.?2   0  $16
(a-"1 2 b) -: i.2 0 0 5   [ a=.?2 0 0  $16 [ b=.?2   0 5$16
(a-"2 1 b) -: i.2 0 0 5   [ a=.?2   0 5$16 [ b=.?2 0 0  $16
(a-"1 2 b) -: i.2 0 0 5   [ a=.?2   0  $16 [ b=.?2 0 0 5$16

(a-b) -: a-"0 b [ a=.?2 3 4$1e6 [ b=.?2 3 4$1e6
(a-b) -: a-"1 b [ a=.?2 3 4$1e6 [ b=.?2 3 4$1e6
(a-b) -: a-"2 b [ a=.?2 3 4$1e6 [ b=.?2 3 4$1e6
(a-b) -: a-"3 b [ a=.?2 3 4$1e6 [ b=.?2 3 4$1e6
(a-b) -: a-"_ b [ a=.?2 3 4$1e6 [ b=.?2 3 4$1e6

(a-b) -: a-"0 b [ a=.o.?1e6 [ b=.?2 3 4$1e6
(a-b) -: a-"1 b [ a=.o.?1e6 [ b=.?2 3 4$1e6
(a-b) -: a-"2 b [ a=.o.?1e6 [ b=.?2 3 4$1e6
(a-b) -: a-"3 b [ a=.o.?1e6 [ b=.?2 3 4$1e6
(a-b) -: a-"_ b [ a=.o.?1e6 [ b=.?2 3 4$1e6

(b-a) -: b-"0 a [ a=.o.?1e6 [ b=.?2 3 4$1e6
(b-a) -: b-"1 a [ a=.o.?1e6 [ b=.?2 3 4$1e6
(b-a) -: b-"2 a [ a=.o.?1e6 [ b=.?2 3 4$1e6
(b-a) -: b-"3 a [ a=.o.?1e6 [ b=.?2 3 4$1e6
(b-a) -: b-"_ a [ a=.o.?1e6 [ b=.?2 3 4$1e6

(a-"0 _ b) -: (($b)$"1 0 a)-($a)$,:b  [ a=.?3 1 5$1e6 [ b=.?2 7e6
(a-"_ 0 b) -: (($b)$,: a)-($a)$"1 0 b [ a=.?3 1 5$1e6 [ b=.?2 7e6


NB. ="r on non-numerics -------------------------------------------------

(a="2 0 b) -: a=($a)$b               [ a=.a.{~?2 3 4 5$256 [ b=.a.{~?        256
(a="0 2 b) -: (4 5$"1 0 a)=2 3$,:b   [ a=.a.{~?2 3    $256 [ b=.a.{~?    4 5$256
(a="2 0 b) -: (2 3$,:a)=4 5$"1 0 b   [ a=.a.{~?    4 5$256 [ b=.a.{~?2 3    $256
(a="0 2 b) -: (($b)$a)=b             [ a=.a.{~?        256 [ b=.a.{~?2 3 4 5$256

(a="2 1 b) -: a=3&#@,:"2[5#"0 b      [ a=.a.{~?2 3 4 5$256 [ b=.a.{~?2   4  $256
(a="1 2 b) -: (5#"0 a)=3&#@,:"2 b    [ a=.a.{~?2 3 4  $256 [ b=.a.{~?2   4 5$256
(a="2 1 b) -: (3&#@,:"2 a)=5#"0 b    [ a=.a.{~?2   4 5$256 [ b=.a.{~?2 3 4  $256
(a="1 2 b) -: (3&#@,:"2[5#"0 a)=b    [ a=.a.{~?2   4  $256 [ b=.a.{~?2 3 4 5$256

xx=.256$(;:'Cogito, ergo sum.'),(?&.>30$1e6),(<?3 4$100),<3j4

(a="2 0 b) -: a=($a)$b               [ a=.xx{~?2 3 4 5$256 [ b=.xx{~?        256
(a="0 2 b) -: (4 5$"1 0 a)=2 3$,:b   [ a=.xx{~?2 3    $256 [ b=.xx{~?    4 5$256
(a="2 0 b) -: (2 3$,:a)=4 5$"1 0 b   [ a=.xx{~?    4 5$256 [ b=.xx{~?2 3    $256
(a="0 2 b) -: (($b)$a)=b             [ a=.xx{~?        256 [ b=.xx{~?2 3 4 5$256

(a="2 1 b) -: a=3&#@,:"2[5#"0 b      [ a=.xx{~?2 3 4 5$256 [ b=.xx{~?2   4  $256
(a="1 2 b) -: (5#"0 a)=3&#@,:"2 b    [ a=.xx{~?2 3 4  $256 [ b=.xx{~?2   4 5$256
(a="2 1 b) -: (3&#@,:"2 a)=5#"0 b    [ a=.xx{~?2   4 5$256 [ b=.xx{~?2 3 4  $256
(a="1 2 b) -: (3&#@,:"2[5#"0 a)=b    [ a=.xx{~?2   4  $256 [ b=.xx{~?2 3 4 5$256

xx=.256$(;:'Cogito, ergo sum.'),(<!.(?3$5)"1 ?30 2$1e6),(<?3 4$100),<3j4

(a="2 0 b) -: a=($a)$b               [ a=.xx{~?2 3 4 5$256 [ b=.xx{~?        256
(a="0 2 b) -: (4 5$"1 0 a)=2 3$,:b   [ a=.xx{~?2 3    $256 [ b=.xx{~?    4 5$256
(a="2 0 b) -: (2 3$,:a)=4 5$"1 0 b   [ a=.xx{~?    4 5$256 [ b=.xx{~?2 3    $256
(a="0 2 b) -: (($b)$a)=b             [ a=.xx{~?        256 [ b=.xx{~?2 3 4 5$256

(a="2 1 b) -: a=3&#@,:"2[5#"0 b      [ a=.xx{~?2 3 4 5$256 [ b=.xx{~?2   4  $256
(a="1 2 b) -: (5#"0 a)=3&#@,:"2 b    [ a=.xx{~?2 3 4  $256 [ b=.xx{~?2   4 5$256
(a="2 1 b) -: (3&#@,:"2 a)=5#"0 b    [ a=.xx{~?2   4 5$256 [ b=.xx{~?2 3 4  $256
(a="1 2 b) -: (3&#@,:"2[5#"0 a)=b    [ a=.xx{~?2   4  $256 [ b=.xx{~?2 3 4 5$256

(a="2 0 b) -: a=($a)$b               [ a=.xx{~?2 3 4 5$256 [ b=.?        256
(a="0 2 b) -: (4 5$"1 0 a)=2 3$,:b   [ a=.xx{~?2 3    $256 [ b=.?    4 5$256
(a="2 0 b) -: (2 3$,:a)=4 5$"1 0 b   [ a=.xx{~?    4 5$256 [ b=.?2 3    $256
(a="0 2 b) -: (($b)$a)=b             [ a=.xx{~?        256 [ b=.?2 3 4 5$256

(a="2 1 b) -: a=3&#@,:"2[5#"0 b      [ a=.xx{~?2 3 4 5$256 [ b=.?2   4  $256
(a="1 2 b) -: (5#"0 a)=3&#@,:"2 b    [ a=.xx{~?2 3 4  $256 [ b=.?2   4 5$256
(a="2 1 b) -: (3&#@,:"2 a)=5#"0 b    [ a=.xx{~?2   4 5$256 [ b=.?2 3 4  $256
(a="1 2 b) -: (3&#@,:"2[5#"0 a)=b    [ a=.xx{~?2   4  $256 [ b=.?2 3 4 5$256

0 1 0 -: 'abc'='cba'
0 0 0 -: 'abc'=1 2 3
0 0 0 -: 'abc'=<'asdf'
0 0 0 -: (<'asdf')=4 5 6


NB. ~:"r on non-numerics ------------------------------------------------

(a~:"2 0 b) -: a~:($a)$b             [ a=.a.{~?2 3 4 5$256 [ b=.a.{~?        256
(a~:"0 2 b) -: (4 5$"1 0 a)~:2 3$,:b [ a=.a.{~?2 3    $256 [ b=.a.{~?    4 5$256
(a~:"2 0 b) -: (2 3$,:a)~:4 5$"1 0 b [ a=.a.{~?    4 5$256 [ b=.a.{~?2 3    $256
(a~:"0 2 b) -: (($b)$a)~:b           [ a=.a.{~?        256 [ b=.a.{~?2 3 4 5$256

(a~:"2 1 b) -: a~:3&#@,:"2[5#"0 b    [ a=.a.{~?2 3 4 5$256 [ b=.a.{~?2   4  $256
(a~:"1 2 b) -: (5#"0 a)~:3&#@,:"2 b  [ a=.a.{~?2 3 4  $256 [ b=.a.{~?2   4 5$256
(a~:"2 1 b) -: (3&#@,:"2 a)~:5#"0 b  [ a=.a.{~?2   4 5$256 [ b=.a.{~?2 3 4  $256
(a~:"1 2 b) -: (3&#@,:"2[5#"0 a)~:b  [ a=.a.{~?2   4  $256 [ b=.a.{~?2 3 4 5$256

xx=.256$(;:'Cogito, ergo sum.'),(?&.>30$1e6),(<?3 4$100),<3j4

(a~:"2 0 b) -: a~:($a)$b             [ a=.xx{~?2 3 4 5$256 [ b=.xx{~?        256
(a~:"0 2 b) -: (4 5$"1 0 a)~:2 3$,:b [ a=.xx{~?2 3    $256 [ b=.xx{~?    4 5$256
(a~:"2 0 b) -: (2 3$,:a)~:4 5$"1 0 b [ a=.xx{~?    4 5$256 [ b=.xx{~?2 3    $256
(a~:"0 2 b) -: (($b)$a)~:b           [ a=.xx{~?        256 [ b=.xx{~?2 3 4 5$256

(a~:"2 1 b) -: a~:3&#@,:"2[5#"0 b    [ a=.xx{~?2 3 4 5$256 [ b=.xx{~?2   4  $256
(a~:"1 2 b) -: (5#"0 a)~:3&#@,:"2 b  [ a=.xx{~?2 3 4  $256 [ b=.xx{~?2   4 5$256
(a~:"2 1 b) -: (3&#@,:"2 a)~:5#"0 b  [ a=.xx{~?2   4 5$256 [ b=.xx{~?2 3 4  $256
(a~:"1 2 b) -: (3&#@,:"2[5#"0 a)~:b  [ a=.xx{~?2   4  $256 [ b=.xx{~?2 3 4 5$256

xx=.256$(;:'Cogito, ergo sum.'),(<!.(?3$5)"1 ?30 2$1e6),(<?3 4$100),<3j4

(a~:"2 0 b) -: a~:($a)$b             [ a=.xx{~?2 3 4 5$256 [ b=.xx{~?        256
(a~:"0 2 b) -: (4 5$"1 0 a)~:2 3$,:b [ a=.xx{~?2 3    $256 [ b=.xx{~?    4 5$256
(a~:"2 0 b) -: (2 3$,:a)~:4 5$"1 0 b [ a=.xx{~?    4 5$256 [ b=.xx{~?2 3    $256
(a~:"0 2 b) -: (($b)$a)~:b           [ a=.xx{~?        256 [ b=.xx{~?2 3 4 5$256

(a~:"2 1 b) -: a~:3&#@,:"2[5#"0 b    [ a=.xx{~?2 3 4 5$256 [ b=.xx{~?2   4  $256
(a~:"1 2 b) -: (5#"0 a)~:3&#@,:"2 b  [ a=.xx{~?2 3 4  $256 [ b=.xx{~?2   4 5$256
(a~:"2 1 b) -: (3&#@,:"2 a)~:5#"0 b  [ a=.xx{~?2   4 5$256 [ b=.xx{~?2 3 4  $256
(a~:"1 2 b) -: (3&#@,:"2[5#"0 a)~:b  [ a=.xx{~?2   4  $256 [ b=.xx{~?2 3 4 5$256

(a~:"2 0 b) -: a~:($a)$b             [ a=.xx{~?2 3 4 5$256 [ b=.?        256
(a~:"0 2 b) -: (4 5$"1 0 a)~:2 3$,:b [ a=.xx{~?2 3    $256 [ b=.?    4 5$256
(a~:"2 0 b) -: (2 3$,:a)~:4 5$"1 0 b [ a=.xx{~?    4 5$256 [ b=.?2 3    $256
(a~:"0 2 b) -: (($b)$a)~:b           [ a=.xx{~?        256 [ b=.?2 3 4 5$256

(a~:"2 1 b) -: a~:3&#@,:"2[5#"0 b    [ a=.xx{~?2 3 4 5$256 [ b=.?2   4  $256
(a~:"1 2 b) -: (5#"0 a)~:3&#@,:"2 b  [ a=.xx{~?2 3 4  $256 [ b=.?2   4 5$256
(a~:"2 1 b) -: (3&#@,:"2 a)~:5#"0 b  [ a=.xx{~?2   4 5$256 [ b=.?2 3 4  $256
(a~:"1 2 b) -: (3&#@,:"2[5#"0 a)~:b  [ a=.xx{~?2   4  $256 [ b=.?2 3 4 5$256

1 0 1 -: 'abc'~:'cba'
1 1 1 -: 'abc'~:1 2 3
1 1 1 -: 'abc'~:<'asdf'
1 1 1 -: (<'asdf')~:4 5 6