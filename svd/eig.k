hes:{[A]n:#A         /hessenberg H=Q'AQ
 Q:0.+(!n)=/!n
 j:0
 while[j<n-1
  K:(1+j)_!n
  u:A[K;j]
  u[0]+:(s%abs s:*u)*abs/u
  v:u%abs/u
  A[K ]-:(2*v)*\+/(conj v)*A[K]
  A[;K]-:(A[;K](+/*)\2*v)*\v
  Q[;K]-:(Q[;K](+/*)\2*v)*\v
  j+:1]
 (A;Q)}

hes:{[A]Q:(0***A)+(!n)=/!n:#A               /hessenberg H=Q'AQ
 |(,Q),,{[A;j]v:u%abs/u[0]+:(s%abs s:*u)*abs/u:A[K:(1+j)_!n;j]
  A[K ]-:(2*v)*\+/(conj v)*A[K]
  Q[;K]-:(Q[;K](+/*)\2*v)*\v
  A[;K]-:(A[;K](+/*)\2*v)*\v}/(,A),!n-1}

A:(1 2 1 2.;3 1 3 2.;6 1 2 2.;6 1 3 4.)
q: \hes 1a20*A
