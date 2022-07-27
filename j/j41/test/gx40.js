NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 4!:0 ----------------------------------------------------------------

nc =. 4!:0
nl =. 4!:1
ex =. 4!:55

a     =.'abc'
plus  =. 3+4
f     =. ('a=.9'; 'plus=.+'; 'nc ''a'';''plus''') : ''
2 2   -: nc 'a';'plus'
2 3   -: f 0
2 3 2 -: nc 'a';'f';'a'
3 3   -: nc 'nl';'nc'

nm =. ;:'$. x. y.'
2 0 2 -:     'nc nm' : '' 8
2 2 2 -:   7 '' : 'nc nm' 8
2 3 0 -:   +  'nc nm' : 1
2 2 0 -: 'a'  'nc nm' : 1
2 3 3 -:   +  'nc nm' : 2 -
2 3 2 -:   +  'nc nm' : 2 'b'
2 2 3 -: 'b'  'nc nm' : 2 -
2 2 2 -: 'a'  'nc nm' : 2 'b'

_1 _1 _1 -: nc <;._1 ' 9 +-1aber *'
0        -: nc <'asflkjasasdf'

noun =. 2
verb =. +/ . *
adv  =. /
conj =. .
2 3 4 5 -: nc 'noun';'verb';'adv';'conj'
ex 'verb';'conj'
2 0 4 0 -: nc 'noun';'verb';'adv';'conj'

_1 _1 _1 -: nc 'abc'
_1       -: nc 1
_1 _1    -: nc 1 2
_1 _1    -: nc 3 3.5
_1       -: nc 3j4
2 _1     -: nc 'a';1     [ a=.3
2 _1     -: nc 'a';1 2
2 _1     -: nc 'a';3 3.5
2 _1     -: nc 'a';3j4
_1       -: nc <<'ab'
_1       -: nc <3 4$'a'
(3 4$_1) -: nc i.3 4
(3 4$_1) -: nc +&.>i.3 4
