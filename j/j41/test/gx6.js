NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 6!: -----------------------------------------------------------------

ts   =. 6!:0
tss  =. 6!:1
time =. 6!:2
dl   =. 6!:3

t =. ts ''
6 = $t
(-: <.) 5{.t
*./0<:t
1990<:0{t
*./ (1&<: *. <:&12 31) 1 2{t
24 60 60 *./ . > 3 4 5{t

0.5>|(t-~tss '')-[dl 5 [ t=.tss ''

0<:time 't=.+/i.5000'
t -: +/i.5000
0.5>|5-time 'dl 5'
