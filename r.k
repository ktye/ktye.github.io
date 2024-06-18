xkfem:{[]l:A`l;D:A`D;d:A`d;r:A`r;E:A`E;S:.S;Q:.Q;U:.U
 
/T:l D d r E
/example:
/ 4 nodes, 3 elements: +--+--+--+
/ n:16,   matrix size: 16x16 (for K M G)

/l:1 1 1.                     /lengths
/D:2 2 2.                     /outer diameter
/d:1 1 1.                     /inner diameter
/r:1 1 1.                     /density
/E:1 1 1.                     /elasticity modulus
/S:(0 2;1 3.;2 4.)            /spring support B:(i;cx;cy)
/Q:(0 2;2 2.;1 1.;1 1.)       /disc elements: Q:(i;Da;Di;m)
/U:(0 2;2a30 3a70)            /unbalances     U:(i;u)

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

n:4*1+#l                                       /system matrix dimensions (4*number of nodes)
i0:,/(!8)+/n*!8                                /submatrix for element j has 64 indexes  i0+o j
o:(1+n)*4*!#l                                  /offset for element i
n0:(n*n)#0.                                    /zero initial matrix
K:{[k;i;ei;l]@[k;i+i0;+;Ki[ei;l]]}/[n0;o;ei;l] /assemble stiffness matrix from overlapping element matrices
M:{[m;i;ra;l]@[m;i+i0;+;Mi[ra;l]]}/[n0;o;ra;l] /mass matrix
G:{[g;i;ri;l]@[g;i+i0;+;Gi[ri;l]]}/[n0;o;ri;l] /gyroscopic matrix

rl:4*Q[3]%((D2:q*q:Q[1])-d2:Q[2]*Q[2])         /r*pi*length from mass,Da,Di
ip:2*iq:0.015625*rl*(D2*D2)-d2*d2              /polar/equatorial moments of inertia, neglect (m%12)*l*l in iq
K[i+n*i:,/0 1+\4**S]+:,/1_S                    /add spring support to nodes i on diagonal. 
M[i+n*i:,/(!4)+\4**Q]+:q,q,iq,iq               /add mass and equatorial moment of inertia of disc elements to diagonal
G[1+i+n*i:2+4**Q]+:ip                          /add polar moments of inertia to gyroscopic matrix counter diagonal
G[i+n*1+i:2+4**Q]-:ip
B:0.01*K                                       /damping proportional to K*ω   /D:0.5*(α%ω)*⁠β*ω   d:(α*M)+β*K
u:@[n#0a;,/0 1+/4**U;,/1a 1a270*/U[1]]         /unbalance excitation vector



lu:{[A]i:0;k:!#A;P:!#A;while[1<#k;j:i+*&a=m:|/a:abs A[k;i];P[(i;j)]:P[(j;i)];A[(i;j)]:A[(j;i)];A[k:1_k;i]%:A[i;i];A[k;k]-:A[k;i]*\A[i;k];i+:1];(A;P)}
lusolve:{[LUP;b];A:*LUP;P:*|LUP;r:{[x;i;a]x[i]-:+/(a k)*x k:!i}/[b P;!n:#A;A];{[x;i;a]x[i]:(x[i]-+/(a k)*x k:(1+i)_!#x)%a[i]}/[r;|!n;|A]}
solve:{lusolve[lu x;y]}

f:{[rpm]w2:w*w:0.10471975511965978*rpm;solve[imag[K-M*w2;G*w+B];u]}
   
333}
init:{[] `init \`init;A::`A \+`l`D`d`r`E!3#'1 2 1 1 1.;store`A}
