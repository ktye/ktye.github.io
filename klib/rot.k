L:10#0.01
D:10#0.01
d:10#0.
E:10#2e11
rho:10#7850.
m:11#0.
t:11#0.
J:11#0.
Q:11#0.
cx:103100 0 0 0 0 0 0 0 0 0 103100.
cy:103100 0 0 0 0 0 0 0 0 0 103100.
U:0 0 1.e-6a30 0 0 1.e-6a30 0 0 1.e-6a30 0 0


A:0.25p*(D2:D*D)-d2:(d*d)
I:0.015625p*(D2*D2)-d2*d2
ei:E*I
ra:rho*A
ri:rho*I

/element matrix 8x8: K(stiffness) M(mass) G(gyroscopic), K M symmertric, G antimetric
Ki:{[ei;l]a:6*l;b:2*l*l;(ei%l*l*l)*sy(6;0;0;a;-12;0;0;a;6;-a;0;0;-12;-a;0;b;0;0;a;b;0;b;-a;0;0;b;6;0;0;-a;6;a;0;b;0;b)}
Mi:{[ra;l]a:156;b:44*l;c:108;d:-26*l;e:4*l*l;f:-6*l*l;(ra*l%840)*sy(a;0;0;b;c;0;0;d;a;-b;0;0;c;-d;0;e;0;0;d;f;0;e;-d;0;0;f;a;0;0;-b;a;b;0;e;0;e)}
Gi:{[ri;l]a:36;b:3*l;c:4*l*l;d:-l*l;(ri%15*l)*ys(-a;b;0;0;a;b;0;0;b;-a;0;0;b;-c;b;0;0;-d;0;b;d;0;-a;-b;0;0;-b;-c)}
sy:{,/x++x:((!8)#'0.),'(-1_+\0,8-!8)^x};ys:{,/x-+x:((1+!8)#'0.),'(+\0,7-!7)^x}

k:4*n:1+#L                                     /n:nodes, k:system matrix dimensions (4 dofs per node)
i0:,/(!8)+/k*!8                                /submatrix for element j has 64 indexes  i0+o j
o:(1+k)*4*!#L                                  /offset for element i
n0:(k*k)#0.                                    /zero initial matrix
K:{[k;i;ei;l]@[k;i+i0;+;Ki[ei;l]]}/[n0;o;ei;L] /assemble stiffness matrix from overlapping element matrices
M:{[m;i;ra;l]@[m;i+i0;+;Mi[ra;l]]}/[n0;o;ra;L] /mass matrix
G:{[g;i;ri;l]@[g;i+i0;+;Gi[ri;l]]}/[n0;o;ri;L] /gyroscopic matrix

diag:(!k)+k*!k
K[diag]+:,/+(cx;cy;0;0)                        /add spring support to digonal
M[diag]+:,/+(m;m;Q;Q)                          /add mass and equatorial moment of inertia of disc elements to diagonal
G[1+i+k*i:2+4*!n]-:J                           /add polar moments of inertia to gyroscopic matrix counter diagonal
G[i+k*1+i:2+4*!n]+:J
B:-0.02*K                                      /damping proportional to K*ω   /D:0.5*(α%ω)*⁠β*ω   d:(α*M)+β*K
u:,/1 1a90 0 0*/U                              /unbalance excitation vector

flip:,/+^                                      /flip[*y;z] same as dyadic transpose {z@<(y x)/(!y)x}[1 2 0;y;z]

LU:{[A;n;b],/lusolve/[lu k^A;((#b)%n)^b]}     /overwritten with native version

Aw2:{[w2];imag[K-w2*M;B+w2*G]}
sh:{[omega;nodes];LU[Aw2 w2;k;u*w2:omega*omega]nodes}

la:{[l;isen;u];lusolve[l;u]isen}
ic:{[ipln;isen;w2]r:LU[Aw2 w2;k;,/w2*@[0a+&k;;1a 1a90]'0 1+/4*ipln];,/((#ipln)^r)@\isen}
IC:{[ipln;isen;W ]uin::U ipln;flip[#W;,/ic[ipln;isen]'W*W]}


/plots
dis:{1e6*sig[x;uin],sig[x;uin-$[+/y;cor[x;y];0]]}                                /displacement initial,residual per sensor
cor:{@[(#u)#0a;&y;qrsolve[((#u)^x)@&y;sig[x;u:uin]]]}                            /correction unbal at selected planes y
unb:{,/+2^uin,cor[x;y]}                                                          /unbals and corrections
prm:{[x;i;w]c:fil cx@&~0=cx;,/st3 tus (1%w*w)*/c*fil((-#w)^sig[x;uin])i}         /unbal by force measurement: use outer springs/sensors, transform from spring to unbal planes

sig:{+/*[(#y)^x;y]}                                                              /displacement: mmul ic with unbals
fil:{(*x;*|x)}                                                                   /first,last
tus:{Z:0.,+\L;zs:Z fil@&~0=cx;zu:Z fil@&~0a=U;T:(1%--/zu)*1 -1*|zu-\zs;T(+/*)\x} /transform unbals from spring nodes to outer unbal nodes
st3:{x;(x 0;+/x;x 1)}                                                            /a,static,b
pln:{x;fil@&~0a=U}                                                               /node index of outer unbalance planes

$[60~#IC[0 3 5;1 4;0.1*!10];`ok;1+`fail]
