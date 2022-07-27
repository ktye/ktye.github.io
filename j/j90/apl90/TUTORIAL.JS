'J Tutorial'

nul=.0{a.
lf=.10{a.
cr=.13{a.
eof=.26{a.
qu=.''''

read=.1!:1
pr=.1!:2&2
uncap=.'((a.,~a.{~65+i.26)i.y.){a.,~a.{~97+i.26'::''

t=.0 0$''
t=.t,'x=.(read y.)-.nul,lf,eof'
t=.t,'x=.lf (xe.cr)&#}x'
t=.t,'b=.(#x){.3}.(_3}.xe.''_'')*.3}.xe.''{'''
t=.t,'x=.b <;.1 x'
t=.t,'_1}.">(>:xi.&>lf)}.">x'
frames=.t::''

t=.0 0$''
t=.t,'   J Tutorial'
t=.t,'-------------------------------------------'
t=.t,'Enter      Effects'
t=.t,'-------------------------------------------'
t=.t,'(cr)       Exit'
t=.t,'?          This note'
t=.t,'??         Table of contents'
t=.t,'(space)    Next frame'
t=.t,'x          Select a particular frame'
t=.t,'           (e.g. E selects Classifications)'
help=.t

t=.0 0$''
t=.t,'pr ''Initializing ...'''
t=.t,'f=.(frames <''tuta.js''),frames <''tutb.js'''
t=.t,'d=.uncap (|.~ '' ''&=&{.)&(30 31&{)&>f'
t=.t,'i=.0 }: n=.#f'
t=.t,'pr help'
t=.t,'$.=.5,~6+(3 2$''...???'')i._2{.''..'',x=.uncap read 1'
t=.t,'$.=.$0'
t=.t,'pr help'
t=.t,'pr (j{.x),"1 ''   '',"1 (j=.2%~#x)}.x=.(32{.&>f),(2|n,1)$'' '''
t=.t,'i=.n|>:i }: pr>i{f }: i=.+/(0 1=n>j)*i,j=.((1>.#x){."1 d)i.x'
tutorial=.t::''
