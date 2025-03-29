#define sx (ox?((i0*)_+(~63&Ox)):(i0*)M)
#include"_.h"
extern double cos(double),sin(double);
#define o(o) bu(ia32_##o##512)
VF(LG,o(pminub)(a,x))VF(LI,o(pminud)(a,x))VF(MG,o(pmaxub)(a,x))VF(MI,o(pmaxud)(a,x))Ve(_q,o(sqrtps)(x,4))UV(b0,o(cvtb2mask)(x))UV(b2,o(cvtd2mask)(x))
VF(a0,o(permvarqi)(a,x))VF(a2,o(permvarsi)(a,x))Vg(R2,$4(i,o(alignd)(x,z0,15),o(alignd)(x,z0,14),o(alignd)(x,z0,12),o(alignd)(x,z0,8)))_U(c2,bu(ia32_compressstoresi512_mask)(s,x,h);nu(h),ss,hh,Vx)
_V(A2,o(vpermi2varps)(a,b,x),Va,Vb,Vx)_D(i6,g2,bu(ia32_gathersiv16si)(z0,s,x,-1,4),ss,Vx)_D(i6,g0,bu(ia32_gathersiv16si)(z0,s,x,-1,1),ss,Vx)
Vg(R0,$3(i,a0(x,I0-1),a0(x,I0-2),R2(i-2,x)))VF(SG,a+x)VF(SI,(i6)a+x)j6 P={-1},R={0xc6a4a7935bd1e995};_D(j6,PR,R^=P;P=(P<<55|P>>9)^R^R<<14;R=R<<37|R>>27;P+R)
Ve(_l,Ez=C(e6,C(s6,x-.5));x-=z;(1+z)*p6(.99999994f,.69315308f,.24015361f,.055826318f,.0089893397f,.0018775767f))Ve(E,_l(1.442695f*x))
Ve(l_,Sz=x;x=127<<23|(1<<23)-1&z;C(e6,(z>>23)-127)+(x-1)*p6(3.1157899f,-3.324199f,2.5988452f,-1.2315303f,.31821337f,-.034436006f))_e(eS,i(4,z+=(e6)R2(i,(V)z))z[15],Ez)
_Z(vm,i(n/4,Ez[4]={};     EX=x;h(m,i(4,zi+=X_*a[h])     X+=n-4)i(4,R_=zi)      x+=4)i(n%4,Ez={};     EX=x;h(m,z+=*X*a[h];   X+=n)R_=z;      ++x),im,in,VR,e2*a,e6*x)
_Z(mm,i(n/4,Ez[4]={};EA=a;EX=x;h(m,i(4,zi+=X_*A_)A+=n-4;X+=n-4)i(4,R_=zi)a+=64;x+=4)i(n%4,Ez={};EA=a;EX=x;h(m,z+=*X**A;A+=n;X+=n)R_=z;a+=16;++x),im,in,VR,e2*a,e6*x)
extern U M;Z2 b[]={3,0,2,2},O[1<<8],o,W;_g(hn,x<<=b[i];64<x?lu(x)-6:0)_g(m_,(U)i<<32|x)f(_m,~(b(16)<<32)&x)ZU m[24];ZV _[1<<24];_Z(om,i(24,m[i]=(U)_+(64<<i))i(1<<8,O[i]=i+1))
_g(_M,W-=1<<i;*(U*)x=m[i];m[i]=x)_u(M_,Ux=m[i];P(x,m[i]=*(U*)x;W+=1<<i;x)OO(24-2<i)_M(i,M_(i+1))+(64L<<i))_f(_o,if(!tx)i(nx,_r(xU[i]))_M(hx,(U)sx);Ox=o;o=b(8)&x>>48)f(ty,_x(ti(tx)))
_f(r_,ax|!ox?x:(++Ox,x))_f(_r,ax|!ox?x:63&Ox?(--Ox,x):_o(x))U_(tn,ii=hn(t,n);(U)i<<56|t(4+t,(U)r(o,o=O[o];O[r]=M_(i)-(U)_)<<48)|n,it,in)_f(uz,!ox|63&Ox?(--Ox,m_(mx,tn(tx,nx))):x)
_f(P0,if(Nx%64)xV[Nx>>6]&=I0<(i0)(Nx%64);x)_f(P1,if(Nx%64)xV[Nx>>6]|=I0>=(i0)(Nx%64);x)_D(i0*,m6,r(R,J(n,R_=X_)),in,VR,VX)_U(m9,im=63&64-(U)d%64;i(m,*d++=*s++)m6(m(m,n)-m,d,s);n,in,sd,ss)
_e(se,in=n4(nx);EX=sx;Ez[4]={};i(n/4,i(4,zi+=X_))Eb=z[3];i(3,b+=zi)i(n%4,b+=X_)eS(b),Ux)_e(sE,in=n4(nx);EX=sx;Ez[4]={};i(n/4,i(4,zi+=A_*X_))Eb=z[3];i(3,b+=zi)i(n%4,b+=A_*X_)eS(b),EA,Ux)
#define on(N,f,F,t,T) _D(t##6,f##T,i(6-N,a=F##T(a,R##N(i,a)))a,Va)_f(f##N,VX=sx;Va={};J(Nx,a=F##T(a,X_))f##T(a)[b(6-N)])_f(F##N,t##6 a={};X(a=f##T(*X)+a[b(6-N)]))//s0 S0 sI SI
on(0,l,L,g,G)on(0,m,M,g,G)on(0,s,S,g,G)on(2,l,L,i,I)on(2,m,M,i,I)on(2,s,S,i,I)g(o3,x=(i?P0:P1)(x);_x(1<i&2<tx?te(se(x)):t(tx,$6(2*i+tx-1,l0,l2,m0,m2,s0,s2)(x))))
g(s3,Qz(2<tx)$6(2*i+tx-1,L0,L2,M0,M2,S0,S2)(x))_G(e3,P(a,X(Eb=Ex;aE[j]*b/(1+E(-b))))P(!i--,X(E(Ex)))ee=1/(i?(e=ei(m2(x)),se(x=X(E(Ex-e)))):_q(sE(sx,x)/nx-ze)[0]);X(e*Ex))
g(T,XX=sx;i>tx?T(i,3>i?_x(RV(2,nx,C(i6,X_))):X(C(e6,(s6)Ix))+t(1,0)):x)f(_T,Qt(2>tx)3>tx?RG(Ix):X(C(s6,Ex))-t(1,0))g(ny,Qz(2-bx)RV(tx,i,ix-z2))_g(dz,_R(tx,nx+i,m6(Nx,sr,sx)))
_f(R1,i(!tx*nx,r_(xU[i]))x)inx(nz,i|hn(tx,nx+n)>hx?(R1(x),dz(i,x)):x+n)_Z(Z,i(n4(n),R_=z2),in,IR)_f(lm,m2(P0(x))+1)_f(_E,X(b(18)&(i6)(1+Ex)>>5))_f(E_,X((e6)(127<<23|Ix<<5)-1))


