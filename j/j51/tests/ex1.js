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

size  <'J9k8L7m6'         NB. interface error 

read   'ab'               NB. domain error 
'abc' write  'ab'         NB. domain error 
'abc' append 'ab'         NB. domain error 
size   'ab'               NB. domain error 
erase  'ab'               NB. domain error 

read   0                  NB. domain error 
'abc' write  0            NB. domain error 
'abc' append 0            NB. domain error 
size   0                  NB. domain error 
erase  0                  NB. domain error 

'abc' write  1            NB. domain error 
'abc' append 1            NB. domain error 
size   1                  NB. domain error 
erase  1                  NB. domain error 

read   2                  NB. domain error 
size   2                  NB. domain error 
erase  2                  NB. domain error 

read   34                 NB. domain error 
'abc' write  34           NB. domain error 
'abc' append 34           NB. domain error 
size   34                 NB. domain error 
erase  34                 NB. domain error 

read   3.5                NB. domain error 
'abc' write  3.5          NB. domain error 
'abc' append 3.5          NB. domain error 
size   3.5                NB. domain error 
erase  3.5                NB. domain error 

read   3j5                NB. domain error 
'abc' write  3j5          NB. domain error 
'abc' append 3j5          NB. domain error 
size   3j5                NB. domain error 
erase  3j5                NB. domain error 

read  <1                  NB. domain error 
'abc' write <1            NB. domain error 
'abc' append<1            NB. domain error 
size  <1                  NB. domain error 
erase <1                  NB. domain error 

read  <34                 NB. domain error 
'abc' write <34           NB. domain error 
'abc' append<34           NB. domain error 
size  <34                 NB. domain error 
erase <34                 NB. domain error 

read  <3.5                NB. domain error 
'abc' write <3.5          NB. domain error 
'abc' append<3.5          NB. domain error 
size  <3.5                NB. domain error 
erase <3.5                NB. domain error 

read  <3j5                NB. domain error 
'abc' write <3j5          NB. domain error 
'abc' append<3j5          NB. domain error 
size  <3j5                NB. domain error 
erase <3j5                NB. domain error 

read  <3 4$'a'            NB. rank error 
'abc' write <3 4$'a'      NB. rank error 
'abc' append<3 4$'a'      NB. rank error 
size  <3 4$'a'            NB. rank error 
erase <3 4$'a'            NB. rank error 

read  <''                 NB. length error 
'abc' write <''           NB. length error 
'abc' append<''           NB. length error 
size  <''                 NB. length error 
erase <''                 NB. length error 

1     write <'abc'        NB. domain error 
3     write <'abc'        NB. domain error 
3.4   write <'abc'        NB. domain error 
3j4   write <'abc'        NB. domain error 
(<'a')write <'abc'        NB. domain error 

1     append<'abc'        NB. domain error 
3     append<'abc'        NB. domain error 
3.4   append<'abc'        NB. domain error 
3j4   append<'abc'        NB. domain error 
(<'a')append<'abc'        NB. domain error 

(3 4$'a') write <'abc'    NB. rank error
(3 4$'a') append<'abc'    NB. rank error
