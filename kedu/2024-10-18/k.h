#if 13==__clang_major__
#define V2(t,g,f) VF(g,o(p##f##t)(a,b))
#else
#define V2(t,g,f) VF(g,bu(elementwise_##f)((t)a,(t)b))
#endif

#define mn3(g,z) _Z(g,z,im,in,VR,eA,EX)
#define o(f) bu(ia32_##f##512)
#define V(t,n,z) r(tn(t,n),z)
#define M(l,m,n,z) r(mz(m,tn(tx,m*n)),z)
#define R(o,t,T) J(kx<<2,*R++=a##t[h]o T##x)
#define R2(n,z) V(tx,n,iR=sr;iX=sx;j(n,*R++=_(z)))
#define RV(z) {VR=sr;J(Nr,*R=z;++R)}
#define X1(z) _x(V(1,nx,i1*R=sr;g6*X=sx;J(Nx,*R++=bi(z))))
#define X3(z) _x(V(1,nx,i3*R=sr;g6*X=sx;J(Nx,*R++=bg(z))))
#define X(z)    r(uz(x),g6*R=sr;g6*X=sx;J(Nx,*R++=_(z)))
#define _X(z)   r(uz(x),i3*R=sr;i3*X=sx;J(nx,*R++=_(z)))
#define __(z) r(_(z),Ux=a;$(rx,--rx)_o(x))
#include"_.h"//tomn[rsh]
extern V M[];extern U O[],w2(i2,i0*),ws(i0*);
#define tx (b(3)&x>>60)
#define ox (b(12)&x>>48)
#define nx (b(32)&x)
#define rx ((i2*)O)[2*ox+1]
#define sx ((i0*)M+(~63&(i2)O[ox]))
#define hx          (31&(i2)O[ox])
#define xi ((i2*)sx)
#define xU ((i3*)sx)
#define t(t,z) (T1*(t)|(z))
Z0 bt[]={6,0,3,5,5,0,0,6};_U(hn,n<<=bt[t];512<n?ju(n-1)-9:0,it,in)ZU T1=1L<<60;_u(tb,t(1,i))_u(tg,t(2,i))_u(ti,t(3,i))_D(i2,ue,*(i2*)&e,ee)_U(te,t(4,ue(e)),ee)
_g(iv,t(tx,$4(tx-2,sx[i],xi[i],xi[i],xU[i])))_u(wc,w2(1,&i))_u(wi,r(i,cc[12];ss=c+11;*s=10;in=i>>31;i=n?-i:i;do*--s=48+i%10;W(i/=10);if(n)*--s=45;w2(c+12-s,s)))
U(QQ,ws(d);wc(58);ws(s);wc(10);255,sd,ss)f(wb,j(64,wc(48|1&x>>j))wc(10);x)f(wu,i(16,ij=15&x>>60-4*i;wc("0W"[9<j]+j))wc(10);x)
#define Qs(b,z) P(b,QQ(__func__,_(z)))
#define kx (mx?nx/mx:nx)
#define mx (b(16)&x>>32)
#define ax (x<1L<<63)
#define bx bt[tx]
#define Nx n3(nx<<bx) 
#define px (128>x)
#define xe ((e2*)sx)
#define xV ((V*)sx)
#define QZ _(Qz(1)0)
#define Gx *X++
#define Ga *A++
#define Ix ((i6)Gx)
#define Ex ((e6)Gx)
#define Ia ((i6)Ga)
#define Ea ((e6)Ga)
#define ae x(a,xe)
#define ka x(a,kx)
#define ga x(a,gx)
#define ia x(a,ix)
#define ea x(a,ex)
#define jx (b(60)&x)
#define ix (i2)x
#define A4 ((g4*)&a)[i]
#define B4 ((g4*)&b)[i]
#define C4 ((g4*)&c)[i]
#define J(n,z) j(n6(n),z)
#define eA e2*A
#define eR e2*R
#define iR i2*R
#define iA i2*A
#define iX i2*X
#define IX i6*X
#define EX e6*X
#define Ib i6 b
#define Eb e6 b
