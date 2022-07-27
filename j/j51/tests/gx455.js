NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 4!:55 ---------------------------------------------------------------

nc =. 4!:0
nl =. 4!:1
ex =. 4!:55

a    =.'abc'
plus =. 3+4
nm   =. 'a';'plus'
f    =. ('a=.9'; 'plus=.+'; 'ex nm'; 'nc nm') : ''
2 2 -: nc nm
0 0 -: f 0
2 2 -: nc nm
1 1 -: ex nm
0 0 -: nc nm

f =. t : t =. 'y=.y.'; 'b=.nc y'; 'ex y'; 'a=.nc y'; 'b,a'
2 0 -: f <'y.'
0 0 -: f <'x.'
2 0 -: 2 f <'y.'
2 0 -: 2 f <'x.'
1   -:   f <'$.'
1   -: 2 f <'$.'

noun =. 2
verb =. +/ . *
adv  =. /
conj =. .
2 3 4 5 -: nc 'noun';'verb';'adv';'conj'
1 1 1 1 -: ex 'noun';'verb';'adv';'conj'
0 0 0 0 -: nc 'noun';'verb';'adv';'conj'

a =. 9
1 1 0 0 1 0 -: ex 'a'; 'undef'; 'in+valid'; '8.'; 'qq:'; 'a.'
