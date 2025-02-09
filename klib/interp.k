/linear interpolation

lin:{$[`L~@z;lin[x;y]'z;[dx:0.+1_`d x;dy:0.+1_`d y;b:(-2+#x)&0|x'z;(y b)+(dy b)*(z-x b)%dx b]]}

/lin[0 4.;3 4.;0.+!5] /3. 3.25 3.5 3.75 4.
