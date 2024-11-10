
fft:{$[-1+n:#x;(x+r),(x:fft x o)-r:(1@(!n)*-180.%n)*fft[x 1+o:2*!n%:2];x]}


n:4
f:fftn n
r:fft[f;z:`z@?2*n]
R:FFT z

 \_z
 \imag z

