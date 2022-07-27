NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 9!:8 and 9!:9 -------------------------------------------------------

evmq =. 9!:8
evms =. 9!:9
type =. 3!:0

t =. evmq ''
1  -: #$t
32 -: type t
*./ 1 = #&$&>t
*./ 2 = type&>t
