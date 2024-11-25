N:(.5+!nn:n,n)%n:32
R:abs Z:Z*Z:imag[X;Y:,/+n^X:0.+(n*n)#(!m),m,1_(-m)+!m:n%2]
I:n/n!n-!nn
Q:4\6 123

v:0.01;t:0.1;f:10*1a80*.5-imag/1 0*N;velocity:0.7*?0a+n*n
E:exp@-R*v*t

fourier:{,/+f'+(f:{$[-1+n:#x;(x+r),(x:f x o)-r:(1@(!n)*-180.%n)*f x 1+o:2*!n%:2;x]})'n^x    }
inverse:{,/+f'+(f:{$[-1+n:#x;(x+r),(x:f x o)-r:(1@(!n)* 180.%n)*f x 1+o:2*!n%:2;x]})'n^x%n*n}

project:{(x 0),1_(.5*x)+(Z%R)*-.5*conj x I}
diffuse:{E*x}
convect:{imag/+/'(*/'((1-s),s:c-a)Q)*/x@\nn/'n!(+!2 2)+\a:_c:-.5+n*N-t*x}
exscite:{(_;imag)@\x+t*f}

NAVIER::{inverse project diffuse fourier x}
STOKES::{        convect exscite         x}

{[]velocity::NAVIER STOKES velocity}


/click to perturb vector field