NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 5!:5 nouns ----------------------------------------------------------

f    =. '5!:5<''y.''':''
test =. [ -: ".@f

test ''
test 0 1$''
test 1 0$''
test 0 3 4$'abc'
test 4 3 2 4 9 0 3 4$'Cogito, ergo sum.'
test 'j'
test ,'j'
test 5$'j'
test 13$'j'
test ''''
test ,''''
test 5$''''
test 13$''''
test 'sui generis'
test 'Don''t tread on me!'
test 1 1$'j'
test 1 3$'row'
test 6 1$'column'
test 2 3$'j'
test 1 13$'j'
test 13 1$'j'
test 6 12$'j'
test 2 3$''''
test 1 13$''''
test 13 1$''''
test 6 13$''''
test 3 7$'Opposable thumbs'
test 6 13$'Don''t tread on me!'
test 2 3 4$'j'
test 2 3 4$''''
test 2 3 4$'Don''t tread on me!'
test (?2 3 4 5$#a.){a.
test 5!:4 <'test'
test 5!:5 <'test'
test 5!:4 <'f'
test 5!:5 <'f'

test 0
test i.0
test i.1 0
test i.0 1
test i.0 3 4 0
test 3j4
test ,_123
test _123 2 3 4
test 0 _1.2e_3j_4.5e_6 7 8 9 0 _8
test 5$183164
test 13$183164
test ?13$183164
test ?2 3$183164
test ?1 1$183164
test ?1 7$183164
test ?7 1$183164
test o.i.3 4
test o.i.-4 5
test r.?2 3 4$10

test 0$<''
test 0 1$<'abc'
test 1 0$<'abc'
test 0 3 4 5 0$<'abc'
test <''
test <'j'
test <,'j'
test ,<'foobar'
test ;:'Cogito, ergo sum.'
test '' ;;:'sui generis'
test 'f';;:'sui generis'
test ,&.>'f';;:'sui generis'
test 'Opposable';'thumbs'
test 'Opposable';'thumbs '
test 2 3$'foobar';?2 3$183164
test 5!:1<'test'
test 5!:2<'test'
test 5!:1<'f'
test 5!:2<'f'

boxk =. '' : '<!.x. y.'
test <!.'what' ?2 3$1e5
test ,<!.(?2 3$1e5) 'now?'
test (<3j4),<!.(?1e5) 'Ich liebe dich'
test (?2 3 4$1e5) boxk"1 0?2 3$1e9


NB. 5!:5 ----------------------------------------------------------------

ar   =. 5!:1
test =. ('f=.+(5!:5 y.) :1'; '(ar y.) -: ar <''f''') : '' " 0

