/lu decomposition with symmetrical band storage

lub:{[A;m;n]k:h*1+o:h:(d:m-1)%2;t:,/h#'d*!1+h;j:t+k#q:1+!h;Q:k#!h
 while[n-:1;l:A[o+q]%A o;A[o+j]-:A[o+t]*l Q;A[o+q]:l;o+:m];A}
lubsolve:{[A;m;n;b]J:(j:-h-!h:(m-1)%2)*m-1;z:0*h#b
 A:((m*h)#z),A;b:z,b,z;d:h+m*h;i:h
 while[i<n+h;b[i]-:+/A[d+J]*b i+j;i+:1;d+:m]
 while[i>h;i-:1;d-:m;b[i]:(b[i]-+/A[d-J]*b i-j)%A d];b h+!n}
 

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

