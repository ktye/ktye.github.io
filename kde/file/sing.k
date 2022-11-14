
fftn:{[n]l:*&|2\\n;e:angle[1;-(i:!n)*360.%n]; (2//|2\\i;2^/:!l;|&'~!l#2;e@|(h/2*)\:!h:n%2)}
fft: {[f;x]{[x;p;k;e]@[x;k,j;(x[k]+x[j]*e),x[k]-x[j:k+p]*e]}/[x f 0;f 1;f 2;f 3]}

f:fftn 1024

n:0
F:{
 r:log abs 512#fft[f;0a+x]
 color 0&255|_(-10. 1)(0 255)'r}               /x y' scales

/color:..