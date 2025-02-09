/lu decomposition, solve square system (partial pivoting)

lu:{[A]i:0;k:!#A;P:!#A
 while[1<#k
  j:i+*&a=m:|/a:abs A[k;i]
  P[(i;j)]:P[(j;i)]
  A[(i;j)]:A[(j;i)]
  A[k:1_k;i]%:A[i;i]
  A[k;k]-:A[k;i]*\A[i;k]
  i+:1]
 (A;P)}

lusolve:{[LUP;b];A:*LUP;P:*|LUP
 r:{[x;i;a]x[i]-:+/(a k)*x k:!i}/[b P;!n:#A;A]
   {[x;i;a]x[i]:(x[i]-+/(a k)*x k:(1+i)_!#x)%a[i]}/[r;|!n;|A]}

/ A:5^?25
/ x:?5
/ b:(+/*)\[A;x]
/ x-lusolve[lu A;b]
