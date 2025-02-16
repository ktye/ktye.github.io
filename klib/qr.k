/qr decomposition & least squares
/qr A:list of columns
qr:{K:!m:#*x;I:!n:#x;j:0;r:n#0a;turn:$[`Z~@*x;{(-x)@angle y};{x*1. -1@y>0}]
 while[j<n;I:1_I
  r[j]:turn[s:abs@abs/j_x j;xx:x[j;j]]
  x[j;j]-:r[j]
  x[j;K]%:%s*(s+abs xx)
  x[I;K]-:{+/x*y}/[(conj x[j;K]);x[I;K]]*\x[j;K]
  K:1_K;j+:1];(x;r;n;m)}

/lsq[A;b]  A(list of columns) may reuse the composition (A:qr A)
lsq:{qslv:{H:x 0;r:x 1;n:x 2;m:x 3;j:0;K:!m
 while[j<n;y[K]-:(+/(conj H[j;K])*y K)*H[j;K];K:1_K;j+:1]
 i:n-1;J:!n;y[i]%:r@i
 while[i;j:i_J;i-:1;y[i]:(y[i]-+/H[j;i]*y@j)%r@i]
 n#y}
 q:$[`i~@*|x;x;qr x];$[`L~@y;qslv/[q;y];qslv[q;y]]}

\
a:?'4#1030a
x:?4a
b:(+a)(+/*)\x

n:300;while[n-:1;r:lsq[a;b]]
$[1e-6<|/abs r-x;1+`fail;`ok]
