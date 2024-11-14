
P:4^
Z:(.5+!nn:n,n)%n:4       /grid:(X;Y)
Q:4\6 123

XX:0.,1_-Y*Y%RR:(X*X)+Y*Y:,/+n^X:0.+(n*n)#(!m),m,1_(-m)+!m:n%2
YY:0.,1_-X*X%RR;XY:0.,1_-X*Y%RR

PR: 1a,1_z*_(conj z:z%abs z:1a90*imag[X;Y])

fft:{$[-1+n:#x;(x+r),(x:fft x o)-r:(1@(!n)*-180.%n)*fft[x 1+o:2*!n%:2];x]}  /radix-2 recursive odd/even split
ifft:{(conj fft conj x)%#x}                                                 /inverse is fft under conjugation
/rfft:{.5*(x+y;1a270*x-y:conj(x:fft imag[x;y])n!n-!n:#x)}                   /real241 two for the price of one
/rfft:{.5*(x+i;1a270*x-i:conj(x:fft x)n!n-!n:#x)}
fft2:,/fft'+fft'+n^imag/                                                    /two-dim separate and do it again
ifft2:(_;imag)@\,/ifft'+ifft'+n^
//ufft:{[f;n](_;imag)@\,/+ifft'+ifft'n^f@,/+fft'+fft'n^imag/}

fourier:{$[-1+n:#x;(x+r),(x:f x o)-r:(1@(!n)*-180.%n)*(f:fourier)x 1+o:2*!n%:2;x]}
menfous:{(conj fourier conj x)%#x}
forward:{.5*(x+c;1a270*x-c:conj(x:,/f(f:fourier'+)n^imag/x)@n/n!n-!nn)}
inverse:{(_;imag)@\,/g(g:menfous'+)n^+/1 1a90*x}


t:      .1
viscous:.5*
diffuse:((exp@-RR*viscous t)*)'

R:,/'+'4^'
d:2^`f@<`data
w:R 2^d 0
f:R 2^d 1
t:0.1

//self-convection: v grad v
z:-.5+n*Z-t*w+:t*f            /backtrack
q:*/'((1-s),s:z-a:_z)Q        /bilinear average
i:nn/'n!(+!2 2)+\a
w:+/'q*/w@\i

/W:forward w
//ww:ifft2 W*exp(-RR*t*m)
//wp:e*_W*conj e:1a,1_e%abs e:1a90*imag[X;Y] /project
   
/ww:ifft2 ww

/w:inverse diffuse forward w

/F:{,/+fourier'+fourier'n^imag/x}
/G:{(_;imag)@\,/+menfous'+menfous'n^x}
/ZZ:1a,1_zz%abs zz:z:imag[X;Y]
/I:n/n!n-!nn

xx:0.,1_X*X%RR; xy:0.,1_X*Y%RR; yy:0.,1_Y*Y%RR
project:{u:x 0;v:x 1; (u-(yy*u)+xy*v;v-(xy*u)+xx*v)}

/ww:inverse project forward w
ww:xy*(forward w)0

/(project with imag W*conj imag[X;Y])
/div v=0=> 0=du/dx+dv/dy, after fourier: U=fft u;V=fft v; (X;Y):wavenumbers; 0=(X*U)+Y*V
/project with W-:W+(z*z%abs z:imag[X;Y])*conj W@n/n!n-!nn

/w:rfft2[n^imag/w]

/`data<`c@-.5*?4*n*n

/self advection: v grad v


/   gauss seidel
/   pratt whitney
/   boyle mariotte
/   euler bernoulli
/   hagen poiseuille
/  cauchy green
/  navier stokes
/  taylor couette
/  cayley hamilton
/  kelvin helmholtz
/ prandtl meyer
/benjamin ono
/rayleigh benard
