NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 6!: -----------------------------------------------------------------

ts   =. 6!:0
tss  =. 6!:1
time =. 6!:2
dl   =. 6!:3

time 0 1                  NB. domain error
time 3 4 _5               NB. domain error
time 3j4                  NB. domain error
time 3;4 5                NB. domain error

'j'   time '3+4'          NB. domain error
3.4   time '3+4'          NB. domain error
3j4   time '3+4'          NB. domain error
(1;2) time '3+4'          NB. domain error
(<!.'a' 5) time '3+4'     NB. domain error

dl '5'                    NB. domain error
dl 3j4                    NB. domain error
dl <5                     NB. domain error
dl <!.5 (9)               NB. domain error
