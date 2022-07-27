NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 5!:0 ----------------------------------------------------------------

fx =. 5!:0
ar =. 5!:1

( 3 4$<9 ) fx             NB. rank error
(<3 4$<9 ) fx             NB. rank error
(<3 4$'a') fx             NB. rank error

0   fx                    NB. domain error
34  fx                    NB. domain error
3.5 fx                    NB. domain error
3j4 fx                    NB. domain error
+   fx                    NB. domain error

(<'+';3;4) fx             NB. length error

(<0 1 0  ) fx             NB. domain error
(<3 4 5  ) fx             NB. domain error
(<3.5 4 5) fx             NB. domain error
(<3j5 4 5) fx             NB. domain error

(<'*%';'') fx             NB. spelling error
(<'*%'   ) fx             NB. spelling error
(<'*.%'  ) fx             NB. spelling error
(<'abc'  ) fx             NB. spelling error
(<'ab.'  ) fx             NB. spelling error
(<'2:'   ) fx             NB. spelling error
(<'=.'   ) fx             NB. domain error
(<'=:'   ) fx             NB. domain error
(<'x.'   ) fx             NB. domain error
(<'$.'   ) fx             NB. domain error
(<'a'    ) fx             NB. domain error
(<'0'    ) fx             NB. domain error
(<'2'    ) fx             NB. domain error
(<'3'    ) fx             NB. domain error
(<3   ;'') fx             NB. domain error
(<3j4 ;'') fx             NB. domain error
(<(<'+')   ;'') fx        NB. domain error
(<(3 4$'+');'') fx        NB. rank error

(<'/.';<4     ) fx        NB. domain error
(<'/.';<'a'   ) fx        NB. domain error
(<'/.';<3.5   ) fx        NB. domain error
(<'/.';<3j4   ) fx        NB. domain error
(<'/.';<3 4$<9) fx        NB. rank error
(<'+.';<+`%   ) fx        NB. length error
(<'/.';<+`%   ) fx        NB. length error
(<'&';<''`%   ) fx        NB. length error
(<'&';<3$+`%  ) fx        NB. length error

