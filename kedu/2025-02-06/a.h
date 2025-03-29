#define sx (ox?_+(~63&Ox):H)
#include"_.h"
Z0 _[1<<30];Z2 AT(aligned(64))Z[8][1<<18|256],D[]={3,0,2,2,3,0,0,3},O[256],o,W;ZU C[24];_U(om,i(24,C[i]=(U)_+(64<<i))i(256,O[i]=i+1)0)extern i0*H;
VF(p0,o(permvarqi)(a,x))V3(P0,o(vpermi2varqi)(a,b,c))VF(p2,o(permvarsi)(a,x))V3(P2,o(vpermi2varps)(a,b,c))
EF(c,bu(ia32_vfmaddsubps512_mask3)(p2(a,I/2*2),x,(e6)p2(a,I/2*2|1)*p2(x,BA),-1,9))_U(c2,bu(ia32_compressstoresi512_mask)(s,x,h);nu(h),ss,hh,Vx)
Is(g2,bu(ia32_gathersiv16si)(z0,s,x,-1,4))Is(g0,bu(ia32_gathersiv16si)(z0,s,x,-1,1))VG(R2,$4(i,o(alignd)(x,a,15),o(alignd)(x,a,14),o(alignd)(x,a,12),o(alignd)(x,a,8)))
UV(b0,o(cvtb2mask)(x))UV(b2,o(cvtd2mask)(x))VF(LG,o(pminub)(a,x))VF(LI,o(pminud)(a,x))VF(MG,o(pmaxub)(a,x))VF(MI,o(pmaxud)(a,x))Ef(_q,o(sqrtps)(x,4))
_D(j6,AB,ZJ A={-1};ZJ B={0xc6a4a7935bd1e995};Z2 a;if(!a){i(a=8,A[i]=AB()[0])i(1e4,AB())}A^=B;B=(A<<55|A>>9)^B^B<<14;B=B<<37|B>>27;A+B)VG(R0,$3(i,P0(x,I0-1,a),P0(x,I0-2,a),R2(i-2,a,x)))
N1(m6,J(n,X_=z0))N2(M6,J(n,R_=X_))_Z(m9,cc=63&(U)d;VA=d-c;Va=c>I0&*A;M6(c+n,A,s-c);*A=a|c<=I0&*A,in,sd,ss)
N1(c0,cc=n%64;if(c)X[n>>6]&=I0<c)N1(c1,cc=n%64;if(c)X[n>>6]|=I0>=c)

Ef(l_,Sz=x;x=127<<23|(1<<23)-1&z;C(e6,(z>>23)-127)+(x-1)*p6(3.1157899f,-3.324199f,2.5988452f,-1.2315303f,.31821337f,-.034436006f))
EF(_h,P2(a,2*I,x))EF(h_,P2(a,1|2*I,x))VF(SG,a+x)VF(SI,a+x)
Ef(_l,Ez=C(e6,C(s6,x-.5));x-=z;(1+z)*p6(.99999994f,.69315308f,.24015361f,.055826318f,.0089893397f,.0018775767f))Ef(E,_l(1.442695f*x))Ef(sE,i(4,x+=R2(i,z0,x))x)ZU m2(),T(),uz();
#define Z4(z) i(4,zi+=z)
#define e4(z) sE(r(ze,i(4,r+=zi)i(n%4,r+=z)))[15]
_Z(VM,h(n/4,Ez[4]={};h(m,Z4(X[h*n]*a[h]))X+=4;i(4,R_=zi))i(n%4,Ez={};i(m,z+=X[i*n]*ai)Ri=z;++X),im,in,VR,e2*a,EX)
_e(se,n=n4(n);Ez[4]={};i(n/4,Z4(X_))e4(X_),in,EX)
_e(eE,n=n4(n);Ez[4]={};i(n/4,Z4(A_*X_))e4(A_*X_),in,EA,EX)
N1(sfm,ee=ei(m2(n,X));ER=X;e=sE(r(ze,N4(r+=Ri=E(Ri-e))))[15];N4(Ri/=e))

Z2 m,n;ZU b,r,a,x;
#define PF(g,c,n0,n1,y) _Z(_##g,e2*z=Z[i];ih=i*n/m;i=(i+1)*n/m;y,ii)_U(g,n=n0;r=tn(tx,n1);a=a0;x=x0;m=1;_##g(0);_a(_x(r)),U a0,U x0)
PF(pp,1,n4(nx),nx,)PF(mv,nx/16,ma,n,in=vx;W(i-->h)re[i]=eE(n,a2+n*i,x2))PF(mm,nx*vx/16,ma,n*vx,in=vx;W(i-->h)VM(mx,n/16,r2+i*n,a2+i*mx,x2))
PF(h6,mx*10,6,na,im=mx;in=na/16;W(i-->h){EA=x(b,x2)+i*48;EX=x2+i*48;i(m,zi=ie(eE(48,A,X+i*n)))sfm(m,z);A=a2+i*48;X=r2+i*48;i(3,X_=r(ze,i(m,r+=zi*A[i*n]));++A)})
U_(K,b=r;h6(a,x),Ua,Ur,Ux)F(vv,_a(_x(te(eE(nx,sa,sx)))))F(vm,QZ) //PF(vm,na/16,na,vx,VM(mx,i-h,r2+h,a2,x2+h))
_F(S,Qn(va-ux)EE(ma?mx?mm:mv:mx?vm:vv)(a,x))_G(e3,EE a?_a(X(Eb=Ex;aE[j]*b/(1+E(-b)))):$3(i-6,X(E(Ex)),ee=_q(eE(nx,sx,sx)/nx-ze)[0];X(Ex/e),QZ))


_g(_M,W-=1<<i;*(U*)x=C[i];C[i]=x)_u(M_,Ux=C[i];P(x,C[i]=*(U*)x;W+=1<<i;x)OO(i>22)_M(i,M_(i+1))+(64L<<i))_f(_o,if(!tx)i(nx,_r(xU[i]))_M(hx,(U)sx);Ox=o;o=255&x>>47)_g(hn,lu(m(64,x<<D[i]))-6)
_f(r_,ax|!ox?x:(++Ox,x))_f(_r,!ox|ax?x:63&Ox?(--Ox,x):_o(x))U_(tn,ii=hn(t,n);(U)i<<55|t(8+t,(U)r(o,o=O[o];O[r]=M_(i)-(U)_)<<47)|n,it,in)
_f(uz,!ox|63&Ox?RX():x)
