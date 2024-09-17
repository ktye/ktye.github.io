/jacobi-hestenes

qvd:{[A];n:#A
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

svd:{q:qr x;..}

A:4^?16a

/todo: grade, transpose?
/      use R:qr..
