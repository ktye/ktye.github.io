/jacobi-hestenes

svd:{[A];n:#A
 d:{+/(conj x)*y}
 J:{$[1e-14<a:abs xy:d[x;y];(c;s:(xy%a)*t*c:1%%1+t*t:((q>0)-q<0)%(abs q)+%1+q*q:(_d[y;y]-_d[x;x])%2*a);1 0]}
 R:{[c;s;x;y]((x*c)-y*conj s;(x*s)+y*c)}
 Q:{[ik]r:J.A ik;A[ik]:R.r,A ik;V[ik]:R.r,V ik}
 V:0a+(!n)=/!n:#A
 P:{[A;ik]r:J.A ik;V[ik]:R.r,V ik;A[ik]:R.r,A ik}
 I:,/i,''&'i>/i:!n
 F:{[A]P/(,A),I}
 A:F/A
 (U:A%s;s:abs/'A;V)}

/if A is thin (many rows, few columns n)  A:m x n
/initial qr decomposition: A=QR           R:n x n
/solve svd for R:          R=USV'
/svd for A is:             A=(QU)SV'   (exchange U with QU)
qr:{K:!m:#*x;I:!n:#x;j:0;r:n#0a;turn:$[`Z~@*x;{(-x)@angle y};{x*1. -1@y>0}]
 while[j<n;I:1_I
  r[j]:turn[s:abs@abs/j_x j;xx:x[j;j]]
  x[j;j]-:r[j]
  x[j;K]%:%s*(s+abs xx)
  x[I;K]-:{+/x*y}/[(conj x[j;K]);x[I;K]]*\x[j;K]
  K:1_K;j+:1];(x;r;n;m)}
svq:{q:qr x;h:q 0;r:q 1;n:q 2;m:q 3;o:0|(1+&n)@!m
 /qmul:{K:!m;j:0;while[j<n;x[K]-:(+/(conj h[j;K])*x K)*h[j;K];K:1_K;j+:1];x} /Q'*
 qmul:{x:o*m#x;K:!m;j:n-1;while[-1<j;x[K]-:(+/(conj h[j;K])*x K)*h[j;K];K:1_K;j-:1];x} /Q*
 d:{x*(!#x)=/!#x}
 R:(d r)+(n#'h)*i</i:!n
 (,qmul'U:D 0),1_D:svd R}


eye:{0a+(!x)=/!x}
dia:{x*eye@#x}
uni:{|/|/abs(+/*)\[+conj x;x]-eye@#*x}       /test if unitary: maxabs I-x'*x
mul:{(+/*)/[x;y]}                            /r,x,y: list of rows
dvs:{[U;S;V]|/|/abs A-mul[U]mul[S;+conj V]}  /test if A is U*S*V'

/A:`A \4^?24a
/q:svd A
/s:q 1
/S:dia s
/`u \uni U:q 0
/`v \uni V:q 2
/`t \dvs[U;S;V]

A:4^?16a
x:svd@+A; U1:x 0;s1:x 1;V1:x 2
x:svq@+A; U2:x 0;s2:x 1;V2:x 2
