/svd  singular value decomposition (jacobi-hestenes)
svd:{[A];n:#A       /A:list of columns  real or complex
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

/if A is thin (more rows than columns), the svd can be done using R from the the qr decomposition of A.
/V and the singular values are the same, but U must be premultiplied with Q.
/the multiplication is done using the householder transformation stored in the qr decomposition.
/this is similar to the premultiplication with QT within qrsolve, but applies the transformation in reverse order.
svq:{q:qr x;h:q 0;r:q 1;n:q 2;m:q 3;o:0|(1+&n)@!m
 qmul:{x:o*m#x;K:,m-1;j:n-1;while[-1<j;x[K]-:(+/(conj h[j;K])*x K)*h[j;K];K:(-1+*K),K;j-:1];x} /Q*
 d:{x*(!#x)=/!#x}
 (,qmul'U:D 0),1_D:svd R:(d r)+(n#'h)*i</i:!n}

/ eye:{(!x)=/!x}
/ dia:{x*eye@#x}
/ uni:{|/|/abs mul[+conj x;x]-eye@#x}              /test if unitary: maxabs I-x'*x
/ mul:{(+/*)/[x;y]}                                /r,x,y: list of rows
/ dvs:{[U;s;V]|/|/abs A-mul[U]mul[dia s;+conj V]}  /test if A is U*S*V'
/ 
/ A:3^?12  /or 3^?12a (complex)
/ q:svd A
/ `u \uni U:q 0
/ `v \uni V:q 2
/ `t \dvs.q
