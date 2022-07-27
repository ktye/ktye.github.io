NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 7!:0 and 7!:1 -------------------------------------------------------

NB. Testing malloc/free; try  f 200  or  g 40000, etc.

pr =. [         NB. change to   pr=.1!:2&2   to see each iteration
sp  =. 7!:0
sps =. 7!:1

f =. ('loop) pr (y.=.<:y.),sps 0'; '$.=.(*y.)#loop') : ''

x =. 0 0$''
x =. x, 'loop) t=.(?20000)$a.'
x =. x, 'y.=.<:y.'
x =. x, 'pr y.,sps 0'
x =. x, '$.=.(*y.)#loop'
g =. x : ''

x =. 0 0$''
x =. x, 'loop)'
x =. x, 'n=.>:?20'
x =. x, 'a=.?(n,n)$5000'
x =. x, 'b=.%.a'
x =. x, 'd=.>./|,(=i.n)-a+/ . *b'
x =. x, 'pr (y.=.<:y.),(sps 0),d'
x =. x, '$.=.(*y.)#loop'
h =. x : ''

x=.20
y=.20

x =. sp ''
f 30+?200
y =. sp ''
x -: y

x =. sp ''
g 30+?200
y =. sp ''
x -: y

x =. sp ''
h 3+?7
y =. sp ''
x -: y


NB. 7!: encore  ---------------------------------------------------------

sp    =. 7!:0
sps   =. 7!:1
space =. 7!:2

t =. sp ''
0 = $$t
t = <.t
0<:t

t =. sps ''
0 = $$t
t = <.t
0<:t
(sps >: sp) ''

0<space 't=.i.100'
t-:i.100
1000>|(2*4*n)-space 'i.n' [ n=.1000
1000>|(2*4*n)-space 'i.n' [ n=.2000
