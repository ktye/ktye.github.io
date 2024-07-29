
/T:l D d r E
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

/ `L \L
/ `D \D
/ `d \d
/ `E \E
/ `rho \rho
/ `m \m
/ `J \J
/ `Q \Q
/ `cx \cx
/ `cy \cy
/ `U \U

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


/test:{[x;xx]dx:x-,/xx;nz:&~dx=0.;dx[nz]:dx[nz]%x[nz];|/abs dx}
/`dK \test[K;KK]
/`dM \test[M;MM]
/`dG \|/abs G+,/GG /G has different sign

lu:{[A]i:0;k:!#A;P:!#A;while[1<#k;j:i+*&a=m:|/a:abs A[k;i];P[(i;j)]:P[(j;i)];A[(i;j)]:A[(j;i)];A[k:1_k;i]%:A[i;i];A[k;k]-:A[k;i]*\A[i;k];i+:1];(A;P)}
lusolve:{[LUP;b];A:*LUP;P:*|LUP;r:{[x;i;a]x[i]-:+/(a k)*x k:!i}/[b P;!n:#A;A];{[x;i;a]x[i]:(x[i]-+/(a k)*x k:(1+i)_!#x)%a[i]}/[r;|!n;|A]}
solve:{lusolve[lu x;y]}

luA:{[w2];lu k^imag[K-M*w2;B+w2*G]}
f:{[omega;nodes];lusolve[luA w2;u*w2:omega*omega]nodes}

la:{[l;isen;u];lusolve[l;u]isen}
ic:{[ipln;isen;w2],/la[luA w2;isen]'w2*@[0a+&k;;1a 1a90]'0 1+/2*ipln}
IC:{[ipln;isen;W ](rs.#'(ipln;isen;W))@,/ic[ipln;isen]'W*W}
rs:{[npl;nse;nsp;x]x@(`npl \npl;`nse \nse;`nsp \nsp)/((nsp;npl;nse)\!#x)1 2 0}


/f:{[omega;nodes];w2:omega*omega;solve[k^imag[K-M*w2;B+w2*G];w2*u]nodes}
/ic:{[Omega;isen;ipln]} Omega'


/f:{[rpm]w2:w*w:0.10471975511965978*rpm;solve[k^imag[K-M*w2;B+w2*G];w2*u][,/0 1+/4*!n]}
/F:{[RPM],/f'RPM}

/system:{[rpm]w2:w*w:0.10471975511965978*rpm; `A`f!(k^imag[K-M*w2;B+w2*G];w2*u)}
/s3:system 300000.
/A:s3`A
/f:s3`f
/ e@&~0n~e:,/(abs A-AA)%abs A
