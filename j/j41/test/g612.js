NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. x`:y ----------------------------------------------------------------

f =. - ` % ` ^ `: 0
y =. 2 3
x =. 5 7
(  ( -y),( %y),: ^y) -:   f y
(|:(5-y),(5%y),:5^y) -: 5 f y
(|:(x-y),(x%y),:x^y) -: x f y
