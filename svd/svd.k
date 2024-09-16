/jacobi-hestenes

j:{
 i:&|!n:#A
 k:,/1_(!n)_\!n
 uu:_d:{+/(conj x)*y}[u;u:A i];uv:d[u;v:A k];vv:_d[v;v]
 r:{((x*c)-y*conj s;(x*s)+y*c)}
 $[1e-12>abs uv;A;
  s:uv%a*t*c:1%%1+t*t:((q>0)-q<0)%abs q+%1+q*q:(_d[v;v]-_d[u;u])%2*a:abs uv
 V[i,k]+:r[V i;V k]
 A[i,k]+:r[u;v]

 A:$[1e-12>abs uv;A
}

