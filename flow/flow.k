

Z:(.5+!nn:n,n)%n:8       /grid:(X;Y)

flow:{[w;f;m;t]
 
 z:-.5+n*Z-t*w+:t*f
 q:{(x;x)}[,/(1-s)*/\s:z-a:_z]
 w:(w@nn/'n!(+2\!4)+\a)*q
 
 
}



d:2^`f@<`data
w:2^d 0
f:2^d 1
t:0.1

z:-.5+n*Z-t*w+:t*f
q:{(x;x)}[,/(1-s)*/\s:z-a:_z]
i:nn/'n!(+2\!4)+\a
/W:w@i * q

/w:(w@nn/'n!(+2\!4)+\a)*q


/`data<`c@-.5*?4*n*n


/self advection: v grad v
