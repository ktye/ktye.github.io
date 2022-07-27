NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. x-y -----------------------------------------------------------------

type =. 3!:0

4 = type 1234-5678
4 = type _1234-_5678
4 = type _2e9
8 = type _2e9-3e8
4 = type 0-_2147483647
4 = type _2147483647-1
4 = type _2147483648
4 = type _1-_2147483648
8 = type _2147483648-1
8 = type 0-_2147483648
8 = type -_2147483648

_1 -: 3 - 4
2  -: 9.5 - 7.5
