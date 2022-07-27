NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 0!:0 tests for PC DOS -----------------------------------------------

host  =. 0!:0
read  =. 1!:1
write =. 1!:2
erase =. 1!:55

0<#host 'dir *'
x  =.":?30$1000
ff =. 'jhost00.xxx'
x write <ff
(read <ff) -: host 'type ',ff
erase <ff


NB. 0!:0 tests for UNIX -------------------------------------------------

host  =. 0!:0
read  =. 1!:1
write =. 1!:2
erase =. 1!:55

0<#host 'ls *'
x  =.":?30$1000
ff =. 'jhost00.xxx'
x write <ff
(read <ff) -: host 'cat ',ff
erase <ff
