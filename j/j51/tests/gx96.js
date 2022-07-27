NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 9!:6 and 9!:7 -------------------------------------------------------

boxq =. 9 !: 6
boxs =. 9 !: 7

old =. boxq ''
(11=$old) *. *./ old e. a.
'' -: boxs '0123456789?'
'0?29a96?8' -: ,":<'a'
'' -: boxs old
