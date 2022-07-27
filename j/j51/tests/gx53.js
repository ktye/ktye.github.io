NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 5!:3 ----------------------------------------------------------------

type =. 3!:0
nc   =. 4!:0
ar   =. 5!:1
sr   =. 5!:3

nt   =. >@({&(;:'n c n n n xb xk'))@(1 2 4 8 16 32 64&i.)@type
rs   =. (' '&,)@(,&' ')@":@($&$,$)
elem =. (;@:('-'&sn&.>))`(;@:('-'&sn&.>)@:(<@(>!._),<@>))`(":@,)@. (32 64&i.@type)
sn   =. (,~ ":&#) @ (nt@],[,(rs,elem)@])
st   =. ('x'&,@({&'   vac')@nc)`(nt@".@>) @. (2&=@nc)
val  =. (>@ar)`(".&>) @. (2&=@nc)
upfx =. }.~ >:@(<./)@(i.&'cnbk')
wsis =. (,~ ":&#) @ (st , > upfx@sn val)

t=.0 0$''
t=.t,'k=.((10{.y.)e.''0123456789'')i.0'
t=.t,'(0<k)*.((".k{.y.)=(#y.)-k)*.((k{y.)e.''cnx'')*.2=type y.'
vfy =. t : ''

vfysr =. '(vfy t) *. (wsis y.) -: t=.sr y.':''

NB. Boolean
vfysr <'a' [ a=.1=?2 3$2
vfysr <'a' [ a=.4 0 3$0
vfysr <'a' [ a=.1

NB. literal
vfysr <'a' [ a=.(?3 5$#a.){a.
vfysr <'a' [ a=.4 0 3$'a'
vfysr <'a' [ a=.'$'
vfysr <'a' [ a=.''''

NB. integer
vfysr <'a' [ a=.?2 3 4$12354
vfysr <'a' [ a=.4 0 3$9
vfysr <'a' [ a=._12

NB. floating point
vfysr <'a' [ a=.o.?2 5$123
vfysr <'a' [ a=.4 0 3$^4
vfysr <'a' [ a=.1.2345e_22

NB. complex
vfysr <'a' [ a=.^0j1*?15$12
vfysr <'a' [ a=.0 3$4j5
vfysr <'a' [ a=.3j_4.5e_6

NB. boxed
t=.(+&.>?5$10),;:'Cogito, ergo sum.'
vfysr <'a' [ a=.(?2 3$#t){t
vfysr <'a' [ a=.0 0 0$t
vfysr <'a' [ a=.<<<'Ich liebe dich.'

NB. boxed with key
bk=.'' : '<!.x. y.'
vfysr <'a' [ a=.<!.'abc' 9999
vfysr <'a' [ a=.(?3 4$1e6) bk"0 i.3 4
vfysr <'a' [ a=.(?3 4$1e6) bk"1 0 i.3 4
vfysr <'a' [ a=.(?3 4$1e6) bk"0 1 ;:'Cogito ergo sum'

vfysr <'sr'
vfysr <'nc'
vfysr <'wsis'
vfysr <'sum'  [. sum  =. +/
vfysr <'mean' [. mean =. +/ % #
vfysr <'int'  [. int  =. =<.
vfysr <'f'    [. f=.+/  : *
vfysr <'f'    [. f=.+/  : 'x.'
vfysr <'f'    [. f=.'y.': *
vfysr <'f'    [. f=.'y.': 'x.'

adv=./
vfysr <'adv'

conj=. :
vfysr <'conj'

(sr <'xx') -: 'x' (t i.'.')}t=.sr <'x.' [. x.=.xx=. i.3 4
(sr <'yy') -: 'y' (t i.'.')}t=.sr <'y.' [. y.=.yy=. +/ \.
