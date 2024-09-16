/jacobi-hestenes

j:{[A]
 ik:+(&|!n;,/1_(!n)_\!n:#A)  /+,/'(1+!n)_'/n^'!n,n

 /A:f/[ik;A]

 V:0a+(!n)=/!n
 r:{((x*c)-y*conj s;(x*s)+y*c)}
 f:{[A;ik]
  uu:_d:{+/(conj x)*y}[u;u:A@*ik];uv:d[u;v:A ik 1];vv:_d[v;v]
  $[1e-12>abs uv;A
   [s:uv%a*t*c:1%%1+t*t:((q>0)-q<0)%abs q+%1+q*q:(_d[v;v]-_d[u;u])%2*a:abs uv
    V[ik]+:r[V ik 0;V ik 1];A[ik]+:r[u;v]]]}
 f/[A;ik]
}

