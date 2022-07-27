NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 4!:55 ---------------------------------------------------------------

nc =. 4!:0
nl =. 4!:1
ex =. 4!:55

noun =. 2
verb =. +/ . *
adv  =. /
conj =. .
nm   =. ;:'noun verb adv conj'
f    =. ('".y.'; 'b=.nc nm'; 'ex nm'; 'a=.nc nm'; 'b,a') : ''
2 3 4 5 -: nc nm
3 3 3 3 0 0 0 0 -: f '(noun=.verb=.adv=.conj=.*) 12'
2 3 4 5 -: nc nm
2 2 3 5 0 0 0 0 -: f '(adv=.*) noun=.verb=.12'
2 3 4 0 -: nc nm
2 2 4 0 0 0 0 0 -: f 'noun=.verb=.12'
2 3 0 0 -: nc nm
5 3 0 0 0 0 0 0 -: f '3(noun=. &)+ 4'
2 0 0 0 -: nc nm
2 0 0 0 0 0 0 0 -: f '12'
0 0 0 0 -: nc nm

g =. t : t =. 'y=.y.'; 'b=.nc y'; 'ex y'; 'a=.nc y'; 'b,a'
2 0 -:   g <'y.'
0 0 -:   g <'x.'
2 0 -: 2 g <'y.'
2 0 -: 2 g <'x.'
1   -:   g <'$.'
1   -: 2 g <'$.'

noun =. 2
verb =. +/ . *
adv  =. /
conj =. .
2 3 4 5 0 -: nc ;:'noun verb adv conj undef'
1 1 1 1 1 -: ex ;:'noun verb adv conj undef'
0 0 0 0 0 -: nc ;:'noun verb adv conj undef'

a =. 9
1 1 0 0 1 0 -: ex 'a'; 'undef'; 'in+valid'; '8.'; 'qq:'; 'a.'


NB. 4!:55 and 4!:56 -----------------------------------------------------

ex  =. 4!:55
exg =. 4!:56

alpha  =. i.3 4
beta: =. ;:'Cogito, ergo sum.'
gamma  =. !

1 0 1 1 0 0 -: ex  ;:'alpha beta: boo hoo: + +:'
1 0 1 1 0 0 -: exg ;:'beta: gamma boo hoo: + +:'
