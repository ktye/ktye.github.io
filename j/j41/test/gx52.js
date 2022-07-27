NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 5!:2 ----------------------------------------------------------------

ar      =. 5!:1
dr      =. 5!:2
type    =. 3!:0
boxed   =. e.&32 64@type
oarg    =. >@(1&{)

dproot  =. (<1 0)&C.@,`] @. (e.&(,&.>'0123456789')@[)
dpx     =. {. dproot dp&.>@oarg
dpgl    =. {. dproot (dpx&.>@{. , dp &.>@}.)@oarg
dpgr    =. {. dproot (dp &.>@{. , dpx&.>@}.)@oarg
dpg     =. dpgr`dpgl`dpx @. (i.&(<,'`')@oarg)
dptil   =. dpx`(oarg@>@{.@oarg) @. ((<,'0')&=@{.@>@{.@oarg)
dpcase  =. oarg`dpgl`dpgl`dpg`dptil`dpx @. ((;:'0@.`:4~')&i.@{.)
dp      =. ]`dpcase @. boxed

display =. ,@<`[ @. boxed @ dp @ > @ ar


test =. '(dr -: display) <''x.''' : 1

+   test
+.  test
i.  test
0:  test
-   test

1 2 3&+      test
,&'abcd'     test
(<"0 i.7)&e. test

(+/ % #)     test
(+%)         test

+/           test
+./          test
+./ .*       test
+/  .*       test
+`*@.<       test
+`-`*`:0     test
display      test
dpcase       test

(dr -: display) <'ger' [ ger =. +/`%`#
(dr -: display) <'a'   [ a =.<"0 i.7
(dr -: display) <'a'   [ a =. ''

(dr -: display) <'test'
a =. /
(dr -: display) <'a'
a =. /\
(dr -: display) <'a'
inv =. ^: _
(dr -: display) <'inv'

c =. &
(dr -: display) <'c'
ip =. [. @ ("(0 _1"1 _))
(dr -: display) <'ip'

a =. i.3 4
(dr <'a') -: ,<a
f =. ^
(dr <'f') -: ,<,'^'
f =. /.
(dr <'f') -: ,<'/.'
f =. &.
(dr <'f') -: ,<'&.'

plus =. +
or   =. +.
hook =. (plus or) f.
fork =. (plus,or) f.
(dr <'plus') -: ,<,'+'
(dr <'or'  ) -: ,<'+.'
(dr <'hook') -: ;:'++.'
(dr <'fork') -: ;:'+,+.'

gd  =. :
fnn =. '*y.' : 'x.*y.'
fnv =. '*y.' : *
fvn =.     * : 'x.*y.'
fvv =.     * : *
(dr <'gd' ) -: ,<,':'
(dr <'fnn') -: (<,:'*y.'),(<,':'),<,:'x.*y.'
(dr <'fnv') -: (<,:'*y.'),(<,':'),<,'*'
(dr <'fvn') -: (<,'*'   ),(<,':'),<,:'x.*y.'
(dr <'fvv') -: (<,'*'   ),(<,':'),<,'*'

adv  =. 'x./f.'   : 1
conj =. 'x.&y.f.' : 2
(dr <'adv' ) -: (,:'x./f.'  );(,':');1
(dr <'conj') -: (,:'x.&y.f.');(,':');2

t=.'$.=.1,y.#2'; 't=.]'; 't=.x.@t f.'
pow =. t : 2
(dr <'pow') -: (>t);(,':');2

f=.o. pow 0
r=.,<,']'
(dr <'f') -: r

f=.o. pow 1
r=.(<'o.'),(<,'@'),r
(dr <'f') -: r

f=.o. pow 2
r=.(<'o.'),(<,'@'),<r
(dr <'f') -: r

f=.o. pow 3
r=.(<'o.'),(<,'@'),<r
(dr <'f') -: r

tv =. '(dr <''x.'') -: ,<,y.' : 2
=  tv '='
<  tv '<'
<. tv '<.'
<: tv '<:'
>  tv '>'
>. tv '>.'
>: tv '>:'
_: tv '_:'
+  tv '+'
+. tv '+.'
+: tv '+:'
*  tv '*'
*. tv '*.'
*: tv '*:'
-  tv '-'
-. tv '-.'
-: tv '-:'
%  tv '%'
%. tv '%.'
%: tv '%:'
^  tv '^'
^. tv '^.'
$  tv '$'
~. tv '~.'
~: tv '~:'
|  tv '|'
|. tv '|.'
|: tv '|:'
,  tv ','
,. tv ',.'
,: tv ',:'
;  tv ';'
;: tv ';:'
#  tv '#'
#. tv '#.'
#: tv '#:'
!  tv '!'
/: tv '/:'
\: tv '\:'
[  tv '['
]  tv ']'
{  tv '{'
{. tv '{.'
{: tv '{:'
}. tv '}.'
}: tv '}:'
". tv '".'
": tv '":'
?  tv '?'
A. tv 'A.'
C. tv 'C.'
E. tv 'E.'
e. tv 'e.'
i. tv 'i.'
j. tv 'j.'
o. tv 'o.'
p. tv 'p.'
r. tv 'r.'
0: tv '0:'
1: tv '1:'

g=.+`+
(,<,'~' ) -: dr <'f' [. (+ f=.~ )
(,<,'/' ) -: dr <'f' [. (+ f=./ )
(,<,'/.') -: dr <'f' [. (+ f=./.)
(,<,'\' ) -: dr <'f' [. (+ f=.\ )
(,<,'\.') -: dr <'f' [. (+ f=.\.)
(,<,'}' ) -: dr <'f' [. (+ f=.} )
(,<,'b.') -: dr <'f' [. (0 f=.b.)
(,<,'f.') -: dr <'f' [. (+ f=.f.)

(,<,'^:') -: dr <'f' [. (+(f=. ^:)+)
(,<,'.' ) -: dr <'f' [. (+(f=. . )+)
(,<,'..') -: dr <'f' [. (+(f=. ..)+)
(,<,'.:') -: dr <'f' [. (+(f=. .:)+)
(,<,':' ) -: dr <'f' [. (+(f=. : )+)
(,<,':.') -: dr <'f' [. (+(f=. :.)+)
(,<,';.') -: dr <'f' [. (+(f=. ;.)0)
(,<,'!.') -: dr <'f' [. (=(f=. !.)0)
(,<,'!:') -: dr <'f' [. (0(f=. !:)0)
(,<,'"' ) -: dr <'f' [. (+(f=. " )+)
(,<,'`' ) -: dr <'f' [. (+(f=. ` )+)
(,<,'`:') -: dr <'f' [. (g(f=. `:)0)
(,<,'@' ) -: dr <'f' [. (+(f=. @ )+)
(,<,'@.') -: dr <'f' [. (g(f=. @.)+)
(,<,'@:') -: dr <'f' [. (+(f=. @:)+)
(,<,'&' ) -: dr <'f' [. (+(f=. & )+)
(,<,'&.') -: dr <'f' [. (+(f=. &.)+)
(,<,'&:') -: dr <'f' [. (+(f=. &:)+)


NB. 5!:2, handling gerunds ----------------------------------------------

fx =. 5!:0
dr =. 5!:2
th =. ('f=.y. fx'; '{.@(]`<@.(1&<@#)) dr<''f''') : ''

g =. [`((e.&' ' # i.@#)@])`]
f =. g}
(dr<'f') -: (th"0 g);,'}'
f =. (1{g) fx}
(dr<'f') -: (>th 1{g);,'}'

g =. */\.`(i.@#)`(+/~)
f =. i.^:g
(dr<'f') -: 'i.';'^:';<th"0 g
f =. ^:g
(dr<'f') -: '^:';<th"0 g
f =. +/\^:
(dr<'f') -: ((,&.>'+/');,'\');'^:'
f =. i.^:*
(dr<'f') -: ;:'i.^:*'

g =. */\.`(+/ % #)`]
f =. `g
(dr<'f') -: (<,'`'),<th"0 g
f =. g`
(dr<'f') -: (<th"0 g),<,'`'

g =. ]`(+%)
f =. g`:0
(dr<'f') -: (th"0 g);'`:';0
f =. g`:
(dr<'f') -: (th"0 g);'`:'
f =. `:0
(dr<'f') -: '`:';0

g =. ((%&4@# , 4:) $ ]) ` %: ` $
f =. g@.*
(dr<'f') -: (th"0 g);'@.';,'*'
f =. g@.
(dr<'f') -: (th"0 g);'@.'
f =. @.('abc'&i.)
(dr<'f') -: '@.';<;:'abc&i.'
