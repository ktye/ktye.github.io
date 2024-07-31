/example:
/ 4 nodes, 3 elements: +--+--+--+
/ matrix size: 16x16 (for K M G)

/per shaft element: L D d E rho
/per node:          m J Q cx cy U

/ L:10#0.01
/ D:10#0.01
/ d:10#0.
/ E:10#2e11
/ rho:10#7850.
/ m:11#0.
/ J:11#0.
/ Q:11#0.
/ cx:103100 0 0 0 0 0 0 0 0 0 103100.
/ cy:103100 0 0 0 0 0 0 0 0 0 103100.
/ U:0 0 1.e-6a30 0 0 0 0 0 1.e-6a30 0 0


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
M[diag]+:,/+(m;m;J;Q)                          /add mass and equatorial moment of inertia of disc elements to diagonal
G[1+i+k*i:2+4*!n]+:J                           /add polar moments of inertia to gyroscopic matrix counter diagonal
G[i+k*1+i:2+4*!n]-:J
B:-0.02*K                                      /damping proportional to K*ω   /D:0.5*(α%ω)*⁠β*ω   d:(α*M)+β*K
u:,/1 1a90 0 0*/U                              /unbalance excitation vector


flip:,/+^                                      /dyadic transpose: {z@<(y x)/(!y)x}[1 2 0;shape;vector]

qr:{K:!m:#*x;I:!n:#x;j:0;r:n#0a;turn:{(-x)@angle y}
 while[j<n;I:1_I;r[j]:turn[s:abs@abs/j_x j;xx:x[j;j]]
  x[j;j]-:r[j];x[j;K]%:%s*(s+abs xx);x[I;K]-:{+/x*y}/[(conj x[j;K]);x[I;K]]*\x[j;K];K:1_K;j+:1];(x;r;n;m)}
qrsolve:{qslv:{H:x 0;r:x 1;n:x 2;m:x 3;j:0;K:!m;while[j<n;y[K]-:(+/(conj H[j;K])*y K)*H[j;K];K:1_K;j+:1]
 i:n-1;J:!n;y[i]%:r@i;while[i;j:i_J;i-:1;y[i]:(y[i]-+/H[j;i]*y@j)%r@i];n#y};q:qr x;$[`L~@y;qslv/[q;y];qslv[q;y]]}

lu:{[A]i:0;k:!#A;P:!#A;while[1<#k;j:i+*&a=m:|/a:abs A[k;i];P[(i;j)]:P[(j;i)];A[(i;j)]:A[(j;i)];A[k:1_k;i]%:A[i;i];A[k;k]-:A[k;i]*\A[i;k];i+:1];(A;P)}
lusolve:{[LUP;b];A:*LUP;P:*|LUP;r:{[x;i;a]x[i]-:+/(a k)*x k:!i}/[b P;!n:#A;A];{[x;i;a]x[i]:(x[i]-+/(a k)*x k:(1+i)_!#x)%a[i]}/[r;|!n;|A]}
solve:{lusolve[lu x;y]}

luA:{[w2];lu k^imag[K-w2*M;B+w2*G]}
f:{[omega;nodes];lusolve[luA w2;u*w2:omega*omega]nodes}

la:{[l;isen;u];lusolve[l;u]isen}
ic:{[ipln;isen;w2],/la[luA w2;isen]'w2*@[0a+&k;;1a 1a90]'0 1+/2*ipln}
IC:{[ipln;isen;W ]flip[#W;,/ic[ipln;isen]'W*W]}


/plots
sig:{+/*[(#u)^x;u:U@&~U=0a]}                                                    /displacement: mmul ic with unbals
dis:{sig x}                                                                     /todo initial,residual
fil:{(*x;*|x)}                                                                  /first,last
tus:{Z:0.,+\L;zs:Z fil@&~0=cx;zu:Z fil@&~0a=U;T:(1%--/u)*1 -1*|zu-\zs;T(+/*)\x} /transform unbals from spring nodes to outer unbal nodes
st3:{x;(x 0;+/x;x 1)}                                                           /a,static,b
pln:{x;fil@&~0a=U}                                                              /node index of outer unbalance planes
prm:{[x;i;w]c:fil cx@&~0=cx;,/st3 tus (1%w*w)*/c*fil((-#w)^dis[x])i}            /unbal by force measurement: use outer springs/sensors, transform from spring to unbal planes
unb:{s:dis[x];u:U@&~0a=U;c:@[(#u)#0na;&y;qrsolve[((#u)^x)@&y;dis[x]]];+u,c}     /unbals and corrections













