#define J(n,z) j(n6(n),z)
#define RV(d,n,z) {g6*R=d;J(n,*R=_(z);++R)}
#define R2(z) _x(V(3,nx,i2*R=sr;i2*X=sx;j(nx,*R++=_(z))))  //_I I_
#define X1(z) _x(V(1,nx,i1*R=sr;g6*X=sx;J(Nx,*R++=bi(z))))
#define X3(z) _x(V(1,nx,i3*R=sr;g6*X=sx;J(Nx,*R++=bg(z))))
#define X(z)    r(uz(x),g6*R=sr;g6*X=sx;J(Nx,*R++=_(z)))
#define _X(z)   r(uz(x),i3*R=sr;i3*X=sx;J(nx,*R++=_(z)))
#define _x(z) r(_(z),$(rx,--rx)_o(x))
#define __(z) r(_(z),Ux=a;$(rx,--rx)_o(x))
#include"k.h"
#if __AVX512F__
#define o(f) bu(ia32_##f##512)
#define V2(g,f) VF(g,o(f)(a,b)) //V2(a2,permvarsi) V3(A2,o(vpermi2varps)(a,b,c))UV(bj,o(cvtq2mask)(a))
_F(X9,-a^bu(ia32_pclmulqdq128)((j4){x},~(j4){},0)[0])UV(bg,o(cvtb2mask)(a))UV(bi,o(cvtd2mask)(a))Vf(sq,o(sqrtps)(a,4))V2(a4,pshufb)V2(LG,pminub)V2(LI,pminud)V2(MG,pmaxub)V2(MI,pmaxud)
_U(c2,bu(ia32_compressstoresi512_mask)(s,a,m);nu(m),ss,im,Va)_D(g4,p4,bu(ia32_pshufb128)(a,b),g4 a,g4 b)
V3(A0,o(vpermi2varqi)(a,b,c))Vg(s0,$6(i,A0(z0,63+I0,a),A0(z0,62+I0,a),o(alignd)(a,z0,15),o(alignd)(a,z0,14),o(alignd)(a,z0,12),o(alignd)(a,z0,8)))
#else
#define o(f) bu(neon_v##f)
#define V2(g,f,j) VF(g,i(4,A4=o(f##q_v)(A4,B4,j))a)//VF(GG,Vc={};i(4,asm("fcmla.4s %0,%1,%2,0\nfcmla.4s %0,%1,%2,90":"+w"(C4):"w"(A4),"w"(B4)))c)
V2(a4,qtbl1,48)Vf(ba,a4(a,BA))U(b4,g4*y=&a;g6 b;g6 c=I0;i(4,B4=o(qtbl4q_v)(y[0],y[1],y[2],y[3],d*C4,48))bg(b),i0 d,Va)UV(bi,b4(4,a))UV(bj,b4(8,a))V2(LG,min,48)V2(MG,max,48)V2(LI,min,50)V2(MI,max,50)
_F(X9,-a^o(mull_p64)(x,-1L))_D(g4,p4,o(qtbl1q_v)(a,b,48),g4 a,g4 b)D(j4,b9,o(paddq_v)(x,y,48),g4 x,g4 y)UV(bg,g4*y=&a;g4 m=1<<I4%8;x(b9(b9(m&y[0],m&y[1]),b9(m&y[2],m&y[3])),b9(x,x)[0]))
Vf(sq,i(4,A4=o(sqrtq_v)(A4,41))a)Vg(s0,a,ii,Va)_U(c2,nu(m),ss,im,Va)
#endif
extern U QQ();ZU uz();VF(SG,a+b)VF(SI,(i6)a+b)Vf(ab,Vb=0-I2%2;b^LI(b^a,b^a4(a,BA)))f(bb,i(nx,VR=xu+i%2;*R=ab(*R))x)
_G(yy,ij=(i2)a;6>i?t(tx,$6(i,j+ix,j-ix,j*ix,0,l(j,ix),m(j,ix))):tb($3(i-6,j<ix,j>ix,j==ix)))_u(qy,1==i|3==i)_g(y,2>i?4>tx?ti(-ix):te(-ex):te(1/ex))
U(m6,VX=s;RV(d,n,Gx)0,in,sd,ss)_g(mz,(U)i<<32|~(b(16)<<32)&x)_f(z6,if(nx%64)xU[nx/64]&=b(nx%64);x)_f(W6,if(Nx%64)xV[Nx/64]|=(i0)(Nx%64)<=I0;x)_f(Z6,if(Nx%64)xV[Nx/64]&=(i0)(Nx%64)>I0;x)
Ve(l_,s6 i=x;x=127<<23|(1<<23)-1&i;C(e6,(i>>23)-127)+(x-1)*p6(3.1157899f,-3.324199f,2.5988452f,-1.2315303f,.31821337f,-.034436006f))
Ve(_l,e6 i=C(e6,C(s6,x-.5));x-=i;(1+i)*p6(.99999994f,.69315308f,.24015361f,.055826318f,.0089893397f,.0018775767f))_D(V,PQ,Q^=P;P=(P<<55|P>>9)^Q^Q<<14;Q=Q<<37|Q>>27;P+Q)
_F(_a,Qz(2>tx)Ub;VX=sx;$3(tx-2,J(Nx,P(b=bg(ga==Gx),64*j|iu(b))),J(Nx,P(b=bi(ia==Ix),16*j|iu(b))),J(Nx,P(b=bg(ia<Ix),16*j|iu(b))));nx)_f(pi,in=1;i2*X=xu;j(nx,n*=*X++)n)
f(sb,z6(x);r(0,U*X=sx;J(nx,r+=nu(Gx))))g(oB,in=sb(x);1<i?n:i?!!n:n==nx)g(sB,Qz(9-i)Ua=0;_X(a=X9(a>>63,Gx)))g(pB,Ua=0;_X(Ub=a>>63;b|=(a=Gx)<<1;i?$6(i-5,a&b,a|b,~a&b,a&~b,0,a^b):b))
_U(sE,i(4,a+=s0(2+i,a))ue(a[15]),e6 a)_f(Si,i6 a={};X(i6 b=Ix;i(4,b+=s0(2+i,b))a=b+a[15]))_f(Se,e6 a={};X(e6 b=Ix;i(4,b+=s0(2+i,b))a=b+a[15]))
#define on(n,o,O,t,T) _U(o##T,i(6-n,a=O##T(a,s0(n+i,a)))a[b(6-n)],t##6 a)_U(o##t,t##6 a=i%16>I2&X[i/16];j(i>>6-n,a=O##T(a,Gx))o##T(a),ii,VX)
_U(se,e6 z[4]={};i=n4(i);j(i/4,i(4,zi+=Ex))e6 a=z[3];i(3,a+=zi)j(i%4,a+=Ex)sE(a),ii,VX)_U(ve,e6 z[4]={};i=n4(i);j(i/4,i(4,zi+=Ea*Ex))e6 a=z[3];i(3,a+=zi)j(i%4,a+=Ea*Ex)sE(a),ii,VA,VX)
on(0,m,M,g,G)on(0,s,S,g,G)on(2,m,M,i,I)on(2,s,S,i,I)Zg(of,mg,sg,mi,si,0,se)Zf(sf,0,0,0,Si,0,Se)
g(o3,P(2>tx,oB(i,x))Qz(!i--)of[tx-2<<1|i](nx,(U)sx))
g(s3,P(2>tx,sB(i,x))Qz(!i--)sf[tx-2<<1|i](x))
F(vv,Z6(x);t(4,ve(nx,sa,sx)))
V M[1<<24];ZU m[24];U O[1<<12];Z2 o;Z_(om,i(1<<12,O[i]=i+1)i(24,m[i]=(U)M+64*b(i))i(3,P|=s0(3+i,PQ()))Q|=s0(5,PQ());i(1e4,Va=PQ()))
_g(_m,*(U*)x=m[i];m[i]=x)_u(m_,Ux=m[i];P(x,m[i]=*(U*)x;x)23>i?_m(i,m_(i+1))+(64L<<i):0)f_(_o,_m(hx,(U)sx);O[ox]=o;o=ox;x)U_(tn,t(8+t,n|(U)r(o,o=O[o];ii=hn(t,n);O[r]=i|m_(i)-(U)M)<<48),it,in)
g(tm,mz(mx,tn(tx,nx+i)-i))_f(uz,rx?(--rx,tm(0,x)):x)_g(dz,_x(r(tm(i,x),m6(Nx,sr,sx))))_U(ln,V(tx,n,m6(Nr,sr,sx+((int)i<<bx-3))),ii,in,Ux)_g(a_,mx?ln(i*kx,kx,x):ai(i,x))f(_v,_x(ai(0,x)))
f(_e,Qr(ax)mx?mz(0,x)+kx-nx:_v(x))f(v,V(tx,1,*(U*)sr=*(U*)&x))f(e_,P(ax,v(x))Qz(mx)mz(1,x))
g(O3,_x(2>(mx?:nx)?a_(0,x):mx?V(tx,kx,i(mx,VX=xu+kx*i;RV(sr,Nr,i?Ex:Ex+*R))):t(2>i?tx:m(3,tx),o3(i,x))))

g(po,P(!i--,a_(nx-1,x))P(17==i,Qr(ax)Qz(!tx)mz(0,x))P(2==i,Qt(3!=tx)_x(t(tx,pi(x))))Qz(i&&1<i-4)O3(i?i-4:2,x))g(ps,P(!i--,x)Qz(i&&5!=i)s3(i?i-4:2,x))


