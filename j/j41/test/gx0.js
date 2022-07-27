NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 0!: -----------------------------------------------------------------

host    =. 0!:0
hostne  =. 0!:1
script  =. 0!:2
sscript =. 0!:3
lines   =. 0!:4
slines  =. 0!:5
off     =. 0!:55

read    =. 1!:1
write   =. 1!:2
erase   =. 1!:55

nul     =. 0{a.
lf      =. 10{a.
cr      =. 13{a.
crlf    =. cr,lf
mtv     =. ''

readx   =. -.&crlf@read

f0 =. <'f0',(":?+:+/6!:0 ''),'.tmp'
f1 =. <'f1',(":?+:+/6!:0 ''),'.tmp'
f2 =. <'f2',(":?+:+/6!:0 ''),'.tmp'

'' -: f0 slines '3+4',crlf,'#''Cogito, ergo sum.'''
(readx f0) -: '   3+4',nul,'7','   #''Cogito, ergo sum.''',nul,'17'
'' -: f1 sscript f0
'' -: f2 slines  read f0
(read f0) -: read f1
(read f0) -: read f2
erase f0,f1,f2

'' -: f0 slines 'i.2 3 4'
(readx f0) -: '   i.2 3 4',(,{.t),nul,,{:t=.nul,"1":i.2 3 4
'' -: f1 sscript f0
'' -: f2 slines  read f0
(read f0) -: read f1
(read f0) -: read f2
erase f0,f1,f2

'' -: f0 slines 'i.2 2 2 2 2 2'
'' -: f1 sscript f0
'' -: f2 slines  read f0
(read f0) -: read f1
(read f0) -: read f2
erase f0,f1,f2

'' -: f0 slines ''
(readx f0) -: ''
'' -: f1 sscript f0
'' -: f2 slines  read f0
(read f0) -: read f1
(read f0) -: read f2
erase f0,f1,f2

'' -: f0 slines 20$' '
(readx f0) -: '   '
'' -: f1 sscript f0
'' -: f2 slines  read f0
(read f0) -: read f1
(read f0) -: read f2
erase f0,f1,f2

l0  =. 'i.20',crlf,'mtv -: f1 slines l1',crlf,'i.20'
l1  =. 'i.21',crlf,'mtv -: f2 slines l2',crlf,'i.21'
l2  =. 'i.22'
'' -: f0 slines l0
(readx f0) -: t,'   mtv -: f1 slines l1',nul,'1',t=.'   i.20',nul,":i.20
(readx f1) -: t,'   mtv -: f2 slines l2',nul,'1',t=.'   i.21',nul,":i.21
(readx f2) -: '   i.22',nul,":i.22
erase f0,f1,f2

l0  =. 'i.20',crlf,'mtv -: f0 slines l1',crlf,'o.i.40'
l1  =. 'i.21',crlf,'mtv -: f0 slines l2',crlf,'o.i.41'
l2  =. 'i.22'
t=.''
t=.t,'   i.20',nul,":i.20
t=.t,'   mtv -: f0 slines l1'
t=.t,'   i.21',nul,":i.21
t=.t,'   mtv -: f0 slines l2'
t=.t,'   i.22',nul,":i.22
t=.t,nul,'1','   o.i.41',nul,":o.i.41
t=.t,nul,'1','   o.i.40',nul,":o.i.40
'' -: f0 slines l0
t  -: readx f0
erase f0
