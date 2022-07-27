NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 4!:1 ----------------------------------------------------------------

nc   =. 4!:0
nl   =. 4!:1
ex   =. 4!:55
type =. 3!:0

noun =. 2
verb =. +/ . *
adv  =. /
conj =. .
(<'noun') e. nl 2
(<'verb') e. nl 3
(<'adv' ) e. nl 4
(<'conj') e. nl 5
(;:'noun verb adv conj') e. nl >:i.5
(;:'noun verb adv conj') e. a. nl >:i.5
(;:'noun verb')    e. 'nv' nl >:i.5
(;:'adv conj' ) -.@e. 'nv' nl >:i.5
ex 'verb';'conj'
(;:'verb conj') -.@e. nl >:i.5
(;:'noun adv' )    e. nl >:i.5

(<'y.'   ) e.   'nl 2' : '' 9
(;:'x.y.') e. 8 '' : 'nl 2' 9

(<'x.'   ) e.   + 'nl 3' : 1
(<'x.'   ) e. 'a' 'nl 2' : 1
(;:'x.y.') e.   + 'nl 3' : 2 -
(<'x.'   ) e. 'a' 'nl 2' : 2 -
(<'y.'   ) e.   + 'nl 2' : 2 'b'

t =. nl >:i.5
1 = #$t
32 -: type <'t'
*./ 2  =  type&>t
*./ 1  =  #&$&>t
t  -: t/:>t
*./ (nc t) e. >:i.5
