#include"a.h"//+,-.V3(a,bu(ia32_vfmaddps512_mask3)(c,b,a,-1,9))
VF(B0,A2(a,2*I2,x))VF(B1,A2(a,2*I2+1,x))Vf(BA,o(vpermilps)(x,0b10110001))ZE D={1,1,Q2,Q2,1,1,-Q2,Q2,-1,-1,-Q2,-Q2,-1,-1,Q2,Q2};
//ab aB cd(CD) cD(Cd) Iz={};
//a  c   a  a   a  c  a  c
//b  d   B  A   b  D  B  D
//ab cd aB  0  ab cD aB cD
//cd-cd  0-cD -cd-cD  0  0
//1  1   Q  Q   y  x -Q -Q
ZI y0={0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0},y1={1,3,1,0,1,3,1,0,1,3,1,0,1,3,1,0},y2={1, 1,3, 5, 1, 5,3,5,1, 1,3, 5, 1, 5,3,5};
ZE u0={1,1,-1,-1,1,-1,-1,-1, 1,1,-1,-1,1,-1,-1,-1},u1={1,-1,1,-1,-1,-1,1,1,1,-1,1,-1,-1,-1,1,1},u2={1,1,-1,-1,1,-1,-1,-1, -1,-1,1,1,-1,1,1,1},u3={1,1,Q2,Q2,1,1,-Q2,-Q2};
Vf(d3,Ea=d2(x,y0)+u0*d2(x,y1);a+=u1*a2(a,y2);Eb=d2(x,4+y0)+u2*d2(x,4+y1);a+b+u3*a2(b,y2))

