flow:{[n;v;f;mu;dt]
 
 v+:dt*f
 
 z:imag[+y;y:n^(n*n)#(.5+!n)%n]
 z0:-.5+n*z-dt*v
 
 s:(    _x0)-i0:__z0
 t:(imag z0)-j0:_imag z0
 i1:n!1+i0:n!i0
 j0:n!1+j0:n!j0
 
 
 
 
 xy0:-.5+*n*(xy-dt*v)
 s:x0-i
 st:xy0-i0:_xy0
 i1:n!1+i0:n!i0
 
 
 
}