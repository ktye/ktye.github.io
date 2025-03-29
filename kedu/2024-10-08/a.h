#include"k.h"
extern U QQ();
#if __arm64
#define V2(g,f,j) VF(g,i(4,A4=o(f##q_v)(A4,B4,j))a)
V2(a4,qtbl1,48)Vf(ba,a4(a,BA))U(b4,g4*y=&a;g6 b;g6 c=I0;i(4,B4=o(qtbl4q_v)(y[0],y[1],y[2],y[3],d*C4,48))b_(b),i0 d,Va)UV(bi,b4(4,a))UV(bj,b4(8,a))V2(LG,min,48)V2(MG,max,48)V2(LI,min,50)V2(MI,max,50)
_F(X9,-a^o(mull_p64)(x,-1L))VF(GG,Vc={};i(4,asm("fcmla.4s %0,%1,%2,0\nfcmla.4s %0,%1,%2,90":"+w"(C4):"w"(A4),"w"(B4)))c)Vf(sq,i(4,A4=o(sqrtq_v)(A4,41))a)_D(g4,p4,o(qtbl1q_v)(a,b,48),g4 a,g4 b)
#else
#define V2(g,f) VF(g,o(f)(a,b)) //V2(A0,permvarsi)
_F(X9,-a^bu(ia32_pclmulqdq128)((j4){x},~(j4){},0)[0])UV(bi,o(cvtd2mask)(a))UV(bj,o(cvtq2mask)(a))Vf(sq,o(sqrtps)(a,4))
V2(a4,pshufb)V2(LG,pminub)V2(LI,pminud)V2(MG,pmaxub)V2(MI,pmaxud)V3(A0,o(vpermi2varqi)(a,b,c))V3(A2,o(vpermi2varps)(a,b,c))
_U(cm2,bu(ia32_compressstoresi512_mask)(s,a,m);bn(m),ss,im,Va)_D(g4,p4,bu(ia32_pshufb128)(a,b),g4 a,g4 b)
V(s0,$6(i,A0(z0,63+I0,a),A0(z0,62+I0,a),o(alignd)(a,z0,15),o(alignd)(a,z0,14),o(alignd)(a,z0,12),o(alignd)(a,z0,8)),ii,Va)
#endif
f(z6,if(nx%64)xU[nx/64]&=b(nx%64);x)f(Z6,if(Nx%64)xV[Nx/64]&=(i0)(Nx%64)>I0;x)f(W6,if(Nx%64)xV[Nx/64]|=(i0)(Nx%64)<=I0;x)V(PQ,Q^=P;P=(P<<55|P>>9)^Q^Q<<14;Q=Q<<37|Q>>27;P+Q)
g(mz,(U)i<<32|~(b(16)<<32)&x)_U(yy,4>i?ti($3(i,j+k,j-k,j*k)):6>i?QZ:tb($3(i-6,j<k,j>k,j==k)),ii,ij,ik)VF(SG,a+b)VF(SI,(i6)a+b)
Ve(l_,s6 i=x;x=127<<23|(1<<23)-1&i;C(e6,(i>>23)-127)+(x-1)*p6(3.1157899f,-3.324199f,2.5988452f,-1.2315303f,.31821337f,-.034436006f))static e2 e;
#define J(n,z) j(n6(n),z)
#define Rz(d,n,z) VR=d;J(n,*R=_(z);++R)
_U(m6,VX=s;Rz(d,n,Gx)0,in,sd,ss)
Ve(_l,e6 i=C(e6,C(s6,x-.5));x-=i;(1+i)*p6(.99999994f,.69315308f,.24015361f,.055826318f,.0089893397f,.0018775767f))
#define R2(z)   _x(R(3,nx,i2*R=sr;i2*X=sx;j(nx,*R++=_(z))))
#define Xt(t,z) _x(R(1,nx,i##t*R=sr;VX=sx;J(Nx,*R++=_(z))))
#define X(z)  r(uz(x), VR=sr; VX=sx;J(Nx,*R++=_(z)))
#define XB(z) r(uz(x),U*R=sr;U*X=sx;J(nx,*R++=_(z)))
i2 O[256];V M[1<<24];Z2 o;ZU m[24];Z_(om,i(24,m[i]=(U)M+64*b(i))i(256,O[i]=i+1)i(3,P|=s0(3+i,PQ()))Q|=s0(5,PQ());i(1e4,Va=PQ()))_g(_m,*(U*)x=m[i];m[i]=x)
_u(m_,Ux=m[i];P(x,m[i]=*(U*)x;x)23>i?_m(i,m_(i+1))+(64L<<i):0)f_(_o,_m(hx,(U)sx);Ox=o;o=ox;x)U_(tn,t(8+t,n|(U)r(o,o=O[o];ii=hn(t,n);O[r]=m_(i)-(U)M<<2|i<<3)<<52),it,in)
f(v,R(tx,1,*(U*)sr=*(U*)&x))f(e_,P(ax,v(x))Qz(mx)mz(1,x))f(_v,_x(ai(0,x)))f(_e,Qr(ax)mx?mz(0,x):_v(x))


