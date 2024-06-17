
 
/T:l D d rho E
/example:
/ 4 nodes, 3 elements: +--+--+--+
/ n:16,   matrix size: 16x16 (for K M G)

Ki:{[ei;l]a:6*l;b:2*l*l;(ei%l*l*l)*sy(6;0;0;a;-12;0;0;a;6;-a;0;0;-12;-a;0;b;0;0;a;b;0;b;-a;0;0;b;6;0;0;-a;6;a;0;b;0;b)}
Mi:{[ra;l]a:156;b:44*l;c:108;d:-26*l;e:4*l*l;f:-6*l*l;(ra*l%840)*sy(a;0;0;b;c;0;0;d;a;-b;0;0;c;-d;0;e;0;0;d;f;0;e;-d;0;0;f;a;0;0;-b;a;b;0;e;0;e)}
Gi:{[ri;l]a:36;b:3*l;c:4*l*l;d:-l*l;(ri%15*l)*ys(-a;b;0;0;a;b;0;0;b;-a;0;0;b;-c;b;0;0;-d;0;b;d;0;-a;-b;0;0;-b;-c)}
sy:{,/x++x:((!8)#'0.),'(-1_+\0,8-!8)^x};ys:{,/x-+x:((1+!8)#'0.),'(+\0,7-!7)^x}

l:1 1 1.
D:2 2 2.
d:1 1 1.
rho:1 1 1.
E:1 1 1.

n:4*1+#l;
i0:,/(!8)+/n*!8    /submatrix for element j has 64 indexes  i0+o j
o:(1+n)*4*!#l

n0:(n*n)#0.

A:0.25p*(D2:D*D)-d2:(d*d)
I:0.015625p*(D2*D2)-d2*d2
ei:E*I
ra:rho*A
ri:rho*I
D:0.01     /D:0.5*(α%ω)*⁠β*ω   d:(α*M)+β*K

K:`K \{[k;i;ei;l]@[k;i+i0;+;Ki[ei;l]]}/[n0;o;ei;l]
M:{[m;i;ra;l]@[m;i+i0;+;Mi[ra;l]]}/[n0;o;ra;l]
G:{[g;i;ri;l]@[g;i+i0;+;Gi[ri;l]]}/[n0;o;ri;l]
/bc: add cx,cy to K diag at node at 0 1+4*i

/f:{[K;M;G;rhs;w]solve[imag[K-M*w2;G*w+K*D*0.5];rhs]}

T:+`l`D`d`rho`E!(..)
/rigid:   l:0, rho:mass
/support: l:0;rho:0; (D;d)is(cx;cy)
U:+`z`u!(..)
w:(2p%60)*5000*1+!100

