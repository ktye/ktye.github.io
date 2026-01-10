N:W*W:50
delay:300

rgb:256/255,|
white:rgb 255 255 255
black:rgb 0 0 0
red:rgb 255 0 0

B:black+&N
P:(W%2)+W*W%2;D:1;DR:!0
Q:(q:{*b(-n)?n:#b:&B=black})[]
S:P-2 1 0
G:-1
XY:!W,W;
@[`B;&(W-1)=|/XY;white]
@[`B;&    0=&/XY;white]

left:{DR,:-1};right:{DR,:1};up:{DR,:-W};down:{DR,:W};space:{}

/frame
D:$[#DR;*DR;D];DR:1_DR
P+:D
Q:$[red~B[P];[G:5;q[]];~black~B[P];gameover:1;Q]
B:@[B;S;black]
S:((0>G-:1)_S),P
B[Q]:red
B:@[B;S;white]