Z2 const N=64;ZE X[16],Y[16];_Z(xy,eA=X;eR=Y;ii=0;h(8,ik=1<<h;j(k,i+=2;Ai=A[i+1]=cos(PI*j/k);Ri=R[i+1]=sin(PI*j/k))))Vg(c,Yi*BA(x)+Xi*x)
#define H(k) h(N/k,X=A+k*h;j(k/2,ii=k*h+j;a=X_;Ai=B0(a,b=X_);A[k+i]=B1(a,b)))
#define I(k) h(N/k,        j(k  ,ii=k*h+j;Ai+=r(c(k+j,A[k+i]),A[k+i]=Ai-r)))
_f(fft,Qz(16*N-nx)x=T(3,x);_R(3,2*nx,Ea;Eb;VA=sr;EX=sx;i(N/2,a=X_;Ai=B0(a,b=X_);A[N+i]=B1(a,b))H(32)H(16)H(8)H(4)H(2)e2*s=sx;h(N,ii=2*h;a=d3(V8);Ai=a+r(c(1,d3(V8)),A[1+i]=a-r))I(2)I(4)I(8)I(16)I(32)I(64)))
f(qq,fft(x))
#define mn(g,z) _Z(g,z,im,in,i2*r,i2*s)
#define Y(_) Z(m=k?n:m,u);i(n,++u[si>>k])IA=u;Iz=z2;Ib=z;i(n4(m),if(k)b=MI(b,Ai);Ai=z=z[15]+sI(Ai))if(k)m=mI(b)[15]; //=.8(.4-1.2)^1.5(.5-2.5) _D(i6,wv,i(16,wi(zi))z,Iz)
Z2 u[1<<18];Vf(bb,Iz=0-I2%2;z^LI(z^x,z^BA(x)))mn(n0,Iz=0-I2%2;Vr=r(Vs,i(n/2,r=bb(r);r=~z^LI(~z^r,~z^a2(r,CB)))))mn(AB,iR=s-1;EX=r;*R=r(*R,*R=0;EA=R;i(m/2,i(n4(n),Xi=bb(Xi);Ai=bb(Ai)))))
mn(q1,OO(m-1>>18)ik=0;Y()Z(n,r);i(m,r[i?u[i-1]:0]=i)A=r;z=z2;i(n4(n),Ai=z=MI(z[15]-z2,mI(Ai))))mn(n1,OO(n-1>>13)ik=lu((m+n-1)/n);Y()OO(m>20)ii=n;W(i--)r[--u[si>>k]]=si;AB(m,n,r,s))
mn(q0,Vr=r(z2,m=4-lu(m);i(n>>m,r+=((i2)b(m)&I2)==a2(Vs,I2>>m);s+=1<<m)))mn(nm,(17>n?n0:9>m?q0:m/4>n?n1:q1)(m,n,r,s))_f(qs,IX=x2;Iz=Ix;IA=x2+15;i(n4(nx),P(b2(i?Ia>Ix:z<R2(0,z)),0))1)
f(sq,Qz(2-bx)ih=0;in=nx;im=17>n?0:2<tx?h=1<<18:lm(x);P(2>n|1==m||qs(P1(x)),x)Qz(m>>31)x=h?P1(_E(x)):x;x=_R(tx,n,nm(m,n,r2,x2));h?E_(x):x)
f(fq,Qz(2-tx)im=lm(x);Qz(m-1>>18||qs(x))_R(2,m,Z(m,r2);i(nx,++r2[xi])))f(uq,QZ)G(I3,Qz(i-29|1<ia)(ia?sq:fft)(x))
g(g1,in=lu(ie(x));im=b(n);RV(2,i,9>n?(i0)m&(V)PR():m&(i6)PR()))g(a1,in=ie(x);9>i?m_(n,ny(n*n,te(1))):RV(12>i?2:3,n,$3(i-11>>1,I2|j<<4,(e6)(127<<23|(i6)PR()>>14<<5)-1,C(e6,I2|j<<4)/(e2)n)))
G(S,EE _a(_x(mx?_(Qn(vx%16)i?m_(ma,R(tx,ma*vx,i(ma,vm(mx,vx/16,r2+i*vx,ae+i*mx,sx)))):R(tx,vx,(ma?mm:vm)(mx,vx/16,sr,sa,sx))):(x=P0(x),i?R(tx,ma,eR=sr;j(nr,R_=sE(ae+j*nx,x))):te(sE(sa,x))))))
g(i_,Uu;VX=sx;J(Nx,$(2>tx,P(u=b0((i0)i==X_),l(nx,64*j|iu(u))))P(u=b2(i==Ix),l(nx,16*j|iu(u))))nx)g(_i,tx?t(tx,xi):r_(xU[i]))inx(ln,Qz(!tx)R(tx,n,m6(Nr,sr,sx+((int)(i)<<bx))))
g(nd,Qz(mx|!tx)_x(ln(i,nx-i,x)))F(VV,R1(x);x=_x(r(nz(0,nx,a),m9(Nx,sr+Na,sx)));ma?m_(ma+1,_m(x)):x)
g(nt,mx?m_(i,nt(i*vx,_m(x))):tx?i>nx?r(nz(0,i,x),i=Nx;W(i<Nr)i+=m9(l(i,Nr-i),sr+i,sr)):x+i-nx:RU(i,_i(j%nx,x)))G(NN,Qr(!aa)in=ie(a);ax?(i?g1:ny)(n,x):i^n>>31?nd(i?n:ux+n,x):nt(i?ux+n:n,x))
g(_j,mx?ln(i*vx,vx,x):_i(i,x))F(_I,Qt(2-tx)Qn(m2(x)>=na)_a(ta?2>ta?RG(g0(sa,Ix)):t(ta-tx,X(g2(sa,Ix))):RU(nx,_i(x2[j],a))))F(I_,Qt(2-ta|2-tx)Qn(64<nx)_a(r(uz(x),i(nr,r2[i]=i_(xi,a)))))
G(MV,Qz(mx|3-ta|nx%16)Qn(va-nx)im=nx/16;EA=sx;_x(x(a,X(A[i++%m]*Ex))))g(pe,Qz(--i-1|2-tx)ii=*x2;EA=x2-1;x=X(Ix-A_);*x2=i;x)f(_v,_x(_j(0,x)))f(v,R(tx,1,*rU=x))
G(av,X(3>tx?$3(i,ia+Ix,ia-Ix,ia*Ix):$4(i,ea+Ex,ea-Ex,ea*Ex,a?ea/Ex:_q(Ex))))G(vv,EA=sa;_a(X(3>tx?$3(i,Ia+Ix,Ia-Ix,Ia*Ix):$4(i,*A+++Ex,*A++-Ex,*A++*Ex,*A++/Ex))))
G(A,Qz(a&&2>ta||2>tx)it=2<i|2<m(ta,tx);P(ax,aa?t?_v(A(i,a,v(x))):ti($3(i,ia+ix,ia-ix,(a?ia:ix)*ix)):A(i,$4(i,x,ti(-ix),x,te(1/ex)),a))if(t)EE;(aa?av:!!ma^!!mx?MV:vv)(i,a|2-i?a:r_(x),x))
G(B,P(aa&ax,ti($5(i-4,ia&ix,ia|ix,ia<ix,ia>ix,ia==ix)))Qz(2-tx|!aa^6>i)VA=aa?0:sa;_a(X($5(i-4,Ia&Ix,Ia|Ix,1&ia<Ix,1&ia>Ix,1&ia==Ix))))
inx(dd,n=(n+65535)/n;X(i6 z=Ix;x(n*z>>16,i?z-i*x:x)))G(md,!i|2<m(ta,tx)?A(2,i?te(1/ea):a,x):ax?ti(ix/ia):dd(0,a,x))G(dm,!i?x:ax?ti(ix%ia):dd(a,a,x))
G(II,aa?md(i,a,x):ax?_a(i?ti(i_(x,a)):_j(x,a)):ma|mx?_(Qn(va-ux)S(ma,a,x)):(i?I_:_I)(a,P0(x)))G(CC,Qz(!i)Qt(ta-tx)Qz(mx||ma&&va-nx)nx?VV(aa?v(a):a,ax?v(x):x):_x(a))
f(rr,Qz(!tx|mx)_R(tx,nx,VR=sr;VX=sx+Nx;$(2>tx,J(Nx,R_=a0(*--X,63-I0)))J(Nx,R_=a2(*--X,15-I2))))
f(ff,Qr(!mx)m_(vx,_R(tx,nx,)))f(v_,ax?v(x):!tx|mx?R(0,1,*rU=x):m_(1,x))f(_n,_x(ti(ux)))//&|<>=...@?#.^
f(q,QZ)g(v1,$6(i-4,ff,rr,q,q,fq,$6(i-10,q,q,_v,uq,_n,sq))(x))g(h1,$3(i-17,v_(x),qq(x),10>i?ax?ti(!ix):B(0,0,x):ax?_v(_T(v(x))):_T(x)))G(er,RU(nx,k(i,a,_j(j,x))))
G(R6,P(a,Qn(ua-ux)S(0,a,x))Qz(mx)o3(i-20,x))G(E3,EE _a(e3(i-26,a,x)))G(P3,P(30>i,(tx?10:4)<a?er(a,0,x):pe(a,x))P(18==a&&mx,_m(x))Qz(--a&&1<a-4|mx)(1&i?s3:o3)(a?a-4:2,x))G(O2,QZ)
G_(k,P(20>i,(a?10:4)>--i?tx?(4>i?A:B)(i,a,x):er(i+1,a,x):a?(12>i?dm:14>i?II:16>i?NN:CC)(1&i,a,x):(q4(9,15,17,18)?h1:ax?a1:v1)(i,x))Qr(ax|!tx)(26>i?R6:29>i?E3:32>i?pa?P3:I3:O2)(i,a,x))
g_(k_,x?$3(i,_r(x),r_(x),(U)sx):o?ti(W):_(i(8,P[i]=PR()[0])i(1e4,PR())xy();om();o=1))
