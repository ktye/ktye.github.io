
P:4^
Z:(.5+!nn:n,n)%n:4       /grid:(X;Y)
Q:4\6 123

{(!n),n,1_(-n)+!n:x%2} /or {(!n),(-n)+!n:x%2}  or {,/1 -1*2^!x}

fft:{$[-1+n:#x;(x+r),(x:fft x o)-r:(1@(!n)*-180.%n)*fft[x 1+o:2*!n%:2];x]}  /radix-2 recursive odd/even split
ifft:{(conj fft conj x)%#x}                                                 /inverse is fft under conjugation
rfft:{.5*(x+y;1a270*x-y:conj(x:fft imag[x;y])n!n-!n:#x)}                    /real241 two for the price of one
rfft:{.5*(x+i;1a270*x-i:conj(x:fft x)n!n-!n:#x)}
fft2:+fft'+fft'                                                             /two-dim separate and do it again

ufft:{[f]+ifft'+ifft'f@+fft'+fft'} / ufft[r*;x]

flow:{[w;f;m;t]..}

R:,/'+'4^'
d:2^`f@<`data
w:R 2^d 0
f:R 2^d 1
t:0.1

/self-convection: v grad v
z:-.5+n*Z-t*w+:t*f            /backtrack
q:*/'((1-s),s:z-a:_z)Q        /bilinear average
i:nn/'n!(+!2 2)+\a
w:+/'q*/w@\i



/w:rfft2[n^imag/w]

/`data<`c@-.5*?4*n*n

/self advection: v grad v

