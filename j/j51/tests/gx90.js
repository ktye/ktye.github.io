NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 9!:0 and 9!:1 -------------------------------------------------------

rlq =. 9!:0
rls =. 9!:1

1 [ rls 7^5
(7^5) -: rlq ''
a =. ?$~100
b =. ?$~100
1 [ rls 7^5
(7^5) -: rlq ''
c =. ?$~100
-. a -: b
a -: c
