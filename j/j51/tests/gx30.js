NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 3!:0 ----------------------------------------------------------------

type =.3!:0

NB. Boolean
1 = type 1 0 1 0 0
1 = type 3 = 4 5
1 = type (<'ergo')e.;:'Cogito, ergo sum.'

NB. literal
2 = type a.
2 = type 'abc'
2 = type ''
2 = type ":1 2 3

NB. integer
4 = type 4 5 6
4 = type 1e8 1e9
4 = type i.3 4
4 = type 12+13
4 = type *_1.5 2 3.1415
4 = type a.i.'abcd'

NB. floating Point
8 = type 1.5 2.3 _6.3234
8 = type 1e15
8 = type 3%4

NB. complex
16 = type 0j1 3.5j_6
16 = type %:-i.12
16 = type ^.->:i.12

NB. boxed
32 = type (<'abc'),<'bar'
32 = type ;:'Cogito, ergo sum.'
32 = type 0$<''
