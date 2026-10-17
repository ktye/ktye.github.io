s:n:`i$<`             /parse n from stdin and set seed
e:1@(!m)*-180.%m:n%2  /precomputed exponentials (@float rotates by angle)
fft:{$[-1+n:#x;(x+r),(x:fft[x o;2*y])-r:(e y*!n)*fft[x 1+o:2*!n%:2;2*y];x]}

f9:{n:#x:$_0.5+1e9*x;"0.",((9-n)#"0"),x}
f6:{x:$["."~*|x:$x;x;(-2_x)];(x@&~"."=x),".0"}

f:{y;s::12345+1103515245*s;*`i(-2#`c@,s),0x0000}
x:-1+(1_f\&1+n)%32768.
y:(abs(n%2)#fft[0a+x;1])%0.5*n
y[0]*:2
g:10#>y
r:(0.+g;10#y g)
`<("\n"/"\t"/'+{(f6'x;f9'y)}.r),"\n"
