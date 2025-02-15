/qr decomposition & least squares

qr:{K:!m:#*x;I:!n:#x;j:0;r:n#0a;turn:$[`Z~@*x;{(-x)@angle y};{x*1. -1@y>0}]
 while[j<n;I:1_I
  r[j]:turn[s:abs@abs/j_x j;xx:x[j;j]]
  x[j;j]-:r[j]
  x[j;K]%:%s*(s+abs xx)
  x[I;K]-:{+/x*y}/[(conj x[j;K]);x[I;K]]*\x[j;K]
  K:1_K;j+:1];(x;r;n;m)}

lsq:{qslv:{H:x 0;r:x 1;n:x 2;m:x 3;j:0;K:!m
 while[j<n;y[K]-:(+/(conj H[j;K])*y K)*H[j;K];K:1_K;j+:1]
 i:n-1;J:!n;y[i]%:r@i
 while[i;j:i_J;i-:1;y[i]:(y[i]-+/H[j;i]*y@j)%r@i]
 n#y}
 q:$[`i~@*|x;x;qr x];$[`L~@y;qslv/[q;y];qslv[q;y]]}

/ dot:(+/*)\
/ A:(3 5 -8 12.;-2 3 3 0.;7 -8 2 1.)
/ b:dot[+A;x:1 2 3];0.00001>|/abs x-lsq[A;b]
/
/ A:+0a0+(1 -2a90 3;5a90 3 2;2 3 1;4 -1 1);
/ 0.0001>|/abs r-lsq[A;dot[+A;r:1a30 2a30 3a30]]
