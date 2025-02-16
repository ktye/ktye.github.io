fft:{$[-1+n:#x;(x+r),(x:fft x o)-r:(1@(!n)*-180.%n)*fft[x 1+o:2*!n%:2];x]}  /radix-2 recursive odd/even split
ifft:{(conj fft conj x)%#x}                                                 /inverse is fft under conjugation
rfft:{.5*(x+y;1a270*x-y:conj(x:fft imag[x;y])n!n-!n:#x)}                    /real241 two for the price of one
fft2:+fft'+fft'                                                             /two-dim separate and do it again

\
n:256
fft2 n^?n*1a*n

x:?n*1a
r:ifft fft x
$[1e-6<|/abs x-r;1+`fail;`ok]