cn =. ar <'noun' [. noun=.3 4
cv =. ar <'verb' [. verb=.+
NB. (<(,'2');<+ ` %) -: ar <'f' [. f=.+%
(<'2';<3 4     ) fx       NB. domain error
(<'2';<cv,cn   ) fx       NB. domain error
(<'2';<cn,cv   ) fx       NB. domain error
(<'2';<cn,cn   ) fx       NB. domain error
(<'2'          ) fx       NB. domain error
(<'2';<<'%'    ) fx       NB. length error
(<'2';<+ ` % `-) fx       NB. length error

NB. (<(,'3');<+ ` , ` *) -: ar <'f' [. f=.+,*
(<'3'          ) fx       NB. domain error
(<'3';<cv,cv,cn) fx       NB. domain error
(<'3';<cv,cn,cv) fx       NB. domain error
(<'3';<'/';cv,cv)fx       NB. domain error
(<'3';''       ) fx       NB. length error
(<'3';<+ ` ,   ) fx       NB. length error
(<'3';<4$ , ` *) fx       NB. length error

NB. 10 -: (<'/';<<'+') fx i.5
(<'/';<<'\'   ) fx        NB. domain error
(<'&';<'/';'@') fx        NB. domain error
(<'a.';<<'+'  ) fx        NB. length error


NB. 5!:0 on string representations --------------------------------------

fx =. 5!:0
sr =. 5!:3

0 1 fx                    NB. domain error
3 4 fx                    NB. domain error
3.4 fx                    NB. domain error
3j4 fx                    NB. domain error
+   fx                    NB. domain error

xyz=.'abc'
NB. '12cxyz 1 3 abc' -: sr <'xyz'
'13cxyz 1 3 abc'   fx     NB. length error
'  cxyz 1 3 abc'   fx     NB. domain error
'cxyz 1 3 abc'     fx     NB. domain error
'12.0cxyz 1 3 abc' fx     NB. domain error
'_12cxyz 1 3 abc'  fx     NB. domain error

sp =. 4 5 6
  NB. '13nsp 1 3 4 5 6' -: sr <'sp'
'13Nsp 1 3 4 5 6' fx      NB. domain error
'13 sp 1 3 4 5 6' fx      NB. domain error
'13-sp 1 3 4 5 6' fx      NB. domain error
'13.sp 1 3 4 5 6' fx      NB. domain error

sc =. 3.5
NB. '9nsc 0 3.5' -: sr <'sc'
NB. 3.5 -: '8n- 0 3.5' fx
'7n 0 3.5'   fx           NB. ill-formed name
'8n+ 0 3.5'  fx           NB. ill-formed name
'9na. 0 3.5' fx           NB. ill-formed name
'8n'' 0 3.5' fx           NB. ill-formed name
'8n. 0 3.5'  fx           NB. ill-formed name
'8n: 0 3.5'  fx           NB. ill-formed name
'9n_a 0 3.5' fx           NB. ill-formed name
'8n_ 0 3.5'  fx           NB. ill-formed name
'9n99 0 3.5' fx           NB. ill-formed name

x_y=.4 5 6
NB. '14nx_y 1 3 4 5 6' -: sr <'x_y'
NB. x_y -: '16nx_y   1 3 4 5 6' fx
'14nx_y a 3 4 5 6' fx     NB. domain error
'14nx_y          ' fx     NB. domain error
'14nx_y _1 3 4 5 ' fx     NB. domain error
'14nx_y 1.0 3 4 5' fx     NB. domain error
'14nx_y 1j0 3 4 5' fx     NB. domain error
'14nx_y 9999 3 4 ' fx     NB. limit error

x. =. 2 3$'abcdef'
NB. '16cx. 2 2 3 abcdef' -: sr <'x.'
NB. x. -: '20cx. 2   2   3 abcdef' fx
'16cx. 2 2 x abcdef' fx   NB. domain error
'16cx. 2 2 _3 abcde' fx   NB. domain error
'16cx. 2 2 3.0 abcd' fx   NB. domain error
'16cx. 2 2 3j0 abcd' fx   NB. domain error
'16cx. 2 2 3abcdef ' fx   NB. domain error
'16cx. 2           ' fx   NB. domain error
'16cx. 2 2         ' fx   NB. domain error
'16cx. 2     abcdef' fx   NB. domain error

x =. 4 5 678
NB. '14nx 1 3 4 5 678' -: sr <'x'
'14nx 1 3 4 a 678' fx     NB. ill-formed number
'12nx 1 3        ' fx     NB. length error
'12nx 1 3 4 5    ' fx     NB. length error
'14nx 1 3 4 5 6 8' fx     NB. length error

slash=./
NB. '13xaslash 1 1 /' -: sr <'slash'
'13xvslash 1 1 /' fx      NB. domain error
'13xcslash 1 1 /' fx      NB. domain error

box=.12 _4;,'/'
('a' (t i.'c')}t=.sr <'box') fx    NB. domain error

sum=.+/
('a' (t i.'c')}t=.sr <'sum') fx    NB. domain error


NB. 5!: -----------------------------------------------------------------

ar =. 5!:1
dr =. 5!:2
sr =. 5!:3
tr =. 5!:4
lr =. 5!:5

ar 0                      NB. domain error
dr 0                      NB. domain error
sr 0                      NB. domain error
tr 0                      NB. domain error
lr 0                      NB. domain error

ar 't'                    NB. domain error
dr 't'                    NB. domain error
sr 't'                    NB. domain error
tr 't'                    NB. domain error
lr 't'                    NB. domain error

ar 34                     NB. domain error
dr 34                     NB. domain error
sr 34                     NB. domain error
tr 34                     NB. domain error
lr 34                     NB. domain error

ar 3.4                    NB. domain error
dr 3.4                    NB. domain error
sr 3.4                    NB. domain error
tr 3.4                    NB. domain error
lr 3.4                    NB. domain error

ar 3j4                    NB. domain error
dr 3j4                    NB. domain error
sr 3j4                    NB. domain error
tr 3j4                    NB. domain error
lr 3j4                    NB. domain error

ar <''                    NB. ill-formed name
dr <''                    NB. ill-formed name
sr <''                    NB. ill-formed name
tr <''                    NB. ill-formed name
lr <''                    NB. ill-formed name

ar <'+'                   NB. ill-formed name
dr <'+'                   NB. ill-formed name
sr <'+'                   NB. ill-formed name
tr <'+'                   NB. ill-formed name
lr <'+'                   NB. ill-formed name

ar <'-'                   NB. ill-formed name
dr <'-'                   NB. ill-formed name
sr <'-'                   NB. ill-formed name
tr <'-'                   NB. ill-formed name
lr <'-'                   NB. ill-formed name

ar <'a b c'               NB. ill-formed name
dr <'a b c'               NB. ill-formed name
sr <'a b c'               NB. ill-formed name
tr <'a b c'               NB. ill-formed name
lr <'a b c'               NB. ill-formed name

ar <'asdfasdf'            NB. value error
dr <'asdfasdf'            NB. value error
sr <'asdfasdf'            NB. value error
tr <'asdfasdf'            NB. value error
lr <'asdfasdf'            NB. value error
