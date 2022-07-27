NB. Copyright (c) 1989 1990, Roger K.W. Hui & K.E. Iverson
NB. Copyright (c) 1990-1992, Iverson Software Inc.
NB. All Rights Reserved.


NB. .. and .: -----------------------------------------------------------

symm =. [.`(-:@:+[.)`& \
skew =. [.`(-:@:-[.)`& \

sin  =. 1&o.  [.  sin1  =. ^ .: - &. j.  [.  sin2  =. ^ skew - &. j.
cos  =. 2&o.  [.  cos1  =. ^@j. .. -     [.  cos2  =. ^@j. symm -
sinh =. 5&o.  [.  sinh1 =. ^ .: -        [.  sinh2 =. ^ skew -
cosh =. 6&o.  [.  cosh1 =. ^ .. -        [.  cosh2 =. ^ symm -

x=.(0.01*_700+?20$1400),0,*/\4$0j1

1e_12 > >./| (sin  - sin1 ) x
1e_12 > >./| (cos  - cos1 ) x
1e_12 > >./| (sinh - sinh1) x
1e_12 > >./| (cosh - cosh1) x

1e_12 > >./| (sin  - sin2 ) x
1e_12 > >./| (cos  - cos2 ) x
1e_12 > >./| (sinh - sinh2) x
1e_12 > >./| (cosh - cosh2) x
