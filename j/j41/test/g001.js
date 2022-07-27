NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. =. and =: -----------------------------------------------------------

ex     =. 4!:55
local  =. '' : '(x.)=.y.'
global =. '' : '(x.)=:y.'

a  =. 1 2 3
aa =. 'foo upon thee'
a  -: 1 2 3
aa -: 'foo upon thee'
ex <'a'
aa -: 'foo upon thee'
aa =: i.4 3
aa -: i.4 3

Ich_liebe_dich =. 'Je t''aime.'
(#Ich_liebe_dich) -: 0{$Ich_liebe_dich

('first';'second';'third') =. 'Cogito'; 'ergo'; i.12
first  -: 'Cogito'
second -: 'ergo'
third  -: i.12

('a_man';'j__k') =. 123 456
a_man -: 123
j__k  -: 456

names =. 3 3$'abcdefghi'
(names)   =. i. 3 3
(".names) -: i. 3 3

'pqr' =. <"_1 i.3 4
p -: 0 + i.4
q -: 4 + i.4
r -: 8 + i.4

'abc' -: 'pqr' local 'abc'
p -: 0 + i.4
q -: 4 + i.4
r -: 8 + i.4

'abc' -: 'pqr' global 'abc'
p -: 'a'
q -: 'b'
r -: 'c'

'p' =. i.12
p -: 11

('p';'q';'r') =: o.4 5 6
p -: o.4
q -: o.5
r -: o.6

'pqr' =. <'Ich liebe dich'
p -: 'Ich liebe dich'
p -: q
p -: r

NB.  The following lines generate no display

a=.12
a=:12
'a'=.12
'a'=:12
('ab';'c')=:12 13
('ab';'c')=.12 13
