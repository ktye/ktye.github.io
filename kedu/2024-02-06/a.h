#if __APPLE
static __builtin_ia32_ldmxcsr(){return asm("msr fpcr,%0"::"r"(3<<23));}
#endif
#define T0(z)  _x(R(0,nx,i(nx,ru=z)))
#define r1(n,z) R(1,n,i(n,sr[i]=z))
#define r3(n,z) R(3,n,i(n,ri=z))
#define r4(n,z) R(4,n,i(n,re=z))
#define r5(n,z) R(5,n,i(n,rE=_(z)))
#define T(t,c,h,e,E) _x(R(t,nx,C4(t-2,i(nx,sr[i]=c),i(nx,ri=h),i(nx,re=e),i(nx,rE=E))))
#define t(t,i,e,E) c4(t-2,tc(i),ti(i),te(e),tE(E))
#define ue(t,z) _(x=t>ax?Ua(t,x):x;z)
#define uE(t,z) _(x=t>tx?Ut(t,x):x;z)
#define uu(e) _(if(aa!=ax)if(aa<ax)a=Ua(ax,a);else x=Ua(aa,x);e)
#define UU(e) _a(it=aa?:ta;if(t!=tx)if(t<tx)a=aa?Ua(tx,a):Ut(tx,a);else x=Ut(t,x);e)
#define Ze static e
#define Zi static unsigned
#define Zu static u // ubcieE [paieEtnNs][ax] [rax][ucieE] w[ucieE]
typedef float e;typedef unsigned long(*_)(),u;Zi lt[]={3,0,0,2,2,3,3},OS,T;Zu Q=128,U[27],ys();Ze pi=3.1415927;
Zu __attribute((naked))ut(){asm(".quad 0xd53be04031420aeb,0xc148310fd65f03c0,0xc3d0094820e2");}
#include<complex.h>
#define _(e) ({e;})
#define f(g,e) u(g,e,ux)
#define i(n,e) {unsigned $n=n;ii=0;for(;i<$n;++i){e;}}
#define l(a,e) _(typeof(e)e_=e;(a)<e_?(a):e_)
#define m(a,e) _(typeof(e)e_=e;(a)>e_?(a):e_)
#define r(a,e) _(typeof(a)r=a;e;r)
#define u(g,e,x...) Zu g(x){return _(e);}
#define x(a,e) _(typeof(a)x=a;e)
#define F(g,e) u(g,e,ua,ux)
#define G(g,e) u(g,e,uf,ua,ux)
#define Q(e) if(Q==(e))return Q;
#define X(e) i(nx,e)
#define W(z) while(z)
#define P(b,e) if(b)return _(e);
#define ii unsigned i
#define in unsigned n
#define ss char*s
#define si s[i]
#define us(g,e) u(g,e,ss)
#define ns(g,e) u(g,e,in,ss)
us(sl,ii=0;W(si)++i;i)ns(is,i(sl(s),P(n==si,i+1))0)

#define _a(e) r(_(e),_r(a))
#define _x(e) r(_(e),_r(x))
#define _ax(e) _a(_x(e))
#define n3(z) (7+(z)>>3)
#define ex (*(e*)&x)
#define Ex (*(E*)&x) 
#define ax l(5,x>>51)
#define pax (px||ax)
#define xc sx[i]
#define sx ((char*)x)
#define px (31>x)
#define xE ((E*)x)[i]
#define aE x(a,ax?Ex:xE)
#define Ea x(a,Ex)
#define ci (lx?xi:sx[i])
#define ix (unsigned)x
#define xr ((unsigned*)x)[-2]
#define nx ((unsigned*)x)[-1]
#define tx sx[-5]
#define lx lt[tx]
#define Nx (nx<<lx)
#define xi ((unsigned*)x)[i]
#define xe ((e*)x)[i]
#define xu ((u*)x)[i]
#define iu(g,e) u(g,e,ii,ux)
#define nu(g,e) u(g,e,in,ux)
#define tu(g,e) u(g,e,it,ux)
#define Qs(e,s) if(e)return err((u)__func__,(u)s);
#define Qz(e) Qs(e,"nyi")
#define Qr(e) Qs(e,"rank")
#define Qt(e) Qs(e,"type")
#define Qd(e) Qs(e,"domain")
#define QZ Qz(1)0
#define Qx Q(x)
#define oo w((u)"oo\n")
#define uf u f
#define ua u a
#define ux u x
#define sb char b
#define st char*t
#define it unsigned t
#define ee e e
#define nxu ((unsigned*)xu)[-1]
#define sxu ((char*)xu)
#define ai x(a,ax?ix:xi)
#define ae x(a,ax?ex:xe)
#define ea x(a,ex)
#define nr x(r,nx)
#define sa x(a,sx)
#define sr x(r,sx)
#define Nr x(r,Nx)
#define la x(a,lx)
#define pa x(a,px)
#define aa x(a,ax)
#define ia x(a,ix)
#define na x(a,nx)
#define ta x(a,tx)
#define Na x(a,Nx)
#define c3(z,a,b,c)     _(unsigned o=z;!o?a:2>o?b:c)
#define c4(z,a,b,c,d)   _(unsigned o=z;!o?a:2>o?b:3>o?c:_(d))
#define C3(z,a,b,c)     unsigned o=z;If(!o,a)If(2>o,b)c
#define C4(z,a,b,c,d)   unsigned o=z;If(!o,a)If(2>o,b)If(3>o,c)d
#define If(a,b) if(a){b;}else
#define Z_ static _
#define Zs static char*
#define ZE static E
#define l2(z) (64-bu(clzl)(z))
#define R1(z) _x(r1(nx,z))
#define R3(z) _x(r3(nx,z))
#define R4(z) _x(r4(nx,z))
#define R5(z) _x(r5(nx,z))
#define tb(z) (1l<<51|(z))
#define tc(z) (2l<<51|(char)(z))
#define ti(z) (3l<<51|(unsigned)(z))
#define te(z) (4l<<51|_(e _=z;*(unsigned*)&_))
#define ru ((u*)r)[i]
#define ri ((unsigned*)r)[i]
#define re ((e*)r)[i]
#define rE ((E*)r)[i]
#define wu(z) r((u)(z),sb[24];nw(sprintf(b,"%lx\n",r),b))
#define wi(z) r((int)(z),sb[24];nw(sprintf(b,"%d\n",r),b))
#define we(z) r((e)(z),sb[24];nw(sprintf(b,"%g\n",r),b))
#define wE(z) r((E)(z),sb[24];e*a=&r;nw(sprintf(b,"%g:%g\n",*a,a[1]),b))
#define bu(o) __builtin_##o
