NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 9!:2 and 9!:3 -------------------------------------------------------

dispq =. 9!:2
disps =. 9!:3

nub =. (i.@# = i.~) # ]

NB. pairs of identical displays follow:

disps 1
nub
5!:1 <'nub'

disps 2
nub
5!:2 <'nub'

disps 3
nub
5!:3 <'nub'

disps 4
nub
5!:4 <'nub'

disps 5
nub
5!:5 <'nub'

disps 2
(,2) -: dispq ''
