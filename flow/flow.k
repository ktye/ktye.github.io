Z:(.5+!nn:n,n)%n:4
Y:,/+n^X:0.+(n*n)#(!m),m,1_(-m)+!m:n%2
Q:4\6 123

viscous:0.5; t:0.1

fourier:{,/+f'+(f:{ $[-1+n:#x;(x+r),(x:f x o)-r:(1@(!n)*-180.%n)*f x 1+o:2*!n%:2;x]   })'n^x}
inverse:{,/+f'+(f:{($[-1+n:#x;(x+r),(x:f x o)-r:(1@(!n)* 180.%n)*f x 1+o:2*!n%:2;x])%n})'n^x}

project:{(x 0),1_(.5*x)+(s*s%a*a:abs s:imag[X;Y])*-.5*conj x@n/n!n-!nn}
diffuse:{x*(exp@-RR*viscous*t)}
convect:{+/'(*/'((1-s),s:z-a)Q)*/x@\nn/'n!(+!2 2)+\a:_z:-.5+n*Z-x+:t}
exscite:{x+t*f}

NAVIER::{inverse project diffuse fourier x}
STOKES::{        convect exscite         x}

{[]velocity::NAVIER STOKES velocity}
