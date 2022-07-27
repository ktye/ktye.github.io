NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 128!:0 and 128!:1 ---------------------------------------------------

a  =. j.&:?~ 9 5$100
qr =. 128!:0 a
q =. >0{qr
r =. >1{qr

($q) -: $a
($r) -: 2$1{$a

i =. =i.#r
a -: q +/ . * r
1e_15>>./|,i - (+|:q) +/ . * q
*./,(|*r)<:<:/~i.#r

s =. 128!:1 r
($r) -: $s
1e_15>>./|,i-r +/ . * s
