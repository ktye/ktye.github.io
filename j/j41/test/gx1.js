NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 1!: -----------------------------------------------------------------

type   =. 3!:0
read   =. 1!:1
write  =. 1!:2
append =. 1!:3
size   =. 1!:4
erase  =. 1!:55

t =. a.,":?~300
'' -: t write <'junkfoo'
t =. read <'junkfoo'
1    -: #$t
2    -: type t
(#t) -: size <'junkfoo'

'' -: (|.t) write <'oofknuj'
(#t) =  size 'junkfoo';'oofknuj'
x =. read <'oofknuj'
x -: |.t

'' -: t append <'oofknuj'
(2*#t) = size <'oofknuj'
x =. read <'oofknuj'
x -: (|.t),t

erase 'junkfoo';'oofknuj'


NB. 1!: terminal input/output -------------------------------------------

in  =. 1!:1
out =. 1!:2&2

out '1 1  1   1'     NB. two identical lines of output
t =. in 1
1   1  1 1
t -: '1   1  1 1'
t =. in 1
1
t -: ,'1'
