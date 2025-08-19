/ original system matrix  m:5  n:10
/ 00 01 02 -- -- -- -- -- -- --
/ 10 11 12 13 -- -- -- -- -- --    -: A[0;:]*a10%a00    a01*a10%a00
/ 20 21 22 23 24 -- -- -- -- --
/ -- 31 32 33 34 35 -- -- -- --
/ -- -- 42 43 44 45 45 -- -- --
/ -- -- -- 53 54 55 56 57 -- --
/ -- -- -- -- 64 65 66 67 68 --
/ -- -- -- -- -- 75 76 77 78 79
/ -- -- -- -- -- -- 86 87 88 89
/ -- -- -- -- -- -- -- 97 98 99
/
/ band storage
/ -- -- 02 13 24 35 45 57 68 79 -- --
/ -- 01 12 23 34 45 56 67 78 89 -- --
/ 00 11 22 33 44 55 66 77 88 99 -- --
/ 10 21 32 43 54 65 77 87 98 -- -- --
/ 20 31 42 53 64 75 86 97 -- -- -- --

lub:{[A;m;n]
/while the bandwidth is m, the overlap between two rows is d:m-1 elements
/n:10           /number of columns (system order)
/m:5            /number of rows of packed matrix is the bandwidth
d:m-1           /number of upper+lower diagonals
h:d%2           /number of one-sided   diagonals
k:h*1+h         /number of all sub elements per step

/the leading row has 1+h nonzero elements. in each step we need to update
/h subrows, which are k:h*1+k nonzero elements

o:h                 /row offset for all following indexes    2 (increased by m)
I0:,/h#'d*!1+h      /top row indexes interleaved h times     0 0 4 4 8 8
AI:k#,/1+!h         /divident element indexes (all subrows)  1 2 1 2 1 2
IJ:I0+AI            /all h sub row indexes                   1 2 5 6 9 10
a0:0                /pivot element index                     0



while[n-:1
 A[o+IJ]-:A[o+I0]*A[o+AI]%p:A o+a0
 o+:m]
A}

P:{`< (`l@+(-m)^x),\"\n"}
m:5
h:(m-2)%2
n:10
A:(?m*n),(m*h)#0.
P lub[A;m;n]