test <'f' [. f=. +
test <'f' [. f=. +.
test <'f' [. f=. +:
test <'f' [. f=. j.
test <'f' [. f=. 0:
test <'f' [. f=. f
test <'f' [. f=. +/
test <'f' [. f=. +./
test <'f' [. f=. +/ .*
test <'f' [. f=. 3&$
test <'f' [. f=. ,&(3 4$'asdf')
test <'f' [. f=. 3&$ @ (,&(3 4$'asdf'))
test <'f' [. f=. 3&$ @  ,&(3 4$'asdf')
test <'f' [. f=. 'foo y.':''
test <'f' [. f=. '':'x. bar y.'
test <'f' [. f=. 'foo y.':'x. bar y.'
test <'f' [. f=. 'foo y.':'bar y.':('goo x.';'^x.')
test <'test'

f=.+ [. g=.- [. f3=.$
test <'f' [. f=. + %
test <'f' [. f=. +&(3) 4&*
test <'f' [. f=. f g
test <'f' [. f=. f3 g
test <'f' [. f=. +(*#)
test <'f' [. f=. +(*#-)
test <'f' [. f=. (+-) (*%)
test <'f' [. f=. (+-) (*%#)

f=.+ [. g=.- [. h=.$
test <'f' [. f=. +-*
test <'f' [. f=. (+&3) 4&- *
test <'f' [. f=. + (-&4) 5&*
test <'f' [. f=. f g %
test <'f' [. f=. % f g
test <'f' [. f=. f g h
test <'f' [. f=. f g h f
test <'f' [. f=. f g h f g
test <'f' [. f=. f g h f g h
test <'f' [. f=. (f g h) f g
test <'f' [. f=. (f g  ) f g
test <'f' [. f=. (f g h) f g h
test <'f' [. f=. (f g  ) f g h
test <'f' [. f=. (+-*) % #
test <'f' [. f=. (+ *) % #
test <'f' [. f=. + (-#*) %
test <'f' [. f=. + (- *) %
test <'f' [. f=. + - (*%#)
test <'f' [. f=. + - (* #)
test <'f' [. f=. (+=-) (*,%) ($;#)
test <'f' [. f=. (+ -) (* %) ($ #)

test <'f' [. f=. +`-`*@.i.
test <'f' [. f=. +/`(-&.+)`(%/\.)@.(i.@])
test <'f' [. f=. (+%)`(-&.+)`(%/\.)@.(i.@])
test <'f' [. f=. (+-*)`(-&.+)`(%/\.)@.(i.@])

test <'a' [. (+ a=. / )
test <'a' [. (+ a=. /.)

test <'c' [. (+ (c=. . ) -)
test <'c' [. (+ (c=. : ) -)
test <'c' [. (+ (c=. ..) -)
test <'c' [. (+ (c=. .:) -)
test <'c' [. (+ (c=. &.) -)

test <'a' [. (+ a=. `]           )
test <'a' [. (+ a=. `(+/ .* )    )
test <'a' [. (+ a=. `(+/%#)      )
test <'a' [. (+ a=. `(+/`%`#)    )
test <'a' [. (+ a=. *`           )
test <'a' [. (+ a=. +/ .*`       )
test <'a' [. (+ a=. (+/%#)`      )
test <'a' [. (+ a=. +/`%`#`      )
test <'a' [. (+ a=. (+% )`$`#`   )
test <'a' [. (+ a=. (+-*)`$`#`   )
test <'a' [. (+ a=. +/`%`#@.     )
test <'a' [. (+ a=. (+% )`*`#@.  )
test <'a' [. (+ a=. (+-*)`$`#@.  )
test <'a' [. (+ a=. +/`%`#`:0    )
test <'a' [. (+ a=. (+% )`%`#`:0 )
test <'a' [. (+ a=. (+%-)`%`#`:0 )
test <'a' [. (+ a=.  : ''        )
test <'a' [. (+ a=. '' :         )
f=.&
g=.*
test <'a' [. (+ a=. f g          )
test <'a' [. (+ a=. g f          )

test <'a' [. (+`- a=. @.(+/%#))
test <'a' [. (+`- a=. `:0     )

f=.g=.h=./
test <'a' [. (+ a=. f g          )
test <'a' [. (+ a=. f g h        )
test <'a' [. (+ a=. f g h f      )
test <'a' [. (+ a=. f g h f g    )
test <'a' [. (+ a=. f g h (f g)  )
test <'a' [. (+ a=. f g   (f g)  )
test <'a' [. (+ a=. f g h (f g h))
test <'a' [. (+ a=. f g   (f g h))
test <'a' [. (+ a=. /\.(&+)("1))
test <'a' [. (+ a=. (/\.)(+&)("1 _))

f=.g=.&
h=./
test <'c' [. (+ (c=. f g h                    ) -)
test <'c' [. (+ (c=. f g h h                  ) -)
test <'c' [. (+ (c=. f g h f g                ) -)
test <'c' [. (+ (c=. f g h f g h              ) -)
test <'c' [. (+ (c=. f g h (h h h)            ) -)
test <'c' [. (+ (c=. f g   (f g h)            ) -)
test <'c' [. (+ (c=. f g h (h f)              ) -)
test <'c' [. (+ (c=. f g   (f h)              ) -)
test <'c' [. (+ (c=. . . :                    ) -)
test <'c' [. (+ (c=. . .. .:                  ) -)
test <'c' [. (+ (c=. / . ("1 _)               ) -)
test <'c' [. (+ (c=. '%&y.@(+&y. -&x. ])' : 12) -)
test <'c' [. (+ (c=. (&@@:) (&:@:@) (@&&)     ) -)
test <'c' [. (+ (c=. & * @                    ) -)
test <'c' [. (+ (c=. (&@@:) (+/ % #) (&@&.)   ) -)


NB. 5!:5 on "real" examples ---------------------------------------------

ar   =. 5!:1
test =. ('f=.+(5!:5 y.) :1'; '(ar y.) -: ar <''f''') : '' " 0

ar     =. 5!:1
type   =. 3!:0
boxed  =. 32&= @ type
oarg   =. >@(1&{)
mtv    =. i.@0:
paren  =. ('('&,)@(,&')')
symb   =. $&' '@(e.&'.:')@{. , ]
quote  =. ''''
alp    =. (,65 97+/i.26){a.
dig    =. '0123456789'

slist  =. $&','@(1&=)
shape  =. mtv`slist`(,&'$'@":)@.(2&<.@#)`('i.'&,@":) @. (0&e.) @ $
vchar  =. >:@(quote&=)@, quote&,@(,&quote)@# ,
vbox   =. }. @ ; @: (','&,@paren@('<'&,)@lnoun&.>)
vkey1  =. ('<!.'&,@paren@lnoun)`('<'"_)@.(0&-:)@(>!._) , lnoun@>
vboxk  =. }. @ ; @: (<@(','&,)@paren@vkey1"0)
value  =. vchar`vbox`vboxk`(":!.18@,) @. (2 32 64&i.@(type * *@(*/)@$))
lnoun  =. shape , value

dotco  =. 2&=@# *. e.&'.:'@{:
name   =. e.&alp@{. *. *./@(e.&(alp,dig,'_'))@}: *. e.&(alp,dig,'_.:')@{:
num    =. e.&(dig,'_')@{. *. *./@(e.&(dig,'_ .ejdr'))
qstr   =. mtv -: -.@(~:/\)@(e.&quote) -.&quote@# ]
pstr   =. -.@(0&e.)@}:@(+/\)@({&1 _1 0)@('()'&i.)
nopar  =. 1&=@# +. dotco +. name +. num +. qstr +. pstr
cp     =. paren`] @. nopar

bp     =. ]`cp@.(' '&e.)
hfork  =. }.@;@:(' '&,@bp&.>)@]
left   =. bp@>@{.
right  =. mtv`(cp@>@{:)@.(1&<@#)
ins    =. left@] , symb@>@[ , right@]
act    =. ;@:(cp&.>)@]
insert =. hfork`hfork`act`act`act`ins @. ('23456'&i.@{.@>@[)

lx     =. {. insert lr&.>@oarg
ltie   =. lr`(}.@;@:('`'&,@cp@lr&.>)@oarg) @. ((<,'0')&=@{.)
lgl    =. {. insert (ltie&.>@{. , lr  &.>@}.)@oarg
lgr    =. {. insert (lr  &.>@{. , ltie&.>@}.)@oarg
lg     =. lgr`lgl`lx @. (i.&(<,'`')@oarg)
ltil   =. lx`(oarg@>@{.@oarg) @. ((<,'0')&=@{.@>@{.@oarg)
lcase  =. (cp@lnoun@oarg)`lgl`lgl`lg`ltil`lx @. ((;:'0@.`:4~')&i.@{.)
lr     =. symb`lcase@.boxed

lrep   =. lr @ > @ ar

test ;:'ar type boxed oarg mtv paren symb quote alp dig'
test ;:'slist shape vchar vbox vkey1 vboxk value lnoun'
test ;:'dotco name num qstr pstr nopar cp'
test ;:'bp hfork left right ins act insert'
test ;:'lx ltie lgl lgr lg ltil lcase lr lrep'

ar      =. 5!:1
type    =. 3!:0
boxed   =. 32&= @ type
mt      =. 0&e.@$
oarg    =. >@(1&{)
shr     =. |.!.''
shl     =. 1&(|.!.'')
mat     =. (1 1&}.)@(_1 _1&}.)@":@<
boxc    =. 9!:6 ''
dash    =. 10{boxc

extent  =. (+./\ *. +./\.) @ (' '&~:) @: ({."1)
limb1   =. 1&|.@$ 1&~: }. (10 6 0{boxc)&,@($&(9{boxc))
limb    =. -@(i.&1)@[ |. #@[ {. limb1@]
pfx     =. (limb +/)@extent ,. ]
pad     =. [ {. ] ,. dash&=@({:"1)@] {  ' '&,:@($&dash)@(-&{: $)
take    =. pad`($&' '@[) @. (mt@])
rc      =. #@>@{."1 ; >./@:({:@$@>)
kernt   =. (0{boxc)&=@shl@[ *. ' '&~:@]
kernb   =. (6{boxc)&=@] *. ' '&~:@shl@[
kern    =. (<0 0)&{&>"2 (kernt +./"1@:+. kernb) (<_1 0)&{&>"2
gap     =. ,&.>"_1 {&((0 1$' ');1 1$' ')@kern
graft   =. (pfx&.>@{. 0} ]) @ (,&.>/) @ gap @ ({@rc take&.> ])

lab     =. ,: @ (2&|.) @ ((' ',dash,dash,' ')&,)
label   =. lab`((,.dash)&[) @. (e.&'0123456789'@{.)
center  =. ((i.&1) -@+ <.@-:@(+/))@] |. #@] {. [
root    =. label@[ center extent@>@{.@]

leaf    =. ,@<@(((,:dash,' ')&[ center $&1@#) ,. ])@mat@":

trx     =. >@{. (root ; ]) graft@:(tr@>)@oarg
trgl    =. >@{. (root ; ]) graft@:(trx@>@{. , tr @>@}.)@oarg
trgr    =. >@{. (root ; ]) graft@:(tr @>@{. , trx@>@}.)@oarg
trg     =. trgr`trgl`trx @. (i.&(<,'`')@oarg)
trtil   =. trx`(leaf@oarg@>@{.@oarg) @. ((<,'0')&=@{.@>@{.@oarg)
trcase  =. (leaf@oarg)`trgl`trgl`trg`trtil`trx @. ((;:'0@.`:4~')&i.@{.)
tr      =. leaf`trcase @. boxed

rep     =. [. & (((# i.@#)@,@) (@])})
right   =. (5{boxc) rep (e.&(9{boxc) *. shr"1@(e.&dash))
cross   =. (4{boxc) rep (e.&(5{boxc) *. shl"1@(e.&dash))
left    =. (3{boxc) rep (e.&(9{boxc) *. shl"1@(e.&dash))
bot     =. (7{boxc) rep (e.&(6{boxc) *. shr"1@(e.&dash))
connect =. bot @ left @ cross @ right

tree    =. connect @ > @ (,.&.>/) @ (> (root ; ]) tr@>@ar)

test ;:'ar type boxed mt oarg shr shl mat boxc dash'
test ;:'extent limb1 limb pfx pad take rc kernt kernb kern gap graft'
test ;:'lab label center root leaf'
test ;:'trx trgl trgr trg trtil trcase tr'
test ;:'rep right cross left bot connect tree'

id     =. [.+

en     =. #@]
em     =. (en >.@% 1&>.@|@[)`(en 0&>.@>:@- [) @. (0&<:@[)
kay    =. en`em @. (0&<@[)
omask  =. (em,en) $ ($&0@|@[ , $&1@kay)

base   =. 1&>.@-@[ * i.@em
iind   =. base ,. |@[ <. en - base
seg    =. ((+i.)/@[ { ])"1 _

infix  =. (@seg) (iind `) (`]) \ ("0 _)
outfix =. (@#  ) (omask`) (`]) \ ("0 _)
prefix =. (@{.) (>:@,.@i.@#`) (`]) \
suffix =. (@}.) (   ,.@i.@#`) (`]) \

key    =. (@#) (=@[`) (`]) \

osub   =. >@]`(>@[ >@:{ ]) @. (*@#@])
oind   =. (+/&i./ </.&, i.)@(2&{.)@(,&1 1)@$
ob     =. (@(osub"0 1)) (oind`) (`(,@(<"_2))) \

bs     =. id (prefix : infix )
bsd    =. id (suffix : outfix)
sd     =. id (ob     : key   )

test ;:'id'
test ;:'en em kay omask'
test ;:'base iind seg'
test ;:'infix outfix prefix suffix'
test ;:'key osub oind ob'
test ;:'bs bsd sd'
