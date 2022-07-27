NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. 9!:1 ----------------------------------------------------------------

rls =. 9!:1

rls i.4                   NB. rank error
rls 0                     NB. domain error
rls 3.5                   NB. domain error
rls 'a'                   NB. domain error
rls <9                    NB. domain error
rls 3j4                   NB. domain error


NB. 9!:3 ----------------------------------------------------------------

disps =. 9!:3

disps 'abc'               NB. domain error
disps 1;2 3               NB. domain error
disps 2;<!.3 (4)          NB. domain error
disps 2 3j4               NB. domain error
disps 2 3.4               NB. domain error
disps 2 3 2               NB. domain error

disps 1 2$2 3             NB. rank error

disps 2 _1                NB. index error
disps 2 6                 NB. index error
disps 2 0                 NB. index error


NB. 9!:5 ----------------------------------------------------------------

prompts =. 9!:5

prompts 3.5               NB. domain error
prompts 4 5               NB. domain error
prompts 9;'ab'            NB. domain error
prompts 3j4               NB. domain error
prompts 3 4$'a'           NB. rank error
prompts 100$' '           NB. limit error


NB. 9!:7 ----------------------------------------------------------------

boxs =. 9 !: 7

boxs 9;'ab'               NB. domain error
boxs 3j4                  NB. domain error
boxs i.11                 NB. domain error
boxs o.i.11               NB. domain error

boxs 10$' '               NB. length error
boxs 12$' '               NB. length error


NB. 9!:9 ----------------------------------------------------------------

evmq =. 9!:8
evms =. 9!:9

t =. evmq ''

evms (<'undefined name') (t i.<'value error')}t
asdf1235                  NB. undefined name
evms t
asdf1235                  NB. value error

evms 3 4$<'abc'           NB. rank error
evms <'abc'               NB. rank error
evms ($t)$<3 4$'a'        NB. rank error

evms }.t                  NB. length error
evms t,<'abc'             NB. length error

evms ($t)$0 1             NB. domain error
evms ($t)$'abc'           NB. domain error
evms ($t)$2 3             NB. domain error
evms ($t)$2.3             NB. domain error
evms ($t)$2j3             NB. domain error
evms ($t)$<0 1            NB. domain error
evms ($t)$<2 3            NB. domain error
evms ($t)$<2.3            NB. domain error
evms ($t)$<2j3            NB. domain error
