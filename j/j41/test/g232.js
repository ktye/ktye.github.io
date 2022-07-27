NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. |: ------------------------------------------------------------------

pfill =. (i.@[ -. |) , |
mask  =. =/ i.@>:@(>./)
vec   =. >@{@:(i.&.>)@((<./ .+) _&*@-.)
ind   =. vec +/ .*  (#. |:)
canta =. ($@] ind mask@[) { ,@]

en    =. - #@;
ci    =. (/:@pfill ;) { i.@en , en + (#&> # i.@#)@]
cant2 =. (#@$@] ci [) canta ]

cant1 =. i.@-@#@$ |: ]

t =. 0 0$0
t =. t, 'a =. (#$y.) pfill x.'
t =. t, 'z =. 1'
t =. t, 'z =. z *. (x.|:y.) -: a|:y.'
t =. t, 'z =. z *. (x.|:y.) -: (+&.>x.)|:y.'
t =. t, 'z =. z *. ($x.|:y.) -: a{$y.'
vfy =. '' : t


x =. a.{~?(?~5)$256
(|:x) -: (|.i.$$x)|:x
x     -: ''|:x
x     -: _1|:x
0 1     vfy x
(?~#$x) vfy x

NB. Boolean
((?#$a)?#$a) vfy a =. 1=?(4?6)$2
(|: -: cant1) a

NB. literal
((?#$a)?#$a) vfy a =. a.{~?(4?6)$256
(|: -: cant1) a

NB. integer
((?#$a)?#$a) vfy a =. ?(4?6)$111256
(|: -: cant1) a

NB. floating point
((?#$a)?#$a) vfy a =. o.?(4?6)$111256
(|: -: cant1) a

NB. complex
((?#$a)?#$a) vfy a =. ^0j1*?(4?6)$111
(|: -: cant1) a

NB. boxed
x =. (+&.>?20$100), ;:'((?#$a)?#$a) vfy a =. ^0j1*?(4?6)$111'
((?#$a)?#$a) vfy a =. x{~?(4?6)$#x
(|: -: cant1) a

id0 =. =&i.
id1 =. 1: (<0 1)&|:@i.@$@]} ($&0)&(,~)
(id0 4) -: id1 4
(id0 0) -: id1 0
(id0 7) -: id1 7

t -: |: t=.'a'
t -: |: t=.9
t -: |: t=.3j4
t -: |: t=.<i.3 4

t -: ''|: t=.'a'
t -: ''|: t=.9
t -: ''|: t=.3j4
t -: ''|: t=.<i.3 4


NB. |: on matrices ------------------------------------------------------

ci   =. i.@{: +/ {: * i.@{.
cant =. ci@$ { ,

NB. Boolean
(    |: -: cant) 1=?50 45$2
(1 0&|: -: cant) 1=?40 60$2
(|: -: cant) 1=?1 100$2
(|: -: cant) 1=?100 0$2

NB. literal
(  |: -: cant) (?45 45$#a){a=.'foo upon thee 1=?10 20$2'
(0&|: -: cant) (?10 200$#a){a
(|: -: cant) (?400 1$#a){a
(|: -: cant) (?0 1000$#a){a

NB. integer
(    |: -: cant) ?50 50$212341
(1 0&|: -: cant) ?60 45$212341
(|: -: cant) ?400 1$123541
(|: -: cant) ?0 1000$123456

NB. floating point
(  |: -: cant) o.?35 35$212341
(0&|: -: cant) o.?30 40$212341
(|: -: cant) o.?1 400$123541
(|: -: cant) o.?100 0$123456

NB. complex
(    |: -: cant) ^0j1*?30 25$21234
(1 0&|: -: cant) ^0j1*?25 25$21234
(|: -: cant) ^0j1*?1 256$1235
(|: -: cant) ^0j1*?127 0$1234

NB. boxed
(  |: -: cant) (?30 25$#x){x=.;:'Cogito, ergo sum. $212 341 CBC News'
(0&|: -: cant) (?30 30$#x){x
(|: -: cant) (?255 1$#x){x
(|: -: cant) (?0 0$#x){x
