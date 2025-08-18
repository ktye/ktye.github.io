m:1+w:5
u:(w-1)%2
n:8
A:?m*n

lub:{[A;n]
 p:(m-1)%2
 i1:!u*m
 i0:m!i1
/ while[p<n-m
  A[i1+m]-:(A i1+m)*(A i0)%A p
  p+:1+m;i1+:1+m;i0+:1+m
/  A[i1+m]-:(A i1+m)*(A i0)%A p
 A
}
 \A
 \8^lub[A;n]

