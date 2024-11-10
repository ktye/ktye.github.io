
P:4^
Z:(.5+!nn:n,n)%n:4       /grid:(X;Y)
Q:4\6 123

flow:{[w;f;m;t]..}

R:,/'+'4^'
d:2^`f@<`data
w:R 2^d 0
f:R 2^d 1
t:0.1

/self-convection: v grad v
z:-.5+n*Z-t*w+:t*f            /backtrack
q:*/'((1-s),s:z-a:_z)Q        /bilinear average
i:nn/'n!(+!2 2)+\a
W:+/'q*/w@\i
/W:+/'(*/'((1-s),s:z-a)Q)*/w@\nn/'n!(+!2 2)+\a:_z



/`data<`c@-.5*?4*n*n

/self advection: v grad v

