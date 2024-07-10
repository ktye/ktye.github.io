
/T:l D d r E
/example:
/ 4 nodes, 3 elements: +--+--+--+
/ matrix size: 16x16 (for K M G)

/per shaft element: L D d E rho
/per node:          m J cx cy u a U


A:0.25p*(D2:D*D)-d2:(d*d)
I:0.015625p*(D2*D2)-d2*d2
ei:E*I
ra:r*A
ri:r*I

/element matrix 8x8: K(stiffness) M(mass) G(gyroscopic), K M symmertric, G antimetric
Ki:{[ei;l]a:6*l;b:2*l*l;(ei%l*l*l)*sy(6;0;0;a;-12;0;0;a;6;-a;0;0;-12;-a;0;b;0;0;a;b;0;b;-a;0;0;b;6;0;0;-a;6;a;0;b;0;b)}
Mi:{[ra;l]a:156;b:44*l;c:108;d:-26*l;e:4*l*l;f:-6*l*l;(ra*l%840)*sy(a;0;0;b;c;0;0;d;a;-b;0;0;c;-d;0;e;0;0;d;f;0;e;-d;0;0;f;a;0;0;-b;a;b;0;e;0;e)}
Gi:{[ri;l]a:36;b:3*l;c:4*l*l;d:-l*l;(ri%15*l)*ys(-a;b;0;0;a;b;0;0;b;-a;0;0;b;-c;b;0;0;-d;0;b;d;0;-a;-b;0;0;-b;-c)}
sy:{,/x++x:((!8)#'0.),'(-1_+\0,8-!8)^x};ys:{,/x-+x:((1+!8)#'0.),'(+\0,7-!7)^x}

m:4*n:1+#L                                     /n:nodes, m:system matrix dimensions (4 dofs per node)
i0:,/(!8)+/m*!8                                /submatrix for element j has 64 indexes  i0+o j
o:(1+m)*4*!#L                                  /offset for element i
n0:(m*m)#0.                                    /zero initial matrix
K:{[k;i;ei;l]@[k;i+i0;+;Ki[ei;l]]}/[n0;o;ei;L] /assemble stiffness matrix from overlapping element matrices
M:{[m;i;ra;l]@[m;i+i0;+;Mi[ra;l]]}/[n0;o;ra;L] /mass matrix
G:{[g;i;ri;l]@[g;i+i0;+;Gi[ri;l]]}/[n0;o;ri;L] /gyroscopic matrix


Jq:0.5*J                                       /equatorial/polar moments of inertia, thin disc:neglect (m%12)*l*l in Jq
K[0+(n*i)+i:4*!n]+:cx                          /add spring support to nodes i on diagonal. 
K[1+(n*i)+i:4*!n]+:cy                          /add spring support to nodes i on diagonal. 
M[(!m)+m*!m  ]+:,/+(m;m;Jq;Jq)                 /add mass and equatorial moment of inertia of disc elements to diagonal
G[1+i+m*i:2+4*!n]+:J                           /add polar moments of inertia to gyroscopic matrix counter diagonal
G[i+m*1+i:2+4*!n]-:J
B:0.01*K                                       /damping proportional to K*ω   /D:0.5*(α%ω)*⁠β*ω   d:(α*M)+β*K
u:,/1 1a90 0 0*/U                              /unbalance excitation vector


lu:{[A]i:0;k:!#A;P:!#A;while[1<#k;j:i+*&a=m:|/a:abs A[k;i];P[(i;j)]:P[(j;i)];A[(i;j)]:A[(j;i)];A[k:1_k;i]%:A[i;i];A[k;k]-:A[k;i]*\A[i;k];i+:1];(A;P)}
lusolve:{[LUP;b];A:*LUP;P:*|LUP;r:{[x;i;a]x[i]-:+/(a k)*x k:!i}/[b P;!n:#A;A];{[x;i;a]x[i]:(x[i]-+/(a k)*x k:(1+i)_!#x)%a[i]}/[r;|!n;|A]}
solve:{lusolve[lu x;y]}

f:{[rpm]w2:w*w:0.10471975511965978*rpm;solve[imag[K-M*w2;G*w+B];u]}
   
