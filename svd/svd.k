/jacobi-hestenes

svd:{[A];n:#A
 d:{+/(conj x)*y}
 J:{(c;s:(z%a)*t*c:1%%1+t*t:((q>0)-q<0)%(abs q)+%1+q*q:(_0a+d[y;y]-d[x;x])%2*a:abs z)}
 R:{[c;s;x;y]((x*c)-y*conj s;(x*s)+y*c)}
 V:(!n)=/!n:#A
 P:{[A;ik]$[1e-14<abs z:d.A ik;[r:J.(A ik),z;V[ik]:R.r,V ik;A[ik]:R.r,A ik];A]}
 I:,/i,''&'i>/i:!n
 F:{[A]P/(,A),I}
 A:F/A
 U:A%s:abs/'A
 (U g;s g;V g:>s)}

svq:{q:qr x;h:q 0;r:q 1;n:q 2;m:q 3;o:0|(1+&n)@!m
 qmul:{x:o*m#x;K:,m-1;j:n-1;while[-1<j;x[K]-:(+/(conj h[j;K])*x K)*h[j;K];K:(-1+*K),K;j-:1];x} /Q*
 d:{x*(!#x)=/!#x}
 (,qmul'U:D 0),1_D:svd R:(d r)+(n#'h)*i</i:!n}

qr:{K:!m:#*x;I:!n:#x;j:0;r:n#0a;turn:$[`Z~@*x;{(-x)@angle y};{x*1. -1@y>0}]
 while[j<n;I:1_I
  r[j]:turn[s:abs@abs/j_x j;xx:x[j;j]]
  x[j;j]-:r[j]
  x[j;K]%:%s*(s+abs xx)
  x[I;K]-:{+/x*y}/[(conj x[j;K]);x[I;K]]*\x[j;K]
  K:1_K;j+:1];(x;r;n;m)}


test:{[rows;cols]                                  /test[4;3](real), test[4a;3](complex)
 eye:{(!x)=/!x}
 dia:{x*eye@#x}
 uni:{|/|/abs mul[+conj x;x]-eye@#x}              /test if unitary: maxabs I-x'*x
 mul:{(+/*)/[x;y]}                                /r,x,y: list of rows
 dvs:{[U;s;V]|/|/abs A-mul[U]mul[dia s;+conj V]}  /test if A is U*S*V'

 A:`A \cols^?rows*cols
 q:svd A
 `u \uni U:q 0
 `v \uni V:q 2
 `t \dvs.q
}

