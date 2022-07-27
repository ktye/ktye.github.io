NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. ". ------------------------------------------------------------------

p  -: (".'p=.20?20')
'' -: ".''
'' -: ".'        '

msg =. 'error in right argument'
msg -: 'msg'".'3+<3'

x =. >'i.4' ; 'o.5 6 7'; '%:_2 10'
y =. >'3+<3'; '^1'     ; '9{''ab'''
(".&>(0{x);(1{y);2{x) -: x".y
(>3 1 4;(^1);3 1 4)   -: '3 1 4'".y
1990 1990 1990        -: x".'1990'
(".x)                 -: x".'3+<3'
