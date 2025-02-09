avg:{(+/x)%0.+#x}
var:{(+/x*x:(x-avg x))%-1+#x}
std:{%var x}
med: **|2^^
z95:{1.97*(((std@_x)^b)+(std imag x)^b)^1%b:3.2}
mavg:{(y-(-#y)#(-x)_y:+\y)%x}
mmax:{while[x-:1;y:{x|(*x),-1_x}y];y}
mmin:{while[x-:1;y:{x&(*x),-1_x}y];y}
