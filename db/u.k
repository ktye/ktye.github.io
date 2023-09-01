/----------------------------|

//lib

qr:{K:!m:#*x;I:!n:#x;j:0;r:n#0a;turn:$['Z~@*x;{(-x)@angle y};{x*1. -1@y>0}]
 while[j<n;I:1_I;r[j]:turn[s:abs@abs/j_x j;xx:x[j;j]]
  x[j;j]-:r[j];x[j;K]%:%s*(s+abs xx)
  x[I;K]-:{+/x*y}/:[(conj x[j;K]);x[I;K]]*\:x[j;K];K:1_K;j+:1];(x;r;n;m)}
solve:{qslv:{H:x 0;r:x 1;n:x 2;m:x 3;j:0;K:!m
 while[j<n;y[K]-:(+/(conj H[j;K])*y K)*H[j;K];K:1_K;j+:1]
 i:n-1;J:!n;y[i]%:r@i
 while[i;j:i_J;i-:1;y[i]:(y[i]-+/H[j;i]*y@j)%r@i];n#y}
 q:$['i~@*|x;x;qr x];$['L~@y;qslv/:[q;y];qslv[q;y]]}
 
dot:(+/*)\:
avg:{(+/x)%0.+#x}
var:{(+/x*x:(x-avg x))%-1+#x}
std:{%var x}
med: **|2^^
mu95:{b:3.2;f:{(std x)^b};1.97*((f@_x)+f imag x)^(1%b)}

//cal

//index

//abc

//staticmoment

//constraints

//convert
