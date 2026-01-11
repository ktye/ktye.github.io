N:W*W:600;delay:200
left:{};right:{};up:{};down:{};space:{}
blu:-5636096
ora:-11162881
yel:-11141121
gre:-5592406
odo:{(,/x#'!x;(x*x)#!x)}

abc:"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
rld:{ ,/{(*x),(`i$x 1)#*|*x}'   -2^((&~='x?\"0123456789")^x),,"0" } /run length decode

/gorilla 30x30
sprite30:{(W*i%30)+30!i:&abc?rld x}
g1:sprite30"a40b7a21b7a20b1a5b1a19b9a19b2a1ba1b1a20b7a21b7a22b5a18b15a10b21a6b11ab10a4b12ab11a3b11abab10a2b4ab5ab2ab4ab4a1b4ab2a2b4a2b1ab4a1b4a2b11a2b4a2b4a1b11a1b4a3b4a1b11a1b4a4b4ab11ab4a6b21a11b12a14b5a4b5a12b4a6b4a11b4a8b4a10b4a8b4a10b4a8b4a10b4a8b4a10b4a8b4a11b4a6b4a6"
g2:sprite30"a40b7a21b7a14b3a1b1a5b1a12b4a1b9a11b4a2b2a1ba1b1a11b4a3b7a11b4a4b7a11b4a5b5a12b4ab15a8b23a5b12ab10a5b11ab11a5b9abab10a8b5ab2ab4ab4a7b2a2b4a2b1ab4a9b11a2b4a9b11a1b4a10b11a1b4a10b11ab4a10b17a11b12a14b5a4b5a12b4a6b4a11b4a8b4a10b4a8b4a10b4a8b4a10b4a8b4a10b4a8b4a11b4a6b4a6"
g3:sprite30"a40b7a21b7a20b1a5b1a1b3a13b9a1b4a12b2a1ba1b1a2b4a12b7a3b4a12b7a4b4a12b5a5b4a7b15ab4a4b23a4b11ab11a3b12ab10a4b11abab8a4b4ab5ab2ab4a7b4ab2a2b4a2b1a7b4a2b11a10b4a1b11a10b4a1b11a11b4ab11a12b17a15b13a13b5a4b5a12b4a6b4a11b4a8b4a10b4a8b4a10b4a8b4a10b4a8b4a10b4a8b4a11b4a6b4a6"

/banana 11x11
b1:&abc?rld"a14b1a8b2a8b2a7b2a7b2a7b2a7b2a6b2a7b1a15"
b2:&abc?rld"a44b1a4b1a1b8a2b6a4b4a35"
b3:&abc?rld"a15b1a7b2a6b2a7b2a7b2a7b2a7b2a8b2a8b1a14"
b4:&abc?rld"a35b4a4b6a2b8a1b1a4b1a44"

/skyline
X:(W>)#0,+\10*4+15?4
Y:(#X)#10*40+15?15
Z:Y@X'!W
XY:odo W

x:X@i:^-2?#X; Ax:  5+*x;Bx:  5+x 1
y:Y@i;        Ay:-30+*y;By:-30+y 1

Ap:Ax+W*Ay
Bp:Bx+W*By

B:N#blu
B:@[B;&(*XY)>Z XY 1;gre]
T:0

/frame
T:3!1+T
b:B
@[`b;Ap+(g1;g2;g3)T;ora]
@[`b;Bp+(g1;g2;g3)T;ora]


