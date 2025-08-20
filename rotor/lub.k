/lu decomposition with symmetrical band storage

/ original system     m:5  n:10  
/ 00 01 02 -- -- -- -- -- -- --
/ 10 11 12 13 -- -- -- -- -- --  -: A0*a10%a00
/ 20 21 22 23 24 -- -- -- -- --  -: A0*a20%a00
/ -- 31 32 33 34 35 -- -- -- --
/ -- -- 42 43 44 45 45 -- -- --
/ -- -- -- 53 54 55 56 57 -- --  full:   n^3
/ -- -- -- -- 64 65 66 67 68 --  band: n*m^2 (linear)
/ -- -- -- -- -- 75 76 77 78 79
/ -- -- -- -- -- -- 86 87 88 89
/ -- -- -- -- -- -- -- 97 98 99
/
/ band storage   (flat column major vector)
/ -- -- 02 13 24 35 45 57 68 79 -- --
/ -- 01 12 23 34 45 56 67 78 89 -- --
/ 00 11 22 33 44 55 66 77 88 99 -- --
/ 10 21 32 43 54 65 77 87 98 -- -- --
/ 20 31 42 53 64 75 86 97 -- -- -- --
/                               ^^ ^^
/ padding is needed for the edges, so we always update full diagonals.
/ if k returned 0 for outdexing and ignored amend outside the domain x[i]-:.. we would not need to pad.

lub:{[A;m;n]
 /while the bandwidth is m, the overlap between two rows is d:m-1 elements
 /n:10          /number of columns (system order)
 /m:5           /number of rows of packed matrix is the bandwidth
 d:m-1          /number of upper+lower diagonals
 h:d%2          /number of one-sided   diagonals
 k:h*1+h        /number of all sub elements per step
 
 /the leading row has 1+h nonzero elements. in each step we need to update
 /h subrows, which are k:h*1+h nonzero elements
 
 o:h            /row index offset                        2 (increased by m)
 t:,/h#'d*!1+h  /top row indexes interleaved h times     0 0 4 4 8 8
 q:1+!h         /leading indexes of sub rows             1 2
 Q:k#!h         /divident element indexes (all subrows)  0 1 0 1 0 1
 j:t+k#q        /all h sub row indexes                   1 2 5 6 9 10
 
 while[n-:1
  l:A[o+q]%A o            /scale factors for h subrows
  A[o+j]-:A[o+t]*l Q      /eliminate leading elements of subrows
  A[o+q]:l;o+:m]          /store factors as lower band matrix
 A}                       /return LU decomposition

lubsolve:{[A;m;n;b]      /A:packed lu decomposition, b:rhs
 h:(m-1)%2                                                    2
 j:-h-!h                 /offset to h previous element in b   -2 -1
 J:j*m-1                 /previous lower column index offset  -10 -5
 z:0*h#b                 /typed zeros
 A:((m*h)#z),A           /prepend h zero columns to A            
 b:z,b,z                 /zero pad h elements to start and end of b
 d:h+m*h                 /index to current diagonal element   12
 i:h                     /current rhs index                   2
 while[i<n+h;b[i]-:+/A[d+J]*b i+j;i+:1;d+:m]      /forward substitution
 while[i>h;i-:1;d-:m;b[i]:(b[i]-+/A[d-J]*b i-j)%A d] /back substitution
 b h+!n}
  
