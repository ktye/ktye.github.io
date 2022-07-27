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

2 3r                      NB. ill-formed number
2 3re                     NB. ill-formed number
3rr                       NB. ill-formed number
3rj                       NB. ill-formed number
3rad                      NB. ill-formed number
3rar                      NB. ill-formed number
3rp                       NB. ill-formed number
3rx                       NB. ill-formed number
2 3r4r                    NB. ill-formed number
2 3r4j                    NB. ill-formed number
2 3r4ad                   NB. ill-formed number
2 3r4ar                   NB. ill-formed number
2 3r4p                    NB. ill-formed number
2 3r4x                    NB. ill-formed number
2 3rb                     NB. ill-formed number

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

_3ad90                    NB. ill-formed number
2 3ad                     NB. ill-formed number
2 3ade                    NB. ill-formed number
3adr                      NB. ill-formed number
3adj                      NB. ill-formed number
3adp                      NB. ill-formed number
3adx                      NB. ill-formed number
2 3ad4r                   NB. ill-formed number
2 3ad4j                   NB. ill-formed number
2 3ad4p                   NB. ill-formed number
2 3ad4x                   NB. ill-formed number
2 3ad4b                   NB. ill-formed number

_3ar90                    NB. ill-formed number
2 3ar                     NB. ill-formed number
2 3are                    NB. ill-formed number
3arr                      NB. ill-formed number
3arj                      NB. ill-formed number
3arp                      NB. ill-formed number
3arx                      NB. ill-formed number
2 3ar4r                   NB. ill-formed number
2 3ar4j                   NB. ill-formed number
2 3ar4p                   NB. ill-formed number
2 3ar4x                   NB. ill-formed number
2 3ar4b                   NB. ill-formed number

_3b                       NB. ill-formed number
2 3b4.56.7                NB. ill-formed number
2 3b__56.7                NB. ill-formed number
2 3b4.56_                 NB. ill-formed number
2 3eb                     NB. ill-formed number
2 3rb                     NB. ill-formed number
2 3jb                     NB. ill-formed number
2 3adb                    NB. ill-formed number
2 3arb                    NB. ill-formed number
2 3pb                     NB. ill-formed number
2 3xb                     NB. ill-formed number

