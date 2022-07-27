NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. ;:y -----------------------------------------------------------------

;:'don''t'                NB. open quote
;:''''                    NB. open quote
;: 1 0                    NB. domain error
;: 1 2 3                  NB. domain error
;: 3.4                    NB. domain error
;: 3j4                    NB. domain error
;: <'asdf'                NB. domain error


NB. ;: numeric input ----------------------------------------------------

123abc                    NB. ill-formed number
__abc                     NB. ill-formed number
123 45a                   NB. ill-formed number
123 45e                   NB. ill-formed number
123 45j                   NB. ill-formed number

5_                        NB. ill-formed number
5__                       NB. ill-formed number
__5                       NB. ill-formed number
4e5_                      NB. ill-formed number
4e5__                     NB. ill-formed number
4e__5                     NB. ill-formed number
5_e4                      NB. ill-formed number
5__e4                     NB. ill-formed number
__5e4                     NB. ill-formed number
_e                        NB. ill-formed number
_e5                       NB. ill-formed number
5e_                       NB. ill-formed number
5e__4                     NB. ill-formed number
5e0.5                     NB. ill-formed number
5e4.0                     NB. ill-formed number
4ee                       NB. ill-formed number
4e5e                      NB. ill-formed number
4e5e6                     NB. ill-formed number
4ej                       NB. ill-formed number

4j                        NB. ill-formed number
4jj                       NB. ill-formed number
4j5j                      NB. ill-formed number
4j5j6                     NB. ill-formed number
4je                       NB. ill-formed number
4j_e                      NB. ill-formed number
4j_e5                     NB. ill-formed number
4j5e_                     NB. ill-formed number
4j5e0.5                   NB. ill-formed number
4je5                      NB. ill-formed number
4je_                      NB. ill-formed number
5j__4                     NB. ill-formed number
5j4_                      NB. ill-formed number
5j4__                     NB. ill-formed number
